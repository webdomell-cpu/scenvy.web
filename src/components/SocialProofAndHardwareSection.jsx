import { useState } from 'react'
import { C, grad } from '@/tokens'
import { Tv, Monitor, Smartphone, Check, X, ShieldCheck, Star, Play, Sparkles } from 'lucide-react'

export function SocialProofAndHardwareSection({ onOpenAuth, lang = 'de' }) {
  const [activeVideoModal, setActiveVideoModal] = useState(null)

  const hardwareRows = [
    { name: 'Hardware-Anschaffungskosten', traditional: '350 € – 600 € / Screen', scenvy: '0 € (Vorhandener Smart-TV)' },
    { name: 'Spezial-Player Hardware Zwang', traditional: 'Ja (Proprietäre Box)', scenvy: 'Nein (100% Web-URL)' },
    { name: 'Einrichtungsdauer', traditional: '3-5 Tage + Techniker', scenvy: 'Unter 5 Minuten' },
    { name: 'Content-Erstellung', traditional: 'Aufwendige Designer / USB-Sticks', scenvy: 'Integrierte KI + Smartphone' },
    { name: 'Gäste-Interaktion & QR-Code', traditional: 'Nur statisches Bild', scenvy: 'TikTok-Reels & Scan-to-Order' }
  ]

  const videoTestimonials = [
    {
      id: 1,
      name: 'Michael Stern',
      role: 'Inhaber, Sternenbräu Restaurant',
      quote: 'Die Tische-Ordering Reels sind der Wahnsinn. Der Zusatzumsatz hat uns überwältigt.',
      img: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=600&q=80',
      badge: 'Gastronomie'
    },
    {
      id: 2,
      name: 'Elena Rossi',
      role: 'General Manager, Boutique Hotel Vista',
      quote: 'Wir steuern alle Lobby-Screens und Frühstücks-Menüs in Sekundenschnelle.',
      img: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=600&q=80',
      badge: 'Hotellerie'
    }
  ]

  return (
    <section id="hardware-and-proof" style={{
      padding: '80px 20px',
      background: '#0A0D18',
      borderBottom: `1px solid ${C.border}`
    }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: 50 }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 8,
            padding: '6px 16px',
            borderRadius: 20,
            background: 'rgba(16,185,129,0.18)',
            border: '1px solid rgba(16,185,129,0.4)',
            color: '#34D399',
            fontSize: 12,
            fontWeight: 800,
            letterSpacing: 1,
            marginBottom: 16
          }}>
            <Tv size={14} color="#34D399" />
            {lang === 'de' ? 'HARDWARE-UNABHÄNGIGKEIT & PROOF' : 'HARDWARE FREEDOM & PROOF'}
          </div>

          <h2 style={{ fontSize: 'clamp(28px, 4vw, 42px)', fontWeight: 900, color: C.white, lineHeight: 1.25, marginBottom: 16 }}>
            {lang === 'de' ? 'Keine teuren Spezial-Player nötig' : 'No Pricey Proprietary Hardware Needed'}
          </h2>

          <p style={{ fontSize: 16, color: C.muted, maxWidth: 660, margin: '0 auto', lineHeight: 1.6 }}>
            {lang === 'de' 
              ? 'Nutze einfach deine bereits vorhandenen Fernseher, Fire TV Sticks, Tablets oder PC-Monitore. SCENVY läuft direkt im Browser.'
              : 'Use your existing Smart TVs, Fire TV Sticks, tablets or PC monitors. SCENVY runs 100% inside any browser.'}
          </p>
        </div>

        {/* Hardware Comparison Table */}
        <div style={{
          background: 'rgba(15,23,42,0.8)',
          borderRadius: 24,
          border: '1px solid rgba(255,255,255,0.1)',
          overflow: 'hidden',
          marginBottom: 60,
          boxShadow: '0 20px 40px rgba(0,0,0,0.5)'
        }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr style={{ background: 'rgba(255,255,255,0.05)', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                <th style={{ padding: '20px 24px', fontSize: 14, fontWeight: 800, color: C.white }}>Feature / Kriterium</th>
                <th style={{ padding: '20px 24px', fontSize: 14, fontWeight: 800, color: C.muted }}>Traditionelle Signage-Systeme</th>
                <th style={{ padding: '20px 24px', fontSize: 14, fontWeight: 900, color: C.green, background: 'rgba(16,185,129,0.1)' }}>⚡ SCENVY ECOSYSTEM</th>
              </tr>
            </thead>
            <tbody>
              {hardwareRows.map((row, idx) => (
                <tr key={idx} style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                  <td style={{ padding: '18px 24px', fontSize: 13, fontWeight: 700, color: C.white }}>{row.name}</td>
                  <td style={{ padding: '18px 24px', fontSize: 13, color: C.dim }}>{row.traditional}</td>
                  <td style={{ padding: '18px 24px', fontSize: 13, fontWeight: 800, color: C.green, background: 'rgba(16,185,129,0.05)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                      <Check size={16} color={C.green} />
                      <span>{row.scenvy}</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Interactive Video Testimonials Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 28 }}>
          {videoTestimonials.map((t) => (
            <div key={t.id} style={{
              background: 'rgba(15,23,42,0.6)',
              borderRadius: 20,
              border: '1px solid rgba(255,255,255,0.08)',
              padding: 20,
              display: 'flex',
              gap: 16,
              alignItems: 'center'
            }}>
              <div style={{ position: 'relative', width: 90, height: 110, borderRadius: 12, overflow: 'hidden', flexShrink: 0 }}>
                <img src={t.img} alt={t.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <div style={{ width: 32, height: 32, borderRadius: '50%', background: grad(C.purple, C.pink), display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Play size={14} fill="#FFF" color="#FFF" />
                  </div>
                </div>
              </div>

              <div>
                <span style={{ fontSize: 10, fontWeight: 900, background: 'rgba(124,58,237,0.2)', color: C.purple, padding: '2px 8px', borderRadius: 6 }}>
                  {t.badge}
                </span>
                <p style={{ fontSize: 13, color: C.white, fontStyle: 'italic', margin: '8px 0 6px', lineHeight: 1.4 }}>
                  "{t.quote}"
                </p>
                <div style={{ fontSize: 12, fontWeight: 800, color: C.white }}>{t.name}</div>
                <div style={{ fontSize: 11, color: C.muted }}>{t.role}</div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
