import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { C, grad } from '@/tokens'
import { ScenvyLogoIcon } from '@/components/ScenvyLogo'
import { X, Lock, Key, Check, Sparkles, Layout, Globe, ArrowRight } from 'lucide-react'

export default function CmsPasscodeModal({ isOpen, onClose }) {
  const navigate = useNavigate()

  useEffect(() => {
    if (isOpen) {
      sessionStorage.setItem('scenvy_cms_unlocked', 'true')
      onClose()
      navigate('/website-studio')
    }
  }, [isOpen, navigate, onClose])

  return null
}
