import EntityManagerPage from '../components/Admin/EntityManagerPage'

const config = {
    title: 'Brands',
    singularTitle: 'Brand',
    api: {
        get: '/brands',
        post: '/admin/brand',
        put: '/admin/brand',
        delete: '/admin/brand'
    },
    columns: [
        { key: 'id', label: 'UUID' },
        { key: 'name', label: 'Brand Name' }
    ],
    fields: [
        { name: 'name', label: 'Brand Name', type: 'text', required: true },
        { name: 'logo_url', label: 'Logo URL', type: 'text', required: false }
    ]
}

export default function AdminBrands() {
    return <EntityManagerPage config={config} />
}
