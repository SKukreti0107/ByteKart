import StorefrontLayout from '../StorefrontLayout'
import Hero from './Hero'
import ProductCategories from './ProductCategories'
import ProductGrid from './ProductsGrid'
import ExtraCards from './ExtraCards'

const categories = [
    { icon: 'memory', title: 'Processors' },
    { icon: 'videocam', title: 'Graphics' },
    { icon: 'keyboard', title: 'Peripherals' },
    { icon: 'headphones', title: 'Audio Gear' },
]

const products = [
    {
        image:
            'https://lh3.googleusercontent.com/aida-public/AB6AXuDI-VMwfdebWdohv6ARHauGkCLpRUKyKRlrA0SlCxu4UOcPlrDzHVi3_gIVngPBSTZdJXVvOKvOkZeybF5Ulvsm7KPzUn4E-WlDSUMa7Fgz6Ly7bnMrvAZgkNNmxgXKcLS2iWu1ZT0ZDF1FunRLVEap2H1S1gp5Ea3jKWT3ZOmoQ8tYdBkrBZf-VhyDWVxamLGrwGE4pKgTk010GTiLGx6TzN0-DerERdNtEhSw_aokiGXFCGYL7awz1l1T6YAaYwGgsfpH_k_Y8fY',
        name: 'Matcha Pro GPU',
        price: '$799.00',
        oldPrice: '$849',
        tags: ['Best Seller', 'Eco-Built'],
    },
    {
        image:
            'https://lh3.googleusercontent.com/aida-public/AB6AXuDKldLP3NpHzrly6ONCjYh1cOJLmoXUntJ2mqpmC5JuBjRe4NI0fgZagOff7A1t8Pm5Q0dl4TR_O2af4UUThYnq78zE-M9WwzGYsssvx6pD41-WFUWlzP7IVjcEu4QsyNpb1l9zZYQPdYjQyZIf9ZrDwK0chPleG19OhqZPd152yHXvhDz2CKy1lZIxJLwU01RwsvMm4xwjN6Ov505LxqWe6Qncg4GauF6EcsiuU8tBMXBc0w_IEdSl1i4klYrNqqqiEgXBOJWzkLw',
        name: 'Leaf Core i9',
        price: '$349.00',
        tags: ['Top Rated'],
    },
    {
        image:
            'https://lh3.googleusercontent.com/aida-public/AB6AXuDFWV9til150GgeNA3deqimdyCwo0kKTHr7_xInLkE8R4IWKjma3NdwO37z_5j9uJEm4kTjsn9DW7WvMJGBbF_0DRWnplcWU1rP-5lu-06pT7wUGZAVpDYLv3hvkWszjXcHymo4KYs1xbah1_t_PbWGQHcHK3n7UI9ItLDOdM37YHkyQPG3ZucRW3V_tw6QeV4q10oc9mjPIGTsc1aSeTiXy9u4UHfDOuuuWm6Po5TRrlggVzDFoh-e55rGwUw_YRZTelc4E76mw_Q',
        name: 'Glow RAM 32GB',
        price: '$189.00',
        tags: ['Limited Stock'],
    },
    {
        image:
            'https://lh3.googleusercontent.com/aida-public/AB6AXuAwfCYyJRaadWpxu8IubdmpvaaHxNyvmR2MwABYP6I3TG0r6w_yv5gxQp-a9i8F4WNvdECqEtvBN48s9qjgX4LZBy-LzbNl9zDrN9aSNHxdAUOLTO7tMaVnQ14myu8QMOuUiqbXiZ5ERyemk1NdZjVPHQaSVgGJ-W3dJu7pTlYoC_Hdrg3TLxlaOkSNEZRxhLTfnM6o89RHOp3_eMxjqBtpDXEh-Q8VU9NXpGUe93Qh8MUXM6jaTiwknZPh3bNR7l4H3axUeZryTcg',
        name: 'Zen NVMe 2TB',
        price: '$219.00',
        tags: ['New Arrival'],
    },
    {
        image:
            'https://lh3.googleusercontent.com/aida-public/AB6AXuAwfCYyJRaadWpxu8IubdmpvaaHxNyvmR2MwABYP6I3TG0r6w_yv5gxQp-a9i8F4WNvdECqEtvBN48s9qjgX4LZBy-LzbNl9zDrN9aSNHxdAUOLTO7tMaVnQ14myu8QMOuUiqbXiZ5ERyemk1NdZjVPHQaSVgGJ-W3dJu7pTlYoC_Hdrg3TLxlaOkSNEZRxhLTfnM6o89RHOp3_eMxjqBtpDXEh-Q8VU9NXpGUe93Qh8MUXM6jaTiwknZPh3bNR7l4H3axUeZryTcg',
        name: 'Zen NVMe 2TB',
        price: '$219.00',
        tags: ['New Arrival'],
    },
    {
        image:
            'https://lh3.googleusercontent.com/aida-public/AB6AXuAwfCYyJRaadWpxu8IubdmpvaaHxNyvmR2MwABYP6I3TG0r6w_yv5gxQp-a9i8F4WNvdECqEtvBN48s9qjgX4LZBy-LzbNl9zDrN9aSNHxdAUOLTO7tMaVnQ14myu8QMOuUiqbXiZ5ERyemk1NdZjVPHQaSVgGJ-W3dJu7pTlYoC_Hdrg3TLxlaOkSNEZRxhLTfnM6o89RHOp3_eMxjqBtpDXEh-Q8VU9NXpGUe93Qh8MUXM6jaTiwknZPh3bNR7l4H3axUeZryTcg',
        name: 'Zen NVMe 2TB',
        price: '$219.00',
        tags: ['New Arrival'],
    },
]

export default function ElectronicsHubPage() {
    return (
        <StorefrontLayout>
            <main className="w-full space-y-8">
                <Hero />
                <ProductCategories categories={categories} />
                <ProductGrid products={products} />
                <ExtraCards />
            </main>
        </StorefrontLayout>
    )
}