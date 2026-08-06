import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { QueryClientProvider }                    from '@tanstack/react-query'
import { queryClient }                            from '@/lib/query-client'
import { AuthProvider, useAuth }                  from '@/lib/AuthContext'
import { ErrorBoundary }                          from '@/components/ErrorBoundary'
import Landing           from './pages/Landing.jsx'
import SolutionsPage     from './pages/SolutionsPage.jsx'
import ScenvyBoardPage   from './pages/ScenvyBoardPage.jsx'
import ScenvyProductPage from './pages/ScenvyProductPage.jsx'
import ScenvyAuth        from './pages/ScenvyAuth.jsx'
import GuestView         from './pages/GuestView.jsx'
import Dashboard         from './pages/Dashboard.jsx'
import Admin             from './pages/Admin.jsx'
import MenuGenerator     from './pages/MenuGenerator.jsx'
import GuestMenuReel     from './pages/GuestMenuReel.jsx'
import MenuAddonShowcase from './pages/MenuAddonShowcase.jsx'
import ReelsAddonShowcase from './pages/ReelsAddonShowcase.jsx'
import StyleGuide        from './pages/StyleGuide.jsx'
import WebsiteStudio     from './pages/WebsiteStudio.jsx'
import PublicCustomPage  from './pages/PublicCustomPage.jsx'
import AppAuthModal      from './components/AppAuthModal.jsx'
import CmsPasscodeModal  from './components/CmsPasscodeModal.jsx'

// ─── Route guards ────────────────────────────────────────
function Protected({ children, adminOnly = false }) {
  const { user, loading } = useAuth()
  const isCmsUnlocked = sessionStorage.getItem('scenvy_cms_unlocked') === 'true'

  if (isCmsUnlocked) {
    return children
  }

  if (loading) return <Spinner />
  if (!user)   return <Navigate to="/auth" replace />

  const userEmail = (user.email || '').toLowerCase()
  const isAdmin = user.role === 'admin' || user.role === 'superadmin' || userEmail === 'admin@scenvy.de' || userEmail === 'web.domell@gmail.com' || userEmail === 'web.domain@gmail.com'

  if (adminOnly && !isAdmin) return <Navigate to="/dashboard" replace />
  return children
}

function PublicOnly({ children }) {
  const { user, loading } = useAuth()
  if (loading) return <Spinner />
  if (user) {
    const userEmail = (user.email || '').toLowerCase()
    const isAdmin = user.role === 'admin' || user.role === 'superadmin' || userEmail === 'admin@scenvy.de' || userEmail === 'web.domell@gmail.com'
    return <Navigate to={isAdmin ? '/admin' : '/dashboard'} replace />
  }
  return children
}

function Spinner() {
  return (
    <div style={{ height:'100vh', background:'#0D0D14', display:'flex', alignItems:'center', justifyContent:'center' }}>
      <div style={{ width:40, height:40, borderRadius:'50%', border:'3px solid #7C3AED', borderTopColor:'transparent', animation:'spin 0.8s linear infinite' }}/>
      <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
    </div>
  )
}

// Subdomain & Path Smart Root Resolver
function SmartRoot({ onOpenAuthModal }) {
  const host = (window.location.hostname || '').toLowerCase()
  
  if (host.startsWith('board.') || host.startsWith('board-')) {
    return <ScenvyBoardPage onOpenAuthModal={onOpenAuthModal} />
  }
  if (host.startsWith('flow.') || host.startsWith('flow-')) {
    return <ScenvyProductPage module="flow" onOpenAuthModal={onOpenAuthModal} />
  }
  if (host.startsWith('menu.') || host.startsWith('menu-')) {
    return <ScenvyProductPage module="menu" onOpenAuthModal={onOpenAuthModal} />
  }
  if (host.startsWith('magic.') || host.startsWith('magic-')) {
    return <ScenvyProductPage module="magic" onOpenAuthModal={onOpenAuthModal} />
  }
  if (host.startsWith('link.') || host.startsWith('link-')) {
    return <ScenvyProductPage module="link" onOpenAuthModal={onOpenAuthModal} />
  }
  if (host.startsWith('store.') || host.startsWith('store-')) {
    return <ScenvyProductPage module="store" onOpenAuthModal={onOpenAuthModal} />
  }
  if (host.startsWith('host.') || host.startsWith('host-')) {
    return <ScenvyProductPage module="host" onOpenAuthModal={onOpenAuthModal} />
  }

  return <Landing onOpenAuthModal={onOpenAuthModal} />
}

