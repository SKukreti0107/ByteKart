import { createContext, useContext, useState, useEffect } from 'react'
import { authClient } from '../auth-client'
import api from '../api'

const CartContext = createContext()

export function useCart() {
    return useContext(CartContext)
}

export function CartProvider({ children }) {
    const [cartItems, setCartItems] = useState(() => {
        try {
            const localData = localStorage.getItem('bytekart_cart')
            return localData ? JSON.parse(localData) : []
        } catch (error) {
            console.error('Failed to load cart from localStorage', error)
            return []
        }
    })

    const { data: session } = authClient.useSession()
    const [isCartInitialized, setIsCartInitialized] = useState(false)

    // Load DB Cart on Login
    useEffect(() => {
        const fetchDbCart = async () => {
            if (!session?.user?.id) return

            try {
                const response = await api.get('/cart')
                const dbCartItems = response.data.items || []

                // Merge DB cart with current LocalStorage guest cart
                if (cartItems.length > 0) {
                    const mergedCart = [...dbCartItems]

                    cartItems.forEach(localItem => {
                        const existingIdx = mergedCart.findIndex(dbItem => dbItem.cartItemId === localItem.cartItemId)
                        if (existingIdx >= 0) {
                            // Combine quantities
                            const maxStock = mergedCart[existingIdx].maxStock
                            const combinedQty = Math.min(mergedCart[existingIdx].quantity + localItem.quantity, maxStock)
                            mergedCart[existingIdx].quantity = combinedQty
                        } else {
                            mergedCart.push(localItem)
                        }
                    })

                    setCartItems(mergedCart)
                } else {
                    setCartItems(dbCartItems)
                }

                setIsCartInitialized(true)
            } catch (error) {
                console.error('Failed to load DB cart', error)
            }
        }

        fetchDbCart()
    }, [session?.user?.id])

    // Save to LocalStorage and DB whenever cart changes
    useEffect(() => {
        try {
            localStorage.setItem('bytekart_cart', JSON.stringify(cartItems))

            // Sync to DB if logged in and cart has been initialized to avoid overwriting early
            if (session?.user?.id && isCartInitialized) {
                const syncDb = async () => {
                    await api.put('/cart', {
                        user_id: session.user.id,
                        items: cartItems
                    })
                }
                syncDb()
            }
        } catch (error) {
            console.error('Failed to save cart', error)
        }
    }, [cartItems, session?.user?.id, isCartInitialized])

    const addToCart = (product, matchedSku, selectedVariants, quantity) => {
        setCartItems(prev => {
            const displayPrice = matchedSku
                ? (matchedSku.supplier_price || 0) + (matchedSku.our_cut || 0)
                : (product.supplier_price || 0) + (product.our_cut || 0)

            const displayMrp = matchedSku ? matchedSku.MRP : product.MRP
            const maxStock = matchedSku ? matchedSku.stock : 999

            const variantString = Object.entries(selectedVariants)
                .map(([k, v]) => `${k}:${v}`)
                .sort()
                .join('|')

            // Unique ID based on product and specific variant string
            const cartItemId = `${product.id}-${variantString}`

            const existingItem = prev.find(item => item.cartItemId === cartItemId)

            if (existingItem) {
                const newQuantity = Math.min(existingItem.quantity + quantity, Math.min(maxStock, 5))
                return prev.map(item =>
                    item.cartItemId === cartItemId ? { ...item, quantity: newQuantity } : item
                )
            }

            return [...prev, {
                cartItemId,
                product_id: product.id,
                name: product.name,
                image_url: product.image_url,
                price: displayPrice,
                mrp: displayMrp,
                variants: selectedVariants,
                quantity: Math.min(quantity, Math.min(maxStock, 5)),
                maxStock
            }]
        })
    }

    const removeFromCart = (cartItemId) => {
        setCartItems(prev => prev.filter(item => item.cartItemId !== cartItemId))
    }

    const updateQuantity = (cartItemId, newQuantity) => {
        setCartItems(prev => prev.map(item => {
            if (item.cartItemId === cartItemId) {
                // Ensure quantity is between 1 and min(maxStock, 5)
                const validQuantity = Math.max(1, Math.min(newQuantity, Math.min(item.maxStock, 5)))
                return { ...item, quantity: validQuantity }
            }
            return item
        }))
    }

    const clearCart = () => setCartItems([])

    const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0)
    const cartTotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0)

    const value = {
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartCount,
        cartTotal
    }

    return (
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    )
}
