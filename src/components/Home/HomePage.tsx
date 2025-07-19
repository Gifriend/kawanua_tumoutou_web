"use client"
import type React from "react"
import { useState, useEffect, useCallback, useRef } from "react"
import { motion, useMotionValue, useSpring } from "framer-motion"
import HeroContent from "./HomeContent"
import WeatherDashboard from "../../components/weather/WeatherDashboard"

interface RippleEffect {
  x: number
  y: number
  size: number
  opacity: number
  maxSize: number
  id: number
}

interface TrailPoint {
  x: number
  y: number
  id: number
  timestamp: number
}

const Home: React.FC = () => {
  const [mousePos, setMousePos] = useState<{ x: number; y: number }>({ x: 0, y: 0 })
  const [ripples, setRipples] = useState<RippleEffect[]>([])
  const [isHovering, setIsHovering] = useState(false)
  const [trailPoints, setTrailPoints] = useState<TrailPoint[]>([])
  const rippleIdRef = useRef(0)
  const trailIdRef = useRef(0)

  // Framer Motion cursor
  const cursorX = useMotionValue(-100)
  const cursorY = useMotionValue(-100)
  const springConfig = { damping: 25, stiffness: 700 }
  const cursorXSpring = useSpring(cursorX, springConfig)
  const cursorYSpring = useSpring(cursorY, springConfig)

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      const x = e.clientX
      const y = e.clientY

      setMousePos({ x, y })
      cursorX.set(x - 16)
      cursorY.set(y - 16)

      // Add new trail point
      const newTrailPoint: TrailPoint = {
        x,
        y,
        id: trailIdRef.current++,
        timestamp: Date.now(),
      }

      setTrailPoints((prev) => [...prev, newTrailPoint].slice(-20)) // Keep last 20 points
    },
    [cursorX, cursorY],
  )

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    if (e.touches.length > 0) {
      const x = e.touches[0].clientX
      const y = e.touches[0].clientY
      setMousePos({ x, y })

      const newTrailPoint: TrailPoint = {
        x,
        y,
        id: trailIdRef.current++,
        timestamp: Date.now(),
      }

      setTrailPoints((prev) => [...prev, newTrailPoint].slice(-20))
    }
  }, [])

  const handleInteraction = useCallback((e: React.MouseEvent | React.TouchEvent) => {
    let x: number, y: number
    if ("clientX" in e) {
      x = e.clientX
      y = e.clientY
    } else {
      x = e.touches[0]?.clientX || 0
      y = e.touches[0]?.clientY || 0
    }

    const newRipple: RippleEffect = {
      x,
      y,
      size: 0,
      opacity: 0.8,
      maxSize: 200,
      id: rippleIdRef.current++,
    }

    setRipples((prev) => [...prev, newRipple].slice(-10))
  }, [])

  // Animate ripples
  useEffect(() => {
    const animateRipples = () => {
      setRipples((prev) =>
        prev
          .map((ripple) => ({
            ...ripple,
            size: ripple.size + 4,
            opacity: ripple.opacity * 0.96,
          }))
          .filter((ripple) => ripple.opacity > 0.05 && ripple.size < ripple.maxSize),
      )
    }

    const interval = setInterval(animateRipples, 16)
    return () => clearInterval(interval)
  }, [])

  // Clean up old trail points
  useEffect(() => {
    const cleanupTrail = () => {
      const now = Date.now()
      setTrailPoints(
        (prev) => prev.filter((point) => now - point.timestamp < 500), // Keep points for 0.5 second
      )
    }

    const interval = setInterval(cleanupTrail, 16) // Run more frequently (60fps)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const handleHover = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (target.closest("button, h1, .group")) {
        setIsHovering(true)
      } else {
        setIsHovering(false)
      }
    }

    document.addEventListener("mouseover", handleHover)
    return () => document.removeEventListener("mouseover", handleHover)
  }, [])

  return (
    <>
      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
                
        .animate-fade-in {
          animation: fade-in 0.8s ease-out forwards;
          opacity: 0;
        }
                
        @keyframes ripple {
          to {
            transform: translate(-50%, -50%) scale(4);
            opacity: 0;
          }
        }
      `}</style>

      <div
        className="bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 relative"
        onMouseMove={handleMouseMove}
        onTouchMove={handleTouchMove}
        onMouseDown={handleInteraction}
        onTouchStart={handleInteraction}
      >
        {/* Mouse Trail */}
        {trailPoints.map((point, index) => {
          const age = Date.now() - point.timestamp
          const opacity = Math.max(0, 1 - age / 500) // Fade over 0.5 second
          const scale = Math.max(0.2, 1 - index * 0.04) // Each point slightly smaller than the previous
          const delay = index * 0.01 // Shorter delay for smoother following

          return (
            <motion.div
              key={point.id}
              className="fixed pointer-events-none z-40"
              initial={{ opacity: 0.8, scale: 0 }}
              animate={{
                opacity: opacity * 0.7,
                scale: scale,
                x: point.x - 4,
                y: point.y - 4,
              }}
              transition={{
                duration: 0.1,
                delay: delay,
                ease: "easeOut",
              }}
            >
              <div
                className="w-2 h-2 rounded-full bg-gradient-to-r from-cyan-400 to-blue-400"
                style={{
                  boxShadow: "0 0 8px rgba(34, 211, 238, 0.5)",
                }}
              />
            </motion.div>
          )
        })}

        {/* Additional trailing particles */}
        {trailPoints.slice(-12).map((point, index) => {
          const age = Date.now() - point.timestamp
          const opacity = Math.max(0, 0.2 - age / 1000)
          const offset = index * 8

          return (
            <motion.div
              key={`trail-${point.id}`}
              className="fixed pointer-events-none z-30"
              initial={{ opacity: 0, scale: 0 }}
              animate={{
                opacity: opacity,
                scale: Math.max(0.1, 0.4 - index * 0.03),
                x: point.x - offset * 0.05,
                y: point.y - offset * 0.05,
              }}
              transition={{
                duration: 0.2,
                delay: index * 0.02,
                ease: "easeOut",
              }}
            >
              <div
                className="w-1 h-1 rounded-full bg-gradient-to-r from-blue-300 to-cyan-300"
                style={{
                  boxShadow: "0 0 6px rgba(56, 189, 248, 0.4)",
                }}
              />
            </motion.div>
          )
        })}

        {/* Background gradients */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 via-transparent to-cyan-600/10" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-slate-900/40" />

        {/* Click ripples */}
        {ripples.map((ripple) => (
          <div
            key={ripple.id}
            className="absolute pointer-events-none rounded-full border-2 border-cyan-400"
            style={{
              left: `${ripple.x}px`,
              top: `${ripple.y}px`,
              width: `${ripple.size}px`,
              height: `${ripple.size}px`,
              opacity: ripple.opacity,
              transform: "translate(-50%, -50%)",
              animation: "ripple 0.6s ease-out",
            }}
          />
        ))}

        <HeroContent />
        <WeatherDashboard />
      </div>
    </>
  )
}

export default Home
