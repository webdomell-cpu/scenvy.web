import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { MODULE_COLORS, ScenvyAppIcon, ScenvyPhoneMockup } from '@/components/ScenvyBrandShowcase'
import { ScenvyLogoIcon } from '@/components/ScenvyLogo'
import { EcosystemHeaderBar } from '@/components/EcosystemHeaderBar'
import { 
  ArrowRight, CheckCircle, Sparkles, Globe, Layers, ShieldCheck, Zap, 
  ShoppingBag, Hotel, Utensils, Calendar, Scissors, Plane, Compass, FileText
} from 'lucide-react'

export default function ScenvyProductPage({ module = 'flow', onOpenAuthModal }) {
  const [lang, setLang] = useState(() => localStorage.getItem('scenvy_lang') || 'de')
  const m = module.toLowerCase()
  const config = MODULE_COLORS[m] || MODULE_COLORS.flow

  useEffect(() => {
    const syncLang = () => setLang(localStorage.getItem('scenvy_lang') || 'de')
    window.addEventListener('scenvy_lang_changed', syncLang)
    return () => window.removeEventListener('scenvy_lang_changed', syncLang)
  }, [])

  const details = {
    flow: {
      name: 'SCENVY FLOW',
      tagline: lang === 'de' ? 'Vertikale Video-Reels & Stories für alle Branchen' : 'Vertical Video Reels & Stories for All Industries',
      sub: lang === 'de' 
        ? 'Verwandle statische Flyer, Papier-Angebote & Schaufenster in fesselnde Vollbild-Videos. Perfekt für Gastronomie, Retail, Event, Tourismus & Dienstleister.'
        : 'Turn static flyers, paper catalogs & window displays into engaging full-screen video reels. Built for dining, retail, events, tourism & services.',
      subdomain: 'flow.scenvy.de',
      features: [
        'Vollbild TikTok-artige Story Reels im mobilen Web-Browser ohne App-Download',
        'Multi-Industry: Gastro-Angebote, Fashion-Lookbooks, Hotel-Amenities & Event-Highlights',
        'Live Countdown Deals & Flash-Sales in Echtzeit pushen',
        'KI-generierte Video-Reels in unter 60 Sekunden aus Foto oder Textbefehl',
        'Multi-Standort Dashboard für Filialen, Ketten & Franchise-Partner'
      ]
    },
    menu: {
      name: 'SCENVY MENU',
      tagline: lang === 'de' ? 'Die universelle Digitale Preisliste & Web-App' : 'The Universal Digital Price List & Web App',
      sub: lang === 'de'
        ? 'Verwandle JEDE bisherige Papier-Preisliste in eine interaktive Web-App. Für Speisen, Kosmetik-Behandlungen, SPA-Services, Mietpreise & Retail-Kataloge.'
        : 'Transform ANY paper price list into a interactive web application. For menus, salon treatments, spa services, rental rates & retail catalogs.',
      subdomain: 'menu.scenvy.de',
      features: [
        'Echtzeit-Aktualisierung von Preisen, Angeboten & Verfügbarkeiten ohne Nachdruck',
        'Allergen-, Filter- & Inhaltsstoff-Suche per Klick',
        'Interaktive Video-Präsentation aller Produkte & Dienstleistungen',
        'Direkte Tischnummer- oder Stand-Kopplung für Scan-to-Order & Anfragen',
        'Automatische Übersetzung in über 10 Sprachen (DE, EN, FR, ES, IT, AR, etc.)'
      ]
    },
    magic: {
      name: 'SCENVY MAGIC',
      tagline: lang === 'de' ? 'KI-Content & Automation Suite' : 'AI Content & Automation Suite',
      sub: lang === 'de'
        ? 'Generiere Bildschirminhalte, Social Media Posts, Promo-Videos & Preislisten automatisch mit Gemini AI.'
        : 'Generate screen content, social posts, promo videos & price lists automatically with Gemini AI.',
      subdomain: 'magic.scenvy.de',
      features: [
        'KI-generierte Video-Reels aus einfachen Text-Prompts',
        'Automatische Erfassung von Papier-Dokumenten per Foto-Upload',
        'Intelligente Angebotsempfehlungen & Preis-Optimierung',
        'Mehrsprachige Übersetzung aller Inhalte auf Knopfdruck'
      ]
    },
    link: {
      name: 'SCENVY LINK',
      tagline: lang === 'de' ? 'NFC & Smart QR Connect Solutions' : 'NFC & Smart QR Connect Solutions',
      sub: lang === 'de'
        ? 'Intelligente Tischaufsteller, NFC-Karten & QR-Code-Lösungen für Tische, Tresen, Schaufenster & Verkaufsflächen.'
        : 'Smart table displays, NFC cards & QR code solutions for tables, counters, shop windows & retail areas.',
      subdomain: 'link.scenvy.de',
      features: [
        'Hochwertige Acryl, Metall & Holz Tischaufsteller mit Gravur',
        'Integrierte NFC-Chips für instant Tap-to-Open ohne Kamera-App',
        'Dynamische Ziel-URLs: Jederzeit auf Reels, Menü, WiFi oder Bewertung umschaltbar',
        'Wasserdicht & erprobt für Innen- und Außenbereich'
      ]
    },
    store: {
      name: 'SCENVY STORE',
      tagline: lang === 'de' ? 'Hardware, Kioske & Display Zubehör' : 'Hardware, Kiosks & Display Accessories',
      sub: lang === 'de'
        ? 'Hardware-Komponenten, Stele-Displays, POS Kioske und Zubehör maßgeschneidert für Venues, Retail & Hotels.'
        : 'Hardware components, totem displays, POS kiosks & accessories tailored for venues, retail & hotels.',
      subdomain: 'store.scenvy.de',
      features: [
        'Vorkonfigurierte Smart TV Displays & Outdoor Stelen',
        'NFC & QR Tischaufsteller in Premium Metall- & Holzausführung',
        'Self-Service Bestellkioske für Fast Casual & Retail',
        'Plug & Play Einrichtung mit Garantie'
      ]
    },
    host: {
      name: 'SCENVY HOST',
      tagline: lang === 'de' ? 'Guest Experience & Hotel In-Room Portal' : 'Guest Experience & Hotel In-Room Portal',
      sub: lang === 'de'
        ? 'Das digitale Gästeerlebnis für Hotels, Resorts, VIP Lounges & Ferienwohnungen. Digitale Gästemappe, Room-Service & Concierge.'
        : 'Digital guest experience for hotels, resorts, VIP lounges & vacation rentals. Digital guest binder, room service & concierge.',
      subdomain: 'host.scenvy.de',
      features: [
        'Digitale Gästemappe auf dem Zimmer-TV oder Smartphone',
        'In-Room Dining Bestellungen direkt in die Küche',
        'SPA & Ausflugs-Buchungen ohne Rezeptionswartezeit',
        'Smart Check-Out & Bewertungssystem'
      ]
    }
  }

  const pData = details[m] || details.flow

  const handleAuthClick = (e) => {
    if (e) e.preventDefault()
    if (onOpenAuthModal) {
      onOpenAuthModal()
    } else {
      window.location.href = 'https://app.scenvy.de'
    }
  }

  // Multi-Industry Showcase
  const industries = [
    {
      icon: Utensils,
      color: '#F97316',
      title: lang === 'de' ? 'Gastronomie & Nightlife' : 'Dining & Nightlife',
      desc: lang === 'de' 
        ? 'Speisekarten, Food-Videos, Happy Hour Countdowns & Scan-to-Order am Tisch.'
        : 'Digital menus, food video reels, Happy Hour deals & scan-to-order at the table.'
    },
    {
      icon: ShoppingBag,
      color: '#3B82F6',
      title: lang === 'de' ? 'Retail & Einzelhandel' : 'Retail & Fashion',
      desc: lang === 'de'
        ? 'Digitale Produktkataloge, Schaufenster-Lookbooks & Verwandlung von Preislisten in Web-Apps.'
        : 'Digital product catalogs, window lookbooks & turning print prices into dynamic web apps.'
    },
    {
      icon: Hotel,
      color: '#10B981',
      title: lang === 'de' ? 'Hotels & Tourismus' : 'Hotels & Tourism',
      desc: lang === 'de'
        ? 'Digitale Gästemappen, SPA-Behandlungsmenüs, Ausflugsbuchungen & Room-Service.'
        : 'Digital guest folders, SPA treatment menus, excursion booking & in-room dining.'
    },
    {
      icon: Calendar,
      color: '#A855F7',
      title: lang === 'de' ? 'Events, Messen & Kultur' : 'Events & Festivals',
      desc: lang === 'de'
        ? 'Bühnenprogramme, Line-Up Reels, VIP-Pass Führungen & digitale Festival-Pläne.'
        : 'Stage schedules, lineup reels, VIP guides & interactive digital festival maps.'
    },
    {
      icon: Scissors,
      color: '#EC4899',
      title: lang === 'de' ? 'Salons, Beauty & Services' : 'Salons, Beauty & Wellness',
      desc: lang === 'de'
        ? 'Ersetze gedruckte Behandlungs- & Preislisten durch interaktive Vorher/Nachher-Reels.'
        : 'Replace printed service lists with interactive before/after video showcases.'
    }
  ]

  return (
    <div style={{ minHeight: '100vh', background: '#090818', color: '#F3F4F6', fontFamily: 'Inter, system-ui, sans-serif' }}>
      
      {/* Ecosystem Subdomain Bar */}
      <EcosystemHeaderBar onOpenAuthModal={onOpenAuthModal} lang={lang} setLang={setLang} />

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
          {lang === 'de' ? 'Jetzt Starten →' : 'Get Started →'}
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
              <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, fontSize: 15, fontWeight: 600, color: '#E2E8F0', lineHeight: 1.4 }}>
                <CheckCircle size={18} color={config.primary} style={{ flexShrink: 0, marginTop: 2 }} />
                <span>{feat}</span>
              </div>
            ))}
          </div>

          <button 
            onClick={handleAuthClick}
            style={{ padding: '16px 36px', borderRadius: 14, border: 'none', background: config.primary, color: '#FFF', fontWeight: 900, fontSize: 16, cursor: 'pointer', boxShadow: `0 8px 30px ${config.primary}55`, display: 'inline-flex', alignItems: 'center', gap: 10 }}
          >
            {lang === 'de' ? `Jetzt ${pData.name} Nutzen` : `Use ${pData.name} Now`} <ArrowRight size={18} />
          </button>
        </div>

        {/* Visual Phone / Display Mockup */}
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <ScenvyPhoneMockup module={m} size="large" active={true} />
        </div>
      </section>

      {/* Multi-Industry Capabilities Section */}
      <section style={{ padding: '70px 20px', background: '#0D0C22', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 40 }}>
            <div style={{ fontSize: 12, color: config.primary, fontWeight: 900, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 8 }}>
              {lang === 'de' ? 'EINSATZ IN ALLEN BRANCHEN' : 'FOR ALL INDUSTRIES'}
            </div>
            <h2 style={{ fontSize: 32, fontWeight: 900 }}>
              {lang === 'de' 
                ? 'Jede Papier-Preisliste wird zur interaktiven Web-App' 
                : 'Turn Any Paper Price List into an Interactive Web App'}
            </h2>
            <p style={{ color: '#94A3B8', fontSize: 16, maxWidth: 650, margin: '10px auto 0' }}>
              {lang === 'de'
                ? 'Egal ob Restaurant-Speisekarte, Beauty-Behandlungen, Retail-Angebote oder Event-Programm: SCENVY bringt Ihre Inhalte direkt aufs Smartphone der Kunden.'
                : 'Whether restaurant menus, beauty treatments, retail catalogs, or event schedules: SCENVY brings your content straight to customer smartphones.'}
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 20 }}>
            {industries.map((ind, i) => (
              <div key={i} style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 16, padding: 22 }}>
                <div style={{ width: 40, height: 40, borderRadius: 10, background: `${ind.color}20`, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 14 }}>
                  <ind.icon size={20} color={ind.color} />
                </div>
                <h3 style={{ fontSize: 17, fontWeight: 800, color: '#FFF', marginBottom: 8 }}>{ind.title}</h3>
                <p style={{ fontSize: 13, color: '#94A3B8', lineHeight: 1.5 }}>{ind.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer Banner */}
      <section style={{ padding: '60px 20px', background: '#070612', borderTop: '1px solid rgba(255,255,255,0.08)', textAlign: 'center' }}>
        <ScenvyAppIcon module={m} size={48} style={{ marginBottom: 16 }} />
        <h2 style={{ fontSize: 28, fontWeight: 900, marginBottom: 12 }}>
          {lang === 'de' ? `Bereit für das ${pData.name} Erlebnis?` : `Ready for ${pData.name}?`}
        </h2>
        <p style={{ color: '#94A3B8', fontSize: 15, marginBottom: 24 }}>
          {lang === 'de' 
            ? 'Melde dich an und verbinde dein Business in unter 5 Minuten.'
            : 'Sign up and connect your business in under 5 minutes.'}
        </p>
        <button 
          onClick={handleAuthClick}
          style={{ padding: '14px 32px', borderRadius: 12, border: 'none', background: config.primary, color: '#FFF', fontWeight: 800, fontSize: 15, cursor: 'pointer' }}
        >
          {lang === 'de' ? 'Kostenlos Registrieren →' : 'Register Free →'}
        </button>
      </section>

    </div>
  )
}
