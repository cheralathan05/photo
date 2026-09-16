import { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { Star, ChevronLeft, ChevronRight } from 'lucide-react'

const testimonials = [
  {
    id: 'review-1',
    quote: "They didn't just capture our wedding. They captured how it felt. Looking at our photos, I can smell the flowers, hear the music, feel the butterflies again. Pure magic.",
    name: 'Priya & Arun',
    event: 'Wedding · Leela Palace, Chennai',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=300&auto=format&fit=crop',
    bg: 'https://images.unsplash.com/photo-1519741497674-611481863552?q=60&w=1200',
    rating: 5,
  },
  {
    id: 'review-2',
    quote: "Our pre-wedding shoot at Pondicherry was an absolute dream. The team made us feel so natural and comfortable — the pictures look like magazine covers. We are beyond obsessed.",
    name: 'Meena & Karthik',
    event: 'Pre-Wedding · Pondicherry',
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=200',
    bg: 'https://images.unsplash.com/photo-1537633552985-df8429e8048b?q=60&w=1200',
    rating: 5,
  },
  {
    id: 'review-3',
    quote: "Worth every rupee and more. The cinematic wedding film they made for us had our entire family in tears — in the best possible way. We'll treasure this forever.",
    name: 'Swetha & Ravi',
    event: 'Destination Wedding · Udaipur',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200',
    bg: 'https://images.unsplash.com/photo-1606800052052-a08af7148866?q=60&w=1200',
    rating: 5,
  },
]

export default function Testimonials() {
  const [active, setActive] = useState(0)
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })
  const current = testimonials[active]

  const prev = () => setActive((i) => (i - 1 + testimonials.length) % testimonials.length)
  const next = () => setActive((i) => (i + 1) % testimonials.length)

  return (
    <section id="testimonials" className="relative py-32 overflow-hidden" ref={ref}>
      {/* Background */}
      <AnimatePresence mode="wait">
        <motion.div
          key={current.id}
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
        >
          <img
            src={current.bg}
            alt=""
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-obsidian/88" />
        </motion.div>
      </AnimatePresence>

      <div className="relative z-10 max-w-5xl mx-auto px-6 md:px-16 text-center">
        {/* Label */}
        <motion.span
          className="section-label block mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
        >
          Client Stories
        </motion.span>

        {/* Stars */}
        <motion.div
          className="flex justify-center gap-1 mb-10"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ delay: 0.2 }}
        >
          {[...Array(5)].map((_, i) => (
            <Star key={i} size={16} fill="#C9A84C" className="text-gold" />
          ))}
        </motion.div>

        {/* Quote */}
        <AnimatePresence mode="wait">
          <motion.blockquote
            key={current.id + '-q'}
            className="font-cormorant text-display-sm md:text-[clamp(1.8rem,3.5vw,3.2rem)] font-light italic text-cream leading-relaxed mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            "{current.quote}"
          </motion.blockquote>
        </AnimatePresence>

        {/* Client */}
        <AnimatePresence mode="wait">
          <motion.div
            key={current.id + '-c'}
            className="flex flex-col items-center gap-3"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="w-12 h-12 rounded-full overflow-hidden border border-gold/30">
              <img src={current.image} alt={current.name} className="w-full h-full object-cover" />
            </div>
            <div>
              <p className="font-cormorant text-lg text-cream font-light">{current.name}</p>
              <p className="section-label text-[9px] text-gold/60">{current.event}</p>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation */}
        <div className="flex items-center justify-center gap-6 mt-12">
          <button
            id="testimonial-prev"
            onClick={prev}
            className="glass p-3 text-cream/40 hover:text-gold transition-colors border border-white/5 hover:border-gold/20"
          >
            <ChevronLeft size={18} />
          </button>

          {/* Dots */}
          <div className="flex gap-2">
            {testimonials.map((_, i) => (
              <button
                key={i}
                id={`testimonial-dot-${i}`}
                onClick={() => setActive(i)}
                className={`h-px transition-all duration-500 ${i === active ? 'w-8 bg-gold' : 'w-4 bg-cream/20'}`}
              />
            ))}
          </div>

          <button
            id="testimonial-next"
            onClick={next}
            className="glass p-3 text-cream/40 hover:text-gold transition-colors border border-white/5 hover:border-gold/20"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </section>
  )
}
