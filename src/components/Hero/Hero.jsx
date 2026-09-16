import { useEffect, useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ChevronDown } from 'lucide-react'

// High-quality Unsplash wedding/photography images
const HERO_IMAGE = 'https://images.unsplash.com/photo-1519741497674-611481863552?q=90&w=2070&auto=format&fit=crop'

const heroWords = ['CAPTURING', 'YOUR', 'FOREVER.']

export default function Hero() {
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  })

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '30%'])
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.08])

  const scrollToNext = () => {
    window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })
  }

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative h-screen w-full overflow-hidden flex items-center justify-center"
    >
      {/* Parallax Background */}
      <motion.div
        className="absolute parallax-container"
        style={{ y, scale, inset: '-10% 0' }}
      >
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${HERO_IMAGE})` }}
        />
        {/* Cinematic gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-obsidian/70 via-obsidian/20 to-obsidian/90" />
        <div className="absolute inset-0 bg-gradient-to-r from-obsidian/40 via-transparent to-obsidian/40" />
      </motion.div>

      {/* Content */}
      <motion.div
        className="relative z-10 text-center px-6 max-w-6xl mx-auto"
        style={{ opacity }}
      >
        {/* Sub-label */}
        <motion.div
          className="flex items-center justify-center gap-4 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="gold-line" />
          <span className="section-label text-[10px] tracking-[0.4em]">
            Wedding · Portrait · Fashion · Events · Films
          </span>
          <div className="gold-line rotate-180" />
        </motion.div>

        {/* Main headline */}
        <div className="overflow-hidden mb-6">
          {heroWords.map((word, i) => (
            <div key={word} className="overflow-hidden">
              <motion.h1
                className={`font-cormorant block leading-[0.88] tracking-[-0.02em] text-cream ${
                  word === 'FOREVER.'
                    ? 'gold-shimmer text-[clamp(4rem,12vw,14rem)]'
                    : 'text-[clamp(4rem,12vw,14rem)]'
                }`}
                initial={{ y: '100%', opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{
                  duration: 1,
                  delay: 0.5 + i * 0.15,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                {word}
              </motion.h1>
            </div>
          ))}
        </div>

        {/* Description */}
        <motion.p
          className="font-inter text-sm font-light tracking-[0.15em] text-cream/50 mb-12 uppercase"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.1, ease: [0.16, 1, 0.3, 1] }}
        >
          Pop Photography Studio · Chennai
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.3, ease: [0.16, 1, 0.3, 1] }}
        >
          <Link to="/portfolio" id="hero-explore-btn" className="btn-gold">
            <span>EXPLORE OUR WORK</span>
          </Link>
          <Link to="/availability" id="hero-book-btn" className="btn-cream">
            BOOK YOUR DATE
          </Link>
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.button
        id="hero-scroll-indicator"
        onClick={scrollToNext}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 group"
        style={{ opacity }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
      >
        <span className="section-label text-[8px] text-cream/30 group-hover:text-gold transition-colors">SCROLL</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ChevronDown size={16} className="text-gold/50" />
        </motion.div>
      </motion.button>

      {/* Corner decorations */}
      <div className="absolute top-24 left-8 text-cream/15 font-cormorant text-xs tracking-[0.3em] rotate-90 origin-left hidden md:block">
        POP PHOTOGRAPHY
      </div>
      <div className="absolute bottom-10 right-8 text-cream/15 font-cormorant text-xs tracking-[0.3em] hidden md:block">
        EST. 2018
      </div>
    </section>
  )
}
