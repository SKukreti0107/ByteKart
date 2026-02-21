export default function ProductGallery({ selectedImage }) {
  return (
    <section className="window-container border-none p-4 sm:p-6">
      <img src={selectedImage} alt="Product" className="h-[240px] w-full rounded-2xl object-cover sm:h-[320px] md:h-[380px]" />
    </section>
  )
}
