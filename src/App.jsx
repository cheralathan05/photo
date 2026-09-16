import { useState, useEffect, useRef } from 'react'
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import Lenis from 'lenis'
import IntroScreen from './components/Intro/IntroScreen'
import Navbar from './components/Navbar/Navbar'

import WhatsAppFloat from './components/ui/WhatsAppFloat'
import NoiseOverlay from './components/ui/NoiseOverlay'
import Home from './pages/Home'
import About from './pages/About'
import Portfolio from './pages/Portfolio'
import Wedding from './pages/Wedding'
import Packages from './pages/Packages'
import Contact from './pages/Contact'
import ClientGallery from './pages/ClientGallery'
import Availability from './pages/Availability'
import Journal from './pages/Journal'

// ─── Page Transition Wrapper ──────────────────────────────
const PageTransition = ({ children }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  )
}

// ─── Animated Routes ───────────────────────────────────────
const AnimatedRoutes = () => {
  const location = useLocation()

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
  }, [location.pathname])

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PageTransition><Home /></PageTransition>} />
        <Route path="/about" element={<PageTransition><About /></PageTransition>} />
        <Route path="/portfolio" element={<PageTransition><Portfolio /></PageTransition>} />
        <Route path="/wedding" element={<PageTransition><Wedding /></PageTransition>} />
        <Route path="/packages" element={<PageTransition><Packages /></PageTransition>} />
        <Route path="/contact" element={<PageTransition><Contact /></PageTransition>} />
        <Route path="/gallery" element={<PageTransition><ClientGallery /></PageTransition>} />
        <Route path="/availability" element={<PageTransition><Availability /></PageTransition>} />
        <Route path="/journal" element={<PageTransition><Journal /></PageTransition>} />
      </Routes>
    </AnimatePresence>
  )
}

// ─── Main App ──────────────────────────────────────────────
export default function App() {
  const [introComplete, setIntroComplete] = useState(false)
  const [lenisReady, setLenisReady] = useState(false)
  const lenisRef = useRef(null)

  // Smooth scroll setup
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.4,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    })
    lenisRef.current = lenis

    function raf(time) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }
    requestAnimationFrame(raf)
    setLenisReady(true)

    return () => lenis.destroy()
  }, [])

  return (
    <Router>
      <div className="relative bg-obsidian min-h-screen">
        {/* Noise texture overlay */}
        <NoiseOverlay />


        {/* Intro screen */}
        <AnimatePresence>
          {!introComplete && (
            <IntroScreen onComplete={() => setIntroComplete(true)} />
          )}
        </AnimatePresence>

        {/* Main content */}
        {introComplete && (
          <>
            <Navbar />
            <main>
              <AnimatedRoutes />
            </main>
            <WhatsAppFloat />
          </>
        )}
      </div>
    </Router>
  )
}
