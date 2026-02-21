import Skeleton from './Skeleton'

export default function CatalogSidebarSkeleton() {
    return (
        <aside className="window-container h-fit w-full border-none p-6 lg:sticky lg:top-28 lg:w-80">
            <Skeleton className="mb-6 h-7 w-1/3" />

            <div className="mb-7">
                <Skeleton className="mb-3 h-5 w-1/4" />
                <div className="space-y-2">
                    {[1, 2, 3, 4, 5].map((n) => (
                        <Skeleton key={n} className="h-10 w-full rounded-xl" />
                    ))}
                </div>
            </div>

            <div className="mb-7">
                <Skeleton className="mb-3 h-5 w-1/4" />
                <Skeleton className="h-12 w-full rounded-xl" />
            </div>

            <div>
                <div className="mb-3 flex items-center justify-between">
                    <Skeleton className="h-5 w-1/4" />
                    <Skeleton className="h-6 w-12 rounded-full" />
                </div>
                <Skeleton className="h-2 w-full rounded-full" />
            </div>
        </aside>
    )
}
