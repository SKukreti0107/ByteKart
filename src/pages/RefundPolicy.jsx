import StorefrontLayout from '../components/StorefrontLayout'

export default function RefundPolicy() {
    return (
        <StorefrontLayout>
            <main className="w-full">
                {/* Hero Header */}
                <section className="px-6 lg:px-12 py-16 border-b-4 border-pure-black bg-white">
                    <h1 className="text-4xl md:text-6xl font-display font-black uppercase tracking-tighter text-black mb-4" style={{ textShadow: '4px 4px 0px #C6DCBA' }}>
                        Refund & Cancellation
                    </h1>
                    <p className="text-lg font-bold uppercase tracking-widest text-gray-500 max-w-2xl border-l-4 border-black pl-4">
                        Last Updated: March 2, 2026. Our policies on order cancellations, returns, and refund eligibility.
                    </p>
                </section>

                {/* Content */}
                <section className="px-6 lg:px-12 py-20 bg-matcha-bg min-h-screen">
                    <div className="max-w-4xl mx-auto bg-white border-4 border-black p-8 md:p-16 shadow-brutal space-y-12">

                        <section>
                            <h2 className="text-2xl font-black uppercase tracking-tighter mb-6 border-b-4 border-black pb-2 inline-block">1. TRANSACTION AGREEMENT</h2>
                            <div className="text-base font-bold leading-relaxed text-black/80 space-y-4">
                                <p>Upon successful completion of a Transaction, you enter into a legally binding and enforceable agreement with ByteKart for the purchase of the selected product and/or service.</p>
                            </div>
                        </section>

                        <section>
                            <h2 className="text-2xl font-black uppercase tracking-tighter mb-6 border-b-4 border-black pb-2 inline-block">2. CANCELLATION POLICY</h2>
                            <div className="text-base font-bold leading-relaxed text-black/80 space-y-4">
                                <p>Orders may be cancelled prior to dispatch only if a cancellation option is specifically provided on the Platform or permitted under the applicable product listing.</p>
                                <p>Cancellation requests are subject to review and approval by ByteKart. We reserve the right to request additional information before approving any cancellation request.</p>
                                <p>Once the product has been dispatched or delivered, cancellation shall not be permitted except in cases where:</p>
                                <ul className="list-disc pl-6 space-y-1">
                                    <li>The product delivered is materially different from the description provided on the Platform;</li>
                                    <li>The product is damaged in transit (with valid proof);</li>
                                    <li>The product is Dead on Arrival (DOA) or has a verified manufacturing defect.</li>
                                </ul>
                            </div>
                        </section>

                        <section>
                            <h2 className="text-2xl font-black uppercase tracking-tighter mb-6 border-b-4 border-black pb-2 inline-block">3. RETURNS & REPLACEMENTS</h2>
                            <div className="text-base font-bold leading-relaxed text-black/80 space-y-4">
                                <p>Any request for return, replacement, or refund must be submitted within five (5) calendar days from the date of delivery, or such longer period as may be specified on the relevant product page, but in no case less than five (5) days.</p>
                            </div>
                        </section>

                        <section>
                            <h2 className="text-2xl font-black uppercase tracking-tighter mb-6 border-b-4 border-black pb-2 inline-block">4. INITIATING A REQUEST</h2>
                            <div className="text-base font-bold leading-relaxed text-black/80 space-y-4">
                                <p>To initiate a return or refund request for a confirmed order, the User must submit the request through the <strong>“My Orders”</strong> page or contact us at:</p>
                                <p className="font-black">support@bytekart.co.in</p>
                                <p>The request must include:</p>
                                <ul className="list-disc pl-6 space-y-1">
                                    <li>Order ID</li>
                                    <li>Clear reason for the request</li>
                                    <li>Supporting evidence (such as unboxing video, images, or defect proof, where applicable)</li>
                                </ul>
                            </div>
                        </section>

                        <section>
                            <h2 className="text-2xl font-black uppercase tracking-tighter mb-6 border-b-4 border-black pb-2 inline-block">5. REFUND ELIGIBILITY & PROCESSING</h2>
                            <div className="text-base font-bold leading-relaxed text-black/80 space-y-4">
                                <p>Refund eligibility shall be determined after review and verification. ByteKart may request additional documentation before processing any refund or replacement.</p>
                                <p>If approved, refunds will be processed to the original payment method within a reasonable timeframe, subject to banking and payment gateway processing timelines.</p>
                            </div>
                        </section>

                    </div>
                </section>
            </main>
        </StorefrontLayout>
    )
}
