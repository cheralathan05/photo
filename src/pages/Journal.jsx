import { useState, useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Link } from "react-router-dom"
import Footer from "../components/Footer/Footer"
import { journalPosts } from "../data/journalData"
import ArticleModal from "../components/Journal/ArticleModal"

const HERO_IMG = "https://images.unsplash.com/photo-1452587925148-ce544e77e70d?q=80&w=1800&auto=format&fit=crop"

function PostCard({ post, index, onSelect }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: "-80px" })

  return (
    <motion.article
      ref={ref}
      id={post.id}
      onClick={() => onSelect(post)}
      className="group bg-obsidian overflow-hidden border border-white/5 hover:border-gold/20 transition-colors duration-500 cursor-pointer flex flex-col justify-between"
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
    >
      <div>
        <div className="h-56 overflow-hidden img-hover-zoom">
          <img src={post.image} alt={post.title} className="w-full h-full object-cover img-inner" loading="lazy" />
        </div>
        <div className="p-7">
          <div className="flex items-center gap-3 mb-4">
            <span className="section-label text-[9px] text-gold/70">{post.category}</span>
            <span className="text-cream/15">·</span>
            <span className="section-label text-[9px] text-cream/35">{post.date}</span>
            <span className="text-cream/15">·</span>
            <span className="section-label text-[9px] text-cream/30">{post.readTime}</span>
          </div>
          <h3 className="font-cormorant text-2xl text-cream mb-3 group-hover:text-gold transition-colors duration-300 leading-tight">
            {post.title}
          </h3>
          <p className="font-inter text-xs text-cream/40 leading-relaxed mb-5 line-clamp-3">
            {post.excerpt}
          </p>
        </div>
      </div>
      <div className="px-7 pb-7">
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation()
            onSelect(post)
          }}
          className="section-label text-[9px] text-gold/70 group-hover:text-gold flex items-center gap-2 transition-colors duration-300 cursor-pointer"
        >
          READ ARTICLE
          <motion.span animate={{ x: [0, 4, 0] }} transition={{ duration: 1.8, repeat: Infinity }}>
            →
          </motion.span>
        </button>
      </div>
    </motion.article>
  )
}

export default function Journal() {
  const [selectedPost, setSelectedPost] = useState(null)

  return (
    <>
      <section className="relative h-[60vh] flex items-end overflow-hidden">
        <div className="absolute inset-0">
          <img src={HERO_IMG} alt="Journal" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-obsidian/50 via-obsidian/30 to-obsidian" />
        </div>
        <div className="relative z-10 px-6 md:px-16 pb-20 max-w-7xl mx-auto w-full">
          <motion.span className="section-label block mb-4" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.3 }}>
            Our Journal
          </motion.span>
          <motion.h1 className="font-cormorant text-display-lg text-cream leading-tight" initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}>
            Stories, tips &amp;<br /><span className="italic text-gold">perspectives.</span>
          </motion.h1>
        </div>
      </section>

      <section className="py-16 px-6 md:px-16 max-w-7xl mx-auto border-b border-white/5">
        <div className="flex flex-col md:flex-row md:items-end gap-8">
          <p className="font-cormorant text-2xl text-cream/60 font-light leading-relaxed max-w-2xl">
            Thoughts on light, storytelling, the craft of photography, and
            the quiet art of being present in someone else&apos;s most important moments.
          </p>
          <div className="md:ml-auto flex-shrink-0">
            <span className="section-label text-[9px] text-cream/30">{journalPosts.length} Articles</span>
          </div>
        </div>
      </section>

      <section className="py-24 px-6 md:px-16 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-white/5">
          {journalPosts.map((post, i) => (
            <PostCard
              key={post.id}
              post={post}
              index={i}
              onSelect={setSelectedPost}
            />
          ))}
        </div>
      </section>

      <section className="py-24 px-6 md:px-16 max-w-7xl mx-auto text-center border-t border-white/5">
        <motion.span className="section-label block mb-6" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
          Ready to Begin?
        </motion.span>
        <motion.h2 className="font-cormorant text-display-md text-cream mb-10" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}>
          Let&apos;s tell your<br /><span className="italic text-gold">story together.</span>
        </motion.h2>
        <Link to="/contact" id="journal-contact-btn" className="btn-gold"><span>GET IN TOUCH</span></Link>
      </section>

      {/* Reader Modal */}
      <ArticleModal
        post={selectedPost}
        isOpen={Boolean(selectedPost)}
        onClose={() => setSelectedPost(null)}
      />

      <Footer />
    </>
  )
}
