import { useRegisterSW } from 'virtual:pwa-register/react'

export default function ReloadPrompt() {
    const {
        offlineReady: [offlineReady, setOfflineReady],
        needRefresh: [needRefresh, setNeedRefresh],
        updateServiceWorker,
    } = useRegisterSW({
        onRegistered(r) {
            console.log('SW Registered:', r)
            if (r) {
                // Periodically check for updates every 10 minutes
                setInterval(() => {
                    r.update()
                }, 600000)
            }
        },
        onRegisterError(error) {
            console.error('SW registration error:', error)
        },
    })

    const close = () => {
        setOfflineReady(false)
        setNeedRefresh(false)
    }

    if (!offlineReady && !needRefresh) return null

    return (
        <div className="fixed bottom-20 lg:bottom-6 right-6 left-6 lg:left-auto lg:w-96 z-50 animate-slide-up">
            <div className="bg-white border-4 border-black p-5 shadow-brutal flex flex-col gap-4 relative">
                {/* Header Strip with Accent */}
                <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center border-3 border-black bg-matcha-bg shadow-[2px_2px_0px_rgba(0,0,0,1)]">
                        <span className="material-symbols-outlined font-black text-black">
                            {needRefresh ? 'system_update_alt' : 'cloud_done'}
                        </span>
                    </div>
                    <div>
                        <h4 className="text-sm font-display font-black uppercase tracking-tight text-black">
                            {needRefresh ? 'System Update Ready' : 'App Offline Ready'}
                        </h4>
                        <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mt-0.5">
                            {needRefresh ? 'New features available' : 'Ready to work offline'}
                        </p>
                    </div>
                </div>

                {/* Body Message */}
                <p className="text-xs font-medium text-black/80 leading-relaxed border-t-2 border-dashed border-black/10 pt-3">
                    {needRefresh 
                        ? 'A new version of ByteKart is available. Reload the terminal to apply the latest build.'
                        : 'ByteKart is fully cached and ready to explore offline.'
                    }
                </p>

                {/* Actions Row */}
                <div className="flex gap-3 mt-1">
                    {needRefresh && (
                        <button
                            onClick={() => updateServiceWorker(true)}
                            className="flex-1 bg-black text-matcha-bg border-3 border-black py-2.5 font-display font-black uppercase tracking-widest text-xs shadow-[2px_2px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-0.5 hover:translate-y-0.5 transition-all"
                        >
                            Update
                        </button>
                    )}
                    <button
                        onClick={close}
                        className="flex-grow bg-white text-black border-3 border-black py-2.5 font-display font-black uppercase tracking-widest text-xs shadow-[2px_2px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-0.5 hover:translate-y-0.5 transition-all"
                    >
                        {needRefresh ? 'Later' : 'Dismiss'}
                    </button>
                </div>
            </div>
        </div>
    )
}
