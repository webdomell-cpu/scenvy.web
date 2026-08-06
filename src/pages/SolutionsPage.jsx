import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { C } from '@/tokens'
import { ScenvyLogoFull, ScenvyLogoIcon } from '@/components/ScenvyLogo'
import { ScenvyAppIcon } from '@/components/ScenvyBrandShowcase'
import { EcosystemHeaderBar } from '@/components/EcosystemHeaderBar'
import AppAuthModal from '@/components/AppAuthModal'
import { 
  Tv, Film, Utensils, Zap, Check, ArrowRight, Sparkles, Video, 
  ShoppingBag, Building, Flame, Star, Send, X, ShieldCheck, Heart, 
  TrendingUp, Award, Layers, Smartphone, Eye, MessageCircle, Share2, 
  QrCode, Clock, MapPin, CheckCircle2, Play
} from 'lucide-react'

function ContactConsultationModal({ isOpen, onClose, lang = 'de', defaultIndustry = '' }) {
  const [form, setForm] = useState({
    name: '',
    company: '',
    industry: defaultIndustry || 'Gastronomie & Bars',
    email: '',
    phone: '',
    message: ''
  })
  const [submitted, setSubmitted] = useState(false)

  useEffect(() => {
    if (defaultIndustry) {
      setForm(prev => ({ ...prev, industry: defaultIndustry }))
    }
  }, [defaultIndustry])

  if (!isOpen) return null

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      zIndex: 9999,
      background: 'rgba(9, 10, 18, 0.85)',
      backdropFilter: 'blur(16px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 20
    }}>
      <div style={{
        background: '#1B1C2E',
        border: '1px solid rgba(139,92,246,0.4)',
        borderRadius: 24,
        width: '100%',
        maxWidth: 540,
        padding: '32px 28px',
        position: 'relative',
        boxShadow: '0 25px 80px rgba(139,92,246,0.25)',
        color: '#FFFFFF'
      }}>
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: 20,
            right: 20,
            background: 'rgba(255,255,255,0.08)',
            border: 'none',
            color: '#FFF',
            borderRadius: '50%',
            width: 36,
            height: 36,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer'
          }}
        >
          <X size={20} />
        </button>

        {submitted ? (
          <div style={{ textAlign: 'center', padding: '30px 10px' }}>
            <div style={{ width: 64, height: 64, borderRadius: '50%', background: 'rgba(16,185,129,0.2)', color: '#10B981', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
              <CheckCircle2 size={36} />
            </div>
            <h3 style={{ fontSize: 24, fontWeight: 900, marginBottom: 10 }}>
              {lang === 'de' ? 'Anfrage erfolgreich gesendet!' : 'Request Sent Successfully!'}
            </h3>
            <p style={{ color: '#E1E1E6', fontSize: 15, lineHeight: 1.6, marginBottom: 24 }}>
              {lang === 'de'
                ? 'Vielen Dank! Ein SCENVY Branchen-Spezialist wird sich innerhalb von 2 Stunden bei dir melden, um dein individuelles Sequential Reel Konzept zu besprechen.'
                : 'Thank you! A SCENVY specialist will reach out within 2 hours to discuss your tailored Sequential Reel concept.'}
            </p>
            <button
              onClick={onClose}
              style={{
                padding: '12px 28px',
                borderRadius: 12,
                background: 'linear-gradient(135deg, #8B5CF6, #3B82F6)',
                border: 'none',
                color: '#FFF',
                fontWeight: 800,
                fontSize: 14,
                cursor: 'pointer'
              }}
            >
              {lang === 'de' ? 'Schließen' : 'Close'}
            </button>
          </div>
        ) : (
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
              <span style={{ background: 'rgba(139,92,246,0.2)', color: '#A78BFA', fontSize: 11, fontWeight: 800, padding: '4px 12px', borderRadius: 20, border: '1px solid rgba(139,92,246,0.3)' }}>
                {lang === 'de' ? 'KOSTENLOSE BRANCHEN-BERATUNG' : 'FREE INDUSTRY CONSULTATION'}
              </span>
            </div>
            <h3 style={{ fontSize: 24, fontWeight: 900, marginBottom: 8, color: '#FFF' }}>
              {lang === 'de' ? 'Branchen-Demo & Analyse anfordern' : 'Request Industry Demo & Analysis'}
            </h3>
            <p style={{ fontSize: 14, color: '#94A3B8', marginBottom: 20 }}>
              {lang === 'de'
                ? 'Erfahre, wie du deine Screens & QR-Codes mit der Sequential Reel Engine in umsatzstarke POS-Storys verwandelst.'
                : 'Learn how to transform your displays & QR codes with the Sequential Reel Engine into high-converting POS stories.'}
            </p>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                <div>
                  <label style={{ fontSize: 12, fontWeight: 700, color: '#E1E1E6', display: 'block', marginBottom: 4 }}>
                    {lang === 'de' ? 'Dein Name *' : 'Your Name *'}
                  </label>
                  <input
                    required
                    type="text"
                    value={form.name}
                    onChange={e => setForm({ ...form, name: e.target.value })}
                    placeholder="Max Mustermann"
                    style={{ width: '100%', padding: '10px 14px', borderRadius: 10, background: '#12131F', border: '1px solid rgba(255,255,255,0.15)', color: '#FFF', fontSize: 14, outline: 'none' }}
                  />
                </div>
                <div>
                  <label style={{ fontSize: 12, fontWeight: 700, color: '#E1E1E6', display: 'block', marginBottom: 4 }}>
                    {lang === 'de' ? 'Betrieb / Firma *' : 'Company / Venue *'}
                  </label>
                  <input
                    required
                    type="text"
                    value={form.company}
                    onChange={e => setForm({ ...form, company: e.target.value })}
                    placeholder="Rooftop Bar 21"
                    style={{ width: '100%', padding: '10px 14px', borderRadius: 10, background: '#12131F', border: '1px solid rgba(255,255,255,0.15)', color: '#FFF', fontSize: 14, outline: 'none' }}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                <div>
                  <label style={{ fontSize: 12, fontWeight: 700, color: '#E1E1E6', display: 'block', marginBottom: 4 }}>
                    {lang === 'de' ? 'E-Mail Adresse *' : 'Email Address *'}
                  </label>
                  <input
                    required
                    type="email"
                    value={form.email}
                    onChange={e => setForm({ ...form, email: e.target.value })}
                    placeholder="max@beispiel.de"
                    style={{ width: '100%', padding: '10px 14px', borderRadius: 10, background: '#12131F', border: '1px solid rgba(255,255,255,0.15)', color: '#FFF', fontSize: 14, outline: 'none' }}
                  />
                </div>
                <div>
                  <label style={{ fontSize: 12, fontWeight: 700, color: '#E1E1E6', display: 'block', marginBottom: 4 }}>
                    {lang === 'de' ? 'Telefonnummer' : 'Phone Number'}
                  </label>
                  <input
                    type="tel"
                    value={form.phone}
                    onChange={e => setForm({ ...form, phone: e.target.value })}
                    placeholder="+49 170 1234567"
                    style={{ width: '100%', padding: '10px 14px', borderRadius: 10, background: '#12131F', border: '1px solid rgba(255,255,255,0.15)', color: '#FFF', fontSize: 14, outline: 'none' }}
                  />
                </div>
              </div>

              <div>
                <label style={{ fontSize: 12, fontWeight: 700, color: '#E1E1E6', display: 'block', marginBottom: 4 }}>
                  {lang === 'de' ? 'Branche' : 'Industry'}
                </label>
                <select
                  value={form.industry}
                  onChange={e => setForm({ ...form, industry: e.target.value })}
                  style={{ width: '100%', padding: '10px 14px', borderRadius: 10, background: '#12131F', border: '1px solid rgba(255,255,255,0.15)', color: '#FFF', fontSize: 14, outline: 'none' }}
                >
                  <option value="Gastronomie & Bars">Gastronomie, Bars & Clubs</option>
                  <option value="Einzelhandel (Retail)">Einzelhandel & Modeboutiquen</option>
                  <option value="Hotellerie & Resorts">Hotellerie & Boutique Hotels</option>
                  <option value="Events & Festivals">Events, Messen & Entertainment</option>
                </select>
              </div>

              <div>
                <label style={{ fontSize: 12, fontWeight: 700, color: '#E1E1E6', display: 'block', marginBottom: 4 }}>
                  {lang === 'de' ? 'Nachricht oder Wünsche (optional)' : 'Message (optional)'}
                </label>
                <textarea
                  rows={3}
                  value={form.message}
                  onChange={e => setForm({ ...form, message: e.target.value })}
                  placeholder={lang === 'de' ? 'Z.B. Wir haben 5 Screens und 20 Tische...' : 'E.g., We have 5 screens and 20 tables...'}
                  style={{ width: '100%', padding: '10px 14px', borderRadius: 10, background: '#12131F', border: '1px solid rgba(255,255,255,0.15)', color: '#FFF', fontSize: 14, outline: 'none', resize: 'none' }}
                />
              </div>

              <button
                type="submit"
                style={{
                  width: '100%',
                  padding: '14px 0',
                  marginTop: 6,
                  borderRadius: 12,
                  border: 'none',
                  background: 'linear-gradient(135deg, #8B5CF6 0%, #EC4899 100%)',
                  color: '#FFFFFF',
                  fontWeight: 800,
                  fontSize: 15,
                  cursor: 'pointer',
                  boxShadow: '0 8px 25px rgba(139,92,246,0.4)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 8
                }}
              >
                <span>{lang === 'de' ? 'Kostenlose Beratung anfordern' : 'Request Free Consultation'}</span>
                <Send size={16} />
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  )
}

export default function SolutionsPage() {
  const nav = useNavigate()
  const [lang, setLang] = useState(() => localStorage.getItem('scenvy_lang') || 'de')
  const [authModalOpen, setAuthModalOpen] = useState(false)
  const [consultationOpen, setConsultationOpen] = useState(false)
  const [selectedIndustry, setSelectedIndustry] = useState('Gastronomie & Bars')
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    document.title = lang === 'de' 
      ? 'Branchenlösungen – Sequential Reels für Gastronomie, Retail, Hotel & Events | SCENVY'
      : 'Industry Solutions – Sequential Reels for Dining, Retail, Hotels & Events | SCENVY'
  }, [lang])

  const openConsultationFor = (ind) => {
    setSelectedIndustry(ind)
    setConsultationOpen(true)
  }

  return (
    <div style={{ background: '#12131F', color: '#FFFFFF', minHeight: '100vh', fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}>
      
      {/* ECOSYSTEM TOP BAR */}
      <div style={{ position: 'sticky', top: 0, zIndex: 110 }}>
        <EcosystemHeaderBar onOpenAuthModal={() => setAuthModalOpen(true)} lang={lang} setLang={setLang} />
      </div>

      {/* NAVIGATION BAR */}
      <nav style={{
        position: 'sticky',
        top: 42,
        left: 0,
        right: 0,
        zIndex: 100,
        height: 72,
        background: 'rgba(18, 19, 31, 0.95)',
        backdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(255,255,255,0.1)',
        padding: '0 5%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }} onClick={() => nav('/')}>
          <ScenvyLogoFull height={60} />
        </div>

        {/* Desktop Links */}
        <div style={{ display: 'flex', gap: 12, alignItems: 'center' }} className="desktop-links">
          <Link to="/loesungen" style={{ color: '#A78BFA', fontSize: 13, fontWeight: 800, background: 'rgba(139,92,246,0.18)', border: '1px solid rgba(139,92,246,0.4)', padding: '6px 14px', borderRadius: 20, display: 'inline-flex', alignItems: 'center', gap: 6 }}>
            <Sparkles size={14} color="#A78BFA" /> {lang === 'de' ? 'Branchenlösungen' : 'Solutions'}
          </Link>
          <Link to="/board" style={{ color: '#3B82F6', fontSize: 13, fontWeight: 700, padding: '6px 12px', borderRadius: 20 }}>
            SCENVY BOARD
          </Link>
          <Link to="/flow" style={{ color: '#8B5CF6', fontSize: 13, fontWeight: 700, padding: '6px 12px', borderRadius: 20 }}>
            SCENVY FLOW
          </Link>
          <Link to="/menu" style={{ color: '#F97316', fontSize: 13, fontWeight: 700, padding: '6px 12px', borderRadius: 20 }}>
            SCENVY MENU
          </Link>
        </div>

        {/* Action Button */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <button
            onClick={() => setConsultationOpen(true)}
            style={{
              background: 'linear-gradient(135deg, #8B5CF6 0%, #EC4899 100%)',
              border: 'none',
              color: '#FFFFFF',
              padding: '10px 18px',
              borderRadius: 12,
              fontSize: 13,
              fontWeight: 800,
              cursor: 'pointer',
              boxShadow: '0 4px 18px rgba(139,92,246,0.35)',
              display: 'flex',
              alignItems: 'center',
              gap: 6
            }}
          >
            <span>{lang === 'de' ? 'Branchen-Demo anfordern' : 'Request Industry Demo'}</span>
            <ArrowRight size={15} />
          </button>
        </div>
      </nav>

      {/* HERO SECTION */}
      <section style={{
        padding: '80px 5% 60px',
        position: 'relative',
        overflow: 'hidden',
        background: 'radial-gradient(circle at 50% 20%, rgba(139,92,246,0.2) 0%, rgba(18,19,31,1) 70%)'
      }}>
        <div style={{ maxWidth: 1150, margin: '0 auto', textAlign: 'center', position: 'relative', zIndex: 2 }}>
          
          <span style={{
            background: 'rgba(139,92,246,0.18)',
            border: '1px solid rgba(139,92,246,0.4)',
            color: '#A78BFA',
            fontSize: 12,
            fontWeight: 800,
            padding: '6px 16px',
            borderRadius: 30,
            letterSpacing: 1,
            textTransform: 'uppercase',
            display: 'inline-flex',
            alignItems: 'center',
            gap: 8,
            marginBottom: 20
          }}>
            <Flame size={15} color="#EC4899" />
            {lang === 'de' ? 'SEQUENTIAL REEL ENGINE & STORYTELLING POS' : 'SEQUENTIAL REEL ENGINE & STORYTELLING POS'}
          </span>

          <h1 style={{
            fontSize: 'clamp(32px, 5vw, 56px)',
            fontWeight: 900,
            lineHeight: 1.15,
            color: '#FFFFFF',
            maxWidth: 900,
            margin: '0 auto 20px'
          }}>
            {lang === 'de'
              ? 'Ein Format. Unendliche Erlebnisse für deine Branche.'
              : 'One Format. Infinite Experiences for Your Industry.'}
          </h1>

          <p style={{
            fontSize: 'clamp(16px, 2vw, 20px)',
            color: '#E1E1E6',
            maxWidth: 820,
            margin: '0 auto 36px',
            lineHeight: 1.6
          }}>
            {lang === 'de'
              ? 'Egal ob Restaurant, Boutique, Boutique-Hotel oder Festival – starre Beschilderung war gestern. Erreiche deine Kunden mit dynamischen, aufeinander aufbauenden Reel-Storys. Visual Appetite Trigger & Impulskauf +80%.'
              : 'Whether dining, boutique retail, hotel or festival — static signs belong to the past. Engage guests with dynamic, sequential story reels. Visual Appetite Trigger & +80% impulse sales.'}
          </p>

          <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap', marginBottom: 50 }}>
            <button
              onClick={() => setConsultationOpen(true)}
              style={{
                padding: '16px 32px',
                borderRadius: 14,
                background: 'linear-gradient(135deg, #8B5CF6 0%, #3B82F6 100%)',
                color: '#FFF',
                fontWeight: 800,
                fontSize: 16,
                border: 'none',
                cursor: 'pointer',
                boxShadow: '0 10px 30px rgba(139,92,246,0.4)',
                display: 'flex',
                alignItems: 'center',
                gap: 10
              }}
            >
              <span>{lang === 'de' ? 'Jetzt Branchen-Demo anfordern' : 'Request Industry Demo'}</span>
              <ArrowRight size={18} />
            </button>

            <a
              href="#gastronomie"
              style={{
                padding: '16px 28px',
                borderRadius: 14,
                background: '#1B1C2E',
                border: '1px solid rgba(255,255,255,0.15)',
                color: '#FFF',
                fontWeight: 700,
                fontSize: 15,
                textDecoration: 'none',
                display: 'flex',
                alignItems: 'center',
                gap: 8
              }}
            >
              <Eye size={18} color="#A78BFA" />
              <span>{lang === 'de' ? 'Live-Beispiele ansehen' : 'View Live Examples'}</span>
            </a>
          </div>

          {/* 3D Smartphone Hero Visual Mockup */}
          <div style={{
            position: 'relative',
            maxWidth: 780,
            margin: '0 auto',
            background: '#1B1C2E',
            borderRadius: 32,
            border: '2px solid rgba(139,92,246,0.35)',
            padding: '30px 20px',
            boxShadow: '0 30px 90px rgba(139,92,246,0.25)'
          }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 20, alignItems: 'center' }}>
              
              {/* Phone Mockup Card */}
              <div style={{ background: '#12131F', borderRadius: 24, padding: 16, border: '1px solid rgba(255,255,255,0.1)', position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', top: 12, right: 12, background: '#8B5CF6', color: '#FFF', fontSize: 9, fontWeight: 900, padding: '2px 8px', borderRadius: 10 }}>
                  LIVE REEL
                </div>
                <img
                  src="https://images.unsplash.com/photo-1551024506-0bccd828d307?w=500&q=80"
                  alt="Cocktail Reel"
                  style={{ width: '100%', height: 220, objectFit: 'cover', borderRadius: 16, marginBottom: 10 }}
                />
                <div style={{ fontSize: 13, fontWeight: 800, color: '#FFF' }}>Sequential Reel Story 1/3</div>
                <div style={{ fontSize: 11, color: '#94A3B8' }}>Visual Appetite Trigger · Bar & Lounge</div>
              </div>

              {/* Retail Mockup Card */}
              <div style={{ background: '#12131F', borderRadius: 24, padding: 16, border: '1px solid rgba(255,255,255,0.1)', position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', top: 12, right: 12, background: '#EC4899', color: '#FFF', fontSize: 9, fontWeight: 900, padding: '2px 8px', borderRadius: 10 }}>
                  HIGH-BRIGHTNESS
                </div>
                <img
                  src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=500&q=80"
                  alt="Retail Display"
                  style={{ width: '100%', height: 220, objectFit: 'cover', borderRadius: 16, marginBottom: 10 }}
                />
                <div style={{ fontSize: 13, fontWeight: 800, color: '#FFF' }}>Schaufenster Display Sync</div>
                <div style={{ fontSize: 11, color: '#94A3B8' }}>Visual Merchandising 2.0 · Retail</div>
              </div>

              {/* Hotel Mockup Card */}
              <div style={{ background: '#12131F', borderRadius: 24, padding: 16, border: '1px solid rgba(255,255,255,0.1)', position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', top: 12, right: 12, background: '#10B981', color: '#FFF', fontSize: 9, fontWeight: 900, padding: '2px 8px', borderRadius: 10 }}>
                  HOTEL CONCIERGE
                </div>
                <img
                  src="https://images.unsplash.com/photo-1566073771259-6a8506099945?w=500&q=80"
                  alt="Hotel Screen"
                  style={{ width: '100%', height: 220, objectFit: 'cover', borderRadius: 16, marginBottom: 10 }}
                />
                <div style={{ fontSize: 13, fontWeight: 800, color: '#FFF' }}>Lobby Welcome Reel</div>
                <div style={{ fontSize: 11, color: '#94A3B8' }}>Digital Concierge · Hospitality</div>
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* SECTION 1: GASTRONOMIE */}
      <section id="gastronomie" style={{ padding: '90px 5%', background: '#1B1C2E', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
        <div style={{ maxWidth: 1150, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 40, alignItems: 'center' }}>
          
          {/* Left Text */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
              <span style={{ background: 'rgba(249,115,22,0.2)', color: '#F97316', fontSize: 11, fontWeight: 800, padding: '4px 14px', borderRadius: 20, border: '1px solid rgba(249,115,22,0.3)' }}>
                SECTION 1 · GASTRONOMIE & BARS
              </span>
            </div>
            <h2 style={{ fontSize: 'clamp(28px, 3.5vw, 42px)', fontWeight: 900, color: '#FFFFFF', marginBottom: 14, lineHeight: 1.2 }}>
              Gastronomie & Bars – Vom Anblick zum Appetit
            </h2>
            <p style={{ fontSize: 18, color: '#F97316', fontWeight: 700, marginBottom: 16 }}>
              Digitale Speisekarten reichen nicht mehr. Erzähle die Geschichte deiner Gerichte mit der Sequential Reel Engine.
            </p>
            <p style={{ fontSize: 15, color: '#E1E1E6', lineHeight: 1.6, marginBottom: 24 }}>
              Verführe deine Gäste mit kurzen, hochauflösenden Video-Reels. Zeige das Zischen des Steaks auf dem Grill, den schäumenden Signature-Cocktail oder die Zubereitung des Desserts. Untermalt mit dem <strong style={{ color: '#FFF' }}>Visual Appetite Trigger</strong>, der spontane Impulskäufe direkt am Tisch auslöst.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginBottom: 30 }}>
              <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                <div style={{ width: 24, height: 24, borderRadius: '50%', background: 'rgba(249,115,22,0.2)', color: '#F97316', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 2 }}>
                  <Check size={14} />
                </div>
                <div>
                  <strong style={{ color: '#FFF', fontSize: 15 }}>Automatisches Umschalten:</strong>
                  <span style={{ color: '#E1E1E6', fontSize: 14, marginLeft: 6 }}>Frühstücks-Reels morgens, Lunch-Storys mittags, Cocktail-Flows abends.</span>
                </div>
              </div>

              <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                <div style={{ width: 24, height: 24, borderRadius: '50%', background: 'rgba(249,115,22,0.2)', color: '#F97316', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 2 }}>
                  <Check size={14} />
                </div>
                <div>
                  <strong style={{ color: '#FFF', fontSize: 15 }}>18% höherer Durchschnitts-Bon:</strong>
                  <span style={{ color: '#E1E1E6', fontSize: 14, marginLeft: 6 }}>Durch gezielte visuelle Zusatz-Empfehlungen (Upselling & Appetit-Trigger).</span>
                </div>
              </div>

              <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                <div style={{ width: 24, height: 24, borderRadius: '50%', background: 'rgba(249,115,22,0.2)', color: '#F97316', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 2 }}>
                  <Check size={14} />
                </div>
                <div>
                  <strong style={{ color: '#FFF', fontSize: 15 }}>Direkte Tisch-Interaktion:</strong>
                  <span style={{ color: '#E1E1E6', fontSize: 14, marginLeft: 6 }}>Gast scannt den QR-Code/NFC-Tag am Tisch und startet die Reel-Kaskade sofort auf dem eigenen Smartphone.</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => openConsultationFor('Gastronomie & Bars')}
              style={{
                padding: '12px 24px',
                borderRadius: 12,
                background: 'linear-gradient(135deg, #F97316 0%, #EC4899 100%)',
                color: '#FFF',
                fontWeight: 800,
                fontSize: 14,
                border: 'none',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8
              }}
            >
              <span>Demo für Gastronomie anfordern</span>
              <ArrowRight size={16} />
            </button>
          </div>

          {/* Right Visual Image */}
          <div style={{ position: 'relative' }}>
            <div style={{
              background: '#12131F',
              borderRadius: 28,
              border: '2px solid rgba(249,115,22,0.3)',
              padding: 16,
              boxShadow: '0 20px 50px rgba(249,115,22,0.2)'
            }}>
              <img
                src="https://images.unsplash.com/photo-1544025162-d76694265947?w=700&q=80"
                alt="Gastronomie Steak Reel"
                style={{ width: '100%', height: 380, objectFit: 'cover', borderRadius: 20 }}
              />
              <div style={{ padding: '16px 8px 4px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ fontSize: 15, fontWeight: 900, color: '#FFF' }}>Dry-Aged Tomahawk Steak 🥩</div>
                  <div style={{ fontSize: 12, color: '#F97316', fontWeight: 700 }}>Storytelling POS · Visual Appetite Trigger</div>
                </div>
                <span style={{ background: 'rgba(249,115,22,0.2)', color: '#F97316', fontSize: 11, fontWeight: 800, padding: '4px 10px', borderRadius: 10 }}>
                  +24% Impulskauf
                </span>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* SECTION 2: EINZELHANDEL (RETAIL) */}
      <section id="retail" style={{ padding: '90px 5%', background: '#12131F' }}>
        <div style={{ maxWidth: 1150, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 40, alignItems: 'center' }}>
          
          {/* Left Visual Image */}
          <div style={{ position: 'relative', order: 2 }}>
            <div style={{
              background: '#1B1C2E',
              borderRadius: 28,
              border: '2px solid rgba(139,92,246,0.3)',
              padding: 16,
              boxShadow: '0 20px 50px rgba(139,92,246,0.2)'
            }}>
              <img
                src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=700&q=80"
                alt="Retail Schaufenster Display"
                style={{ width: '100%', height: 380, objectFit: 'cover', borderRadius: 20 }}
              />
              <div style={{ padding: '16px 8px 4px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ fontSize: 15, fontWeight: 900, color: '#FFF' }}>Schaufenster Display Sync 🛍️</div>
                  <div style={{ fontSize: 12, color: '#A78BFA', fontWeight: 700 }}>Visual Merchandising 2.0 · Retail</div>
                </div>
                <span style={{ background: 'rgba(139,92,246,0.2)', color: '#A78BFA', fontSize: 11, fontWeight: 800, padding: '4px 10px', borderRadius: 10 }}>
                  High-Brightness
                </span>
              </div>
            </div>
          </div>

          {/* Right Text */}
          <div style={{ order: 1 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
              <span style={{ background: 'rgba(139,92,246,0.2)', color: '#A78BFA', fontSize: 11, fontWeight: 800, padding: '4px 14px', borderRadius: 20, border: '1px solid rgba(139,92,246,0.3)' }}>
                SECTION 2 · EINZELHANDEL (RETAIL)
              </span>
            </div>
            <h2 style={{ fontSize: 'clamp(28px, 3.5vw, 42px)', fontWeight: 900, color: '#FFFFFF', marginBottom: 14, lineHeight: 1.2 }}>
              Einzelhandel – Bring deine Schaufenster & Verkaufsflächen zum Leben
            </h2>
            <p style={{ fontSize: 18, color: '#A78BFA', fontWeight: 700, marginBottom: 16 }}>
              Verwandle Passanten in Käufer und Stöberer in begeisterte Marken-Fans.
            </p>
            <p style={{ fontSize: 15, color: '#E1E1E6', lineHeight: 1.6, marginBottom: 24 }}>
              Statische Mannequins und gedruckte Plakate gehen im Großstadtlärm unter. Nutze Sequential Reels im Schaufenster oder an der Umkleidekabine, um Outfits im Walk, Styling-Tipps oder Material-Nahaufnahmen in Bewegung zu zeigen.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginBottom: 30 }}>
              <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                <div style={{ width: 24, height: 24, borderRadius: '50%', background: 'rgba(139,92,246,0.2)', color: '#A78BFA', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 2 }}>
                  <Check size={14} />
                </div>
                <div>
                  <strong style={{ color: '#FFF', fontSize: 15 }}>Maximale Schaufenster-Aufmerksamkeit:</strong>
                  <span style={{ color: '#E1E1E6', fontSize: 14, marginLeft: 6 }}>High-Brightness Display Sync zieht Blicke aus 30 Meter Entfernung an.</span>
                </div>
              </div>

              <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                <div style={{ width: 24, height: 24, borderRadius: '50%', background: 'rgba(139,92,246,0.2)', color: '#A78BFA', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 2 }}>
                  <Check size={14} />
                </div>
                <div>
                  <strong style={{ color: '#FFF', fontSize: 15 }}>Visual Merchandising 2.0:</strong>
                  <span style={{ color: '#E1E1E6', fontSize: 14, marginLeft: 6 }}>Zeige die passende Kollektion in kurzen Video-Abfolgen mit direktem QR-Code zum Online-Shop.</span>
                </div>
              </div>

              <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                <div style={{ width: 24, height: 24, borderRadius: '50%', background: 'rgba(139,92,246,0.2)', color: '#A78BFA', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 2 }}>
                  <Check size={14} />
                </div>
                <div>
                  <strong style={{ color: '#FFF', fontSize: 15 }}>Senkt Betritts-Hemmschwelle:</strong>
                  <span style={{ color: '#E1E1E6', fontSize: 14, marginLeft: 6 }}>Steigert die Passanten-Frequenz im Laden um nachweisbar mehr Interaktions-Punkte.</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => openConsultationFor('Einzelhandel (Retail)')}
              style={{
                padding: '12px 24px',
                borderRadius: 12,
                background: 'linear-gradient(135deg, #8B5CF6 0%, #3B82F6 100%)',
                color: '#FFF',
                fontWeight: 800,
                fontSize: 14,
                border: 'none',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8
              }}
            >
              <span>Demo für Retail anfordern</span>
              <ArrowRight size={16} />
            </button>
          </div>

        </div>
      </section>

      {/* SECTION 3: HOTELLERIE & RESORTS */}
      <section id="hotellerie" style={{ padding: '90px 5%', background: '#1B1C2E', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
        <div style={{ maxWidth: 1150, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 40, alignItems: 'center' }}>
          
          {/* Left Text */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
              <span style={{ background: 'rgba(16,185,129,0.2)', color: '#10B981', fontSize: 11, fontWeight: 800, padding: '4px 14px', borderRadius: 20, border: '1px solid rgba(16,185,129,0.3)' }}>
                SECTION 3 · HOTELLERIE & RESORTS
              </span>
            </div>
            <h2 style={{ fontSize: 'clamp(28px, 3.5vw, 42px)', fontWeight: 900, color: '#FFFFFF', marginBottom: 14, lineHeight: 1.2 }}>
              Hotellerie – Das digitale Concierge-Erlebnis
            </h2>
            <p style={{ fontSize: 18, color: '#10B981', fontWeight: 700, marginBottom: 16 }}>
              Emotionale Gästeführung von der Lobby bis aufs Hotelzimmer.
            </p>
            <p style={{ fontSize: 15, color: '#E1E1E6', lineHeight: 1.6, marginBottom: 24 }}>
              Begrüße deine Gäste nicht mit langen Info-Mappen, sondern mit einer visuellen Welcome-Reel. Präsentiere das Spa-Angebot am Nachmittag, das Fine-Dining-Menü am Abend und Ausflugstipps für den nächsten Morgen.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginBottom: 30 }}>
              <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                <div style={{ width: 24, height: 24, borderRadius: '50%', background: 'rgba(16,185,129,0.2)', color: '#10B981', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 2 }}>
                  <Check size={14} />
                </div>
                <div>
                  <strong style={{ color: '#FFF', fontSize: 15 }}>Entlastung der Rezeption:</strong>
                  <span style={{ color: '#E1E1E6', fontSize: 14, marginLeft: 6 }}>Wiederkehrende Fragen zu WLAN, Frühstück & Check-out werden visuell & selbsterklärend beantwortet.</span>
                </div>
              </div>

              <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                <div style={{ width: 24, height: 24, borderRadius: '50%', background: 'rgba(16,185,129,0.2)', color: '#10B981', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 2 }}>
                  <Check size={14} />
                </div>
                <div>
                  <strong style={{ color: '#FFF', fontSize: 15 }}>Zusatzumsätze für Spa & Bar:</strong>
                  <span style={{ color: '#E1E1E6', fontSize: 14, marginLeft: 6 }}>Freie Massage-Termine und Abendreisetipps werden gezielt als Sequential Reel eingestreut.</span>
                </div>
              </div>

              <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                <div style={{ width: 24, height: 24, borderRadius: '50%', background: 'rgba(16,185,129,0.2)', color: '#10B981', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 2 }}>
                  <Check size={14} />
                </div>
                <div>
                  <strong style={{ color: '#FFF', fontSize: 15 }}>Perfekte Nahtlosigkeit:</strong>
                  <span style={{ color: '#E1E1E6', fontSize: 14, marginLeft: 6 }}>Von großen Lobby-Screens bis hin zum NFC-Gästekarten-Scan auf dem eigenen Smartphone.</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => openConsultationFor('Hotellerie & Resorts')}
              style={{
                padding: '12px 24px',
                borderRadius: 12,
                background: 'linear-gradient(135deg, #10B981 0%, #3B82F6 100%)',
                color: '#FFF',
                fontWeight: 800,
                fontSize: 14,
                border: 'none',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8
              }}
            >
              <span>Demo für Hotels anfordern</span>
              <ArrowRight size={16} />
            </button>
          </div>

          {/* Right Visual Image */}
          <div style={{ position: 'relative' }}>
            <div style={{
              background: '#12131F',
              borderRadius: 28,
              border: '2px solid rgba(16,185,129,0.3)',
              padding: 16,
              boxShadow: '0 20px 50px rgba(16,185,129,0.2)'
            }}>
              <img
                src="https://images.unsplash.com/photo-1566073771259-6a8506099945?w=700&q=80"
                alt="Hotel Lobby Concierge Display"
                style={{ width: '100%', height: 380, objectFit: 'cover', borderRadius: 20 }}
              />
              <div style={{ padding: '16px 8px 4px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ fontSize: 15, fontWeight: 900, color: '#FFF' }}>Grand Hotel Lobby Screen 🏨</div>
                  <div style={{ fontSize: 12, color: '#10B981', fontWeight: 700 }}>Digital Concierge · Hospitality</div>
                </div>
                <span style={{ background: 'rgba(16,185,129,0.2)', color: '#10B981', fontSize: 11, fontWeight: 800, padding: '4px 10px', borderRadius: 10 }}>
                  24/7 Guest Flow
                </span>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* SECTION 4: EVENTS & FESTIVALS */}
      <section id="events" style={{ padding: '90px 5%', background: '#12131F' }}>
        <div style={{ maxWidth: 1150, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 40, alignItems: 'center' }}>
          
          {/* Left Visual Image */}
          <div style={{ position: 'relative', order: 2 }}>
            <div style={{
              background: '#1B1C2E',
              borderRadius: 28,
              border: '2px solid rgba(236,72,153,0.3)',
              padding: 16,
              boxShadow: '0 20px 50px rgba(236,72,153,0.2)'
            }}>
              <img
                src="https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=700&q=80"
                alt="Event Festival Display"
                style={{ width: '100%', height: 380, objectFit: 'cover', borderRadius: 20 }}
              />
              <div style={{ padding: '16px 8px 4px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ fontSize: 15, fontWeight: 900, color: '#FFF' }}>Festival Live Lineup Sync 🎧</div>
                  <div style={{ fontSize: 12, color: '#EC4899', fontWeight: 700 }}>Reel Content Management · Live Stage</div>
                </div>
                <span style={{ background: 'rgba(236,72,153,0.2)', color: '#EC4899', fontSize: 11, fontWeight: 800, padding: '4px 10px', borderRadius: 10 }}>
                  Realtime Cloud
                </span>
              </div>
            </div>
          </div>

          {/* Right Text */}
          <div style={{ order: 1 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
              <span style={{ background: 'rgba(236,72,153,0.2)', color: '#EC4899', fontSize: 11, fontWeight: 800, padding: '4px 14px', borderRadius: 20, border: '1px solid rgba(236,72,153,0.3)' }}>
                SECTION 4 · EVENTS & FESTIVALS
              </span>
            </div>
            <h2 style={{ fontSize: 'clamp(28px, 3.5vw, 42px)', fontWeight: 900, color: '#FFFFFF', marginBottom: 14, lineHeight: 1.2 }}>
              Events & Entertainment – Live-Vibe auf jeden Screen bringen
            </h2>
            <p style={{ fontSize: 18, color: '#EC4899', fontWeight: 700, marginBottom: 16 }}>
              Dynamische Line-ups, Sponsoring & Highlights in Echtzeit ausspielen.
            </p>
            <p style={{ fontSize: 15, color: '#E1E1E6', lineHeight: 1.6, marginBottom: 24 }}>
              Auf Festivals, Messen und Corporate Events zählt jede Sekunde. Schalte Sequential Reels für Programm-Highlights, Sponsor-Banners oder Sicherheits-Hinweise nahtlos hintereinander.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginBottom: 30 }}>
              <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                <div style={{ width: 24, height: 24, borderRadius: '50%', background: 'rgba(236,72,153,0.2)', color: '#EC4899', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 2 }}>
                  <Check size={14} />
                </div>
                <div>
                  <strong style={{ color: '#FFF', fontSize: 15 }}>Flexible Cloud Live-Updates:</strong>
                  <span style={{ color: '#E1E1E6', fontSize: 14, marginLeft: 6 }}>Änderungen im Zeitplan oder VIP-Ankündigungen in Sekunden global synchronisieren.</span>
                </div>
              </div>

              <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                <div style={{ width: 24, height: 24, borderRadius: '50%', background: 'rgba(236,72,153,0.2)', color: '#EC4899', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 2 }}>
                  <Check size={14} />
                </div>
                <div>
                  <strong style={{ color: '#FFF', fontSize: 15 }}>Sponsoren-Einbindung mit Impact:</strong>
                  <span style={{ color: '#E1E1E6', fontSize: 14, marginLeft: 6 }}>Hohe Werbewirksamkeit durch kurze, emotionale Video-Unterbrechungen im Reel.</span>
                </div>
              </div>

              <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                <div style={{ width: 24, height: 24, borderRadius: '50%', background: 'rgba(236,72,153,0.2)', color: '#EC4899', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 2 }}>
                  <Check size={14} />
                </div>
                <div>
                  <strong style={{ color: '#FFF', fontSize: 15 }}>Interaktive Gamification:</strong>
                  <span style={{ color: '#E1E1E6', fontSize: 14, marginLeft: 6 }}>QR-Code-Aktionen für Voting, VIP-Upgrades und Merch-Bestellungen per Smartphone.</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => openConsultationFor('Events & Festivals')}
              style={{
                padding: '12px 24px',
                borderRadius: 12,
                background: 'linear-gradient(135deg, #EC4899 0%, #8B5CF6 100%)',
                color: '#FFF',
                fontWeight: 800,
                fontSize: 14,
                border: 'none',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8
              }}
            >
              <span>Demo für Events anfordern</span>
              <ArrowRight size={16} />
            </button>
          </div>

        </div>
      </section>

      {/* COMPARISON MATRIX / USP SECTION */}
      <section style={{ padding: '80px 5%', background: '#1B1C2E', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
        <div style={{ maxWidth: 1000, margin: '0 auto', textAlign: 'center' }}>
          
          <div style={{ fontSize: 11, color: '#8B5CF6', fontWeight: 800, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 8 }}>
            DER ENTSCHEIDENDE VORTEIL
          </div>
          <h2 style={{ fontSize: 'clamp(26px, 3.5vw, 40px)', fontWeight: 900, color: '#FFFFFF', marginBottom: 16 }}>
            Klassische Digital Signage vs. SCENVY Sequential Reel Engine
          </h2>
          <p style={{ fontSize: 16, color: '#94A3B8', marginBottom: 40, maxWidth: 700, margin: '0 auto 40px' }}>
            Warum statische Plakatwände und langweilige PDF-Speisekarten ausdienen und das Video-Storytelling-Format die Konversionsraten vervielfacht.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 20 }}>
            
            {/* Konkurrenz / Alt */}
            <div style={{ background: '#12131F', borderRadius: 20, padding: 28, border: '1px solid rgba(239,68,68,0.2)', textAlign: 'left' }}>
              <div style={{ color: '#EF4444', fontSize: 12, fontWeight: 800, letterSpacing: 1, marginBottom: 8 }}>
                ❌ HERKÖMMLICHE ANBIETER & PDFS
              </div>
              <h3 style={{ fontSize: 18, fontWeight: 900, color: '#FFF', marginBottom: 14 }}>
                Starre Menü-Boards & Bilder-Slideshows
              </h3>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 12, fontSize: 14, color: '#94A3B8' }}>
                <li style={{ display: 'flex', gap: 10 }}><X size={16} color="#EF4444" style={{ flexShrink: 0, marginTop: 3 }} /> Langweilige Plakatwand-Optik ohne Emotion</li>
                <li style={{ display: 'flex', gap: 10 }}><X size={16} color="#EF4444" style={{ flexShrink: 0, marginTop: 3 }} /> PDF-Zoom-Frust auf Mobilgeräten</li>
                <li style={{ display: 'flex', gap: 10 }}><X size={16} color="#EF4444" style={{ flexShrink: 0, marginTop: 3 }} /> Keine spontanen Kaufimpulse</li>
                <li style={{ display: 'flex', gap: 10 }}><X size={16} color="#EF4444" style={{ flexShrink: 0, marginTop: 3 }} /> Teure Hardware-Player Pflicht</li>
              </ul>
            </div>

            {/* SCENVY / Neu */}
            <div style={{ background: '#12131F', borderRadius: 20, padding: 28, border: '2px solid rgba(139,92,246,0.5)', textAlign: 'left', boxShadow: '0 10px 30px rgba(139,92,246,0.15)', position: 'relative' }}>
              <div style={{ position: 'absolute', top: -12, right: 20, background: 'linear-gradient(135deg, #8B5CF6, #EC4899)', color: '#FFF', fontSize: 10, fontWeight: 900, padding: '4px 12px', borderRadius: 12 }}>
                USP VORTEIL
              </div>
              <div style={{ color: '#A78BFA', fontSize: 12, fontWeight: 800, letterSpacing: 1, marginBottom: 8 }}>
                ⚡ SCENVY SEQUENTIAL REELS
              </div>
              <h3 style={{ fontSize: 18, fontWeight: 900, color: '#FFF', marginBottom: 14 }}>
                Storytelling POS & Visual Appetite Trigger
              </h3>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 12, fontSize: 14, color: '#E1E1E6' }}>
                <li style={{ display: 'flex', gap: 10 }}><Check size={16} color="#10B981" style={{ flexShrink: 0, marginTop: 3 }} /> <strong style={{ color: '#FFF' }}>Social-Media-Feeling:</strong> Hoher Unterhaltungswert</li>
                <li style={{ display: 'flex', gap: 10 }}><Check size={16} color="#10B981" style={{ flexShrink: 0, marginTop: 3 }} /> <strong style={{ color: '#FFF' }}>+80% Impulskäufe:</strong> Durch Appetit-Trigger-Videos</li>
                <li style={{ display: 'flex', gap: 10 }}><Check size={16} color="#10B981" style={{ flexShrink: 0, marginTop: 3 }} /> <strong style={{ color: '#FFF' }}>100% Web-URL:</strong> Läuft auf jedem Smart TV & Phone</li>
                <li style={{ display: 'flex', gap: 10 }}><Check size={16} color="#10B981" style={{ flexShrink: 0, marginTop: 3 }} /> <strong style={{ color: '#FFF' }}>Realtime Cloud Sync:</strong> Google Sheets Sync in 2 Sek</li>
              </ul>
            </div>

          </div>

        </div>
      </section>

      {/* FOOTER CTA SECTION */}
      <section style={{
        padding: '90px 5%',
        background: 'linear-gradient(180deg, #12131F 0%, #0A0B12 100%)',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{ maxWidth: 800, margin: '0 auto', position: 'relative', zIndex: 2 }}>
          
          <ScenvyLogoIcon size={56} style={{ margin: '0 auto 20px' }} />

          <h2 style={{ fontSize: 'clamp(30px, 4.5vw, 48px)', fontWeight: 900, color: '#FFFFFF', marginBottom: 16 }}>
            {lang === 'de' ? 'Bereit für den nächsten Schritt in deiner Branche?' : 'Ready for the Next Step in Your Industry?'}
          </h2>

          <p style={{ fontSize: 17, color: '#E1E1E6', lineHeight: 1.6, marginBottom: 36 }}>
            {lang === 'de'
              ? 'Lass uns deine aktuellen Display- oder Mobile-Lösungen analysieren und in ein ertragsstarkes Reel-Erlebnis verwandeln.'
              : 'Let us analyze your current displays or mobile solutions and transform them into high-revenue reel experiences.'}
          </p>

          <button
            onClick={() => setConsultationOpen(true)}
            style={{
              padding: '18px 40px',
              borderRadius: 16,
              border: 'none',
              background: 'linear-gradient(135deg, #8B5CF6 0%, #EC4899 100%)',
              color: '#FFFFFF',
              fontWeight: 800,
              fontSize: 17,
              cursor: 'pointer',
              boxShadow: '0 12px 40px rgba(139,92,246,0.4)',
              display: 'inline-flex',
              alignItems: 'center',
              gap: 12
            }}
          >
            <span>{lang === 'de' ? 'Kostenloses Beratungsgespräch vereinbaren' : 'Schedule Free Consultation'}</span>
            <ArrowRight size={20} />
          </button>

          <div style={{ display: 'flex', justifyContent: 'center', gap: 24, marginTop: 32, fontSize: 13, color: '#94A3B8' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}><ShieldCheck size={16} color="#10B981" /> 100% unverbindlich</span>
            <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}><Clock size={16} color="#3B82F6" /> Antwort in unter 2h</span>
            <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}><Zap size={16} color="#F97316" /> Keine Kreditkarte</span>
          </div>

        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ background: '#090A10', padding: '40px 5%', borderTop: '1px solid rgba(255,255,255,0.08)', color: '#94A3B8', fontSize: 13, textAlign: 'center' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <ScenvyLogoIcon size={24} />
            <span style={{ fontWeight: 800, color: '#FFF' }}>SCENVY Branchenlösungen</span>
          </div>
          <div>
            © {new Date().getFullYear()} SCENVY Ecosystem. Alle Rechte vorbehalten.
          </div>
          <div style={{ display: 'flex', gap: 16 }}>
            <Link to="/" style={{ color: '#94A3B8', textDecoration: 'none' }}>Startseite</Link>
            <Link to="/board" style={{ color: '#94A3B8', textDecoration: 'none' }}>Board</Link>
            <Link to="/flow" style={{ color: '#94A3B8', textDecoration: 'none' }}>Flow</Link>
            <Link to="/menu" style={{ color: '#94A3B8', textDecoration: 'none' }}>Menu</Link>
          </div>
        </div>
      </footer>

      {/* MODALS */}
      <AppAuthModal isOpen={authModalOpen} onClose={() => setAuthModalOpen(false)} />
      <ContactConsultationModal isOpen={consultationOpen} onClose={() => setConsultationOpen(false)} lang={lang} defaultIndustry={selectedIndustry} />

    </div>
  )
}
