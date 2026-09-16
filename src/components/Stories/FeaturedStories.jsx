import { useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Link } from 'react-router-dom'
import StoryModal from './StoryModal'

const stories = [
  {
    id: 'story-1',
    couple: 'ARUN × PRIYA',
    subtitle: 'A Royal Chennai Seaside Celebration',
    date: '24 Aug 2026',
    location: 'The Leela Palace · Chennai',
    image: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?q=80&w=1200&auto=format&fit=crop',
    category: 'WEDDING',
    stats: '3 Days · 1,400 Handcrafted Photos · 4K Cinema Film',
    paragraphs: [
      'An exquisite three-day South Indian wedding set against the marble colonnades and seaside breezes of The Leela Palace, Chennai.',
      'The celebrations commenced with an intimate, fragrance-filled Nalangu where family members smeared turmeric and rosewater amidst laughter. Priya wore a traditional crimson Kanjivaram silk saree adorned with antique temple gold, while Arun was welcomed under floral umbrellas accompanied by traditional Nadaswaram musicians.',
      'The highlight of the evening was the sunset pheras overlooking the Bay of Bengal. As the golden hour light touched the mandap, the emotions in the room were palpable — quiet tears, heartfelt blessings, and triumphant cheers as the mangalsutra was tied.'
    ],
    quote: "They didn't just capture our wedding — they captured how it felt. Every time we open our album, we are back on that seaside lawn.",
    gallery: [
      'https://images.unsplash.com/photo-1606800052052-a08af7148866?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=800&auto=format&fit=crop',
    ]
  },
  {
    id: 'story-2',
    couple: 'KARTHIK × MEENA',
    subtitle: 'A Sunrise Pre-Wedding Session by the Ocean',
    date: '15 Jul 2026',
    location: 'French Quarter & Serenity Beach · Pondicherry',
    image: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?q=80&w=1200&auto=format&fit=crop',
    category: 'PRE-WEDDING',
    stats: 'Sunrise & Sunset Sessions · 450 Edited Frames · 2 Moodfilms',
    paragraphs: [
      'A sunrise session exploring the pastel mustard corridors of White Town, followed by a breezy golden hour along the rocky coastline of Serenity Beach.',
      'Karthik and Meena wanted photographs that felt completely unposed — like a romantic weekend getaway where nobody was watching. We began at 5:30 AM when the cobblestone streets were empty, watching the warm sunrise filter through bougainvillea arches.',
      'By late afternoon, the couple changed into flowing linen and ran barefoot along the shore. The connection between them was so natural that our job was simply to step back and let their laughter fill the frame.'
    ],
    quote: "The team made us forget there was even a camera pointing at us. It felt like our best vacation ever.",
    gallery: [
      'https://images.unsplash.com/photo-1537633552985-df8429e8048b?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1469371670807-013ccf25f16a?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?q=80&w=800&auto=format&fit=crop',
    ]
  },
  {
    id: 'story-3',
    couple: 'RAVI × SWETHA',
    subtitle: 'A Palace Destination Wedding in Rajasthan',
    date: '03 Jan 2026',
    location: 'Lake Pichola & Jagmandir Island · Udaipur',
    image: 'https://images.unsplash.com/photo-1591604466107-ec97de577aff?q=80&w=1200&auto=format&fit=crop',
    category: 'DESTINATION',
    stats: '4 Days Destination · 2,200 Color-Graded Photos · 4K Drone Reel',
    paragraphs: [
      'A magnificent royal destination wedding spanning the heritage palaces and boat-lined waters of Lake Pichola.',
      'Guests arrived by ceremonial decorated wooden boats as twilight descended over the Aravalli hills. The Sangeet night was a vibrant explosion of folk music, velvet lehengas, and rooftop performances under a canopy of warm fairy lights.',
      'The main ceremony on Jagmandir Island Palace felt like stepping into an ancient painting. Lit entirely by hundreds of brass lanterns and flickering candles, Ravi and Swetha exchanged vows as midnight fireworks illuminated the palace dome.'
    ],
    quote: "The cinematic storytelling was mindblowing. Our friends from London and New York are still raving about the photos.",
    gallery: [
      'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1606800052052-a08af7148866?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1537633552985-df8429e8048b?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=800&auto=format&fit=crop',
    ]
  },
]

