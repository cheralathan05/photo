import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import Footer from '../components/Footer/Footer'
import Packages from '../components/Packages/Packages'

const weddingStyles = [
  {
    id: 'ws-candid',
    title: 'Candid Photography',
    desc: 'Authentic, unscripted moments that tell the real story of your day.',
    image: 'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=700',
  },
  {
    id: 'ws-traditional',
    title: 'Traditional Photography',
    desc: 'Classic posed portraits, family groupings, and ceremonial documentation.',
    image: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=700',
  },
  {
    id: 'ws-cinematic',
    title: 'Cinematic Films',
    desc: 'Your love story transformed into a breathtaking short film.',
    image: 'https://images.unsplash.com/photo-1606800052052-a08af7148866?q=80&w=700',
  },
]

const weddingGallery = [
  'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=800',
  'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=800',
  'https://images.unsplash.com/photo-1606800052052-a08af7148866?q=80&w=800',
  'https://images.unsplash.com/photo-1537633552985-df8429e8048b?q=80&w=800',
  'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?q=80&w=800',
  'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=800',
]

export default function Wedding() {
  return (
    <>
      {/* Cinematic Hero */}
      <section className="relative h-screen flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1519741497674-611481863552?q=90&w=1800"
            alt="Wedding Photography"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-obsidian/80 via-obsidian/40 to-obsidian/20" />
          <div className="absolute inset-0 bg-gradient-to-b from-obsidian/30 via-transparent to-obsidian/80" />
        </div>
        <div className="relative z-10 px-6 md:px-16 max-w-7xl mx-auto">
          <motion.span
            className="section-label block mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            Wedding Photography
          </motion.span>
          <motion.h1
            className="font-cormorant text-display-xl text-cream leading-tight mb-8 max-w-2xl"
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            Your forever<br />
            <span className="italic text-gold">beautifully told.</span>
          </motion.h1>
          <motion.p
            className="font-inter text-sm text-cream/50 max-w-md mb-12 leading-relaxed"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
          >
            From intimate ceremonies to grand celebrations — we document every tear, 
            every smile, every in-between moment with an artist's eye and a storyteller's heart.
          </motion.p>
          <motion.div
            className="flex flex-col sm:flex-row gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.9 }}
          >
            <Link to="/contact" id="wedding-book-btn" className="btn-gold">
              <span>BOOK YOUR DATE</span>
            </Link>
            <Link to="/portfolio" id="wedding-gallery-btn" className="btn-cream">
              VIEW GALLERY
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Styles */}
      <section className="py-32 px-6 md:px-16 max-w-7xl mx-auto">
        <div className="mb-16">
          <span className="section-label block mb-4">Our Approach</span>
          <h2 className="font-cormorant text-display-md text-cream leading-tight">
            Three ways to tell<br />
            <span className="italic text-gold">your story.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-white/5">
          {weddingStyles.map((style) => (
            <motion.div
              key={style.id}
              id={style.id}
              className="bg-obsidian group overflow-hidden"
              whileInView={{ opacity: 1, y: 0 }}
              initial={{ opacity: 0, y: 30 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="h-64 overflow-hidden img-hover-zoom">
                <img src={style.image} alt={style.title} className="w-full h-full object-cover img-inner" loading="lazy" />
              </div>
              <div className="p-8">
                <h3 className="font-cormorant text-2xl text-cream mb-3 group-hover:text-gold transition-colors">{style.title}</h3>
                <p className="font-inter text-xs text-cream/40 leading-relaxed">{style.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Gallery Preview */}
      <section className="py-16 px-6 md:px-16 max-w-7xl mx-auto">
        <h2 className="font-cormorant text-display-sm text-cream mb-12">
          Wedding <span className="italic text-gold">Gallery</span>
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-[3px]">
          {weddingGallery.map((src, i) => (
            <motion.div
              key={i}
              className={`overflow-hidden img-hover-zoom ${i === 0 ? 'row-span-2 h-full' : 'h-52 md:h-64'}`}
              whileInView={{ opacity: 1, scale: 1 }}
              initial={{ opacity: 0, scale: 0.97 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, delay: i * 0.08 }}
              style={{ minHeight: i === 0 ? '100%' : 'auto' }}
            >
              <img src={src} alt="Wedding" className="w-full h-full object-cover img-inner min-h-full" loading="lazy" />
            </motion.div>
          ))}
        </div>
      </section>

      {/* Packages */}
      <Packages />

      <Footer />
    </>
  )
}
