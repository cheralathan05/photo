import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { Link } from 'react-router-dom'

const services = [
  {
    id: 'svc-wedding',
    number: '01',
    title: 'WEDDINGS',
    subtitle: 'Candid · Traditional · Cinematic',
    desc: 'Every tear, every laugh, every stolen glance — captured in its most honest form.',
    image: 'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=900&auto=format&fit=crop',
    href: '/wedding',
  },
  {
    id: 'svc-prewedding',
    number: '02',
    title: 'PRE-WEDDING',
    subtitle: 'Concept · Location · Cinematic',
    desc: 'Your love story, before the biggest chapter begins. Let\'s create magic.',
    image: 'https://images.unsplash.com/photo-1537633552985-df8429e8048b?q=80&w=900&auto=format&fit=crop',
    href: '/portfolio',
  },
  {
    id: 'svc-portrait',
    number: '03',
    title: 'PORTRAITS',
    subtitle: 'Personal · Editorial · Fashion',
    desc: 'From editorial fashion to intimate personal portraits — your authentic self, elevated.',
    image: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?q=80&w=900&auto=format&fit=crop',
    href: '/portfolio',
  },
  {
    id: 'svc-events',
    number: '04',
    title: 'EVENTS',
    subtitle: 'Corporate · Birthday · Celebrations',
    desc: 'Milestones deserve to be remembered. We document every meaningful moment.',
    image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=900&auto=format&fit=crop',
    href: '/portfolio',
  },
  {
    id: 'svc-baby',
    number: '05',
    title: 'BABY & MATERNITY',
    subtitle: 'Newborn · Maternity · Family',
    desc: 'The softest moments of life, captured with the gentlest touch.',
    image: 'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?q=80&w=900&auto=format&fit=crop',
    href: '/portfolio',
  },
  {
    id: 'svc-films',
    number: '06',
    title: 'CINEMATIC FILMS',
    subtitle: 'Wedding Films · Reels · Short Films',
    desc: 'Not just photographs — your story told in motion. Award-winning cinematic films.',
    image: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=900&auto=format&fit=crop',
    href: '/portfolio',
  },
]

const ServiceCard = ({ svc, index }) => {
  const [hovered, setHovered] = useState(false)
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <motion.div
      ref={ref}
      id={svc.id}
      className="relative overflow-hidden group border border-white/5 hover:border-gold/20 transition-colors duration-500 cursor-pointer"
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
    >
      {/* Background image (expands on hover) */}
      <motion.div
        className="absolute inset-0"
        animate={{ opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.5 }}
      >
        <img
          src={svc.image}
          alt={svc.title}
          className="w-full h-full object-cover"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-obsidian/75" />
      </motion.div>

      {/* Content */}
      <div className="relative z-10 p-8 md:p-10">
        {/* Number */}
        <div className="flex items-start justify-between mb-6">
          <span className="font-cormorant text-6xl font-light text-gold/10 leading-none select-none">
            {svc.number}
          </span>
          <motion.span
            className="text-gold text-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 mt-2"
            animate={{ x: hovered ? 0 : -10 }}
            transition={{ duration: 0.3 }}
          >
            →
          </motion.span>
        </div>

        {/* Title */}
        <h3 className="font-cormorant text-2xl md:text-3xl font-light text-cream tracking-wide mb-1">
          {svc.title}
        </h3>
        <p className="section-label text-[9px] text-gold/60 mb-4">{svc.subtitle}</p>

        {/* Description */}
        <motion.p
          className="font-inter text-xs text-cream/50 leading-relaxed"
          animate={{ opacity: hovered ? 1 : 0.6 }}
          transition={{ duration: 0.3 }}
        >
          {svc.desc}
        </motion.p>

        {/* CTA */}
        <motion.div
          className="mt-6 overflow-hidden"
          animate={{ height: hovered ? 'auto' : 0, opacity: hovered ? 1 : 0 }}
          initial={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.4 }}
        >
          <Link to={svc.href} className="section-label text-[9px] text-gold flex items-center gap-2">
            EXPLORE <span>→</span>
          </Link>
        </motion.div>
      </div>
    </motion.div>
  )
}

export default function Services() {
  const titleRef = useRef(null)
  const inView = useInView(titleRef, { once: true })

  return (
    <section id="services" className="py-32 px-6 md:px-16 max-w-7xl mx-auto">
      {/* Header */}
      <div ref={titleRef} className="mb-20 max-w-2xl">
        <motion.span
          className="section-label block mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
        >
          What We Do
        </motion.span>
        <motion.h2
          className="font-cormorant text-display-md text-cream leading-tight"
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        >
          Every moment has<br />
          <span className="italic text-gold">a story worth telling.</span>
        </motion.h2>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-white/5">
        {services.map((svc, i) => (
          <ServiceCard key={svc.id} svc={svc} index={i} />
        ))}
      </div>
    </section>
  )
}
