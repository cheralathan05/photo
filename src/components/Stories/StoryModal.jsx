import { useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import { X, Calendar, MapPin, ArrowRight, ChevronLeft, ChevronRight, Sparkles } from 'lucide-react'

export default function StoryModal({ story, isOpen, onClose, onPrev, onNext }) {
  const contentRef = useRef(null)

  useEffect(() => {
    if (!isOpen) return

    const originalOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowLeft' && onPrev) onPrev()
      if (e.key === 'ArrowRight' && onNext) onNext()
    }
    window.addEventListener('keydown', handleKeyDown)

    return () => {
      document.body.style.overflow = originalOverflow
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen, onClose, onPrev, onNext])

  // Reset scroll position to top when story changes
  useEffect(() => {
    if (contentRef.current) {
      contentRef.current.scrollTop = 0
    }
  }, [story?.id])

  if (!isOpen || !story) return null

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[10000] flex items-center justify-center p-2.5 sm:p-4 md:p-6 lg:p-8">
        {/* Backdrop blur overlay */}
        <motion.div
          className="absolute inset-0 bg-black/92 backdrop-blur-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        />

        {/* Modal Container */}
        <motion.div
          className="relative z-10 w-full max-w-4xl max-h-[94vh] sm:max-h-[90vh] bg-[#09090d] border border-gold/30 rounded-2xl shadow-[0_25px_80px_rgba(0,0,0,0.95)] flex flex-col overflow-hidden"
          initial={{ opacity: 0, y: 30, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.97 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header Bar */}
          <div className="sticky top-0 z-20 flex items-center justify-between px-4 sm:px-8 py-3.5 sm:py-4 bg-[#09090d]/95 backdrop-blur-md border-b border-white/10">
            <div className="flex items-center gap-2 sm:gap-3 min-w-0">
              <span className="font-mono text-[9px] tracking-wider text-gold px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full bg-gold/10 border border-gold/30 uppercase flex-shrink-0">
                {story.category}
              </span>
              <span className="hidden sm:inline text-cream/20 text-xs">·</span>
              <span className="hidden sm:inline-flex items-center gap-1.5 font-mono text-[9px] text-cream/50 tracking-wider truncate">
                <MapPin size={11} className="text-gold/70 flex-shrink-0" /> {story.location}
              </span>
            </div>

            <div className="flex items-center gap-1.5 sm:gap-2 flex-shrink-0">
              {/* Prev / Next Story switchers */}
              {onPrev && (
                <button
                  onClick={onPrev}
                  className="w-8 h-8 rounded-full flex items-center justify-center bg-white/5 hover:bg-gold/20 text-cream/70 hover:text-gold border border-white/10 transition-colors cursor-pointer"
                  aria-label="Previous Story"
                  title="Previous Story"
                >
                  <ChevronLeft size={16} />
                </button>
              )}
              {onNext && (
                <button
                  onClick={onNext}
                  className="w-8 h-8 rounded-full flex items-center justify-center bg-white/5 hover:bg-gold/20 text-cream/70 hover:text-gold border border-white/10 transition-colors cursor-pointer"
                  aria-label="Next Story"
                  title="Next Story"
                >
                  <ChevronRight size={16} />
                </button>
              )}
              <button
                id="close-story-modal"
                onClick={onClose}
                className="w-8 h-8 rounded-full flex items-center justify-center bg-white/5 hover:bg-gold/20 text-cream/70 hover:text-gold border border-white/10 transition-colors cursor-pointer ml-1"
                aria-label="Close story"
              >
                <X size={18} />
              </button>
            </div>
          </div>

          {/* Scrollable Content Body with luxury gold scrollbar */}
          <div ref={contentRef} className="overflow-y-auto px-5 sm:px-10 py-6 sm:py-8 space-y-6 sm:space-y-8 modal-scrollbar pb-16 sm:pb-12">
            {/* Title & Metadata */}
            <div>
              <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1.5 text-cream/40 mb-3 text-xs font-inter">
                <span className="inline-flex items-center gap-1.5 text-cream/60">
                  <Calendar size={12} className="text-gold" /> {story.date}
                </span>
                <span className="text-cream/20">·</span>
                <span className="inline-flex items-center gap-1 text-gold/90">
                  <MapPin size={11} className="text-gold" /> {story.location}
                </span>
                {story.stats && (
                  <>
                    <span className="text-cream/20 hidden sm:inline">·</span>
                    <span className="w-full sm:w-auto text-[11px] sm:text-xs text-cream/40 mt-0.5 sm:mt-0 font-mono">
                      {story.stats}
                    </span>
                  </>
                )}
              </div>

              <h2 className="font-cormorant text-3xl sm:text-4xl md:text-5xl font-light text-cream leading-[1.1] mb-2 [text-wrap:balance]">
                {story.couple}
              </h2>

              <p className="font-inter text-sm sm:text-base text-gold/70 font-normal leading-relaxed">
                {story.subtitle}
              </p>
            </div>

            {/* Featured Hero Photo */}
            <div className="w-full aspect-[16/10] sm:aspect-[16/9] md:aspect-[21/10] rounded-xl overflow-hidden border border-white/10 relative shadow-2xl bg-black">
              <img
                src={story.image}
                alt={story.couple}
                className="w-full h-full object-cover object-center"
                loading="eager"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
            </div>

            {/* Story Paragraphs */}
            <div className="space-y-5 font-inter text-sm sm:text-base text-cream/75 font-light leading-relaxed">
              {story.paragraphs && story.paragraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>

            {/* Client Quote Callout */}
            {story.quote && (
              <div className="my-8 p-6 sm:p-8 rounded-xl bg-gold/[0.04] border border-gold/25 relative">
                <span className="font-cormorant text-6xl text-gold/20 absolute top-2 left-4 select-none leading-none">
                  “
                </span>
                <p className="font-cormorant text-xl sm:text-2xl text-cream/90 italic leading-relaxed relative z-10 pl-6 mb-3">
                  {story.quote}
                </p>
                <p className="font-mono text-[9px] tracking-wider text-gold/70 pl-6 uppercase">
                  — Words from {story.couple}
                </p>
              </div>
            )}

            {/* Curated Photo Gallery Grid */}
            {story.gallery && story.gallery.length > 0 && (
              <div className="my-10">
                <div className="flex items-center gap-2 mb-4">
                  <Sparkles size={14} className="text-gold" />
                  <h4 className="section-label text-gold text-[10px] tracking-[0.3em] uppercase">
                    Captured Moments from the Celebration
                  </h4>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {story.gallery.map((imgUrl, idx) => (
                    <div
                      key={idx}
                      className="aspect-[4/3] rounded-xl overflow-hidden border border-white/10 bg-black group relative shadow-lg"
                    >
                      <img
                        src={imgUrl}
                        alt={`${story.couple} moment ${idx + 1}`}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Bottom Call to Action */}
            <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-center sm:text-left">
                <p className="font-cormorant text-lg text-cream">Inspired by this story?</p>
                <p className="font-inter text-xs text-cream/40">Commission Pop Photography for your upcoming celebration</p>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={onClose}
                  className="px-5 py-2.5 rounded border border-white/20 text-cream/70 hover:text-cream text-[10px] tracking-widest uppercase transition-colors cursor-pointer"
                >
                  Close
                </button>
                <Link
                  to="/availability"
                  onClick={onClose}
                  className="btn-gold text-[10px] py-2.5 px-6 flex items-center gap-2"
                >
                  <span>BOOK YOUR STORY</span>
                  <ArrowRight size={13} />
                </Link>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  )
}
