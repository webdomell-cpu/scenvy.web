import { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { ScenvyLogoIcon } from '@/components/ScenvyLogo'
import { ScenvyAppIcon } from '@/components/ScenvyBrandShowcase'

export function EcosystemHeaderBar({ onOpenAuthModal, lang: parentLang, setLang: parentSetLang }) {
  const nav = useNavigate()
  const [localLang, setLocalLang] = useState(() => localStorage.getItem('scenvy_lang') || 'de')

  const currentLang = parentLang || localLang

  const handleToggleLang = () => {
    const next = currentLang === 'de' ? 'en' : 'de'
    localStorage.setItem('scenvy_lang', next)
    setLocalLang(next)
    if (parentSetLang) {
      parentSetLang(next)
    }
    // Dispatch custom event for cross-component sync
    window.dispatchEvent(new Event('scenvy_lang_changed'))
  }

  useEffect(() => {
    const handleSync = () => {
      const stored = localStorage.getItem('scenvy_lang') || 'de'
      setLocalLang(stored)
      if (parentSetLang) parentSetLang(stored)
    }
    window.addEventListener('scenvy_lang_changed', handleSync)
    return () => window.removeEventListener('scenvy_lang_changed', handleSync)
  }, [parentSetLang])

  const modules = [
    { id: 'flow', name: 'Flow', status: 'active', path: '/flow' },
    { id: 'menu', name: 'Menu', status: 'active', path: '/menu' },
    { id: 'board', name: 'Board', status: 'active', path: '/board' },
    { id: 'host', name: 'Host', status: 'planned', path: '/host' },
    { id: 'link', name: 'Link', status: 'planned', path: '/link' },
    { id: 'store', name: 'Store', status: 'planned', path: '/store' },
    { id: 'magic', name: 'Magic', status: 'planned', path: '/magic' }
  ]

  return (
    <div style={{
      background: 'rgba(11, 15, 25, 0.98)',
      borderBottom: '1px solid rgba(255,255,255,0.08)',
      padding: '6px 4%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      position: 'relative',
      zIndex: 102
    }}>
      {/* LEFT: HOME ICON & 7 APP ICONS ONLY (NO TEXT DOMAINS) */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
        {/* Scenvy Home Logo Icon */}
        <div 
          onClick={() => nav('/')} 
          style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', transition: 'transform 0.15s' }}
          title="scenvy.de — Hauptseite"
          onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.08)'}
          onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
        >
          <ScenvyLogoIcon size={30} />
        </div>

        <div style={{ width: 1, height: 22, background: 'rgba(255,255,255,0.12)' }} />

        {/* 7 App Icons Row */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, overflowX: 'auto' }}>
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
                  transition: 'transform 0.15s',
                  opacity: isActive ? 1 : 0.65,
                  filter: isActive ? 'none' : 'grayscale(0.3)'
                }}
                onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.12)'}
                onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
              >
                <ScenvyAppIcon module={m.id} size={30} style={{ borderRadius: 8 }} />
              </div>
            )
          })}
        </div>
      </div>

      {/* RIGHT: LANGUAGE SWITCHER & LOGIN / GET STARTED CTA */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <button
          onClick={handleToggleLang}
          style={{
            background: 'rgba(255,255,255,0.06)',
            border: '1px solid rgba(255,255,255,0.15)',
            color: '#FFFFFF',
            padding: '4px 10px',
            borderRadius: 8,
            fontSize: 12,
            fontWeight: 800,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: 5,
            transition: 'all 0.2s'
          }}
          title={currentLang === 'de' ? 'Switch to English' : 'Auf Deutsch wechseln'}
        >
          {currentLang === 'de' ? '🇩🇪 DE' : '🇬🇧 EN'}
        </button>

        <button
          onClick={() => {
            if (onOpenAuthModal) onOpenAuthModal()
            else window.location.href = 'https://app.scenvy.de'
          }}
          style={{
            background: 'linear-gradient(135deg, #7C3AED 0%, #3B82F6 100%)',
            border: 'none',
            color: '#FFFFFF',
            padding: '5px 14px',
            borderRadius: 8,
            fontSize: 12,
            fontWeight: 800,
            cursor: 'pointer',
            boxShadow: '0 2px 10px rgba(124,58,237,0.3)',
            whiteSpace: 'nowrap'
          }}
        >
          {currentLang === 'de' ? 'Anmelden / Get Started' : 'Login / Get Started'}
        </button>
      </div>
    </div>
  )
}
