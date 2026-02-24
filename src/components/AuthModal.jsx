import { useState } from 'react'
import { authClient } from '../auth-client'

export default function AuthModal({ isOpen, onClose }) {
    const [isLogin, setIsLogin] = useState(true)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [name, setName] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    if (!isOpen) return null

    const resetState = () => {
        setEmail('')
        setPassword('')
        setName('')
        setError('')
        setLoading(false)
    }

    const handleClose = () => {
        resetState()
        onClose()
    }

    const toggleMode = () => {
        setIsLogin(!isLogin)
        resetState()
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        setError('')

        try {
            if (isLogin) {
                const { data, error } = await authClient.signIn.email({
                    email,
                    password,
                })
                if (error) throw new Error(error.message || 'Failed to sign in')
                handleClose()
            } else {
                const { data, error } = await authClient.signUp.email({
                    email,
                    password,
                    name,
                })
                if (error) throw new Error(error.message || 'Failed to sign up')
                handleClose()
            }
        } catch (err) {
            setError(err.message || 'An error occurred during authentication.')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
            <div className="relative w-full max-w-md border-4 border-black bg-pure-white p-8 shadow-brutal">
                <button
                    onClick={handleClose}
                    className="absolute -right-4 -top-4 w-10 h-10 bg-white border-4 border-black flex items-center justify-center hover:bg-black hover:text-white transition-colors z-20 shadow-brutal-sm"
                    aria-label="Close modal"
                >
                    <span className="material-symbols-outlined text-xl">close</span>
                </button>

                <div className="mb-10 text-center">
                    <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center border-4 border-black bg-matcha-bg shadow-brutal-sm">
                        <span className="material-symbols-outlined text-4xl text-black">terminal</span>
                    </div>
                    <h2 className="text-3xl font-black uppercase tracking-tighter text-black">
                        {isLogin ? 'Welcome Back' : 'Create Account'}
                    </h2>
                    <p className="mt-2 text-xs font-black uppercase tracking-[0.2em] text-gray-500">
                        {isLogin
                            ? 'Login'
                            : 'Register'}
                    </p>
                </div>

                {error && (
                    <div className="mb-6 border-4 border-black bg-red-100 p-4 text-xs font-black uppercase tracking-widest text-red-600">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                    {!isLogin && (
                        <div>
                            <label className="mb-2 block text-xs font-black uppercase tracking-widest text-black/50" htmlFor="name">
                                Full Name
                            </label>
                            <input
                                id="name"
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required={!isLogin}
                                className="w-full border-b-4 border-gray-200 bg-transparent px-0 py-3 font-bold text-black outline-none transition-colors placeholder:text-gray-300 focus:border-black rounded-none"
                                placeholder="IDENTIFY YOURSELF"
                            />
                        </div>
                    )}

                    <div>
                        <label className="mb-2 block text-xs font-black uppercase tracking-widest text-black/50" htmlFor="email">
                            Email address
                        </label>
                        <input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="w-full border-b-4 border-gray-200 bg-transparent px-0 py-3 font-bold text-black outline-none transition-colors placeholder:text-gray-300 focus:border-black rounded-none"
                            placeholder="USER@HUB.COM"
                        />
                    </div>

                    <div>
                        <label className="mb-2 block text-xs font-black uppercase tracking-widest text-black/50" htmlFor="password">
                            Password key
                        </label>
                        <input
                            id="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            minLength={8}
                            className="w-full border-b-4 border-gray-200 bg-transparent px-0 py-3 font-bold text-black outline-none transition-colors placeholder:text-gray-300 focus:border-black rounded-none"
                            placeholder="••••••••"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full border-4 border-black bg-black py-5 font-black uppercase tracking-widest text-white shadow-brutal hover:bg-white hover:text-black transition-all hover:translate-x-1 hover:translate-y-1 hover:shadow-none disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        {loading ? 'Processing...' : isLogin ? 'Authenticate' : 'Establish Record'}
                    </button>
                </form>

                <div className="mt-10 text-center">
                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-4 leading-relaxed">
                        Secure terminal access. All credentials encrypted.
                    </p>
                    <button
                        type="button"
                        onClick={toggleMode}
                        className="text-xs font-black uppercase tracking-widest text-black underline underline-offset-4 hover:bg-black hover:text-white transition-colors px-2 py-1"
                    >
                        {isLogin ? 'Sign up' : 'Existing user? Login'}
                    </button>
                </div>
            </div>
        </div>
    )
}
