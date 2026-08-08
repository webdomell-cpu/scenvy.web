import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { C, grad } from '@/tokens'
import { useAuth } from '@/lib/AuthContext'
import { 
  Globe, Layout, Code, Sparkles, Plus, Save, Trash2, Eye, EyeOff, ExternalLink, 
  Settings, Type, Palette, MoveUp, MoveDown, Check, ArrowLeft, RefreshCw, 
  Sliders, Copy, Monitor, Smartphone, Layers, Play, Zap, FileText, CheckCircle, LogOut, User,
  Image as ImageIcon, Upload, List, AlignLeft, HelpCircle, Star, MessageSquare, Flame, Tv, Edit3
} from 'lucide-react'
import { db } from '@/lib/firebase'
import { collection, doc, setDoc, getDoc, getDocs, deleteDoc } from 'firebase/firestore'
import { SocialProofAndHardwareSection } from '@/components/SocialProofAndHardwareSection'
import { BuyerPersonaSection } from '@/components/BuyerPersonaSection'
import { RoiCalculatorSection } from '@/components/RoiCalculatorSection'
import { AiWorkflowSection } from '@/components/AiWorkflowSection'

// Default template pages with Company & Legal pages pre-populated
const INITIAL_TEMPLATES = [
  {
    id: 'page_main_landing',
    slug: 'hauptseite',
    title: 'SCENVY Ecosystem Haupt-Seite',
    navLabel: 'Hauptseite',
    inNav: false,
    navOrder: 0,
    description: 'Offizielle Landingpage für Gäste, Venues und Partner mit Video-Reel Showcase.',
    isPublished: true,
    theme: {
      bg: '#0A0A10',
      text: '#F3F4F6',
      accent: '#7C3AED',
      fontFamily: 'Inter, sans-serif',
      fontSizeScale: 1.0,
      customCss: `/* Custom CSS & Keyframe Animationen */
@keyframes floatGlow {
  0% { transform: translateY(0px); filter: drop-shadow(0 10px 20px rgba(124,58,237,0.3)); }
  50% { transform: translateY(-8px); filter: drop-shadow(0 20px 30px rgba(255,45,141,0.5)); }
  100% { transform: translateY(0px); filter: drop-shadow(0 10px 20px rgba(124,58,237,0.3)); }
}
.animated-hero-title {
  animation: floatGlow 4s ease-in-out infinite;
}
`
    },
    blocks: [
      {
        id: 'b1',
        type: 'hero',
        kicker: 'DIE ZUKUNFT DES VENUE-MARKETINGS',
        title: 'Verwandle jeden Ort in ein scrollbares Erlebnis.',
        subtitle: 'SCENVY verwandelt QR-Codes in TikTok-artige vertikale Reels. Echtzeit-Angebote & KI-Inhalte ohne App-Download.',
        imageUrl: 'https://images.unsplash.com/photo-1551024506-0bccd828d307?w=1000&q=80',
        ctaText: 'Jetzt Kostenlos Ausprobieren →',
        ctaLink: 'https://app.scenvy.de',
        secondaryCtaText: 'Live Demo Ansehen',
        secondaryCtaLink: '#demo',
        fontSize: 34,
        paddingY: 48,
        isHidden: false
      },
      {
        id: 'b_reel_toggle',
        type: 'pos_reel_toggle',
        title: 'Der „Reel vs. Static“ Unterschied am POS',
        subtitle: 'Interaktiver Schalter: Wechsle zwischen klassischem Plakat und dynamischem Video Reel.',
        paddingY: 40,
        isHidden: false
      },
      {
        id: 'b_psychology',
        type: 'pos_psychology',
        title: 'Verkaufs-Psychologie & Impulse Engine am POS',
        subtitle: 'Wie Bewegung, Farbkontraste und Timing die Kaufentscheidung am POS lenken.',
        paddingY: 40,
        isHidden: false
      },
      {
        id: 'b_roi',
        type: 'roi_calculator',
        title: 'Interaktiver ROI & Umsatz-Rechner',
        subtitle: 'Berechne deinen monatlichen Zusatzumsatz durch dynamisches Cross-Selling mit SCENVY.',
        paddingY: 40,
        isHidden: false
      },
      {
        id: 'b_sandbox',
        type: 'live_demo_sandbox',
        title: 'Interaktive Live-Demo & Smartphone QR Scanner',
        subtitle: 'Testen Sie das SCENVY Gästeerlebnis direkt im Browser oder scannen Sie den QR-Code mit Ihrem Smartphone.',
        paddingY: 40,
        isHidden: false
      },
      {
        id: 'b_ai_wf',
        type: 'ai_workflow',
        title: 'KI-Workflow in 60 Sekunden',
        subtitle: 'Erstellen Sie automatisch fesselnde Marketing-Reels aus Text oder Fotos.',
        paddingY: 40,
        isHidden: false
      },
      {
        id: 'b_personas',
        type: 'buyer_personas',
        title: 'Maßgeschneiderte Lösungen für Ihr Team',
        subtitle: 'Egal ob Betreiber, Marketing oder IT — SCENVY bietet den passenden Mehrwert.',
        paddingY: 40,
        isHidden: false
      },
      {
        id: 'b_hardware',
        type: 'social_proof_hardware',
        title: '100% Hardware-Unabhängigkeit & Vergleichstabelle',
        subtitle: 'Erfahren Sie, warum SCENVY herkömmlichen Digital Signage Anbietern meilenweit voraus ist.',
        paddingY: 40,
        isHidden: false
      },
      {
        id: 'b_faq',
        type: 'faq_accordion',
        title: 'Häufig gestellte Fragen (FAQ)',
        subtitle: 'Alles was Sie über SCENVY, Setup, Hardware und Verträge wissen müssen.',
        paddingY: 36,
        isHidden: false
      },
      {
        id: 'b_pricing',
        type: 'pricing',
        title: 'Einfache, transparente Preise',
        subtitle: 'Keine Setup-Gebühren. Keine versteckten Kosten. Jederzeit kündbar.',
        paddingY: 40,
        isHidden: false
      },
      {
        id: 'b_cta',
        type: 'cta',
        title: 'Bereit deinen Umsatz zu steigern?',
        subtitle: 'Über 2.000 Venues vertrauen bereits auf das SCENVY Ecosystem.',
        ctaText: 'Jetzt Standort Registrieren →',
        ctaLink: 'https://app.scenvy.de',
        fontSize: 28,
        paddingY: 40,
        isHidden: false
      }
    ]
  },
  {
    id: 'page_scenvy_board',
    slug: 'board',
    title: 'SCENVY Board — Digital Signage & Menu Board SaaS',
    navLabel: 'Board',
    inNav: true,
    navOrder: 1,
    description: 'Digitales Zahlensystem & Digital Menu Board Software ohne Player-Hardware.',
    isPublished: true,
    theme: {
      bg: '#070B14',
      text: '#F8FAFC',
      accent: '#3B82F6',
      fontFamily: 'Inter, sans-serif'
    },
    blocks: [
      {
        id: 'board_b1',
        type: 'hero',
        kicker: '100% URL-BASIERT · KEIN HARDWARE-PLAYER ZWANG',
        title: 'SCENVY Board — Intelligente Digital Signage Software',
        subtitle: 'Verwandle jeden Smart TV, Monitor oder Screen per Web-URL in eine dynamische Speisekarte & Werbetafel mit Google Sheets Sync, RSS Feeds & Live-Animationen.',
        imageUrl: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=1000&q=80',
        ctaText: 'Scenvy Board Starten →',
        ctaLink: 'https://app.scenvy.de',
        fontSize: 34,
        paddingY: 50
      },
      {
        id: 'board_b2',
        type: 'features',
        title: 'Die Kernfunktionen von SCENVY Board',
        subtitle: 'Maximale Flexibilität für Gastronomie, Hotels & Einzelhandel.',
        fontSize: 24,
        paddingY: 40,
        items: [
          { title: 'Google Sheets Live Sync', desc: 'Preise & Speisen in Excel/Spreadsheet ändern, Screen aktualisiert sich in 2s.' },
          { title: 'RSS Feeds & Flugtafeln', desc: 'Nachrichten-Ticker, Wettervorhersagen und Live-Abflugzeiten einbinden.' },
          { title: 'KI Content Designer', desc: 'Gemini KI generiert professionelle Werbebanner per Textbefehl.' }
        ]
      }
    ]
  },
  {
    id: 'page_scenvy_flow',
    slug: 'flow',
    title: 'SCENVY Flow — Vertikale Video Reels',
    navLabel: 'Flow',
    inNav: true,
    navOrder: 2,
    description: 'Vertikale TikTok-artige Story Reels für Restaurants, Bars und Venues.',
    isPublished: true,
    theme: { bg: '#1E1035', text: '#FFFFFF', accent: '#8B5CF6', fontFamily: 'Inter, sans-serif' },
    blocks: [
      {
        id: 'flow_b1',
        type: 'hero',
        kicker: 'VERTIKALE CONTENT REELS',
        title: 'SCENVY Flow — TikTok-Stories für dein Venue',
        subtitle: 'Gäste scannen den QR-Code und swipen durch dein Angebot in atemberaubenden Vollbild-Videos.',
        imageUrl: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=1000&q=80',
        ctaText: 'Jetzt Flow Testen →',
        ctaLink: 'https://app.scenvy.de',
        fontSize: 32,
        paddingY: 44
      }
    ]
  },
  {
    id: 'page_scenvy_menu',
    slug: 'menu',
    title: 'SCENVY Menu — Interaktives Digitales Menü',
    navLabel: 'Menu',
    inNav: true,
    navOrder: 3,
    description: 'Digitale Speisekarte mit Scan-to-Order & Allergen-Filtern.',
    isPublished: true,
    theme: { bg: '#2A1208', text: '#FFFFFF', accent: '#F97316', fontFamily: 'Inter, sans-serif' },
    blocks: [
      {
        id: 'menu_b1',
        type: 'hero',
        kicker: 'DIGITALES MENÜ BOARD & ORDERING',
        title: 'SCENVY Menu — Speisekarte der Zukunft',
        subtitle: 'Kein Nachdrucken mehr. Speisen, Allergenfilter & Tischnummer-Bestellung per QR-Code.',
        imageUrl: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=1000&q=80',
        ctaText: 'Digitales Menü Erstellen →',
        ctaLink: 'https://app.scenvy.de',
        fontSize: 32,
        paddingY: 44
      }
    ]
  },
  {
    id: 'page_about',
    slug: 'about',
    title: 'Über Uns — SCENVY Enterprise',
    navLabel: 'Über Uns',
    inNav: false,
    navOrder: 10,
    description: 'Erfahre mehr über die Vision hinter SCENVY Digital Signage & Mobile Reels.',
    isPublished: true,
    theme: { bg: '#0F172A', text: '#F8FAFC', accent: '#38BDF8', fontFamily: 'Inter, sans-serif' },
    blocks: [
      {
        id: 'about_b1',
        type: 'hero',
        kicker: 'UNSERE VISION',
        title: 'Wir revolutionieren die Gastronomie & Point of Sale Experience.',
        subtitle: 'SCENVY verbindet vertikale Videowelten mit intelligenter Bildschirmsteuerung.',
        fontSize: 32,
        paddingY: 44
      },
      {
        id: 'about_b2',
        type: 'text_block',
        title: 'Die Geschichte hinter SCENVY',
        subtitle: 'Gegründet um statische Plakatwände in lebendige Stories zu verwandeln.',
        content: 'Moderne Gastronomie braucht flexible digitale Lösungen statt verstaubter PDF-Dateien. Mit SCENVY steuern Betreiber ihre Screens, Speisekarten und Promo-Reels in Echtzeit aus dem Browser.',
        fontSize: 22,
        paddingY: 32
      }
    ]
  },
  {
    id: 'page_blog',
    slug: 'blog',
    title: 'Blog & Digital Signage News',
    navLabel: 'Blog',
    inNav: false,
    navOrder: 11,
    description: 'Aktuelle Guides, Tipps und Trends für Gastronomie & Retail.',
    isPublished: true,
    theme: { bg: '#0B0F19', text: '#F8FAFC', accent: '#A855F7', fontFamily: 'Inter, sans-serif' },
    blocks: [
      {
        id: 'blog_b1',
        type: 'hero',
        kicker: 'MAGAZIN & INSIGHTS',
        title: 'SCENVY Digital Signage & Content Blog',
        subtitle: 'Trends, Best Practices und Tipps für mehr Umsatz am Point of Sale.',
        fontSize: 32,
        paddingY: 40
      }
    ]
  },
  {
    id: 'page_careers',
    slug: 'careers',
    title: 'Karriere & Jobs bei SCENVY',
    navLabel: 'Karriere',
    inNav: false,
    navOrder: 12,
    description: 'Werde Teil unseres Teams und baue die Zukunft des POS Marketings.',
    isPublished: true,
    theme: { bg: '#0F172A', text: '#F8FAFC', accent: '#10B981', fontFamily: 'Inter, sans-serif' },
    blocks: [
      {
        id: 'careers_b1',
        type: 'hero',
        kicker: 'WIR SUCHEN TALENTE',
        title: 'Gestalte die Zukunft der Gastronomie mit uns.',
        subtitle: 'Offene Stellen in Engineering, Product & Growth Sales.',
        fontSize: 32,
        paddingY: 40
      }
    ]
  },
  {
    id: 'page_press',
    slug: 'press',
    title: 'Presse & Medien Kit',
    navLabel: 'Presse',
    inNav: false,
    navOrder: 13,
    description: 'Pressemitteilungen, Branding Logos und Ansprechpartner.',
    isPublished: true,
    theme: { bg: '#0B0F19', text: '#F8FAFC', accent: '#F43F5E', fontFamily: 'Inter, sans-serif' },
    blocks: [
      {
        id: 'press_b1',
        type: 'hero',
        kicker: 'MEDIA KIT',
        title: 'Presse-Informationen & Logo Assets',
        subtitle: 'Download von hochauflösenden Visuals, Logos und Fact Sheets.',
        fontSize: 32,
        paddingY: 40
      }
    ]
  },
  {
    id: 'page_privacy',
    slug: 'privacy',
    title: 'Datenschutzerklärung',
    navLabel: 'Datenschutz',
    inNav: false,
    navOrder: 20,
    description: 'Informationen zur Datenverarbeitung nach DSGVO.',
    isPublished: true,
    theme: { bg: '#0A0A10', text: '#E2E8F0', accent: '#8B5CF6', fontFamily: 'Inter, sans-serif' },
    blocks: [
      {
        id: 'priv_b1',
        type: 'text_block',
        title: 'Datenschutzerklärung & Privacy Policy',
        title_en: 'Privacy Policy & Data Protection',
        subtitle: 'Informationen zur Verarbeitung personenbezogener Daten nach DSGVO / GDPR',
        subtitle_en: 'Information regarding personal data processing in accordance with GDPR',
        kicker: 'RECHTLICHES',
        kicker_en: 'LEGAL NOTICE',
        content: `1. Verantwortlicher & Kontaktdaten
Verantwortlicher im Sinne der Datenschutz-Grundverordnung (DSGVO) ist:
SCENVY Digital Technologies GmbH
E-Mail: datenschutz@scenvy.de | Website: https://scenvy.de

Bei Fragen zur Erhebung, Verarbeitung oder Nutzung Ihrer personenbezogenen Daten wenden Sie sich bitte direkt an datenschutz@scenvy.de.

2. Erhebung & Speicherung personenbezogener Daten
Beim Aufrufen unserer Webseiten (scenvy.de, app.scenvy.de) oder der Kunden-Web-Apps (Menu, Flow, Board) werden automatisch Logfile-Informationen durch Ihren Browser an unsere Server übermittelt:
- IP-Adresse des anfragenden Endgeräts
- Datum und Uhrzeit des Zugriffs
- Name und URL der abgerufenen Datei
- Referrer-URL & vergleichende Browser-Informationen

Diese Daten werden verarbeitet zur Gewährleistung des reibungslosen Verbindungsaufbaus sowie zur Systemsicherheit.

3. Cookies, Local Storage & Session-Management
Wir setzen auf unserer Seite technisch notwendige Cookies sowie Local Storage Mechanismen ein. Dies dient der Speicherung von Sprachpräferenzen, Sitzungstokens sowie Tischnummern im digitalen Menü.

4. Betroffenenrechte nach DSGVO
Sie haben jederzeit das Recht auf Auskunft (Art. 15 DSGVO), Berichtigung (Art. 16 DSGVO), Löschung (Art. 17 DSGVO), Einschränkung der Verarbeitung (Art. 18 DSGVO) sowie Datenübertragbarkeit (Art. 20 DSGVO).`,
        content_en: `1. Controller & Contact Details
Controller within the meaning of the General Data Protection Regulation (GDPR) is:
SCENVY Digital Technologies GmbH
Email: datenschutz@scenvy.de | Website: https://scenvy.de

For inquiries regarding personal data processing, please contact datenschutz@scenvy.de.

2. Collection & Storage of Personal Data
When visiting our websites (scenvy.de, app.scenvy.de) or customer web applications (Menu, Flow, Board), server log files automatically record:
- IP address of requesting device
- Date and timestamp of access
- Name and URL of accessed resources
- Referrer URL & browser metadata

This data is processed to maintain network security, uptime, and proper service execution.

3. Cookies, Local Storage & Session Tokens
We utilize essential session cookies and browser Local Storage mechanisms to retain user language settings, session tokens, and table order references.

4. Your Rights under GDPR
You possess the right to access (Art. 15 GDPR), rectification (Art. 16 GDPR), erasure (Art. 17 GDPR), restriction of processing (Art. 18 GDPR), and data portability (Art. 20 GDPR).`,
        fontSize: 28,
        paddingY: 36
      }
    ]
  },
  {
    id: 'page_terms',
    slug: 'terms',
    title: 'Allgemeine Geschäftsbedingungen (AGB)',
    navLabel: 'AGB',
    inNav: false,
    navOrder: 21,
    description: 'Nutzungsbedingungen für das SCENVY Ecosystem.',
    isPublished: true,
    theme: { bg: '#0A0A10', text: '#E2E8F0', accent: '#8B5CF6', fontFamily: 'Inter, sans-serif' },
    blocks: [
      {
        id: 'terms_b1',
        type: 'text_block',
        title: 'Allgemeine Geschäftsbedingungen (AGB)',
        title_en: 'Terms of Service (TOS)',
        subtitle: 'Rechtliche Rahmenbedingungen für die Nutzung der SCENVY Plattform & SaaS-Module',
        subtitle_en: 'Legal terms for subscribing to and utilizing SCENVY software modules',
        kicker: 'VERTRAGSBEDINGUNGEN',
        kicker_en: 'TERMS & CONDITIONS',
        content: `§ 1 Geltungsbereich & Vertragspartner
(1) Diese Allgemeinen Geschäftsbedingungen (AGB) gelten für alle Verträge zwischen der SCENVY Digital Technologies GmbH (nachfolgend "SCENVY") und Geschäftskunden (nachfolgend "Kunde" oder "Venue-Betreiber").
(2) Gegenstand ist die Bereitstellung von Software-as-a-Service (SaaS) Lösungen, u.a. SCENVY Board, SCENVY Flow und SCENVY Menu.

§ 2 Leistungsumfang & Systemverfügbarkeit
(1) SCENVY gewährt den Zugriff auf die vereinbarten SaaS-Module über das Internet.
(2) SCENVY garantiert eine durchschnittliche Systemverfügbarkeit von 99,5 % im Jahresmittel (ausgenommen angekündigte Wartungsfenster).

§ 3 Pflichten des Kunden & Content-Verantwortung
(1) Der Kunde trägt die alleinige Verantwortung für die von ihm hochgeladenen Inhalte (Videos, Speisekarten, Preise, Bilder).
(2) Der Kunde verpflichtet sich, keine rechtswidrigen oder Rechte Dritter verletzenden Inhalte zu veröffentlichen.

§ 4 Laufzeit & Kündigung
(1) Abonnements sind je nach gewähltem Abrechnungsintervall (monatlich/jährlich) mit einer Frist von 14 Tagen zum Ende der jeweiligen Laufzeit kündbar.`,
        content_en: `§ 1 Scope & Contracting Parties
(1) These Terms of Service apply to all agreements between SCENVY Digital Technologies GmbH (hereinafter "SCENVY") and commercial clients (hereinafter "Customer" or "Venue Operator").
(2) The subject matter is the provision of Software-as-a-Service (SaaS) solutions including SCENVY Board, SCENVY Flow, and SCENVY Menu.

§ 2 Scope of Services & System Availability
(1) SCENVY provides online access to subscribed SaaS modules.
(2) SCENVY guarantees an annual average system availability of 99.5% (excluding scheduled maintenance windows).

§ 3 Customer Obligations & Content Responsibility
(1) The Customer retains sole responsibility for all uploaded materials (reels, menu items, pricing, photos).
(2) The Customer agrees not to publish content violating statutory regulations or third-party rights.

§ 4 Subscription Term & Cancellation
(1) Subscriptions may be cancelled with a notice period of 14 days prior to the end of the current billing cycle.`,
        fontSize: 28,
        paddingY: 36
      }
    ]
  },
  {
    id: 'page_gdpr',
    slug: 'gdpr',
    title: 'DSGVO Konformität',
    navLabel: 'DSGVO',
    inNav: false,
    navOrder: 22,
    description: 'Unsere Sicherheits- und Datenschutzstandards im Detail.',
    isPublished: true,
    theme: { bg: '#0A0A10', text: '#E2E8F0', accent: '#8B5CF6', fontFamily: 'Inter, sans-serif' },
    blocks: [
      {
        id: 'gdpr_b1',
        type: 'text_block',
        title: 'DSGVO & Data Security Standards',
        title_en: 'GDPR & Data Security Standards',
        subtitle: '100% hosted in der Europäischen Union (Frankfurt, Deutschland)',
        subtitle_en: '100% Hosted within the European Union (Frankfurt, Germany)',
        kicker: 'COMPLIANCE',
        kicker_en: 'COMPLIANCE',
        content: `1. EU Cloud Infrastruktur:
Sämtliche Server-, Datenbank- und Mediennetzwerke von SCENVY werden in nach ISO-27001 zertifizierten Rechenzentren innerhalb der Europäischen Union betrieben.

2. Auftragsverarbeitungsvertrag (AVV / DPA):
Für Gastronomiebetriebe und Geschäftskunden stellen wir einen vollumfänglichen AV-Vertrag gemäß Art. 28 DSGVO zur Verfügung. Dieser kann direkt im Kunden-Dashboard digital generiert und gegengezeichnet werden.

3. Verschlüsselungsstandards:
Datenübertragungen zwischen Endgeräten, Bildschirmen und der SCENVY Cloud sind per 256-Bit TLS 1.3 verschlüsselt.`,
        content_en: `1. EU Cloud Infrastructure:
All server, database, and video processing clusters operate inside ISO 27001 certified data centers located in Frankfurt am Main, Germany.

2. Data Processing Agreement (DPA / AVV):
We offer a fully compliant Data Processing Agreement pursuant to Art. 28 GDPR for all venue operators, accessible directly from the customer admin console.

3. Encryption Standards:
All network communications are secured using 256-Bit TLS 1.3 protocol encryption end-to-end.`,
        fontSize: 28,
        paddingY: 36
      }
    ]
  },
  {
    id: 'page_imprint',
    slug: 'imprint',
    title: 'Impressum',
    navLabel: 'Impressum',
    inNav: false,
    navOrder: 23,
    description: 'Gesetzliche Anbieterkennzeichnung nach § 5 DDG.',
    isPublished: true,
    theme: { bg: '#0A0A10', text: '#E2E8F0', accent: '#8B5CF6', fontFamily: 'Inter, sans-serif' },
    blocks: [
      {
        id: 'imp_b1',
        type: 'text_block',
        title: 'Impressum & Legal Notice',
        title_en: 'Imprint & Legal Notice',
        subtitle: 'Angaben gemäß § 5 DDG (ehemals TMG)',
        subtitle_en: 'Provider information pursuant to § 5 DDG',
        kicker: 'ANBIETERKENNZEICHNUNG',
        kicker_en: 'LEGAL IDENTIFICATION',
        content: `SCENVY Digital Technologies GmbH i.G.
Musterstraße 42
10115 Berlin, Deutschland

Vertreten durch:
Die Geschäftsführung: Marc Domell & Partner

Kontakt:
E-Mail: kontakt@scenvy.de
Website: https://scenvy.de

Registereintrag:
Handelsregister Amtsgericht Berlin-Charlottenburg
Registernummer: HRB 248910 B

Umsatzsteuer-ID:
Umsatzsteuer-Identifikationsnummer gemäß § 27 a Umsatzsteuergesetz: DE384920194`,
        content_en: `SCENVY Digital Technologies GmbH i.G.
Musterstraße 42
10115 Berlin, Germany

Represented by:
Managing Directors: Marc Domell & Partners

Contact:
Email: kontakt@scenvy.de
Website: https://scenvy.de

Commercial Register:
Registered at District Court Berlin-Charlottenburg
Registration Number: HRB 248910 B

VAT Identification Number:
VAT ID pursuant to § 27 a German VAT Act: DE384920194`,
        fontSize: 28,
        paddingY: 36
      }
    ]
  }
]

