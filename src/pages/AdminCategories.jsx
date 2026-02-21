import EntityManagerPage from '../components/Admin/EntityManagerPage'

const config = {
    title: 'Categories',
    singularTitle: 'Category',
    api: {
        get: '/categories',
        post: '/admin/category',
        put: '/admin/category',
        delete: '/admin/category'
    },
    columns: [
        { key: 'id', label: 'UUID' },
        { key: 'name', label: 'Category Name' }
    ],
    fields: [
        { name: 'name', label: 'Category Name', type: 'text', required: true }
    ]
}

export default function AdminCategories() {
    return <EntityManagerPage config={config} />
}
