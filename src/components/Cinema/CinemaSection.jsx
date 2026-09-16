import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import { Link } from 'react-router-dom'
import { 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  Maximize2, 
  Film, 
  Sparkles, 
  Clock, 
  ArrowRight, 
  X, 
  Video,
  Award
} from 'lucide-react'

const films = [
  {
    id: 'film-1',
    title: 'The Udaipur Monsoon',
    couple: 'Ananya & Kabir',
    location: 'The Oberoi Udaivilas · Udaipur',
    duration: '4:15 MIN',
    genre: 'ROYAL PALACE CINEMA',
    resolution: '4K UHD · 60FPS',
    aspect: '2.39:1 Anamorphic',
    videoUrl: '/videos/film-1.mp4',
    posterUrl: 'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1400&auto=format&fit=crop',
    synopsis: 'Three days of royal celebration enveloped in velvet, gentle rain, and rooftop fireworks over Lake Pichola. An heirloom testament to timeless love.',
    camera: 'Sony FX6 Cinema Line · 50mm Anamorphic Prime',
  },
  {
    id: 'film-2',
    title: 'Vows on the Cliff',
    couple: 'Meera & Dev',
    location: 'Om Beach Cliffs · Gokarna',
    duration: '3:45 MIN',
    genre: 'COASTAL SUNSET',
    resolution: '4K UHD · 60FPS',
    aspect: '2.39:1 Anamorphic',
    videoUrl: '/videos/film-2.mp4',
    posterUrl: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=1400&auto=format&fit=crop',
    synopsis: 'Waves crashing below, whisper of sea breeze during handwritten vows, and warm amber golden hour wrapping around raw emotion.',
    camera: 'Sony FX3 Cinema Line · 35mm Prime',
  },
  {
    id: 'film-3',
    title: 'Under Chennai Lanterns',
    couple: 'Pooja & Siddharth',
    location: 'Mylapore Heritage Courtyard · Chennai',
    duration: '5:10 MIN',
    genre: 'TRADITIONAL HERITAGE',
    resolution: '4K UHD · 60FPS',
    aspect: '2.39:1 Anamorphic',
    videoUrl: '/videos/film-3.mp4',
    posterUrl: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?q=80&w=1400&auto=format&fit=crop',
    synopsis: 'Nadaswaram resonances, fragrant jasmine garlands, and gold silk sarees gleaming under a thousand terracotta oil lamps.',
    camera: 'Sony FX6 & FX3 Dual Rig · Cooke Cine Primes',
  },
  {
    id: 'film-4',
    title: 'Golden Hour in the Hills',
    couple: 'Rhea & Arjun',
    location: 'Coonoor Tea Estates · Nilgiris',
    duration: '3:30 MIN',
    genre: 'INTIMATE DESTINATION',
    resolution: '4K UHD · 60FPS',
    aspect: '2.39:1 Anamorphic',
    videoUrl: '/videos/film-4.mp4',
    posterUrl: 'https://images.unsplash.com/photo-1469371670807-013ccf25f16a?q=80&w=1400&auto=format&fit=crop',
    synopsis: 'Whispering pine groves, misty hills at dawn, and an intimate candlelit celebration surrounded by acoustic guitar melodies.',
    camera: 'Sony FX3 Cinema Line · G-Master 24-70mm',
  },
]

const productionSpecs = [
  {
    icon: <Video size={20} className="text-gold" />,
    title: 'Cinema-Grade Optics',
    desc: 'Captured on Sony FX6 & FX3 cinema cameras with anamorphic prime lenses for iconic bokeh.',
  },
  {
    icon: <Sparkles size={20} className="text-gold" />,
    title: 'Dolby Master Sound',
    desc: 'Wireless micro-lapels for pristine vow audio blended seamlessly with bespoke orchestral scoring.',
  },
  {
    icon: <Award size={20} className="text-gold" />,
    title: 'Fine Art Grading',
    desc: 'Hand-crafted color grading tailored to authentic skin tones and lush cultural textiles.',
  },
  {
    icon: <Film size={20} className="text-gold" />,
    title: 'Drone Cinematography',
    desc: 'Certified 4K aerial drone passes capturing sweeping venue topography and grand processions.',
  },
]

