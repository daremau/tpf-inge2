'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { usePathname } from 'next/navigation'

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const pathname = usePathname()
  const [isAuthorized, setIsAuthorized] = useState(false)

  useEffect(() => {
    const userRole = localStorage.getItem('userRole')
    
    if (!userRole) {
      router.push('/login')
      return
    }

    // Add specific role checks if needed
    if (pathname && pathname.includes('/registrar-mascota') && userRole !== 'Cliente') {
      router.push('/')
      return
    }

    setIsAuthorized(true)
  }, [pathname, router])

  // Show loading or nothing while checking authentication
  if (!isAuthorized) {
    return null
  }

  return <>{children}</>
} 