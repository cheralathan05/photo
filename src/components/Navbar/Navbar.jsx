import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'

const navLinks = [
  { label: 'HOME', href: '/' },
  { label: 'WORK', href: '/portfolio' },
  { label: 'SERVICES', href: '/wedding' },
  { label: 'STORY', href: '/about' },
  { label: 'PACKAGES', href: '/packages' },
  { label: 'JOURNAL', href: '/journal' },
  { label: 'CONTACT', href: '/contact' },
]

const mobileMenuVariants = {
  closed: { x: '100%', transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
  open: { x: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setMobileOpen(false)
  }, [location])

  return (
    <>
      <motion.nav
        id="main-navbar"
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${
          scrolled
            ? 'py-4 mx-4 mt-3 rounded-2xl glass border border-gold/10 shadow-2xl'
            : 'py-6 bg-transparent'
        }`}
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          {/* Logo */}
          <Link to="/" id="nav-logo" className="relative z-10 group flex flex-col items-start">
            <span className="font-cormorant text-2xl font-light tracking-[0.2em] text-cream leading-none group-hover:text-gold transition-colors duration-300">
              POP
            </span>
            <span className="section-label text-[7px] tracking-[0.45em] text-gold/70 -mt-0.5">PHOTOGRAPHY</span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-6 lg:gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                to={link.href}
                id={`nav-${link.label.toLowerCase()}`}
                className={`nav-link ${location.pathname === link.href ? 'text-gold' : ''}`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* CTA + Hamburger */}
          <div className="flex items-center gap-4">
            <Link
              to="/availability"
              id="nav-book-btn"
              className="hidden md:block btn-gold text-[10px] py-2.5 px-6"
            >
              <span>BOOK NOW</span>
            </Link>

            <button
              id="mobile-menu-toggle"
              className="md:hidden text-cream/70 hover:text-gold transition-colors"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            id="mobile-menu"
            className="fixed inset-0 z-40 flex flex-col"
            variants={mobileMenuVariants}
            initial="closed"
            animate="open"
            exit="closed"
          >
            <div className="absolute inset-0 bg-obsidian" />
            <div
              className="absolute inset-0 opacity-30"
              style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1606800052052-a08af7148866?q=80&w=800)', backgroundSize: 'cover', backgroundPosition: 'center' }}
            />
            <div className="absolute inset-0 bg-obsidian/80" />

            <div className="relative z-10 flex flex-col justify-center h-full px-10 py-20">
              <div className="mb-12">
                <span className="font-cormorant text-4xl font-light tracking-[0.2em] text-cream">POP</span>
                <br />
                <span className="section-label text-[8px] text-gold/70 tracking-[0.45em]">PHOTOGRAPHY</span>
              </div>

              <nav className="flex flex-col gap-5 sm:gap-7">
                {navLinks.map((link, i) => (
                  <motion.div
                    key={link.label}
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + i * 0.07, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <Link
                      to={link.href}
                      className="font-cormorant text-4xl font-light text-cream/80 hover:text-gold transition-colors duration-300 tracking-wide"
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}
              </nav>

              <motion.div
                className="mt-12"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                <Link to="/availability" className="btn-gold inline-block">
                  <span>BOOK A SESSION</span>
                </Link>
              </motion.div>

              <div className="mt-auto pt-12 flex gap-6">
                {['Instagram', 'Facebook', 'YouTube'].map((s) => (
                  <a key={s} href="#" className="section-label text-[9px] text-cream/30 hover:text-gold transition-colors">
                    {s}
                  </a>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
