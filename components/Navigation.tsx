'use client'

import { useEffect, useState, useCallback } from 'react'
import Link from 'next/link'
import { useRouter, usePathname } from 'next/navigation'
import { Home, LogIn, Calendar, UserPlus, LogOut, Syringe, PawPrint } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function Navigation() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [userRole, setUserRole] = useState<string | null>(null)
  const router = useRouter()
  const pathname = usePathname()
  const isDashboard = pathname === '/dashboard'

  useEffect(() => {
    // Check authentication status whenever the component mounts or pathname changes
    const checkAuth = () => {
      const role = localStorage.getItem('userRole')
      if (!role && pathname !== '/login' && pathname !== '/create-account') {
        router.push('/login')
        return
      }
      setIsLoggedIn(!!role)
      setUserRole(role)
    }

    checkAuth()
  }, [pathname, router])

  const handleLogout = useCallback(async () => {
    try {
      // Clear all auth-related items
      localStorage.removeItem('userRole')
      localStorage.removeItem('token') // if you have one
      localStorage.removeItem('userId') // if you have one
      
      // Update state
      setIsLoggedIn(false)
      setUserRole(null)
      
      // Redirect to home page
      router.push('/')
      
      // Optional: You might want to show a success message
      // if you have a toast/notification system
    } catch (error) {
      console.error('Error during logout:', error)
      // Handle error - maybe show an error message to user
    }
  }, [router])

  return (
    <nav className="border-b bg-white">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link href="/" className="text-xl font-bold">
              Wonder Pet
            </Link>
          </div>
          
          <div className="flex items-center space-x-4">
            {!isDashboard && (
              <>
                <Link href="/" className="flex items-center space-x-1">
                  <Home className="h-4 w-4" />
                  <span>Home</span>
                </Link>
                {isLoggedIn ? (
                  <Link href="/agendar-cita" className="flex items-center space-x-1">
                    <Calendar className="h-4 w-4" />
                    <span>Gestionar Citas</span>
                  </Link>
                ) : (
                  <Link href="/agendar-cita" className="flex items-center space-x-1">
                    <Calendar className="h-4 w-4" />
                    <span>Agendar Cita</span>
                  </Link>
                )}
                {isLoggedIn && userRole === 'Cliente' && (
                  <>
                    <Link href="/vacunas-pendientes" className="flex items-center space-x-1">
                      <Syringe className="h-4 w-4" />
                      <span>Vacunas Pendientes</span>
                    </Link>
                    <Link href="/registrar-mascota" className="flex items-center space-x-1">
                      <PawPrint className="h-4 w-4" />
                      <span>Gestionar Mascotas</span>
                    </Link>
                  </>
                )}
              </>
            )}
            
            {isLoggedIn ? (
              <Button variant="outline" onClick={handleLogout} className="flex items-center space-x-1">
                <LogOut className="h-4 w-4" />
                <span>Cerrar Sesión</span>
              </Button>
            ) : (
              <div className="flex items-center space-x-2">
                <Button variant="outline" asChild>
                  <Link href="/login" className="flex items-center space-x-1">
                    <LogIn className="h-4 w-4" />
                    <span>Login</span>
                  </Link>
                </Button>
                <Button asChild>
                  <Link href="/create-account" className="flex items-center space-x-1">
                    <UserPlus className="h-4 w-4" />
                    <span>Crear Cuenta</span>
                  </Link>
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}

