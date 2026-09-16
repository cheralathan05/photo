import Portfolio from '../components/Portfolio/Portfolio'
import Footer from '../components/Footer/Footer'
import { motion } from 'framer-motion'

export default function PortfolioPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative h-[50vh] flex items-end overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=1600"
            alt="Portfolio"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-obsidian/30 to-obsidian" />
        </div>
        <div className="relative z-10 px-6 md:px-16 pb-16 max-w-7xl mx-auto w-full">
          <motion.span
            className="section-label block mb-3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            Our Portfolio
          </motion.span>
          <motion.h1
            className="font-cormorant text-display-lg text-cream leading-tight"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            Moments made<br />
            <span className="italic text-gold">timeless.</span>
          </motion.h1>
        </div>
      </section>

      {/* Full portfolio gallery - no limit */}
      <Portfolio limit={100} />

      <Footer />
    </>
  )
}
