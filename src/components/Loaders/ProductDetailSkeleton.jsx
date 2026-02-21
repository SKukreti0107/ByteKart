import Skeleton from './Skeleton'

export default function ProductDetailSkeleton() {
    return (
        <main className="w-full space-y-8">
            <div className="window-container break-words border-none px-4 py-4 sm:px-6">
                <Skeleton className="h-5 w-1/3" />
            </div>

            <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
                {/* Gallery Skeleton */}
                <div className="space-y-4">
                    <Skeleton className="aspect-square w-full rounded-2xl" />
                    <div className="grid grid-cols-4 gap-4">
                        {[1, 2, 3, 4].map(n => (
                            <Skeleton key={n} className="aspect-square w-full rounded-xl" />
                        ))}
                    </div>
                </div>

                {/* Purchase Panel Skeleton */}
                <div className="window-container border-none p-6 sm:p-8">
                    <Skeleton className="mb-4 h-6 w-1/4" />
                    <Skeleton className="mb-6 h-10 w-3/4" />
                    <Skeleton className="mb-6 h-12 w-1/3" />
                    <Skeleton className="mb-8 h-20 w-full rounded-xl" />
                    <Skeleton className="mb-4 h-6 w-1/4" />
                    <Skeleton className="mb-8 h-12 w-full rounded-xl" />
                    <div className="flex gap-4">
                        <Skeleton className="h-14 flex-1 rounded-xl" />
                        <Skeleton className="h-14 w-14 rounded-xl" />
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
                <div className="xl:col-span-2">
                    <Skeleton className="h-[400px] w-full rounded-2xl" />
                </div>
                <section className="window-container border-none p-6">
                    <Skeleton className="mb-2 h-4 w-1/3" />
                    <Skeleton className="mb-4 h-8 w-2/3" />
                    <Skeleton className="mb-8 h-16 w-full" />
                    <Skeleton className="h-12 w-full rounded-xl" />
                </section>
            </div>
        </main>
    )
}