export default function CinemaSection() {
  const sectionRef = useRef(null)
  const videoRef = useRef(null)
  const inView = useInView(sectionRef, { once: true, margin: '-80px' })

  const [activeFilmIndex, setActiveFilmIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(true)
  const [progress, setProgress] = useState(0)
  const [theaterOpen, setTheaterOpen] = useState(false)

  const activeFilm = films[activeFilmIndex]

  // Play / pause handler
  const togglePlay = () => {
    if (!videoRef.current) return
    if (isPlaying) {
      videoRef.current.pause()
      setIsPlaying(false)
    } else {
      videoRef.current.play()
        .then(() => setIsPlaying(true))
        .catch((err) => {
          console.warn('Playback error:', err)
          setIsPlaying(false)
        })
    }
  }

  // Toggle audio
  const toggleMute = () => {
    if (!videoRef.current) return
    videoRef.current.muted = !isMuted
    setIsMuted(!isMuted)
  }

  // Time update for scrubber
  const handleTimeUpdate = () => {
    if (!videoRef.current) return
    const current = videoRef.current.currentTime
    const total = videoRef.current.duration || 1
    setProgress((current / total) * 100)
  }

  // Scrubber click seek
  const handleSeek = (e) => {
    if (!videoRef.current) return
    const rect = e.currentTarget.getBoundingClientRect()
    const clickX = e.clientX - rect.left
    const percent = Math.min(Math.max(clickX / rect.width, 0), 1)
    videoRef.current.currentTime = percent * (videoRef.current.duration || 1)
    setProgress(percent * 100)
  }

  // When switching films
  const selectFilm = (index) => {
    setActiveFilmIndex(index)
    setProgress(0)
    setIsPlaying(true)
  }

  // Sync playback on film switch
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.currentTime = 0
      if (isPlaying) {
        videoRef.current.play().then(() => setIsPlaying(true)).catch(() => {})
      }
    }
  }, [activeFilmIndex])

  // ESC key listener & body scroll lock for Theater mode
  useEffect(() => {
    if (!theaterOpen) return

    const originalOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setTheaterOpen(false)
    }
    window.addEventListener('keydown', handleKeyDown)

    return () => {
      document.body.style.overflow = originalOverflow
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [theaterOpen])

  return (
    <section 
      id="cinema" 
      ref={sectionRef} 
      className="py-28 px-4 sm:px-6 md:px-16 bg-gradient-to-b from-obsidian via-[#0c0c10] to-obsidian border-t border-b border-white/5 relative overflow-hidden"
    >
      {/* Ambient background glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-gold/5 blur-[160px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <div>
            <motion.div
              className="flex items-center gap-2 mb-3"
              initial={{ opacity: 0, y: 15 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
            >
              <span className="w-2 h-2 rounded-full bg-gold animate-pulse" />
              <span className="section-label text-[10px] tracking-[0.35em] text-gold/90 uppercase">
                Stories In Motion · Cinema Vault
              </span>
            </motion.div>

            <motion.h2
              className="font-cormorant text-display-md text-cream leading-[1.05]"
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
              Master wedding films,<br />
              <span className="italic text-gold">felt through every whisper.</span>
            </motion.h2>
          </div>

          <motion.p
            className="font-inter text-xs md:text-sm text-cream/50 max-w-md leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            We don’t create montage clips. We craft cinematic motion pictures with acoustic vow recordings, bespoke scores, and intimate documentary direction.
          </motion.p>
        </div>

        {/* ─── Hero Widescreen Cinema Player ─────────────────── */}
        <motion.div
          className="relative rounded-2xl overflow-hidden border border-gold/30 bg-black shadow-[0_0_80px_rgba(201,168,76,0.12)] group"
          initial={{ opacity: 0, scale: 0.98, y: 30 }}
          animate={inView ? { opacity: 1, scale: 1, y: 0 } : {}}
          transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Top Cinema HUD Bar */}
          <div className="absolute top-0 left-0 right-0 z-20 px-6 py-4 bg-gradient-to-b from-black/80 via-black/40 to-transparent flex items-center justify-between pointer-events-none">
            <div className="flex items-center gap-3">
              <span className="font-mono text-[9px] tracking-widest text-gold px-2.5 py-1 rounded bg-gold/15 border border-gold/30 uppercase">
                {activeFilm.resolution}
              </span>
              <span className="hidden sm:inline font-mono text-[9px] tracking-widest text-cream/40 uppercase">
                {activeFilm.aspect}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <span className="font-mono text-[9px] text-cream/50 tracking-wider">
                {activeFilm.duration}
              </span>
            </div>
          </div>

          {/* Video Container (21:9 Widescreen aspect ratio) */}
          <div className="relative aspect-[16/9] md:aspect-[21/9] w-full overflow-hidden bg-black">
            <video
              ref={videoRef}
              key={activeFilm.id}
              src={activeFilm.videoUrl}
              poster={activeFilm.posterUrl}
              loop
              muted={isMuted}
              playsInline
              preload="auto"
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
              onTimeUpdate={handleTimeUpdate}
              onClick={togglePlay}
              className="w-full h-full object-cover cursor-pointer transition-transform duration-700 group-hover:scale-[1.01]"
            />

            {/* Subtle Vignette Overlay */}
            <div 
              onClick={togglePlay}
              className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-black/30 pointer-events-none" 
            />

            {/* Center Big Play Button (Visible when paused) */}
            <AnimatePresence>
              {!isPlaying && (
                <motion.button
                  onClick={togglePlay}
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.8, opacity: 0 }}
                  className="absolute inset-0 m-auto w-20 h-20 md:w-24 md:h-24 rounded-full glass border border-gold/40 flex items-center justify-center text-gold shadow-2xl hover:scale-110 hover:border-gold transition-all duration-300 z-20 cursor-pointer"
                  aria-label="Play film trailer"
                >
                  <Play size={32} className="ml-1 fill-gold/20 text-gold" />
                  <span className="absolute -bottom-8 section-label text-[8px] tracking-[0.3em] text-cream/70 whitespace-nowrap">
                    PLAY TRAILER
                  </span>
                </motion.button>
              )}
            </AnimatePresence>

            {/* Bottom HUD & Metadata */}
            <div className="absolute bottom-0 left-0 right-0 z-20 p-6 md:p-8 bg-gradient-to-t from-black via-black/80 to-transparent">
              {/* Scrubber Progress Bar */}
              <div 
                className="w-full h-1 bg-white/15 hover:h-2 rounded-full cursor-pointer mb-5 transition-all relative"
                onClick={handleSeek}
              >
                <div 
                  className="h-full bg-gradient-to-r from-gold via-gold-light to-cream rounded-full relative"
                  style={{ width: `${progress}%` }}
                >
                  <span className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-cream border border-gold shadow" />
                </div>
              </div>

              <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                {/* Film Details */}
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <span className="section-label text-[9px] text-gold/80">
                      {activeFilm.genre}
                    </span>
                    <span className="text-cream/20">·</span>
                    <span className="font-inter text-xs text-cream/50">
                      {activeFilm.location}
                    </span>
                  </div>

                  <h3 className="font-cormorant text-2xl md:text-4xl text-cream font-light leading-tight">
                    {activeFilm.couple}
                  </h3>
                  <p className="font-inter text-xs text-cream/60 max-w-xl mt-1 line-clamp-1 md:line-clamp-2">
                    {activeFilm.synopsis}
                  </p>
                </div>

                {/* Player Controls Bar */}
                <div className="flex items-center gap-4 self-end md:self-auto">
                  {/* Play / Pause Toggle */}
                  <button
                    onClick={togglePlay}
                    className="p-2.5 rounded-full bg-white/5 hover:bg-gold/20 text-cream/80 hover:text-gold transition-colors"
                    aria-label={isPlaying ? 'Pause' : 'Play'}
                  >
                    {isPlaying ? <Pause size={18} /> : <Play size={18} className="ml-0.5" />}
                  </button>

                  {/* Audio Mute / Unmute + Wave visualizer */}
                  <button
                    onClick={toggleMute}
                    className="flex items-center gap-2 px-3 py-2 rounded-full bg-white/5 hover:bg-gold/20 text-cream/80 hover:text-gold transition-colors"
                    aria-label={isMuted ? 'Unmute' : 'Mute'}
                  >
                    {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
                    {/* Visualizer bars */}
                    <div className="flex items-end gap-0.5 h-3">
                      <span className={`w-0.5 bg-gold rounded-full transition-all ${!isMuted && isPlaying ? 'h-3 animate-pulse' : 'h-1'}`} />
                      <span className={`w-0.5 bg-gold rounded-full transition-all ${!isMuted && isPlaying ? 'h-2 animate-pulse delay-75' : 'h-1'}`} />
                      <span className={`w-0.5 bg-gold rounded-full transition-all ${!isMuted && isPlaying ? 'h-3.5 animate-pulse delay-150' : 'h-1'}`} />
                    </div>
                  </button>

                  {/* Fullscreen / Theater Mode Button */}
                  <button
                    onClick={() => setTheaterOpen(true)}
                    className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-gold/15 hover:bg-gold/30 border border-gold/30 text-gold text-[10px] tracking-wider uppercase font-mono transition-colors"
                  >
                    <Maximize2 size={13} />
                    <span>Theater</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* ─── Film Vault Selector Reel ───────────────────────── */}
        <div className="mt-8">
          <div className="flex items-center justify-between mb-4">
            <span className="section-label text-[9px] tracking-[0.3em] text-cream/40 uppercase">
              Select Film from the Vault
            </span>
            <span className="font-mono text-[9px] text-gold/70">
              0{activeFilmIndex + 1} / 0{films.length}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {films.map((film, idx) => {
              const isActive = activeFilmIndex === idx
              return (
                <button
                  key={film.id}
                  onClick={() => selectFilm(idx)}
                  className={`group text-left p-3.5 rounded-xl border transition-all duration-300 relative overflow-hidden cursor-pointer ${
                    isActive
                      ? 'bg-gold/10 border-gold shadow-lg shadow-gold/10'
                      : 'bg-white/[0.02] border-white/10 hover:border-gold/40 hover:bg-white/[0.04]'
                  }`}
                >
                  <div className="relative aspect-[16/9] rounded-lg overflow-hidden mb-3 bg-obsidian">
                    <img
                      src={film.posterUrl}
                      alt={film.couple}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                    
                    {/* Badge */}
                    <div className="absolute top-2 left-2">
                      <span className="font-mono text-[8px] tracking-wider px-2 py-0.5 rounded bg-black/70 text-cream/90 border border-white/10">
                        {film.duration}
                      </span>
                    </div>

                    {isActive && (
                      <div className="absolute top-2 right-2 flex items-center gap-1 px-2 py-0.5 rounded-full bg-gold text-obsidian font-mono text-[8px] font-bold">
                        <span className="w-1.5 h-1.5 rounded-full bg-obsidian animate-ping" />
                        PLAYING
                      </div>
                    )}
                  </div>

                  <p className="section-label text-[8px] text-gold/80 mb-1">
                    {film.genre}
                  </p>
                  <h4 className="font-cormorant text-lg text-cream leading-snug group-hover:text-gold transition-colors">
                    {film.couple}
                  </h4>
                  <p className="font-inter text-[11px] text-cream/40 line-clamp-1 mt-0.5">
                    {film.location}
                  </p>
                </button>
              )
            })}
          </div>
        </div>

        {/* ─── Production Specs Badges ────────────────────────── */}
        <div className="mt-16 pt-12 border-t border-white/10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {productionSpecs.map((spec, i) => (
            <motion.div
              key={spec.title}
              className="p-5 rounded-xl border border-white/5 bg-white/[0.01] hover:border-gold/20 transition-colors"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 + i * 0.1 }}
            >
              <div className="w-10 h-10 rounded-lg bg-gold/10 border border-gold/20 flex items-center justify-center mb-4">
                {spec.icon}
              </div>
              <h4 className="font-cormorant text-xl text-cream mb-1">
                {spec.title}
              </h4>
              <p className="font-inter text-xs text-cream/45 leading-relaxed">
                {spec.desc}
              </p>
            </motion.div>
          ))}
        </div>

        {/* CTA Banner */}
        <div className="mt-12 p-8 rounded-2xl bg-gradient-to-r from-gold/10 via-gold/5 to-transparent border border-gold/20 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="font-cormorant text-2xl md:text-3xl text-cream font-light mb-1">
              Want your wedding recorded like a motion picture?
            </h3>
            <p className="font-inter text-xs text-cream/50">
              Limited to 20 cinematic wedding commissions per season to ensure dedicated master grading.
            </p>
          </div>

          <Link
            to="/availability"
            className="btn-gold text-[10px] py-3.5 px-8 flex items-center gap-2 flex-shrink-0"
          >
            <span>COMMISSION YOUR FILM</span>
            <ArrowRight size={14} />
          </Link>
        </div>
      </div>

      {/* ─── Full-Screen Theater Modal ──────────────────────── */}
      <AnimatePresence>
        {theaterOpen && (
          <div className="fixed inset-0 z-[10000] flex items-center justify-center bg-black/95 backdrop-blur-xl p-2 sm:p-6">
            <motion.div
              className="relative w-full max-w-6xl aspect-[16/9] md:aspect-[21/9] bg-black border border-gold/30 rounded-2xl overflow-hidden shadow-2xl flex flex-col"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* Close Button */}
              <button
                onClick={() => setTheaterOpen(false)}
                className="absolute top-5 right-5 z-30 w-10 h-10 rounded-full bg-black/60 hover:bg-gold/20 text-cream/80 hover:text-gold border border-white/10 flex items-center justify-center transition-colors cursor-pointer"
                aria-label="Close Theater"
              >
                <X size={20} />
              </button>

              <video
                key={`theater-${activeFilm.id}`}
                src={activeFilm.videoUrl}
                poster={activeFilm.posterUrl}
                autoPlay
                controls
                playsInline
                className="w-full h-full object-contain bg-black"
              />

              {/* Theater Bottom Info Bar */}
              <div className="absolute bottom-0 left-0 right-0 p-5 bg-gradient-to-t from-black via-black/80 to-transparent flex items-center justify-between">
                <div>
                  <p className="section-label text-[8px] text-gold">{activeFilm.genre}</p>
                  <h4 className="font-cormorant text-xl text-cream">{activeFilm.couple} — {activeFilm.title}</h4>
                </div>

                <Link
                  to="/availability"
                  onClick={() => setTheaterOpen(false)}
                  className="btn-gold text-[9px] py-2 px-6"
                >
                  <span>BOOK THIS TEAM</span>
                </Link>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  )
}
