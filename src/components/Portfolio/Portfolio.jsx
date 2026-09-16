import { useRef, useState, useEffect } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { X, ZoomIn, ChevronLeft, ChevronRight } from 'lucide-react'

const categories = ['ALL', 'WEDDINGS', 'PRE-WEDDING', 'PORTRAITS', 'BABY', 'EVENTS']

const galleryImages = [
  { id: 'g1', src: 'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=800', cat: 'WEDDINGS', height: 'tall' },
  { id: 'g2', src: 'https://images.unsplash.com/photo-1537633552985-df8429e8048b?q=80&w=800', cat: 'PRE-WEDDING', height: 'medium' },
  { id: 'g3', src: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?q=80&w=800', cat: 'PORTRAITS', height: 'short' },
  { id: 'g4', src: 'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?q=80&w=800', cat: 'BABY', height: 'medium' },
  { id: 'g5', src: 'https://images.unsplash.com/photo-1606800052052-a08af7148866?q=80&w=800', cat: 'WEDDINGS', height: 'short' },
  { id: 'g6', src: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=800', cat: 'WEDDINGS', height: 'tall' },
  { id: 'g7', src: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=800', cat: 'EVENTS', height: 'medium' },
  { id: 'g8', src: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=800', cat: 'EVENTS', height: 'short' },
  { id: 'g9', src: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=800', cat: 'PORTRAITS', height: 'tall' },
  { id: 'g10', src: 'https://images.unsplash.com/photo-1554048612-b6a482bc67e5?q=80&w=800', cat: 'PORTRAITS', height: 'medium' },
  { id: 'g11', src: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=800', cat: 'PRE-WEDDING', height: 'short' },
  { id: 'g12', src: 'https://images.unsplash.com/photo-1520813792240-56fc4a3765a7?q=80&w=800', cat: 'BABY', height: 'tall' },
]

const heightMap = { tall: 'h-80', medium: 'h-60', short: 'h-44' }

// Lightbox
const Lightbox = ({ images, index, onClose, onPrev, onNext }) => {
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowRight') onNext()
      if (e.key === 'ArrowLeft') onPrev()
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [onClose, onPrev, onNext])

  return (
    <motion.div
      className="lightbox-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      {/* Close */}
      <button
        id="lightbox-close"
        onClick={onClose}
        className="absolute top-6 right-6 text-cream/60 hover:text-gold transition-colors z-10"
      >
        <X size={24} />
      </button>

      {/* Image */}
      <motion.div
        key={index}
        className="relative max-w-5xl max-h-[85vh] mx-auto px-4"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={images[index]?.src}
          alt="Portfolio"
          className="w-full h-full object-contain max-h-[85vh]"
        />
      </motion.div>

      {/* Prev/Next */}
      <button
        id="lightbox-prev"
        onClick={(e) => { e.stopPropagation(); onPrev() }}
        className="absolute left-6 top-1/2 -translate-y-1/2 glass p-3 text-cream/60 hover:text-gold transition-colors"
      >
        <ChevronLeft size={24} />
      </button>
      <button
        id="lightbox-next"
        onClick={(e) => { e.stopPropagation(); onNext() }}
        className="absolute right-6 top-1/2 -translate-y-1/2 glass p-3 text-cream/60 hover:text-gold transition-colors"
      >
        <ChevronRight size={24} />
      </button>

      {/* Counter */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 section-label text-[9px] text-cream/30">
        {index + 1} / {images.length}
      </div>
    </motion.div>
  )
}

export default function Portfolio({ limit = 12 }) {
  const [activeCategory, setActiveCategory] = useState('ALL')
  const [lightboxIndex, setLightboxIndex] = useState(null)
  const titleRef = useRef(null)
  const inView = useInView(titleRef, { once: true })

  const filtered = activeCategory === 'ALL'
    ? galleryImages.slice(0, limit)
    : galleryImages.filter(img => img.cat === activeCategory).slice(0, limit)

  const openLightbox = (idx) => setLightboxIndex(idx)
  const closeLightbox = () => setLightboxIndex(null)
  const prevImage = () => setLightboxIndex(i => (i - 1 + filtered.length) % filtered.length)
  const nextImage = () => setLightboxIndex(i => (i + 1) % filtered.length)

  return (
    <>
      <section id="portfolio-section" className="py-32 px-6 md:px-16 max-w-7xl mx-auto">
        {/* Header */}
        <div ref={titleRef} className="mb-12 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div>
            <motion.span
              className="section-label block mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
            >
              Our Work
            </motion.span>
            <motion.h2
              className="font-cormorant text-display-md text-cream leading-tight"
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.9, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
              Moments made<br />
              <span className="italic text-gold">timeless.</span>
            </motion.h2>
          </div>
        </div>

        {/* Category Filter */}
        <motion.div
          className="flex flex-wrap gap-3 mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          {categories.map((cat) => (
            <button
              key={cat}
              id={`filter-${cat.toLowerCase().replace('-', '')}`}
              onClick={() => setActiveCategory(cat)}
              className={`font-grotesk text-[10px] font-medium tracking-[0.25em] uppercase px-5 py-2.5 border transition-all duration-300 cursor-pointer ${
                activeCategory === cat
                  ? 'border-gold bg-gold text-obsidian font-semibold shadow-md shadow-gold/10'
                  : 'border-white/10 text-cream/50 hover:border-gold/40 hover:text-gold'
              }`}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        {/* Masonry Grid */}
        <div className="masonry-grid">
          <AnimatePresence mode="popLayout">
            {filtered.map((img, idx) => (
              <motion.div
                key={img.id}
                layout
                className={`masonry-item relative img-hover-zoom group ${heightMap[img.height]} overflow-hidden`}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                onClick={() => openLightbox(idx)}
                style={{ cursor: 'pointer' }}
              >
                <img
                  src={img.src}
                  alt={img.cat}
                  className="w-full h-full object-cover img-inner"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-obsidian/0 group-hover:bg-obsidian/50 transition-colors duration-500" />

                {/* Hover overlay */}
                <div className="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <ZoomIn size={28} className="text-cream/80 mb-3" />
                  <span className="section-label text-[9px] text-cream/60">{img.cat}</span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <Lightbox
            images={filtered}
            index={lightboxIndex}
            onClose={closeLightbox}
            onPrev={prevImage}
            onNext={nextImage}
          />
        )}
      </AnimatePresence>
    </>
  )
}
