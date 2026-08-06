import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { C, grad } from '@/tokens'
import { ScenvyLogoFull, ScenvyLogoIcon } from '@/components/ScenvyLogo'
import { MODULE_COLORS, ScenvyAppIcon } from '@/components/ScenvyBrandShowcase'
import { 
  Tv, Rss, Table, Image as ImageIcon, Video, Sparkles, Sun, Plane, Utensils, 
  CheckCircle, ArrowRight, Monitor, Layers, ShieldCheck, Zap, Globe, Smartphone,
  Clock, RefreshCw, BarChart, Sliders, Play, ExternalLink, HelpCircle, Building, Hotel
} from 'lucide-react'

export default function ScenvyBoardPage({ onOpenAuthModal }) {
  const navigate = useNavigate()
  const [lang, setLang] = useState('de')
  const [activeBoardTab, setActiveBoardTab] = useState('menu') // 'menu' | 'rss' | 'flight' | 'weather' | 'ai'
  const [dayTime, setDayTime] = useState('lunch') // 'breakfast' | 'lunch' | 'happyhour' | 'dinner'
  const [tickerSpeed, setTickerSpeed] = useState('normal')

  const boardColor = MODULE_COLORS.board.primary // #3B82F6

  // Simulated live data feed
  const menuItems = {
    breakfast: [
      { name: 'Avocado Toast & Egg', price: '9,50 €', tag: 'Bestseller', desc: 'Sauerteigbrot, Bio-Spiegelei, Kresse' },
      { name: 'Acai Bowl Supreme', price: '8,90 €', tag: 'Vegan', desc: 'Frische Beeren, Hausgemachtes Granola, Chia' },
      { name: 'Matcha Latte / Flat White', price: '4,20 €', tag: 'Special', desc: 'Hafermilch inklusiv' }
    ],
    lunch: [
      { name: 'Truffle Burger & Sweet Fries', price: '16,80 €', tag: 'Chef Choice', desc: 'Angus Beef, Trüffel-Mayonnaise, Brioche' },
      { name: 'Poke Bowl Salmon', price: '14,90 €', tag: 'Fresh', desc: 'Wildlachs, Edamame, Mango, Sesam-Dressing' },
      { name: 'Homemade Iced Tea', price: '4,50 €', tag: 'Refresher', desc: 'Pfirsich-Thymian mit Minze' }
    ],
    happyhour: [
      { name: '2-for-1 Signature Cocktails', price: '12,00 €', tag: 'Happy Hour Deal', desc: 'Espresso Martini, Aperol Spritz, Passionfruit Special' },
      { name: 'Tapas Platter & Jamón', price: '18,50 €', tag: 'To Share', desc: 'Manchego, Oliven, Serrano, Knoblauchbrot' },
      { name: 'Craft Beer Flight (3x 0.2l)', price: '9,00 €', tag: 'Local Brew', desc: 'Regionale Braukunst vom Fass' }
    ],
    dinner: [
      { name: 'Dry Aged Ribeye Steak 300g', price: '34,00 €', tag: 'Premium', desc: 'Kräuterbutter, Grillgemüse, Steak-Fries' },
      { name: 'Gebratenes Zanderfilet', price: '26,50 €', tag: 'Regional', desc: 'Riesling-Schaum, Kartoffel-Püree' },
      { name: 'Lava Cake & Vanilleeis', price: '9,00 €', tag: 'Dessert', desc: 'Warmes Schokotörtchen mit flüssigem Kern' }
    ]
  }

  const handleAuthClick = (e) => {
    e.preventDefault()
    if (onOpenAuthModal) {
      onOpenAuthModal()
    } else {
      window.location.href = 'https://app.sv.de'
    }
  }

  return (
    <div style={{ minHeight: '100vh', background: '#070B14', color: '#F3F4F6', fontFamily: 'Inter, system-ui, sans-serif' }}>
      
      {/* Ecosystem Top Bar (Subdomain Navigation) */}
      <div style={{ background: 'rgba(15, 23, 42, 0.95)', borderBottom: '1px solid rgba(255,255,255,0.08)', padding: '8px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: 12 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, overflowX: 'auto' }}>
          <span style={{ color: 'rgba(255,255,255,0.5)', fontWeight: 700, letterSpacing: 1 }}>ECOSYSTEM:</span>
          <Link to="/" style={{ color: '#94A3B8', textDecoration: 'none', fontWeight: 600, transition: 'color 0.2s' }}>scenvy.de</Link>
          <span style={{ color: '#38BDF8', fontWeight: 800, background: 'rgba(56,189,248,0.15)', padding: '2px 8px', borderRadius: 6, border: '1px solid rgba(56,189,248,0.3)' }}>board.sv.de</span>
          <Link to="/flow" style={{ color: '#94A3B8', textDecoration: 'none', fontWeight: 600 }}>flow.sv.de</Link>
          <Link to="/menu" style={{ color: '#94A3B8', textDecoration: 'none', fontWeight: 600 }}>menu.sv.de</Link>
          <Link to="/magic" style={{ color: '#94A3B8', textDecoration: 'none', fontWeight: 600 }}>magic.sv.de</Link>
          <Link to="/link" style={{ color: '#94A3B8', textDecoration: 'none', fontWeight: 600 }}>link.sv.de</Link>
          <Link to="/store" style={{ color: '#94A3B8', textDecoration: 'none', fontWeight: 600 }}>store.sv.de</Link>
          <Link to="/host" style={{ color: '#94A3B8', textDecoration: 'none', fontWeight: 600 }}>host.sv.de</Link>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <button onClick={() => setLang(l => l === 'de' ? 'en' : 'de')} style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)', color: '#FFF', padding: '3px 8px', borderRadius: 6, fontSize: 11, cursor: 'pointer', fontWeight: 700 }}>
            {lang === 'de' ? '🇩🇪 DE' : '🇬🇧 EN'}
          </button>
          <Link to="/" style={{ textDecoration: 'none', color: '#38BDF8', fontWeight: 700, fontSize: 12 }}>
            ← Zur Hauptseite
          </Link>
        </div>
      </div>

      {/* Main Product Header */}
      <header style={{ padding: '16px 32px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.08)', backdropFilter: 'blur(16px)', position: 'sticky', top: 0, zIndex: 50, background: 'rgba(7,11,20,0.85)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <ScenvyAppIcon module="board" size={38} />
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ fontSize: 20, fontWeight: 900, color: '#FFF', letterSpacing: -0.5 }}>SCENVY</span>
              <span style={{ fontSize: 20, fontWeight: 900, color: boardColor, letterSpacing: -0.5 }}>BOARD</span>
              <span style={{ fontSize: 10, background: 'rgba(59,130,246,0.2)', color: '#60A5FA', padding: '2px 8px', borderRadius: 12, fontWeight: 800, border: '1px solid rgba(59,130,246,0.3)' }}>SaaS Signage</span>
            </div>
            <div style={{ fontSize: 12, color: '#94A3B8' }}>Digitales Zahlensystem & Digital Menu Board Software</div>
          </div>
        </div>

        <nav style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
          <a href="#features" style={{ color: '#CBD5E1', textDecoration: 'none', fontSize: 14, fontWeight: 600 }}>Features</a>
          <a href="#demo-simulator" style={{ color: '#CBD5E1', textDecoration: 'none', fontSize: 14, fontWeight: 600 }}>Live Simulator</a>
          <a href="#solutions" style={{ color: '#CBD5E1', textDecoration: 'none', fontSize: 14, fontWeight: 600 }}>Branchenlösungen</a>
          <a href="#vergleich" style={{ color: '#CBD5E1', textDecoration: 'none', fontSize: 14, fontWeight: 600 }}>Vorteile</a>
          
          <button 
            onClick={handleAuthClick}
            style={{ padding: '10px 22px', borderRadius: 10, border: 'none', background: 'linear-gradient(135deg, #3B82F6 0%, #1D4ED8 100%)', color: '#FFF', fontWeight: 800, fontSize: 14, cursor: 'pointer', boxShadow: '0 4px 20px rgba(59,130,246,0.4)', transition: 'transform 0.2s' }}
          >
            {lang === 'de' ? 'App Login (app.sv.de) →' : 'App Sign In →'}
          </button>
        </nav>
      </header>

      {/* Hero Section */}
      <section style={{ padding: '60px 20px 80px', maxWidth: 1200, margin: '0 auto', textAlign: 'center', position: 'relative' }}>
        <div style={{ position: 'absolute', top: -40, left: '50%', transform: 'translateX(-50%)', width: 600, height: 400, background: 'radial-gradient(circle, rgba(59,130,246,0.2) 0%, transparent 70%)', pointerEvents: 'none', borderRadius: '50%' }} />

        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '6px 16px', borderRadius: 20, background: 'rgba(59,130,246,0.12)', border: '1px solid rgba(59,130,246,0.3)', color: '#60A5FA', fontSize: 13, fontWeight: 800, marginBottom: 20 }}>
          <Sparkles size={16} /> 100% URL-BASIERT · KEINE PLAYER-HARDWARE ERFORDERLICH
        </div>

        <h1 style={{ fontSize: 'clamp(32px, 5vw, 56px)', fontWeight: 900, lineHeight: 1.15, marginBottom: 20, maxWidth: 950, margin: '0 auto 20px' }}>
          Das intelligente <span style={{ background: 'linear-gradient(135deg, #60A5FA 0%, #3B82F6 50%, #1D4ED8 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Digital Menu Board & Signage System</span> für Gastronomie & Hotels.
        </h1>

        <p style={{ fontSize: 18, color: '#94A3B8', maxWidth: 760, margin: '0 auto 36px', lineHeight: 1.6 }}>
          Schluss mit teuren Hardware-Mediaplayern. SCENVY Board verwandelt jeden Smart TV, Monitor oder Display per Browser-URL in eine dynamische, KI-gestützte Werbe- und Speisekartentafel mit Google Sheets Sync, RSS Feeds, Flugtafeln und Tageszeiten-Steuerung.
        </p>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 16, flexWrap: 'wrap', marginBottom: 40 }}>
          <button 
            onClick={handleAuthClick}
            style={{ padding: '16px 36px', borderRadius: 14, border: 'none', background: 'linear-gradient(135deg, #3B82F6 0%, #1D4ED8 100%)', color: '#FFF', fontWeight: 900, fontSize: 16, cursor: 'pointer', boxShadow: '0 8px 30px rgba(59,130,246,0.4)', display: 'inline-flex', alignItems: 'center', gap: 10 }}
          >
            Jetzt Scenvy Board testen <ArrowRight size={18} />
          </button>
          
          <a 
            href="#demo-simulator"
            style={{ padding: '16px 28px', borderRadius: 14, border: '1px solid rgba(255,255,255,0.15)', background: 'rgba(255,255,255,0.05)', color: '#FFF', fontWeight: 800, fontSize: 15, textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 8 }}
          >
            <Play size={16} fill="#FFF" /> Live Simulator ansehen
          </a>
        </div>

        {/* Feature Badges */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 16, maxWidth: 900, margin: '0 auto' }}>
          {[
            { icon: Tv, label: 'URL-basiert ohne Player' },
            { icon: Table, label: 'Google Sheets Live Sync' },
            { icon: Rss, label: 'RSS News & Flugtafeln' },
            { icon: Sparkles, label: 'KI Content Designer' },
            { icon: Utensils, label: 'Digitales Menü Board' }
          ].map((item, i) => (
            <div key={i} style={{ padding: '12px 16px', borderRadius: 12, background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', display: 'flex', alignItems: 'center', gap: 10, fontSize: 13, fontWeight: 700, color: '#E2E8F0' }}>
              <item.icon size={18} color="#60A5FA" />
              <span>{item.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Interactive Live Board Simulator Section */}
      <section id="demo-simulator" style={{ padding: '60px 20px', background: '#0B1120', borderTop: '1px solid rgba(255,255,255,0.08)', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 32 }}>
            <div style={{ fontSize: 12, color: '#60A5FA', fontWeight: 900, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 8 }}>INTERAKTIVE DEMO</div>
            <h2 style={{ fontSize: 32, fontWeight: 900 }}>Testen Sie SCENVY Board live auf dem Screen</h2>
            <p style={{ color: '#94A3B8', fontSize: 15, marginTop: 8 }}>Schalten Sie zwischen verschiedenen Screen-Modis und Tageszeiten um.</p>
          </div>

          {/* Controls Bar */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16, background: '#070B14', padding: '16px 20px', borderRadius: '16px 16px 0 0', border: '1px solid rgba(255,255,255,0.1)', borderBottom: 'none' }}>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {[
                { id: 'menu', label: '🍕 Digital Menü Board', icon: Utensils },
                { id: 'rss', label: '📰 RSS & Nachrichten', icon: Rss },
                { id: 'flight', label: '✈️ Flug- & Abflugtafel', icon: Plane },
                { id: 'weather', label: '☀️ Wetter & Info', icon: Sun },
                { id: 'ai', label: '✨ KI Banner Creator', icon: Sparkles }
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveBoardTab(tab.id)}
                  style={{
                    padding: '8px 16px', borderRadius: 10, border: 'none',
                    background: activeBoardTab === tab.id ? '#3B82F6' : 'rgba(255,255,255,0.06)',
                    color: '#FFF', fontWeight: 800, fontSize: 13, cursor: 'pointer',
                    display: 'flex', alignItems: 'center', gap: 6, transition: 'all 0.2s'
                  }}
                >
                  <tab.icon size={15} /> {tab.label}
                </button>
              ))}
            </div>

            {activeBoardTab === 'menu' && (
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ fontSize: 12, color: '#94A3B8', fontWeight: 700 }}>Tageszeit:</span>
                {[
                  { id: 'breakfast', label: 'Frühstück' },
                  { id: 'lunch', label: 'Mittag' },
                  { id: 'happyhour', label: 'Happy Hour' },
                  { id: 'dinner', label: 'Abendessen' }
                ].map(dt => (
                  <button
                    key={dt.id}
                    onClick={() => setDayTime(dt.id)}
                    style={{
                      padding: '5px 12px', borderRadius: 8, border: '1px solid rgba(255,255,255,0.15)',
                      background: dayTime === dt.id ? 'rgba(59,130,246,0.2)' : 'transparent',
                      color: dayTime === dt.id ? '#60A5FA' : '#94A3B8',
                      fontWeight: 700, fontSize: 11, cursor: 'pointer'
                    }}
                  >
                    {dt.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Virtual TV Screen Monitor Frame */}
          <div style={{ background: '#000000', border: '12px solid #1E293B', borderRadius: '0 0 20px 20px', minHeight: 480, position: 'relative', overflow: 'hidden', boxShadow: '0 25px 60px rgba(0,0,0,0.8)' }}>
            
            {/* Live TV Screen Watermark Header */}
            <div style={{ padding: '16px 24px', background: 'linear-gradient(180deg, rgba(0,0,0,0.8) 0%, transparent 100%)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'relative', zIndex: 10 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <ScenvyLogoIcon size={24} />
                <span style={{ fontWeight: 900, letterSpacing: 1, fontSize: 14 }}>THE PALM HOTEL & BISTRO — BOARD DISPLAY #01</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 14, fontSize: 12, color: '#94A3B8', fontWeight: 700 }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: 4, color: '#10B981' }}><div style={{ width: 8, height: 8, borderRadius: '50%', background: '#10B981' }} /> LIVE URL SYNC</span>
                <span>24°C Sunny</span>
                <span>23:25</span>
              </div>
            </div>

            {/* TAB CONTENT 1: DIGITAL MENU BOARD */}
            {activeBoardTab === 'menu' && (
              <div style={{ padding: '10px 32px 32px', display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 24, alignItems: 'center' }}>
                <div>
                  <div style={{ fontSize: 12, color: '#60A5FA', fontWeight: 900, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 4 }}>ACTUAL SCREEN DISPLAY — {dayTime.toUpperCase()} MENU</div>
                  <h3 style={{ fontSize: 28, fontWeight: 900, marginBottom: 20 }}>Tageskarte & Küchenempfehlungen</h3>
                  
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                    {menuItems[dayTime].map((item, idx) => (
                      <div key={idx} style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', padding: '16px 20px', borderRadius: 14, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                            <span style={{ fontSize: 16, fontWeight: 800, color: '#FFF' }}>{item.name}</span>
                            <span style={{ fontSize: 10, background: '#3B82F6', color: '#FFF', padding: '2px 8px', borderRadius: 10, fontWeight: 800 }}>{item.tag}</span>
                          </div>
                          <div style={{ fontSize: 12, color: '#94A3B8', marginTop: 4 }}>{item.desc}</div>
                        </div>
                        <div style={{ fontSize: 20, fontWeight: 900, color: '#60A5FA' }}>{item.price}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Right Promo Box inside TV */}
                <div style={{ background: 'linear-gradient(135deg, rgba(59,130,246,0.2) 0%, rgba(29,78,216,0.4) 100%)', border: '1px solid rgba(59,130,246,0.3)', borderRadius: 16, padding: 24, textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: 320 }}>
                  <div style={{ fontSize: 40, marginBottom: 12 }}>📲</div>
                  <div style={{ fontSize: 18, fontWeight: 900, marginBottom: 8 }}>Scannen für Mobile Bestellungen</div>
                  <div style={{ fontSize: 12, color: '#94A3B8', marginBottom: 16 }}>Gäste scannen den QR-Code und bestellen direkt vom Smartphone am Tisch.</div>
                  <div style={{ width: 110, height: 110, background: '#FFF', padding: 8, borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <div style={{ width: '100%', height: '100%', border: '4px solid #000', borderRadius: 4, display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 2, padding: 4 }}>
                      <div style={{ background: '#000' }} /><div style={{ background: '#000' }} /><div style={{ background: '#000' }} />
                      <div style={{ background: '#000' }} /><div style={{ background: '#FFF' }} /><div style={{ background: '#000' }} />
                      <div style={{ background: '#000' }} /><div style={{ background: '#000' }} /><div style={{ background: '#000' }} />
                    </div>
                  </div>
                  <div style={{ fontSize: 11, color: '#60A5FA', fontWeight: 800, marginTop: 12 }}>board.sv.de/scan</div>
                </div>
              </div>
            )}

            {/* TAB CONTENT 2: RSS FEEDS & NEWS TICKER */}
            {activeBoardTab === 'rss' && (
              <div style={{ padding: '30px 32px' }}>
                <div style={{ fontSize: 12, color: '#60A5FA', fontWeight: 900, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 6 }}>LIVE RSS FEED & AUTOMATED TICKER</div>
                <h3 style={{ fontSize: 26, fontWeight: 900, marginBottom: 20 }}>Weltnachrichten & Sport-Ticker in Echtzeit</h3>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, marginBottom: 24 }}>
                  {[
                    { cat: 'WIRTSCHAFT', title: 'Technologie-Aktien erreichen neues Jahreshoch in Europa', time: 'Vor 12 Min', src: 'Reuters RSS' },
                    { cat: 'SPORT', title: 'Champios League Finale: Übertragung heute Abend live in der Bar', time: 'Vor 25 Min', src: 'Sports RSS' },
                    { cat: 'LIFESTYLE', title: 'Reisetrends 2026: Boutique-Hotels im Aufwind', time: 'Vor 1 Std', src: 'Travel Feed' }
                  ].map((news, i) => (
                    <div key={i} style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', padding: 18, borderRadius: 14 }}>
                      <div style={{ fontSize: 10, color: '#38BDF8', fontWeight: 900, marginBottom: 6 }}>{news.cat} · {news.src}</div>
                      <div style={{ fontSize: 14, fontWeight: 700, color: '#FFF', lineHeight: 1.4, marginBottom: 10 }}>{news.title}</div>
                      <div style={{ fontSize: 11, color: '#94A3B8' }}>{news.time}</div>
                    </div>
                  ))}
                </div>

                {/* Bottom Running Ticker */}
                <div style={{ background: '#1E293B', padding: '12px 20px', borderRadius: 10, display: 'flex', alignItems: 'center', gap: 12, overflow: 'hidden' }}>
                  <span style={{ background: '#EF4444', color: '#FFF', fontSize: 10, fontWeight: 900, padding: '3px 8px', borderRadius: 4 }}>BREAKING</span>
                  <div style={{ fontSize: 13, color: '#F1F5F9', fontWeight: 600, whiteSpace: 'nowrap' }}>
                    +++ Happy Hour startet um 17:00 Uhr — 50% auf alle Craft Beere & Cocktails im Bistro +++ Wettervorhersage: 26°C und sonnig +++
                  </div>
                </div>
              </div>
            )}

            {/* TAB CONTENT 3: FLIGHT & TRANSPORTATION BOARD */}
            {activeBoardTab === 'flight' && (
              <div style={{ padding: '24px 32px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                  <div>
                    <div style={{ fontSize: 12, color: '#60A5FA', fontWeight: 900, letterSpacing: 2 }}>HOTEL LOBBY FLIGHT BOARD</div>
                    <h3 style={{ fontSize: 24, fontWeight: 900 }}>Flughafen & Transit Abflugtafel</h3>
                  </div>
                  <div style={{ fontSize: 12, background: 'rgba(255,255,255,0.1)', padding: '6px 12px', borderRadius: 8 }}>Airport: MUC / BER Sync</div>
                </div>

                <div style={{ background: '#0F172A', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 12, overflow: 'hidden' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 2fr 1fr 1.5fr', padding: '12px 20px', background: '#1E293B', fontSize: 11, fontWeight: 800, color: '#94A3B8' }}>
                    <span>ZEIT</span><span>FLUG</span><span>DESTINATION</span><span>GATE</span><span>STATUS</span>
                  </div>
                  {[
                    { time: '14:20', flight: 'LH 2042', dest: 'Berlin (BER)', gate: 'A14', status: 'Boarding', sColor: '#10B981' },
                    { time: '14:45', flight: 'EK 052', dest: 'Dubai (DXB)', gate: 'B22', status: 'Pünktlich', sColor: '#38BDF8' },
                    { time: '15:10', flight: 'LX 1104', dest: 'Zürich (ZRH)', gate: 'A08', status: 'Pünktlich', sColor: '#38BDF8' },
                    { time: '15:35', flight: 'BA 951', dest: 'London (LHR)', gate: 'C03', status: 'Verzögert (15m)', sColor: '#F59E0B' }
                  ].map((fl, i) => (
                    <div key={i} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 2fr 1fr 1.5fr', padding: '14px 20px', borderBottom: '1px solid rgba(255,255,255,0.05)', fontSize: 13, fontWeight: 700, alignItems: 'center' }}>
                      <span style={{ color: '#F8FAFC' }}>{fl.time}</span>
                      <span style={{ color: '#60A5FA' }}>{fl.flight}</span>
                      <span>{fl.dest}</span>
                      <span style={{ color: '#CBD5E1' }}>{fl.gate}</span>
                      <span style={{ color: fl.sColor, fontWeight: 900 }}>{fl.status}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB CONTENT 4: WEATHER & INFO */}
            {activeBoardTab === 'weather' && (
              <div style={{ padding: '30px 32px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, alignItems: 'center' }}>
                <div style={{ background: 'linear-gradient(135deg, rgba(14,165,233,0.15) 0%, rgba(3,105,161,0.3) 100%)', border: '1px solid rgba(56,189,248,0.3)', padding: 30, borderRadius: 20 }}>
                  <div style={{ fontSize: 12, color: '#38BDF8', fontWeight: 900, letterSpacing: 2 }}>LOCAL WEATHER LIVE WIDGET</div>
                  <div style={{ fontSize: 54, fontWeight: 900, margin: '10px 0 0', display: 'flex', alignItems: 'center', gap: 16 }}>
                    ☀️ 26°C
                  </div>
                  <div style={{ fontSize: 18, fontWeight: 700, color: '#E0F2FE' }}>Sonnig · Barometer 1018 hPa</div>
                  <div style={{ fontSize: 13, color: '#93C5FD', marginTop: 12 }}>Perfektes Wetter für unsere Rooftop-Terrasse im 5. Stock!</div>
                </div>

                <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', padding: 30, borderRadius: 20 }}>
                  <div style={{ fontSize: 12, color: '#60A5FA', fontWeight: 900, letterSpacing: 2 }}>HOTEL & VENUE INFOS</div>
                  <h4 style={{ fontSize: 20, fontWeight: 900, marginTop: 6, marginBottom: 12 }}>WLAN & Services</h4>
                  <div style={{ fontSize: 13, color: '#CBD5E1', lineHeight: 1.8 }}>
                    • Guest WiFi: <strong>Palm_Guest_5G</strong><br />
                    • Frühstück: 06:30 – 11:00 Uhr im 1. OG<br />
                    • SPA & Fitness: 07:00 – 22:00 Uhr<br />
                    • Rezeption Durchwahl: <strong>#9</strong>
                  </div>
                </div>
              </div>
            )}

            {/* TAB CONTENT 5: AI BANNER CREATOR */}
            {activeBoardTab === 'ai' && (
              <div style={{ padding: '30px 32px', textAlign: 'center' }}>
                <div style={{ fontSize: 12, color: '#A855F7', fontWeight: 900, letterSpacing: 2, marginBottom: 6 }}>GEMINI KI CONTENT ASSISTANT</div>
                <h3 style={{ fontSize: 26, fontWeight: 900, marginBottom: 12 }}>KI-Generierung von Screen-Bannern per Prompt</h3>
                <p style={{ color: '#94A3B8', fontSize: 14, maxWidth: 600, margin: '0 auto 20px' }}>
                  Geben Sie einfach "Happy Hour Cocktail Special 18-20 Uhr" ein — die KI erstellt automatisch ein fertiges 4K Screen-Layout.
                </p>

                <div style={{ background: 'linear-gradient(135deg, rgba(168,85,247,0.2) 0%, rgba(124,58,237,0.3) 100%)', border: '1px solid rgba(168,85,247,0.4)', padding: 24, borderRadius: 16, maxWidth: 700, margin: '0 auto', textAlign: 'left' }}>
                  <div style={{ fontSize: 11, color: '#E9D5FF', fontWeight: 800, marginBottom: 6 }}>PROMPT EINGABE:</div>
                  <div style={{ fontSize: 14, color: '#FFF', fontWeight: 700, background: 'rgba(0,0,0,0.4)', padding: '10px 14px', borderRadius: 8, marginBottom: 14 }}>
                    "Erstelle ein elegantes Banner für Sommer-Spritz Cocktails für 8,50 € mit frischem Design"
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: 12, color: '#C084FC', fontWeight: 800 }}>✨ Status: Screen Layout in 2,4s generiert</span>
                    <button style={{ padding: '8px 16px', borderRadius: 8, border: 'none', background: '#A855F7', color: '#FFF', fontWeight: 800, fontSize: 12, cursor: 'pointer' }}>
                      Auf Screen Senden →
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Deep Features Breakdown */}
      <section id="features" style={{ padding: '80px 20px', maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 50 }}>
          <div style={{ fontSize: 12, color: '#60A5FA', fontWeight: 900, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 8 }}>KERNFUNKTIONEN</div>
          <h2 style={{ fontSize: 'clamp(26px, 4vw, 38px)', fontWeight: 900 }}>Warum Scenvy Board das führende Digital Signage System ist</h2>
          <p style={{ color: '#94A3B8', fontSize: 16, marginTop: 10, maxWidth: 680, margin: '10px auto 0' }}>
            Alle Werkzeuge für professionelle Bildschirme in Gastronomie, Hotels & Retail in einer einheitlichen Plattform.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: 24 }}>
          {[
            {
              icon: Tv,
              title: '100% Browser & URL-Basiert',
              desc: 'Keine Anschaffungskosten für proprietäre Media-Player oder Mini-PCs. Öffnen Sie einfach den Scenvy Board Link im Webbrowser Ihres Smart-TVs, FireSticks oder Web-Displays.'
            },
            {
              icon: Table,
              title: 'Google Sheets Live Synchronization',
              desc: 'Ändern Sie Preise oder Speisen direkt in Ihrer gewohnten Google Spreadsheet Tabelle. Das Digital Board übernimmt Änderungen in unter 2 Sekunden ohne manuelles Neuladen.'
            },
            {
              icon: Rss,
              title: 'RSS News, Wetter & Flugtafeln',
              desc: 'Bieten Sie Ihren Gästen echten Mehrwert. Binden Sie automatische Nachrichten-Ticker, lokale Wetterdaten oder Flughafen-Abflugtafeln nahtlos in den Screen-Workflow ein.'
            },
            {
              icon: Utensils,
              title: 'Tageszeiten- & Menü-Steuerung',
              desc: 'Automatische Umschaltung von Frühstückskarte auf Mittagstisch, Happy Hour und Abendkarte nach Uhrzeit oder Wochentag. Ausverkaufte Gerichte per Klick stornieren.'
            },
            {
              icon: Sparkles,
              title: 'KI-gestützter Content Designer',
              desc: 'Nutzen Sie Gemini AI um verkaufsstarke Promo-Banner, Menükarten und Grafiken per Textbefehl zu erstellen. Professionelle Visuals ohne Grafikdesigner.'
            },
            {
              icon: Smartphone,
              title: 'QR-Code Integration zu TikTok-Reels',
              desc: 'Kombinieren Sie stationäre Screens mit mobiler Gäste-Interaktion. Gäste scannen den QR-Code auf dem Screen und landen direkt in Ihren vertikalen Video-Reels & Mobile Menu.'
            }
          ].map((f, i) => (
            <div key={i} style={{ background: '#0B1120', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 16, padding: 28, transition: 'transform 0.2s, borderColor 0.2s' }}>
              <div style={{ width: 48, height: 48, borderRadius: 12, background: 'rgba(59,130,246,0.15)', border: '1px solid rgba(59,130,246,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 20 }}>
                <f.icon size={24} color="#60A5FA" />
              </div>
              <h3 style={{ fontSize: 20, fontWeight: 800, color: '#FFF', marginBottom: 10 }}>{f.title}</h3>
              <p style={{ fontSize: 14, color: '#94A3B8', lineHeight: 1.6 }}>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Solutions Frameworks */}
      <section id="solutions" style={{ padding: '70px 20px', background: '#0A0F1D', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 40 }}>
            <div style={{ fontSize: 12, color: '#60A5FA', fontWeight: 900, letterSpacing: 2 }}>MAßGESCHNEIDERTE BRANCHE-LÖSUNGEN</div>
            <h2 style={{ fontSize: 32, fontWeight: 900 }}>Einsatzbereiche für Scenvy Board</h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 30 }}>
            {/* Gastronomie */}
            <div style={{ background: '#0F172A', border: '1px solid rgba(255,255,255,0.1)', padding: 32, borderRadius: 20 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
                <div style={{ width: 42, height: 42, borderRadius: 10, background: 'rgba(249,115,22,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Utensils size={22} color="#F97316" />
                </div>
                <div>
                  <h3 style={{ fontSize: 22, fontWeight: 900 }}>Gastronomie & Bars</h3>
                  <div style={{ fontSize: 12, color: '#94A3B8' }}>Restaurants, Cafés, Rooftops, Fast Casual</div>
                </div>
              </div>

              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 12 }}>
                {[
                  'Digitale Speisekarte über der Theke mit dynamischen Preisen',
                  'Happy Hour Countdown Banner mit automatischer Ausblendung',
                  'High-Res Food-Videos zur Steigerung von Dessert- & Cocktail-Verkäufen',
                  'Allergen- und Zusatzstoff-Kennzeichnung per Gesetzkonformer Anzeige'
                ].map((item, idx) => (
                  <li key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, fontSize: 14, color: '#CBD5E1', lineHeight: 1.5 }}>
                    <CheckCircle size={16} color="#10B981" style={{ flexShrink: 0, marginTop: 3 }} />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Hotels & Resorts */}
            <div style={{ background: '#0F172A', border: '1px solid rgba(255,255,255,0.1)', padding: 32, borderRadius: 20 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
                <div style={{ width: 42, height: 42, borderRadius: 10, background: 'rgba(16,185,129,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Hotel size={22} color="#10B981" />
                </div>
                <div>
                  <h3 style={{ fontSize: 22, fontWeight: 900 }}>Hotels & Resorts</h3>
                  <div style={{ fontSize: 12, color: '#94A3B8' }}>Lobby, Rezeption, SPA, Tagungsräume</div>
                </div>
              </div>

              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 12 }}>
                {[
                  'Willkommens-Screens in der Lobby mit Gast-Namensbegrüßung',
                  'Live Flug- und Zugtafeln an der Rezeption für abreisende Gäste',
                  'SPA-Angebote & Massage-Freizeiten auf In-House Displays buchen',
                  'Digitale Raum-Beschilderung für Tagungen und Konferenzen'
                ].map((item, idx) => (
                  <li key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, fontSize: 14, color: '#CBD5E1', lineHeight: 1.5 }}>
                    <CheckCircle size={16} color="#10B981" style={{ flexShrink: 0, marginTop: 3 }} />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Comparison: Scenvy Board vs Traditional Signage */}
      <section id="vergleich" style={{ padding: '80px 20px', maxWidth: 1000, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <div style={{ fontSize: 12, color: '#60A5FA', fontWeight: 900, letterSpacing: 2 }}>VORTEILE IM VERGLEICH</div>
          <h2 style={{ fontSize: 30, fontWeight: 900 }}>Scenvy Board vs. Traditionelle Signage-Systeme</h2>
        </div>

        <div style={{ background: '#0B1120', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 20, overflow: 'hidden' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1.5fr 1.5fr', padding: '16px 24px', background: '#1E293B', fontWeight: 800, fontSize: 13, color: '#94A3B8' }}>
            <span>KRITERIUM</span>
            <span style={{ color: '#EF4444' }}>Klassische Hardware Signage</span>
            <span style={{ color: '#60A5FA' }}>SCENVY Board SaaS</span>
          </div>

          {[
            { metric: 'Hardware Anschaffung', old: '300 € – 800 € pro Player-Box', new: '0 € (Läuft per Browser URL)' },
            { metric: 'Einrichtung & Installation', old: 'Aufwendige Kabel & Technik vor Ort', new: 'In unter 2 Minuten betriebsbereit' },
            { metric: 'Preise & Menü Updates', old: 'Komplizierte USB-Sticks / Software', new: 'Echtzeit-Sync via Google Sheets / Web' },
            { metric: 'Content Erstellung', old: 'Teurer Grafikdesigner nötig', new: 'Gemini KI Content Assistant integriert' },
            { metric: 'Mobile Gäste-Kopplung', old: 'Nicht vorhanden (Nur statischer Screen)', new: 'Kopplung mit QR-Code & TikTok Reels' }
          ].map((row, idx) => (
            <div key={idx} style={{ display: 'grid', gridTemplateColumns: '2fr 1.5fr 1.5fr', padding: '18px 24px', borderBottom: '1px solid rgba(255,255,255,0.05)', fontSize: 14, alignItems: 'center' }}>
              <span style={{ fontWeight: 700, color: '#FFF' }}>{row.metric}</span>
              <span style={{ color: '#94A3B8', fontSize: 13 }}>❌ {row.old}</span>
              <span style={{ color: '#60A5FA', fontWeight: 800 }}>✅ {row.new}</span>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Footer Banner */}
      <section style={{ padding: '80px 20px', textAlign: 'center', background: 'linear-gradient(180deg, #070B14 0%, #0F172A 100%)', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
        <div style={{ maxWidth: 700, margin: '0 auto' }}>
          <ScenvyAppIcon module="board" size={56} style={{ marginBottom: 16 }} />
          <h2 style={{ fontSize: 34, fontWeight: 900, marginBottom: 14 }}>Starten Sie jetzt Ihr Digital Board</h2>
          <p style={{ color: '#94A3B8', fontSize: 16, marginBottom: 28 }}>
            Registrieren Sie sich kostenlos und verwandeln Sie Ihren ersten TV-Screen in unter 3 Minuten in eine moderne digitale Tafel.
          </p>
          
          <button 
            onClick={handleAuthClick}
            style={{ padding: '16px 40px', borderRadius: 14, border: 'none', background: 'linear-gradient(135deg, #3B82F6 0%, #1D4ED8 100%)', color: '#FFF', fontWeight: 900, fontSize: 16, cursor: 'pointer', boxShadow: '0 8px 30px rgba(59,130,246,0.4)', display: 'inline-flex', alignItems: 'center', gap: 10 }}
          >
            Kostenlos Auf App.sv.de Registrieren <ArrowRight size={18} />
          </button>
        </div>
      </section>

    </div>
  )
}
