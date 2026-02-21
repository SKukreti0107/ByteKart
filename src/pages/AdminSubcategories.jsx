import EntityManagerPage from '../components/Admin/EntityManagerPage'

const config = {
    title: 'Subcategories',
    singularTitle: 'Subcategory',
    api: {
        get: '/subCategories',
        post: '/admin/subcategory',
        put: '/admin/subcategory',
        delete: '/admin/subcategory'
    },
    columns: [
        { key: 'id', label: 'UUID' },
        { key: 'name', label: 'Subcategory Name' },
        { key: 'category_id', label: 'Category ID' }
    ],
    fields: [
        { name: 'name', label: 'Subcategory Name', type: 'text', required: true },
        { name: 'category_id', label: 'Parent Category', type: 'select', required: true, endpoint: '/categories' }
    ]
}

export default function AdminSubcategories() {
    return <EntityManagerPage config={config} />
}
