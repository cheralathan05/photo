import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const processSteps = [
  {
    id: 'process-discover',
    number: '01',
    title: 'DISCOVER',
    desc: 'We start with a conversation — your story, your vision, your dream day. Understanding what makes your love story unique.',
  },
  {
    id: 'process-plan',
    number: '02',
    title: 'PLAN',
    desc: 'We craft a bespoke photography experience tailored to you. Locations, timelines, creative concepts — all perfected.',
  },
  {
    id: 'process-capture',
    number: '03',
    title: 'CAPTURE',
    desc: 'On the day, we disappear into the background — quietly documenting every meaningful, authentic moment.',
  },
  {
    id: 'process-deliver',
    number: '04',
    title: 'DELIVER',
    desc: 'Meticulously edited, beautifully curated — your story delivered as a timeless visual heirloom within 3 weeks.',
  },
]

const BG_IMAGE = 'https://images.unsplash.com/photo-1606800052052-a08af7148866?q=60&w=1200'

export default function Process() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="process" className="relative py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <img src={BG_IMAGE} alt="" className="w-full h-full object-cover opacity-10" />
        <div className="absolute inset-0 bg-obsidian/90" />
      </div>

      <div ref={ref} className="relative z-10 max-w-7xl mx-auto px-6 md:px-16">
        {/* Title */}
        <div className="text-center mb-24">
          <motion.span
            className="section-label block mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
          >
            The Experience
          </motion.span>
          <motion.h2
            className="font-cormorant text-display-md text-cream leading-tight"
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            Your day.{' '}
            <span className="italic text-gold">Your story.</span>
            <br />
            Our vision.
          </motion.h2>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-4">
          {processSteps.map((step, i) => (
            <motion.div
              key={step.id}
              id={step.id}
              className="relative group"
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.2 + i * 0.12, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* Connector line */}
              {i < processSteps.length - 1 && (
                <div className="hidden lg:block absolute top-10 left-full w-full h-px bg-gradient-to-r from-gold/20 to-transparent z-10 -translate-x-4" />
              )}

              {/* Number */}
              <div className="flex items-center gap-4 mb-6">
                <span className="font-cormorant text-5xl font-light text-gold/20 leading-none group-hover:text-gold/40 transition-colors duration-500">
                  {step.number}
                </span>
                <div className="w-8 h-px bg-gold/20 group-hover:bg-gold/50 transition-colors duration-500" />
              </div>

              {/* Content */}
              <h3 className="font-grotesk text-sm font-medium tracking-[0.2em] text-cream mb-3">
                {step.title}
              </h3>
              <p className="font-inter text-xs text-cream/40 leading-relaxed">
                {step.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
