import './App.css'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { lazy, Suspense } from 'react'
import ProtectedRoute from './components/ProtectedRoute'
import { CartProvider } from './context/CartContext'
import { Analytics } from "@vercel/analytics/react"

// Lazy-loaded routes for Code Splitting (Reduces initial JS bundle)
const Home = lazy(() => import('./pages/Home'))
const Catalog = lazy(() => import('./pages/Catalog'))
const ProductDetail = lazy(() => import('./pages/ProductDetail'))
const Checkout = lazy(() => import('./pages/Checkout'))
const OrderSuccess = lazy(() => import('./pages/OrderSuccess'))
const OrdersPage = lazy(() => import('./pages/OrdersPage'))
const CartPage = lazy(() => import('./pages/CartPage'))
const ContactUs = lazy(() => import('./pages/ContactUs'))
const AboutUs = lazy(() => import('./pages/AboutUs'))
const FAQ = lazy(() => import('./pages/FAQ'))
const TermsConditions = lazy(() => import('./pages/TermsConditions'))
const RefundPolicy = lazy(() => import('./pages/RefundPolicy'))
const ShippingPolicy = lazy(() => import('./pages/ShippingPolicy'))
const RequestsPage = lazy(() => import('./pages/RequestsPage'))

// Admin Pages
const AdminInventory = lazy(() => import('./pages/AdminInventory'))
const AdminDashboard = lazy(() => import('./pages/AdminDashboard'))
const AdminOrders = lazy(() => import('./pages/AdminOrders'))
const AdminCategories = lazy(() => import('./pages/AdminCategories'))
const AdminSubcategories = lazy(() => import('./pages/AdminSubcategories'))
const AdminBrands = lazy(() => import('./pages/AdminBrands'))
const AdminHero = lazy(() => import('./pages/AdminHero'))
const AdminNotice = lazy(() => import('./pages/AdminNotice'))
const AdminReturns = lazy(() => import('./pages/AdminReturns'))
const AdminSupport = lazy(() => import('./pages/AdminSupport'))
const AdminRedeemCodes = lazy(() => import('./pages/AdminRedeemCodes'))

// Fallback Loader for Suspense boundaries
const PageFallbackLoader = () => (
  <div className="flex min-h-screen items-center justify-center bg-matcha-bg">
    <div className="h-12 w-12 animate-spin rounded-full border-4 border-baby-green border-t-matcha-deep"></div>
  </div>
)

function App() {
  return (
    <CartProvider>
      <Analytics />
      <BrowserRouter>
        <Suspense fallback={<PageFallbackLoader />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/catalog" element={<Catalog />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/contact" element={<ContactUs />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/terms" element={<TermsConditions />} />
            <Route path="/refund-policy" element={<RefundPolicy />} />
            <Route path="/shipping-policy" element={<ShippingPolicy />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/order-success/:id" element={<OrderSuccess />} />
            <Route path="/requests" element={<ProtectedRoute><RequestsPage /></ProtectedRoute>} />
            <Route path="/orders" element={<ProtectedRoute><OrdersPage /></ProtectedRoute>} />
            <Route path="/admin/orders" element={<ProtectedRoute requireAdmin={true}><AdminOrders /></ProtectedRoute>} />
            <Route
              path="/admin/inventory"
              element={
                <ProtectedRoute requireAdmin={true}>
                  <AdminInventory />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin"
              element={
                <ProtectedRoute requireAdmin={true}>
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/categories"
              element={
                <ProtectedRoute requireAdmin={true}>
                  <AdminCategories />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/subcategories"
              element={
                <ProtectedRoute requireAdmin={true}>
                  <AdminSubcategories />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/brands"
              element={
                <ProtectedRoute requireAdmin={true}>
                  <AdminBrands />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/hero"
              element={
                <ProtectedRoute requireAdmin={true}>
                  <AdminHero />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/notice"
              element={
                <ProtectedRoute requireAdmin={true}>
                  <AdminNotice />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/returns"
              element={
                <ProtectedRoute requireAdmin={true}>
                  <AdminReturns />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/support"
              element={
                <ProtectedRoute requireAdmin={true}>
                  <AdminSupport />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/redeem-codes"
              element={
                <ProtectedRoute requireAdmin={true}>
                  <AdminRedeemCodes />
                </ProtectedRoute>
              }
            />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </CartProvider>
  )
}

export default App
