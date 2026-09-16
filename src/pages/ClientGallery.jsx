import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Lock, Grid, Download, Heart, Share2, Eye, X } from 'lucide-react'
import Footer from '../components/Footer/Footer'

// Simulated client gallery images
const CLIENT_GALLERY = [
  { id: 'cg1', src: 'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=800', fav: false },
  { id: 'cg2', src: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=800', fav: false },
  { id: 'cg3', src: 'https://images.unsplash.com/photo-1537633552985-df8429e8048b?q=80&w=800', fav: false },
  { id: 'cg4', src: 'https://images.unsplash.com/photo-1606800052052-a08af7148866?q=80&w=800', fav: false },
  { id: 'cg5', src: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?q=80&w=800', fav: false },
  { id: 'cg6', src: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=800', fav: false },
  { id: 'cg7', src: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=800', fav: false },
  { id: 'cg8', src: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=800', fav: false },
  { id: 'cg9', src: 'https://images.unsplash.com/photo-1554048612-b6a482bc67e5?q=80&w=800', fav: false },
  { id: 'cg10', src: 'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?q=80&w=800', fav: false },
  { id: 'cg11', src: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=800', fav: false },
  { id: 'cg12', src: 'https://images.unsplash.com/photo-1520813792240-56fc4a3765a7?q=80&w=800', fav: false },
]

// Login form
const LoginForm = ({ onLogin }) => {
  const [galleryId, setGalleryId] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    await new Promise(r => setTimeout(r, 1000))
    // Demo: any credentials work
    if (galleryId && password) {
      onLogin()
    } else {
      setError('Please enter your gallery ID and password.')
    }
    setLoading(false)
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1606800052052-a08af7148866?q=60&w=1200"
          alt=""
          className="w-full h-full object-cover opacity-15"
        />
        <div className="absolute inset-0 bg-obsidian/90" />
      </div>

      <motion.div
        className="relative z-10 w-full max-w-md"
        initial={{ opacity: 0, y: 40, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="glass border border-gold/10 p-10">
          <div className="text-center mb-10">
            <div className="w-14 h-14 border border-gold/30 flex items-center justify-center mx-auto mb-4">
              <Lock size={20} className="text-gold/60" />
            </div>
            <h1 className="font-cormorant text-3xl text-cream mb-2">Client Gallery</h1>
            <p className="section-label text-[9px] text-cream/30">ENTER YOUR GALLERY</p>
          </div>

          <form onSubmit={handleSubmit} id="gallery-login-form" className="space-y-6">
            <div>
              <label className="section-label text-[9px] text-cream/40 block mb-2">Gallery ID</label>
              <input
                id="gallery-id-input"
                type="text"
                value={galleryId}
                onChange={(e) => setGalleryId(e.target.value)}
                placeholder="e.g. PRIYA2026"
                className="w-full bg-transparent border-b border-white/10 py-3 font-inter text-sm text-cream placeholder-cream/20 outline-none focus:border-gold transition-colors"
              />
            </div>
            <div>
              <label className="section-label text-[9px] text-cream/40 block mb-2">Password</label>
              <input
                id="gallery-password-input"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-transparent border-b border-white/10 py-3 font-inter text-sm text-cream placeholder-cream/20 outline-none focus:border-gold transition-colors"
              />
            </div>

            {error && (
              <p className="font-inter text-xs text-red-400/70">{error}</p>
            )}

            <motion.button
              id="gallery-login-btn"
              type="submit"
              disabled={loading}
              className="btn-gold w-full flex justify-center py-4"
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
            >
              <span>{loading ? 'ACCESSING...' : 'VIEW MY PHOTOS →'}</span>
            </motion.button>
          </form>

          <p className="font-inter text-[10px] text-cream/20 text-center mt-6">
            Your gallery ID and password are provided in your delivery email.
          </p>
        </div>
      </motion.div>
    </div>
  )
}

// Gallery view
const GalleryView = () => {
  const [photos, setPhotos] = useState(CLIENT_GALLERY)
  const [lightbox, setLightbox] = useState(null)
  const [showFavs, setShowFavs] = useState(false)

  const toggleFav = (id) => {
    setPhotos(prev => prev.map(p => p.id === id ? { ...p, fav: !p.fav } : p))
  }

  const displayed = showFavs ? photos.filter(p => p.fav) : photos
  const favCount = photos.filter(p => p.fav).length

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="py-16 px-6 md:px-16 max-w-7xl mx-auto border-b border-white/5">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div>
            <span className="section-label block mb-2 text-gold">PRIYA & ARUN</span>
            <h1 className="font-cormorant text-4xl text-cream">Your Wedding Gallery</h1>
            <p className="font-inter text-xs text-cream/30 mt-1">{photos.length} photographs · August 24, 2026</p>
          </div>
          <div className="flex items-center gap-4">
            <button
              id="toggle-favs-btn"
              onClick={() => setShowFavs(!showFavs)}
              className={`flex items-center gap-2 px-4 py-2 border text-xs transition-all ${showFavs ? 'border-gold text-gold' : 'border-white/10 text-cream/40'}`}
            >
              <Heart size={12} /> FAVOURITES {favCount > 0 && `(${favCount})`}
            </button>
            <button
              id="download-all-btn"
              className="btn-gold text-[10px] py-2 px-5 flex items-center gap-2"
              onClick={() => alert('In a real implementation, this would trigger a zip download of all photos.')}
            >
              <span className="flex items-center gap-2"><Download size={12} /> DOWNLOAD ALL</span>
            </button>
          </div>
        </div>
      </div>

      {/* Grid */}
      <div className="p-4 md:p-8">
        {displayed.length === 0 ? (
          <div className="text-center py-20">
            <Heart size={32} className="text-cream/20 mx-auto mb-4" />
            <p className="font-cormorant text-xl text-cream/30">No favourites yet</p>
            <p className="font-inter text-xs text-cream/20 mt-2">Click ♥ on any photo to save it</p>
          </div>
        ) : (
          <div className="masonry-grid">
            {displayed.map((photo) => (
              <div key={photo.id} className="masonry-item relative group h-52">
                <img
                  src={photo.src}
                  alt="Gallery"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-obsidian/0 group-hover:bg-obsidian/50 transition-colors duration-300" />
                <div className="absolute inset-0 flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <button
                    onClick={() => setLightbox(photo)}
                    className="w-9 h-9 border border-cream/30 flex items-center justify-center text-cream/70 hover:text-cream hover:border-cream transition-colors"
                  >
                    <Eye size={15} />
                  </button>
                  <button
                    onClick={() => toggleFav(photo.id)}
                    className={`w-9 h-9 border flex items-center justify-center transition-colors ${photo.fav ? 'border-gold bg-gold text-obsidian' : 'border-cream/30 text-cream/70 hover:border-gold hover:text-gold'}`}
                  >
                    <Heart size={15} fill={photo.fav ? 'currentColor' : 'none'} />
                  </button>
                  <button
                    onClick={() => alert('Download would trigger here.')}
                    className="w-9 h-9 border border-cream/30 flex items-center justify-center text-cream/70 hover:text-cream hover:border-cream transition-colors"
                  >
                    <Download size={15} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            className="lightbox-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightbox(null)}
          >
            <button onClick={() => setLightbox(null)} className="absolute top-6 right-6 text-cream/60 hover:text-gold">
              <X size={24} />
            </button>
            <motion.img
              src={lightbox.src}
              alt=""
              className="max-w-4xl max-h-[85vh] object-contain mx-auto px-4"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function ClientGallery() {
  const [loggedIn, setLoggedIn] = useState(false)

  return (
    <>
      <AnimatePresence mode="wait">
        {!loggedIn ? (
          <motion.div key="login" exit={{ opacity: 0 }}>
            <LoginForm onLogin={() => setLoggedIn(true)} />
          </motion.div>
        ) : (
          <motion.div key="gallery" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
            <GalleryView />
          </motion.div>
        )}
      </AnimatePresence>
      <Footer />
    </>
  )
}
