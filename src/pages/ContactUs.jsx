import StorefrontLayout from '../components/StorefrontLayout'
import { useState } from 'react'
import api from '../api'

export default function ContactUs() {
    const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' })
    const [submitting, setSubmitting] = useState(false)
    const [submitted, setSubmitted] = useState(false)
    const [error, setError] = useState(null)

    const handleChange = (e) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!formData.name || !formData.email || !formData.subject || !formData.message) return
        setSubmitting(true)
        setError(null)
        try {
            await api.post('/support/ticket', formData)
            setSubmitted(true)
            setFormData({ name: '', email: '', subject: '', message: '' })
        } catch (err) {
            setError(err.response?.data?.detail || 'Something went wrong. Please try again.')
        } finally {
            setSubmitting(false)
        }
    }

    return (
        <StorefrontLayout>
            <main className="w-full">
                <section className="px-6 lg:px-12 py-16 border-b-4 border-pure-black bg-white">
                    <h1 className="text-4xl md:text-6xl font-display font-black uppercase tracking-tighter text-black mb-4" style={{ textShadow: '4px 4px 0px #C6DCBA' }}>
                        Contact Us
                    </h1>
                    <p className="text-lg font-bold uppercase tracking-widest text-gray-500 max-w-2xl border-l-4 border-black pl-4">
                        Direct connection to the hub. Get support, ask questions, or find us in Greater Noida.
                    </p>
                </section>

                {/* FAQ Prompt */}
                <section className="px-6 lg:px-12 py-10 bg-matcha-bg border-b-4 border-pure-black">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-6 max-w-5xl mx-auto border-4 border-black bg-white p-8 shadow-brutal">
                        <div>
                            <h2 className="text-xl md:text-2xl font-black uppercase tracking-tighter mb-2">Have a quick question?</h2>
                            <p className="text-sm font-bold uppercase tracking-widest text-gray-500">Check our FAQ for instant answers about shipping, returns, and authenticity.</p>
                        </div>
                        <a href="/faq" className="px-8 py-3 bg-black text-white font-black uppercase tracking-widest text-xs border-4 border-black hover:bg-matcha-bg hover:text-black transition-all shadow-brutal-sm">
                            View FAQs
                        </a>
                    </div>
                </section>

                {/* Contact Form */}
                <section className="px-6 lg:px-12 py-20 bg-white border-b-4 border-pure-black">
                    <div className="max-w-2xl mx-auto">
                        <div className="bg-black text-white px-4 py-1 text-[10px] font-black uppercase tracking-[0.2em] inline-block mb-6">
                            Send_Message
                        </div>
                        <h2 className="text-3xl font-black uppercase tracking-tighter mb-8">
                            Get in <span className="text-matcha-dark">Touch</span>
                        </h2>

                        {submitted ? (
                            <div className="border-4 border-black bg-matcha-bg p-8 shadow-brutal text-center">
                                <span className="material-symbols-outlined text-5xl mb-4 text-matcha-dark">check_circle</span>
                                <h3 className="text-2xl font-black uppercase tracking-tighter mb-2">Message Sent!</h3>
                                <p className="text-sm font-bold text-black/70 mb-6">We'll get back to you within 24 hours. Check your email for a confirmation.</p>
                                <button
                                    onClick={() => setSubmitted(false)}
                                    className="px-6 py-3 bg-black text-white font-black uppercase tracking-widest text-xs border-4 border-black hover:bg-white hover:text-black transition-all"
                                >
                                    Send Another
                                </button>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-6">
                                {error && (
                                    <div className="border-4 border-red-500 bg-red-50 p-4 text-red-700 font-bold text-sm">
                                        {error}
                                    </div>
                                )}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-xs font-black uppercase tracking-widest mb-2">Name</label>
                                        <input
                                            type="text"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            required
                                            className="w-full border-4 border-black p-3 text-sm font-bold rounded-none focus:outline-none focus:border-matcha-dark"
                                            placeholder="Your name"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-black uppercase tracking-widest mb-2">Email</label>
                                        <input
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            required
                                            className="w-full border-4 border-black p-3 text-sm font-bold rounded-none focus:outline-none focus:border-matcha-dark"
                                            placeholder="you@email.com"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-xs font-black uppercase tracking-widest mb-2">Subject</label>
                                    <input
                                        type="text"
                                        name="subject"
                                        value={formData.subject}
                                        onChange={handleChange}
                                        required
                                        className="w-full border-4 border-black p-3 text-sm font-bold rounded-none focus:outline-none focus:border-matcha-dark"
                                        placeholder="What's this about?"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-black uppercase tracking-widest mb-2">Message</label>
                                    <textarea
                                        name="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        required
                                        rows={5}
                                        className="w-full border-4 border-black p-3 text-sm font-bold rounded-none focus:outline-none focus:border-matcha-dark resize-none"
                                        placeholder="Tell us more..."
                                    />
                                </div>
                                <button
                                    type="submit"
                                    disabled={submitting}
                                    className="px-10 py-4 bg-black text-white font-black uppercase tracking-widest text-sm border-4 border-black hover:bg-matcha-bg hover:text-black transition-all shadow-brutal-sm hover:shadow-none hover:translate-x-1 hover:translate-y-1 disabled:opacity-50"
                                >
                                    {submitting ? 'Sending...' : 'Send Message →'}
                                </button>
                            </form>
                        )}
                    </div>
                </section>

                {/* Contact Info Cards */}
                <section className="px-6 lg:px-12 py-20 bg-pure-black text-white grid grid-cols-1 md:grid-cols-3 gap-12">
                    <div className="border-4 border-white p-8 hover:bg-white hover:text-black transition-all group">
                        <span className="material-symbols-outlined text-4xl mb-4 group-hover:scale-110 transition-transform">location_on</span>
                        <h3 className="text-xl font-black uppercase tracking-widest mb-4">The Workshop</h3>
                        <p className="text-sm font-bold uppercase tracking-wider text-gray-400 group-hover:text-black/60 leading-relaxed">
                            ByteKart Campus<br />
                            Greater Noida<br />
                            UTTAR PRADESH, 201310
                        </p>
                    </div>

                    <div className="border-4 border-white p-8 hover:bg-matcha-bg hover:text-black transition-all group">
                        <span className="material-symbols-outlined text-4xl mb-4 group-hover:scale-110 transition-transform">alternate_email</span>
                        <h3 className="text-xl font-black uppercase tracking-widest mb-4">Digital Link</h3>
                        <p className="text-sm font-bold uppercase tracking-wider text-gray-400 group-hover:text-black/60 leading-relaxed">
                            Support:<br />
                            SUPPORT@MG.BYTEKART.CO.IN
                        </p>
                    </div>

                    <div className="border-4 border-white p-8 bg-matcha-bg text-black hover:bg-white transition-all group">
                        <span className="material-symbols-outlined text-4xl mb-4 group-hover:scale-110 transition-transform">schedule</span>
                        <h3 className="text-xl font-black uppercase tracking-widest mb-4">Uptime</h3>
                        <p className="text-sm font-bold uppercase tracking-wider text-black/60 leading-relaxed">
                            Mon - Fri: 09:00 - 21:00<br />
                            Sat: 10:00 - 18:00<br />
                            Sun: DEEP_SLEEP_MODE
                        </p>
                    </div>
                </section>
            </main>
        </StorefrontLayout>
    )
}
