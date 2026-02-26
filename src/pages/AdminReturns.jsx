import { useEffect, useState } from 'react'
import AdminSidebar from '../components/Admin/AdminSidebar'
import NavBar from '../components/NavBar'
import api from '../api'

const STATUS_COLOURS = {
    pending: 'border-yellow-400 bg-yellow-50 text-yellow-700',
    approved: 'border-green-400 bg-green-50 text-green-700',
    rejected: 'border-red-400 bg-red-50 text-red-700',
}

export default function AdminReturns() {
    const [returns, setReturns] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [processingId, setProcessingId] = useState(null)

    useEffect(() => {
        fetchReturns()
    }, [])

    const fetchReturns = async () => {
        setLoading(true)
        try {
            const res = await api.get('/admin/returns')
            setReturns(res.data)
        } catch (err) {
            setError(err.response?.data?.detail || 'Could not fetch return requests')
        } finally {
            setLoading(false)
        }
    }

    const handleDecision = async (returnId, decision) => {
        setProcessingId(returnId)
        try {
            await api.put(`/admin/returns/${returnId}/status`, { status: decision })
            setReturns(prev =>
                prev.map(r => r.id === returnId ? { ...r, status: decision } : r)
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
                                <p className="text-xs font-bold tracking-widest text-matcha-deep uppercase">Customer Returns</p>
                                <h1 className="text-3xl font-bold">Manage Returns</h1>
                            </div>
                            <button
                                id="refresh-returns"
                                onClick={fetchReturns}
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
                        ) : returns.length === 0 ? (
                            <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-baby-green bg-off-white/50 p-12 text-center">
                                <span className="material-symbols-outlined mb-2 text-4xl text-baby-green">assignment_return</span>
                                <p className="font-bold text-charcoal-dark/70">No return requests yet.</p>
                            </div>
                        ) : (
                            <div className="overflow-x-auto rounded-xl border border-baby-green/30">
                                <table className="w-full text-left text-sm whitespace-nowrap">
                                    <thead className="bg-baby-green/20 text-xs font-bold uppercase text-matcha-deep">
                                        <tr>
                                            <th className="px-5 py-4">Return ID</th>
                                            <th className="px-5 py-4">Order ID</th>
                                            <th className="px-5 py-4">Customer</th>
                                            <th className="px-5 py-4">Amount</th>
                                            <th className="px-5 py-4">Reason</th>
                                            <th className="px-5 py-4">Requested</th>
                                            <th className="px-5 py-4 text-center">Status</th>
                                            <th className="px-5 py-4 text-center">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-baby-green/30 bg-pure-white">
                                        {returns.map((r) => (
                                            <tr key={r.id} className="transition-colors hover:bg-off-white/50">
                                                <td className="px-5 py-4 font-mono text-xs">{r.id.split('-')[0]}</td>
                                                <td className="px-5 py-4 font-mono text-xs">{r.order_id.split('-')[0]}</td>
                                                <td className="px-5 py-4">
                                                    <p className="font-bold">{r.user_name || '—'}</p>
                                                    <p className="text-xs text-charcoal-dark/60">{r.user_email}</p>
                                                </td>
                                                <td className="px-5 py-4 font-bold text-matcha-deep">
                                                    {r.total_amount != null ? `₹${r.total_amount.toFixed(2)}` : '—'}
                                                </td>
                                                <td className="px-5 py-4 max-w-[200px]">
                                                    <p className="truncate text-xs text-charcoal-dark/80" title={r.reason}>{r.reason}</p>
                                                </td>
                                                <td className="px-5 py-4 text-xs text-charcoal-dark/70">
                                                    {new Date(r.created_at).toLocaleDateString()}
                                                </td>
                                                <td className="px-5 py-4 text-center">
                                                    <span className={`rounded-full px-3 py-1 text-xs font-bold uppercase border-2 ${STATUS_COLOURS[r.status] || 'border-gray-300 bg-gray-50 text-gray-600'}`}>
                                                        {r.status}
                                                    </span>
                                                </td>
                                                <td className="px-5 py-4 text-center">
                                                    {r.status === 'pending' ? (
                                                        <div className="flex justify-center gap-2">
                                                            <button
                                                                id={`approve-${r.id}`}
                                                                disabled={processingId === r.id}
                                                                onClick={() => handleDecision(r.id, 'approved')}
                                                                className="rounded-lg bg-green-100 border-2 border-green-500 px-3 py-1 text-xs font-bold text-green-700 hover:bg-green-200 transition disabled:opacity-50"
                                                            >
                                                                Approve
                                                            </button>
                                                            <button
                                                                id={`reject-${r.id}`}
                                                                disabled={processingId === r.id}
                                                                onClick={() => handleDecision(r.id, 'rejected')}
                                                                className="rounded-lg bg-red-100 border-2 border-red-400 px-3 py-1 text-xs font-bold text-red-700 hover:bg-red-200 transition disabled:opacity-50"
                                                            >
                                                                Reject
                                                            </button>
                                                        </div>
                                                    ) : (
                                                        <span className="text-xs text-charcoal-dark/50 italic">Actioned</span>
                                                    )}
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
        </div>
    )
}
