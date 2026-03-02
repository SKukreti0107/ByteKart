import StorefrontLayout from '../components/StorefrontLayout'

export default function TermsConditions() {
    return (
        <StorefrontLayout>
            <main className="w-full">
                {/* Hero Header */}
                <section className="px-6 lg:px-12 py-16 border-b-4 border-pure-black bg-white">
                    <h1 className="text-4xl md:text-6xl font-display font-black uppercase tracking-tighter text-black mb-4" style={{ textShadow: '4px 4px 0px #C6DCBA' }}>
                        Terms & Conditions
                    </h1>
                    <p className="text-lg font-bold uppercase tracking-widest text-gray-500 max-w-2xl border-l-4 border-black pl-4">
                        Last Updated: March 2, 2026. These terms govern your access to and use of the ByteKart platform.
                    </p>
                </section>

                {/* Content */}
                <section className="px-6 lg:px-12 py-20 bg-matcha-bg min-h-screen">
                    <div className="max-w-4xl mx-auto bg-white border-4 border-black p-8 md:p-16 shadow-brutal space-y-12">

                        <section>
                            <h2 className="text-2xl font-black uppercase tracking-tighter mb-6 border-b-4 border-black pb-2 inline-block">1. INTRODUCTION</h2>
                            <div className="text-base font-bold leading-relaxed text-black/80 space-y-4">
                                <p>These Terms & Conditions (“Terms”) govern your access to and use of the ByteKart website (“Platform”).</p>
                                <p>By using the Platform, you agree to be legally bound by these Terms. If you do not agree, you must not use the Platform.</p>
                                <p>ByteKart reserves the right to update these Terms at any time. Continued use of the Platform constitutes acceptance of the updated Terms.</p>
                            </div>
                        </section>

                        <section>
                            <h2 className="text-2xl font-black uppercase tracking-tighter mb-6 border-b-4 border-black pb-2 inline-block">2. BUSINESS MODEL DISCLOSURE</h2>
                            <div className="text-base font-bold leading-relaxed text-black/80 space-y-4">
                                <p>ByteKart operates as an online marketplace facilitator connecting customers with independent third-party suppliers of:</p>
                                <ul className="list-disc pl-6 space-y-1">
                                    <li>Computer components</li>
                                    <li>Laptops</li>
                                    <li>Peripherals</li>
                                    <li>Accessories</li>
                                    <li>Related hardware products</li>
                                </ul>
                                <p>ByteKart:</p>
                                <ul className="list-disc pl-6 space-y-1">
                                    <li>Does not manufacture products.</li>
                                    <li>Does not independently provide manufacturer warranties.</li>
                                    <li>Facilitates product listings, order processing, and payment coordination.</li>
                                    <li>Coordinates fulfillment with verified suppliers.</li>
                                </ul>
                                <p>All products are supplied and fulfilled by third-party vendors unless explicitly stated otherwise.</p>
                            </div>
                        </section>

                        <section>
                            <h2 className="text-2xl font-black uppercase tracking-tighter mb-6 border-b-4 border-black pb-2 inline-block">3. PRODUCT INFORMATION</h2>
                            <div className="text-base font-bold leading-relaxed text-black/80 space-y-4">
                                <p>Product descriptions, specifications, pricing, and availability are based on supplier-provided information.</p>
                                <p>While reasonable care is taken to ensure accuracy:</p>
                                <ul className="list-disc pl-6 space-y-1">
                                    <li>Product images are for representation purposes only.</li>
                                    <li>Minor specification variations may occur.</li>
                                    <li>Compatibility responsibility lies with the customer.</li>
                                </ul>
                                <p>If a pricing or listing error occurs, ByteKart reserves the right to cancel the order and issue a full refund.</p>
                            </div>
                        </section>

                        <section>
                            <h2 className="text-2xl font-black uppercase tracking-tighter mb-6 border-b-4 border-black pb-2 inline-block">4. ORDER ACCEPTANCE (BOOK FIRST, PAY AFTER)</h2>
                            <div className="text-base font-bold leading-relaxed text-black/80 space-y-4">
                                <p>Orders on ByteKart follow a <strong>“Book First, Pay After Confirmation”</strong> process. A Booking Request is not a confirmed order.</p>
                                <p>Customers can track their requests on the <strong>“My Requests”</strong> page. An order is considered confirmed and moved to the <strong>“My Orders”</strong> page only after:</p>
                                <ul className="list-disc pl-6 space-y-1">
                                    <li>Supplier confirms product availability and final pricing; and</li>
                                    <li>Successful payment authorization by the customer after receiving such confirmation.</li>
                                </ul>
                                <p>ByteKart may decline Booking Requests in cases of:</p>
                                <ul className="list-disc pl-6 space-y-1">
                                    <li>Stock unavailability</li>
                                    <li>Pricing changes or errors</li>
                                    <li>Suspected fraudulent activity</li>
                                    <li>Supplier refusal</li>
                                </ul>
                                <p>Once payment is completed, the request becomes a confirmed order, and tracking information will be updated accordingly.</p>
                            </div>
                        </section>

                        <section>
                            <h2 className="text-2xl font-black uppercase tracking-tighter mb-6 border-b-4 border-black pb-2 inline-block">5. PAYMENTS</h2>
                            <div className="text-base font-bold leading-relaxed text-black/80 space-y-4">
                                <p>Payments must be made through approved Payment Instruments including UPI, debit card, credit card, net banking, or other supported methods.</p>
                                <p>You agree that:</p>
                                <ul className="list-disc pl-6 space-y-1">
                                    <li>Payment information provided is accurate.</li>
                                    <li>Funds used are from lawful sources.</li>
                                    <li>You will not initiate unwarranted chargebacks after confirmed delivery.</li>
                                    <li>Fraudulent disputes or chargebacks may result in account suspension and legal action.</li>
                                </ul>
                                <p>ByteKart is not responsible for payment failures caused by banking systems, payment gateway errors, or network disruptions.</p>
                            </div>
                        </section>

                        <section>
                            <h2 className="text-2xl font-black uppercase tracking-tighter mb-6 border-b-4 border-black pb-2 inline-block">6. SHIPPING & DELIVERY</h2>
                            <div className="text-base font-bold leading-relaxed text-black/80 space-y-4">
                                <p>Estimated delivery timelines are displayed for reference only and are not guaranteed.</p>
                                <p>For full details, please refer to our <a href="/shipping-policy" className="text-black underline underline-offset-4 hover:bg-black hover:text-white transition-all">Shipping & Delivery Policy</a>.</p>
                                <p>Dispatch timelines depend on supplier processing and availability verification.</p>
                                <p>Customers must provide accurate shipping details. ByteKart is not responsible for delivery failures due to incorrect address information or customer unavailability.</p>
                                <p>Claims regarding transit damage must be reported within 24 hours of delivery with supporting evidence (such as unboxing video).</p>
                            </div>
                        </section>

                        <section>
                            <h2 className="text-2xl font-black uppercase tracking-tighter mb-6 border-b-4 border-black pb-2 inline-block">7. RETURNS & REFUNDS POLICY SUMMARY</h2>
                            <div className="text-base font-bold leading-relaxed text-black/80 space-y-4">
                                <p>Returns and refunds are subject to supplier and manufacturer policies. Any request for return, replacement, or refund must be submitted via the <strong>“My Orders”</strong> page within <strong>five (5) calendar days</strong> from the date of delivery.</p>
                                <p>For full details, please refer to our <a href="/refund-policy" className="text-black underline underline-offset-4 hover:bg-black hover:text-white transition-all">Refund & Cancellation Policy</a>.</p>
                                <p>Refund eligibility may apply in the following cases:</p>
                                <ul className="list-disc pl-6 space-y-1">
                                    <li>Dead on Arrival (DOA) product</li>
                                    <li>Manufacturing defect</li>
                                    <li>Wrong product delivered</li>
                                </ul>
                                <p>Refunds are not applicable in cases of:</p>
                                <ul className="list-disc pl-6 space-y-1">
                                    <li>Change of mind</li>
                                    <li>Incorrect product ordered</li>
                                    <li>Compatibility issues not due to listing error</li>
                                </ul>
                            </div>
                        </section>

                        <section>
                            <h2 className="text-2xl font-black uppercase tracking-tighter mb-6 border-b-4 border-black pb-2 inline-block">8. WARRANTY</h2>
                            <div className="text-base font-bold leading-relaxed text-black/80 space-y-4">
                                <p>Warranty, where applicable, is provided directly by the manufacturer or authorized service centers.</p>
                                <p>ByteKart does not independently provide warranty coverage unless explicitly mentioned.</p>
                                <p>Customers may need to contact brand-authorized service centers for warranty claims.</p>
                            </div>
                        </section>

                        <section>
                            <h2 className="text-2xl font-black uppercase tracking-tighter mb-6 border-b-4 border-black pb-2 inline-block">9. USER RESPONSIBILITIES</h2>
                            <div className="text-base font-bold leading-relaxed text-black/80 space-y-4">
                                <p>You agree:</p>
                                <ul className="list-disc pl-6 space-y-1">
                                    <li>To provide accurate personal and shipping information.</li>
                                    <li>Not to misuse the Platform.</li>
                                    <li>Not to engage in fraudulent activity.</li>
                                    <li>Not to attempt unauthorized system access.</li>
                                </ul>
                            </div>
                        </section>

                        <section>
                            <h2 className="text-2xl font-black uppercase tracking-tighter mb-6 border-b-4 border-black pb-2 inline-block">10. LIMITATION OF LIABILITY</h2>
                            <div className="text-base font-bold leading-relaxed text-black/80 space-y-4">
                                <p>To the maximum extent permitted by law:</p>
                                <ul className="list-disc pl-6 space-y-1">
                                    <li>ByteKart shall not be liable for indirect or consequential losses.</li>
                                    <li>Total liability shall not exceed the Transaction Amount paid for the relevant order.</li>
                                    <li>Your sole remedy for dissatisfaction shall be as per the Refund Policy.</li>
                                </ul>
                            </div>
                        </section>

                        <section>
                            <h2 className="text-2xl font-black uppercase tracking-tighter mb-6 border-b-4 border-black pb-2 inline-block">11. FRAUD PREVENTION & VERIFICATION</h2>
                            <div className="text-base font-bold leading-relaxed text-black/80 space-y-4">
                                <p>ByteKart reserves the right to:</p>
                                <ul className="list-disc pl-6 space-y-1">
                                    <li>Request identity verification for high-value orders.</li>
                                    <li>Delay processing for risk review.</li>
                                    <li>Cancel suspicious transactions.</li>
                                </ul>
                                <p>This is done to prevent fraud and protect both customers and payment partners.</p>
                            </div>
                        </section>

                        <section>
                            <h2 className="text-2xl font-black uppercase tracking-tighter mb-6 border-b-4 border-black pb-2 inline-block">12. FORCE MAJEURE</h2>
                            <div className="text-base font-bold leading-relaxed text-black/80 space-y-4">
                                <p>ByteKart shall not be liable for delays or failures due to circumstances beyond reasonable control, including:</p>
                                <ul className="list-disc pl-6 space-y-1">
                                    <li>Natural disasters</li>
                                    <li>Government restrictions</li>
                                    <li>Supplier disruptions</li>
                                    <li>Logistics failures</li>
                                    <li>Cyber incidents</li>
                                </ul>
                            </div>
                        </section>

                        <section>
                            <h2 className="text-2xl font-black uppercase tracking-tighter mb-6 border-b-4 border-black pb-2 inline-block">13. GOVERNING LAW</h2>
                            <div className="text-base font-bold leading-relaxed text-black/80 space-y-4">
                                <p>These Terms shall be governed by the laws of India.</p>
                                <p>Disputes shall first be attempted to be resolved amicably. If unresolved, disputes shall be subject to arbitration under Indian law.</p>
                            </div>
                        </section>

                        <section>
                            <h2 className="text-2xl font-black uppercase tracking-tighter mb-6 border-b-4 border-black pb-2 inline-block">14. CONTACT & GRIEVANCE</h2>
                            <div className="text-base font-bold leading-relaxed text-black/80 space-y-4">
                                <p>For any queries, complaints, or refund requests:</p>
                                <p className="font-black">Email: support@bytekart.co.in</p>
                                <p>Response Time: Within 48 business hours</p>
                            </div>
                        </section>

                    </div>
                </section>
            </main>
        </StorefrontLayout>
    )
}
