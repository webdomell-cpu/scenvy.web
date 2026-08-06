import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { C, grad } from '@/tokens'
import { useAuth } from '@/lib/AuthContext'
import { 
  Globe, Layout, Code, Sparkles, Plus, Save, Trash2, Eye, ExternalLink, 
  Settings, Type, Palette, MoveUp, MoveDown, Check, ArrowLeft, RefreshCw, 
  Sliders, Copy, Monitor, Smartphone, Layers, Play, Zap, FileText, CheckCircle, LogOut, User,
  Image as ImageIcon, Upload, List, AlignLeft, HelpCircle, Star, MessageSquare
} from 'lucide-react'
import { db } from '@/lib/firebase'
import { collection, doc, setDoc, getDocs, deleteDoc } from 'firebase/firestore'

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
        paddingY: 48
      },
      {
        id: 'b2',
        type: 'features',
        title: 'Was SCENVY einzigartig macht',
        subtitle: 'Ein System. Alle Werkzeuge für maximale Gäste-Interaktion.',
        fontSize: 24,
        paddingY: 36,
        items: [
          { title: 'Interactive Reels', desc: 'TikTok-artige Vollbild-Videos direkt im mobilen Web-Browser.' },
          { title: 'Live Happy Hour Push', desc: 'Spontane Deals in unter 60 Sekunden auf alle Gästebildschirme streamen.' },
          { title: 'KI Content Creator', desc: 'Generiere fesselnde Marketing-Reels per Knopfdruck mit KI.' }
        ]
      },
      {
        id: 'b3',
        type: 'cta',
        title: 'Bereit deinen Umsatz zu steigern?',
        subtitle: 'Über 2.000 Venues vertrauen bereits auf das SCENVY Ecosystem.',
        ctaText: 'Jetzt Standort Registrieren →',
        ctaLink: 'https://app.scenvy.de',
        fontSize: 28,
        paddingY: 40
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
        title: 'Datenschutzerklärung',
        subtitle: 'Verantwortlicher im Sinne der Datenschutz-Grundverordnung (DSGVO).',
        content: 'Wir nehmen den Schutz Ihrer persönlichen Daten sehr ernst. Personenbezogene Daten werden auf dieser Webseite nur im technisch notwendigen Umfang verarbeitet.',
        fontSize: 24,
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
        title: 'Allgemeine Geschäftsbedingungen',
        subtitle: 'Rechtliche Rahmenbedingungen für die Nutzung der SCENVY Plattform.',
        content: '§ 1 Geltungsbereich: Diese AGB gelten für alle Verträge zwischen SCENVY und Geschäftskunden zur Bereitstellung der Softwarelösungen SCENVY Board, Flow und Menu.',
        fontSize: 24,
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
        title: 'DSGVO & Data Privacy Standards',
        subtitle: '100% Hosted in der Europäischen Union.',
        content: 'Sämtliche Cloud-Infrastrukturen und Datenbanken von SCENVY befinden sich in nach ISO-27001 zertifizierten Rechenzentren innerhalb der EU.',
        fontSize: 24,
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
        title: 'Impressum',
        subtitle: 'Angaben gemäß § 5 DDG',
        content: 'SCENVY Digital Technologies GmbH\nVertreten durch die Geschäftsführung\nE-Mail: kontakt@scenvy.de\nWeb: https://scenvy.de',
        fontSize: 24,
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
  
  const [pages, setPages] = useState([])
  const [selectedPageId, setSelectedPageId] = useState(null)
  const [activeTab, setActiveTab] = useState('editor') // 'editor' | 'nav' | 'code' | 'settings' | 'preview'
  const [previewDevice, setPreviewDevice] = useState('desktop') // 'desktop' | 'mobile'
  const [isSaving, setIsSaving] = useState(false)
  const [notifyMsg, setNotifyMsg] = useState('')
  const [showNewPageModal, setShowNewPageModal] = useState(false)
  
  // Form for new page
  const [newPageTitle, setNewPageTitle] = useState('')
  const [newPageSlug, setNewPageSlug] = useState('')

  // Selected Page State
  const currentPage = pages.find(p => p.id === selectedPageId) || pages[0]

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
    } catch (e) {
      console.warn('Firestore fallback to local initial templates:', e)
      setPages(INITIAL_TEMPLATES)
      setSelectedPageId(INITIAL_TEMPLATES[0].id)
    }
  }

  const savePagesToBackend = async (updatedPagesList) => {
    setIsSaving(true)
    try {
      for (const p of updatedPagesList) {
        await setDoc(doc(db, 'custom_pages', p.id), {
          ...p,
          updatedAt: new Date().toISOString()
        })
      }
      triggerNotify('✅ Alle Webseiten & Landing-Pages erfolgreich im Backend gespeichert!')
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
      blocks: prev.blocks.map(b => b.id === blockId ? { ...b, [field]: value } : b)
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
    let newB = { id: 'b_' + Date.now(), type, fontSize: 24, paddingY: 32 }
    if (type === 'hero') {
      newB = { ...newB, kicker: 'NEUE SEKTION', title: 'Beeindruckender Titel', subtitle: 'Beschreibung der Aktion hier eingeben.', ctaText: 'Mehr Erfahren', ctaLink: '#' }
    } else if (type === 'text_block') {
      newB = { ...newB, title: 'Inhaltliche Überschrift', subtitle: 'Untertitel des Fließtextes', content: 'Dies ist ein bearbeitbarer Textabschnitt. Du kannst hier beliebig lange Beschreibungen, Erklärungen oder Artikel eingeben.' }
    } else if (type === 'image_banner') {
      newB = { ...newB, imageUrl: 'https://images.unsplash.com/photo-1551024506-0bccd828d307?w=1000&q=80', caption: 'Atmosphärisches Bild', altText: 'Banner Bild' }
    } else if (type === 'features') {
      newB = { ...newB, title: 'Unsere Highlights', subtitle: 'Drei starke Argumente', items: [{ title: 'Punkt 1', desc: 'Vorteil A' }, { title: 'Punkt 2', desc: 'Vorteil B' }] }
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

      {/* Main Studio Workspace Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '300px 1fr', minHeight: 'calc(100vh - 80px)' }}>
        
        {/* Left Sidebar: Page List & Selector */}
        <aside style={{ background: C.card, borderRight: `1px solid ${C.border}`, padding: 20, display: 'flex', flexDirection: 'column', gap: 20, maxHeight: 'calc(100vh - 80px)', overflowY: 'auto' }}>
          <div>
            <div style={{ fontSize: 11, fontWeight: 800, color: C.muted, letterSpacing: 1, marginBottom: 12 }}>
              VERFÜGBARE LANDING-PAGES ({pages.length})
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {pages.map(p => {
                const isSel = p.id === currentPage?.id
                return (
                  <div
                    key={p.id}
                    onClick={() => setSelectedPageId(p.id)}
                    style={{
                      padding: 12,
                      borderRadius: 10,
                      background: isSel ? `${C.purple}22` : C.bg,
                      border: `1px solid ${isSel ? C.purple : C.border}`,
                      cursor: 'pointer',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: 4,
                      position: 'relative'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <span style={{ fontSize: 13, fontWeight: 800, color: isSel ? C.white : C.muted }}>
                        {p.title}
                      </span>
                      <span style={{ fontSize: 10, fontWeight: 800, padding: '2px 6px', borderRadius: 6, background: p.isPublished ? `${C.green}22` : `${C.orange}22`, color: p.isPublished ? C.green : C.orange }}>
                        {p.isPublished ? 'LIVE' : 'ENTWURF'}
                      </span>
                    </div>
                    
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 2 }}>
                      <div style={{ fontSize: 11, color: C.dim, fontFamily: 'monospace' }}>
                        /{p.slug === 'hauptseite' ? '' : p.slug}
                      </div>

                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          handleDuplicatePage(p.id)
                        }}
                        title="Seite kopieren / duplizieren"
                        style={{ background: 'transparent', border: 'none', color: C.purple, cursor: 'pointer', padding: 2, display: 'flex', alignItems: 'center' }}
                      >
                        <Copy size={13} />
                      </button>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </aside>

        {/* Right Main Content Area */}
        <main style={{ padding: 28, overflowY: 'auto' }}>
          
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
                <div style={{ display: 'flex', background: C.bg, padding: 4, borderRadius: 10, border: `1px solid ${C.border}` }}>
                  {[
                    ['editor', '✏️ Visual Editor', Layout],
                    ['nav', '📌 Menü & Reihenfolge', List],
                    ['code', '💻 Custom CSS', Code],
                    ['settings', '⚙️ SEO & Settings', Settings],
                    ['preview', '👁️ Live Preview', Eye]
                  ].map(([tabKey, label, Icon]) => (
                    <button
                      key={tabKey}
                      onClick={() => setActiveTab(tabKey)}
                      style={{
                        padding: '8px 16px',
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

              {/* TAB 1: VISUAL BLOCK EDITOR */}
              {activeTab === 'editor' && (
                <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: 24 }}>
                  
                  {/* Left Column: Form Controls for Blocks */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <div style={{ fontSize: 14, fontWeight: 800, color: C.white, display: 'flex', alignItems: 'center', gap: 8 }}>
                        <Layers size={16} color={C.purple} /> Sektionen & Inhalt Blöcke ({currentPage.blocks.length})
                      </div>

                      {/* Add Block Selector */}
                      <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', alignItems: 'center' }}>
                        {copiedBlock && (
                          <button
                            onClick={handlePasteBlockFromClipboard}
                            style={{ padding: '6px 12px', borderRadius: 8, background: 'rgba(16,185,129,0.2)', border: '1px solid #10B981', color: '#10B981', fontSize: 11, fontWeight: 800, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 4 }}
                          >
                            <Copy size={12} /> Block Einfügen
                          </button>
                        )}
                        <button onClick={() => addBlockToPage('hero')} style={{ padding: '6px 10px', borderRadius: 8, background: C.card, border: `1px solid ${C.border}`, color: C.white, fontSize: 11, fontWeight: 700, cursor: 'pointer' }}>+ Hero</button>
                        <button onClick={() => addBlockToPage('text_block')} style={{ padding: '6px 10px', borderRadius: 8, background: C.card, border: `1px solid ${C.border}`, color: C.white, fontSize: 11, fontWeight: 700, cursor: 'pointer' }}>+ Text / Artikel</button>
                        <button onClick={() => addBlockToPage('image_banner')} style={{ padding: '6px 10px', borderRadius: 8, background: C.card, border: `1px solid ${C.border}`, color: C.white, fontSize: 11, fontWeight: 700, cursor: 'pointer' }}>+ Bild Banner</button>
                        <button onClick={() => addBlockToPage('features')} style={{ padding: '6px 10px', borderRadius: 8, background: C.card, border: `1px solid ${C.border}`, color: C.white, fontSize: 11, fontWeight: 700, cursor: 'pointer' }}>+ Features Grid</button>
                        <button onClick={() => addBlockToPage('cta')} style={{ padding: '6px 10px', borderRadius: 8, background: C.card, border: `1px solid ${C.border}`, color: C.white, fontSize: 11, fontWeight: 700, cursor: 'pointer' }}>+ CTA</button>
                        <button onClick={() => addBlockToPage('code_embed')} style={{ padding: '6px 10px', borderRadius: 8, background: C.card, border: `1px solid ${C.border}`, color: C.white, fontSize: 11, fontWeight: 700, cursor: 'pointer' }}>+ Custom HTML</button>
                      </div>
                    </div>

                    {/* Render Block List */}
                    {currentPage.blocks.map((block, idx) => (
                      <div key={block.id} style={{ background: C.card, borderRadius: 14, border: `1px solid ${C.border}`, padding: 18, display: 'grid', gap: 14 }}>
                        {/* Block Header Toolbar */}
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: `1px solid ${C.border}`, paddingBottom: 10, flexWrap: 'wrap', gap: 8 }}>
                          <span style={{ fontSize: 12, fontWeight: 900, color: C.purple, textTransform: 'uppercase', letterSpacing: 1 }}>
                            #{idx + 1} {block.type} BLOCK
                          </span>

                          <div style={{ display: 'flex', alignItems: 'center', gap: 6, flexWrap: 'wrap' }}>
                            {/* Copy to Clipboard */}
                            <button
                              onClick={() => handleCopyBlockToClipboard(block)}
                              title="Block kopieren (Zwischenablage)"
                              style={{ padding: '4px 8px', borderRadius: 6, background: C.bg, border: `1px solid ${C.border}`, color: C.white, fontSize: 11, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 4 }}
                            >
                              <Copy size={11} /> Kopieren
                            </button>

                            {/* Copy to specific target page selector */}
                            <select
                              defaultValue=""
                              onChange={(e) => {
                                if (e.target.value) {
                                  handleCopyBlockToPage(block, e.target.value)
                                  e.target.value = ""
                                }
                              }}
                              style={{ background: C.bg, border: `1px solid ${C.purple}88`, color: C.purple, fontSize: 11, fontWeight: 700, padding: '4px 6px', borderRadius: 6, cursor: 'pointer' }}
                            >
                              <option value="" disabled>📋 Kopieren in Seite...</option>
                              {pages.map(p => (
                                <option key={p.id} value={p.id} disabled={p.id === currentPage.id}>
                                  {p.title} {p.id === currentPage.id ? '(Aktuell)' : ''}
                                </option>
                              ))}
                            </select>

                            <button onClick={() => moveBlock(idx, -1)} disabled={idx === 0} style={{ padding: '4px 8px', borderRadius: 6, background: C.bg, border: `1px solid ${C.border}`, color: C.white, cursor: 'pointer', opacity: idx === 0 ? 0.3 : 1 }}><MoveUp size={12} /></button>
                            <button onClick={() => moveBlock(idx, 1)} disabled={idx === currentPage.blocks.length - 1} style={{ padding: '4px 8px', borderRadius: 6, background: C.bg, border: `1px solid ${C.border}`, color: C.white, cursor: 'pointer', opacity: idx === currentPage.blocks.length - 1 ? 0.3 : 1 }}><MoveDown size={12} /></button>
                            <button onClick={() => removeBlock(block.id)} style={{ padding: '4px 8px', borderRadius: 6, background: `${C.pink}22`, border: `1px solid ${C.pink}`, color: C.pink, cursor: 'pointer' }}><Trash2 size={12} /></button>
                          </div>
                        </div>

                        {/* Block Form Inputs */}
                        {block.type === 'hero' && (
                          <div style={{ display: 'grid', gap: 12 }}>
                            <div>
                              <label style={{ fontSize: 11, fontWeight: 700, color: C.muted, display: 'block', marginBottom: 4 }}>KICKER / OBERTITEL</label>
                              <input type="text" value={block.kicker || ''} onChange={e => updateBlock(block.id, 'kicker', e.target.value)} style={{ width: '100%', background: C.bg, border: `1px solid ${C.border}`, borderRadius: 8, padding: '8px 12px', color: C.white, fontSize: 13 }} />
                            </div>
                            <div>
                              <label style={{ fontSize: 11, fontWeight: 700, color: C.muted, display: 'block', marginBottom: 4 }}>HAUPTTITEL (ÜBERSCHRIFT)</label>
                              <input type="text" value={block.title || ''} onChange={e => updateBlock(block.id, 'title', e.target.value)} style={{ width: '100%', background: C.bg, border: `1px solid ${C.border}`, borderRadius: 8, padding: '8px 12px', color: C.white, fontSize: 15, fontWeight: 800 }} />
                            </div>
                            <div>
                              <label style={{ fontSize: 11, fontWeight: 700, color: C.muted, display: 'block', marginBottom: 4 }}>UNTERTITEL / BESCHREIBUNG</label>
                              <textarea rows={2} value={block.subtitle || ''} onChange={e => updateBlock(block.id, 'subtitle', e.target.value)} style={{ width: '100%', background: C.bg, border: `1px solid ${C.border}`, borderRadius: 8, padding: '8px 12px', color: C.white, fontSize: 13, resize: 'vertical' }} />
                            </div>
                            
                            {/* Image Field & Local File Upload */}
                            <div>
                              <label style={{ fontSize: 11, fontWeight: 700, color: C.muted, display: 'block', marginBottom: 4 }}>BILD URL ODER FILE UPLOAD</label>
                              <div style={{ display: 'flex', gap: 8 }}>
                                <input type="text" placeholder="https://..." value={block.imageUrl || ''} onChange={e => updateBlock(block.id, 'imageUrl', e.target.value)} style={{ flex: 1, background: C.bg, border: `1px solid ${C.border}`, borderRadius: 8, padding: '8px 12px', color: C.white, fontSize: 12 }} />
                                <label style={{ padding: '8px 12px', background: `${C.purple}22`, border: `1px solid ${C.purple}`, borderRadius: 8, color: C.purple, fontSize: 12, fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6 }}>
                                  <Upload size={13} /> Upload
                                  <input type="file" accept="image/*" onChange={e => handleFileUploadForBlock(block.id, 'imageUrl', e)} style={{ display: 'none' }} />
                                </label>
                              </div>
                            </div>

                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                              <div>
                                <label style={{ fontSize: 11, fontWeight: 700, color: C.muted, display: 'block', marginBottom: 4 }}>CTA BUTTON TEXT</label>
                                <input type="text" value={block.ctaText || ''} onChange={e => updateBlock(block.id, 'ctaText', e.target.value)} style={{ width: '100%', background: C.bg, border: `1px solid ${C.border}`, borderRadius: 8, padding: '8px 12px', color: C.white, fontSize: 12 }} />
                              </div>
                              <div>
                                <label style={{ fontSize: 11, fontWeight: 700, color: C.muted, display: 'block', marginBottom: 4 }}>CTA LINK (URL)</label>
                                <input type="text" value={block.ctaLink || ''} onChange={e => updateBlock(block.id, 'ctaLink', e.target.value)} style={{ width: '100%', background: C.bg, border: `1px solid ${C.border}`, borderRadius: 8, padding: '8px 12px', color: C.white, fontSize: 12 }} />
                              </div>
                            </div>
                          </div>
                        )}

                        {block.type === 'text_block' && (
                          <div style={{ display: 'grid', gap: 12 }}>
                            <div>
                              <label style={{ fontSize: 11, fontWeight: 700, color: C.muted, display: 'block', marginBottom: 4 }}>TITEL</label>
                              <input type="text" value={block.title || ''} onChange={e => updateBlock(block.id, 'title', e.target.value)} style={{ width: '100%', background: C.bg, border: `1px solid ${C.border}`, borderRadius: 8, padding: '8px 12px', color: C.white, fontSize: 14, fontWeight: 800 }} />
                            </div>
                            <div>
                              <label style={{ fontSize: 11, fontWeight: 700, color: C.muted, display: 'block', marginBottom: 4 }}>UNTERTITEL</label>
                              <input type="text" value={block.subtitle || ''} onChange={e => updateBlock(block.id, 'subtitle', e.target.value)} style={{ width: '100%', background: C.bg, border: `1px solid ${C.border}`, borderRadius: 8, padding: '8px 12px', color: C.white, fontSize: 13 }} />
                            </div>
                            <div>
                              <label style={{ fontSize: 11, fontWeight: 700, color: C.muted, display: 'block', marginBottom: 4 }}>FLIESSTEXT / ARTIKEL INHALT</label>
                              <textarea rows={5} value={block.content || ''} onChange={e => updateBlock(block.id, 'content', e.target.value)} style={{ width: '100%', background: C.bg, border: `1px solid ${C.border}`, borderRadius: 8, padding: '10px 12px', color: C.white, fontSize: 13, resize: 'vertical', lineHeight: 1.6 }} />
                            </div>
                          </div>
                        )}

                        {block.type === 'image_banner' && (
                          <div style={{ display: 'grid', gap: 12 }}>
                            <div>
                              <label style={{ fontSize: 11, fontWeight: 700, color: C.muted, display: 'block', marginBottom: 4 }}>BILD URL ODER FILE UPLOAD</label>
                              <div style={{ display: 'flex', gap: 8 }}>
                                <input type="text" placeholder="https://..." value={block.imageUrl || ''} onChange={e => updateBlock(block.id, 'imageUrl', e.target.value)} style={{ flex: 1, background: C.bg, border: `1px solid ${C.border}`, borderRadius: 8, padding: '8px 12px', color: C.white, fontSize: 12 }} />
                                <label style={{ padding: '8px 12px', background: `${C.purple}22`, border: `1px solid ${C.purple}`, borderRadius: 8, color: C.purple, fontSize: 12, fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6 }}>
                                  <Upload size={13} /> Upload
                                  <input type="file" accept="image/*" onChange={e => handleFileUploadForBlock(block.id, 'imageUrl', e)} style={{ display: 'none' }} />
                                </label>
                              </div>
                            </div>
                            <div>
                              <label style={{ fontSize: 11, fontWeight: 700, color: C.muted, display: 'block', marginBottom: 4 }}>BILD-UNTERSCHRIFT (CAPTION)</label>
                              <input type="text" value={block.caption || ''} onChange={e => updateBlock(block.id, 'caption', e.target.value)} style={{ width: '100%', background: C.bg, border: `1px solid ${C.border}`, borderRadius: 8, padding: '8px 12px', color: C.white, fontSize: 13 }} />
                            </div>
                          </div>
                        )}

                        {block.type === 'features' && (
                          <div style={{ display: 'grid', gap: 12 }}>
                            <div>
                              <label style={{ fontSize: 11, fontWeight: 700, color: C.muted, display: 'block', marginBottom: 4 }}>SEKTIONS-TITEL</label>
                              <input type="text" value={block.title || ''} onChange={e => updateBlock(block.id, 'title', e.target.value)} style={{ width: '100%', background: C.bg, border: `1px solid ${C.border}`, borderRadius: 8, padding: '8px 12px', color: C.white, fontSize: 14, fontWeight: 800 }} />
                            </div>
                          </div>
                        )}

                        {block.type === 'cta' && (
                          <div style={{ display: 'grid', gap: 12 }}>
                            <div>
                              <label style={{ fontSize: 11, fontWeight: 700, color: C.muted, display: 'block', marginBottom: 4 }}>TITEL</label>
                              <input type="text" value={block.title || ''} onChange={e => updateBlock(block.id, 'title', e.target.value)} style={{ width: '100%', background: C.bg, border: `1px solid ${C.border}`, borderRadius: 8, padding: '8px 12px', color: C.white, fontSize: 14, fontWeight: 800 }} />
                            </div>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                              <div>
                                <label style={{ fontSize: 11, fontWeight: 700, color: C.muted, display: 'block', marginBottom: 4 }}>BUTTON TEXT</label>
                                <input type="text" value={block.ctaText || ''} onChange={e => updateBlock(block.id, 'ctaText', e.target.value)} style={{ width: '100%', background: C.bg, border: `1px solid ${C.border}`, borderRadius: 8, padding: '8px 12px', color: C.white, fontSize: 12 }} />
                              </div>
                              <div>
                                <label style={{ fontSize: 11, fontWeight: 700, color: C.muted, display: 'block', marginBottom: 4 }}>BUTTON LINK</label>
                                <input type="text" value={block.ctaLink || ''} onChange={e => updateBlock(block.id, 'ctaLink', e.target.value)} style={{ width: '100%', background: C.bg, border: `1px solid ${C.border}`, borderRadius: 8, padding: '8px 12px', color: C.white, fontSize: 12 }} />
                              </div>
                            </div>
                          </div>
                        )}

                        {block.type === 'code_embed' && (
                          <div style={{ display: 'grid', gap: 12 }}>
                            <label style={{ fontSize: 11, fontWeight: 700, color: C.muted, display: 'block' }}>CUSTOM HTML / CODE CONTENT</label>
                            <textarea rows={4} value={block.htmlContent || ''} onChange={e => updateBlock(block.id, 'htmlContent', e.target.value)} style={{ width: '100%', background: '#05070B', border: `1px solid ${C.border}`, borderRadius: 8, padding: '10px', color: C.green, fontSize: 12, fontFamily: 'monospace' }} />
                          </div>
                        )}
                      </div>
                    ))}
                  </div>

                  {/* Right Column: Live Side Preview */}
                  <div style={{ background: C.card, borderRadius: 16, border: `1px solid ${C.border}`, padding: 20, position: 'sticky', top: 20, alignSelf: 'start' }}>
                    <div style={{ fontSize: 13, fontWeight: 800, color: C.white, marginBottom: 14, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}><Eye size={15} color={C.purple} /> Echtzeit-Vorschau</span>
                      <span style={{ fontSize: 10, color: C.green, background: `${C.green}22`, padding: '2px 8px', borderRadius: 10, fontWeight: 800 }}>LIVE SYNC</span>
                    </div>

                    <div style={{
                      background: currentPage.theme?.bg || '#0A0A10',
                      color: currentPage.theme?.text || '#F3F4F6',
                      borderRadius: 12,
                      border: `1px solid ${C.border}`,
                      padding: 20,
                      maxHeight: '70vh',
                      overflowY: 'auto'
                    }}>
                      <style>{currentPage.theme?.customCss || ''}</style>
                      {currentPage.blocks.map(b => (
                        <div key={b.id} style={{ padding: `${b.paddingY || 24}px 0`, borderBottom: `1px solid rgba(255,255,255,0.05)` }}>
                          {b.kicker && <div style={{ fontSize: 11, color: currentPage.theme?.accent || C.purple, fontWeight: 800, letterSpacing: 1.5, marginBottom: 6 }}>{b.kicker}</div>}
                          {b.title && <div style={{ fontSize: b.fontSize || 24, fontWeight: 900, marginBottom: 8 }}>{b.title}</div>}
                          {b.subtitle && <div style={{ fontSize: 13, opacity: 0.8, marginBottom: 14, lineHeight: 1.5 }}>{b.subtitle}</div>}
                          {b.content && <div style={{ fontSize: 13, opacity: 0.9, lineHeight: 1.6, marginBottom: 14, whitespace: 'pre-line' }}>{b.content}</div>}
                          {b.imageUrl && (
                            <img src={b.imageUrl} alt="Uploaded preview" style={{ width: '100%', maxHeight: 220, objectFit: 'cover', borderRadius: 10, marginBottom: 14 }} />
                          )}
                          {b.ctaText && (
                            <a href={b.ctaLink || '#'} style={{ display: 'inline-block', padding: '8px 20px', borderRadius: 8, background: currentPage.theme?.accent || C.purple, color: '#FFF', fontWeight: 800, fontSize: 12, textDecoration: 'none' }}>
                              {b.ctaText}
                            </a>
                          )}
                          {b.htmlContent && <div dangerouslySetInnerHTML={{ __html: b.htmlContent }} />}
                        </div>
                      ))}
                    </div>
                  </div>

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
                    {currentPage.blocks.map(b => (
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

      </div>

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
