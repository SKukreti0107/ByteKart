import EntityManagerPage from '../components/Admin/EntityManagerPage'

const config = {
    title: 'Redeem Codes',
    singularTitle: 'Redeem Code',
    api: {
        get: '/admin/redeem-codes',
        post: '/admin/redeem-codes',
        put: '/admin/redeem-codes',
        delete: '/admin/redeem-codes'
    },
    columns: [
        { key: 'code', label: 'Code', render: (val) => <span className="font-mono tracking-widest">{val}</span> },
        {
            key: 'discount_type', label: 'Type', render: (val) => {
                const colors = { flat: 'bg-blue-100 text-blue-800', percentage: 'bg-purple-100 text-purple-800' }
                return <span className={`uppercase text-xs font-bold rounded-full px-2 py-1 ${colors[val] || 'bg-gray-100'}`}>{val === 'percentage' ? '%' : '₹ Flat'}</span>
            }
        },
        { key: 'discount_value', label: 'Value', render: (val, item) => item.discount_type === 'percentage' ? `${val}%` : `₹${val}` },
        { key: 'max_redeems', label: 'Max Uses' },
        { key: 'times_redeemed', label: 'Used' },
        { key: 'is_active', label: 'Active', render: (val) => val ? '✅ Yes' : '❌ No' }
    ],
    fields: [
        { name: 'code', label: 'Coupon Code', type: 'text', required: true },
        {
            name: 'discount_type', label: 'Discount Type', type: 'select', required: true, options: [
                { id: 'flat', name: 'Flat (₹ off)' },
                { id: 'percentage', name: 'Percentage (% off)' }
            ]
        },
        { name: 'discount_value', label: 'Discount Value', type: 'number', required: true },
        { name: 'max_redeems', label: 'Max Redeems', type: 'number', required: true },
    ]
}

export default function AdminRedeemCodes() {
    return <EntityManagerPage config={config} />
}
