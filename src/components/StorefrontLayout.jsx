import NavBar from './NavBar'
import Footer from './Footer'

export default function StorefrontLayout({ children, showFooter = true, navProps }) {
  return (
    <div
      className="min-h-screen bg-matcha-bg text-charcoal-dark font-['Fredoka',sans-serif] selection:bg-baby-green/50"
    >
      <div className="mx-auto flex max-w-[1600px] flex-col gap-6 p-4 md:p-6 lg:p-8">
        <NavBar {...navProps} />
        {children}
        {showFooter ? <Footer /> : null}
      </div>
    </div>
  )
}
