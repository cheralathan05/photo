import { useState } from 'react'
import { motion } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { CalendarCheck, CheckCircle } from 'lucide-react'
import Footer from '../components/Footer/Footer'

const eventTypes = ['Wedding', 'Pre-Wedding', 'Portrait', 'Baby & Maternity', 'Fashion', 'Birthday', 'Corporate', 'Other']

export default function Availability() {
  const [submitted, setSubmitted] = useState(false)
  const { register, handleSubmit, watch, formState: { errors, isSubmitting } } = useForm()

  const onSubmit = async (data) => {
    await new Promise(r => setTimeout(r, 1500))
    console.log('Availability check:', data)
    setSubmitted(true)
  }

  return (
    <>
      <section className="relative min-h-screen flex items-center py-32">
        {/* BG */}
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1519741497674-611481863552?q=60&w=1200"
            alt=""
            className="w-full h-full object-cover opacity-10"
          />
          <div className="absolute inset-0 bg-obsidian/95" />
        </div>

        <div className="relative z-10 max-w-2xl mx-auto w-full px-6">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="text-center mb-16"
          >
            <div className="w-16 h-16 border border-gold/30 flex items-center justify-center mx-auto mb-6">
              <CalendarCheck size={24} className="text-gold/60" />
            </div>
            <span className="section-label block mb-4">Date Availability</span>
            <h1 className="font-cormorant text-display-md text-cream leading-tight mb-4">
              Is your date<br />
              <span className="italic text-gold">still available?</span>
            </h1>
            <p className="font-inter text-sm text-cream/40">
              We book out quickly — especially for weekends. Check your date now.
            </p>
          </motion.div>

          {submitted ? (
            <motion.div
              className="glass border border-gold/10 p-12 text-center"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              <CheckCircle size={48} className="text-gold mx-auto mb-6" />
              <h2 className="font-cormorant text-3xl text-cream mb-3">We've Got Your Request!</h2>
              <p className="font-cormorant text-xl italic text-gold mb-4">Your story starts here.</p>
              <p className="font-inter text-sm text-cream/40 max-w-xs mx-auto">
                We'll check our calendar and respond within 2 hours. 
                Keep an eye on your inbox!
              </p>
            </motion.div>
          ) : (
            <motion.form
              onSubmit={handleSubmit(onSubmit)}
              id="availability-form"
              className="glass border border-gold/10 p-10 space-y-8"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="section-label text-[9px] text-cream/40 block mb-2">Your Name *</label>
                  <input
                    id="avail-name"
                    type="text"
                    placeholder="Priya Sharma"
                    className="w-full bg-transparent border-b border-white/10 py-3 font-inter text-sm text-cream placeholder-cream/20 outline-none focus:border-gold transition-colors"
                    {...register('name', { required: true })}
                  />
                </div>
                <div>
                  <label className="section-label text-[9px] text-cream/40 block mb-2">Phone *</label>
                  <input
                    id="avail-phone"
                    type="tel"
                    placeholder="+91 99999 00000"
                    className="w-full bg-transparent border-b border-white/10 py-3 font-inter text-sm text-cream placeholder-cream/20 outline-none focus:border-gold transition-colors"
                    {...register('phone', { required: true })}
                  />
                </div>
              </div>

              <div>
                <label className="section-label text-[9px] text-cream/40 block mb-2">Email *</label>
                <input
                  id="avail-email"
                  type="email"
                  placeholder="priya@example.com"
                  className="w-full bg-transparent border-b border-white/10 py-3 font-inter text-sm text-cream placeholder-cream/20 outline-none focus:border-gold transition-colors"
                  {...register('email', { required: true })}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="section-label text-[9px] text-cream/40 block mb-2">Event Type *</label>
                  <select
                    id="avail-event-type"
                    className="w-full bg-obsidian border-b border-white/10 py-3 font-inter text-sm text-cream/70 outline-none focus:border-gold transition-colors"
                    {...register('eventType', { required: true })}
                  >
                    <option value="">Select type</option>
                    {eventTypes.map(t => <option key={t} value={t} className="bg-obsidian">{t}</option>)}
                  </select>
                </div>
                <div>
                  <label className="section-label text-[9px] text-cream/40 block mb-2">Event Date *</label>
                  <input
                    id="avail-event-date"
                    type="date"
                    className="w-full bg-transparent border-b border-white/10 py-3 font-inter text-sm text-cream/70 outline-none focus:border-gold transition-colors"
                    {...register('eventDate', { required: true })}
                  />
                </div>
              </div>

              <div>
                <label className="section-label text-[9px] text-cream/40 block mb-2">Location / City</label>
                <input
                  id="avail-location"
                  type="text"
                  placeholder="e.g. Chennai"
                  className="w-full bg-transparent border-b border-white/10 py-3 font-inter text-sm text-cream placeholder-cream/20 outline-none focus:border-gold transition-colors"
                  {...register('location')}
                />
              </div>

              <motion.button
                id="avail-submit-btn"
                type="submit"
                disabled={isSubmitting}
                className="btn-gold w-full flex items-center justify-center gap-3 py-4"
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
              >
                <span className="flex items-center gap-2">
                  {isSubmitting ? 'CHECKING...' : <><CalendarCheck size={15} /> CHECK MY DATE</>}
                </span>
              </motion.button>
            </motion.form>
          )}
        </div>
      </section>
      <Footer />
    </>
  )
}
