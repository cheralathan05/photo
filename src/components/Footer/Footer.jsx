import { Link } from 'react-router-dom'
import { ArrowUp } from 'lucide-react'
import InstagramIcon from '../ui/InstagramIcon'

const FacebookIcon = ({ size = 24, className = '' }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
)

const YoutubeIcon = ({ size = 24, className = '' }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 0 0-1.95 1.96A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58A2.78 2.78 0 0 0 3.41 19.6C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.95A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z" />
    <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" />
  </svg>
)


const footerLinks = {
  WORK: [
    { label: 'Weddings', href: '/wedding' },
    { label: 'Portfolio', href: '/portfolio' },
    { label: 'Stories', href: '/portfolio' },
    { label: 'Films', href: '/portfolio' },
  ],
  SERVICES: [
    { label: 'Pre-Wedding', href: '/wedding' },
    { label: 'Portraits', href: '/wedding' },
    { label: 'Baby & Maternity', href: '/wedding' },
    { label: 'Events', href: '/wedding' },
  ],
  STUDIO: [
    { label: 'About Us', href: '/about' },
    { label: 'Packages', href: '/packages' },
    { label: 'Check Availability', href: '/availability' },
    { label: 'Client Gallery', href: '/gallery' },
  ],
}

const socials = [
  { icon: <InstagramIcon size={16} />, href: 'https://instagram.com/popphotography', id: 'footer-instagram', label: 'Instagram' },
  { icon: <FacebookIcon size={16} />, href: 'https://facebook.com/popphotography', id: 'footer-facebook', label: 'Facebook' },
  { icon: <YoutubeIcon size={16} />, href: 'https://youtube.com/popphotography', id: 'footer-youtube', label: 'YouTube' },
]

export default function Footer() {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })

  return (
    <footer id="footer" className="bg-obsidian border-t border-white/5">
      {/* Gold separator line */}
      <div className="gold-line-full" />

      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-6 md:px-16 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Brand column */}
          <div className="lg:col-span-2">
            <Link to="/" id="footer-logo" className="inline-block mb-4">
              <span className="font-cormorant text-4xl font-light tracking-[0.2em] text-cream">POP</span>
              <br />
              <span className="section-label text-[8px] text-gold/60 tracking-[0.45em]">PHOTOGRAPHY</span>
            </Link>
            <p className="font-cormorant text-lg italic text-cream/30 leading-relaxed mb-8 max-w-xs">
              "Stories fade.<br />Photographs remain."
            </p>
            <div className="flex gap-4">
              {socials.map((s) => (
                <a
                  key={s.id}
                  id={s.id}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="w-9 h-9 border border-white/10 flex items-center justify-center text-cream/30 hover:text-gold hover:border-gold/30 transition-all duration-300"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Links columns */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="section-label text-[9px] text-cream/30 mb-6">{category}</h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.href}
                      className="font-inter text-xs text-cream/40 hover:text-gold transition-colors duration-300"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 md:px-16 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex flex-wrap gap-6">
            <span className="font-inter text-[10px] text-cream/20">
              © 2026 Pop Photography. All rights reserved.
            </span>
            <a href="#" className="font-inter text-[10px] text-cream/20 hover:text-cream/40 transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="font-inter text-[10px] text-cream/20 hover:text-cream/40 transition-colors">
              Terms & Conditions
            </a>
          </div>

          <button
            id="scroll-to-top"
            onClick={scrollToTop}
            className="flex items-center gap-2 section-label text-[9px] text-cream/30 hover:text-gold transition-colors group"
          >
            <span>BACK TO TOP</span>
            <ArrowUp size={12} className="group-hover:-translate-y-1 transition-transform" />
          </button>
        </div>
      </div>
    </footer>
  )
}
