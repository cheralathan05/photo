import ContactSection from '../components/Contact/ContactSection'
import Footer from '../components/Footer/Footer'
import { motion } from 'framer-motion'

export default function Contact() {
  return (
    <>
      {/* Hero */}
      <section className="relative h-[40vh] flex items-end overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=1600"
            alt="Contact"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-obsidian/50 to-obsidian" />
        </div>
        <div className="relative z-10 px-6 md:px-16 pb-16 max-w-7xl mx-auto w-full">
          <motion.span
            className="section-label block mb-3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            Reach Out
          </motion.span>
          <motion.h1
            className="font-cormorant text-display-lg text-cream leading-tight"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            Let's create something<br />
            <span className="italic text-gold">timeless.</span>
          </motion.h1>
        </div>
      </section>

      {/* Map placeholder */}
      <div className="h-64 bg-obsidian-mid border-y border-white/5 flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <img
            src="https://images.unsplash.com/photo-1524661135-423995f22d0b?q=60&w=1200"
            alt="Location map"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative z-10 text-center">
          <p className="section-label text-[10px] text-gold/60 mb-2">STUDIO LOCATION</p>
          <p className="font-cormorant text-xl text-cream/60">Anna Nagar, Chennai, Tamil Nadu</p>
          <a
            href="https://maps.google.com"
            target="_blank"
            rel="noopener noreferrer"
            id="directions-btn"
            className="section-label text-[9px] text-gold/50 hover:text-gold mt-3 inline-block transition-colors"
          >
            GET DIRECTIONS →
          </a>
        </div>
      </div>

      <ContactSection />
      <Footer />
    </>
  )
}
