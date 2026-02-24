export default function ProductGallery({ selectedImage }) {
  return (
    <div className="bg-white border-4 border-black p-8 sm:p-12 shadow-brutal flex items-center justify-center">
      <img src={selectedImage} alt="Product" className="max-h-[500px] w-auto object-contain mix-blend-multiply transition-transform hover:scale-105 duration-500" />
    </div>
  )
}
