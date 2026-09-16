import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

// ─── Helpers (MUST be above component) ─────────────────────
const wait = (ms) => new Promise((r) => setTimeout(r, ms))

// ─── Deterministic dust particles ──────────────────────────
const DUST = Array.from({ length: 55 }, (_, i) => ({
  id: i,
  x: (i * 41 + 7) % 100,
  y: (i * 67 + 19) % 100,
  size: 1 + (i % 4) * 0.6,
  opacity: 0.12 + (i % 5) * 0.1,
  driftX: ((i % 7) - 3) * 6,
  driftY: -15 - (i % 8) * 9,
  delay: (i % 12) * 0.4,
  dur: 5 + (i % 6) * 1.8,
}))

// ─── Pulse ring helper ──────────────────────────────────────
function PulseRing({ delay, size, dur }) {
  return (
    <motion.div
      style={{
        position: 'absolute',
        width: size,
        height: size,
        borderRadius: '50%',
        border: '1px solid rgba(201,168,76,0.18)',
        top: '50%',
        left: '50%',
        marginTop: -(size / 2),
        marginLeft: -(size / 2),
        pointerEvents: 'none',
      }}
      animate={{ scale: [0.7, 2.2], opacity: [0.5, 0] }}
      transition={{ duration: dur, delay, repeat: Infinity, ease: 'easeOut' }}
    />
  )
}

