import StorefrontLayout from '../components/StorefrontLayout'
import { useState } from 'react'

const FAQ_DATA = [
    {
        question: "ARE THE PRODUCTS GENUINE?",
        answer: "Absolutely. We directly interact with trusted suppliers and guarantee that every product on ByteKart is 100% genuine. No refurbs, no grey market imports—just the real deal."
    },
    {
        question: "WHY ARE YOUR PRICES LOWER THAN OTHER PLATFORMS?",
        answer: "As college students, we built this to help our community. We cut out middle-men, avoid expensive marketing, and work directly with suppliers to pass those savings straight to you."
    },
    {
        question: "HOW LONG DOES SHIPPING TAKE?",
        answer: "Most orders are processed within 24 hours. Depending on your location, you can expect delivery within 3-5 business days across India. We monitor every order from the supplier to your doorstep."
    },
    {
        question: "WHAT IS YOUR RETURN POLICY?",
        answer: "We offer hassle-free returns within 7 days of delivery for any genuine product defects or if you received the wrong item. Check our return portal in your account for details."
    },
    {
        question: "WHERE IS BYTEKART LOCATED?",
        answer: "We are based in Greater Noida, India. ByteKart was founded by students who wanted to solve the problem of sketchy tech deals for their fellow students."
    },
    {
        question: "HOW CAN I TRACK MY ORDER?",
        answer: "Once your order ships, you'll receive a tracking ID via email. You can also track it directly from the 'Orders' section in your account dashboard."
    }
]

export default function FAQ() {
    const [openIndex, setOpenIndex] = useState(null)

    return (
        <StorefrontLayout>
            <main className="w-full">
                {/* Hero Header */}
                <section className="px-6 lg:px-12 py-16 border-b-4 border-pure-black bg-white">
                    <h1 className="text-4xl md:text-6xl font-display font-black uppercase tracking-tighter text-black mb-4" style={{ textShadow: '4px 4px 0px #C6DCBA' }}>
                        Frequently Asked Questions
                    </h1>
                    <p className="text-lg font-bold uppercase tracking-widest text-gray-500 max-w-2xl border-l-4 border-black pl-4">
                        Everything you need to know about ByteKart, shipping, and our commitment to genuine tech.
                    </p>
                </section>

                {/* FAQ List */}
                <section className="px-6 lg:px-12 py-20 bg-matcha-bg min-h-screen">
                    <div className="max-w-3xl mx-auto space-y-6">
                        {FAQ_DATA.map((item, index) => (
                            <div
                                key={index}
                                className="border-4 border-black bg-white shadow-brutal transition-all"
                            >
                                <button
                                    onClick={() => setOpenIndex(openIndex === index ? null : index)}
                                    className="w-full text-left p-6 flex justify-between items-center group"
                                >
                                    <h3 className="text-lg md:text-xl font-black uppercase tracking-tighter leading-none">
                                        {item.question}
                                    </h3>
                                    <span className={`material-symbols-outlined text-3xl transition-transform duration-300 ${openIndex === index ? 'rotate-180' : ''}`}>
                                        expand_more
                                    </span>
                                </button>

                                {openIndex === index && (
                                    <div className="px-6 pb-6 border-t-4 border-black pt-6 bg-matcha-bg/10">
                                        <p className="text-base font-bold leading-relaxed text-black/80">
                                            {item.answer}
                                        </p>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>

                    {/* Support CTA */}
                    <div className="mt-20 text-center">
                        <h2 className="text-2xl font-black uppercase tracking-tighter mb-4">
                            Still have questions?
                        </h2>
                        <p className="text-gray-600 font-bold uppercase tracking-widest mb-8">
                            Our team is ready to serve you.
                        </p>
                        <a
                            href="/contact"
                            className="inline-block px-10 py-4 bg-black text-white font-black uppercase tracking-widest text-sm border-4 border-black hover:bg-matcha-bg hover:text-black transition-all shadow-brutal-sm"
                        >
                            Contact Support
                        </a>
                    </div>
                </section>
            </main>
        </StorefrontLayout>
    )
}
