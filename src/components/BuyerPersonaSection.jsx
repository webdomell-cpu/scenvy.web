import { useState } from 'react'
import { C, grad } from '@/tokens'
import { Building, Award, ShieldCheck, CheckCircle2, ArrowRight, Zap, Layers, Users } from 'lucide-react'

export function BuyerPersonaSection({ onOpenAuth, lang = 'de' }) {
  const [activeTab, setActiveTab] = useState('owners') // 'owners' | 'marketing' | 'it'

  const personas = {
    owners: {
      id: 'owners',
      roleTitle: lang === 'de' ? 'Für Geschäftsführer & Inhaber' : 'For Owners & Executives',
      icon: Building,
      accentColor: C.purple,
      painPoint: lang === 'de' 
        ? 'Personalmangel, hohe Betriebskosten, stagnierender Durchschnittsbon & steigender Wettbewerb.'
        : 'Staff shortages, high operational costs, stagnating average order values & fierce competition.',
      pitchTitle: lang === 'de' 
        ? 'Automatisches Upselling & Höhere Marge Ohne Mehr Personal'
        : 'Automated Upselling & Higher Margins Without Extra Staff',
      benefits: [
        lang === 'de' ? '+18% bis +24% höherer Bon durch visuelles Cross-Selling' : '+18% to +24% higher ticket value via visual cross-selling',
        lang === 'de' ? 'Amortisiert sich ab Tag 1 durch messbaren Zusatzumsatz' : 'Pays for itself from day 1 through measurable revenue gains',
        lang === 'de' ? 'Entlastet das Servicepersonal durch selbsterklärende Video-Menüs' : 'Relieves service staff through self-explaining video menus'
      ],
      quote: lang === 'de' 
        ? '"SCENVY hat unseren Tisch-Umsatz um 21% gesteigert, während wir weniger Personal im Service einsetzen müssen."'
        : '"SCENVY increased our table revenue by 21% while needing fewer floor staff."',
      author: 'Markus Eder, Gastronom aus München'
    },
    marketing: {
      id: 'marketing',
      roleTitle: lang === 'de' ? 'Für Marketing & Brand Manager' : 'For Marketing & Brand Managers',
      icon: Award,
      accentColor: C.pink,
      painPoint: lang === 'de' 
        ? 'Veraltete Plakate, aufwendige Druckkosten, uneinheitliche Vorlagen & träge Kampagnen-Steuerung.'
        : 'Outdated posters, high printing costs, inconsistent templates & sluggish campaign updates.',
      pitchTitle: lang === 'de' 
        ? 'Zentrale Cloud-Steuerung & Brand Consistency in Sekundenschnelle'
        : 'Centralized Cloud Control & Instant Brand Consistency',
      benefits: [
        lang === 'de' ? 'Garantierte Markenkonformität über Hunderte Screens hinweg' : 'Guaranteed brand alignment across hundreds of screens',
        lang === 'de' ? 'Echtzeit-Push-Kampagnen (z.B. Happy Hour) in unter 60 Sekunden' : 'Real-time push campaigns (e.g. Happy Hour) in under 60 seconds',
        lang === 'de' ? 'Integrierter KI-Generator erstellt automatisch Marken-Reels' : 'Built-in AI generator auto-creates branded reels'
      ],
      quote: lang === 'de' 
        ? '"Wir ändern Aktionstarife zentral aus dem Headquarter und innerhalb von 2 Sekunden sind alle 14 Standorte live."'
        : '"We change campaign deals centrally from HQ, and within 2 seconds all 14 locations update live."',
      author: 'Sarah Lindner, Head of Brand Marketing'
    },
    it: {
      id: 'it',
      roleTitle: lang === 'de' ? 'Für Filialleiter & IT-Operations' : 'For Branch Managers & IT',
      icon: ShieldCheck,
      accentColor: '#3B82F6',
      painPoint: lang === 'de' 
        ? 'Teure Spezial-Hardware, komplizierte Verkabelung, hängende Player & zeitraubende Wartung.'
        : 'Expensive proprietary hardware, complex wiring, crashing players & time-consuming maintenance.',
      pitchTitle: lang === 'de' 
        ? '100% Plug-and-Play auf Jedem Smart-TV — Keine Spezial-Hardware'
        : '100% Plug-and-Play on Any Smart TV — Zero Proprietary Hardware',
      benefits: [
        lang === 'de' ? 'Funktioniert direkt im Browser auf allen Fernsehern, Tablets & Fire TV Sticks' : 'Runs directly in browser on any TV, tablet, or Fire TV stick',
        lang === 'de' ? 'Automatische Re-Connects & Offline-Pufferung für 100% Ausfallsicherheit' : 'Auto reconnects & offline buffering for 100% reliability',
        lang === 'de' ? 'Steuerbar direkt vom Smartphone ohne Entwicklerkenntnisse' : 'Manageable directly via smartphone without IT support'
      ],
      quote: lang === 'de' 
        ? '"Keine 500 € Mediaplayer mehr nötig. Wir nutzen vorhandene Fernseher und alles läuft extrem stabil."'
        : '"No more €500 media players needed. We use existing TVs and everything runs rock solid."',
      author: 'David Berger, Senior IT Systems Lead'
    }
  }

  const activePersona = personas[activeTab]

  return (
    <section id="buyer-personas" style={{
      padding: '80px 20px',
      background: '#07090E',
      borderBottom: `1px solid ${C.border}`,
      position: 'relative'
    }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: 44 }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 8,
            padding: '6px 16px',
            borderRadius: 20,
            background: 'rgba(124,58,237,0.18)',
            border: '1px solid rgba(124,58,237,0.4)',
            color: '#C084FC',
            fontSize: 12,
            fontWeight: 800,
            letterSpacing: 1,
            marginBottom: 16
          }}>
            <Users size={14} color="#C084FC" />
            {lang === 'de' ? 'MASSGESCHNEIDERT FÜR DEIN TEAM' : 'TAILORED FOR YOUR TEAM'}
          </div>

          <h2 style={{ fontSize: 'clamp(28px, 4vw, 42px)', fontWeight: 900, color: C.white, lineHeight: 1.25, marginBottom: 16 }}>
            {lang === 'de' ? 'Lösungen für jede Rolle im Betrieb' : 'Solutions Built for Every Role'}
          </h2>

          <p style={{ fontSize: 16, color: C.muted, maxWidth: 640, margin: '0 auto', lineHeight: 1.6 }}>
            {lang === 'de' 
              ? 'Egal ob Umsatzsteigerung, Design-Kontrolle oder IT-Stabilität — SCENVY löst die größten Herausforderungen deines Teams.'
              : 'Whether driving revenue, ensuring design control, or guaranteeing IT uptime — SCENVY solves key team pains.'}
          </p>
        </div>

        {/* Tab Switcher */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: 12,
          flexWrap: 'wrap',
          marginBottom: 40
        }}>
          {Object.values(personas).map((p) => {
            const IconComponent = p.icon
            const isSel = activeTab === p.id
            return (
              <button
                key={p.id}
                onClick={() => setActiveTab(p.id)}
                style={{
                  padding: '12px 24px',
                  borderRadius: 14,
                  border: `1px solid ${isSel ? p.accentColor : 'rgba(255,255,255,0.12)'}`,
                  background: isSel ? 'rgba(15,23,42,0.9)' : 'rgba(255,255,255,0.03)',
                  color: isSel ? C.white : C.muted,
                  fontSize: 14,
                  fontWeight: 800,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 10,
                  boxShadow: isSel ? `0 8px 20px ${p.accentColor}33` : 'none',
                  transition: 'all 0.2s ease-in-out'
                }}
              >
                <IconComponent size={18} color={isSel ? p.accentColor : C.muted} />
                <span>{p.roleTitle}</span>
              </button>
            )
          })}
        </div>

        {/* Persona Content Box */}
        <div style={{
          background: 'rgba(15,23,42,0.8)',
          backdropFilter: 'blur(20px)',
          borderRadius: 24,
          border: `1px solid ${activePersona.accentColor}55`,
          padding: '40px',
          boxShadow: `0 15px 40px ${activePersona.accentColor}22`,
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: 36,
          alignItems: 'center'
        }}>
          
          {/* Left: Pain Point & Pitch */}
          <div>
            <div style={{ fontSize: 11, fontWeight: 900, color: C.pink, letterSpacing: 1.5, textTransform: 'uppercase', marginBottom: 8 }}>
              HAUPT-SCHMERZPUNKT (PAIN POINT)
            </div>
            <p style={{ fontSize: 14, color: C.dim, marginBottom: 24, lineHeight: 1.5, paddingLeft: 12, borderLeft: '3px solid rgba(239,68,68,0.5)' }}>
              {activePersona.painPoint}
            </p>

            <div style={{ fontSize: 11, fontWeight: 900, color: activePersona.accentColor, letterSpacing: 1.5, textTransform: 'uppercase', marginBottom: 8 }}>
              DEINE SCENVY REEL-LÖSUNG (PITCH)
            </div>
            <h3 style={{ fontSize: 22, fontWeight: 900, color: C.white, marginBottom: 20, lineHeight: 1.3 }}>
              {activePersona.pitchTitle}
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {activePersona.benefits.map((b, idx) => (
                <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 14, color: C.white }}>
                  <CheckCircle2 size={18} color={activePersona.accentColor} />
                  <span>{b}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Testimonial & Call-To-Action */}
          <div style={{
            background: 'rgba(10,10,16,0.9)',
            borderRadius: 20,
            border: '1px solid rgba(255,255,255,0.08)',
            padding: '28px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            gap: 20
          }}>
            <div>
              <div style={{ fontSize: 32, color: activePersona.accentColor, lineHeight: 1, marginBottom: 8 }}>“</div>
              <p style={{ fontSize: 15, color: '#E2E8F0', fontStyle: 'italic', lineHeight: 1.6, marginBottom: 16 }}>
                {activePersona.quote}
              </p>
              <div style={{ fontSize: 13, fontWeight: 800, color: C.white }}>
                {activePersona.author}
              </div>
            </div>

            <button
              onClick={onOpenAuth}
              style={{
                width: '100%',
                padding: '14px 20px',
                borderRadius: 12,
                background: grad(activePersona.accentColor, C.pink),
                border: 'none',
                color: C.white,
                fontSize: 14,
                fontWeight: 800,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 8,
                boxShadow: `0 6px 20px ${activePersona.accentColor}44`
              }}
            >
              <span>{lang === 'de' ? 'Jetzt für dein Team starten →' : 'Start for Your Team →'}</span>
            </button>
          </div>

        </div>

      </div>
    </section>
  )
}
