import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { MapPin, Phone, Mail, Send, CheckCircle } from 'lucide-react'
import InstagramIcon from '../ui/InstagramIcon'

const eventTypes = [
  'Wedding', 'Pre-Wedding', 'Portrait', 'Baby & Maternity',
  'Fashion', 'Birthday', 'Corporate', 'Other',
]

const InputField = ({ label, id, register, error, type = 'text', ...props }) => (
  <div className="relative">
    <label htmlFor={id} className="section-label text-[9px] text-cream/40 block mb-2">
      {label}
    </label>
    <input
      id={id}
      type={type}
      className={`w-full bg-transparent border-b py-3 font-inter text-sm text-cream placeholder-cream/20 outline-none transition-colors duration-300 focus:border-gold ${
        error ? 'border-red-500/50' : 'border-white/10 hover:border-white/20'
      }`}
      {...register}
      {...props}
    />
    {error && <p className="text-red-400/70 text-[10px] mt-1">{error.message}</p>}
  </div>
)

export default function ContactSection() {
  const [submitted, setSubmitted] = useState(false)
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm()

  const onSubmit = async (data) => {
    await new Promise(r => setTimeout(r, 1500)) // simulate API
    console.log('Form data:', data)
    setSubmitted(true)
  }

  return (
    <section id="contact" className="relative py-32 overflow-hidden" ref={ref}>
      {/* BG accent */}
      <div className="absolute top-0 right-0 w-1/2 h-full opacity-5">
        <img
          src="https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=60&w=800"
          alt=""
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-l from-transparent to-obsidian" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-16 grid grid-cols-1 lg:grid-cols-2 gap-20">
        {/* Left — Info */}
        <div className="flex flex-col justify-center">
          <motion.span
            className="section-label block mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
          >
            Let's Connect
          </motion.span>
          <motion.h2
            className="font-cormorant text-display-md text-cream leading-tight mb-8"
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            Let's create<br />
            something{' '}
            <span className="italic text-gold">timeless.</span>
          </motion.h2>

          <motion.p
            className="font-inter text-sm text-cream/40 leading-relaxed mb-12 max-w-sm"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3 }}
          >
            Every great story starts with a conversation. Tell us about your day, 
            and let's see how we can make it unforgettable.
          </motion.p>

          {/* Contact details */}
          <motion.div
            className="space-y-5"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.4 }}
          >
            {[
              { icon: <Phone size={15} />, label: '+91 98765 43210', href: 'tel:+919876543210', id: 'contact-phone' },
              { icon: <Mail size={15} />, label: 'hello@popphotography.in', href: 'mailto:hello@popphotography.in', id: 'contact-email' },
              { icon: <InstagramIcon size={15} />, label: '@popphotography', href: 'https://instagram.com/popphotography', id: 'contact-instagram' },
              { icon: <MapPin size={15} />, label: 'Anna Nagar, Chennai, Tamil Nadu', href: 'https://maps.google.com', id: 'contact-location' },
            ].map((item) => (
              <a
                key={item.id}
                id={item.id}
                href={item.href}
                target={item.href.startsWith('http') ? '_blank' : undefined}
                rel="noopener noreferrer"
                className="flex items-center gap-4 group"
              >
                <span className="text-gold/60 group-hover:text-gold transition-colors">{item.icon}</span>
                <span className="font-inter text-sm text-cream/50 group-hover:text-cream/80 transition-colors">{item.label}</span>
              </a>
            ))}
          </motion.div>
        </div>

        {/* Right — Form */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        >
          {submitted ? (
            <motion.div
              className="h-full flex flex-col items-center justify-center text-center py-20"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              <CheckCircle size={48} className="text-gold mb-6" />
              <h3 className="font-cormorant text-3xl text-cream mb-3">Thank You.</h3>
              <p className="font-cormorant text-xl italic text-gold mb-4">Your story starts here.</p>
              <p className="font-inter text-sm text-cream/40 max-w-xs">
                We've received your enquiry and will get back to you within 24 hours.
              </p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} id="contact-form" className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <InputField
                  label="Your Name *"
                  id="contact-name"
                  register={register('name', { required: 'Name is required' })}
                  error={errors.name}
                  placeholder="Priya Sharma"
                />
                <InputField
                  label="Phone Number *"
                  id="contact-phone-field"
                  type="tel"
                  register={register('phone', { required: 'Phone is required' })}
                  error={errors.phone}
                  placeholder="+91 99999 00000"
                />
              </div>

              <InputField
                label="Email Address *"
                id="contact-email-field"
                type="email"
                register={register('email', { required: 'Email is required', pattern: { value: /\S+@\S+\.\S+/, message: 'Invalid email' } })}
                error={errors.email}
                placeholder="priya@example.com"
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <label htmlFor="contact-event-type" className="section-label text-[9px] text-cream/40 block mb-2">
                    Event Type *
                  </label>
                  <select
                    id="contact-event-type"
                    className="w-full bg-obsidian border-b border-white/10 py-3 font-inter text-sm text-cream/70 outline-none focus:border-gold transition-colors appearance-none"
                    {...register('eventType', { required: true })}
                  >
                    <option value="">Select event</option>
                    {eventTypes.map(t => (
                      <option key={t} value={t} className="bg-obsidian">{t}</option>
                    ))}
                  </select>
                </div>
                <InputField
                  label="Event Date"
                  id="contact-event-date"
                  type="date"
                  register={register('eventDate')}
                />
              </div>

              <InputField
                label="Location / Venue"
                id="contact-location-field"
                register={register('location')}
                placeholder="e.g. Leela Palace, Chennai"
              />

              <div>
                <label htmlFor="contact-message" className="section-label text-[9px] text-cream/40 block mb-2">
                  Tell Us Your Story
                </label>
                <textarea
                  id="contact-message"
                  rows={4}
                  className="w-full bg-transparent border-b border-white/10 py-3 font-inter text-sm text-cream placeholder-cream/20 outline-none focus:border-gold transition-colors resize-none hover:border-white/20"
                  placeholder="Tell us about your vision, your story, what makes your love unique..."
                  {...register('message')}
                />
              </div>

              <motion.button
                id="contact-submit-btn"
                type="submit"
                disabled={isSubmitting}
                className="btn-gold w-full flex items-center justify-center gap-3 py-4"
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
              >
                <span>
                  {isSubmitting ? (
                    <span className="flex items-center gap-2">
                      <motion.span
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                        className="inline-block"
                      >
                        ◌
                      </motion.span>
                      SENDING...
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      CHECK MY DATE <Send size={13} />
                    </span>
                  )}
                </span>
              </motion.button>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  )
}
