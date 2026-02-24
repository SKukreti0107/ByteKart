import StorefrontLayout from '../components/StorefrontLayout'
import ExtraCards from '../components/Home/ExtraCards'

export default function ContactUs() {
    return (
        <StorefrontLayout>
            <main className="w-full">
                <section className="px-6 lg:px-12 py-16 border-b-4 border-pure-black bg-white">
                    <h1 className="text-4xl md:text-6xl font-display font-black uppercase tracking-tighter text-black mb-4" style={{ textShadow: '4px 4px 0px #C6DCBA' }}>
                        Contact Us
                    </h1>
                    <p className="text-lg font-bold uppercase tracking-widest text-gray-500 max-w-2xl border-l-4 border-black pl-4">
                        Direct connection to the hub. Get support, request custom system builds, or find us in the physical world.
                    </p>
                </section>

                <ExtraCards />

                <section className="px-6 lg:px-12 py-20 bg-pure-black text-white grid grid-cols-1 md:grid-cols-3 gap-12">
                    <div className="border-4 border-white p-8 hover:bg-white hover:text-black transition-all group">
                        <span className="material-symbols-outlined text-4xl mb-4 group-hover:scale-110 transition-transform">location_on</span>
                        <h3 className="text-xl font-black uppercase tracking-widest mb-4">The Workshop</h3>
                        <p className="text-sm font-bold uppercase tracking-wider text-gray-400 group-hover:text-black/60 leading-relaxed">
                            404 Hardware Street<br />
                            Silicon District<br />
                            BENGALURU, KA 560001
                        </p>
                    </div>

                    <div className="border-4 border-white p-8 hover:bg-matcha-bg hover:text-black transition-all group">
                        <span className="material-symbols-outlined text-4xl mb-4 group-hover:scale-110 transition-transform">alternate_email</span>
                        <h3 className="text-xl font-black uppercase tracking-widest mb-4">Digital Link</h3>
                        <p className="text-sm font-bold uppercase tracking-wider text-gray-400 group-hover:text-black/60 leading-relaxed">
                            Support: @BYTEKART.COM<br />
                            Press: HUB@BYTEKART.COM<br />
                            Phone: +91 80 000 404
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