const StoryCard = ({ story, index, onSelect }) => {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <motion.div
      ref={ref}
      id={story.id}
      onClick={() => onSelect(story, index)}
      className="relative min-w-[85vw] md:min-w-[55vw] lg:min-w-[45vw] h-[70vh] md:h-[80vh] img-hover-zoom group cursor-pointer"
      initial={{ opacity: 0, x: 60 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.9, delay: index * 0.15, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Image */}
      <div className="absolute inset-0 overflow-hidden">
        <img
          src={story.image}
          alt={story.couple}
          className="w-full h-full object-cover img-inner"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/20 to-transparent" />
        <div className="absolute inset-0 bg-obsidian/0 group-hover:bg-obsidian/20 transition-colors duration-500" />
      </div>

      {/* Category badge */}
      <div className="absolute top-6 left-6">
        <span className="section-label text-[9px] text-gold/80 glass px-3 py-1.5 rounded-full">
          {story.category}
        </span>
      </div>

      {/* Content */}
      <div className="absolute bottom-0 left-0 right-0 p-8">
        <p className="font-inter text-[10px] tracking-[0.3em] text-gold/70 uppercase mb-2">
          {story.date} · {story.location}
        </p>
        <h3 className="font-cormorant text-3xl md:text-4xl font-light text-cream leading-tight mb-1">
          {story.couple}
        </h3>
        <p className="font-inter text-xs text-cream/50 tracking-wide mb-6">{story.subtitle}</p>

        {/* View CTA Button */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation()
            onSelect(story, index)
          }}
          className="flex items-center gap-3 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-500 cursor-pointer"
        >
          <span className="section-label text-[9px] text-gold group-hover:underline">VIEW STORY</span>
          <motion.span
            className="text-gold text-lg"
            animate={{ x: [0, 5, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >→</motion.span>
        </button>
      </div>
    </motion.div>
  )
}

export default function FeaturedStories() {
  const titleRef = useRef(null)
  const inView = useInView(titleRef, { once: true })

  const [selectedStory, setSelectedStory] = useState(null)
  const [storyIndex, setStoryIndex] = useState(0)

  const handleSelectStory = (story, idx) => {
    setSelectedStory(story)
    setStoryIndex(idx)
  }

  const handleNextStory = () => {
    const next = (storyIndex + 1) % stories.length
    setStoryIndex(next)
    setSelectedStory(stories[next])
  }

  const handlePrevStory = () => {
    const prev = (storyIndex - 1 + stories.length) % stories.length
    setStoryIndex(prev)
    setSelectedStory(stories[prev])
  }

  return (
    <section id="featured-stories" className="py-24 overflow-hidden">
      {/* Header */}
      <div ref={titleRef} className="px-8 md:px-16 mb-16 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
        <div>
          <motion.span
            className="section-label block mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            Featured Stories
          </motion.span>
          <motion.h2
            className="font-cormorant text-display-md text-cream leading-tight"
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            Every love story<br />
            <span className="italic text-gold">deserves a chapter.</span>
          </motion.h2>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <Link to="/portfolio" id="view-all-stories-btn" className="btn-gold text-[10px] py-3 px-7">
            <span>VIEW ALL STORIES</span>
          </Link>
        </motion.div>
      </div>

      {/* Horizontal Scroll Gallery */}
      <div className="horizontal-scroll-container px-8 md:px-16 gap-4 pb-4">
        {stories.map((story, i) => (
          <StoryCard
            key={story.id}
            story={story}
            index={i}
            onSelect={handleSelectStory}
          />
        ))}

        {/* End CTA card */}
        <motion.div
          className="min-w-[75vw] sm:min-w-[50vw] md:min-w-[280px] h-[70vh] md:h-[80vh] flex items-center justify-center glass border border-gold/15 rounded-xl flex-shrink-0"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <div className="text-center p-8 flex flex-col items-center">
            <p className="font-cormorant text-5xl md:text-6xl text-gold/60 mb-2 font-light">+52</p>
            <p className="section-label text-[10px] text-cream/40 mb-6 tracking-[0.3em] uppercase">More Stories</p>
            <Link to="/portfolio" className="btn-gold text-[10px] py-3 px-8 whitespace-nowrap">
              <span>SEE ALL STORIES →</span>
            </Link>
          </div>
        </motion.div>
      </div>

      {/* Story Showcase Modal */}
      <StoryModal
        story={selectedStory}
        isOpen={Boolean(selectedStory)}
        onClose={() => setSelectedStory(null)}
        onPrev={handlePrevStory}
        onNext={handleNextStory}
      />
    </section>
  )
}
