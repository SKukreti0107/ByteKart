import Skeleton from './Skeleton'

export default function ProductCardSkeleton() {
    return (
        <div className="product-card flex flex-col rounded-squish p-4 shadow-md bg-white">
            <Skeleton className="mb-4 aspect-square w-full rounded-2xl" />

            <div className="flex-1 px-1">
                <Skeleton className="mb-2 h-6 w-3/4" />
                <Skeleton className="mb-4 h-6 w-1/4" />
            </div>

            <Skeleton className="h-12 w-full rounded-xl" />
        </div>
    )
}
