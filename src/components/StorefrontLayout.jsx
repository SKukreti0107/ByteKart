import NavBar from './NavBar'
import Footer from './Footer'

export default function StorefrontLayout({ children, showFooter = true, navProps }) {
  return (
    <div
      className="flex flex-col min-h-screen bg-matcha-bg text-charcoal-dark font-['Fredoka',sans-serif] selection:bg-baby-green/50"
    >
      <div className="flex flex-col flex-1 w-full">
        <NavBar {...navProps} />
        {children}
      </div>
      {showFooter ? <Footer /> : null}
    </div>
  )
}
