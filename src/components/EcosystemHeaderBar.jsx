import { useNavigate } from 'react-router-dom'
import { ScenvyLogoIcon } from '@/components/ScenvyLogo'
import { ScenvyAppIcon } from '@/components/ScenvyBrandShowcase'

export function EcosystemHeaderBar() {
  const nav = useNavigate()

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
      borderBottom: '1px solid rgba(255,255,255,0.08)',
      padding: '6px 4%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      position: 'relative',
      zIndex: 102
    }}>
      {/* LEFT: HOME ICON & 7 APP ICONS ONLY */}
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

        {/* 7 App Icons Row (Board -> Flow -> Menu -> Host -> Link -> Store -> Magic) */}
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

      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <span style={{ fontSize: 11, fontWeight: 700, color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: 1 }}>
          scenvy.app
        </span>
      </div>
    </div>
  )
}

