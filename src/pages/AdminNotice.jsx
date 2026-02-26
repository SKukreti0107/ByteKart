import EntityManagerPage from '../components/Admin/EntityManagerPage'

const config = {
    title: 'Global Notices',
    singularTitle: 'Notice',
    api: {
        get: '/admin/notice',
        post: '/admin/notice',
        put: '/admin/notice',
        delete: '/admin/notice'
    },
    columns: [
        { key: 'message', label: 'Message' },
        {
            key: 'type', label: 'Type', render: (val) => {
                const colors = { info: 'bg-blue-100 text-blue-800', warning: 'bg-yellow-100 text-yellow-800', promo: 'bg-green-100 text-green-800', urgent: 'bg-red-100 text-red-800' }
                return <span className={`uppercase text-xs font-bold rounded-full px-2 py-1 ${colors[val] || 'bg-gray-100'}`}>{val || 'info'}</span>
            }
        },
        { key: 'is_active', label: 'Active', render: (val) => val ? '✅ Yes' : '❌ No' }
    ],
    fields: [
        { name: 'message', label: 'Notice Message', type: 'text', required: true },
        {
            name: 'type', label: 'Notice Type', type: 'select', required: true, options: [
                { id: 'info', name: 'Info (Blue)' },
                { id: 'warning', name: 'Warning (Yellow)' },
                { id: 'promo', name: 'Promo (Green)' },
                { id: 'urgent', name: 'Urgent (Red)' }
            ]
        },
    ]
}

export default function AdminNotice() {
    return <EntityManagerPage config={config} />
}
