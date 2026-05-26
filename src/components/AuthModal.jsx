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

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        setError('')

        try {
            if (isLogin) {
                const { error: signInError } = await authClient.signIn.email({
                    email,
                    password,
                })
                if (signInError) throw new Error(signInError.message || 'Failed to sign in')
                handleClose()
            } else {
                const { error: signUpError } = await authClient.signUp.email({
                    email,
                    password,
                    name,
                })
                if (signUpError) throw new Error(signUpError.message || 'Failed to sign up')
                handleClose()
            }
        } catch (err) {
            setError(err.message || 'An error occurred during authentication.')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm overflow-y-auto">
            <div className="relative w-full max-w-md border-4 border-black bg-pure-white p-6 sm:p-8 shadow-brutal my-auto overflow-hidden">
                {/* Dotted Grid Background */}
                <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#000000_1px,transparent_1px)] [background-size:10px_10px]"></div>

                {/* Close Button */}
                <button
                    onClick={handleClose}
                    className="absolute -right-3 -top-3 sm:-right-4 sm:-top-4 w-10 h-10 bg-white border-4 border-black flex items-center justify-center hover:bg-black hover:text-matcha-bg transition-colors z-20 shadow-[3px_3px_0px_rgba(0,0,0,1)] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none"
                    aria-label="Close modal"
                >
                    <span className="material-symbols-outlined text-xl font-black">close</span>
                </button>

                {/* Interactive Mode Switching Tabs */}
                <div className="grid grid-cols-2 gap-2 mb-6 sm:mb-8 relative z-10">
                    <button
                        type="button"
                        onClick={() => { setIsLogin(true); setError('') }}
                        className={`py-3 text-xs sm:text-sm font-display font-black uppercase tracking-widest border-4 border-black transition-all ${
                            isLogin 
                                ? 'bg-black text-matcha-bg shadow-none translate-x-0.5 translate-y-0.5' 
                                : 'bg-white text-black shadow-[3px_3px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-0.5 hover:translate-y-0.5'
                        }`}
                    >
                        Login
                    </button>
                    <button
                        type="button"
                        onClick={() => { setIsLogin(false); setError('') }}
                        className={`py-3 text-xs sm:text-sm font-display font-black uppercase tracking-widest border-4 border-black transition-all ${
                            !isLogin 
                                ? 'bg-black text-matcha-bg shadow-none translate-x-0.5 translate-y-0.5' 
                                : 'bg-white text-black shadow-[3px_3px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-0.5 hover:translate-y-0.5'
                        }`}
                    >
                        Register
                    </button>
                </div>

                {/* Portal Header */}
                <div className="mb-6 sm:mb-8 text-center relative z-10">
                    <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center border-4 border-black bg-matcha-bg shadow-[3px_3px_0px_rgba(0,0,0,1)] rotate-[-3deg]">
                        <span className="material-symbols-outlined text-2xl font-black text-black">
                            {isLogin ? 'vpn_key' : 'person_add'}
                        </span>
                    </div>
                    <h2 className="text-xl sm:text-2xl font-display font-black uppercase tracking-tight text-black">
                        {isLogin ? 'Access Portal' : 'Register Terminal'}
                    </h2>
                </div>

                {/* Error Banner */}
                {error && (
                    <div className="mb-6 border-4 border-black bg-red-50 p-4 text-xs font-black uppercase tracking-widest text-red-600 shadow-[3px_3px_0px_rgba(220,38,38,1)] relative z-10">
                        {error}
                    </div>
                )}

                {/* Input Fields */}
                <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6 relative z-10">
                    {!isLogin && (
                        <div className="flex flex-col gap-2">
                            <label className="text-[10px] font-black uppercase tracking-widest text-black/60" htmlFor="name">
                                Full Name
                            </label>
                            <input
                                id="name"
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required={!isLogin}
                                className="w-full border-4 border-black bg-[#fcfdfc] px-4 py-3 font-bold text-black outline-none shadow-[2px_2px_0px_rgba(0,0,0,1)] focus:shadow-none focus:translate-x-0.5 focus:translate-y-0.5 transition-all placeholder:text-gray-300"
                                placeholder="IDENTIFY YOURSELF"
                            />
                        </div>
                    )}

                    <div className="flex flex-col gap-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-black/60" htmlFor="email">
                            Email Address
                        </label>
                        <input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="w-full border-4 border-black bg-[#fcfdfc] px-4 py-3 font-bold text-black outline-none shadow-[2px_2px_0px_rgba(0,0,0,1)] focus:shadow-none focus:translate-x-0.5 focus:translate-y-0.5 transition-all placeholder:text-gray-300"
                            placeholder="USER@HUB.COM"
                        />
                    </div>

                    <div className="flex flex-col gap-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-black/60" htmlFor="password">
                            Password Key
                        </label>
                        <input
                            id="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            minLength={8}
                            className="w-full border-4 border-black bg-[#fcfdfc] px-4 py-3 font-bold text-black outline-none shadow-[2px_2px_0px_rgba(0,0,0,1)] focus:shadow-none focus:translate-x-0.5 focus:translate-y-0.5 transition-all placeholder:text-gray-300"
                            placeholder="••••••••"
                        />
                    </div>

                    {/* Authentication Submit Button */}
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full border-4 border-black bg-[#E8EFE5] text-black py-4 font-display font-black uppercase tracking-widest text-sm shadow-[4px_4px_0px_rgba(0,0,0,1)] hover:bg-black hover:text-matcha-bg hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all disabled:cursor-not-allowed disabled:opacity-50 flex items-center justify-center gap-2"
                    >
                        {loading ? (
                            <>
                                <span className="material-symbols-outlined animate-spin text-lg">progress_activity</span>
                                Processing...
                            </>
                        ) : (
                            <>
                                <span className="material-symbols-outlined text-lg">power_settings_new</span>
                                {isLogin ? 'Authenticate' : 'Establish Record'}
                            </>
                        )}
                    </button>
                </form>

                {/* Footer security tag */}
                <div className="mt-8 text-center relative z-10 border-t-2 border-dashed border-black/10 pt-4">
                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 leading-relaxed">
                        Secure terminal access. All credentials encrypted.
                    </p>
                </div>
            </div>
        </div>
    )
}
