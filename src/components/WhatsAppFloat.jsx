import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons'

const WhatsAppFloat = () => {
    const waNumber = import.meta.env.VITE_WHATSAPP_NUMBER || '918796067679';
    const waUrl = `https://wa.me/${waNumber}?text=${encodeURIComponent("Hey! I'm interested in knowing more about your products.")}`;

    return (
        <div className="fixed bottom-24 lg:bottom-8 right-8 z-[9999] flex flex-col items-end gap-2.5">
            {/* Chat Bubble */}
            <a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="relative bg-pure-white text-black px-4 py-2 border-3 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] font-display font-black uppercase tracking-wider text-[11px] hover:-translate-y-0.5 hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-y-0 transition-all text-center whitespace-nowrap block animate-bounce"
                style={{ animationDuration: '3s' }}
            >
                for custom orders,Chat here
                {/* Speech Bubble Arrow */}
                <span className="absolute top-full right-[26px] w-3 h-3 bg-pure-white border-r-3 border-b-3 border-black rotate-45 -translate-y-[7px]"></span>
            </a>

            {/* WhatsApp Floating Button */}
            <a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-16 w-16 items-center justify-center border-4 border-black bg-[#25D366] text-white shadow-brutal hover:-translate-y-1 hover:shadow-none active:translate-y-0 transition-all group"
                aria-label="Chat on WhatsApp"
            >
                <FontAwesomeIcon icon={faWhatsapp} className="text-3xl" />
                
                {/* Tooltip on hover */}
                <span className="absolute right-full mr-4 whitespace-nowrap bg-black text-white px-3 py-1 font-black uppercase tracking-widest text-[10px] opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-brutal-sm">
                    Chat with us
                </span>
            </a>
        </div>
    );
};

export default WhatsAppFloat;