// ─── Main Intro ─────────────────────────────────────────────
export default function IntroScreen({ onComplete }) {
  const [phase, setPhase] = useState(0)
  // phase 0: black / entering
  // phase 1: scan line sweeps + "YOUR STORY" phrase
  // phase 2: phrase fades, big "POP" builds
  // phase 3: subtitle + tagline appear
  // phase 4: exit (scale + fade)

  useEffect(() => {
    let cancelled = false
    const run = async () => {
      await wait(300)
      if (cancelled) return

      // Phase 1: scan + phrase
      setPhase(1)
      await wait(2200)
      if (cancelled) return

      // Phase 2: big POP
      setPhase(2)
      await wait(1900)
      if (cancelled) return

      // Phase 3: subtitle
      setPhase(3)
      await wait(2400)
      if (cancelled) return

      // Phase 4: exit
      setPhase(4)
      await wait(1100)
      if (cancelled) return

      onComplete()
    }
    run()
    return () => { cancelled = true }
  }, [onComplete])

  const p1 = phase >= 1
  const p2 = phase >= 2
  const p3 = phase >= 3
  const p4 = phase >= 4

  return (
    <motion.div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        overflow: 'hidden',
        background: '#04040a',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
      animate={p4 ? { opacity: 0, scale: 1.06 } : { opacity: 1, scale: 1 }}
      transition={p4 ? { duration: 1.0, ease: [0.7, 0, 1, 0.6] } : { duration: 0 }}
    >

      {/* ── Dust particles ── */}
      {DUST.map((d) => (
        <motion.div
          key={d.id}
          style={{
            position: 'absolute',
            left: `${d.x}%`,
            top: `${d.y}%`,
            width: d.size,
            height: d.size,
            borderRadius: '50%',
            background: '#C9A84C',
            pointerEvents: 'none',
          }}
          animate={{
            x: [0, d.driftX, d.driftX * 0.5, 0],
            y: [0, d.driftY, d.driftY * 1.6, d.driftY * 0.3],
            opacity: [0, d.opacity, d.opacity * 0.7, 0],
            scale: [0, 1, 0.8, 0],
          }}
          transition={{
            duration: d.dur,
            delay: d.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}

      {/* ── Atmospheric radial gradient ── */}
      <motion.div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(ellipse 65% 50% at 50% 50%, rgba(201,168,76,0.055) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
        animate={p2 ? { opacity: [1, 1.4, 1] } : { opacity: 1 }}
        transition={{ duration: 1.2 }}
      />

      {/* ── Pulse rings (centred) ── */}
      <PulseRing delay={0.4}  size={260} dur={3.6} />
      <PulseRing delay={1.2}  size={420} dur={3.6} />
      <PulseRing delay={2.0}  size={600} dur={3.6} />

      {/* ── Horizontal scan line (phase 1 only) ── */}
      <AnimatePresence>
        {p1 && !p2 && (
          <motion.div
            key="scanline"
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '1px',
              background: 'linear-gradient(to right, transparent, #C9A84C 30%, rgba(255,235,150,0.9) 50%, #C9A84C 70%, transparent)',
              boxShadow: '0 0 16px 3px rgba(201,168,76,0.5)',
              pointerEvents: 'none',
              zIndex: 20,
            }}
            initial={{ top: '-2px' }}
            animate={{ top: '100vh' }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, ease: [0.25, 0, 0.5, 1] }}
          />
        )}
      </AnimatePresence>

      {/* ── Corner brackets ── */}
      {[
        { style: { top: 28, left: 28 },  rotate: 0 },
        { style: { top: 28, right: 28 }, rotate: 90 },
        { style: { bottom: 28, right: 28 }, rotate: 180 },
        { style: { bottom: 28, left: 28 }, rotate: 270 },
      ].map((item, i) => (
        <motion.div
          key={i}
          style={{
            position: 'absolute',
            ...item.style,
            width: 28,
            height: 28,
            pointerEvents: 'none',
            transform: `rotate(${item.rotate}deg)`,
          }}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={p1 ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.5 }}
          transition={{ duration: 0.6, delay: 0.1 + i * 0.07, ease: [0.16, 1, 0.3, 1] }}
        >
          <svg viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M2 26 L2 2 L26 2" stroke="#C9A84C" strokeWidth="1.2" strokeOpacity="0.5" />
          </svg>
        </motion.div>
      ))}

      {/* ── Phase 1: cinematic phrase "YOUR STORY" ── */}
      <AnimatePresence>
        {p1 && !p2 && (
          <motion.div
            key="phrase"
            style={{
              position: 'absolute',
              textAlign: 'center',
              userSelect: 'none',
            }}
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, y: -30, filter: 'blur(8px)' }}
            transition={{ duration: 0.6, ease: [0.7, 0, 1, 0.6] }}
          >
            <div style={{ display: 'flex', gap: '0.18em', justifyContent: 'center' }}>
              {['Y','O','U','R'].map((ch, i) => (
                <motion.span
                  key={i}
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: 'clamp(56px, 10vw, 110px)',
                    fontWeight: 300,
                    color: 'rgba(245,240,232,0.08)',
                    letterSpacing: '0.1em',
                    lineHeight: 1,
                    display: 'inline-block',
                  }}
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.3 + i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                >
                  {ch}
                </motion.span>
              ))}
            </div>
            <div style={{ display: 'flex', gap: '0.18em', justifyContent: 'center', marginTop: '0.05em' }}>
              {['S','T','O','R','Y'].map((ch, i) => (
                <motion.span
                  key={i}
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: 'clamp(56px, 10vw, 110px)',
                    fontWeight: 300,
                    color: '#C9A84C',
                    letterSpacing: '0.1em',
                    lineHeight: 1,
                    display: 'inline-block',
                  }}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.85, delay: 0.5 + i * 0.09, ease: [0.16, 1, 0.3, 1] }}
                >
                  {ch}
                </motion.span>
              ))}
            </div>
            <motion.div
              style={{
                marginTop: 22,
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: 10,
                letterSpacing: '0.5em',
                color: 'rgba(201,168,76,0.55)',
                textTransform: 'uppercase',
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1.1 }}
            >
              Beautifully Told
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Phase 2 + 3: POP PHOTOGRAPHY ── */}
      <AnimatePresence>
        {p2 && !p4 && (
          <motion.div
            key="brand"
            style={{
              position: 'absolute',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 0,
              userSelect: 'none',
            }}
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.08, filter: 'blur(12px)' }}
            transition={{ duration: 0.9, ease: [0.7, 0, 1, 0.6] }}
          >
            {/* Gold thin top rule */}
            <motion.div
              style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 18 }}
              initial={{ opacity: 0, scaleX: 0 }}
              animate={{ opacity: 1, scaleX: 1 }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            >
              <div style={{ width: 60, height: 1, background: 'linear-gradient(to right, transparent, rgba(201,168,76,0.6))' }} />
              <span style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: 8.5,
                letterSpacing: '0.5em',
                color: 'rgba(201,168,76,0.65)',
                textTransform: 'uppercase',
              }}>
                Est. 2018 · Chennai
              </span>
              <div style={{ width: 60, height: 1, background: 'linear-gradient(to left, transparent, rgba(201,168,76,0.6))' }} />
            </motion.div>

            {/* POP — giant cinematic outline → gold fill reveal */}
            <div style={{ position: 'relative', overflow: 'visible' }}>
              {/* Outline layer (always visible once phase 2) */}
              <div style={{ display: 'flex', gap: '0.02em' }}>
                {['P', 'O', 'P'].map((ch, i) => (
                  <div key={i} style={{ overflow: 'hidden' }}>
                    <motion.span
                      style={{
                        display: 'inline-block',
                        fontFamily: "'Cormorant Garamond', serif",
                        fontSize: 'clamp(100px, 18vw, 210px)',
                        fontWeight: 300,
                        letterSpacing: '0.06em',
                        lineHeight: 0.88,
                        color: 'transparent',
                        WebkitTextStroke: '1.5px rgba(245,240,232,0.85)',
                      }}
                      initial={{ y: '105%' }}
                      animate={{ y: '0%' }}
                      transition={{ duration: 1.1, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] }}
                    >
                      {ch}
                    </motion.span>
                  </div>
                ))}
              </div>

              {/* Gold fill — clip-path sweeps left→right when phase 3 starts */}
              <motion.div
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  display: 'flex',
                  gap: '0.02em',
                  overflow: 'hidden',
                  clipPath: 'inset(0% 100% 0% 0%)',
                }}
                animate={p3 ? { clipPath: 'inset(0% 0% 0% 0%)' } : { clipPath: 'inset(0% 100% 0% 0%)' }}
                transition={{ duration: 1.1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              >
                {['P', 'O', 'P'].map((ch, i) => (
                  <span
                    key={i}
                    style={{
                      fontFamily: "'Cormorant Garamond', serif",
                      fontSize: 'clamp(100px, 18vw, 210px)',
                      fontWeight: 300,
                      letterSpacing: '0.06em',
                      lineHeight: 0.88,
                      color: '#C9A84C',
                      display: 'inline-block',
                    }}
                  >
                    {ch}
                  </span>
                ))}
              </motion.div>
            </div>

            {/* PHOTOGRAPHY wordmark */}
            <motion.div
              style={{ display: 'flex', alignItems: 'center', gap: 14, marginTop: 8 }}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.55, ease: [0.16, 1, 0.3, 1] }}
            >
              <div style={{ width: 50, height: 1, background: 'linear-gradient(to right, transparent, #C9A84C)' }} />
              <span style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: 11,
                letterSpacing: '0.55em',
                color: '#C9A84C',
                textTransform: 'uppercase',
              }}>
                Photography
              </span>
              <div style={{ width: 50, height: 1, background: 'linear-gradient(to left, transparent, #C9A84C)' }} />
            </motion.div>

            {/* Tagline */}
            <motion.p
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontStyle: 'italic',
                fontWeight: 300,
                fontSize: 'clamp(15px, 2vw, 22px)',
                color: 'rgba(245,240,232,0.5)',
                letterSpacing: '0.06em',
                margin: '22px 0 0',
                textAlign: 'center',
              }}
              initial={{ opacity: 0 }}
              animate={p3 ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 1.2, delay: 0.15 }}
            >
              "We Capture What Time Cannot."
            </motion.p>

            {/* Loading bar */}
            <motion.div
              style={{ marginTop: 28 }}
              initial={{ opacity: 0 }}
              animate={p3 ? { opacity: 1 } : { opacity: 0 }}
              transition={{ delay: 0.4 }}
            >
              <div style={{ width: 140, height: 1, background: 'rgba(201,168,76,0.12)' }}>
                <motion.div
                  style={{
                    height: '100%',
                    background: 'linear-gradient(to right, #C9A84C, rgba(255,235,150,0.9), #C9A84C)',
                    transformOrigin: 'left',
                    scaleX: 0,
                  }}
                  animate={p3 ? { scaleX: 1 } : { scaleX: 0 }}
                  transition={{ duration: 2.0, ease: 'linear', delay: 0.5 }}
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Film-strip side bars ── */}
      {[{ left: 0, borderRight: '1px solid rgba(201,168,76,0.06)' }, { right: 0, borderLeft: '1px solid rgba(201,168,76,0.06)' }].map((s, idx) => (
        <motion.div
          key={idx}
          style={{
            position: 'absolute',
            top: 0,
            ...s,
            width: 22,
            height: '100%',
            background: '#07070f',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-around',
            alignItems: 'center',
            paddingBlock: 12,
            pointerEvents: 'none',
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          {Array.from({ length: 18 }).map((_, i) => (
            <div key={i} style={{ width: 8, height: 5, borderRadius: 1, border: '1px solid rgba(201,168,76,0.18)', flexShrink: 0 }} />
          ))}
        </motion.div>
      ))}

      {/* ── Vignette ── */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'radial-gradient(ellipse 80% 70% at 50% 50%, transparent 40%, rgba(4,4,10,0.82) 100%)',
        pointerEvents: 'none',
      }} />

      {/* ── Top center small label ── */}
      <motion.div
        style={{
          position: 'absolute',
          top: 22,
          left: '50%',
          transform: 'translateX(-50%)',
          fontFamily: "'Space Grotesk', sans-serif",
          fontSize: 7.5,
          letterSpacing: '0.45em',
          color: 'rgba(201,168,76,0.3)',
          textTransform: 'uppercase',
          whiteSpace: 'nowrap',
          pointerEvents: 'none',
        }}
        initial={{ opacity: 0 }}
        animate={p1 ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 1 }}
      >
        Pop Photography
      </motion.div>

      {/* ── Bottom credit ── */}
      <motion.div
        style={{
          position: 'absolute',
          bottom: 22,
          left: '50%',
          transform: 'translateX(-50%)',
          fontFamily: "'Space Grotesk', sans-serif",
          fontSize: 7.5,
          letterSpacing: '0.45em',
          color: 'rgba(245,240,232,0.12)',
          textTransform: 'uppercase',
          whiteSpace: 'nowrap',
          pointerEvents: 'none',
        }}
        initial={{ opacity: 0 }}
        animate={p2 ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 1.2, delay: 0.5 }}
      >
        Luxury Wedding &amp; Portrait · Chennai · India
      </motion.div>

    </motion.div>
  )
}