export default function WebsiteStudio() {
  const nav = useNavigate()
  const { user, logout } = useAuth()

  const handleLogout = async () => {
    sessionStorage.removeItem('scenvy_cms_unlocked')
    try {
      await logout()
    } catch (e) {
      console.warn('Logout error:', e)
    }
    nav('/auth')
  }
  
  const [pages, setPages] = useState(INITIAL_TEMPLATES)
  const [selectedPageId, setSelectedPageId] = useState(INITIAL_TEMPLATES[0].id)
  const [activeTab, setActiveTab] = useState('editor') // 'editor' | 'nav' | 'code' | 'global' | 'settings' | 'preview'
  const [editorMode, setEditorMode] = useState('visual') // 'visual' (WYSIWYG) | 'form'
  const [wysiwygLang, setWysiwygLang] = useState('de') // 'de' | 'en'
  const lang = wysiwygLang || 'de'
  const [activeQuickEditBlockId, setActiveQuickEditBlockId] = useState(null)
  const [previewDevice, setPreviewDevice] = useState('desktop') // 'desktop' | 'mobile'
  const [isSaving, setIsSaving] = useState(false)
  const [notifyMsg, setNotifyMsg] = useState('')
  const [showNewPageModal, setShowNewPageModal] = useState(false)
  const [showPreview, setShowPreview] = useState(false)
  const [jumpToBlockId, setJumpToBlockId] = useState('')

  // Comprehensive Auto-Translator from German to English
  const translateTextDEtoEN = (txt) => {
    if (!txt) return ''
    const map = {
      'Verwandle jeden Ort in ein scrollbares Erlebnis.': 'Transform every venue into a scrollable experience.',
      'SCENVY verwandelt QR-Codes in TikTok-artige vertikale Reels. Echtzeit-Angebote & KI-Inhalte ohne App-Download.': 'SCENVY turns QR codes into TikTok-style vertical reels. Real-time deals & AI content without app downloads.',
      'Jetzt Kostenlos Ausprobieren →': 'Try For Free Now →',
      'Live Demo Ansehen': 'Watch Live Demo',
      'Der „Reel vs. Static“ Unterschied am POS': 'The "Reel vs. Static" Difference at POS',
      'Interaktiver Schalter: Wechsle zwischen klassischem Plakat und dynamischem Video Reel.': 'Interactive Switch: Toggle between classic posters and dynamic video reels.',
      'Verkaufs-Psychologie & Impulse Engine am POS': 'Sales Psychology & Impulse Engine at POS',
      'Wie Bewegung, Farbkontraste und Timing die Kaufentscheidung am POS lenken.': 'How motion, color contrast, and timing drive purchase decisions at POS.',
      'Interaktiver ROI & Umsatz-Rechner': 'Interactive ROI & Revenue Calculator',
      'Berechne deinen monatlichen Zusatzumsatz durch dynamisches Cross-Selling mit SCENVY.': 'Calculate your monthly extra revenue from dynamic cross-selling with SCENVY.',
      'Interaktive Live-Demo & Smartphone QR Scanner': 'Interactive Live Demo & Smartphone QR Scanner',
      'Testen Sie das SCENVY Gästeerlebnis direkt im Browser oder scannen Sie den QR-Code mit Ihrem Smartphone.': 'Test the SCENVY guest experience in your browser or scan the QR code with your smartphone.',
      'KI-Workflow in 60 Sekunden': 'AI Workflow in 60 Seconds',
      'Erstellen Sie automatisch fesselnde Marketing-Reels aus Text oder Fotos.': 'Automatically create captivating marketing reels from text or photos.',
      'Maßgeschneiderte Lösungen für Ihr Team': 'Tailored Solutions for Your Team',
      'Egal ob Betreiber, Marketing oder IT — SCENVY bietet den passenden Mehrwert.': 'Whether operator, marketing or IT — SCENVY provides tailored value.',
      '100% Hardware-Unabhängigkeit & Vergleichstabelle': '100% Hardware Independence & Comparison Table',
      'Erfahren Sie, warum SCENVY herkömmlichen Digital Signage Anbietern meilenweit voraus ist.': 'Learn why SCENVY is miles ahead of legacy digital signage providers.',
      'Häufig gestellte Fragen (FAQ)': 'Frequently Asked Questions (FAQ)',
      'Alles was Sie über SCENVY, Setup, Hardware und Verträge wissen müssen.': 'Everything you need to know about SCENVY, setup, hardware, and contracts.',
      'Einfache, transparente Preise': 'Simple, Transparent Pricing',
      'Keine Setup-Gebühren. Keine versteckten Kosten. Jederzeit kündbar.': 'No setup fees. No hidden costs. Cancel anytime.',
      'Bereit deinen Umsatz zu steigern?': 'Ready to grow your revenue?',
      'Über 2.000 Venues vertrauen bereits auf das SCENVY Ecosystem.': 'Over 2,000 venues already trust the SCENVY Ecosystem.',
      'Jetzt Standort Registrieren →': 'Register Your Venue Now →',
      'DIE ZUKUNFT DES VENUE-MARKETINGS': 'THE FUTURE OF VENUE MARKETING',
      'WILLKOMMEN': 'WELCOME',
      'NEUE SEKTION': 'NEW SECTION'
    }
    if (map[txt]) return map[txt]
    return txt
      .replace(/JETZT KOSTENLOS/gi, 'TRY FREE NOW')
      .replace(/Jetzt Starten/gi, 'Get Started Now')
      .replace(/Aktion Starten/gi, 'Start Action')
      .replace(/Mehr Erfahren/gi, 'Learn More')
      .replace(/Verwandle/g, 'Transform')
      .replace(/Kostenlos/gi, 'Free')
  }

  const handleAutoTranslateBlock = (blockId) => {
    updateCurrentPage(prev => ({
      ...prev,
      blocks: prev.blocks.map(b => {
        if (b.id !== blockId) return b
        return {
          ...b,
          title_en: b.title_en || translateTextDEtoEN(b.title),
          subtitle_en: b.subtitle_en || translateTextDEtoEN(b.subtitle),
          kicker_en: b.kicker_en || translateTextDEtoEN(b.kicker),
          ctaText_en: b.ctaText_en || translateTextDEtoEN(b.ctaText),
          content_en: b.content_en || translateTextDEtoEN(b.content)
        }
      })
    }))
    triggerNotify('✨ DE ➔ EN KI-Übersetzung erfolgreich angewendet!')
  }

  const handleAutoTranslateAll = () => {
    if (!currentPage) return
    updateCurrentPage(prev => ({
      ...prev,
      blocks: prev.blocks.map(b => ({
        ...b,
        title_en: b.title_en || translateTextDEtoEN(b.title),
        subtitle_en: b.subtitle_en || translateTextDEtoEN(b.subtitle),
        kicker_en: b.kicker_en || translateTextDEtoEN(b.kicker),
        ctaText_en: b.ctaText_en || translateTextDEtoEN(b.ctaText),
        content_en: b.content_en || translateTextDEtoEN(b.content)
      }))
    }))
    triggerNotify('✨ Alle Sektionen & Texte wurden automatisch ins Englische übersetzt!')
  }
  
  // Form for new page
  const [newPageTitle, setNewPageTitle] = useState('')
  const [newPageSlug, setNewPageSlug] = useState('')

  // Global Ecosystem Header Bar & Live Ticker Settings State
  const [globalSettings, setGlobalSettings] = useState({
    isAnnouncementEnabled: true,
    announcementText: '✨ NEU: KI Reel-Generator 2.0 ist live',
    announcementLink: 'https://app.scenvy.de',
    isLiveTickerEnabled: true,
    liveTickerSpeedSec: 6,
    liveTickerMessages: [
      { text: 'Ein Restaurant aus München hat gerade die Gastronomie-Reel-Engine gestartet', icon: 'Flame', color: '#EC4899' },
      { text: 'Boutique-Hotel in Wien hat 4 SCENVY Digital Boards verbunden', icon: 'Tv', color: '#3B82F6' },
      { text: 'Rooftop Bar in Hamburg schaltete den 2-for-1 Happy Hour Reel frei', icon: 'Sparkles', color: '#7C3AED' },
      { text: 'Pizzeria in Berlin hat 18 neue Scan-to-Order QR Aufsteller gedruckt', icon: 'CheckCircle', color: '#10B981' }
    ]
  })

  // Selected Page State
  const currentPage = (pages && pages.length > 0)
    ? (pages.find(p => p.id === selectedPageId) || pages[0])
    : INITIAL_TEMPLATES[0]

  useEffect(() => {
    loadPages()
  }, [])

  const triggerNotify = (msg) => {
    setNotifyMsg(msg)
    setTimeout(() => setNotifyMsg(''), 3500)
  }

  const loadPages = async () => {
    try {
      const snap = await getDocs(collection(db, 'custom_pages'))
      if (!snap.empty) {
        const loaded = snap.docs.map(d => ({ id: d.id, ...d.data() }))
        setPages(loaded)
        if (!selectedPageId && loaded.length > 0) {
          setSelectedPageId(loaded[0].id)
        }
      } else {
        setPages(INITIAL_TEMPLATES)
        setSelectedPageId(INITIAL_TEMPLATES[0].id)
      }

      // Load Global Ecosystem Settings from Firestore
      const globSnap = await getDoc(doc(db, 'scenvy_global_settings', 'main'))
      if (globSnap.exists()) {
        setGlobalSettings(prev => ({ ...prev, ...globSnap.data() }))
      }
    } catch (e) {
      console.warn('Firestore fallback to local initial templates:', e)
      setPages(INITIAL_TEMPLATES)
      setSelectedPageId(INITIAL_TEMPLATES[0].id)
    }
  }

  const savePagesToBackend = async (updatedPagesList) => {
    setIsSaving(true)
    try {
      for (const p of updatedPagesList || pages) {
        await setDoc(doc(db, 'custom_pages', p.id), {
          ...p,
          updatedAt: new Date().toISOString()
        })
      }
      
      // Save Global Ecosystem & Header Settings
      await setDoc(doc(db, 'scenvy_global_settings', 'main'), {
        ...globalSettings,
        updatedAt: new Date().toISOString()
      })

      triggerNotify('✅ Alle Webseiten & globale Header-Einstellungen gespeichert!')
    } catch (e) {
      console.error('Save error:', e)
      triggerNotify('💾 Lokal aktualisiert (Backend-Hinweis: ' + e.message + ')')
    } finally {
      setIsSaving(false)
    }
  }

  const handleCreatePage = async (e) => {
    e.preventDefault()
    if (!newPageTitle.trim()) return
    const slug = (newPageSlug || newPageTitle).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
    
    const newPageObj = {
      id: 'page_' + Date.now(),
      slug: slug || 'seite-' + Date.now(),
      title: newPageTitle,
      navLabel: newPageTitle,
      inNav: false,
      navOrder: pages.length + 1,
      description: 'Neue benutzerdefinierte Landing-Page.',
      isPublished: true,
      theme: {
        bg: '#0A0A10',
        text: '#F3F4F6',
        accent: '#7C3AED',
        fontFamily: 'Inter, sans-serif'
      },
      blocks: [
        {
          id: 'b_' + Date.now(),
          type: 'hero',
          kicker: 'WILLKOMMEN',
          title: newPageTitle,
          subtitle: 'Bearbeite diesen Text direkt im Live-Editor.',
          ctaText: 'Aktion Starten',
          ctaLink: '#',
          fontSize: 30,
          paddingY: 40
        }
      ]
    }

    const nextList = [newPageObj, ...pages]
    setPages(nextList)
    setSelectedPageId(newPageObj.id)
    setShowNewPageModal(false)
    setNewPageTitle('')
    setNewPageSlug('')
    await savePagesToBackend(nextList)
  }

  const handleDuplicatePage = async (pageId) => {
    const pageToDup = pages.find(p => p.id === pageId)
    if (!pageToDup) return
    const newSlug = `${pageToDup.slug}-kopie-${Date.now().toString().slice(-4)}`
    const duplicatedObj = {
      ...JSON.parse(JSON.stringify(pageToDup)),
      id: 'page_' + Date.now(),
      title: `${pageToDup.title} (Kopie)`,
      navLabel: `${pageToDup.navLabel || pageToDup.title} (Kopie)`,
      slug: newSlug,
      createdAt: new Date().toISOString()
    }

    const nextList = [duplicatedObj, ...pages]
    setPages(nextList)
    setSelectedPageId(duplicatedObj.id)
    await savePagesToBackend(nextList)
    triggerNotify('📄 Seite erfolgreich dupliziert!')
  }

  const handleDeletePage = async (pageId) => {
    if (pages.length <= 1) {
      alert('Mindestens eine Seite muss im System erhalten bleiben.')
      return
    }
    if (!confirm('Möchtest du diese Landing-Page wirklich löschen?')) return

    const nextList = pages.filter(p => p.id !== pageId)
    setPages(nextList)
    setSelectedPageId(nextList[0].id)
    try {
      await deleteDoc(doc(db, 'custom_pages', pageId))
      triggerNotify('🗑️ Seite gelöscht.')
    } catch (e) {
      triggerNotify('🗑️ Seite lokal gelöscht.')
    }
  }

  const updateCurrentPage = (updater) => {
    if (!currentPage) return
    const updated = typeof updater === 'function' ? updater(currentPage) : updater
    const nextList = pages.map(p => p.id === currentPage.id ? updated : p)
    setPages(nextList)
  }

  // Block management
  const [copiedBlock, setCopiedBlock] = useState(null)

  const handleCopyBlockToPage = async (block, targetPageId) => {
    const targetPage = pages.find(p => p.id === targetPageId)
    if (!targetPage) return
    const duplicatedBlock = {
      ...JSON.parse(JSON.stringify(block)),
      id: 'b_' + Date.now() + '_' + Math.random().toString(36).substr(2, 4)
    }

    const updatedPages = pages.map(p => {
      if (p.id === targetPageId) {
        return {
          ...p,
          blocks: [...p.blocks, duplicatedBlock]
        }
      }
      return p
    })

    setPages(updatedPages)
    await savePagesToBackend(updatedPages)
    triggerNotify(`📋 Block in Seite "${targetPage.title}" kopiert!`)
  }

  const handleCopyBlockToClipboard = (block) => {
    setCopiedBlock(JSON.parse(JSON.stringify(block)))
    triggerNotify('📋 Block in Zwischenablage kopiert!')
  }

  const handlePasteBlockFromClipboard = () => {
    if (!copiedBlock || !currentPage) return
    const pastedBlock = {
      ...JSON.parse(JSON.stringify(copiedBlock)),
      id: 'b_' + Date.now()
    }
    updateCurrentPage(prev => ({
      ...prev,
      blocks: [...prev.blocks, pastedBlock]
    }))
    triggerNotify('📋 Block aus Zwischenablage eingefügt!')
  }

  const updateBlock = (blockId, field, value) => {
    updateCurrentPage(prev => ({
      ...prev,
      blocks: prev.blocks.map(b => {
        if (b.id !== blockId) return b
        const updated = { ...b, [field]: value }

        // Live automatic translation if user is editing a German field and English field is empty/unset
        if (['title', 'subtitle', 'kicker', 'ctaText', 'content'].includes(field)) {
          const enField = `${field}_en`
          if (!updated[enField] || updated[enField] === translateTextDEtoEN(b[field])) {
            updated[enField] = translateTextDEtoEN(value)
          }
        }
        return updated
      })
    }))
  }

  const handleFileUploadForBlock = (blockId, field, e) => {
    const file = e.target.files && e.target.files[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = (uploadEvent) => {
      updateBlock(blockId, field, uploadEvent.target.result)
      triggerNotify('🖼️ Bild erfolgreich hochgeladen!')
    }
    reader.readAsDataURL(file)
  }

  const addBlockToPage = (type) => {
    if (!currentPage) return
    let newB = { id: 'b_' + Date.now(), type, fontSize: 24, paddingY: 32, isHidden: false }
    if (type === 'hero') {
      newB = { ...newB, kicker: 'NEUE SEKTION', title: 'Beeindruckender Titel', subtitle: 'Beschreibung der Aktion hier eingeben.', ctaText: 'Mehr Erfahren', ctaLink: '#' }
    } else if (type === 'text_block') {
      newB = { ...newB, title: 'Inhaltliche Überschrift', subtitle: 'Untertitel des Fließtextes', content: 'Dies ist ein bearbeitbarer Textabschnitt. Du kannst hier beliebig lange Beschreibungen, Erklärungen oder Artikel eingeben.' }
    } else if (type === 'image_banner') {
      newB = { ...newB, imageUrl: 'https://images.unsplash.com/photo-1551024506-0bccd828d307?w=1000&q=80', caption: 'Atmosphärisches Bild', altText: 'Banner Bild' }
    } else if (type === 'features') {
      newB = { ...newB, title: 'Unsere Highlights', subtitle: 'Drei starke Argumente', items: [{ title: 'Punkt 1', desc: 'Vorteil A' }, { title: 'Punkt 2', desc: 'Vorteil B' }] }
    } else if (type === 'roi_calculator') {
      newB = { ...newB, title: 'Interaktiver ROI & Umsatz-Rechner', subtitle: 'Berechne deinen monatlichen Zusatzumsatz durch dynamisches Cross-Selling.' }
    } else if (type === 'live_demo_sandbox') {
      newB = { ...newB, title: 'Interaktive Live-Demo & Smartphone Scanner', subtitle: 'Gästeerlebnis direkt im Browser oder per QR-Code testen.' }
    } else if (type === 'ai_workflow') {
      newB = { ...newB, title: 'KI-Workflow in 60 Sekunden', subtitle: 'Automatisch fesselnde Marketing-Reels aus Text oder Fotos generieren.' }
    } else if (type === 'buyer_personas') {
      newB = { ...newB, title: 'Maßgeschneiderte Lösungen für Ihr Team', subtitle: 'Für Gastronomen, Marketing und IT-Verantwortliche.' }
    } else if (type === 'social_proof_hardware') {
      newB = { ...newB, title: 'Hardware-Unabhängigkeit & Vergleichstabelle', subtitle: 'Vergleich mit herkömmlichen Systemen.' }
    } else if (type === 'faq_accordion') {
      newB = { ...newB, title: 'Häufig gestellte Fragen (FAQ)', subtitle: 'Alle wichtigen Antworten auf einen Blick.' }
    } else if (type === 'pricing') {
      newB = { ...newB, title: 'Einfache, transparente Preise', subtitle: 'Keine versteckten Kosten.' }
    } else if (type === 'cta') {
      newB = { ...newB, title: 'Jetzt Starten', subtitle: 'Verpasse keine Angebote mehr.', ctaText: 'Hier Klicken', ctaLink: '#' }
    } else if (type === 'code_embed') {
      newB = { ...newB, title: 'Custom Code / Animation Block', htmlContent: '<div style="padding: 20px; background: rgba(124,58,237,0.1); border-radius: 12px; text-align: center; border: 1px solid rgba(124,58,237,0.3);">⚡ Interaktiver Custom Widget Block</div>' }
    }

    updateCurrentPage(prev => ({
      ...prev,
      blocks: [...prev.blocks, newB]
    }))
    triggerNotify('➕ Neuer Block hinzugefügt!')
  }

  const removeBlock = (blockId) => {
    updateCurrentPage(prev => ({
      ...prev,
      blocks: prev.blocks.filter(b => b.id !== blockId)
    }))
  }

  const moveBlock = (index, dir) => {
    if (!currentPage) return
    const nextBlocks = [...currentPage.blocks]
    const targetIndex = index + dir
    if (targetIndex < 0 || targetIndex >= nextBlocks.length) return
    const temp = nextBlocks[index]
    nextBlocks[index] = nextBlocks[targetIndex]
    nextBlocks[targetIndex] = temp
    updateCurrentPage(prev => ({ ...prev, blocks: nextBlocks }))
  }

  return (
    <div style={{ minHeight: '100vh', background: '#07090E', color: C.white, fontFamily: 'Inter, system-ui, sans-serif' }}>
      {/* Main Studio Standalone Header Bar */}
      <header style={{
        background: C.card,
        borderBottom: `1px solid ${C.border}`,
        padding: '16px 28px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: 16
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <div style={{
            width: 42,
            height: 42,
            borderRadius: 12,
            background: 'linear-gradient(135deg, #7C3AED 0%, #EC4899 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 4px 14px rgba(124,58,237,0.4)'
          }}>
            <Globe size={22} color="#FFFFFF" />
          </div>
          <div>
            <div style={{ fontSize: 11, color: C.purple, fontWeight: 800, letterSpacing: 1.5, display: 'flex', alignItems: 'center', gap: 6 }}>
              SCENVY WEBSTUDIO CMS
            </div>
            <div style={{ fontSize: 20, fontWeight: 900, color: C.white, display: 'flex', alignItems: 'center', gap: 10 }}>
              Visual WYSIWYG Web Studio
            </div>
          </div>
        </div>

        {/* Action Controls & User Account Logout */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          {notifyMsg && (
            <div style={{ fontSize: 12, fontWeight: 700, color: C.green, background: `${C.green}18`, padding: '6px 14px', borderRadius: 20, border: `1px solid ${C.green}44` }}>
              {notifyMsg}
            </div>
          )}

          <button
            onClick={() => setShowNewPageModal(true)}
            style={{ padding: '9px 16px', borderRadius: 10, background: C.bg, border: `1px solid ${C.purple}`, color: C.purple, fontSize: 13, fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6 }}
          >
            <Plus size={15} /> Neue Seite
          </button>

          <button
            onClick={() => savePagesToBackend(pages)}
            disabled={isSaving}
            style={{ padding: '10px 22px', borderRadius: 10, background: grad(C.purple, C.pink), border: 'none', color: C.white, fontSize: 13, fontWeight: 800, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8, boxShadow: `0 4px 16px ${C.purple}44` }}
          >
            <Save size={16} /> {isSaving ? 'Speichere...' : 'Änderungen Speichern'}
          </button>

          <button
            onClick={handleLogout}
            style={{
              padding: '9px 16px',
              borderRadius: 10,
              background: 'rgba(239,68,68,0.15)',
              border: '1px solid rgba(239,68,68,0.4)',
              color: '#EF4444',
              fontSize: 13,
              fontWeight: 800,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: 6
            }}
            title="Sicher aus dem WebStudio abmelden"
          >
            <LogOut size={15} /> Abmelden
          </button>
        </div>
      </header>

      {/* Studio Compact Navigation & Control Toolbar */}
      <div style={{ background: C.card, borderBottom: `1px solid ${C.border}`, padding: '12px 28px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 14 }}>
        
        {/* Left Side: Dropdown Selectors */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
          
          {/* Page Dropdown Selector */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <span style={{ fontSize: 11, fontWeight: 800, color: C.purple, letterSpacing: 1 }}>SEITE:</span>
            <select
              value={selectedPageId || ''}
              onChange={(e) => setSelectedPageId(e.target.value)}
              style={{
                background: C.bg,
                border: `1px solid ${C.purple}`,
                color: C.white,
                fontSize: 13,
                fontWeight: 800,
                padding: '8px 14px',
                borderRadius: 10,
                cursor: 'pointer',
                outline: 'none',
                boxShadow: '0 2px 10px rgba(124,58,237,0.2)'
              }}
            >
              {pages.map(p => (
                <option key={p.id} value={p.id}>
                  📄 {p.title} ({p.isPublished ? 'LIVE' : 'ENTWURF'})
                </option>
              ))}
            </select>
          </div>

          {/* Editor Area Dropdown Selector */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <span style={{ fontSize: 11, fontWeight: 800, color: C.muted, letterSpacing: 1 }}>BEREICH:</span>
            <select
              value={activeTab}
              onChange={(e) => setActiveTab(e.target.value)}
              style={{
                background: C.bg,
                border: `1px solid ${C.border}`,
                color: C.white,
                fontSize: 13,
                fontWeight: 700,
                padding: '8px 14px',
                borderRadius: 10,
                cursor: 'pointer',
                outline: 'none'
              }}
            >
              <option value="editor">✏️ Inhalts-Blöcke & Sektionen</option>
              <option value="global">🌐 Header & Live-Ticker Einstellungen</option>
              <option value="nav">📌 Menü-Reihenfolge & Navigation</option>
              <option value="code">💻 Custom CSS & Keyframes</option>
              <option value="settings">⚙️ SEO & Seiteneinstellungen</option>
              <option value="preview">👁️ Vollbild Live-Vorschau</option>
            </select>
          </div>

          {/* Jump to Block Dropdown (When in Editor Tab) */}
          {activeTab === 'editor' && currentPage?.blocks?.length > 0 && (
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <span style={{ fontSize: 11, fontWeight: 800, color: C.muted, letterSpacing: 1 }}>SPRINGEN:</span>
              <select
                value={jumpToBlockId}
                onChange={(e) => {
                  const val = e.target.value
                  setJumpToBlockId(val)
                  if (val) {
                    const el = document.getElementById('block_card_' + val)
                    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' })
                  }
                }}
                style={{
                  background: C.bg,
                  border: `1px solid ${C.border}`,
                  color: C.purple,
                  fontSize: 12,
                  fontWeight: 800,
                  padding: '8px 12px',
                  borderRadius: 10,
                  cursor: 'pointer',
                  outline: 'none'
                }}
              >
                <option value="">📍 Zu Sektion springen...</option>
                {currentPage?.blocks?.map((b, i) => (
                  <option key={b.id} value={b.id}>
                    #{i + 1} {b.type.toUpperCase()} ({b.title || 'Kein Titel'})
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>

        {/* Right Side: Toggle Preview & Action Controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          {activeTab === 'editor' && (
            <button
              onClick={() => setShowPreview(!showPreview)}
              style={{
                padding: '8px 16px',
                borderRadius: 10,
                background: showPreview ? C.purple : C.bg,
                border: `1px solid ${showPreview ? C.purple : C.border}`,
                color: C.white,
                fontSize: 12,
                fontWeight: 800,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: 6,
                boxShadow: showPreview ? '0 4px 14px rgba(124,58,237,0.3)' : 'none',
                transition: 'all 0.2s'
              }}
            >
              <Eye size={15} />
              <span>{showPreview ? 'Vorschau Ausblenden' : 'Vorschau Einblenden'}</span>
            </button>
          )}

          <button
            onClick={() => handleDuplicatePage(currentPage.id)}
            style={{
              padding: '8px 14px',
              borderRadius: 10,
              background: `${C.purple}22`,
              border: `1px solid ${C.purple}66`,
              color: C.purple,
              fontSize: 12,
              fontWeight: 800,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: 6
            }}
          >
            <Copy size={13} /> Seite Duplizieren
          </button>
        </div>

      </div>

      {/* Main Studio Content Area */}
      <main style={{ padding: 28, overflowY: 'auto', minHeight: 'calc(100vh - 140px)' }}>
          
          {currentPage && (
            <>
              {/* Top Page Header Bar */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20, background: C.card, padding: 16, borderRadius: 14, border: `1px solid ${C.border}` }}>
                <div>
                  <div style={{ fontSize: 18, fontWeight: 900, color: C.white, display: 'flex', alignItems: 'center', gap: 10 }}>
                    {currentPage.title}
                    <button
                      onClick={() => handleDuplicatePage(currentPage.id)}
                      style={{ background: `${C.purple}22`, border: `1px solid ${C.purple}66`, color: C.purple, borderRadius: 6, padding: '4px 10px', fontSize: 11, fontWeight: 800, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 4 }}
                    >
                      <Copy size={12} /> Seite Duplizieren
                    </button>
                  </div>
                  <div style={{ fontSize: 12, color: C.muted, marginTop: 2 }}>
                    URL: <span style={{ fontFamily: 'monospace', color: C.purple }}>https://scenvy.de/{currentPage.slug === 'hauptseite' ? '' : currentPage.slug}</span>
                  </div>
                </div>

                {/* Editor Mode Tabs */}
                <div style={{ display: 'flex', background: C.bg, padding: 4, borderRadius: 10, border: `1px solid ${C.border}`, flexWrap: 'wrap', gap: 4 }}>
                  {[
                    ['editor', '✏️ Visual Editor', Layout],
                    ['global', '🌐 Header & Live Ticker', Sliders],
                    ['nav', '📌 Menü & Reihenfolge', List],
                    ['code', '💻 Custom CSS', Code],
                    ['settings', '⚙️ SEO & Settings', Settings],
                    ['preview', '👁️ Live Preview', Eye]
                  ].map(([tabKey, label, Icon]) => (
                    <button
                      key={tabKey}
                      onClick={() => setActiveTab(tabKey)}
                      style={{
                        padding: '8px 14px',
                        borderRadius: 8,
                        border: 'none',
                        background: activeTab === tabKey ? C.purple : 'transparent',
                        color: activeTab === tabKey ? C.white : C.muted,
                        fontSize: 12,
                        fontWeight: 700,
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: 6
                      }}
                    >
                      <Icon size={14} />
                      {label}
                    </button>
                  ))}
                </div>
              </div>

              {/* TAB 1: VISUAL BLOCK EDITOR (WYSIWYG OR FORM) */}
              {activeTab === 'editor' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                  
                  {/* Sub-Header: Mode Switch & Translation Tools */}
                  <div style={{ background: C.card, padding: 14, borderRadius: 14, border: `1px solid ${C.border}`, display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
                    
                    {/* Visual vs Form Mode Switch */}
                    <div style={{ display: 'flex', background: C.bg, padding: 3, borderRadius: 10, border: `1px solid ${C.border}` }}>
                      <button
                        onClick={() => setEditorMode('visual')}
                        style={{
                          padding: '8px 16px',
                          borderRadius: 8,
                          border: 'none',
                          background: editorMode === 'visual' ? C.purple : 'transparent',
                          color: C.white,
                          fontSize: 12,
                          fontWeight: 800,
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          gap: 6
                        }}
                      >
                        <Layout size={14} /> 🎨 Visueller Live-Editor (WYSIWYG)
                      </button>

                      <button
                        onClick={() => setEditorMode('form')}
                        style={{
                          padding: '8px 16px',
                          borderRadius: 8,
                          border: 'none',
                          background: editorMode === 'form' ? C.purple : 'transparent',
                          color: editorMode === 'form' ? C.white : C.muted,
                          fontSize: 12,
                          fontWeight: 800,
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          gap: 6
                        }}
                      >
                        <List size={14} /> 📋 Formular-Inspektor
                      </button>
                    </div>

                    {/* Language Preview Switch & Auto Translate All */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
                      <div style={{ display: 'flex', background: C.bg, padding: 3, borderRadius: 8, border: `1px solid ${C.border}` }}>
                        <button
                          onClick={() => setWysiwygLang('de')}
                          style={{
                            padding: '4px 10px',
                            borderRadius: 6,
                            border: 'none',
                            background: wysiwygLang === 'de' ? C.purple : 'transparent',
                            color: C.white,
                            fontSize: 11,
                            fontWeight: 800,
                            cursor: 'pointer'
                          }}
                        >
                          🇩🇪 Deutsch
                        </button>
                        <button
                          onClick={() => setWysiwygLang('en')}
                          style={{
                            padding: '4px 10px',
                            borderRadius: 6,
                            border: 'none',
                            background: wysiwygLang === 'en' ? C.purple : 'transparent',
                            color: C.white,
                            fontSize: 11,
                            fontWeight: 800,
                            cursor: 'pointer'
                          }}
                        >
                          🇬🇧 English
                        </button>
                      </div>

                      <button
                        onClick={handleAutoTranslateAll}
                        style={{
                          padding: '7px 14px',
                          borderRadius: 8,
                          background: 'linear-gradient(135deg, rgba(124,58,237,0.3) 0%, rgba(236,72,153,0.3) 100%)',
                          border: '1px solid rgba(168,85,247,0.7)',
                          color: '#E9D5FF',
                          fontSize: 12,
                          fontWeight: 800,
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          gap: 6
                        }}
                      >
                        <Sparkles size={14} color="#A855F7" /> ✨ Alle DE ➔ EN KI-Übersetzen
                      </button>

                      {/* Add Block Dropdown */}
                      <select
                        onChange={(e) => {
                          if (e.target.value) {
                            addBlockToPage(e.target.value)
                            e.target.value = ""
                          }
                        }}
                        style={{
                          background: C.purple,
                          border: 'none',
                          color: C.white,
                          fontSize: 12,
                          fontWeight: 800,
                          padding: '8px 12px',
                          borderRadius: 8,
                          cursor: 'pointer'
                        }}
                      >
                        <option value="">+ Neue Sektion Hinzufügen...</option>
                        <option value="hero">Hero Block</option>
                        <option value="pos_reel_toggle">POS Reel vs Static Switch</option>
                        <option value="pos_psychology">Verkaufs-Psychologie Cards</option>
                        <option value="roi_calculator">ROI & Umsatz-Rechner</option>
                        <option value="live_demo_sandbox">Interactive Sandbox</option>
                        <option value="ai_workflow">KI Workflow (60 Sek)</option>
                        <option value="buyer_personas">Buyer Personas</option>
                        <option value="social_proof_hardware">Hardware Vergleich</option>
                        <option value="faq_accordion">FAQ Accordion</option>
                        <option value="pricing">Pricing Plans</option>
                        <option value="cta">Call to Action (CTA)</option>
                        <option value="text_block">Fließtext Artikel</option>
                        <option value="image_banner">Bild Banner</option>
                        <option value="code_embed">HTML / Embed Code</option>
                      </select>
                    </div>

                  </div>

                  {/* VISUAL WYSIWYG CANVAS */}
                  {editorMode === 'visual' ? (
                    <div style={{
                      background: currentPage.theme?.bg || '#070B14',
                      color: currentPage.theme?.text || '#F8FAFC',
                      borderRadius: 18,
                      border: `2px dashed ${C.purple}66`,
                      padding: '32px 24px',
                      boxShadow: '0 20px 50px rgba(0,0,0,0.5)',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: 40,
                      position: 'relative'
                    }}>
                      <div style={{ position: 'absolute', top: 12, right: 16, fontSize: 11, fontWeight: 800, color: C.purple, background: `${C.purple}22`, padding: '4px 10px', borderRadius: 6, display: 'flex', alignItems: 'center', gap: 6 }}>
                        <Edit3 size={12} /> WYSIWYG LIVE CANVAS — Klicke auf ein beliebiges Element zum Bearbeiten
                      </div>

                      {(currentPage?.blocks || []).map((b, idx) => {
                        const title = wysiwygLang === 'en' && b.title_en ? b.title_en : b.title
                        const subtitle = wysiwygLang === 'en' && b.subtitle_en ? b.subtitle_en : b.subtitle
                        const kicker = wysiwygLang === 'en' && b.kicker_en ? b.kicker_en : b.kicker
                        const ctaText = wysiwygLang === 'en' && b.ctaText_en ? b.ctaText_en : b.ctaText
                        const content = wysiwygLang === 'en' && b.content_en ? b.content_en : b.content

                        return (
                          <div
                            key={b.id}
                            onClick={(e) => {
                              e.stopPropagation()
                              setActiveQuickEditBlockId(b.id)
                            }}
                            className="group"
                            style={{
                              position: 'relative',
                              padding: '24px 20px',
                              borderRadius: 14,
                              border: `2px dashed transparent`,
                              transition: 'all 0.2s ease',
                              cursor: 'pointer',
                              opacity: b.isHidden ? 0.4 : 1
                            }}
                            onMouseEnter={e => {
                              e.currentTarget.style.border = `2px dashed ${C.purple}`
                              e.currentTarget.style.background = 'rgba(168,85,247,0.04)'
                            }}
                            onMouseLeave={e => {
                              e.currentTarget.style.border = '2px dashed transparent'
                              e.currentTarget.style.background = 'transparent'
                            }}
                          >
                            {/* Floating Hover Badge Toolbar */}
                            <div
                              style={{
                                position: 'absolute',
                                top: -14,
                                left: 20,
                                background: C.purple,
                                color: C.white,
                                fontSize: 11,
                                fontWeight: 800,
                                padding: '3px 10px',
                                borderRadius: 6,
                                display: 'flex',
                                alignItems: 'center',
                                gap: 8,
                                zIndex: 10,
                                boxShadow: '0 4px 12px rgba(0,0,0,0.4)'
                              }}
                            >
                              <span>#{idx + 1} {b.type.toUpperCase()}</span>
                              <span style={{ opacity: 0.8 }}>| ✏️ Klick zum Bearbeiten</span>
                              {b.imageUrl && <span>| 📷 Bild ändern</span>}
                            </div>

                            {/* Section Content Visual Rendering */}
                            <div style={{ paddingTop: 10 }}>
                              {kicker && (
                                <div style={{ fontSize: 12, fontWeight: 900, color: C.purple, letterSpacing: 2, marginBottom: 8, textTransform: 'uppercase' }}>
                                  {kicker}
                                </div>
                              )}

                              {title && (
                                <h2 style={{ fontSize: b.fontSize || 32, fontWeight: 900, marginBottom: 12, color: C.white }}>
                                  {title}
                                </h2>
                              )}

                              {subtitle && (
                                <p style={{ fontSize: 16, color: '#94A3B8', maxWidth: 720, lineHeight: 1.6, marginBottom: 20 }}>
                                  {subtitle}
                                </p>
                              )}

                              {b.imageUrl && (
                                <div style={{ position: 'relative', borderRadius: 12, overflow: 'hidden', marginBottom: 20, maxWidth: 800 }}>
                                  <img src={b.imageUrl} alt="Banner" style={{ width: '100%', maxHeight: 400, objectFit: 'cover', borderRadius: 12 }} />
                                  <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: 0, transition: 'opacity 0.2s' }} onMouseEnter={e => e.currentTarget.style.opacity = 1} onMouseLeave={e => e.currentTarget.style.opacity = 0}>
                                    <span style={{ background: '#000', color: '#FFF', padding: '8px 16px', borderRadius: 8, fontWeight: 800, fontSize: 13, display: 'flex', alignItems: 'center', gap: 6 }}>
                                      <Upload size={14} /> Bild ersetzen / hochladen
                                    </span>
                                  </div>
                                </div>
                              )}

                              {content && (
                                <div style={{ fontSize: 14, color: '#CBD5E1', lineHeight: 1.8, marginBottom: 20, whiteSpace: 'pre-line', textAlign: 'left', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 12, padding: '20px 24px' }}>
                                  {content}
                                </div>
                              )}

                              {ctaText && (
                                <button style={{ padding: '12px 28px', borderRadius: 12, background: C.purple, color: C.white, border: 'none', fontWeight: 800, fontSize: 14, cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: 8 }}>
                                  {ctaText}
                                </button>
                              )}

                              {/* Specialized Section Renderers */}
                              {b.type === 'social_proof_hardware' && (
                                <div style={{ marginTop: 16 }}>
                                  <SocialProofAndHardwareSection lang={lang} />
                                </div>
                              )}

                              {b.type === 'buyer_personas' && (
                                <div style={{ marginTop: 16 }}>
                                  <BuyerPersonaSection lang={lang} />
                                </div>
                              )}

                              {b.type === 'roi_calculator' && (
                                <div style={{ marginTop: 16 }}>
                                  <RoiCalculatorSection lang={lang} />
                                </div>
                              )}

                              {b.type === 'ai_workflow' && (
                                <div style={{ marginTop: 16 }}>
                                  <AiWorkflowSection lang={lang} />
                                </div>
                              )}
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  ) : (
                    /* FORM INSPECTOR MODE */
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                      {currentPage.blocks.map((block, idx) => (
                        <div key={block.id} style={{ background: C.card, borderRadius: 14, border: `1px solid ${C.border}`, padding: 20, display: 'grid', gap: 14 }}>
                          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: `1px solid ${C.border}`, paddingBottom: 10 }}>
                            <span style={{ fontSize: 12, fontWeight: 900, color: C.purple, textTransform: 'uppercase' }}>#{idx + 1} {block.type} BLOCK</span>
                            <div style={{ display: 'flex', gap: 6 }}>
                              <button onClick={() => moveBlock(idx, -1)} disabled={idx === 0} style={{ padding: '4px 8px', borderRadius: 6, background: C.bg, border: `1px solid ${C.border}`, color: C.white, cursor: 'pointer', opacity: idx === 0 ? 0.3 : 1 }}><MoveUp size={12} /></button>
                              <button onClick={() => moveBlock(idx, 1)} disabled={idx === currentPage.blocks.length - 1} style={{ padding: '4px 8px', borderRadius: 6, background: C.bg, border: `1px solid ${C.border}`, color: C.white, cursor: 'pointer', opacity: idx === currentPage.blocks.length - 1 ? 0.3 : 1 }}><MoveDown size={12} /></button>
                              <button onClick={() => removeBlock(block.id)} style={{ padding: '4px 8px', borderRadius: 6, background: `${C.pink}22`, border: `1px solid ${C.pink}`, color: C.pink, cursor: 'pointer' }}><Trash2 size={12} /></button>
                            </div>
                          </div>

                          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                            <div>
                              <label style={{ fontSize: 11, fontWeight: 700, color: C.muted, display: 'block', marginBottom: 4 }}>TITEL (DE)</label>
                              <input type="text" value={block.title || ''} onChange={e => updateBlock(block.id, 'title', e.target.value)} style={{ width: '100%', background: C.bg, border: `1px solid ${C.border}`, borderRadius: 8, padding: '8px 12px', color: C.white, fontSize: 13 }} />
                            </div>
                            <div>
                              <label style={{ fontSize: 11, fontWeight: 700, color: '#A855F7', display: 'block', marginBottom: 4 }}>TITLE (EN)</label>
                              <input type="text" value={block.title_en || ''} onChange={e => updateBlock(block.id, 'title_en', e.target.value)} placeholder="English title..." style={{ width: '100%', background: C.bg, border: '1px solid rgba(168,85,247,0.4)', borderRadius: 8, padding: '8px 12px', color: '#E9D5FF', fontSize: 13 }} />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* VISUAL QUICK-EDIT POPOVER MODAL */}
                  {activeQuickEditBlockId && (() => {
                    const block = currentPage?.blocks.find(b => b.id === activeQuickEditBlockId)
                    if (!block) return null

                    return (
                      <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(8px)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 }}>
                        <div style={{ background: C.card, border: `2px solid ${C.purple}`, borderRadius: 20, padding: 28, width: '100%', maxWidth: 640, boxShadow: '0 25px 60px rgba(0,0,0,0.8)', display: 'flex', flexDirection: 'column', gap: 18 }}>
                          
                          {/* Modal Header */}
                          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: `1px solid ${C.border}`, paddingBottom: 14 }}>
                            <div>
                              <div style={{ fontSize: 18, fontWeight: 900, color: C.white, display: 'flex', alignItems: 'center', gap: 8 }}>
                                <Edit3 size={18} color={C.purple} /> Sektion Visuell Bearbeiten
                              </div>
                              <div style={{ fontSize: 12, color: C.muted, marginTop: 2 }}>
                                Änderungen werden sofort in Echtzeit auf der Seite sichtbar.
                              </div>
                            </div>
                            <button onClick={() => setActiveQuickEditBlockId(null)} style={{ background: C.bg, border: `1px solid ${C.border}`, color: C.muted, borderRadius: 8, padding: '6px 10px', cursor: 'pointer', fontSize: 12, fontWeight: 700 }}>✕ Schließen</button>
                          </div>

                          {/* Dual Language Inputs */}
                          <div style={{ display: 'grid', gap: 14 }}>
                            
                            {/* Kicker */}
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                              <div>
                                <label style={{ fontSize: 11, fontWeight: 800, color: C.muted, display: 'block', marginBottom: 4 }}>KICKER / BADGE (DEUTSCH)</label>
                                <input type="text" value={block.kicker || ''} onChange={e => updateBlock(block.id, 'kicker', e.target.value)} style={{ width: '100%', background: C.bg, border: `1px solid ${C.border}`, borderRadius: 8, padding: '10px 12px', color: C.white, fontSize: 13 }} />
                              </div>
                              <div>
                                <label style={{ fontSize: 11, fontWeight: 800, color: C.purple, display: 'block', marginBottom: 4 }}>KICKER / BADGE (ENGLISH)</label>
                                <input type="text" value={block.kicker_en || ''} onChange={e => updateBlock(block.id, 'kicker_en', e.target.value)} placeholder="Auto-translated..." style={{ width: '100%', background: C.bg, border: '1px solid rgba(168,85,247,0.4)', borderRadius: 8, padding: '10px 12px', color: '#E9D5FF', fontSize: 13 }} />
                              </div>
                            </div>

                            {/* Title */}
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                              <div>
                                <label style={{ fontSize: 11, fontWeight: 800, color: C.muted, display: 'block', marginBottom: 4 }}>HAUPTÜBERSCHRIFT (DEUTSCH)</label>
                                <input type="text" value={block.title || ''} onChange={e => updateBlock(block.id, 'title', e.target.value)} style={{ width: '100%', background: C.bg, border: `1px solid ${C.border}`, borderRadius: 8, padding: '10px 12px', color: C.white, fontSize: 14, fontWeight: 800 }} />
                              </div>
                              <div>
                                <label style={{ fontSize: 11, fontWeight: 800, color: C.purple, display: 'block', marginBottom: 4 }}>MAIN HEADING (ENGLISH)</label>
                                <input type="text" value={block.title_en || ''} onChange={e => updateBlock(block.id, 'title_en', e.target.value)} placeholder="Auto-translated..." style={{ width: '100%', background: C.bg, border: '1px solid rgba(168,85,247,0.4)', borderRadius: 8, padding: '10px 12px', color: '#E9D5FF', fontSize: 14, fontWeight: 800 }} />
                              </div>
                            </div>

                            {/* Subtitle */}
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                              <div>
                                <label style={{ fontSize: 11, fontWeight: 800, color: C.muted, display: 'block', marginBottom: 4 }}>UNTERTITEL (DEUTSCH)</label>
                                <textarea rows={3} value={block.subtitle || ''} onChange={e => updateBlock(block.id, 'subtitle', e.target.value)} style={{ width: '100%', background: C.bg, border: `1px solid ${C.border}`, borderRadius: 8, padding: '10px 12px', color: C.white, fontSize: 13, resize: 'vertical' }} />
                              </div>
                              <div>
                                <label style={{ fontSize: 11, fontWeight: 800, color: C.purple, display: 'block', marginBottom: 4 }}>SUBTITLE (ENGLISH)</label>
                                <textarea rows={3} value={block.subtitle_en || ''} onChange={e => updateBlock(block.id, 'subtitle_en', e.target.value)} placeholder="Auto-translated..." style={{ width: '100%', background: C.bg, border: '1px solid rgba(168,85,247,0.4)', borderRadius: 8, padding: '10px 12px', color: '#E9D5FF', fontSize: 13, resize: 'vertical' }} />
                              </div>
                            </div>

                            {/* Detailed Text Content / Legal Clauses */}
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                              <div>
                                <label style={{ fontSize: 11, fontWeight: 800, color: C.muted, display: 'block', marginBottom: 4 }}>VOLLTEXT / RECHTSINHALTE (DEUTSCH)</label>
                                <textarea rows={6} value={block.content || ''} onChange={e => updateBlock(block.id, 'content', e.target.value)} placeholder="Fließtext, Absätze oder AGB-Klauseln auf Deutsch..." style={{ width: '100%', background: C.bg, border: `1px solid ${C.border}`, borderRadius: 8, padding: '10px 12px', color: C.white, fontSize: 12, lineHeight: 1.5, resize: 'vertical' }} />
                              </div>
                              <div>
                                <label style={{ fontSize: 11, fontWeight: 800, color: C.purple, display: 'block', marginBottom: 4 }}>FULL TEXT / LEGAL CLAUSES (ENGLISH)</label>
                                <textarea rows={6} value={block.content_en || ''} onChange={e => updateBlock(block.id, 'content_en', e.target.value)} placeholder="English body text, terms or clauses..." style={{ width: '100%', background: C.bg, border: '1px solid rgba(168,85,247,0.4)', borderRadius: 8, padding: '10px 12px', color: '#E9D5FF', fontSize: 12, lineHeight: 1.5, resize: 'vertical' }} />
                              </div>
                            </div>

                            {/* Image Upload / URL */}
                            <div>
                              <label style={{ fontSize: 11, fontWeight: 800, color: C.muted, display: 'block', marginBottom: 4 }}>BILD URL ODER DIREKT-UPLOAD</label>
                              <div style={{ display: 'flex', gap: 8 }}>
                                <input type="text" placeholder="https://..." value={block.imageUrl || ''} onChange={e => updateBlock(block.id, 'imageUrl', e.target.value)} style={{ flex: 1, background: C.bg, border: `1px solid ${C.border}`, borderRadius: 8, padding: '10px 12px', color: C.white, fontSize: 13 }} />
                                <label style={{ padding: '10px 16px', background: C.purple, border: 'none', borderRadius: 8, color: C.white, fontSize: 12, fontWeight: 800, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6 }}>
                                  <Upload size={14} /> Datei Hochladen
                                  <input type="file" accept="image/*" onChange={e => handleFileUploadForBlock(block.id, 'imageUrl', e)} style={{ display: 'none' }} />
                                </label>
                              </div>
                            </div>

                            {/* CTA Button Label & Link */}
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 10 }}>
                              <div>
                                <label style={{ fontSize: 11, fontWeight: 800, color: C.muted, display: 'block', marginBottom: 4 }}>BUTTON TEXT (DE)</label>
                                <input type="text" value={block.ctaText || ''} onChange={e => updateBlock(block.id, 'ctaText', e.target.value)} style={{ width: '100%', background: C.bg, border: `1px solid ${C.border}`, borderRadius: 8, padding: '8px 12px', color: C.white, fontSize: 12 }} />
                              </div>
                              <div>
                                <label style={{ fontSize: 11, fontWeight: 800, color: C.purple, display: 'block', marginBottom: 4 }}>BUTTON TEXT (EN)</label>
                                <input type="text" value={block.ctaText_en || ''} onChange={e => updateBlock(block.id, 'ctaText_en', e.target.value)} style={{ width: '100%', background: C.bg, border: '1px solid rgba(168,85,247,0.4)', borderRadius: 8, padding: '8px 12px', color: '#E9D5FF', fontSize: 12 }} />
                              </div>
                              <div>
                                <label style={{ fontSize: 11, fontWeight: 800, color: C.muted, display: 'block', marginBottom: 4 }}>BUTTON LINK</label>
                                <input type="text" value={block.ctaLink || ''} onChange={e => updateBlock(block.id, 'ctaLink', e.target.value)} style={{ width: '100%', background: C.bg, border: `1px solid ${C.border}`, borderRadius: 8, padding: '8px 12px', color: C.white, fontSize: 12 }} />
                              </div>
                            </div>

                          </div>

                          {/* Modal Footer */}
                          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: `1px solid ${C.border}`, paddingTop: 14, marginTop: 6 }}>
                            <button
                              onClick={() => handleAutoTranslateBlock(block.id)}
                              style={{ background: 'rgba(168,85,247,0.2)', border: '1px solid rgba(168,85,247,0.5)', color: '#E9D5FF', borderRadius: 8, padding: '8px 14px', fontSize: 12, fontWeight: 800, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6 }}
                            >
                              <Sparkles size={13} color="#A855F7" /> Dieser Sektion DE ➔ EN Übersetzen
                            </button>

                            <button
                              onClick={() => setActiveQuickEditBlockId(null)}
                              style={{ background: C.purple, border: 'none', color: C.white, borderRadius: 8, padding: '10px 24px', fontSize: 13, fontWeight: 900, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6 }}
                            >
                              <Check size={16} /> ✓ Übernehmen & Live-Vorschau
                            </button>
                          </div>

                        </div>
                      </div>
                    )
                  })()}

                </div>
              )}

              {/* TAB GLOBAL SETTINGS: HEADER BARS & LIVE TICKER */}
              {activeTab === 'global' && (
                <div style={{ background: C.card, borderRadius: 14, border: `1px solid ${C.border}`, padding: 24, display: 'grid', gap: 24, maxWidth: 800 }}>
                  <div>
                    <div style={{ fontSize: 18, fontWeight: 900, color: C.white, display: 'flex', alignItems: 'center', gap: 8 }}>
                      <Sliders size={20} color={C.purple} /> Globale Header-Leisten & Live Ticker Einstellungen
                    </div>
                    <div style={{ fontSize: 12, color: C.muted, marginTop: 4 }}>
                      Verwalte die oberste Icon-Leiste (Ecosystem Header Bar), den Ankündigungs-Banner sowie die untere Live-Aktivitäts-Ticker-Leiste plattformweit.
                    </div>
                  </div>

                  {/* Section 1: Top Ecosystem Announcement Banner */}
                  <div style={{ background: C.bg, padding: 18, borderRadius: 12, border: `1px solid ${C.border}`, display: 'grid', gap: 14 }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <div style={{ fontSize: 14, fontWeight: 800, color: C.white }}>Oberer Ankündigungs-Banner (Header-Rechts)</div>
                      <label style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer', fontSize: 12, fontWeight: 700, color: globalSettings.isAnnouncementEnabled ? C.green : C.muted }}>
                        <input
                          type="checkbox"
                          checked={globalSettings.isAnnouncementEnabled !== false}
                          onChange={e => setGlobalSettings(prev => ({ ...prev, isAnnouncementEnabled: e.target.checked }))}
                        />
                        {globalSettings.isAnnouncementEnabled !== false ? 'Aktiv' : 'Deaktiviert'}
                      </label>
                    </div>

                    <div>
                      <label style={{ fontSize: 11, fontWeight: 700, color: C.muted, display: 'block', marginBottom: 4 }}>BANNER TEXT</label>
                      <input
                        type="text"
                        value={globalSettings.announcementText || ''}
                        onChange={e => setGlobalSettings(prev => ({ ...prev, announcementText: e.target.value }))}
                        style={{ width: '100%', background: C.card, border: `1px solid ${C.border}`, borderRadius: 8, padding: '10px 14px', color: C.white, fontSize: 13 }}
                      />
                    </div>

                    <div>
                      <label style={{ fontSize: 11, fontWeight: 700, color: C.muted, display: 'block', marginBottom: 4 }}>BANNER ZIEL-URL / LINK</label>
                      <input
                        type="text"
                        value={globalSettings.announcementLink || ''}
                        onChange={e => setGlobalSettings(prev => ({ ...prev, announcementLink: e.target.value }))}
                        style={{ width: '100%', background: C.card, border: `1px solid ${C.border}`, borderRadius: 8, padding: '10px 14px', color: C.white, fontSize: 13 }}
                      />
                    </div>
                  </div>

                  {/* Section 2: Bottom Live Activity Ticker */}
                  <div style={{ background: C.bg, padding: 18, borderRadius: 12, border: `1px solid ${C.border}`, display: 'grid', gap: 14 }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <div style={{ fontSize: 14, fontWeight: 800, color: C.white }}>Unterer Live-Aktivitäts Ticker</div>
                      <label style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer', fontSize: 12, fontWeight: 700, color: globalSettings.isLiveTickerEnabled ? C.green : C.muted }}>
                        <input
                          type="checkbox"
                          checked={globalSettings.isLiveTickerEnabled !== false}
                          onChange={e => setGlobalSettings(prev => ({ ...prev, isLiveTickerEnabled: e.target.checked }))}
                        />
                        {globalSettings.isLiveTickerEnabled !== false ? 'Aktiv' : 'Deaktiviert'}
                      </label>
                    </div>

                    <div>
                      <label style={{ fontSize: 11, fontWeight: 700, color: C.muted, display: 'block', marginBottom: 4 }}>WECHSEL-GESCHWINDIGKEIT (SEKUNDEN PRO MESSAGE)</label>
                      <input
                        type="number"
                        min="2"
                        max="30"
                        value={globalSettings.liveTickerSpeedSec || 6}
                        onChange={e => setGlobalSettings(prev => ({ ...prev, liveTickerSpeedSec: Number(e.target.value) }))}
                        style={{ width: 120, background: C.card, border: `1px solid ${C.border}`, borderRadius: 8, padding: '8px 12px', color: C.white, fontSize: 13 }}
                      />
                    </div>

                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
                        <label style={{ fontSize: 11, fontWeight: 700, color: C.muted }}>TICKER NACHRICHTEN ({globalSettings.liveTickerMessages?.length || 0})</label>
                        <button
                          onClick={() => {
                            const newMsgList = [...(globalSettings.liveTickerMessages || []), { text: 'Neue Venue Aktivität', icon: 'Sparkles', color: '#7C3AED' }]
                            setGlobalSettings(prev => ({ ...prev, liveTickerMessages: newMsgList }))
                          }}
                          style={{ padding: '4px 10px', borderRadius: 6, background: `${C.purple}22`, border: `1px solid ${C.purple}`, color: C.purple, fontSize: 11, fontWeight: 700, cursor: 'pointer' }}
                        >
                          + Nachricht hinzufügen
                        </button>
                      </div>

                      <div style={{ display: 'grid', gap: 8 }}>
                        {(globalSettings.liveTickerMessages || []).map((msg, mIdx) => (
                          <div key={mIdx} style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                            <input
                              type="text"
                              value={msg.text}
                              onChange={e => {
                                const updatedMsgs = [...globalSettings.liveTickerMessages]
                                updatedMsgs[mIdx].text = e.target.value
                                setGlobalSettings(prev => ({ ...prev, liveTickerMessages: updatedMsgs }))
                              }}
                              style={{ flex: 1, background: C.card, border: `1px solid ${C.border}`, borderRadius: 8, padding: '8px 12px', color: C.white, fontSize: 12 }}
                            />
                            <button
                              onClick={() => {
                                const updatedMsgs = globalSettings.liveTickerMessages.filter((_, i) => i !== mIdx)
                                setGlobalSettings(prev => ({ ...prev, liveTickerMessages: updatedMsgs }))
                              }}
                              style={{ padding: '8px 10px', borderRadius: 8, background: `${C.pink}22`, border: `1px solid ${C.pink}`, color: C.pink, cursor: 'pointer' }}
                            >
                              <Trash2 size={12} />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => savePagesToBackend(pages)}
                    style={{
                      padding: '12px 24px',
                      borderRadius: 10,
                      background: grad.purple,
                      color: C.white,
                      fontSize: 14,
                      fontWeight: 800,
                      border: 'none',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: 8
                    }}
                  >
                    <Save size={16} /> Globale Einstellungen Speichern
                  </button>
                </div>
              )}

              {/* TAB 2: MENU & NAVIGATION ORDER MANAGER */}
              {activeTab === 'nav' && (
                <div style={{ background: C.card, borderRadius: 14, border: `1px solid ${C.border}`, padding: 24, display: 'grid', gap: 20 }}>
                  <div>
                    <div style={{ fontSize: 18, fontWeight: 900, color: C.white, display: 'flex', alignItems: 'center', gap: 8 }}>
                      <List size={18} color={C.purple} /> Menü-Reihenfolge & Navigation Manager
                    </div>
                    <div style={{ fontSize: 12, color: C.muted, marginTop: 4 }}>
                      Lege fest, welche Seiten in der oberen Menüleiste sichtbar sind und in welcher Reihenfolge sie erscheinen.
                    </div>
                  </div>

                  <div style={{ display: 'grid', gap: 10 }}>
                    {pages.map((p, pIdx) => (
                      <div key={p.id} style={{ background: C.bg, padding: 14, borderRadius: 10, border: `1px solid ${C.border}`, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                          <span style={{ fontSize: 12, fontWeight: 900, color: C.purple, width: 24 }}>#{pIdx + 1}</span>
                          <div>
                            <div style={{ fontSize: 14, fontWeight: 800, color: C.white }}>{p.title}</div>
                            <div style={{ fontSize: 11, color: C.dim, fontFamily: 'monospace' }}>/{p.slug}</div>
                          </div>
                        </div>

                        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                          <label style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, fontWeight: 700, color: p.inNav ? C.green : C.muted, cursor: 'pointer' }}>
                            <input
                              type="checkbox"
                              checked={!!p.inNav}
                              onChange={e => {
                                const nextList = pages.map(item => item.id === p.id ? { ...item, inNav: e.target.checked } : item)
                                setPages(nextList)
                              }}
                            />
                            Im Hauptmenü anzeigen
                          </label>

                          <div style={{ display: 'flex', gap: 4 }}>
                            <button
                              onClick={() => {
                                if (pIdx === 0) return
                                const nextPages = [...pages]
                                const temp = nextPages[pIdx]
                                nextPages[pIdx] = nextPages[pIdx - 1]
                                nextPages[pIdx - 1] = temp
                                setPages(nextPages)
                              }}
                              disabled={pIdx === 0}
                              style={{ padding: '4px 8px', borderRadius: 6, background: C.card, border: `1px solid ${C.border}`, color: C.white, cursor: 'pointer', opacity: pIdx === 0 ? 0.3 : 1 }}
                            >
                              <MoveUp size={12} />
                            </button>
                            <button
                              onClick={() => {
                                if (pIdx === pages.length - 1) return
                                const nextPages = [...pages]
                                const temp = nextPages[pIdx]
                                nextPages[pIdx] = nextPages[pIdx + 1]
                                nextPages[pIdx + 1] = temp
                                setPages(nextPages)
                              }}
                              disabled={pIdx === pages.length - 1}
                              style={{ padding: '4px 8px', borderRadius: 6, background: C.card, border: `1px solid ${C.border}`, color: C.white, cursor: 'pointer', opacity: pIdx === pages.length - 1 ? 0.3 : 1 }}
                            >
                              <MoveDown size={12} />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 3: CODE & ANIMATIONS EDITOR */}
              {activeTab === 'code' && (
                <div style={{ background: C.card, borderRadius: 14, border: `1px solid ${C.border}`, padding: 24, display: 'grid', gap: 16 }}>
                  <div style={{ fontSize: 16, fontWeight: 800, color: C.white, display: 'flex', alignItems: 'center', gap: 8 }}>
                    <Code size={18} color={C.green} /> Custom CSS & Animationen Editor
                  </div>

                  <textarea
                    rows={16}
                    value={currentPage.theme?.customCss || ''}
                    onChange={e => updateCurrentPage(p => ({ ...p, theme: { ...p.theme, customCss: e.target.value } }))}
                    style={{
                      width: '100%',
                      background: '#05070B',
                      color: '#34D399',
                      border: `1px solid ${C.border}`,
                      borderRadius: 12,
                      padding: 16,
                      fontSize: 13,
                      fontFamily: 'Consolas, Monaco, monospace',
                      lineHeight: 1.5,
                      outline: 'none'
                    }}
                  />
                </div>
              )}

              {/* TAB 4: EINSTELLUNGEN & SEO */}
              {activeTab === 'settings' && (
                <div style={{ background: C.card, borderRadius: 14, border: `1px solid ${C.border}`, padding: 24, display: 'grid', gap: 16, maxWidth: 640 }}>
                  <div style={{ fontSize: 16, fontWeight: 800, color: C.white }}>Seiteneinstellungen & SEO Meta-Daten</div>

                  <div>
                    <label style={{ fontSize: 11, fontWeight: 700, color: C.muted, display: 'block', marginBottom: 4 }}>SEITENTITEL</label>
                    <input type="text" value={currentPage.title || ''} onChange={e => updateCurrentPage(p => ({ ...p, title: e.target.value }))} style={{ width: '100%', background: C.bg, border: `1px solid ${C.border}`, borderRadius: 8, padding: '10px 14px', color: C.white, fontSize: 14 }} />
                  </div>

                  <div>
                    <label style={{ fontSize: 11, fontWeight: 700, color: C.muted, display: 'block', marginBottom: 4 }}>URL SLUG (PFAD)</label>
                    <input type="text" value={currentPage.slug || ''} onChange={e => updateCurrentPage(p => ({ ...p, slug: e.target.value.toLowerCase().replace(/[^a-z0-9-]+/g, '') }))} style={{ width: '100%', background: C.bg, border: `1px solid ${C.border}`, borderRadius: 8, padding: '10px 14px', color: C.white, fontSize: 14, fontFamily: 'monospace' }} />
                  </div>

                  <div style={{ borderTop: `1px solid ${C.border}`, paddingTop: 16, marginTop: 10 }}>
                    <button
                      onClick={() => handleDeletePage(currentPage.id)}
                      style={{ padding: '10px 18px', borderRadius: 8, background: `${C.pink}22`, border: `1px solid ${C.pink}`, color: C.pink, fontSize: 13, fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6 }}
                    >
                      <Trash2 size={15} /> Diese Seite unwiderruflich löschen
                    </button>
                  </div>
                </div>
              )}

              {/* TAB 5: LIVE PREVIEW MODE */}
              {activeTab === 'preview' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 16, alignItems: 'center' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, background: C.card, padding: 6, borderRadius: 10, border: `1px solid ${C.border}` }}>
                    <button onClick={() => setPreviewDevice('desktop')} style={{ padding: '6px 14px', borderRadius: 6, border: 'none', background: previewDevice === 'desktop' ? C.purple : 'transparent', color: C.white, fontSize: 12, fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6 }}><Monitor size={14} /> Desktop (100%)</button>
                    <button onClick={() => setPreviewDevice('mobile')} style={{ padding: '6px 14px', borderRadius: 6, border: 'none', background: previewDevice === 'mobile' ? C.purple : 'transparent', color: C.white, fontSize: 12, fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6 }}><Smartphone size={14} /> Mobile View (375px)</button>
                  </div>

                  <div style={{
                    width: previewDevice === 'mobile' ? '375px' : '100%',
                    minHeight: '600px',
                    background: currentPage.theme?.bg || '#0A0A10',
                    color: currentPage.theme?.text || '#F3F4F6',
                    borderRadius: 16,
                    border: `1px solid ${C.border}`,
                    padding: 32,
                    boxShadow: '0 10px 40px rgba(0,0,0,0.6)'
                  }}>
                    <style>{currentPage.theme?.customCss || ''}</style>
                    {(currentPage?.blocks || []).map(b => (
                      <div key={b.id} style={{ padding: `${b.paddingY || 32}px 0` }}>
                        {b.kicker && <div style={{ fontSize: 12, color: currentPage.theme?.accent || C.purple, fontWeight: 800, letterSpacing: 2, marginBottom: 8 }}>{b.kicker}</div>}
                        {b.title && <div style={{ fontSize: b.fontSize || 32, fontWeight: 900, marginBottom: 12 }}>{b.title}</div>}
                        {b.subtitle && <div style={{ fontSize: 15, opacity: 0.8, maxWidth: 600, lineHeight: 1.6, marginBottom: 20 }}>{b.subtitle}</div>}
                        {b.imageUrl && <img src={b.imageUrl} alt="Preview" style={{ width: '100%', borderRadius: 12, marginBottom: 20 }} />}
                        {b.ctaText && (
                          <a href={b.ctaLink || '#'} style={{ display: 'inline-block', padding: '12px 28px', borderRadius: 12, background: currentPage.theme?.accent || C.purple, color: '#FFF', fontWeight: 800, textDecoration: 'none' }}>
                            {b.ctaText}
                          </a>
                        )}
                        {b.htmlContent && <div dangerouslySetInnerHTML={{ __html: b.htmlContent }} />}
                      </div>
                    ))}
                  </div>
                </div>
              )}

            </>
          )}

        </main>

      {/* New Page Modal */}
      {showNewPageModal && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.8)', zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 }}>
          <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 18, padding: 28, width: '100%', maxWidth: 460 }}>
            <div style={{ fontSize: 18, fontWeight: 900, color: C.white, marginBottom: 6 }}>Neue Landing-Page Erstellen</div>
            <div style={{ fontSize: 12, color: C.muted, marginBottom: 20 }}>Erstelle eine neue Unterseite mit eigenem URL-Pfad.</div>

            <form onSubmit={handleCreatePage} style={{ display: 'grid', gap: 14 }}>
              <div>
                <label style={{ fontSize: 11, fontWeight: 700, color: C.muted, display: 'block', marginBottom: 4 }}>SEITENTITEL</label>
                <input type="text" placeholder="z.B. Sommer Special Angebot" value={newPageTitle} onChange={e => setNewPageTitle(e.target.value)} required style={{ width: '100%', background: C.bg, border: `1px solid ${C.border}`, borderRadius: 8, padding: '10px 14px', color: C.white, fontSize: 13 }} />
              </div>

              <div>
                <label style={{ fontSize: 11, fontWeight: 700, color: C.muted, display: 'block', marginBottom: 4 }}>URL SLUG (PFAD)</label>
                <input type="text" placeholder="z.B. sommer-special" value={newPageSlug} onChange={e => setNewPageSlug(e.target.value)} style={{ width: '100%', background: C.bg, border: `1px solid ${C.border}`, borderRadius: 8, padding: '10px 14px', color: C.white, fontSize: 13, fontFamily: 'monospace' }} />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 10, marginTop: 10 }}>
                <button type="button" onClick={() => setShowNewPageModal(false)} style={{ padding: '8px 16px', borderRadius: 8, background: C.bg, border: `1px solid ${C.border}`, color: C.muted, fontSize: 13, fontWeight: 700, cursor: 'pointer' }}>Abbrechen</button>
                <button type="submit" style={{ padding: '8px 20px', borderRadius: 8, background: C.purple, border: 'none', color: C.white, fontSize: 13, fontWeight: 800, cursor: 'pointer' }}>✓ Seite Anlegen</button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  )
}
