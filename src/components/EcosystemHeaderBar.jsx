import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { ScenvyLogoIcon } from '@/components/ScenvyLogo'
import { ScenvyAppIcon } from '@/components/ScenvyBrandShowcase'
import { Sparkles, ArrowRight } from 'lucide-react'
import { db } from '@/lib/firebase'
import { doc, getDoc, onSnapshot } from 'firebase/firestore'

export function EcosystemHeaderBar({ announcementText, announcementLink, isAnnouncementEnabled }) {
  const nav = useNavigate()
  const [globalConfig, setGlobalConfig] = useState({
    announcementText: announcementText || '✨ NEU: KI Reel-Generator 2.0 ist live',
    announcementLink: announcementLink || 'https://app.scenvy.de',
    isAnnouncementEnabled: isAnnouncementEnabled ?? true
  })

  useEffect(() => {
    // Realtime sync from Firestore global settings if available
    try {
      const unsub = onSnapshot(doc(db, 'scenvy_global_settings', 'main'), (snap) => {
        if (snap.exists()) {
          const data = snap.data()
          setGlobalConfig(prev => ({
            ...prev,
            announcementText: data.announcementText || prev.announcementText,
            announcementLink: data.announcementLink || prev.announcementLink,
            isAnnouncementEnabled: data.isAnnouncementEnabled ?? prev.isAnnouncementEnabled
          }))
        }
      }, (err) => console.warn('Global settings sync notice:', err))
      return () => unsub()
    } catch (e) {
      // fallback
    }
  }, [])

  const modules = [
    { id: 'board', name: 'Board', status: 'active', path: '/board' },
    { id: 'flow', name: 'Flow', status: 'active', path: '/flow' },
    { id: 'menu', name: 'Menu', status: 'active', path: '/menu' },
    { id: 'host', name: 'Host', status: 'planned', path: '/host' },
    { id: 'link', name: 'Link', status: 'planned', path: '/link' },
    { id: 'store', name: 'Store', status: 'planned', path: '/store' },
    { id: 'magic', name: 'Magic', status: 'planned', path: '/magic' }
  ]

  return (
    <div style={{
      background: 'rgba(11, 15, 25, 0.98)',
      borderBottom: '1px solid rgba(255,255,255,0.1)',
      padding: '10px 4%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      position: 'relative',
      zIndex: 102,
      gap: 16,
      flexWrap: 'wrap'
    }}>
      {/* LEFT: ENLARGED HOME ICON & 7 ENLARGED APP ICONS */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
        {/* Scenvy Home Logo Icon - Doubled Size */}
        <div 
          onClick={() => nav('/')} 
          style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', transition: 'transform 0.15s' }}
          title="scenvy.de — Hauptseite"
          onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.08)'}
          onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
        >
          <ScenvyLogoIcon size={52} />
        </div>

        <div style={{ width: 1, height: 36, background: 'rgba(255,255,255,0.15)' }} />

        {/* 7 App Icons Row - Doubled Icon Size (50px) */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, overflowX: 'auto', padding: '2px 0' }}>
          {modules.map((m) => {
            const isActive = m.status === 'active'
            return (
              <div
                key={m.id}
                onClick={() => nav(m.path)}
                title={`SCENVY ${m.name} ${isActive ? '' : '(In Vorbereitung)'}`}
                style={{
                  cursor: 'pointer',
                  position: 'relative',
                  display: 'flex',
                  alignItems: 'center',
                  transition: 'transform 0.15s, filter 0.15s',
                  opacity: isActive ? 1 : 0.65,
                  filter: isActive ? 'drop-shadow(0 4px 12px rgba(124,58,237,0.3))' : 'grayscale(0.3)'
                }}
                onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.12)'}
                onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
              >
                <ScenvyAppIcon module={m.id} size={50} style={{ borderRadius: 12 }} />
              </div>
            )
          })}
        </div>
      </div>

      {/* RIGHT SIDE: ANNOUNCEMENT TICKER IN FIRST LINE & SCENVY.APP BADGE */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
        {globalConfig.isAnnouncementEnabled && (
          <a
            href={globalConfig.announcementLink}
            target={globalConfig.announcementLink.startsWith('http') ? '_blank' : '_self'}
            rel="noreferrer"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              padding: '6px 14px',
              borderRadius: 20,
              background: 'linear-gradient(135deg, rgba(124,58,237,0.3) 0%, rgba(236,72,153,0.3) 100%)',
              border: '1px solid rgba(236,72,153,0.5)',
              color: '#FFFFFF',
              fontSize: 12,
              fontWeight: 800,
              textDecoration: 'none',
              boxShadow: '0 4px 15px rgba(124,58,237,0.25)',
              transition: 'transform 0.15s, boxShadow 0.15s'
            }}
            onMouseEnter={e => {
              e.currentTarget.style.transform = 'scale(1.03)'
              e.currentTarget.style.boxShadow = '0 6px 20px rgba(236,72,153,0.4)'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform = 'scale(1)'
              e.currentTarget.style.boxShadow = '0 4px 15px rgba(124,58,237,0.25)'
            }}
          >
            <Sparkles size={14} color="#F472B6" />
            <span>{globalConfig.announcementText}</span>
            <ArrowRight size={12} color="#F472B6" />
          </a>
        )}

        <span style={{ 
          fontSize: 11, 
          fontWeight: 800, 
          color: 'rgba(255,255,255,0.7)', 
          textTransform: 'uppercase', 
          letterSpacing: 1.2,
          padding: '4px 10px',
          borderRadius: 8,
          background: 'rgba(255,255,255,0.06)',
          border: '1px solid rgba(255,255,255,0.1)'
        }}>
          scenvy.app
        </span>
      </div>
    </div>
  )
}


