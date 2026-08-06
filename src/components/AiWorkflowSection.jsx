import { useState } from 'react'
import { C, grad } from '@/tokens'
import { Sparkles, Upload, Wand2, Tv, Smartphone, ArrowRight, Check, Flame, Play } from 'lucide-react'

export function AiWorkflowSection({ lang = 'de' }) {
  const [activeTab, setActiveTab] = useState('after') // 'before' | 'after'

  return (
    <section id="ai-workflow" style={{
      padding: '80px 20px',
      background: 'radial-gradient(circle at 50% 0%, rgba(124,58,237,0.1) 0%, rgba(15,23,42,0.95) 70%)',
      borderBottom: `1px solid ${C.border}`,
      position: 'relative'
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
            background: 'rgba(236,72,153,0.18)',
            border: '1px solid rgba(236,72,153,0.4)',
            color: '#F472B6',
            fontSize: 12,
            fontWeight: 800,
            letterSpacing: 1,
            marginBottom: 16
          }}>
            <Sparkles size={14} color="#F472B6" />
            {lang === 'de' ? 'KI-WORKFLOW IN 60 SEKUNDEN' : 'AI WORKFLOW IN 60 SECONDS'}
          </div>

          <h2 style={{ fontSize: 'clamp(28px, 4vw, 42px)', fontWeight: 900, color: C.white, lineHeight: 1.25, marginBottom: 16 }}>
            {lang === 'de' ? 'Keine fertig produzierten Videos? Kein Problem!' : 'No Ready Videos? No Problem!'}
          </h2>

          <p style={{ fontSize: 16, color: C.muted, maxWidth: 660, margin: '0 auto', lineHeight: 1.6 }}>
            {lang === 'de' 
              ? 'Lade einfach ein einfaches Handy-Foto deines Gerichts oder Produkts hoch. Unsere integrierte Gemini & Claude KI verwandelt es automatisch in ein hochauflösendes, animiertes Reel.'
              : 'Simply upload a smartphone photo of your dish or product. Our built-in Gemini AI automatically transforms it into an animated 9:16 reel.'}
          </p>
        </div>

        {/* 3-Step Visual Sequence Cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: 24,
          marginBottom: 60
        }}>
          
          {/* Step 1 */}
          <div style={{
            background: 'rgba(15,23,42,0.7)',
            borderRadius: 20,
            border: '1px solid rgba(255,255,255,0.08)',
            padding: '28px',
            position: 'relative'
          }}>
            <div style={{ width: 44, height: 44, borderRadius: 12, background: 'rgba(59,130,246,0.2)', border: '1px solid rgba(59,130,246,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 16 }}>
              <Upload size={22} color="#3B82F6" />
            </div>
            <div style={{ fontSize: 11, fontWeight: 900, color: '#3B82F6', letterSpacing: 1, textTransform: 'uppercase', marginBottom: 6 }}>
              SCHRITT 1
            </div>
            <h3 style={{ fontSize: 18, fontWeight: 800, color: C.white, marginBottom: 8 }}>
              {lang === 'de' ? 'Foto hochladen' : 'Upload Photo'}
            </h3>
            <p style={{ fontSize: 13, color: C.muted, lineHeight: 1.5 }}>
              {lang === 'de' ? 'Ein einfaches Smartphone-Foto deines Speise-Angebots reicht völlig aus.' : 'A quick smartphone photo of your dish or product is all you need.'}
            </p>
          </div>

          {/* Step 2 */}
          <div style={{
            background: 'linear-gradient(135deg, rgba(124,58,237,0.2) 0%, rgba(236,72,153,0.15) 100%)',
            borderRadius: 20,
            border: '1px solid rgba(168,85,247,0.4)',
            padding: '28px',
            position: 'relative'
          }}>
            <div style={{ width: 44, height: 44, borderRadius: 12, background: 'rgba(236,72,153,0.25)', border: '1px solid rgba(236,72,153,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 16 }}>
              <Wand2 size={22} color="#EC4899" />
            </div>
            <div style={{ fontSize: 11, fontWeight: 900, color: '#EC4899', letterSpacing: 1, textTransform: 'uppercase', marginBottom: 6 }}>
              SCHRITT 2
            </div>
            <h3 style={{ fontSize: 18, fontWeight: 800, color: C.white, marginBottom: 8 }}>
              {lang === 'de' ? 'KI-Zauber & Animation' : 'AI Magic & Animation'}
            </h3>
            <p style={{ fontSize: 13, color: '#E9D5FF', lineHeight: 1.5 }}>
              {lang === 'de' ? 'KI fügt Bewegung, Dampf-Effekte, Typografie, Musik & Markenfarben hinzu.' : 'AI adds motion, steam effects, typography, music & brand colors.'}
            </p>
          </div>

          {/* Step 3 */}
          <div style={{
            background: 'rgba(15,23,42,0.7)',
            borderRadius: 20,
            border: '1px solid rgba(255,255,255,0.08)',
            padding: '28px',
            position: 'relative'
          }}>
            <div style={{ width: 44, height: 44, borderRadius: 12, background: 'rgba(16,185,129,0.2)', border: '1px solid rgba(16,185,129,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 16 }}>
              <Tv size={22} color="#10B981" />
            </div>
            <div style={{ fontSize: 11, fontWeight: 900, color: '#10B981', letterSpacing: 1, textTransform: 'uppercase', marginBottom: 6 }}>
              SCHRITT 3
            </div>
            <h3 style={{ fontSize: 18, fontWeight: 800, color: C.white, marginBottom: 8 }}>
              {lang === 'de' ? 'Sofort live auf allen Screens' : 'Instantly Live Everywhere'}
            </h3>
            <p style={{ fontSize: 13, color: C.muted, lineHeight: 1.5 }}>
              {lang === 'de' ? 'Synchronisiert auf allen Smart-TVs, Digital Boards und Gästegeräten.' : 'Synchronized across all Smart TVs, digital boards, and smartphones.'}
            </p>
          </div>

        </div>

        {/* Before / After Interactive Comparison */}
        <div style={{
          background: 'rgba(10,10,16,0.9)',
          borderRadius: 24,
          border: '1px solid rgba(255,255,255,0.1)',
          padding: '36px',
          boxShadow: '0 20px 40px rgba(0,0,0,0.5)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16, marginBottom: 28 }}>
            <div>
              <h3 style={{ fontSize: 20, fontWeight: 800, color: C.white }}>
                {lang === 'de' ? 'Vorher vs. Nachher KI-Vergleich' : 'Before vs. After AI Comparison'}
              </h3>
              <p style={{ fontSize: 13, color: C.muted }}>
                {lang === 'de' ? 'Klicke auf die Tabs, um den Unterschied zu sehen.' : 'Click tabs to see the transformation.'}
              </p>
            </div>

            {/* Toggle Switch */}
            <div style={{ display: 'flex', background: 'rgba(255,255,255,0.06)', padding: 4, borderRadius: 12, border: '1px solid rgba(255,255,255,0.12)' }}>
              <button
                onClick={() => setActiveTab('before')}
                style={{
                  padding: '8px 18px',
                  borderRadius: 8,
                  border: 'none',
                  background: activeTab === 'before' ? 'rgba(255,255,255,0.15)' : 'transparent',
                  color: activeTab === 'before' ? C.white : C.muted,
                  fontSize: 13,
                  fontWeight: 700,
                  cursor: 'pointer'
                }}
              >
                📷 {lang === 'de' ? 'Statisches Foto (Vorher)' : 'Static Photo (Before)'}
              </button>
              <button
                onClick={() => setActiveTab('after')}
                style={{
                  padding: '8px 18px',
                  borderRadius: 8,
                  border: 'none',
                  background: activeTab === 'after' ? grad(C.purple, C.pink) : 'transparent',
                  color: C.white,
                  fontSize: 13,
                  fontWeight: 800,
                  cursor: 'pointer',
                  boxShadow: activeTab === 'after' ? '0 4px 12px rgba(124,58,237,0.4)' : 'none'
                }}
              >
                ✨ {lang === 'de' ? 'Animiertes KI-Reel (Nachher)' : 'Animated AI Reel (After)'}
              </button>
            </div>
          </div>

          {/* Visual Showcase Box */}
          <div style={{
            position: 'relative',
            borderRadius: 16,
            overflow: 'hidden',
            border: `2px solid ${activeTab === 'after' ? C.pink : C.border}`,
            height: 320
          }}>
            <img
              src="https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=1000&q=80"
              alt="Juicy Gourmet Burger"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                filter: activeTab === 'before' ? 'grayscale(0.3) brightness(0.8)' : 'none'
              }}
            />

            {/* Animated Overlay for AFTER */}
            {activeTab === 'after' && (
              <div style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(124,58,237,0.2) 100%)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                padding: 24
              }}>
                <div style={{ display: 'flex', gap: 8 }}>
                  <span style={{ fontSize: 11, fontWeight: 900, background: C.pink, color: '#FFF', padding: '4px 10px', borderRadius: 6, display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                    <Flame size={12} /> {lang === 'de' ? 'DAMPF & LICHT EFFEKTE' : 'STEAM & LIGHT EFFECTS'}
                  </span>
                  <span style={{ fontSize: 11, fontWeight: 800, background: 'rgba(0,0,0,0.6)', color: '#FFF', padding: '4px 10px', borderRadius: 6 }}>
                    🎵 BACKING SOUNDTRACK
                  </span>
                </div>

                <div>
                  <div style={{ fontSize: 24, fontWeight: 900, color: '#FFF', marginBottom: 4 }}>
                    Juicy Gourmet Burger & Crisp Fries 🍔
                  </div>
                  <div style={{ fontSize: 14, color: '#F472B6', fontWeight: 800 }}>
                    {lang === 'de' ? 'Happy Hour Preis: 12,90 € (Inkl. Craft Beer)' : 'Happy Hour Special: €12.90'}
                  </div>
                </div>
              </div>
            )}

            {/* Static Badge for BEFORE */}
            {activeTab === 'before' && (
              <div style={{
                position: 'absolute',
                top: 20,
                left: 20,
                background: 'rgba(0,0,0,0.7)',
                padding: '8px 14px',
                borderRadius: 8,
                color: C.dim,
                fontSize: 12,
                fontWeight: 700
              }}>
                Unbearbeitetes Rohfoto (Statischer Standard)
              </div>
            )}
          </div>

        </div>

      </div>
    </section>
  )
}
