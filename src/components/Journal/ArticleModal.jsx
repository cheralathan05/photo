import { useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import { X, Clock, Calendar, ArrowRight, ArrowLeft } from 'lucide-react'

export default function ArticleModal({ post, isOpen, onClose }) {
  const contentRef = useRef(null)

  useEffect(() => {
    if (!isOpen) return

    // Prevent body background scroll while modal is open
    const originalOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleKeyDown)

    return () => {
      document.body.style.overflow = originalOverflow
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen, onClose])

  // Reset scroll position to top when article changes
  useEffect(() => {
    if (contentRef.current) {
      contentRef.current.scrollTop = 0
    }
  }, [post?.id])

  if (!isOpen || !post) return null

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
          className="relative z-10 w-full max-w-3xl md:max-w-4xl max-h-[94vh] sm:max-h-[90vh] bg-[#09090d] border border-gold/30 rounded-2xl shadow-[0_25px_80px_rgba(0,0,0,0.95)] flex flex-col overflow-hidden"
          initial={{ opacity: 0, y: 30, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.97 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header Bar */}
          <div className="sticky top-0 z-20 flex items-center justify-between px-4 sm:px-8 py-3.5 sm:py-4 bg-[#09090d]/95 backdrop-blur-md border-b border-white/10">
            <div className="flex items-center gap-2 sm:gap-3">
              <span className="font-mono text-[9px] tracking-wider text-gold px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full bg-gold/10 border border-gold/30 uppercase">
                {post.category}
              </span>
              <span className="text-cream/20 text-xs">·</span>
              <span className="inline-flex items-center gap-1.5 font-mono text-[9px] text-cream/50 tracking-wider">
                <Clock size={11} className="text-gold/70" /> {post.readTime}
              </span>
            </div>

            <div className="flex items-center gap-2 sm:gap-3">
              <span className="hidden sm:inline font-mono text-[8px] tracking-widest text-cream/30 uppercase">
                ESC to close
              </span>
              <button
                id="close-article-modal"
                onClick={onClose}
                className="w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center bg-white/5 hover:bg-gold/20 text-cream/70 hover:text-gold border border-white/10 transition-colors cursor-pointer"
                aria-label="Close article"
              >
                <X size={18} />
              </button>
            </div>
          </div>

          {/* Scrollable Content Body with luxury gold scrollbar */}
          <div ref={contentRef} className="overflow-y-auto px-5 sm:px-10 py-6 sm:py-8 space-y-6 sm:space-y-8 modal-scrollbar pb-16 sm:pb-12">
            {/* Title & Metadata */}
            <div>
              <div className="flex items-center gap-2 text-cream/40 mb-3 text-xs font-inter">
                <span className="flex items-center gap-1 text-cream/50">
                  <Calendar size={12} className="text-gold/60" /> {post.date}
                </span>
                <span>·</span>
                <span className="text-gold/80">{post.author}</span>
              </div>

              <h2 className="font-cormorant text-3xl sm:text-4xl md:text-5xl font-light text-cream leading-[1.18] mb-3 [text-wrap:balance]">
                {post.title}
              </h2>

              {post.subtitle && (
                <p className="font-inter text-sm sm:text-base text-gold/70 font-normal leading-relaxed">
                  {post.subtitle}
                </p>
              )}
            </div>

            {/* Featured Image (Aspect-preserved, perfectly centered) */}
            <div className="w-full aspect-[16/10] sm:aspect-[16/9] md:aspect-[21/10] rounded-xl overflow-hidden border border-white/10 relative shadow-2xl bg-obsidian">
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-full object-cover object-center"
                loading="eager"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
            </div>

            {/* Lead excerpt */}
            <p className="font-cormorant text-xl sm:text-2xl text-cream/90 italic leading-relaxed border-l-2 border-gold pl-5 py-1 bg-gold/[0.02]">
              "{post.excerpt}"
            </p>

            {/* Main Article Paragraphs */}
            <div className="space-y-5 font-inter text-sm sm:text-base text-cream/75 font-light leading-relaxed">
              {post.paragraphs && post.paragraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>

            {/* Pull Quote */}
            {post.quote && (
              <div className="my-8 p-6 sm:p-8 rounded-xl bg-gold/[0.04] border border-gold/20 relative">
                <span className="font-cormorant text-6xl text-gold/20 absolute top-2 left-4 select-none leading-none">
                  “
                </span>
                <p className="font-cormorant text-xl sm:text-2xl text-cream/90 italic leading-relaxed relative z-10 pl-6">
                  {post.quote}
                </p>
              </div>
            )}

            {/* Key Takeaways */}
            {post.keyTakeaways && post.keyTakeaways.length > 0 && (
              <div className="my-8 p-6 sm:p-8 rounded-xl border border-white/10 bg-white/[0.02]">
                <h4 className="section-label text-gold text-[10px] tracking-[0.3em] mb-4">
                  STUDIO PERSPECTIVE &amp; TIPS
                </h4>
                <ul className="space-y-3">
                  {post.keyTakeaways.map((tip, idx) => (
                    <li key={idx} className="flex items-start gap-3 font-inter text-xs sm:text-sm text-cream/70 leading-normal">
                      <span className="text-gold font-bold mt-0.5">•</span>
                      <span>{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Bottom Call to Actions */}
            <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-center sm:text-left">
                <p className="font-cormorant text-lg text-cream">Plan your story with us</p>
                <p className="font-inter text-xs text-cream/40">Capturing timeless weddings across Bengaluru &amp; destinations worldwide</p>
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
                  <span>BOOK A SESSION</span>
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
