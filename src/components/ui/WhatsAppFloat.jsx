import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageCircle, Phone, Mail, X } from 'lucide-react'
import InstagramIcon from './InstagramIcon'

export default function WhatsAppFloat() {
  const [open, setOpen] = useState(false)

  const contacts = [
    {
      id: 'whatsapp-btn',
      icon: <MessageCircle size={18} />,
      label: 'WhatsApp',
      color: '#25D366',
      href: 'https://wa.me/919876543210?text=Hi%2C%20I%27d%20like%20to%20book%20a%20session%20with%20Pop%20Photography',
    },
    {
      id: 'phone-btn',
      icon: <Phone size={18} />,
      label: 'Call Us',
      color: '#C9A84C',
      href: 'tel:+919876543210',
    },
    {
      id: 'email-btn',
      icon: <Mail size={18} />,
      label: 'Email',
      color: '#C9A84C',
      href: 'mailto:hello@popphotography.in',
    },
    {
      id: 'instagram-btn',
      icon: <InstagramIcon size={18} />,
      label: 'Instagram',
      color: '#E1306C',
      href: 'https://instagram.com/popphotography',
    },
  ]

  return (
    <div className="whatsapp-float" id="quick-contact">
      {/* Expandable contacts */}
      <AnimatePresence>
        {open && (
          <div className="flex flex-col gap-3">
            {contacts.map((c, i) => (
              <motion.a
                key={c.id}
                id={c.id}
                href={c.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 glass px-4 py-2.5 rounded-full group"
                initial={{ opacity: 0, x: 20, scale: 0.8 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: 20, scale: 0.8 }}
                transition={{ delay: i * 0.06, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ scale: 1.05 }}
              >
                <span className="section-label text-[9px] text-cream/60 whitespace-nowrap">{c.label}</span>
                <span style={{ color: c.color }}>{c.icon}</span>
              </motion.a>
            ))}
          </div>
        )}
      </AnimatePresence>

      {/* Main toggle button */}
      <motion.button
        id="quick-contact-toggle"
        onClick={() => setOpen(!open)}
        className="w-14 h-14 rounded-full glass border border-gold/30 flex items-center justify-center text-gold shadow-2xl"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        animate={{ boxShadow: open ? '0 0 0 0 rgba(201,168,76,0)' : ['0 0 0 0 rgba(201,168,76,0.3)', '0 0 0 12px rgba(201,168,76,0)', '0 0 0 0 rgba(201,168,76,0)'] }}
        transition={{ duration: 2, repeat: open ? 0 : Infinity }}
      >
        <AnimatePresence mode="wait">
          {open ? (
            <motion.span key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}>
              <X size={20} />
            </motion.span>
          ) : (
            <motion.span key="chat" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }}>
              <MessageCircle size={20} />
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  )
}
