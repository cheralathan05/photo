import { useState, useEffect, useRef } from 'react'

export default function CustomCursor() {
  const dotRef = useRef(null)
  const ringRef = useRef(null)
  const pos = useRef({ x: 0, y: 0 })
  const ringPos = useRef({ x: 0, y: 0 })
  const rafId = useRef(null)

  useEffect(() => {
    const isMobile = window.matchMedia('(max-width: 768px)').matches
    if (isMobile) return

    const moveCursor = (e) => {
      pos.current = { x: e.clientX, y: e.clientY }
      if (dotRef.current) {
        dotRef.current.style.left = `${e.clientX}px`
        dotRef.current.style.top = `${e.clientY}px`
      }
    }

    const animateRing = () => {
      ringPos.current.x += (pos.current.x - ringPos.current.x) * 0.12
      ringPos.current.y += (pos.current.y - ringPos.current.y) * 0.12
      if (ringRef.current) {
        ringRef.current.style.left = `${ringPos.current.x}px`
        ringRef.current.style.top = `${ringPos.current.y}px`
      }
      rafId.current = requestAnimationFrame(animateRing)
    }

    const onHoverStart = () => ringRef.current?.classList.add('hovering')
    const onHoverEnd = () => ringRef.current?.classList.remove('hovering')

    window.addEventListener('mousemove', moveCursor)
    rafId.current = requestAnimationFrame(animateRing)

    const hoverEls = document.querySelectorAll('a, button, [data-cursor-hover]')
    hoverEls.forEach(el => {
      el.addEventListener('mouseenter', onHoverStart)
      el.addEventListener('mouseleave', onHoverEnd)
    })

    // Re-attach on DOM changes
    const observer = new MutationObserver(() => {
      const els = document.querySelectorAll('a, button, [data-cursor-hover]')
      els.forEach(el => {
        el.removeEventListener('mouseenter', onHoverStart)
        el.removeEventListener('mouseleave', onHoverEnd)
        el.addEventListener('mouseenter', onHoverStart)
        el.addEventListener('mouseleave', onHoverEnd)
      })
    })
    observer.observe(document.body, { childList: true, subtree: true })

    return () => {
      window.removeEventListener('mousemove', moveCursor)
      cancelAnimationFrame(rafId.current)
      observer.disconnect()
    }
  }, [])

  return (
    <>
      <div ref={dotRef} className="cursor-dot hidden md:block" />
      <div ref={ringRef} className="cursor-ring hidden md:block" />
    </>
  )
}
