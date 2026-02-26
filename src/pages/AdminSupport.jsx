import { useEffect, useState } from 'react'
import AdminSidebar from '../components/Admin/AdminSidebar'
import NavBar from '../components/NavBar'
import api from '../api'

const STATUS_COLOURS = {
    open: 'border-yellow-400 bg-yellow-50 text-yellow-700',
    replied: 'border-blue-400 bg-blue-50 text-blue-700',
    closed: 'border-green-400 bg-green-50 text-green-700',
}

export default function AdminSupport() {
    const [tickets, setTickets] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [processingId, setProcessingId] = useState(null)

    // Reply modal state
    const [replyModalTicket, setReplyModalTicket] = useState(null)
    const [replyText, setReplyText] = useState('')
    const [sending, setSending] = useState(false)

    // Detail view state
    const [viewTicket, setViewTicket] = useState(null)

    useEffect(() => {
        fetchTickets()
    }, [])

    const fetchTickets = async () => {
        setLoading(true)
        try {
            const res = await api.get('/admin/support')
            setTickets(res.data)
        } catch (err) {
            setError(err.response?.data?.detail || 'Could not fetch support tickets')
        } finally {
            setLoading(false)
        }
    }

    const handleReply = async () => {
        if (!replyText.trim() || !replyModalTicket) return
        setSending(true)
        try {
            const res = await api.put(`/admin/support/${replyModalTicket.id}/reply`, { reply: replyText })
            setTickets(prev =>
                prev.map(t => t.id === replyModalTicket.id ? res.data : t)
            )
            setReplyModalTicket(null)
            setReplyText('')
        } catch (err) {
            alert('Failed: ' + (err.response?.data?.detail || err.message))
        } finally {
            setSending(false)
        }
    }

    const handleClose = async (ticketId) => {
        setProcessingId(ticketId)
        try {
            const res = await api.put(`/admin/support/${ticketId}/close`)
            setTickets(prev =>
                prev.map(t => t.id === ticketId ? res.data : t)
            )
        } catch (err) {
            alert('Failed: ' + (err.response?.data?.detail || err.message))
        } finally {
            setProcessingId(null)
        }
    }

    return (
        <div className="min-h-screen bg-matcha-bg text-charcoal-dark font-['Fredoka',sans-serif]">
            <NavBar showSearch={false} />
            <div className="mx-auto grid max-w-[1600px] grid-cols-1 gap-6 p-4 md:p-6 lg:grid-cols-[280px_1fr] lg:p-8">
                <AdminSidebar />

                <main className="space-y-6 overflow-hidden">
                    <section className="window-container border-none p-5">
                        <div className="mb-5 flex items-center justify-between">
                            <div>
                                <p className="text-xs font-bold tracking-widest text-matcha-deep uppercase">Customer Support</p>
                                <h1 className="text-3xl font-bold">Support Tickets</h1>
                            </div>
                            <button
                                id="refresh-tickets"
                                onClick={fetchTickets}
                                className="btn-glow flex items-center justify-center rounded-lg bg-baby-green/50 p-2 text-matcha-deep transition hover:bg-baby-green"
                            >
                                <span className="material-symbols-outlined text-xl">refresh</span>
                            </button>
                        </div>

                        {loading ? (
                            <div className="flex h-64 items-center justify-center">
                                <div className="h-8 w-8 animate-spin rounded-full border-4 border-baby-green border-t-matcha-deep"></div>
                            </div>
                        ) : error ? (
                            <div className="rounded-xl border-2 border-red-500/20 bg-red-500/10 p-6 text-center text-red-700 font-bold">
                                {error}
                            </div>
                        ) : tickets.length === 0 ? (
                            <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-baby-green bg-off-white/50 p-12 text-center">
                                <span className="material-symbols-outlined mb-2 text-4xl text-baby-green">support_agent</span>
                                <p className="font-bold text-charcoal-dark/70">No support tickets yet.</p>
                            </div>
                        ) : (
                            <div className="overflow-x-auto rounded-xl border border-baby-green/30">
                                <table className="w-full text-left text-sm whitespace-nowrap">
                                    <thead className="bg-baby-green/20 text-xs font-bold uppercase text-matcha-deep">
                                        <tr>
                                            <th className="px-5 py-4">Ticket ID</th>
                                            <th className="px-5 py-4">Customer</th>
                                            <th className="px-5 py-4">Subject</th>
                                            <th className="px-5 py-4">Date</th>
                                            <th className="px-5 py-4 text-center">Status</th>
                                            <th className="px-5 py-4 text-center">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-baby-green/30 bg-pure-white">
                                        {tickets.map((t) => (
                                            <tr key={t.id} className="transition-colors hover:bg-off-white/50">
                                                <td className="px-5 py-4 font-mono text-xs">{t.id.split('-')[0]}</td>
                                                <td className="px-5 py-4">
                                                    <p className="font-bold">{t.user_name}</p>
                                                    <p className="text-xs text-charcoal-dark/60">{t.user_email}</p>
                                                </td>
                                                <td className="px-5 py-4 max-w-[200px]">
                                                    <button
                                                        onClick={() => setViewTicket(t)}
                                                        className="truncate text-xs text-charcoal-dark/80 hover:text-matcha-deep hover:underline transition-colors text-left"
                                                        title={t.subject}
                                                    >
                                                        {t.subject}
                                                    </button>
                                                </td>
                                                <td className="px-5 py-4 text-xs text-charcoal-dark/70">
                                                    {new Date(t.created_at).toLocaleDateString()}
                                                </td>
                                                <td className="px-5 py-4 text-center">
                                                    <span className={`rounded-full px-3 py-1 text-xs font-bold uppercase border-2 ${STATUS_COLOURS[t.status] || 'border-gray-300 bg-gray-50 text-gray-600'}`}>
                                                        {t.status}
                                                    </span>
                                                </td>
                                                <td className="px-5 py-4 text-center">
                                                    <div className="flex justify-center gap-2">
                                                        <button
                                                            onClick={() => setViewTicket(t)}
                                                            className="rounded-lg bg-gray-100 border-2 border-gray-300 px-3 py-1 text-xs font-bold text-gray-700 hover:bg-gray-200 transition"
                                                        >
                                                            View
                                                        </button>
                                                        {t.status === 'open' && (
                                                            <button
                                                                onClick={() => { setReplyModalTicket(t); setReplyText('') }}
                                                                className="rounded-lg bg-blue-100 border-2 border-blue-500 px-3 py-1 text-xs font-bold text-blue-700 hover:bg-blue-200 transition"
                                                            >
                                                                Reply
                                                            </button>
                                                        )}
                                                        {t.status === 'replied' && (
                                                            <button
                                                                disabled={processingId === t.id}
                                                                onClick={() => handleClose(t.id)}
                                                                className="rounded-lg bg-green-100 border-2 border-green-500 px-3 py-1 text-xs font-bold text-green-700 hover:bg-green-200 transition disabled:opacity-50"
                                                            >
                                                                Close
                                                            </button>
                                                        )}
                                                        {t.status === 'closed' && (
                                                            <span className="text-xs text-charcoal-dark/50 italic">Resolved</span>
                                                        )}
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </section>
                </main>
            </div>

            {/* Reply Modal */}
            {replyModalTicket && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
                    <div className="w-full max-w-lg border-4 border-black bg-white shadow-brutal">
                        <div className="border-b-4 border-black bg-matcha-bg px-6 py-4 flex items-center justify-between">
                            <h3 className="text-lg font-black uppercase tracking-widest">Reply to Ticket</h3>
                            <button onClick={() => setReplyModalTicket(null)} className="text-2xl font-black hover:text-red-600 transition">×</button>
                        </div>
                        <div className="p-6 space-y-4">
                            <div>
                                <p className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-1">From</p>
                                <p className="font-bold">{replyModalTicket.user_name} ({replyModalTicket.user_email})</p>
                            </div>
                            <div>
                                <p className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-1">Subject</p>
                                <p className="font-bold">{replyModalTicket.subject}</p>
                            </div>
                            <div>
                                <p className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-1">Message</p>
                                <p className="text-sm text-gray-700 bg-gray-50 border-2 border-gray-200 p-3 rounded-lg max-h-32 overflow-y-auto">{replyModalTicket.message}</p>
                            </div>
                            <div>
                                <p className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-1">Your Reply</p>
                                <textarea
                                    value={replyText}
                                    onChange={(e) => setReplyText(e.target.value)}
                                    placeholder="Type your reply here..."
                                    rows={5}
                                    className="w-full border-4 border-black p-3 text-sm font-bold rounded-none focus:outline-none focus:border-matcha-deep resize-none"
                                />
                            </div>
                            <div className="flex justify-end gap-3">
                                <button
                                    onClick={() => setReplyModalTicket(null)}
                                    className="px-5 py-2 border-2 border-black text-sm font-black uppercase tracking-widest hover:bg-gray-100 transition"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleReply}
                                    disabled={sending || !replyText.trim()}
                                    className="px-5 py-2 bg-black text-white text-sm font-black uppercase tracking-widest hover:bg-matcha-deep transition disabled:opacity-50"
                                >
                                    {sending ? 'Sending...' : 'Send Reply'}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* View Ticket Modal */}
            {viewTicket && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
                    <div className="w-full max-w-lg border-4 border-black bg-white shadow-brutal max-h-[80vh] overflow-y-auto">
                        <div className="border-b-4 border-black bg-matcha-bg px-6 py-4 flex items-center justify-between sticky top-0">
                            <h3 className="text-lg font-black uppercase tracking-widest">Ticket Details</h3>
                            <button onClick={() => setViewTicket(null)} className="text-2xl font-black hover:text-red-600 transition">×</button>
                        </div>
                        <div className="p-6 space-y-4">
                            <div className="flex items-center justify-between">
                                <span className="font-mono text-xs text-gray-500">#{viewTicket.id.split('-')[0]}</span>
                                <span className={`rounded-full px-3 py-1 text-xs font-bold uppercase border-2 ${STATUS_COLOURS[viewTicket.status] || 'border-gray-300 bg-gray-50 text-gray-600'}`}>
                                    {viewTicket.status}
                                </span>
                            </div>
                            <div>
                                <p className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-1">Customer</p>
                                <p className="font-bold">{viewTicket.user_name}</p>
                                <p className="text-xs text-gray-500">{viewTicket.user_email}</p>
                            </div>
                            <div>
                                <p className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-1">Subject</p>
                                <p className="font-bold">{viewTicket.subject}</p>
                            </div>
                            <div>
                                <p className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-1">Message</p>
                                <div className="text-sm text-gray-700 bg-gray-50 border-2 border-gray-200 p-4 rounded-lg whitespace-pre-wrap">{viewTicket.message}</div>
                            </div>
                            {viewTicket.admin_reply && (
                                <div>
                                    <p className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-1">Admin Reply</p>
                                    <div className="text-sm text-gray-700 bg-green-50 border-2 border-green-200 p-4 rounded-lg whitespace-pre-wrap">{viewTicket.admin_reply}</div>
                                    {viewTicket.replied_at && (
                                        <p className="text-xs text-gray-400 mt-1">Replied: {new Date(viewTicket.replied_at).toLocaleString()}</p>
                                    )}
                                </div>
                            )}
                            <div className="text-xs text-gray-400">
                                Created: {new Date(viewTicket.created_at).toLocaleString()}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
