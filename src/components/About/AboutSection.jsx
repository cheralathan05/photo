import { useRef, useState, useEffect } from 'react'
import { motion, useInView } from 'framer-motion'
import { Link } from 'react-router-dom'

const PHOTOGRAPHER_IMAGE = 'https://images.unsplash.com/photo-1554048612-b6a482bc67e5?q=80&w=900&auto=format&fit=crop'
const BTS_IMAGE = 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=900&auto=format&fit=crop'

const stats = [
  { value: 8, suffix: '+', label: 'Years Experience', id: 'stat-years' },
  { value: 500, suffix: '+', label: 'Stories Told', id: 'stat-stories' },
  { value: 150, suffix: '+', label: 'Weddings Shot', id: 'stat-weddings' },
  { value: 12, suffix: '', label: 'Awards Won', id: 'stat-awards' },
]

// Animated counter
const Counter = ({ value, suffix, inView }) => {
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!inView) return
    let start = 0
    const duration = 2000
    const increment = value / (duration / 16)
    const timer = setInterval(() => {
      start += increment
      if (start >= value) {
        setCount(value)
        clearInterval(timer)
      } else {
        setCount(Math.floor(start))
      }
    }, 16)
    return () => clearInterval(timer)
  }, [inView, value])

  return <span>{count}{suffix}</span>
}

export default function AboutSection() {
  const ref = useRef(null)
  const statsRef = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })
  const statsInView = useInView(statsRef, { once: true, margin: '-50px' })

  return (
    <section id="about-section" className="py-32 overflow-hidden">
      {/* Marquee Banner */}
      <div className="marquee-wrapper border-y border-white/5 py-4 mb-32 overflow-hidden">
        <div className="marquee-track">
          {[...Array(6)].map((_, i) => (
            <span key={i} className="flex items-center gap-8 px-8">
              <span className="font-cormorant text-2xl font-light text-cream/20 italic tracking-wide">
                Wedding Photography
              </span>
              <span className="text-gold/30 text-lg">✦</span>
              <span className="font-cormorant text-2xl font-light text-cream/20 italic tracking-wide">
                Portrait Sessions
              </span>
              <span className="text-gold/30 text-lg">✦</span>
              <span className="font-cormorant text-2xl font-light text-cream/20 italic tracking-wide">
                Cinematic Films
              </span>
              <span className="text-gold/30 text-lg">✦</span>
            </span>
          ))}
        </div>
      </div>

      {/* Split Screen */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 max-w-7xl mx-auto px-6 md:px-16">
        {/* Left — Image */}
        <motion.div
          ref={ref}
          className="relative h-[60vh] lg:h-auto overflow-hidden group"
          initial={{ opacity: 0, x: -50 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        >
          <img
            src={PHOTOGRAPHER_IMAGE}
            alt="Pop Photography Studio"
            className="w-full h-full object-cover img-inner"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent to-obsidian/30 lg:to-obsidian" />
          
          {/* BTS small image overlay */}
          <motion.div
            className="absolute bottom-8 right-8 w-32 h-40 overflow-hidden border border-gold/20 shadow-2xl"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <img src={BTS_IMAGE} alt="Behind the scenes" className="w-full h-full object-cover" />
          </motion.div>

          {/* Experience badge */}
          <div className="absolute top-8 left-8 glass px-4 py-3 border border-gold/15">
            <p className="font-cormorant text-3xl font-light text-gold leading-none">8+</p>
            <p className="section-label text-[8px] text-cream/50 mt-1">YEARS</p>
          </div>
        </motion.div>

        {/* Right — Content */}
        <motion.div
          className="flex flex-col justify-center px-0 lg:pl-16 py-16 lg:py-0"
          initial={{ opacity: 0, x: 50 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="section-label block mb-6">Our Story</span>

          <h2 className="font-cormorant text-display-md text-cream leading-tight mb-8">
            We don't just take<br />
            <span className="italic text-gold">photographs.</span>
            <br />We preserve feelings.
          </h2>

          <p className="font-inter text-sm text-cream/50 leading-relaxed mb-6 max-w-lg">
            Every smile, every tear, every quiet moment deserves to be remembered exactly as it felt. 
            At Pop Photography, we believe that the best photographs are the ones that make you feel 
            something when you look at them — years from now.
          </p>

          <p className="font-inter text-sm text-cream/40 leading-relaxed mb-12 max-w-lg">
            Founded in Chennai in 2018, we've had the privilege of documenting over 500 love stories, 
            150+ weddings, and countless precious milestones. Our team of cinematic storytellers 
            brings a unique blend of artistry and authenticity to every frame.
          </p>

          <Link to="/about" id="about-learn-more-btn" className="btn-gold self-start">
            <span>LEARN OUR STORY</span>
          </Link>
        </motion.div>
      </div>

      {/* Stats */}
      <div
        ref={statsRef}
        className="grid grid-cols-2 md:grid-cols-4 gap-px bg-white/5 mt-24 mx-6 md:mx-16 max-w-7xl lg:mx-auto border border-white/5"
      >
        {stats.map((stat, i) => (
          <motion.div
            key={stat.id}
            id={stat.id}
            className="bg-obsidian p-8 text-center"
            initial={{ opacity: 0, y: 30 }}
            animate={statsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="stat-number">
              <Counter value={stat.value} suffix={stat.suffix} inView={statsInView} />
            </p>
            <p className="section-label text-[9px] text-cream/30 mt-3">{stat.label}</p>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
