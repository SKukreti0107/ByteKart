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
        <div className="min-h-screen bg-pure-white text-black font-['Inter',sans-serif]">
            <NavBar showSearch={false} />
            <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 mt-8 lg:mt-12 px-6 lg:px-12 max-w-[1600px] mx-auto mb-20">
                <AdminSidebar />

                <main className="flex-grow">
                    <div className="mb-8 border-b-4 border-black pb-6 flex justify-between items-end">
                        <div>
                            <h1 className="text-4xl md:text-5xl font-display font-black uppercase tracking-tighter text-black" style={{ textShadow: '3px 3px 0px #C6DCBA' }}>Overview</h1>
                            <p className="text-sm font-bold text-gray-500 uppercase tracking-widest mt-2">System Status: Online</p>
                        </div>
                    </div>

                    {/* Phase 1: High-Level Overview Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-12">
                        {loading ? (
                            Array.from({ length: 4 }).map((_, idx) => (
                                <div key={idx} className="bg-white border-4 border-black p-6 shadow-brutal hover:-translate-y-1 transition-transform">
                                    <div className="mb-4 flex items-start justify-between">
                                        <Skeleton className="h-4 w-24 bg-gray-200" />
                                        <Skeleton className="h-8 w-8 rounded-none bg-gray-200" />
                                    </div>
                                    <Skeleton className="h-10 w-20 mt-2 bg-gray-200" />
                                </div>
                            ))
                        ) : kpi ? (
                            <>
                                <div className="bg-white border-4 border-black p-6 shadow-brutal hover:-translate-y-1 transition-transform group">
                                    <div className="flex justify-between items-start mb-4">
                                        <p className="text-sm font-black uppercase tracking-widest text-black">Total Products</p>
                                        <span className="material-symbols-outlined text-2xl group-hover:scale-110 transition-transform">inventory_2</span>
                                    </div>
                                    <p className="text-4xl font-black text-black">{kpi.totalProducts}</p>
                                </div>

                                <div className="bg-white border-4 border-black p-6 shadow-brutal hover:-translate-y-1 transition-transform group">
                                    <div className="flex justify-between items-start mb-4">
                                        <p className="text-sm font-black uppercase tracking-widest text-black">Total Orders</p>
                                        <span className="material-symbols-outlined text-2xl group-hover:scale-110 transition-transform">local_shipping</span>
                                    </div>
                                    <p className="text-4xl font-black text-black">{kpi.totalOrders}</p>
                                </div>

                                <div className="bg-white border-4 border-black p-6 shadow-brutal hover:-translate-y-1 transition-transform group">
                                    <div className="flex justify-between items-start mb-4">
                                        <p className="text-sm font-black uppercase tracking-widest text-black">Revenue</p>
                                        <span className="material-symbols-outlined text-2xl group-hover:scale-110 transition-transform">payments</span>
                                    </div>
                                    <p className="text-4xl font-black text-black">₹{(kpi.revenue || 0).toLocaleString()}</p>
                                </div>

                                <div className="bg-white border-4 border-black p-6 shadow-brutal hover:-translate-y-1 transition-transform group">
                                    <div className="flex justify-between items-start mb-4">
                                        <p className="text-sm font-black uppercase tracking-widest text-black">Pending Requests</p>
                                        <span className="material-symbols-outlined text-2xl group-hover:scale-110 transition-transform">pending_actions</span>
                                    </div>
                                    <p className="text-4xl font-black text-black">{kpi.pendingRequests}</p>
                                </div>
                            </>
                        ) : null}
                    </div>

                    {/* Phase 2: Analytics Placeholders */}
                    <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <div className="bg-white border-4 border-black shadow-brutal hover:-translate-y-1 transition-transform group p-6">
                            <div className="mb-6 flex justify-between items-center border-b-4 border-black pb-4">
                                <h2 className="text-2xl font-black uppercase tracking-widest text-black">Revenue Trends</h2>
                                <span className="bg-black text-matcha-bg px-2 py-1 text-[10px] font-black uppercase tracking-widest border-2 border-black">Coming Soon</span>
                            </div>
                            <div className="flex h-64 items-center justify-center border-4 border-dashed border-gray-300 bg-[#f9f9f9]">
                                <p className="flex items-center gap-2 font-black uppercase tracking-widest text-gray-400 text-sm">
                                    <span className="material-symbols-outlined">bar_chart</span>
                                    Analytics Module Reservation
                                </p>
                            </div>
                        </div>

                        <div className="bg-white border-4 border-black shadow-brutal hover:-translate-y-1 transition-transform group p-6">
                            <div className="mb-6 flex justify-between items-center border-b-4 border-black pb-4">
                                <h2 className="text-2xl font-black uppercase tracking-widest text-black">Top-Selling Products</h2>
                                <span className="bg-black text-matcha-bg px-2 py-1 text-[10px] font-black uppercase tracking-widest border-2 border-black">Coming Soon</span>
                            </div>
                            <div className="flex h-64 items-center justify-center border-4 border-dashed border-gray-300 bg-[#f9f9f9]">
                                <p className="flex items-center gap-2 font-black uppercase tracking-widest text-gray-400 text-sm">
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
