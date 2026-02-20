export default function ProductGallery({ images, selectedImage, setSelectedImage }) {
  return (
    <section className="window-container border-none p-4 sm:p-6">
      <img src={selectedImage} alt="Product" className="h-[240px] w-full rounded-2xl object-cover sm:h-[320px] md:h-[380px]" />
      <div className="mt-4 grid grid-cols-4 gap-3">
        {images.map((image) => (
          <button
            key={image}
            type="button"
            onClick={() => setSelectedImage(image)}
            className={`overflow-hidden rounded-xl border-2 ${selectedImage === image ? 'border-[var(--matcha-deep)]' : 'border-transparent'}`}
          >
            <img src={image} alt="thumb" className="h-20 w-full object-cover" />
          </button>
        ))}
      </div>
    </section>
  )
}
