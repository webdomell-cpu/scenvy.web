import { useState } from 'react'
import { Link } from 'react-router-dom'
import { MODULE_COLORS, ScenvyAppIcon, ScenvyPhoneMockup } from '@/components/ScenvyBrandShowcase'
import { ScenvyLogoIcon } from '@/components/ScenvyLogo'
import { ArrowRight, CheckCircle, Sparkles, Globe, Layers, ShieldCheck, Zap } from 'lucide-react'

export default function ScenvyProductPage({ module = 'flow', onOpenAuthModal }) {
  const [lang, setLang] = useState('de')
  const m = module.toLowerCase()
  const config = MODULE_COLORS[m] || MODULE_COLORS.flow

  const details = {
    flow: {
      name: 'SCENVY FLOW',
      tagline: 'Vertikale TikTok-Reels für Hospitality',
      sub: 'Verwandle statische Speisekarten und QR-Codes in fesselnde Vollbild-Videos. Entdecken, swipen, bestellen.',
      subdomain: 'flow.sv.de',
      features: [
        'Vollbild TikTok-artige Story Reels im mobilen Web-Browser',
        'Live Happy Hour Countdown Push-Deals in Echtzeit',
        'KI-generierte Reels in unter 60 Sekunden aus Foto oder Text',
        'Multi-Standort Dashboard für Gruppen & Restaurantketten'
      ]
    },
    menu: {
      name: 'SCENVY MENU',
      tagline: 'Interaktive Digitale Speisekarten & Scan-to-Order',
      sub: 'Die nächste Generation digitaler Menüs mit Allergen-Filtern, Mehrsprachigkeit und visuellen Food-Videos.',
      subdomain: 'menu.sv.de',
      features: [
        'Echtzeit-Aktualisierung von Preisen und Speisen ohne Nachdruck',
        'Interaktive Video-Menüs mit Allergen- & Nährwertfiltern',
        'Direkte Tischnummer-Kopplung und Scan-to-Order Integration',
        'Mehrsprachig (DE, EN, FR, ES, AR) mit KI-Übersetzung'
      ]
    },
    magic: {
      name: 'SCENVY MAGIC',
      tagline: 'KI-Content & Automation Suite',
      sub: 'Generiere Bildschirminhalte, Social Media Posts, Promo-Videos & Speisekarten automatisch mit Gemini AI.',
      subdomain: 'magic.sv.de',
      features: [
        'KI-generierte Video-Reels aus einfachen Text-Prompts',
        'Automatische Speisekarten-Erfassung per Foto-Upload',
        'Intelligente Angebotsempfehlungen & Preis-Optimierung',
        'Mehrsprachige Übersetzung aller Venue-Inhalte auf Knopfdruck'
      ]
    },
    link: {
      name: 'SCENVY LINK',
      tagline: 'NFC & Smart QR Connect Solutions',
      sub: 'Intelligente Tischaufsteller, NFC-Karten & QR-Code-Lösungen für jeden Tisch und Tresen.',
      subdomain: 'link.sv.de',
      features: [
        'Hochwertige Acryl & Holz Tischaufsteller mit Gravur',
        'Integrierte NFC-Chips für instant Tap-to-Open ohne Kamera',
        'Dynamische Ziel-URLs: Jederzeit auf Reels, Menü oder WiFi umschaltbar',
        'Wasserdicht & Gastro-erprobt für den Außen- & Innenbereich'
      ]
    },
    store: {
      name: 'SCENVY STORE',
      tagline: 'Hardware, Kioske & Display Zubehör',
      sub: 'Hardware-Komponenten, Stele-Displays, POS Kioske und Zubehör maßgeschneidert für Gastronomie & Hotels.',
      subdomain: 'store.sv.de',
      features: [
        'Vorkonfigurierte Smart TV Displays & Stelen',
        'NFC & QR Tischaufsteller in Premium Metall- & Holzausführung',
        'Self-Service Bestellkioske für Fast Casual Restaurants',
        'Plug & Play Einrichtung mit 24/7 Vor-Ort-Garantie'
      ]
    },
    host: {
      name: 'SCENVY HOST',
      tagline: 'Guest Experience & Hotel In-Room Portal',
      sub: 'Das digitale Gästeerlebnis für Hotels, Resorts & VIP Lounges. Digitale Gästemappe, Room-Service & Concierge.',
      subdomain: 'host.sv.de',
      features: [
        'Digitale Gästemappe auf dem Zimmer-TV oder Smartphone',
        'In-Room Dining Bestellungen direkt in die Hotelküche',
        'SPA & Ausflugs-Buchungen ohne Rezeptionswartezeit',
        'Smart Check-Out & Bewertungssystem für maximale Kundenzufriedenheit'
      ]
    }
  }

  const pData = details[m] || details.flow

  const handleAuthClick = (e) => {
    e.preventDefault()
    if (onOpenAuthModal) {
      onOpenAuthModal()
    } else {
      window.location.href = 'https://app.sv.de'
    }
  }

  return (
    <div style={{ minHeight: '100vh', background: '#090818', color: '#F3F4F6', fontFamily: 'Inter, system-ui, sans-serif' }}>
      
      {/* Ecosystem Subdomain Bar */}
      <div style={{ background: 'rgba(15, 23, 42, 0.95)', borderBottom: '1px solid rgba(255,255,255,0.08)', padding: '8px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: 12 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, overflowX: 'auto' }}>
          <span style={{ color: 'rgba(255,255,255,0.5)', fontWeight: 700 }}>ECOSYSTEM:</span>
          <Link to="/" style={{ color: '#94A3B8', textDecoration: 'none', fontWeight: 600 }}>scenvy.de</Link>
          <Link to="/board" style={{ color: '#94A3B8', textDecoration: 'none', fontWeight: 600 }}>board.sv.de</Link>
          <Link to="/flow" style={{ color: m === 'flow' ? config.primary : '#94A3B8', textDecoration: 'none', fontWeight: m === 'flow' ? 800 : 600 }}>flow.sv.de</Link>
          <Link to="/menu" style={{ color: m === 'menu' ? config.primary : '#94A3B8', textDecoration: 'none', fontWeight: m === 'menu' ? 800 : 600 }}>menu.sv.de</Link>
          <Link to="/magic" style={{ color: m === 'magic' ? config.primary : '#94A3B8', textDecoration: 'none', fontWeight: m === 'magic' ? 800 : 600 }}>magic.sv.de</Link>
          <Link to="/link" style={{ color: m === 'link' ? config.primary : '#94A3B8', textDecoration: 'none', fontWeight: m === 'link' ? 800 : 600 }}>link.sv.de</Link>
          <Link to="/store" style={{ color: m === 'store' ? config.primary : '#94A3B8', textDecoration: 'none', fontWeight: m === 'store' ? 800 : 600 }}>store.sv.de</Link>
          <Link to="/host" style={{ color: m === 'host' ? config.primary : '#94A3B8', textDecoration: 'none', fontWeight: m === 'host' ? 800 : 600 }}>host.sv.de</Link>
        </div>

        <Link to="/" style={{ textDecoration: 'none', color: config.primary, fontWeight: 700, fontSize: 12 }}>
          ← Hauptseite
        </Link>
      </div>

      {/* Main Header */}
      <header style={{ padding: '16px 32px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.08)', backdropFilter: 'blur(16px)', position: 'sticky', top: 0, zIndex: 50, background: 'rgba(9,8,24,0.85)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <ScenvyAppIcon module={m} size={38} />
          <div>
            <div style={{ fontSize: 20, fontWeight: 900, color: '#FFF' }}>{pData.name}</div>
            <div style={{ fontSize: 12, color: config.primary, fontWeight: 700 }}>{pData.subdomain}</div>
          </div>
        </div>

        <button 
          onClick={handleAuthClick}
          style={{ padding: '10px 22px', borderRadius: 10, border: 'none', background: config.primary, color: '#FFF', fontWeight: 800, fontSize: 14, cursor: 'pointer', boxShadow: `0 4px 20px ${config.primary}66` }}
        >
          {pData.name} Starten (app.sv.de) →
        </button>
      </header>

      {/* Hero Section */}
      <section style={{ padding: '60px 20px 80px', maxWidth: 1100, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 40, alignItems: 'center' }}>
        <div>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '6px 16px', borderRadius: 20, background: `${config.primary}20`, border: `1px solid ${config.primary}50`, color: config.primary, fontSize: 13, fontWeight: 800, marginBottom: 20 }}>
            <Sparkles size={16} /> OFFICIAL SCENVY MODULE
          </div>

          <h1 style={{ fontSize: 'clamp(32px, 4vw, 48px)', fontWeight: 900, lineHeight: 1.15, marginBottom: 20 }}>
            {pData.tagline}
          </h1>

          <p style={{ fontSize: 17, color: '#94A3B8', lineHeight: 1.6, marginBottom: 30 }}>
            {pData.sub}
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginBottom: 36 }}>
            {pData.features.map((feat, idx) => (
              <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 15, fontWeight: 600, color: '#E2E8F0' }}>
                <CheckCircle size={18} color={config.primary} />
                <span>{feat}</span>
              </div>
            ))}
          </div>

          <button 
            onClick={handleAuthClick}
            style={{ padding: '16px 36px', borderRadius: 14, border: 'none', background: config.primary, color: '#FFF', fontWeight: 900, fontSize: 16, cursor: 'pointer', boxShadow: `0 8px 30px ${config.primary}55`, display: 'inline-flex', alignItems: 'center', gap: 10 }}
          >
            Jetzt {pData.name} Nutzen <ArrowRight size={18} />
          </button>
        </div>

        {/* Visual Phone / Display Mockup */}
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <ScenvyPhoneMockup module={m} size="large" active={true} />
        </div>
      </section>

      {/* Footer Banner */}
      <section style={{ padding: '60px 20px', background: '#070612', borderTop: '1px solid rgba(255,255,255,0.08)', textAlign: 'center' }}>
        <ScenvyAppIcon module={m} size={48} style={{ marginBottom: 16 }} />
        <h2 style={{ fontSize: 28, fontWeight: 900, marginBottom: 12 }}>Bereit für das {pData.name} Erlebnis?</h2>
        <p style={{ color: '#94A3B8', fontSize: 15, marginBottom: 24 }}>Melde dich an und verbinde dein Venue in unter 5 Minuten.</p>
        <button 
          onClick={handleAuthClick}
          style={{ padding: '14px 32px', borderRadius: 12, border: 'none', background: config.primary, color: '#FFF', fontWeight: 800, fontSize: 15, cursor: 'pointer' }}
        >
          Kostenlos auf app.sv.de starten →
        </button>
      </section>

    </div>
  )
}
