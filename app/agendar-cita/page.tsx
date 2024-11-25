'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import Navigation from '@/components/Navigation'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import ProtectedRoute from '@/components/ProtectedRoute'
import NewAppointmentForm from './Formulario'
import { useSession } from 'next-auth/react'

interface Appointment {
  IdCita: number;
  NombreMascota: string;
  NombreServicio: string;
  FechaHora: string;
  Estado: string;
  NotasCliente?: string;
}

export default function AgendarCita() {
  const [showNewAppointmentForm, setShowNewAppointmentForm] = useState(false)
  const [appointments, setAppointments] = useState<Appointment[]>([])
  const [loading, setLoading] = useState(true)
  const { data: session } = useSession()

  useEffect(() => {
    const fetchAppointments = async () => {
      if (!session) {
        console.log('No session found, skipping fetch')
        setLoading(false)
        return
      }

      try {
        setLoading(true)
        console.log('Fetching appointments...')
        const response = await fetch('/api/appointments')
        console.log('Response status:', response.status)
        
        if (!response.ok) {
          throw new Error(`Error al cargar las citas: ${response.status}`)
        }
        
        const data = await response.json()
        console.log('Appointments data:', data)
        setAppointments(data)
      } catch (error) {
        console.error('Error fetching appointments:', error)
        setAppointments([])
      } finally {
        setLoading(false)
      }
    }

    fetchAppointments()
  }, [session])

  console.log('Current state:', { loading, appointmentsCount: appointments.length })

  if (showNewAppointmentForm) {
    return <NewAppointmentForm onBack={() => setShowNewAppointmentForm(false)} />
  }

  return (
    <ProtectedRoute>
      <Navigation />
      <div className="container mx-auto p-4">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Gestión de Citas</h1>
          <Button onClick={() => setShowNewAppointmentForm(true)}>
            Nueva Cita
          </Button>
        </div>

        <Tabs defaultValue="pending" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="pending">Citas Pendientes</TabsTrigger>
            <TabsTrigger value="history">Historial de Citas</TabsTrigger>
          </TabsList>
          
          <TabsContent value="pending">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Mascota</TableHead>
                  <TableHead>Servicio</TableHead>
                  <TableHead>Fecha</TableHead>
                  <TableHead>Hora</TableHead>
                  <TableHead>Estado</TableHead>
                  <TableHead>Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loading ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center">
                      Cargando citas...
                    </TableCell>
                  </TableRow>
                ) : appointments.filter(apt => apt.Estado === "Pendiente").length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center">
                      No hay citas pendientes
                    </TableCell>
                  </TableRow>
                ) : (
                  appointments
                    .filter(apt => apt.Estado === "Pendiente")
                    .map((appointment: Appointment) => (
                      <TableRow key={appointment.IdCita}>
                        <TableCell>{appointment.NombreMascota}</TableCell>
                        <TableCell>{appointment.NombreServicio}</TableCell>
                        <TableCell>{new Date(appointment.FechaHora).toLocaleDateString()}</TableCell>
                        <TableCell>{new Date(appointment.FechaHora).toLocaleTimeString()}</TableCell>
                        <TableCell>{appointment.Estado}</TableCell>
                        <TableCell>
                          <Button variant="outline" size="sm">
                            Cancelar
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                )}
              </TableBody>
            </Table>
          </TabsContent>

          <TabsContent value="history">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Mascota</TableHead>
                  <TableHead>Servicio</TableHead>
                  <TableHead>Fecha</TableHead>
                  <TableHead>Hora</TableHead>
                  <TableHead>Estado</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loading ? (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center">
                      Cargando citas...
                    </TableCell>
                  </TableRow>
                ) : appointments.filter(apt => apt.Estado === "Completado").length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center">
                      No hay citas
                    </TableCell>
                  </TableRow>
                ) : (
                  appointments
                    .filter(apt => apt.Estado === "Completado")
                    .map((appointment: Appointment) => (
                      <TableRow key={appointment.IdCita}>
                        <TableCell>{appointment.NombreMascota}</TableCell>
                        <TableCell>{appointment.NombreServicio}</TableCell>
                        <TableCell>{new Date(appointment.FechaHora).toLocaleDateString()}</TableCell>
                        <TableCell>{new Date(appointment.FechaHora).toLocaleTimeString()}</TableCell>
                        <TableCell>{appointment.Estado}</TableCell>
                      </TableRow>
                    ))
                )}
              </TableBody>
            </Table>
          </TabsContent>
        </Tabs>
      </div>
    </ProtectedRoute>
  )
}

