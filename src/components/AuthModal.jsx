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
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-charcoal-dark/50 p-4 backdrop-blur-sm">
            <div className="relative w-full max-w-md rounded-2xl bg-pure-white p-8 shadow-2xl">
                <button
                    onClick={handleClose}
                    className="absolute right-4 top-4 text-charcoal-dark/50 hover:text-charcoal-dark"
                    aria-label="Close modal"
                >
                    <span className="material-symbols-outlined text-2xl">close</span>
                </button>

                <div className="mb-8 text-center">
                    <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-baby-green text-matcha-deep">
                        <span className="material-symbols-outlined text-3xl">bolt</span>
                    </div>
                    <h2 className="text-2xl font-bold text-charcoal-dark">
                        {isLogin ? 'Welcome back' : 'Create an account'}
                    </h2>
                    <p className="mt-2 text-sm text-charcoal-dark/60">
                        {isLogin
                            ? 'Enter your details to access your gear.'
                            : 'Join us and start shopping premium tech.'}
                    </p>
                </div>

                {error && (
                    <div className="mb-4 rounded-xl bg-red-50 p-3 text-sm font-semibold text-red-500">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    {!isLogin && (
                        <div>
                            <label className="mb-1 block text-sm font-bold text-charcoal-dark" htmlFor="name">
                                Full Name
                            </label>
                            <input
                                id="name"
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required={!isLogin}
                                className="w-full rounded-xl border-none bg-off-white px-4 py-3 font-medium focus:ring-2 focus:ring-baby-green"
                                placeholder="John Doe"
                            />
                        </div>
                    )}

                    <div>
                        <label className="mb-1 block text-sm font-bold text-charcoal-dark" htmlFor="email">
                            Email
                        </label>
                        <input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="w-full rounded-xl border-none bg-off-white px-4 py-3 font-medium focus:ring-2 focus:ring-baby-green"
                            placeholder="you@example.com"
                        />
                    </div>

                    <div>
                        <label className="mb-1 block text-sm font-bold text-charcoal-dark" htmlFor="password">
                            Password
                        </label>
                        <input
                            id="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            minLength={8}
                            className="w-full rounded-xl border-none bg-off-white px-4 py-3 font-medium focus:ring-2 focus:ring-baby-green"
                            placeholder="••••••••"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full rounded-xl bg-matcha-deep py-3 font-bold text-white transition-all hover:bg-opacity-90 disabled:cursor-not-allowed disabled:opacity-70"
                    >
                        {loading ? 'Processing...' : isLogin ? 'Sign In' : 'Sign Up'}
                    </button>
                </form>

                <div className="mt-6 text-center text-sm">
                    <span className="text-charcoal-dark/60">
                        {isLogin ? "Don't have an account? " : "Already have an account? "}
                    </span>
                    <button
                        type="button"
                        onClick={toggleMode}
                        className="font-bold text-matcha-deep hover:underline"
                    >
                        {isLogin ? 'Sign up' : 'Log in'}
                    </button>
                </div>
            </div>
        </div>
    )
}
