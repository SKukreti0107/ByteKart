import StorefrontLayout from '../components/StorefrontLayout'

export default function ShippingPolicy() {
    return (
        <StorefrontLayout>
            <main className="w-full">
                {/* Hero Header */}
                <section className="px-6 lg:px-12 py-16 border-b-4 border-pure-black bg-white">
                    <h1 className="text-4xl md:text-6xl font-display font-black uppercase tracking-tighter text-black mb-4" style={{ textShadow: '4px 4px 0px #C6DCBA' }}>
                        Shipping & Delivery
                    </h1>
                    <p className="text-lg font-bold uppercase tracking-widest text-gray-500 max-w-2xl border-l-4 border-black pl-4">
                        Last Updated: March 2, 2026. Everything you need to know about our "Book First, Pay After" process and delivery timelines.
                    </p>
                </section>

                {/* Content */}
                <section className="px-6 lg:px-12 py-20 bg-matcha-bg min-h-screen">
                    <div className="max-w-4xl mx-auto bg-white border-4 border-black p-8 md:p-16 shadow-brutal space-y-12">

                        <section>
                            <h2 className="text-2xl font-black uppercase tracking-tighter mb-6 border-b-4 border-black pb-2 inline-block">1. ORDER PROCESS (BOOK FIRST, PAY AFTER)</h2>
                            <div className="text-base font-bold leading-relaxed text-black/80 space-y-4">
                                <p>Orders on the Platform follow a <strong>“Book First, Pay After Confirmation”</strong> process. A Booking Request allows us to verify stock and pricing before any payment is made.</p>
                                <p>Upon submitting a “Booking Request”, your request will appear on the <strong>“My Requests”</strong> page. It will be forwarded to the relevant supplier to verify:</p>
                                <ul className="list-disc pl-6 space-y-1">
                                    <li>Product availability</li>
                                    <li>Final pricing (if applicable)</li>
                                    <li>Estimated dispatch timeline</li>
                                </ul>
                                <p>A request is converted into a confirmed order and visible on the <strong>“My Orders”</strong> page only after:</p>
                                <ul className="list-disc pl-6 space-y-1">
                                    <li>Supplier confirms availability; and</li>
                                    <li>The customer completes payment on the “My Requests” page upon receiving an “Approved” status.</li>
                                </ul>
                                <p>ByteKart reserves the right to decline any Booking Request in cases of stock unavailability, pricing changes, or supplier refusal.</p>
                            </div>
                        </section>

                        <section>
                            <h2 className="text-2xl font-black uppercase tracking-tighter mb-6 border-b-4 border-black pb-2 inline-block">2. DELIVERY TIMELINES</h2>
                            <div className="text-base font-bold leading-relaxed text-black/80 space-y-4">
                                <p>Delivery timelines displayed on the Platform are estimates only and are not guaranteed unless expressly confirmed in writing.</p>
                                <p>Estimated delivery time may vary depending on:</p>
                                <ul className="list-disc pl-6 space-y-1">
                                    <li>Product availability</li>
                                    <li>Supplier dispatch timelines</li>
                                    <li>Customer location</li>
                                    <li>Courier partner operations</li>
                                    <li>External factors beyond our control</li>
                                </ul>
                                <p>While we make reasonable efforts to ensure timely delivery, delays may occur due to unforeseen circumstances.</p>
                            </div>
                        </section>

                        <section>
                            <h2 className="text-2xl font-black uppercase tracking-tighter mb-6 border-b-4 border-black pb-2 inline-block">3. SHIPPING CHARGES</h2>
                            <div className="text-base font-bold leading-relaxed text-black/80 space-y-4">
                                <p>Shipping charges, if applicable, are calculated at checkout based on:</p>
                                <ul className="list-disc pl-6 space-y-1">
                                    <li>Delivery location</li>
                                    <li>Product weight/size</li>
                                    <li>Courier partner rates</li>
                                </ul>
                                <p>The total shipping cost will be displayed before payment and will form part of the final Transaction Amount.</p>
                            </div>
                        </section>

                        <section>
                            <h2 className="text-2xl font-black uppercase tracking-tighter mb-6 border-b-4 border-black pb-2 inline-block">4. ORDER TRACKING</h2>
                            <div className="text-base font-bold leading-relaxed text-black/80 space-y-4">
                                <p>Once your request has been paid and confirmed as an order, you can track its status on the <strong>“My Orders”</strong> page.</p>
                                <p>Tracking details (where available) will be shared via email, SMS, or through the Platform once the item is dispatched.</p>
                                <p>Customers are responsible for monitoring shipment status using the tracking information provided.</p>
                            </div>
                        </section>

                        <section>
                            <h2 className="text-2xl font-black uppercase tracking-tighter mb-6 border-b-4 border-black pb-2 inline-block">5. DELIVERY RESPONSIBILITY</h2>
                            <div className="text-base font-bold leading-relaxed text-black/80 space-y-4">
                                <p>Customers must ensure:</p>
                                <ul className="list-disc pl-6 space-y-1">
                                    <li>Accurate shipping address</li>
                                    <li>Availability at the time of delivery</li>
                                    <li>Correct contact details</li>
                                </ul>
                                <p>ByteKart shall not be responsible for delays or non-delivery caused due to:</p>
                                <ul className="list-disc pl-6 space-y-1">
                                    <li>Incorrect address provided</li>
                                    <li>Failed delivery attempts</li>
                                    <li>Customer unavailability</li>
                                    <li>Refusal to accept delivery</li>
                                </ul>
                                <p>Additional re-shipping charges may apply in such cases.</p>
                            </div>
                        </section>

                        <section>
                            <h2 className="text-2xl font-black uppercase tracking-tighter mb-6 border-b-4 border-black pb-2 inline-block">6. DELAYED OR NON-DELIVERY</h2>
                            <div className="text-base font-bold leading-relaxed text-black/80 space-y-4">
                                <p>If your order is not delivered within seven (7) days after the estimated delivery date, you must contact us promptly at:</p>
                                <p className="font-black">support@bytekart.co.in</p>
                                <p>We will coordinate with the courier partner or supplier to investigate and resolve the issue.</p>
                                <p>Claims regarding non-delivery must be raised within a reasonable timeframe to allow proper investigation with the logistics provider.</p>
                            </div>
                        </section>

                        <section>
                            <h2 className="text-2xl font-black uppercase tracking-tighter mb-6 border-b-4 border-black pb-2 inline-block">7. DAMAGED SHIPMENTS</h2>
                            <div className="text-base font-bold leading-relaxed text-black/80 space-y-4">
                                <p>If the package appears damaged at the time of delivery:</p>
                                <ul className="list-disc pl-6 space-y-1">
                                    <li>Do not accept the package if visibly tampered or severely damaged.</li>
                                    <li>Record an unboxing video clearly showing the package condition.</li>
                                    <li>Notify us within 24 hours of delivery with photo/video evidence.</li>
                                </ul>
                                <p>Failure to provide timely notification and supporting evidence may affect eligibility for replacement or claim processing.</p>
                            </div>
                        </section>

                        <section>
                            <h2 className="text-2xl font-black uppercase tracking-tighter mb-6 border-b-4 border-black pb-2 inline-block">8. RISK & TITLE TRANSFER</h2>
                            <div className="text-base font-bold leading-relaxed text-black/80 space-y-4">
                                <p>Risk of loss may pass to the customer upon successful handover of the product to the courier partner for delivery, subject to applicable courier terms.</p>
                                <p>However, ByteKart will reasonably assist in coordinating resolution for verified transit issues.</p>
                            </div>
                        </section>

                        <section>
                            <h2 className="text-2xl font-black uppercase tracking-tighter mb-6 border-b-4 border-black pb-2 inline-block">9. FORCE MAJEURE</h2>
                            <div className="text-base font-bold leading-relaxed text-black/80 space-y-4">
                                <p>ByteKart shall not be liable for delivery delays or failures caused by events beyond reasonable control, including but not limited to:</p>
                                <ul className="list-disc pl-6 space-y-1">
                                    <li>Natural disasters</li>
                                    <li>Government restrictions</li>
                                    <li>Strikes or transportation disruptions</li>
                                    <li>Supplier delays</li>
                                    <li>Pandemic-related disruptions</li>
                                </ul>
                            </div>
                        </section>

                    </div>
                </section>
            </main>
        </StorefrontLayout>
    )
}