// ─── Main Router ──────────────────────────────────────────────
function AppRoutes({ onOpenAuthModal, onOpenCmsPasscode }) {
  return (
    <Routes>
      <Route path="/"              element={<SmartRoot onOpenAuthModal={onOpenAuthModal} />} />
      <Route path="/loesungen"     element={<SolutionsPage />} />
      <Route path="/solutions"     element={<SolutionsPage />} />
      <Route path="/board"         element={<ScenvyBoardPage onOpenAuthModal={onOpenAuthModal} />} />
      <Route path="/flow"          element={<ScenvyProductPage module="flow" onOpenAuthModal={onOpenAuthModal} />} />
      <Route path="/menu"          element={<ScenvyProductPage module="menu" onOpenAuthModal={onOpenAuthModal} />} />
      <Route path="/magic"         element={<ScenvyProductPage module="magic" onOpenAuthModal={onOpenAuthModal} />} />
      <Route path="/link"          element={<ScenvyProductPage module="link" onOpenAuthModal={onOpenAuthModal} />} />
      <Route path="/store"         element={<ScenvyProductPage module="store" onOpenAuthModal={onOpenAuthModal} />} />
      <Route path="/host"          element={<ScenvyProductPage module="host" onOpenAuthModal={onOpenAuthModal} />} />
      <Route path="/style-guide"    element={<StyleGuide />} />
      <Route path="/reels-addon"    element={<ReelsAddonShowcase />} />
      <Route path="/menu-addon"     element={<MenuAddonShowcase />} />
      <Route path="/add-ons/menu-reel" element={<MenuAddonShowcase />} />
      <Route path="/auth"          element={<PublicOnly><ScenvyAuth /></PublicOnly>} />
      <Route path="/auth/login"    element={<PublicOnly><ScenvyAuth /></PublicOnly>} />
      <Route path="/auth/register" element={<PublicOnly><ScenvyAuth /></PublicOnly>} />
      <Route path="/l/:locationId" element={<GuestView />} />
      <Route path="/r/:locationId" element={<GuestView />} />
      <Route path="/reel/:locationId" element={<GuestView />} />
      <Route path="/reels/:locationId" element={<GuestView />} />
      <Route path="/m/:menuId"     element={<GuestMenuReel />} />
      <Route path="/menu/:menuId"  element={<GuestMenuReel />} />
      <Route path="/menu-reel/:menuId" element={<GuestMenuReel />} />
      <Route path="/p/:slug"       element={<PublicCustomPage />} />
      <Route path="/pages/:slug"   element={<PublicCustomPage />} />
      <Route path="/dashboard"     element={<Protected><Dashboard /></Protected>} />
      <Route path="/website-studio" element={<Protected><WebsiteStudio /></Protected>} />
      <Route path="/cms"           element={<Protected><WebsiteStudio /></Protected>} />
      <Route path="/menu-generator" element={<Protected><MenuGenerator /></Protected>} />
      <Route path="/admin"         element={<Protected adminOnly><Admin /></Protected>} />
      <Route path="*"              element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default function App() {
  const [showAppAuthModal, setShowAppAuthModal] = useState(false)
  const [showCmsPasscodeModal, setShowCmsPasscodeModal] = useState(false)

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <ErrorBoundary>
          <BrowserRouter>
            <AppRoutes 
              onOpenAuthModal={() => setShowAppAuthModal(true)} 
              onOpenCmsPasscode={() => setShowCmsPasscodeModal(true)}
            />
            
            {/* Global Modals */}
            <AppAuthModal 
              isOpen={showAppAuthModal} 
              onClose={() => setShowAppAuthModal(false)} 
            />
            
            <CmsPasscodeModal 
              isOpen={showCmsPasscodeModal} 
              onClose={() => setShowCmsPasscodeModal(false)} 
            />
          </BrowserRouter>
        </ErrorBoundary>
      </AuthProvider>
    </QueryClientProvider>
  )
}
