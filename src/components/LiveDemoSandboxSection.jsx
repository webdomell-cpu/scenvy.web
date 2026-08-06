import { useState } from 'react'
import { C, grad } from '@/tokens'
import { QrCode, Smartphone, Play, ChevronUp, ChevronDown, Volume2, VolumeX, Sparkles, X, Heart, MessageCircle, Share2, Eye, ShieldCheck, Check } from 'lucide-react'

export function LiveDemoSandboxSection({ lang = 'de' }) {
  const [showReelModal, setShowReelModal] = useState(false)
  const [activeReelIdx, setActiveReelIdx] = useState(0)
  const [isMuted, setIsMuted] = useState(true)

  const reels = [
    {
      id: 1,
      tag: 'HAPPY HOUR',
      title: 'Signatur Cocktails — 2 für 1',
      desc: 'Täglich ab 17:00 Uhr. Frisch gemixt mit Premium-Zutaten.',
      bgImg: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=800&q=80',
      price: '9,50 €',
      likes: '1.4k',
      venue: 'Skyline Lounge & Bar'
    },
    {
      id: 2,
      tag: 'CHEF\'S SPECIAL',
      title: 'Truffle Tagliolini & Parmigiano',
      desc: 'Frische Pasta im Parmesanlaib geschwenkt mit frischem Sommertrüffel.',
      bgImg: 'https://images.unsplash.com/photo-1621996346565-e3d5d6281313?w=800&q=80',
      price: '18,90 €',
      likes: '2.8k',
      venue: 'Ristorante Bellavista'
    },
    {
      id: 3,
      tag: 'LIVE EVENT',
      title: 'Rooftop Sunset Beats & DJ Night',
      desc: 'Diesen Freitag ab 20:00 Uhr. Freier Eintritt für Hotelgäste.',
      bgImg: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=800&q=80',
      price: 'Free Entry',
      likes: '3.1k',
      venue: 'Grand Hotel Riverside'
    }
  ]

  const currentReel = reels[activeReelIdx]

  const handleNext = () => {
    setActiveReelIdx((prev) => (prev + 1) % reels.length)
  }

  const handlePrev = () => {
    setActiveReelIdx((prev) => (prev - 1 + reels.length) % reels.length)
  }

  return (
    <section id="live-demo-sandbox" style={{
      padding: '80px 20px',
      background: '#080A11',
      borderBottom: `1px solid ${C.border}`,
      position: 'relative'
    }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 8,
            padding: '6px 16px',
            borderRadius: 20,
            background: 'rgba(59,130,246,0.18)',
            border: '1px solid rgba(59,130,246,0.4)',
            color: '#60A5FA',
            fontSize: 12,
            fontWeight: 800,
            letterSpacing: 1,
            marginBottom: 16
          }}>
            <Smartphone size={14} color="#60A5FA" />
            {lang === 'de' ? 'INTERAKTIVE LIVE-DEMO' : 'INTERACTIVE LIVE DEMO'}
          </div>

          <h2 style={{ fontSize: 'clamp(28px, 4vw, 42px)', fontWeight: 900, color: C.white, lineHeight: 1.25, marginBottom: 16 }}>
            {lang === 'de' ? 'Teste das Erlebnis JETZT live auf deinem Smartphone' : 'Experience the Reel Show LIVE on Your Phone'}
          </h2>

          <p style={{ fontSize: 16, color: C.muted, maxWidth: 640, margin: '0 auto', lineHeight: 1.6 }}>
            {lang === 'de' 
              ? 'Keine Registrierung erforderlich. Scanne einfach den QR-Code oder starte den interaktiven Reel-Player direkt im Browser.'
              : 'No registration needed. Simply scan the QR code or launch the interactive reel player directly in your browser.'}
          </p>
        </div>

        {/* Demo Container Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: 36,
          alignItems: 'center',
          background: 'rgba(15,23,42,0.6)',
          borderRadius: 28,
          border: '1px solid rgba(255,255,255,0.08)',
          padding: '40px',
          boxShadow: '0 20px 50px rgba(0,0,0,0.5)'
        }}>
          
          {/* Left Column: Venue Screen Mockup */}
          <div>
            <div style={{ fontSize: 12, fontWeight: 800, color: C.purple, letterSpacing: 1, marginBottom: 8, textTransform: 'uppercase' }}>
              {lang === 'de' ? 'VOR ORT IM VENUE' : 'AT THE VENUE'}
            </div>
            <h3 style={{ fontSize: 24, fontWeight: 800, color: C.white, marginBottom: 14 }}>
              {lang === 'de' ? 'Digitales Board & Tisch-QR-Aufsteller' : 'Digital Menu Board & Table QR Stand'}
            </h3>
            <p style={{ fontSize: 14, color: C.muted, lineHeight: 1.6, marginBottom: 20 }}>
              {lang === 'de' 
                ? 'Gäste sehen dein hochauflösendes Angebot auf Bildschirmen oder am Tisch. Ein kurzer Scan mit der Smartphone-Kamera genügt.'
                : 'Guests see your high-definition offer on screens or table stands. A quick scan opens the full experience.'}
            </p>

            {/* Simulated Desktop / Screen Frame */}
            <div style={{
              background: '#0F172A',
              borderRadius: 16,
              border: '2px solid rgba(124,58,237,0.4)',
              padding: 12,
              boxShadow: '0 10px 30px rgba(124,58,237,0.25)',
              position: 'relative',
              overflow: 'hidden'
            }}>
              <img 
                src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80" 
                alt="Venue Lounge" 
                style={{ width: '100%', height: 200, objectFit: 'cover', borderRadius: 10, filter: 'brightness(0.7)' }} 
              />
              <div style={{ position: 'absolute', top: 24, left: 24, background: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(8px)', padding: '6px 12px', borderRadius: 8, border: '1px solid rgba(255,255,255,0.2)', fontSize: 12, fontWeight: 800, color: '#FFF' }}>
                🔴 LIVE STREAMING ON SMART TV
              </div>
            </div>
          </div>

          {/* Right Column: QR Code & Direct Launch */}
          <div style={{
            background: 'rgba(10,10,16,0.9)',
            borderRadius: 24,
            border: '1px solid rgba(124,58,237,0.3)',
            padding: 32,
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 20,
            boxShadow: '0 10px 30px rgba(0,0,0,0.4)'
          }}>
            <div style={{ fontSize: 12, fontWeight: 800, color: C.pink, letterSpacing: 1.5, textTransform: 'uppercase' }}>
              {lang === 'de' ? 'MIT SMARTPHONE SCANNEN' : 'SCAN WITH SMARTPHONE'}
            </div>

            {/* Generated QR Code Badge */}
            <div style={{
              background: '#FFFFFF',
              padding: 16,
              borderRadius: 20,
              boxShadow: '0 10px 30px rgba(255,45,141,0.3)',
              display: 'inline-block',
              border: '3px solid #7C3AED'
            }}>
              <img
                src={`https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${encodeURIComponent('https://app.scenvy.de/l/demo')}&color=0A0A10&bgcolor=FFFFFF`}
                alt="SCENVY Demo QR Code"
                style={{ width: 160, height: 160, display: 'block' }}
              />
            </div>

            <div style={{ fontSize: 13, color: C.muted, maxWidth: 280, lineHeight: 1.5 }}>
              {lang === 'de' ? 'Halte deine Handy-Kamera auf den QR-Code, um das Vertical Reel-Gefühl zu testen.' : 'Hold your smartphone camera over the QR code to test the vertical reel experience.'}
            </div>

            {/* Or Direct Button for Desktop/Mobile */}
            <button
              onClick={() => setShowReelModal(true)}
              style={{
                width: '100%',
                padding: '14px 20px',
                borderRadius: 14,
                background: grad(C.purple, C.pink),
                border: 'none',
                color: C.white,
                fontSize: 14,
                fontWeight: 800,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 8,
                boxShadow: '0 6px 20px rgba(124,58,237,0.4)'
              }}
            >
              <Play size={18} fill="#FFFFFF" />
              <span>{lang === 'de' ? 'Live-Demo direkt im Browser starten' : 'Start Live Demo in Browser'}</span>
            </button>
          </div>

        </div>

      </div>

      {/* Fullscreen Interactive Vertical Reel Modal */}
      {showReelModal && (
        <div style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(0,0,0,0.92)',
          backdropFilter: 'blur(20px)',
          zIndex: 9999,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 20
        }}>
          {/* Phone Frame Simulator */}
          <div style={{
            width: '100%',
            maxWidth: 380,
            height: '85vh',
            maxHeight: 720,
            background: '#000000',
            borderRadius: 36,
            border: '8px solid #1F2937',
            boxShadow: '0 25px 60px rgba(124,58,237,0.5)',
            position: 'relative',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column'
          }}>
            {/* Background Image Story Reel */}
            <img 
              src={currentReel.bgImg} 
              alt={currentReel.title} 
              style={{ width: '100%', height: '100%', objectFit: 'cover', position: 'absolute', inset: 0 }} 
            />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.2) 50%, rgba(0,0,0,0.6) 100%)' }} />

            {/* Top Bar inside Reel */}
            <div style={{ position: 'relative', zIndex: 10, padding: '20px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ fontSize: 11, fontWeight: 900, background: C.pink, color: C.white, padding: '3px 8px', borderRadius: 6 }}>
                  {currentReel.tag}
                </span>
                <span style={{ fontSize: 12, fontWeight: 800, color: C.white }}>
                  {currentReel.venue}
                </span>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <button onClick={() => setIsMuted(!isMuted)} style={{ background: 'rgba(0,0,0,0.5)', border: 'none', color: '#FFF', borderRadius: '50%', width: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                  {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
                </button>
                <button onClick={() => setShowReelModal(false)} style={{ background: 'rgba(239,68,68,0.8)', border: 'none', color: '#FFF', borderRadius: '50%', width: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                  <X size={18} />
                </button>
              </div>
            </div>

            {/* Swipe Controls on sides */}
            <div style={{ position: 'absolute', right: 12, top: '40%', zIndex: 10, display: 'flex', flexDirection: 'column', gap: 16, alignItems: 'center' }}>
              <button onClick={handlePrev} title="Vorheriger Reel" style={{ background: 'rgba(0,0,0,0.6)', border: '1px solid rgba(255,255,255,0.3)', color: '#FFF', borderRadius: '50%', width: 40, height: 40, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                <ChevronUp size={20} />
              </button>
              <button onClick={handleNext} title="Nächster Reel" style={{ background: 'rgba(0,0,0,0.6)', border: '1px solid rgba(255,255,255,0.3)', color: '#FFF', borderRadius: '50%', width: 40, height: 40, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                <ChevronDown size={20} />
              </button>
            </div>

            {/* Bottom Content Area */}
            <div style={{ marginTop: 'auto', position: 'relative', zIndex: 10, padding: 20 }}>
              <div style={{ fontSize: 22, fontWeight: 900, color: '#FFF', marginBottom: 6 }}>
                {currentReel.title}
              </div>
              <p style={{ fontSize: 13, color: '#E2E8F0', lineHeight: 1.4, marginBottom: 14 }}>
                {currentReel.desc}
              </p>

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ fontSize: 20, fontWeight: 900, color: C.green }}>
                  {currentReel.price}
                </span>

                <button 
                  onClick={() => alert(`Bestellung simuliert: ${currentReel.title}`)}
                  style={{ padding: '10px 18px', borderRadius: 10, background: grad(C.purple, C.pink), border: 'none', color: '#FFF', fontSize: 13, fontWeight: 800, cursor: 'pointer' }}
                >
                  Jetzt Bestellen →
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

    </section>
  )
}
