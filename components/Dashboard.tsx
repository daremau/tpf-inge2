'use client'

import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

const allowedRoles = ['Recepcionista', 'Veterinario', 'PersonalDelivery', 'Administrador']

export default function Dashboard() {
  const [userRole, setUserRole] = useState<string | null>(null)
  const router = useRouter()

  useEffect(() => {
    const role = localStorage.getItem('userRole')
    if (!role || !allowedRoles.includes(role)) {
      router.push('/')
    } else {
      setUserRole(role)
    }
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem('userRole')
    router.push('/')
  }

  if (!userRole) return null

  return (
    <div className="p-8">
      <h1 className="mb-6 text-2xl font-bold">Dashboard de {userRole.toLowerCase()}</h1>
      <div className="grid gap-4 mb-6">
        {userRole === 'Recepcionista' && (
          <>
            <Button asChild><Link href="/agendar-cita">Agendar Citas</Link></Button>
            <Button asChild><Link href="/citas-existentes">Citas Existentes</Link></Button>
          </>
        )}
        {userRole === 'Veterinario' && (
          <>
            <Button asChild className="bg-black text-white hover:bg-gray-800">
              <Link href="/dashboard/gestionar-inventario">Gestionar Inventario</Link>
            </Button>
            <Button asChild className="bg-black text-white hover:bg-gray-800">
              <Link href="/dashboard/ver-citas">Gestionar Citas</Link>
            </Button>
          </>
        )}
        {userRole === 'PersonalDelivery' && (
          <>
            <Button asChild><Link href="/dashboard/transportes-pendientes">Ver Transportes Pendientes</Link></Button>
          </>
        )}
        {userRole === 'Administrador' && (
          <>
            <Button asChild><Link href="/dashboard/gestionar-inventarios">Gestionar Inventarios</Link></Button>
            <Button asChild><Link href="/dashboard/administrar-usuarios">Administrar Cuentas de Usuario</Link></Button>
            <Button asChild><Link href="/agendar-cita">Gestionar Citas</Link></Button>
            <Button asChild><Link href="/dashboard/servicios-clientes">Servicios para Clientes</Link></Button>
            <Button asChild><Link href="/dashboard/gestionar-inventario">Gestionar Inventario</Link></Button>
            <Button asChild><Link href="/dashboard/ver-citas">Gestionar Citas</Link></Button>
            <Button asChild><Link href="/dashboard/gestionar-vacunacion">Gestionar Vacunación</Link></Button>
            <Button asChild><Link href="/dashboard/agregar-consulta">Agregar Consulta Médica</Link></Button>
            <Button asChild><Link href="/dashboard/transportes-pendientes">Ver Transportes Pendientes</Link></Button>
          </>
        )}
      </div>
      <Button variant="outline" onClick={handleLogout}>Cerrar Sesión</Button>
    </div>
  )
}

