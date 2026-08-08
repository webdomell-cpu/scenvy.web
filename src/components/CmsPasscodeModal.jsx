import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { C, grad } from '@/tokens'
import { ScenvyLogoFull } from '@/components/ScenvyLogo'
import { X, Lock, Key, ArrowRight, ShieldAlert, Eye, EyeOff } from 'lucide-react'

export default function CmsPasscodeModal({ isOpen, onClose }) {
  const navigate = useNavigate()
  const [passcode, setPasscode] = useState('')
  const [showPass, setShowPass] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  if (!isOpen) return null

  const handleVerify = (e) => {
    if (e) e.preventDefault()
    setError('')
    setLoading(true)

    setTimeout(() => {
      if (passcode.trim() === '150815') {
        sessionStorage.setItem('scenvy_cms_unlocked', 'true')
        localStorage.setItem('scenvy_cms_unlocked', 'true')
        setLoading(false)
        onClose()
        navigate('/website-studio')
      } else {
        setLoading(false)
        setError('❌ Falsches Passwort. Bitte 150815 eingeben.')
      }
    }, 300)
  }

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      background: 'rgba(0,0,0,0.88)',
      backdropFilter: 'blur(16px)',
      zIndex: 1000,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 20,
      fontFamily: 'Inter, sans-serif'
    }}>
      <div style={{
        background: '#0D0D16',
        border: '1px solid rgba(255,255,255,0.18)',
        borderRadius: 24,
        width: '100%',
        maxWidth: 420,
        boxShadow: '0 25px 70px rgba(0,0,0,0.9)',
        overflow: 'hidden',
        position: 'relative'
      }}>
        {/* Header */}
        <div style={{
          background: '#131221',
          padding: '16px 20px',
          borderBottom: '1px solid rgba(255,255,255,0.08)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <Lock size={16} color={C.purple} />
            <span style={{ fontSize: 13, color: C.white, fontWeight: 700 }}>
              Website Studio Admin Freischaltung
            </span>
          </div>

          <button onClick={onClose} style={{ background: 'none', border: 'none', color: C.muted, cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
            <X size={18} />
          </button>
        </div>

        <div style={{ padding: '28px 24px' }}>
          <div style={{ textAlign: 'center', marginBottom: 24 }}>
            <ScenvyLogoFull height={42} style={{ margin: '0 auto 12px' }} />
            <div style={{ fontSize: 18, fontWeight: 800, color: C.white, marginBottom: 6 }}>
              Passwort erforderlich
            </div>
            <div style={{ fontSize: 13, color: C.muted, lineHeight: 1.5 }}>
              Bitte gib das Passwort ein, um den Website Studio Editor zu öffnen.
            </div>
          </div>

          <form onSubmit={handleVerify} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div>
              <label style={{ fontSize: 11, fontWeight: 800, color: C.muted, display: 'block', marginBottom: 6, letterSpacing: 1 }}>
                ADMIN PASSWORT
              </label>
              <div style={{ position: 'relative' }}>
                <input
                  type={showPass ? 'text' : 'password'}
                  autoFocus
                  value={passcode}
                  onChange={e => { setPasscode(e.target.value); setError('') }}
                  placeholder="Passwort eingeben..."
                  style={{
                    width: '100%',
                    padding: '12px 42px 12px 14px',
                    borderRadius: 12,
                    border: error ? `1px solid ${C.pink}` : `1px solid ${C.border}`,
                    background: C.bg,
                    color: C.white,
                    fontSize: 15,
                    fontFamily: 'monospace',
                    outline: 'none'
                  }}
                />
                <button
                  type="button"
                  onClick={() => setShowPass(s => !s)}
                  style={{
                    position: 'absolute',
                    right: 12,
                    top: '50%',
                    transform: 'translateY(-50%)',
                    background: 'none',
                    border: 'none',
                    color: C.muted,
                    cursor: 'pointer'
                  }}
                >
                  {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {error && (
              <div style={{
                background: 'rgba(244,63,94,0.15)',
                border: '1px solid rgba(244,63,94,0.4)',
                borderRadius: 10,
                padding: '10px 14px',
                color: '#FDA4AF',
                fontSize: 12,
                fontWeight: 600,
                display: 'flex',
                alignItems: 'center',
                gap: 8
              }}>
                <ShieldAlert size={16} shrink={0} />
                <span>{error}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              style={{
                width: '100%',
                padding: '13px 0',
                borderRadius: 12,
                border: 'none',
                background: grad(C.purple, C.pink),
                color: C.white,
                fontWeight: 800,
                fontSize: 14,
                cursor: loading ? 'wait' : 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 8,
                marginTop: 4,
                boxShadow: `0 8px 24px ${C.purple}55`
              }}
            >
              {loading ? 'Prüfe Passwort...' : <>Website Studio Öffnen <ArrowRight size={16} /></>}
            </button>
          </form>

          <div style={{ textAlign: 'center', marginTop: 18 }}>
            <span style={{ fontSize: 11, color: C.dim }}>
              Standard Admin-Code: <strong style={{ color: C.purple, fontFamily: 'monospace' }}>150815</strong>
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
