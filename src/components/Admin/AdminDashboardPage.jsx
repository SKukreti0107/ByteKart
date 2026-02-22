import { useEffect, useState } from 'react'
import AdminSidebar from './AdminSidebar'
import NavBar from '../NavBar'
import api from '../../api'
import Skeleton from '../Loaders/Skeleton'

export default function AdminDashboardPage() {
    const [kpi, setKpi] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const res = await api.get('/admin/dashboard-stats')
                setKpi(res.data)
            } catch (err) {
                console.error("Failed to fetch admin stats", err)
            } finally {
                setLoading(false)
            }
        }
        fetchStats()
    }, [])

    return (
        <div className="min-h-screen bg-matcha-bg text-charcoal-dark font-['Fredoka',sans-serif]">
            <NavBar showSearch={false} />
            <div className="mx-auto grid max-w-[1600px] grid-cols-1 gap-6 p-4 md:p-6 lg:grid-cols-[280px_1fr] lg:p-8">
                <AdminSidebar />

                <main className="space-y-6">
                    <section className="window-container border-none p-5">
                        <div className="mb-5">
                            <p className="text-xs font-bold tracking-widest text-matcha-deep uppercase">ByteKart Overview</p>
                            <h1 className="text-3xl font-bold">Admin Dashboard</h1>
                        </div>

                        {/* Phase 1: High-Level Overview Cards */}
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                            {loading ? (
                                Array.from({ length: 4 }).map((_, idx) => (
                                    <div key={idx} className="rounded-xl border border-baby-green/30 bg-pure-white p-5 shadow-sm">
                                        <div className="mb-2 flex items-center justify-between text-matcha-deep">
                                            <Skeleton className="h-4 w-24" />
                                            <Skeleton className="h-6 w-6 rounded-full" />
                                        </div>
                                        <Skeleton className="h-8 w-16 mt-2" />
                                    </div>
                                ))
                            ) : kpi ? (
                                <>
                                    <div className="rounded-xl border border-baby-green/30 bg-pure-white p-5 shadow-sm">
                                        <div className="mb-2 flex items-center justify-between text-matcha-deep">
                                            <p className="text-xs font-bold uppercase tracking-wider">Total Products</p>
                                            <span className="material-symbols-outlined text-xl">inventory_2</span>
                                        </div>
                                        <p className="text-3xl font-bold">{kpi.totalProducts}</p>
                                    </div>

                                    <div className="rounded-xl border border-baby-green/30 bg-pure-white p-5 shadow-sm">
                                        <div className="mb-2 flex items-center justify-between text-matcha-deep">
                                            <p className="text-xs font-bold uppercase tracking-wider">Total Orders</p>
                                            <span className="material-symbols-outlined text-xl">local_shipping</span>
                                        </div>
                                        <p className="text-3xl font-bold">{kpi.totalOrders}</p>
                                    </div>

                                    <div className="rounded-xl border border-baby-green/30 bg-pure-white p-5 shadow-sm">
                                        <div className="mb-2 flex items-center justify-between text-matcha-deep">
                                            <p className="text-xs font-bold uppercase tracking-wider">Revenue</p>
                                            <span className="material-symbols-outlined text-xl">payments</span>
                                        </div>
                                        <p className="text-3xl font-bold">₹{(kpi.revenue || 0).toLocaleString()}</p>
                                    </div>

                                    <div className="rounded-xl border border-baby-green/30 bg-pure-white p-5 shadow-sm">
                                        <div className="mb-2 flex items-center justify-between text-matcha-deep">
                                            <p className="text-xs font-bold uppercase tracking-wider">Pending Requests</p>
                                            <span className="material-symbols-outlined text-xl">pending_actions</span>
                                        </div>
                                        <p className="text-3xl font-bold">{kpi.pendingRequests}</p>
                                    </div>
                                </>
                            ) : null}
                        </div>
                    </section>

                    {/* Phase 2: Analytics Placeholders */}
                    <section className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                        <div className="window-container col-span-1 border-none p-5 lg:col-span-2">
                            <div className="mb-4 flex items-center justify-between">
                                <h2 className="text-lg font-bold">Revenue Trends</h2>
                                <span className="rounded-full bg-baby-green/40 px-3 py-1 text-xs font-bold text-matcha-deep">Coming Soon</span>
                            </div>
                            <div className="flex h-64 items-center justify-center rounded-xl bg-off-white/50 text-charcoal-dark/40 border border-dashed border-baby-green">
                                <p className="flex items-center gap-2 font-semibold">
                                    <span className="material-symbols-outlined">bar_chart</span>
                                    Analytics Module Reservation
                                </p>
                            </div>
                        </div>

                        <div className="window-container col-span-1 border-none p-5">
                            <div className="mb-4 flex items-center justify-between">
                                <h2 className="text-lg font-bold">Top-Selling Products</h2>
                                <span className="rounded-full bg-baby-green/40 px-3 py-1 text-xs font-bold text-matcha-deep">Coming Soon</span>
                            </div>
                            <div className="flex h-64 items-center justify-center rounded-xl bg-off-white/50 text-charcoal-dark/40 border border-dashed border-baby-green">
                                <p className="flex items-center gap-2 font-semibold">
                                    <span className="material-symbols-outlined">insights</span>
                                    Analytics Module Reservation
                                </p>
                            </div>
                        </div>
                    </section>
                </main>
            </div>
        </div>
    )
}
