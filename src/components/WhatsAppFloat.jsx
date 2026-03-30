import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons'

const WhatsAppFloat = () => {
    const waNumber = import.meta.env.VITE_WHATSAPP_NUMBER || '918796067679';
    const waUrl = `https://wa.me/${waNumber}?text=${encodeURIComponent("Hey! I'm interested in knowing more about your products.")}`;

    return (
        <a
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="fixed bottom-8 right-8 z-[9999] flex h-16 w-16 items-center justify-center border-4 border-black bg-[#25D366] text-white shadow-brutal hover:-translate-y-1 hover:shadow-none active:translate-y-0 transition-all group"
            aria-label="Chat on WhatsApp"
        >
            <FontAwesomeIcon icon={faWhatsapp} className="text-3xl" />
            
            {/* Tooltip on hover */}
            <span className="absolute right-full mr-4 whitespace-nowrap bg-black text-white px-3 py-1 font-black uppercase tracking-widest text-[10px] opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-brutal-sm">
                Chat with us
            </span>
        </a>
    );
};

export default WhatsAppFloat;

