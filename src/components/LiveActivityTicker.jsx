import { useState, useEffect } from 'react'
import { C } from '@/tokens'
import { Flame, Sparkles, Tv, CheckCircle, X } from 'lucide-react'

export function LiveActivityTicker() {
  const [isVisible, setIsVisible] = useState(true)
  const [currentIdx, setCurrentIdx] = useState(0)

  const activities = [
    { text: 'Ein Restaurant aus München hat gerade die Gastronomie-Reel-Engine gestartet', icon: Flame, color: '#EC4899' },
    { text: 'Boutique-Hotel in Wien hat 4 SCENVY Digital Boards verbunden', icon: Tv, color: '#3B82F6' },
    { text: 'Rooftop Bar in Hamburg schaltete den 2-for-1 Happy Hour Reel frei', icon: Sparkles, color: '#7C3AED' },
    { text: 'Pizzeria in Berlin hat 18 neue Scan-to-Order QR Aufsteller gedruckt', icon: CheckCircle, color: '#10B981' }
  ]

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIdx((prev) => (prev + 1) % activities.length)
    }, 6500)
    return () => clearInterval(timer)
  }, [activities.length])

  if (!isVisible) return null

  const item = activities[currentIdx]
  const IconComponent = item.icon

  return (
    <div style={{
      position: 'fixed',
      bottom: 24,
      left: 24,
      zIndex: 999,
      maxWidth: 360,
      background: 'rgba(15,23,42,0.92)',
      backdropFilter: 'blur(16px)',
      borderRadius: 16,
      border: `1px solid ${item.color}55`,
      padding: '12px 16px',
      boxShadow: `0 10px 30px rgba(0,0,0,0.6)`,
      display: 'flex',
      alignItems: 'center',
      gap: 12,
      animation: 'fadeInUp 0.4s ease-out'
    }}>
      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      <div style={{
        width: 36,
        height: 36,
        borderRadius: 10,
        background: `${item.color}22`,
        border: `1px solid ${item.color}55`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0
      }}>
        <IconComponent size={18} color={item.color} />
      </div>

      <div style={{ flex: 1, fontSize: 12, color: C.white, lineHeight: 1.4 }}>
        <div style={{ fontSize: 10, fontWeight: 800, color: item.color, letterSpacing: 0.5, textTransform: 'uppercase' }}>
          LIVE ACTIVITY
        </div>
        <div>{item.text}</div>
      </div>

      <button
        onClick={() => setIsVisible(false)}
        style={{
          background: 'transparent',
          border: 'none',
          color: C.dim,
          cursor: 'pointer',
          padding: 2,
          display: 'flex',
          alignItems: 'center'
        }}
        title="Schließen"
      >
        <X size={14} />
      </button>
    </div>
  )
}
