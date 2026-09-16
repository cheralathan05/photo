import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Link } from 'react-router-dom'
import Footer from '../components/Footer/Footer'

const HERO_IMG = 'https://images.unsplash.com/photo-1554048612-b6a482bc67e5?q=80&w=1600'
const STUDIO_IMG = 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=900'
const BTS_IMG = 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=900'

const team = [
  {
    id: 'team-1',
    name: 'Arjun Menon',
    role: 'Lead Photographer & Founder',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=400',
    bio: '8 years capturing love stories across India and destination weddings worldwide.',
  },
  {
    id: 'team-2',
    name: 'Kavya Nair',
    role: 'Portrait & Fashion Photographer',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=600&auto=format&fit=crop',
    bio: 'Editorial eye with a talent for making every subject feel effortlessly beautiful.',
  },
  {
    id: 'team-3',
    name: 'Rohan Das',
    role: 'Cinematographer',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400',
    bio: 'Award-winning cinematographer specializing in cinematic wedding films.',
  },
]

const awards = [
  { year: '2025', title: 'Best Wedding Photographer', org: 'South India Photography Awards' },
  { year: '2024', title: 'Top 10 Studios', org: 'WeddingWire India' },
  { year: '2023', title: 'Editor\'s Choice', org: 'Vogue India' },
  { year: '2022', title: 'Best Cinematic Film', org: 'Indian Wedding Industry Awards' },
]

export default function About() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })
  const teamRef = useRef(null)
  const teamInView = useInView(teamRef, { once: true, margin: '-80px' })

  return (
    <>
      {/* Hero */}
      <section className="relative h-[70vh] flex items-end overflow-hidden">
        <div className="absolute inset-0">
          <img src={HERO_IMG} alt="About Pop Photography" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-obsidian/40 via-obsidian/30 to-obsidian" />
        </div>
        <div className="relative z-10 px-6 md:px-16 pb-20 max-w-7xl mx-auto w-full">
          <motion.span
            className="section-label block mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            Our Story
          </motion.span>
          <motion.h1
            className="font-cormorant text-display-lg text-cream leading-tight"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            We don't just take<br />
            <span className="italic text-gold">photographs.</span>
          </motion.h1>
        </div>
      </section>

      {/* Philosophy */}
      <section ref={ref} className="py-32 px-6 md:px-16 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          >
            <h2 className="font-cormorant text-display-md text-cream leading-tight mb-8">
              We preserve<br />
              <span className="italic text-gold">feelings.</span>
            </h2>
            <p className="font-inter text-sm text-cream/50 leading-relaxed mb-6">
              Founded in Chennai in 2018, Pop Photography was born from a simple belief — 
              that the best photographs are the ones that transport you back to exactly 
              how you felt in that moment.
            </p>
            <p className="font-inter text-sm text-cream/40 leading-relaxed mb-6">
              We are a collective of storytellers, artists, and dreamers. Every smile, 
              every tear, every quiet in-between moment — we see them all. And we capture 
              them without interference, without staging, without compromise.
            </p>
            <p className="font-inter text-sm text-cream/40 leading-relaxed mb-12">
              Over 500 stories. 150+ weddings. 12 awards. And still, every new couple 
              we meet makes us fall in love with photography all over again.
            </p>
            <Link to="/contact" id="about-book-btn" className="btn-gold">
              <span>BOOK A CONSULTATION</span>
            </Link>
          </motion.div>

          <motion.div
            className="space-y-4"
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="h-72 overflow-hidden img-hover-zoom">
              <img src={STUDIO_IMG} alt="Studio" className="w-full h-full object-cover img-inner" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="h-44 overflow-hidden img-hover-zoom">
                <img src={BTS_IMG} alt="BTS" className="w-full h-full object-cover img-inner" />
              </div>
              <div className="h-44 glass border border-gold/10 flex items-center justify-center p-6 text-center">
                <div>
                  <p className="font-cormorant text-4xl text-gold font-light">500+</p>
                  <p className="section-label text-[9px] text-cream/30 mt-2">Stories Told</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Team */}
      <section ref={teamRef} className="py-24 px-6 md:px-16 max-w-7xl mx-auto">
        <motion.span
          className="section-label block mb-4"
          initial={{ opacity: 0 }}
          animate={teamInView ? { opacity: 1 } : {}}
        >
          The Team
        </motion.span>
        <motion.h2
          className="font-cormorant text-display-sm text-cream mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={teamInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          The faces behind<br />
          <span className="italic text-gold">your story.</span>
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {team.map((member, i) => (
            <motion.div
              key={member.id}
              id={member.id}
              className="group"
              initial={{ opacity: 0, y: 40 }}
              animate={teamInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="aspect-[3/4] overflow-hidden mb-5 img-hover-zoom">
                <img src={member.image} alt={member.name} className="w-full h-full object-cover img-inner" loading="lazy" />
              </div>
              <h3 className="font-cormorant text-xl text-cream mb-1">{member.name}</h3>
              <p className="section-label text-[9px] text-gold/60 mb-3">{member.role}</p>
              <p className="font-inter text-xs text-cream/35 leading-relaxed">{member.bio}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Awards */}
      <section className="py-20 px-6 md:px-16 max-w-7xl mx-auto border-t border-white/5">
        <h2 className="font-cormorant text-display-sm text-cream mb-12">
          Awards &amp; <span className="italic text-gold">Recognition</span>
        </h2>
        <div className="space-y-0 divide-y divide-white/5">
          {awards.map((award) => (
            <div key={award.title} className="flex items-center justify-between py-6 group hover:bg-white/2 px-2 transition-colors">
              <div className="flex items-center gap-8">
                <span className="font-cormorant text-2xl text-gold/30 font-light w-16">{award.year}</span>
                <div>
                  <p className="font-cormorant text-lg text-cream group-hover:text-gold transition-colors">{award.title}</p>
                  <p className="section-label text-[9px] text-cream/25">{award.org}</p>
                </div>
              </div>
              <span className="text-gold/20 group-hover:text-gold/50 transition-colors">✦</span>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </>
  )
}
