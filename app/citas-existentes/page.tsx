"'use client'"

import { useState, useEffect } from "'react'"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import Navigation from "'@/components/Navigation'"
import Link from "'next/link'"

// Mock data for existing appointments
const mockAppointments = [
  { id: 1, date: "'2023-06-15'", time: "'10:00'", petName: "'Max'", service: "'Consulta general'" },
  { id: 2, date: "'2023-06-20'", time: "'14:30'", petName: "'Luna'", service: "'Vacunación'" },
]

export default function CitasExistentes() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [userRole, setUserRole] = useState<string | null>(null)
  const [appointments, setAppointments] = useState(mockAppointments)

  useEffect(() => {
    const role = localStorage.getItem("'userRole'")
    setIsLoggedIn(!!role)
    setUserRole(role)
  }, [])

  const handleCancel = (id: number) => {
    // Here you would typically send a request to your backend to cancel the appointment
    setAppointments(appointments.filter(appointment => appointment.id !== id))
  }

  if (!isLoggedIn || userRole !== "'recepcionista'") {
    return (
      <>
        <Navigation />
        <div className="flex items-center justify-center min-h-[calc(100vh-4rem)]">
          <Card className="w-[350px]">
            <CardHeader>
              <CardTitle>Acceso Restringido</CardTitle>
              <CardDescription>No tienes permiso para ver esta página</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
              <Button asChild>
                <Link href="/">Volver al Inicio</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </>
    )
  }

  return (
    <>
      <Navigation />
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Citas Existentes</h1>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Fecha</TableHead>
              <TableHead>Hora</TableHead>
              <TableHead>Mascota</TableHead>
              <TableHead>Servicio</TableHead>
              <TableHead>Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {appointments.map((appointment) => (
              <TableRow key={appointment.id}>
                <TableCell>{appointment.date}</TableCell>
                <TableCell>{appointment.time}</TableCell>
                <TableCell>{appointment.petName}</TableCell>
                <TableCell>{appointment.service}</TableCell>
                <TableCell>
                  <Button asChild className="mr-2" variant="outline" size="sm">
                    <Link href={`/modificar-cita/${appointment.id}`}>Modificar</Link>
                  </Button>
                  <Button onClick={() => handleCancel(appointment.id)} variant="destructive" size="sm">Cancelar</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <div className="mt-4 flex justify-center">
          <Button asChild>
            <Link href="/dashboard">Ir al Dashboard</Link>
          </Button>
        </div>
      </div>
    </>
  )
}

