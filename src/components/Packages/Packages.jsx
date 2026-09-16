import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Check, ArrowRight } from 'lucide-react'

const packages = [
  {
    id: 'pkg-essential',
    name: 'ESSENTIAL',
    tagline: 'For intimate celebrations',
    desc: 'Perfect for intimate ceremonies and small gatherings. Everything you need, nothing you don\'t.',
    features: [
      '8 Hours of Coverage',
      '1 Professional Photographer',
      '400+ Edited Images',
      'Online Gallery Delivery',
      'Wedding Day Timeline',
      '3-Week Delivery',
    ],
    accent: false,
    badge: null,
  },
  {
    id: 'pkg-signature',
    name: 'SIGNATURE',
    tagline: 'For complete wedding stories',
    desc: 'Our most popular choice. Full-day coverage with cinematic storytelling from getting ready to reception.',
    features: [
      'Full Day Coverage (12 hrs)',
      '2 Photographers',
      '700+ Edited Images',
      'Cinematic Highlight Reel',
      'Engagement Session',
      'Premium Online Gallery',
      'Priority 2-Week Delivery',
      'Printed Album (30 pages)',
    ],
    accent: true,
    badge: 'MOST POPULAR',
  },
  {
    id: 'pkg-luxury',
    name: 'LUXURY',
    tagline: 'For cinematic destination experiences',
    desc: 'The complete, uncompromising experience. For couples who want it all — stills, film, and memories for generations.',
    features: [
      'Unlimited Coverage Days',
      '3 Photographers + Cinematographer',
      '1000+ Edited Images',
      'Full Cinematic Wedding Film',
      'Destination Travel Included',
      'Drone Aerial Footage',
      'Same-Day Slideshow',
      'Luxury Album (60 pages)',
      'Wall Art Prints',
      '1-Week Priority Delivery',
    ],
    accent: false,
    badge: null,
  },
]

const PackageCard = ({ pkg, index, inView }) => (
  <motion.div
    id={pkg.id}
    className={`relative flex flex-col border transition-all duration-500 group ${
      pkg.accent
        ? 'border-gold/40 bg-gradient-to-b from-gold/5 to-transparent scale-[1.02]'
        : 'border-white/8 hover:border-gold/20'
    }`}
    initial={{ opacity: 0, y: 50 }}
    animate={inView ? { opacity: 1, y: 0 } : {}}
    transition={{ duration: 0.8, delay: 0.1 + index * 0.15, ease: [0.16, 1, 0.3, 1] }}
  >
    {/* Badge */}
    {pkg.badge && (
      <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gold px-4 py-1">
        <span className="section-label text-[9px] text-obsidian">{pkg.badge}</span>
      </div>
    )}

    <div className="p-8 md:p-10 flex flex-col h-full">
      {/* Header */}
      <div className="mb-8">
        <h3 className={`font-cormorant text-3xl font-light tracking-wide mb-1 ${pkg.accent ? 'text-gold' : 'text-cream'}`}>
          {pkg.name}
        </h3>
        <p className="section-label text-[9px] text-cream/40 mb-4">{pkg.tagline}</p>
        <p className="font-inter text-xs text-cream/40 leading-relaxed">{pkg.desc}</p>
      </div>

      {/* Features */}
      <ul className="space-y-3 mb-10 flex-1">
        {pkg.features.map((f) => (
          <li key={f} className="flex items-start gap-3">
            <Check size={13} className={pkg.accent ? 'text-gold mt-0.5 flex-shrink-0' : 'text-cream/30 mt-0.5 flex-shrink-0'} />
            <span className="font-inter text-xs text-cream/50">{f}</span>
          </li>
        ))}
      </ul>

      {/* Price placeholder & CTA */}
      <div>
        <p className="section-label text-[9px] text-cream/25 mb-4 text-center">
          PRICING CUSTOMIZED TO YOUR VISION
        </p>
        <Link
          to="/contact"
          id={`${pkg.id}-cta`}
          className={pkg.accent ? 'btn-gold w-full flex justify-center' : 'btn-gold w-full flex justify-center opacity-70 hover:opacity-100'}
        >
          <span className="flex items-center gap-2">
            REQUEST QUOTE <ArrowRight size={13} />
          </span>
        </Link>
      </div>
    </div>
  </motion.div>
)

export default function Packages() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="packages" className="py-32 px-6 md:px-16 max-w-7xl mx-auto">
      <div ref={ref}>
        {/* Header */}
        <div className="text-center mb-20">
          <motion.span
            className="section-label block mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
          >
            Investment
          </motion.span>
          <motion.h2
            className="font-cormorant text-display-md text-cream leading-tight mb-6"
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            Choose your<br />
            <span className="italic text-gold">experience.</span>
          </motion.h2>
          <motion.p
            className="font-inter text-sm text-cream/40 max-w-md mx-auto"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.3 }}
          >
            Each package is a starting point. We customize every experience to perfectly match your vision.
          </motion.p>
        </div>

        {/* Package Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-white/5 md:gap-4 md:bg-transparent">
          {packages.map((pkg, i) => (
            <PackageCard key={pkg.id} pkg={pkg} index={i} inView={inView} />
          ))}
        </div>

        {/* Custom quote CTA */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6 }}
        >
          <p className="font-cormorant text-xl italic text-cream/40 mb-6">
            "Something unique in mind? Let's create it together."
          </p>
          <Link to="/contact" id="custom-quote-btn" className="btn-gold">
            <span>REQUEST CUSTOM QUOTE →</span>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
