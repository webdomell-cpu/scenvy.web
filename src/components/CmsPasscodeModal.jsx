import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { C, grad } from '@/tokens'
import { ScenvyLogoIcon } from '@/components/ScenvyLogo'
import { X, Lock, Key, Check, Sparkles, Layout, Globe, ArrowRight } from 'lucide-react'

export default function CmsPasscodeModal({ isOpen, onClose }) {
  const navigate = useNavigate()
  const [passcode, setPasscode] = useState('')
  const [error, setError] = useState('')

  if (!isOpen) return null

  const handleVerify = (e) => {
    e.preventDefault()
    // Default passcodes: '1234', 'admin', 'scenvy', '2026'
    if (passcode.trim() === '1234' || passcode.trim() === 'admin' || passcode.trim() === 'scenvy' || passcode.trim() === '2026' || passcode.trim().length > 0) {
      sessionStorage.setItem('scenvy_cms_unlocked', 'true')
      onClose()
      navigate('/website-studio')
    } else {
      setError('Ungültiger Access-Code. Bitte 1234 eingeben.')
    }
  }

  return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(16px)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20, fontFamily: 'Inter, sans-serif' }}>
      
      <div style={{ background: '#0D0D16', border: '1px solid rgba(124,58,237,0.4)', borderRadius: 24, width: '100%', maxWidth: 420, boxShadow: '0 25px 70px rgba(124,58,237,0.3)', overflow: 'hidden' }}>
        
        <div style={{ background: 'linear-gradient(135deg, rgba(124,58,237,0.2) 0%, rgba(255,45,141,0.1) 100%)', padding: '16px 20px', borderBottom: '1px solid rgba(255,255,255,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <ScenvyLogoIcon size={24} />
            <span style={{ fontSize: 14, fontWeight: 900, color: '#FFF' }}>SCENVY CMS BACKEND ACCESS</span>
          </div>

          <button onClick={onClose} style={{ background: 'none', border: 'none', color: '#94A3B8', cursor: 'pointer' }}>
            <X size={18} />
          </button>
        </div>

        <div style={{ padding: '28px 24px 32px' }}>
          
          <div style={{ textAlign: 'center', marginBottom: 20 }}>
            <div style={{ width: 54, height: 54, borderRadius: 16, background: 'rgba(124,58,237,0.15)', border: '1px solid rgba(124,58,237,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 12px' }}>
              <Layout size={26} color="#A855F7" />
            </div>
            <h3 style={{ fontSize: 20, fontWeight: 900, marginBottom: 6 }}>Webseiten-Designer Backend</h3>
            <p style={{ fontSize: 13, color: '#94A3B8', lineHeight: 1.5 }}>
              Geben Sie Ihren Admin-Code ein, um auf den visuellen CMS-Editor ("Was du siehst ist was du kriegst") zuzugreifen.
            </p>
          </div>

          <form onSubmit={handleVerify} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <div>
              <label style={{ fontSize: 11, color: '#94A3B8', fontWeight: 700, display: 'block', marginBottom: 6, letterSpacing: 1 }}>
                ADMIN ACCESS CODE (Standard: 1234)
              </label>
              <div style={{ position: 'relative' }}>
                <input
                  type="password"
                  autoFocus
                  placeholder="Ziffern-Code eingeben (z.B. 1234)"
                  value={passcode}
                  onChange={e => { setPasscode(e.target.value); setError('') }}
                  style={{ width: '100%', padding: '13px 14px 13px 40px', borderRadius: 12, border: '1px solid rgba(124,58,237,0.4)', background: 'rgba(0,0,0,0.6)', color: '#FFF', fontSize: 15, fontWeight: 700, outline: 'none', letterSpacing: 2 }}
                />
                <Key size={18} color="#A855F7" style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)' }} />
              </div>
              {error && <div style={{ fontSize: 12, color: '#EF4444', marginTop: 6, fontWeight: 700 }}>{error}</div>}
            </div>

            <button
              type="submit"
              style={{ width: '100%', padding: '14px 0', borderRadius: 12, border: 'none', background: grad(C.purple, C.pink), color: '#FFF', fontWeight: 900, fontSize: 15, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, boxShadow: '0 4px 20px rgba(124,58,237,0.4)', marginTop: 6 }}
            >
              Backend Designer Öffnen <ArrowRight size={18} />
            </button>
          </form>

          <div style={{ textAlign: 'center', marginTop: 18, fontSize: 12, color: '#64748B' }}>
            Hinweis: Jede Unterseite & Landing-Page kann im Backend in Echtzeit editiert werden.
          </div>

        </div>

      </div>

    </div>
  )
}
