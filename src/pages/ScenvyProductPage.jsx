import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { MODULE_COLORS, ScenvyAppIcon, ScenvyPhoneMockup } from '@/components/ScenvyBrandShowcase'
import { ScenvyLogoIcon } from '@/components/ScenvyLogo'
import { EcosystemHeaderBar } from '@/components/EcosystemHeaderBar'
import { 
  ArrowRight, CheckCircle, Sparkles, Globe, Layers, ShieldCheck, Zap, 
  ShoppingBag, Hotel, Utensils, Calendar, Scissors, FileText, Camera,
  Bell, CreditCard, Printer, Download, Check, X, Star, Upload, QrCode,
  Video, Smartphone, ChevronRight, Play, ArrowLeft, MessageCircle
} from 'lucide-react'

export default function ScenvyProductPage({ module = 'flow', onOpenAuthModal }) {
  const [lang, setLang] = useState(() => localStorage.getItem('scenvy_lang') || 'de')
  const m = module.toLowerCase()
  const config = MODULE_COLORS[m] || MODULE_COLORS.flow

  // Simulator state for Menu module
  const [simCategory, setSimCategory] = useState('italian')
  const [simLang, setSimLang] = useState('de')
  const [simFilter, setSimFilter] = useState('all')
  const [simServiceAlert, setSimServiceAlert] = useState('')

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
      tagline: lang === 'de' ? 'Das KI-gestützte Digitale Speisekarten Ecosystem' : 'The AI-Powered Digital Menu Ecosystem',
      sub: lang === 'de'
        ? 'Verwandle gedruckte Speisekarten, PDFs oder Tafel-Fotos mit künstlicher Intelligenz in ein interaktives 9:16 Video-Reel & vollwertiges Web-Menü. Inklusive KI-Food-Fotografie, 100+ Sprachen Auto-Übersetzung, Kellner-Ruf-Funktion, Tischnummer-Bestellung & autarkem Single-File HTML Export.'
        : 'Transform printed menus, PDFs or chalkboard photos into an engaging 9:16 Video Reel & full web menu using AI. Complete with AI food photography, 100+ language auto-translation, waiter calling, table ordering & standalone HTML export.',
      subdomain: 'menu.scenvy.de',
      features: [
        'KI-Food-Fotografie Generator: Hochauflösende Speisen-Fotos ohne teure Fotografen',
        'Automatische Übersetzung in über 100 Sprachen auf Knopfdruck',
        'Scan-to-Order & Pay-at-Table: Direktes Bestellen & Bezahlen am Tisch in 95+ Währungen',
        'Smart Kellner-Ruf ("Ober Rufen" & "Rechnung Bitten") per Smartphone-Klick',
        'Allergen-, Unverträglichkeits- & Inhaltsstoff-Filter in Echtzeit',
        'Autarker Single-File index.html Export für 100% Unabhängigkeit'
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

  // e-menu.ai Benchmark Pillars for Menu module
  const menuPillars = [
    {
      icon: Camera,
      color: '#F97316',
      title: lang === 'de' ? 'KI Food-Fotografie Generator' : 'AI Food Photo Generator',
      desc: lang === 'de'
        ? 'Keine teuren Food-Fotografen nötig. Gemini AI generiert appetitanregende Gerichte-Fotos in Studio-Qualität aus dem Gerichtenamen.'
        : 'No expensive food photographers needed. Gemini AI generates studio-grade dish photos directly from dish names.'
    },
    {
      icon: Globe,
      color: '#3B82F6',
      title: lang === 'de' ? '100+ Sprachen Auto-Übersetzung' : '100+ Languages Auto-Translate',
      desc: lang === 'de'
        ? 'Internationale Gäste lesen Ihre Karte sofort in ihrer Muttersprache (DE, EN, FR, ES, IT, AR, JP, ZH etc.) mit nur 1 Klick.'
        : 'International guests instantly read your menu in their native language (DE, EN, FR, ES, IT, AR, JP, ZH) with 1 click.'
    },
    {
      icon: Bell,
      color: '#EC4899',
      title: lang === 'de' ? 'Kellner-Ruf & Rechnung per Klick' : 'Smart Waiter Calling & Bill Request',
      desc: lang === 'de'
        ? 'Gäste fordern mit 1 Klick auf dem Smartphone die Rechnung an oder rufen den Kellner mit genauer Tischnummer.'
        : 'Guests request the bill or call waitstaff to their specific table number with a single tap.'
    },
    {
      icon: CreditCard,
      color: '#10B981',
      title: lang === 'de' ? 'Scan-to-Order & Pay-at-Table' : 'Scan-to-Order & Pay-at-Table',
      desc: lang === 'de'
        ? 'Direktes Bestellen & Bezahlen am Tisch via Apple Pay, Google Pay oder Kreditkarte in über 95 Währungen.'
        : 'Order and pay directly at the table via Apple Pay, Google Pay, or credit cards in over 95 currencies.'
    },
    {
      icon: Printer,
      color: '#8B5CF6',
      title: lang === 'de' ? 'Küchen-Drucker & POS Integration' : 'Kitchen Printer & POS Sync',
      desc: lang === 'de'
        ? 'Bestellungen fließen automatisch in Ihr bestehendes Kassesystem oder drucken direkt auf den Küchen-Bongdrucker.'
        : 'Orders automatically flow into your existing POS system or print directly onto kitchen printers.'
    },
    {
      icon: Download,
      color: '#06B6D4',
      title: lang === 'de' ? 'Autarker Single-File HTML Export' : 'Standalone Single-File HTML Export',
      desc: lang === 'de'
        ? 'Laden Sie Ihre gesamte Speisekarte als eine einzige, autarke index.html herunter für 100% Unabhängigkeit.'
        : 'Export your entire menu as a single autarkic index.html file for 100% hosting independence.'
    }
  ]

  // Comparison Table Rows
  const comparisonRows = [
    {
      feature: lang === 'de' ? 'Einrichtungsdauer & Aufwand' : 'Setup Time & Effort',
      paper: '1-2 Wochen Druckerei',
      pdf: '1-2 Tage manuell',
      scenvy: 'Unter 5 Minuten (KI Scan)'
    },
    {
      feature: lang === 'de' ? 'KI-Gerichte-Fotos & Beschreibungen' : 'AI Dish Photos & Descriptions',
      paper: 'Nein (Reiner Text)',
      pdf: 'Nein (Statisches PDF)',
      scenvy: 'Ja (Integrierter KI Photo Generator)'
    },
    {
      feature: lang === 'de' ? 'Automatische Sprachen (100+)' : 'Auto Translations (100+)',
      paper: 'Maximal 1-2 Sprachen',
      pdf: 'Nur Originalsprache',
      scenvy: '100+ Sprachen mit 1 Klick'
    },
    {
      feature: lang === 'de' ? 'Preisanpassung & Tageskarten' : 'Price Updates & Specials',
      paper: 'Teurer Nachdruck',
      pdf: 'Erfordert neues PDF',
      scenvy: 'Echtzeit in 5s im Dashboard'
    },
    {
      feature: lang === 'de' ? 'Kellner-Ruf & Rechnung am Tisch' : 'Waiter Call & Bill Request',
      paper: 'Nein (Mundlich)',
      pdf: 'Nein',
      scenvy: 'Ja (Inklusive Tischnummer-Signal)'
    },
    {
      feature: lang === 'de' ? 'Zusatzumsatz-Booster (9:16 Reels)' : 'Revenue Booster (9:16 Reels)',
      paper: 'Nein',
      pdf: 'Nein',
      scenvy: '+32% durch Appetit-Reels'
    },
    {
      feature: lang === 'de' ? '100% Autarker HTML-Export' : 'Standalone HTML Export',
      paper: 'Nein',
      pdf: 'PDF beschränkt',
      scenvy: '1-Klick Single-File Download'
    }
  ]

  // Simulator Data
  const simData = {
    italian: {
      de: { name: 'Trattoria Bella Vista', dish: 'Trüffel Tagliolini & Parmigiano', price: '18,90 €', desc: 'Frische Eiernudeln geschwenkt in Salbeibutter, serviert im Parmigiano-Laib mit frischem schwarzem Sommertrüffel.', tags: ['🌱 Veggie', '🍷 Weintipp: Barolo', '⭐ Chef Special'], img: 'https://images.unsplash.com/photo-1551183053-bf91a1d81141?w=800&q=80' },
      en: { name: 'Trattoria Bella Vista', dish: 'Truffle Tagliolini & Parmigiano', price: '€18.90', desc: 'Fresh egg pasta tossed in sage butter, served in a wheel of Parmigiano with fresh black summer truffle.', tags: ['🌱 Veggie', '🍷 Wine Match: Barolo', '⭐ Chef Special'], img: 'https://images.unsplash.com/photo-1551183053-bf91a1d81141?w=800&q=80' }
    },
    burger: {
      de: { name: 'Smash & Smoke Craft Burgers', dish: 'Double Truffle Smash Burger', price: '15,50 €', desc: 'Zwei kross gebratene Black Angus Smash Patties, doppelt Cheddar, getrüffelte Mayo & Bio-Bacon im Brioche Bun.', tags: ['🔥 Hot Seller', '🥓 Double Bacon', '🍺 Craft Beer'], img: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&q=80' },
      en: { name: 'Smash & Smoke Craft Burgers', dish: 'Double Truffle Smash Burger', price: '€15.50', desc: 'Two crispy Black Angus smash patties, double cheddar, truffle mayo & bio bacon in a toasted brioche bun.', tags: ['🔥 Hot Seller', '🥓 Double Bacon', '🍺 Craft Beer'], img: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&q=80' }
    },
    sushi: {
      de: { name: 'Oishii Asian & Omakase', dish: 'Dragon Roll Flambé Special', price: '21,00 €', desc: 'Tempura Garnelen, Avocado, umhüllt mit flambiertem Lachs, Unagi-Sauce, Keta-Kaviar und frischem Schnittlauch.', tags: ['🍣 Signature Roll', '🔥 Flambiert', '🌶️ Mild Spicy'], img: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=800&q=80' },
      en: { name: 'Oishii Asian & Omakase', dish: 'Dragon Roll Flambé Special', price: '€21.00', desc: 'Tempura prawns, avocado, wrapped in flambéed salmon, unagi sauce, keta caviar and fresh chives.', tags: ['🍣 Signature Roll', '🔥 Flambeed', '🌶️ Mild Spicy'], img: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=800&q=80' }
    }
  }

  const curSim = simData[simCategory][simLang] || simData.italian.de

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

          <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
            <button 
              onClick={handleAuthClick}
              style={{ padding: '16px 36px', borderRadius: 14, border: 'none', background: config.primary, color: '#FFF', fontWeight: 900, fontSize: 16, cursor: 'pointer', boxShadow: `0 8px 30px ${config.primary}55`, display: 'inline-flex', alignItems: 'center', gap: 10 }}
            >
              {lang === 'de' ? `Jetzt ${pData.name} Nutzen` : `Use ${pData.name} Now`} <ArrowRight size={18} />
            </button>
            {m === 'menu' && (
              <a 
                href="#menu-simulator"
                style={{ padding: '16px 28px', borderRadius: 14, border: '1px solid rgba(255,255,255,0.15)', background: 'rgba(255,255,255,0.05)', color: '#FFF', fontWeight: 800, fontSize: 15, textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 8 }}
              >
                <Play size={16} fill="#FFF" /> {lang === 'de' ? 'Live Demo Simulator' : 'Live Demo Simulator'}
              </a>
            )}
          </div>
        </div>

        {/* Visual Phone / Display Mockup */}
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <ScenvyPhoneMockup module={m} size="large" active={true} />
        </div>
      </section>

      {/* METRICS & PROOF BAR (Specialized for Menu) */}
      {m === 'menu' && (
        <section style={{ background: '#0D0C22', borderTop: '1px solid rgba(255,255,255,0.08)', borderBottom: '1px solid rgba(255,255,255,0.08)', padding: '36px 20px' }}>
          <div style={{ maxWidth: 1100, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 24, textAlign: 'center' }}>
            <div>
              <div style={{ fontSize: 36, fontWeight: 900, color: config.primary }}>+32%</div>
              <div style={{ fontSize: 13, color: '#94A3B8', fontWeight: 600, marginTop: 4 }}>
                {lang === 'de' ? 'Umsatzsteigerung bei Desserts & Drinks' : 'Revenue Boost on Desserts & Drinks'}
              </div>
            </div>
            <div>
              <div style={{ fontSize: 36, fontWeight: 900, color: '#10B981' }}>&lt; 0.8s</div>
              <div style={{ fontSize: 13, color: '#94A3B8', fontWeight: 600, marginTop: 4 }}>
                {lang === 'de' ? 'Ultra-schnelle Ladezeit ohne App' : 'Ultra-fast loading without app'}
              </div>
            </div>
            <div>
              <div style={{ fontSize: 36, fontWeight: 900, color: '#EC4899' }}>100+</div>
              <div style={{ fontSize: 13, color: '#94A3B8', fontWeight: 600, marginTop: 4 }}>
                {lang === 'de' ? 'Sprachen Auto-Übersetzung' : 'Languages Auto-Translation'}
              </div>
            </div>
            <div>
              <div style={{ fontSize: 36, fontWeight: 900, color: '#3B82F6' }}>0 €</div>
              <div style={{ fontSize: 13, color: '#94A3B8', fontWeight: 600, marginTop: 4 }}>
                {lang === 'de' ? 'Hardware-Kosten (Nutzung eigener Geräte)' : 'Hardware Cost (Use existing devices)'}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* CORE PILLARS GRID (e-menu.ai benchmark features) */}
      {m === 'menu' && (
        <section style={{ padding: '80px 20px', background: '#090818' }}>
          <div style={{ maxWidth: 1100, margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: 50 }}>
              <div style={{ fontSize: 12, color: config.primary, fontWeight: 900, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 8 }}>
                {lang === 'de' ? '6 KI-KERNSÄULEN FÜR GASTRONOMEN' : '6 AI PILLARS FOR RESTAURANTS'}
              </div>
              <h2 style={{ fontSize: 'clamp(28px, 3.5vw, 42px)', fontWeight: 900 }}>
                {lang === 'de' ? 'Mehr als nur ein QR-Code: Die komplette KI-Gastronomie Suite' : 'More Than Just a QR Code: The Complete AI Dining Suite'}
              </h2>
              <p style={{ color: '#94A3B8', fontSize: 16, maxWidth: 680, margin: '12px auto 0', lineHeight: 1.6 }}>
                {lang === 'de'
                  ? 'Entdecken Sie die Werkzeuge, die Ihre Speisekarte vom reinen Papierblatt in einen hochkonvertierenden visuellen Verkaufskanal verwandeln.'
                  : 'Discover the tools that turn your menu from plain paper into a high-converting visual sales channel.'}
              </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 24 }}>
              {menuPillars.map((p, idx) => (
                <div key={idx} style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 20, padding: 28 }}>
                  <div style={{ width: 48, height: 48, borderRadius: 12, background: `${p.color}20`, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 18 }}>
                    <p.icon size={24} color={p.color} />
                  </div>
                  <h3 style={{ fontSize: 19, fontWeight: 800, color: '#FFF', marginBottom: 10 }}>{p.title}</h3>
                  <p style={{ fontSize: 14, color: '#94A3B8', lineHeight: 1.6 }}>{p.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* DUAL LINKS & STANDALONE HTML SECTION */}
      {m === 'menu' && (
        <section style={{ padding: '80px 20px', background: '#0E0D25', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
          <div style={{ maxWidth: 1100, margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: 44 }}>
              <div style={{ fontSize: 12, color: '#EC4899', fontWeight: 900, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 8 }}>
                DUAL FORMAT OUTPUT & AUTARKIE
              </div>
              <h2 style={{ fontSize: 'clamp(26px, 3.5vw, 38px)', fontWeight: 900 }}>
                {lang === 'de' ? 'Duale Links & Single-File HTML Export' : 'Dual Links & Standalone Single-File HTML Export'}
              </h2>
              <p style={{ fontSize: 16, color: '#94A3B8', maxWidth: 640, margin: '12px auto 0' }}>
                {lang === 'de'
                  ? 'Sie erhalten automatisch zwei spezialisierte Formate für jeden Tisch – plus die Möglichkeit, die gesamte Speisekarte als autarke HTML-Datei herunterzuladen.'
                  : 'Get two specialized formats automatically for every table — plus the option to download your entire menu as an autarkic HTML file.'}
              </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 24 }}>
              {/* Card 1: 9:16 Video Reel */}
              <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(249,115,22,0.4)', borderRadius: 20, padding: 26 }}>
                <div style={{ width: 44, height: 44, borderRadius: 12, background: 'rgba(249,115,22,0.2)', color: '#F97316', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 16 }}>
                  <Video size={22} />
                </div>
                <h3 style={{ fontSize: 18, fontWeight: 800, color: '#FFF', marginBottom: 8 }}>
                  {lang === 'de' ? '🎬 Link 1: 9:16 Video Reel Showcase' : '🎬 Link 1: 9:16 Video Reel Showcase'}
                </h3>
                <p style={{ fontSize: 13, color: '#94A3B8', lineHeight: 1.6, marginBottom: 16 }}>
                  {lang === 'de' 
                    ? 'Faszinierende Vollbild-Storys mit Musik & Animationen. Perfekt für Social Media, Tischaufsteller & Spontankäufe.'
                    : 'Engaging full-screen stories with sound & animations. Ideal for social media, table standees & impulse purchases.'}
                </p>
                <div style={{ background: '#090818', padding: 10, borderRadius: 10, fontSize: 11, color: '#F97316', fontWeight: 700, border: '1px solid rgba(255,255,255,0.1)' }}>
                  https://menu.scenvy.de/m/demo?view=reel
                </div>
              </div>

              {/* Card 2: Full Interactive Web Menu */}
              <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(59,130,246,0.4)', borderRadius: 20, padding: 26 }}>
                <div style={{ width: 44, height: 44, borderRadius: 12, background: 'rgba(59,130,246,0.2)', color: '#3B82F6', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 16 }}>
                  <Globe size={22} />
                </div>
                <h3 style={{ fontSize: 18, fontWeight: 800, color: '#FFF', marginBottom: 8 }}>
                  {lang === 'de' ? '📖 Link 2: Komplettes Web-Menü' : '📖 Link 2: Full Web Menu'}
                </h3>
                <p style={{ fontSize: 13, color: '#94A3B8', lineHeight: 1.6, marginBottom: 16 }}>
                  {lang === 'de'
                    ? 'Vollwertige Speisekarte mit Kategorien, Allergenfilter, Kellner-Ruf & Tischnummer-Bestellung.'
                    : 'Full menu with category tabs, allergen filters, waiter calling & direct table ordering.'}
                </p>
                <div style={{ background: '#090818', padding: 10, borderRadius: 10, fontSize: 11, color: '#3B82F6', fontWeight: 700, border: '1px solid rgba(255,255,255,0.1)' }}>
                  https://menu.scenvy.de/m/demo?view=menu
                </div>
              </div>

              {/* Card 3: Standalone Single-File HTML */}
              <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(16,185,129,0.4)', borderRadius: 20, padding: 26, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <div style={{ width: 44, height: 44, borderRadius: 12, background: 'rgba(16,185,129,0.2)', color: '#10B981', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 16 }}>
                    <FileText size={22} />
                  </div>
                  <h3 style={{ fontSize: 18, fontWeight: 800, color: '#FFF', marginBottom: 8 }}>
                    {lang === 'de' ? '📄 Single-File HTML Export' : '📄 Standalone Single-File HTML Export'}
                  </h3>
                  <p style={{ fontSize: 13, color: '#94A3B8', lineHeight: 1.6, marginBottom: 16 }}>
                    {lang === 'de'
                      ? 'Laden Sie Ihre Speisekarte als eine einzige, autarke index.html-Datei herunter. Keine externen Abhängigkeiten, 100% Hosting-Freiheit.'
                      : 'Download your menu as a single autarkic index.html file. Zero external dependencies, 100% hosting freedom.'}
                  </p>
                </div>
                <button
                  onClick={() => {
                    const sampleHtml = `<!DOCTYPE html><html lang="de"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0"><title>SCENVY Standalone Digital Menu</title><style>body{margin:0;padding:24px;background:#0d0d14;color:#fff;font-family:sans-serif;text-align:center;}h1{color:#F97316;}.item{background:#1a1a24;padding:16px;margin:12px 0;border-radius:12px;border:1px solid #333;}.price{color:#10B981;font-weight:bold;font-size:18px;}</style></head><body><h1>Trattoria Bella Vista</h1><p>Digitales Menü – Autarke Single-File Version</p><div class="item"><h3>Pizza Burrata Gourmet</h3><p>San Marzano Tomaten, frische Burrata, Basilikum-Öl & Bio-Prosciutto</p><div class="price">14,50 €</div></div><div class="item"><h3>Trüffel Tagliolini</h3><p>Frische Eiernudeln, Parmigiano-Laib, Sommertrüffel</p><div class="price">18,90 €</div></div></body></html>`
                    const blob = new Blob([sampleHtml], { type: 'text/html' })
                    const url = URL.createObjectURL(blob)
                    const a = document.createElement('a')
                    a.href = url
                    a.download = 'scenvy-digital-menu.html'
                    a.click()
                    URL.revokeObjectURL(url)
                  }}
                  style={{ padding: '10px 16px', borderRadius: 10, border: 'none', background: '#10B981', color: '#FFF', fontWeight: 800, fontSize: 13, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}
                >
                  <Download size={14} /> {lang === 'de' ? 'Sample HTML Export Herunterladen' : 'Download Sample HTML File'}
                </button>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* INTERACTIVE MENU SIMULATOR */}
      {m === 'menu' && (
        <section id="menu-simulator" style={{ padding: '80px 20px', background: '#090818' }}>
          <div style={{ maxWidth: 1100, margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: 40 }}>
              <div style={{ fontSize: 12, color: config.primary, fontWeight: 900, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 8 }}>
                LIVE VORSCHAU SIMULATOR
              </div>
              <h2 style={{ fontSize: 'clamp(28px, 3.5vw, 40px)', fontWeight: 900 }}>
                {lang === 'de' ? 'Erleben Sie die Speisekarte aus Sicht Ihrer Gäste' : 'Experience the Menu as Your Guests See It'}
              </h2>
              <p style={{ color: '#94A3B8', fontSize: 15, marginTop: 8 }}>
                {lang === 'de' ? 'Wählen Sie ein Restaurant-Profil und testen Sie die interaktiven Funktionen:' : 'Select a cuisine profile and test the interactive features:'}
              </p>
            </div>

            {/* Controls Bar */}
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 12, flexWrap: 'wrap', marginBottom: 32 }}>
              <div style={{ display: 'flex', background: 'rgba(255,255,255,0.06)', borderRadius: 12, padding: 4, border: '1px solid rgba(255,255,255,0.1)' }}>
                <button
                  onClick={() => setSimCategory('italian')}
                  style={{ padding: '8px 16px', borderRadius: 8, border: 'none', background: simCategory === 'italian' ? config.primary : 'transparent', color: '#FFF', fontWeight: 800, fontSize: 13, cursor: 'pointer' }}
                >
                  🍕 Trattoria & Pizza
                </button>
                <button
                  onClick={() => setSimCategory('burger')}
                  style={{ padding: '8px 16px', borderRadius: 8, border: 'none', background: simCategory === 'burger' ? config.primary : 'transparent', color: '#FFF', fontWeight: 800, fontSize: 13, cursor: 'pointer' }}
                >
                  🍔 Craft Burger
                </button>
                <button
                  onClick={() => setSimCategory('sushi')}
                  style={{ padding: '8px 16px', borderRadius: 8, border: 'none', background: simCategory === 'sushi' ? config.primary : 'transparent', color: '#FFF', fontWeight: 800, fontSize: 13, cursor: 'pointer' }}
                >
                  🍣 Asian Omakase
                </button>
              </div>

              {/* Language Switcher in Simulator */}
              <div style={{ display: 'flex', background: 'rgba(255,255,255,0.06)', borderRadius: 10, padding: 3, border: '1px solid rgba(255,255,255,0.1)' }}>
                <button
                  onClick={() => setSimLang('de')}
                  style={{ padding: '6px 12px', borderRadius: 6, border: 'none', background: simLang === 'de' ? '#3B82F6' : 'transparent', color: '#FFF', fontWeight: 800, fontSize: 12, cursor: 'pointer' }}
                >
                  🇩🇪 DE
                </button>
                <button
                  onClick={() => setSimLang('en')}
                  style={{ padding: '6px 12px', borderRadius: 6, border: 'none', background: simLang === 'en' ? '#3B82F6' : 'transparent', color: '#FFF', fontWeight: 800, fontSize: 12, cursor: 'pointer' }}
                >
                  🇬🇧 EN
                </button>
              </div>
            </div>

            {/* Simulator Display Card */}
            <div style={{ maxWidth: 440, margin: '0 auto', background: '#121124', border: '1px solid rgba(255,255,255,0.12)', borderRadius: 24, overflow: 'hidden', boxShadow: '0 25px 60px rgba(0,0,0,0.6)' }}>
              <div style={{ position: 'relative', height: 260 }}>
                <img src={curSim.img} alt={curSim.dish} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, #121124 10%, transparent 60%)' }} />
                
                <div style={{ position: 'absolute', top: 16, left: 16, background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(8px)', padding: '6px 14px', borderRadius: 20, fontSize: 12, fontWeight: 800, color: '#FFF' }}>
                  📍 Tisch 12 • {curSim.name}
                </div>

                <div style={{ position: 'absolute', top: 16, right: 16, background: config.primary, color: '#FFF', padding: '4px 10px', borderRadius: 12, fontSize: 11, fontWeight: 900 }}>
                  9:16 REEL DEMO
                </div>
              </div>

              <div style={{ padding: 24 }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
                  <h3 style={{ fontSize: 20, fontWeight: 900, color: '#FFF' }}>{curSim.dish}</h3>
                  <span style={{ fontSize: 20, fontWeight: 900, color: '#10B981' }}>{curSim.price}</span>
                </div>

                <p style={{ fontSize: 14, color: '#94A3B8', lineHeight: 1.6, marginBottom: 16 }}>
                  {curSim.desc}
                </p>

                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 20 }}>
                  {curSim.tags.map((tg, idx) => (
                    <span key={idx} style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', color: '#E2E8F0', fontSize: 11, fontWeight: 700, padding: '4px 10px', borderRadius: 8 }}>
                      {tg}
                    </span>
                  ))}
                </div>

                {/* Smart Waiter Calling Buttons */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: 16 }}>
                  <button
                    onClick={() => {
                      setSimServiceAlert(simLang === 'de' ? '🔔 Kellner an Tisch 12 gerufen!' : '🔔 Waiter called to Table 12!')
                      setTimeout(() => setSimServiceAlert(''), 3000)
                    }}
                    style={{ padding: '10px', borderRadius: 10, border: '1px solid rgba(236,72,153,0.4)', background: 'rgba(236,72,153,0.15)', color: '#F472B6', fontWeight: 800, fontSize: 12, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}
                  >
                    <Bell size={14} /> {simLang === 'de' ? 'Ober Rufen' : 'Call Waiter'}
                  </button>

                  <button
                    onClick={() => {
                      setSimServiceAlert(simLang === 'de' ? '💳 Rechnung für Tisch 12 angefordert!' : '💳 Bill requested for Table 12!')
                      setTimeout(() => setSimServiceAlert(''), 3000)
                    }}
                    style={{ padding: '10px', borderRadius: 10, border: '1px solid rgba(59,130,246,0.4)', background: 'rgba(59,130,246,0.15)', color: '#60A5FA', fontWeight: 800, fontSize: 12, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}
                  >
                    <CreditCard size={14} /> {simLang === 'de' ? 'Rechnung Bitte' : 'Request Bill'}
                  </button>
                </div>

                {simServiceAlert && (
                  <div style={{ marginTop: 12, padding: '8px 12px', background: 'rgba(16,185,129,0.2)', border: '1px solid rgba(16,185,129,0.4)', color: '#34D399', borderRadius: 8, fontSize: 12, fontWeight: 800, textAlign: 'center' }}>
                    {simServiceAlert}
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* WHAT YOU GET COMPARISON TABLE (Fixing and perfecting the comparison table) */}
      {m === 'menu' && (
        <section style={{ padding: '80px 20px', background: '#0D0C22', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
          <div style={{ maxWidth: 1100, margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: 44 }}>
              <div style={{ fontSize: 12, color: '#10B981', fontWeight: 900, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 8 }}>
                VERGLEICHSMATRIX & 'WHAT YOU GET'
              </div>
              <h2 style={{ fontSize: 'clamp(28px, 3.5vw, 42px)', fontWeight: 900 }}>
                {lang === 'de' ? 'Warum SCENVY MENU die beste Wahl ist' : 'Why SCENVY MENU is the Ultimate Choice'}
              </h2>
              <p style={{ color: '#94A3B8', fontSize: 16, maxWidth: 660, margin: '12px auto 0' }}>
                {lang === 'de'
                  ? 'Vergleichen Sie traditionelle Papier-Karten, einfache PDF QR-Codes und das vollwertige SCENVY KI-Ecosystem auf einen Blick.'
                  : 'Compare traditional paper menus, simple PDF QR codes, and the full SCENVY AI Ecosystem at a glance.'}
              </p>
            </div>

            <div style={{ background: 'rgba(15,23,42,0.8)', borderRadius: 20, border: '1px solid rgba(255,255,255,0.1)', overflowX: 'auto', boxShadow: '0 20px 40px rgba(0,0,0,0.5)' }}>
              <table style={{ width: '100%', minWidth: 640, borderCollapse: 'collapse', textAlign: 'left' }}>
                <thead>
                  <tr style={{ background: 'rgba(255,255,255,0.05)', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                    <th style={{ padding: '20px 24px', fontSize: 14, fontWeight: 800, color: '#FFF' }}>
                      {lang === 'de' ? 'Feature / Kriterium' : 'Feature / Criterion'}
                    </th>
                    <th style={{ padding: '20px 24px', fontSize: 14, fontWeight: 800, color: '#94A3B8' }}>
                      {lang === 'de' ? 'Papier-Speisekarte' : 'Printed Paper Menu'}
                    </th>
                    <th style={{ padding: '20px 24px', fontSize: 14, fontWeight: 800, color: '#94A3B8' }}>
                      {lang === 'de' ? 'Standard PDF QR' : 'Standard PDF QR'}
                    </th>
                    <th style={{ padding: '20px 24px', fontSize: 14, fontWeight: 900, color: '#34D399', background: 'rgba(16,185,129,0.12)' }}>
                      ⚡ SCENVY MENU
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonRows.map((row, idx) => (
                    <tr key={idx} style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                      <td style={{ padding: '18px 24px', fontSize: 13, fontWeight: 700, color: '#FFF' }}>{row.feature}</td>
                      <td style={{ padding: '18px 24px', fontSize: 13, color: '#64748B' }}>{row.paper}</td>
                      <td style={{ padding: '18px 24px', fontSize: 13, color: '#94A3B8' }}>{row.pdf}</td>
                      <td style={{ padding: '18px 24px', fontSize: 13, fontWeight: 800, color: '#34D399', background: 'rgba(16,185,129,0.05)' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                          <Check size={16} color="#34D399" />
                          <span>{row.scenvy}</span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      )}

      {/* Multi-Industry Capabilities Section (Standard) */}
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

