import EntityManagerPage from '../components/Admin/EntityManagerPage'

const config = {
    title: 'Hero Content',
    singularTitle: 'Hero Banner',
    api: {
        get: '/admin/hero',
        post: '/admin/hero',
        put: '/admin/hero',
        delete: '/admin/hero'
    },
    columns: [
        { key: 'title', label: 'Title' },
        { key: 'type', label: 'Type', render: (val) => <span className="uppercase text-xs font-bold rounded-full bg-off-white px-2 py-1">{val || 'newest'}</span> },
        { key: 'priority', label: 'Priority' },
        { key: 'is_active', label: 'Active', render: (val) => val ? 'Yes' : 'No' }
    ],
    fields: [
        { name: 'title', label: 'Campaign Title', type: 'text', required: true },
        { name: 'subtitle', label: 'Subtitle', type: 'text', required: false },
        {
            name: 'type', label: 'Content Type', type: 'select', required: true, options: [
                { id: 'newest', name: 'Newest Arrivals (Dynamic)' },
                { id: 'offer', name: 'Special Offer' },
                { id: 'manual_banner', name: 'Manual Banner' },
                { id: 'featured', name: 'Featured Product' }
            ]
        },
        { name: 'image_url', label: 'Banner Image URL', type: 'text', required: false },
        { name: 'cta_text', label: 'Button Text', type: 'text', required: false },
        { name: 'cta_link', label: 'Redirect Link (e.g. /catalog)', type: 'text', required: false },
        { name: 'product_id', label: 'Link to Product', type: 'select', required: false, endpoint: '/admin/listings' },
        { name: 'priority', label: 'Priority (Lower = Higher precedence)', type: 'number', required: true },
        { name: 'start_date', label: 'Start Date (ISO format)', type: 'text', required: false },
        { name: 'end_date', label: 'End Date (ISO format)', type: 'text', required: false },
    ]
}

export default function AdminHero() {
    return <EntityManagerPage config={config} />
}
