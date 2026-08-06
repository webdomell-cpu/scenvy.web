import { useState } from 'react'
import { C, grad } from '@/tokens'
import { ScenvyLogoFull } from '@/components/ScenvyLogo'
import { X, ExternalLink, ShieldCheck, Mail, Lock, User, Building, ArrowRight } from 'lucide-react'

export default function AppAuthModal({ isOpen, onClose, initialMode = 'login' }) {
  const [mode, setMode] = useState(initialMode) // 'login' | 'register'
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [venue, setVenue] = useState('')
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  if (!isOpen) return null

  const handleSubmit = (e) => {
    e.preventDefault()
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      setSuccess(true)
    }, 900)
  }

  const handleExternalRedirect = () => {
    window.open('https://app.sv.de', '_blank')
  }

  return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(16px)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20, fontFamily: 'Inter, sans-serif' }}>
      
      <div style={{ background: '#0D0D16', border: '1px solid rgba(255,255,255,0.15)', borderRadius: 24, width: '100%', maxWidth: 460, boxShadow: '0 25px 70px rgba(0,0,0,0.9)', overflow: 'hidden', position: 'relative' }}>
        
        {/* Modal Window Header */}
        <div style={{ background: '#131221', padding: '14px 20px', borderBottom: '1px solid rgba(255,255,255,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#EF4444' }} />
            <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#F59E0B' }} />
            <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#10B981' }} />
            <span style={{ fontSize: 12, color: '#94A3B8', fontWeight: 700, marginLeft: 8, display: 'flex', alignItems: 'center', gap: 4 }}>
              🔒 app.sv.de
            </span>
          </div>

          <button onClick={onClose} style={{ background: 'none', border: 'none', color: '#94A3B8', cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
            <X size={18} />
          </button>
        </div>

        <div style={{ padding: '28px 28px 32px' }}>
          
          <div style={{ textAlign: 'center', marginBottom: 24 }}>
            <ScenvyLogoFull height={46} style={{ margin: '0 auto 10px' }} />
            <div style={{ fontSize: 13, color: '#94A3B8' }}>
              {mode === 'login' ? 'Willkommen zurück im SCENVY Ecosystem' : 'Neuen Account auf app.sv.de erstellen'}
            </div>
          </div>

          {success ? (
            <div style={{ textAlign: 'center', padding: '20px 10px' }}>
              <div style={{ fontSize: 50, marginBottom: 12 }}>🚀</div>
              <h3 style={{ fontSize: 20, fontWeight: 900, marginBottom: 8 }}>Weiterleitung zu app.sv.de</h3>
              <p style={{ fontSize: 13, color: '#94A3B8', marginBottom: 24, lineHeight: 1.5 }}>
                Vielen Dank! Sie werden jetzt zu Ihrer SCENVY Web-Applikation auf <strong>app.sv.de</strong> weitergeleitet.
              </p>
              <button
                onClick={handleExternalRedirect}
                style={{ width: '100%', padding: '14px 0', borderRadius: 12, border: 'none', background: grad(C.purple, C.pink), color: '#FFF', fontWeight: 800, fontSize: 15, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}
              >
                Weiter zu app.sv.de öffnen <ExternalLink size={16} />
              </button>
            </div>
          ) : (
            <>
              {/* Tab Switcher */}
              <div style={{ display: 'flex', background: 'rgba(255,255,255,0.05)', borderRadius: 12, padding: 4, marginBottom: 20 }}>
                <button
                  onClick={() => setMode('login')}
                  style={{ flex: 1, padding: '9px 0', borderRadius: 9, border: 'none', background: mode === 'login' ? C.purple : 'transparent', color: mode === 'login' ? '#FFF' : '#94A3B8', fontWeight: 800, fontSize: 13, cursor: 'pointer', transition: 'all 0.2s' }}
                >
                  Anmelden (Sign-In)
                </button>
                <button
                  onClick={() => setMode('register')}
                  style={{ flex: 1, padding: '9px 0', borderRadius: 9, border: 'none', background: mode === 'register' ? C.purple : 'transparent', color: mode === 'register' ? '#FFF' : '#94A3B8', fontWeight: 800, fontSize: 13, cursor: 'pointer', transition: 'all 0.2s' }}
                >
                  Registrieren (Sign-Up)
                </button>
              </div>

              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                {mode === 'register' && (
                  <>
                    <div>
                      <label style={{ fontSize: 11, color: '#94A3B8', fontWeight: 700, display: 'block', marginBottom: 4 }}>VOLLSTÄNDIGER NAME</label>
                      <input
                        required
                        type="text"
                        placeholder="Max Mustermann"
                        value={name}
                        onChange={e => setName(e.target.value)}
                        style={{ width: '100%', padding: '11px 14px', borderRadius: 10, border: '1px solid rgba(255,255,255,0.12)', background: 'rgba(0,0,0,0.5)', color: '#FFF', fontSize: 13, outline: 'none' }}
                      />
                    </div>

                    <div>
                      <label style={{ fontSize: 11, color: '#94A3B8', fontWeight: 700, display: 'block', marginBottom: 4 }}>RESTAURANT / HOTEL / VENUE NAME</label>
                      <input
                        type="text"
                        placeholder="z.B. Rooftop Lounge Munich"
                        value={venue}
                        onChange={e => setVenue(e.target.value)}
                        style={{ width: '100%', padding: '11px 14px', borderRadius: 10, border: '1px solid rgba(255,255,255,0.12)', background: 'rgba(0,0,0,0.5)', color: '#FFF', fontSize: 13, outline: 'none' }}
                      />
                    </div>
                  </>
                )}

                <div>
                  <label style={{ fontSize: 11, color: '#94A3B8', fontWeight: 700, display: 'block', marginBottom: 4 }}>E-MAIL ADRESSE</label>
                  <input
                    required
                    type="email"
                    placeholder="name@venue.de"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    style={{ width: '100%', padding: '11px 14px', borderRadius: 10, border: '1px solid rgba(255,255,255,0.12)', background: 'rgba(0,0,0,0.5)', color: '#FFF', fontSize: 13, outline: 'none' }}
                  />
                </div>

                <div>
                  <label style={{ fontSize: 11, color: '#94A3B8', fontWeight: 700, display: 'block', marginBottom: 4 }}>PASSWORT</label>
                  <input
                    required
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    style={{ width: '100%', padding: '11px 14px', borderRadius: 10, border: '1px solid rgba(255,255,255,0.12)', background: 'rgba(0,0,0,0.5)', color: '#FFF', fontSize: 13, outline: 'none' }}
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  style={{ width: '100%', padding: '14px 0', borderRadius: 12, border: 'none', background: grad(C.purple, C.pink), color: '#FFF', fontWeight: 900, fontSize: 15, cursor: loading ? 'wait' : 'pointer', marginTop: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}
                >
                  {loading ? 'Wird geöffnet...' : (mode === 'login' ? 'Anmelden auf app.sv.de →' : 'Kostenlos Registrieren →')}
                </button>
              </form>

              <div style={{ marginTop: 20, paddingTop: 16, borderTop: '1px solid rgba(255,255,255,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'between', fontSize: 12, color: '#94A3B8' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}><ShieldCheck size={14} color="#10B981" /> 256-Bit SSL Verschlüsselt</span>
                <button onClick={handleExternalRedirect} style={{ background: 'none', border: 'none', color: C.purple, fontWeight: 700, cursor: 'pointer', textDecoration: 'underline', fontSize: 12, marginLeft: 'auto' }}>
                  Direkt app.sv.de öffnen ↗
                </button>
              </div>
            </>
          )}

        </div>
      </div>

    </div>
  )
}
