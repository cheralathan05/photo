import Hero from '../components/Hero/Hero'
import FeaturedStories from '../components/Stories/FeaturedStories'
import AboutSection from '../components/About/AboutSection'
import Services from '../components/Services/Services'
import Portfolio from '../components/Portfolio/Portfolio'
import CinemaSection from '../components/Cinema/CinemaSection'
import Process from '../components/Process/Process'
import Packages from '../components/Packages/Packages'
import Testimonials from '../components/Testimonials/Testimonials'
import InstagramSection from '../components/Instagram/InstagramSection'
import ContactSection from '../components/Contact/ContactSection'
import Footer from '../components/Footer/Footer'
import { useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Shield, Zap, Heart, Clock, Sparkles } from 'lucide-react'
import { journalPosts } from '../data/journalData'
import ArticleModal from '../components/Journal/ArticleModal'

// Why Choose Us section
const whyItems = [
  { id: 'why-team', icon: <Shield size={20} />, title: 'Professional Team', desc: 'Award-winning photographers and cinematographers with 8+ years of expertise.' },
  { id: 'why-editing', icon: <Sparkles size={20} />, title: 'High-End Editing', desc: 'Each image meticulously crafted with cinematic color grading and retouching.' },
  { id: 'why-candid', icon: <Heart size={20} />, title: 'Candid Approach', desc: 'We capture real emotions, not poses. Authentic stories, honest moments.' },
  { id: 'why-delivery', icon: <Zap size={20} />, title: 'Fast Delivery', desc: 'Your memories delivered within 2–3 weeks. Same-day previews available.' },
  { id: 'why-packages', icon: <Clock size={20} />, title: 'Customized Packages', desc: 'Fully tailored to your vision, timeline, and budget. Nothing cookie-cutter.' },
]

const WhyChooseUs = () => {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="why-choose-us" className="py-24 px-6 md:px-16 max-w-7xl mx-auto" ref={ref}>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div>
          <motion.span
            className="section-label block mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
          >
            Why Pop Photography
          </motion.span>
          <motion.h2
            className="font-cormorant text-display-md text-cream leading-tight"
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            The difference is<br />
            <span className="italic text-gold">in the details.</span>
          </motion.h2>
        </div>

        <div className="space-y-8">
          {whyItems.map((item, i) => (
            <motion.div
              key={item.id}
              id={item.id}
              className="flex items-start gap-5 group"
              initial={{ opacity: 0, x: 30 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 + i * 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="flex-shrink-0 w-10 h-10 border border-gold/20 flex items-center justify-center text-gold/60 group-hover:border-gold/50 group-hover:text-gold transition-all duration-300 mt-0.5">
                {item.icon}
              </div>
              <div>
                <h3 className="font-grotesk text-sm font-medium text-cream mb-1 tracking-wide">{item.title}</h3>
                <p className="font-inter text-xs text-cream/40 leading-relaxed">{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

// Journal section
const Journal = () => {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const [selectedPost, setSelectedPost] = useState(null)
  const homePosts = journalPosts.slice(0, 3)

  return (
    <section id="journal" className="py-24 px-6 md:px-16 max-w-7xl mx-auto" ref={ref}>
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14">
        <div>
          <motion.span className="section-label block mb-4" initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}>
            Journal
          </motion.span>
          <motion.h2
            className="font-cormorant text-display-sm text-cream"
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            Stories &amp; <span className="italic text-gold">Insights</span>
          </motion.h2>
        </div>
        <Link
          to="/journal"
          className="section-label text-[10px] text-gold/80 hover:text-gold flex items-center gap-2 transition-colors self-start md:self-auto"
        >
          VIEW ALL ARTICLES <span>&rarr;</span>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
        {homePosts.map((post, i) => (
          <motion.article
            key={post.id}
            id={post.id}
            onClick={() => setSelectedPost(post)}
            className="bg-[#0b0b10] border border-white/10 hover:border-gold/40 rounded-xl group overflow-hidden cursor-pointer flex flex-col justify-between transition-all duration-500 hover:-translate-y-1 shadow-lg hover:shadow-gold/5"
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] }}
          >
            <div>
              <div className="h-56 overflow-hidden img-hover-zoom relative">
                <img src={post.image} alt={post.title} className="w-full h-full object-cover object-center img-inner" loading="lazy" />
                <div className="absolute top-3 left-3">
                  <span className="font-mono text-[9px] tracking-wider text-gold px-2.5 py-1 rounded bg-black/75 backdrop-blur border border-gold/30 uppercase">
                    {post.category}
                  </span>
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-center gap-2 mb-3 text-cream/40 text-[10px] font-inter">
                  <span>{post.date}</span>
                  <span>·</span>
                  <span>{post.readTime}</span>
                </div>
                <h3 className="font-cormorant text-2xl text-cream mb-2 group-hover:text-gold transition-colors duration-300 leading-snug [text-wrap:balance]">
                  {post.title}
                </h3>
                <p className="font-inter text-xs text-cream/45 leading-relaxed line-clamp-2">{post.excerpt}</p>
              </div>
            </div>
            <div className="px-6 pb-6 pt-2">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation()
                  setSelectedPost(post)
                }}
                className="section-label text-[9px] text-gold/80 group-hover:text-gold flex items-center gap-2 transition-colors cursor-pointer"
              >
                READ ARTICLE <span className="group-hover:translate-x-1 transition-transform">&rarr;</span>
              </button>
            </div>
          </motion.article>
        ))}
      </div>

      {/* Article Reader Modal */}
      <ArticleModal
        post={selectedPost}
        isOpen={Boolean(selectedPost)}
        onClose={() => setSelectedPost(null)}
      />
    </section>
  )
}

// Booking CTA banner
const BookingCTA = () => {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })

  return (
    <section
      id="booking-cta"
      ref={ref}
      className="relative py-40 overflow-hidden flex items-center justify-center"
    >
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=1600"
          alt=""
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-obsidian/85" />
      </div>

      <div className="relative z-10 text-center max-w-3xl mx-auto px-6">
        <motion.span
          className="section-label block mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
        >
          Ready to Begin?
        </motion.span>
        <motion.h2
          className="font-cormorant text-display-lg text-cream leading-tight mb-10"
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        >
          Is your date<br />
          <span className="italic text-gold">still available?</span>
        </motion.h2>
        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3 }}
        >
          <Link to="/availability" id="cta-check-date-btn" className="btn-gold py-4 px-10">
            <span>CHECK MY DATE</span>
          </Link>
          <Link to="/contact" id="cta-enquire-btn" className="btn-cream py-4 px-10">
            MAKE AN ENQUIRY
          </Link>
        </motion.div>
      </div>
    </section>
  )
}

export default function Home() {
  return (
    <>
      <Hero />
      <FeaturedStories />
      <AboutSection />
      <Services />
      <Portfolio limit={9} />
      <CinemaSection />
      <Process />
      <WhyChooseUs />
      <Packages />
      <Testimonials />
      <Journal />
      <InstagramSection />
      <BookingCTA />
      <ContactSection />
      <Footer />
    </>
  )
}
