import { useState, useEffect } from 'react'
import { C } from '@/tokens'
import { Flame, Sparkles, Tv, CheckCircle, X } from 'lucide-react'
import { db } from '@/lib/firebase'
import { doc, onSnapshot } from 'firebase/firestore'

export function LiveActivityTicker({ lang = 'de' }) {
  const [isVisible, setIsVisible] = useState(true)
  const [isEnabled, setIsEnabled] = useState(true)
  const [intervalSec, setIntervalSec] = useState(6)
  const [currentIdx, setCurrentIdx] = useState(0)

  const defaultDe = [
    { text: 'Ein Restaurant aus München hat gerade die Gastronomie-Reel-Engine gestartet', icon: 'Flame', color: '#EC4899' },
    { text: 'Boutique-Hotel in Wien hat 4 SCENVY Digital Boards verbunden', icon: 'Tv', color: '#3B82F6' },
    { text: 'Rooftop Bar in Hamburg schaltete den 2-for-1 Happy Hour Reel frei', icon: 'Sparkles', color: '#7C3AED' },
    { text: 'Pizzeria in Berlin hat 18 neue Scan-to-Order QR Aufsteller gedruckt', icon: 'CheckCircle', color: '#10B981' }
  ]

  const defaultEn = [
    { text: 'A restaurant in Munich just launched the SCENVY Reel Engine', icon: 'Flame', color: '#EC4899' },
    { text: 'Boutique Hotel in Vienna connected 4 SCENVY Digital Boards', icon: 'Tv', color: '#3B82F6' },
    { text: 'Rooftop Bar in Hamburg activated a 2-for-1 Happy Hour Reel', icon: 'Sparkles', color: '#7C3AED' },
    { text: 'Pizzeria in Berlin printed 18 new Scan-to-Order QR displays', icon: 'CheckCircle', color: '#10B981' }
  ]

  const [activities, setActivities] = useState(lang === 'en' ? defaultEn : defaultDe)

  useEffect(() => {
    setActivities(lang === 'en' ? defaultEn : defaultDe)
  }, [lang])

  useEffect(() => {
    // Sync settings from Firestore global config
    try {
      const unsub = onSnapshot(doc(db, 'scenvy_global_settings', 'main'), (snap) => {
        if (snap.exists()) {
          const data = snap.data()
          if (typeof data.isLiveTickerEnabled === 'boolean') {
            setIsEnabled(data.isLiveTickerEnabled)
          }
          if (data.liveTickerSpeedSec) {
            setIntervalSec(Number(data.liveTickerSpeedSec) || 6)
          }
          if (Array.isArray(data.liveTickerMessages) && data.liveTickerMessages.length > 0) {
            setActivities(data.liveTickerMessages)
          }
        }
      }, (err) => console.warn('Ticker sync note:', err))
      return () => unsub()
    } catch (e) {
      // fallback
    }
  }, [])

  useEffect(() => {
    if (!isEnabled || activities.length === 0) return
    const timer = setInterval(() => {
      setCurrentIdx((prev) => (prev + 1) % activities.length)
    }, Math.max(2, intervalSec) * 1000)
    return () => clearInterval(timer)
  }, [activities.length, intervalSec, isEnabled])

  if (!isVisible || !isEnabled || activities.length === 0) return null

  const item = activities[currentIdx] || activities[0]
  
  // Icon selector
  const getIcon = (iconName) => {
    switch (iconName) {
      case 'Tv': return Tv
      case 'Sparkles': return Sparkles
      case 'CheckCircle': return CheckCircle
      default: return Flame
    }
  }

  const IconComponent = getIcon(item.icon)

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
      border: `1px solid ${item.color || '#7C3AED'}55`,
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
        background: `${item.color || '#7C3AED'}22`,
        border: `1px solid ${item.color || '#7C3AED'}55`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0
      }}>
        <IconComponent size={18} color={item.color || '#7C3AED'} />
      </div>

      <div style={{ flex: 1, fontSize: 12, color: C.white, lineHeight: 1.4 }}>
        <div style={{ fontSize: 10, fontWeight: 800, color: item.color || '#7C3AED', letterSpacing: 0.5, textTransform: 'uppercase' }}>
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

