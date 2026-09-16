import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import InstagramIcon from '../ui/InstagramIcon'

const instagramImages = [
  { id: 'ig1', src: 'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=600', likes: '342' },
  { id: 'ig2', src: 'https://images.unsplash.com/photo-1537633552985-df8429e8048b?q=80&w=600', likes: '256' },
  { id: 'ig3', src: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?q=80&w=600', likes: '489' },
  { id: 'ig4', src: 'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?q=80&w=600', likes: '178' },
  { id: 'ig5', src: 'https://images.unsplash.com/photo-1606800052052-a08af7148866?q=80&w=600', likes: '621' },
  { id: 'ig6', src: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=600', likes: '394' },
  { id: 'ig7', src: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=600', likes: '287' },
  { id: 'ig8', src: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=600', likes: '445' },
  { id: 'ig9', src: 'https://images.unsplash.com/photo-1554048612-b6a482bc67e5?q=80&w=600', likes: '332' },
]

export default function InstagramSection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="instagram-section" className="py-24" ref={ref}>
      {/* Header */}
      <div className="text-center mb-12 px-6">
        <motion.span
          className="section-label block mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
        >
          Follow The Journey
        </motion.span>
        <motion.h2
          className="font-cormorant text-display-sm text-cream mb-2"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        >
          @popphotography
        </motion.h2>
        <motion.p
          className="font-inter text-xs text-cream/30"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.3 }}
        >
          Stories unfolding, one frame at a time.
        </motion.p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-3 md:grid-cols-3 lg:grid-cols-9 gap-[2px] mb-10">
        {instagramImages.map((img, i) => (
          <motion.a
            key={img.id}
            id={img.id}
            href="https://instagram.com/popphotography"
            target="_blank"
            rel="noopener noreferrer"
            className="relative aspect-square overflow-hidden img-hover-zoom group"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.1 + i * 0.05, ease: [0.16, 1, 0.3, 1] }}
          >
            <img
              src={img.src}
              alt="Instagram"
              className="w-full h-full object-cover img-inner"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-obsidian/0 group-hover:bg-obsidian/60 transition-colors duration-400" />
            <div className="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <InstagramIcon size={16} className="text-cream/90 mb-1" />
              <span className="font-inter text-[10px] text-cream/70">♥ {img.likes}</span>
            </div>
          </motion.a>
        ))}
      </div>

      {/* CTA */}
      <div className="text-center">
        <motion.a
          href="https://instagram.com/popphotography"
          target="_blank"
          rel="noopener noreferrer"
          id="instagram-cta-btn"
          className="btn-gold inline-flex items-center gap-3"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5 }}
        >
          <span className="flex items-center gap-2">
            <InstagramIcon size={13} />
            VIEW INSTAGRAM
          </span>
        </motion.a>
      </div>
    </section>
  )
}
