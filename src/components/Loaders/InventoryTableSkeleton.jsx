import Skeleton from './Skeleton'

export default function InventoryTableSkeleton() {
    return (
        <div className="w-full overflow-x-auto rounded-squish bg-pure-white p-4 shadow-sm border border-charcoal-dark/10">
            <table className="w-full text-left text-sm">
                <thead>
                    <tr className="border-b border-charcoal-dark/10 text-charcoal-dark/60">
                        <th className="p-4 font-bold uppercase tracking-wider">Product</th>
                        <th className="p-4 font-bold uppercase tracking-wider">SKU</th>
                        <th className="p-4 font-bold uppercase tracking-wider">Category</th>
                        <th className="p-4 font-bold uppercase tracking-wider">Price</th>
                        <th className="p-4 font-bold uppercase tracking-wider">Status</th>
                        <th className="p-4 font-bold uppercase tracking-wider text-right">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {[1, 2, 3, 4, 5].map((n) => (
                        <tr key={n} className="border-b border-charcoal-dark/5 transition-colors">
                            <td className="p-4">
                                <div className="flex items-center gap-3">
                                    <Skeleton className="h-10 w-10 rounded-lg" />
                                    <Skeleton className="h-5 w-32" />
                                </div>
                            </td>
                            <td className="p-4"><Skeleton className="h-5 w-16" /></td>
                            <td className="p-4"><Skeleton className="h-5 w-24" /></td>
                            <td className="p-4"><Skeleton className="h-5 w-16" /></td>
                            <td className="p-4"><Skeleton className="h-6 w-20 rounded-full" /></td>
                            <td className="p-4 text-right"><Skeleton className="ml-auto h-8 w-8 rounded-lg" /></td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <div className="mt-4 flex flex-wrap items-center justify-between gap-4 px-2">
                <Skeleton className="h-8 w-24 rounded-lg" />
                <Skeleton className="h-5 w-24" />
                <Skeleton className="h-8 w-24 rounded-lg" />
            </div>
        </div>
    )
}
