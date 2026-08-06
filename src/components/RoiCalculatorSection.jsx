import { useState } from 'react'
import { C, grad } from '@/tokens'
import { Calculator, TrendingUp, Clock, Sparkles, ArrowRight, ShieldCheck, CheckCircle2 } from 'lucide-react'

export function RoiCalculatorSection({ onOpenAuth, lang = 'de' }) {
  const [dailyGuests, setDailyGuests] = useState(250)
  const [avgTicket, setAvgTicket] = useState(25)

  // Calculations
  const monthlyRevenueBefore = dailyGuests * avgTicket * 30
  const monthlyUmsatzPlus = Math.round(monthlyRevenueBefore * 0.15) // +15% conservative
  const monthlyHoursSaved = Math.round((dailyGuests * 30 * 0.05) / 60) + 12 // ~12 to 30 hours
  const yearlyPlus = monthlyUmsatzPlus * 12

  return (
    <section id="roi-calculator" style={{
      padding: '80px 20px',
      background: 'radial-gradient(ellipse at center, rgba(124,58,237,0.12) 0%, rgba(7,9,14,0.95) 70%)',
      borderTop: `1px solid ${C.border}`,
      borderBottom: `1px solid ${C.border}`,
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Background ambient lighting */}
      <div style={{ position: 'absolute', top: -100, right: -100, width: 400, height: 400, borderRadius: '50%', background: 'rgba(236,72,153,0.15)', filter: 'blur(100px)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: -100, left: -100, width: 400, height: 400, borderRadius: '50%', background: 'rgba(124,58,237,0.15)', filter: 'blur(100px)', pointerEvents: 'none' }} />

      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: 50 }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 8,
            padding: '6px 16px',
            borderRadius: 20,
            background: 'rgba(124,58,237,0.2)',
            border: '1px solid rgba(124,58,237,0.4)',
            color: '#C084FC',
            fontSize: 12,
            fontWeight: 800,
            letterSpacing: 1,
            marginBottom: 16
          }}>
            <Calculator size={14} color="#C084FC" />
            {lang === 'de' ? 'INTERAKTIVER MEHRUMSATZ-RECHNER' : 'INTERACTIVE REVENUE CALCULATOR'}
          </div>

          <h2 style={{ fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 900, color: C.white, lineHeight: 1.25, marginBottom: 16 }}>
            {lang === 'de' ? 'Berechne deinen Mehrumsatz mit SCENVY' : 'Calculate Your Revenue Increase'}
          </h2>

          <p style={{ fontSize: 16, color: C.muted, maxWidth: 680, margin: '0 auto', lineHeight: 1.6 }}>
            {lang === 'de' 
              ? 'Erfahre in Sekunden, wie viel Zusatzumsatz durch visuelle Verkaufsförderung, Impulskäufe & automatische Menü-Reels in deinem Betrieb entsteht.'
              : 'Discover in seconds how much extra revenue visual impulse buys & automated menu reels bring to your venue.'}
          </p>
        </div>

        {/* Calculator Card */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: 32,
          background: 'rgba(15,23,42,0.85)',
          backdropFilter: 'blur(20px)',
          borderRadius: 28,
          border: '1px solid rgba(255,255,255,0.12)',
          padding: '36px',
          boxShadow: '0 20px 60px rgba(0,0,0,0.6)'
        }}>
          
          {/* Sliders Input Column */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
            
            {/* Slider 1: Daily Guests */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
                <label style={{ fontSize: 14, fontWeight: 700, color: C.white }}>
                  {lang === 'de' ? 'Durchschnittliche Besucher / Gäste pro Tag' : 'Average Daily Guests'}
                </label>
                <span style={{ fontSize: 18, fontWeight: 900, color: C.purple, background: 'rgba(124,58,237,0.2)', padding: '4px 12px', borderRadius: 8, border: '1px solid rgba(124,58,237,0.4)' }}>
                  {dailyGuests.toLocaleString()} {lang === 'de' ? 'Gäste' : 'Guests'}
                </span>
              </div>
              <input
                type="range"
                min={50}
                max={2000}
                step={25}
                value={dailyGuests}
                onChange={(e) => setDailyGuests(Number(e.target.value))}
                style={{
                  width: '100%',
                  height: 8,
                  borderRadius: 4,
                  accentColor: '#7C3AED',
                  background: 'rgba(255,255,255,0.15)',
                  cursor: 'pointer'
                }}
              />
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, color: C.dim, marginTop: 6 }}>
                <span>50 Gäste</span>
                <span>1.000 Gäste</span>
                <span>2.000 Gäste</span>
              </div>
            </div>

            {/* Slider 2: Avg Ticket Price */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
                <label style={{ fontSize: 14, fontWeight: 700, color: C.white }}>
                  {lang === 'de' ? 'Aktueller durchschnittlicher Bon / Warenkorb' : 'Average Order Ticket Value'}
                </label>
                <span style={{ fontSize: 18, fontWeight: 900, color: C.pink, background: 'rgba(236,72,153,0.2)', padding: '4px 12px', borderRadius: 8, border: '1px solid rgba(236,72,153,0.4)' }}>
                  {avgTicket} €
                </span>
              </div>
              <input
                type="range"
                min={5}
                max={150}
                step={5}
                value={avgTicket}
                onChange={(e) => setAvgTicket(Number(e.target.value))}
                style={{
                  width: '100%',
                  height: 8,
                  borderRadius: 4,
                  accentColor: '#EC4899',
                  background: 'rgba(255,255,255,0.15)',
                  cursor: 'pointer'
                }}
              />
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, color: C.dim, marginTop: 6 }}>
                <span>5 €</span>
                <span>75 €</span>
                <span>150 €</span>
              </div>
            </div>

            {/* Trust highlights */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginTop: 10, paddingTop: 16, borderTop: '1px solid rgba(255,255,255,0.08)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: C.muted }}>
                <CheckCircle2 size={16} color={C.green} />
                <span>{lang === 'de' ? 'Basiert auf Konservativem +15% Impulskauf-Modell' : 'Based on conservative +15% impulse sales'}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: C.muted }}>
                <CheckCircle2 size={16} color={C.green} />
                <span>{lang === 'de' ? 'Keine zusätzlichen Hardware-Kosten' : 'No extra hardware costs required'}</span>
              </div>
            </div>

          </div>

          {/* Realtime Results Column */}
          <div style={{
            background: 'linear-gradient(135deg, rgba(124,58,237,0.25) 0%, rgba(236,72,153,0.2) 100%)',
            borderRadius: 20,
            border: '1px solid rgba(168,85,247,0.4)',
            padding: '28px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            boxShadow: '0 10px 30px rgba(124,58,237,0.2)'
          }}>
            <div>
              <div style={{ fontSize: 12, fontWeight: 800, color: C.purple, letterSpacing: 1, marginBottom: 4, textTransform: 'uppercase' }}>
                {lang === 'de' ? 'DEIN ERRECHNETER MEHRUMSATZ' : 'CALCULATED EXTRA REVENUE'}
              </div>

              {/* Monthly Amount */}
              <div style={{ fontSize: 'clamp(36px, 5vw, 48px)', fontWeight: 900, color: C.white, lineHeight: 1.1, marginBottom: 8, display: 'flex', alignItems: 'baseline', gap: 8 }}>
                <span>+{monthlyUmsatzPlus.toLocaleString()} €</span>
                <span style={{ fontSize: 16, fontWeight: 700, color: C.pink }}>/ {lang === 'de' ? 'Monat' : 'month'}</span>
              </div>

              <div style={{ fontSize: 14, color: '#E9D5FF', fontWeight: 600, marginBottom: 20 }}>
                ⚡ {lang === 'de' ? 'Aufs Jahr hochgerechnet:' : 'Yearly projection:'} <strong style={{ color: C.white, fontSize: 16 }}>+{yearlyPlus.toLocaleString()} € / {lang === 'de' ? 'Jahr' : 'year'}</strong>
              </div>

              {/* Time saved box */}
              <div style={{
                background: 'rgba(0,0,0,0.3)',
                borderRadius: 14,
                padding: '16px',
                border: '1px solid rgba(255,255,255,0.1)',
                display: 'flex',
                alignItems: 'center',
                gap: 14,
                marginBottom: 24
              }}>
                <div style={{ width: 40, height: 40, borderRadius: 10, background: 'rgba(59,130,246,0.2)', border: '1px solid rgba(59,130,246,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Clock size={20} color="#3B82F6" />
                </div>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 800, color: C.white }}>
                    ~{monthlyHoursSaved} {lang === 'de' ? 'Stunden Zeiteinsparung' : 'hours saved'} / {lang === 'de' ? 'Monat' : 'month'}
                  </div>
                  <div style={{ fontSize: 11, color: C.muted }}>
                    {lang === 'de' ? 'Durch selbsterklärende Video-Menüs & automatischen Content' : 'Via self-explaining video menus & automated content'}
                  </div>
                </div>
              </div>
            </div>

            {/* Prominent CTA Button */}
            <button
              onClick={onOpenAuth}
              style={{
                width: '100%',
                padding: '16px 24px',
                borderRadius: 14,
                background: grad(C.purple, C.pink),
                border: 'none',
                color: C.white,
                fontSize: 15,
                fontWeight: 900,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 10,
                boxShadow: '0 8px 24px rgba(236,72,153,0.4)',
                transition: 'all 0.2s ease-in-out'
              }}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
            >
              <Sparkles size={18} color="#FFFFFF" />
              <span>{lang === 'de' ? 'Diesen Mehrumsatz jetzt sichern (14 Tage gratis)' : 'Claim This Revenue (14 Days Free)'}</span>
              <ArrowRight size={18} />
            </button>

          </div>

        </div>

      </div>
    </section>
  )
}
