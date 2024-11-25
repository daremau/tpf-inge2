'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { Calendar } from '@/components/ui/calendar'
import { format } from 'date-fns'
import { CalendarIcon } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import Navigation from '@/components/Navigation'
import Link from 'next/link'

// Available services
const services = [
  "Consulta general",
  "Vacunación",
  "Desparasitación",
  "Cirugía",
  "Limpieza dental",
  "Control de rutina"
]

export default function AgendarCita() {
  const [date, setDate] = useState<Date>()
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [userRole, setUserRole] = useState<string | null>(null)
  const [selectedService, setSelectedService] = useState('')
  const [clientName, setClientName] = useState('')

  useEffect(() => {
    const role = localStorage.getItem('userRole')
    setIsLoggedIn(!!role)
    setUserRole(role)
  }, [])

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const formData = {
      petName: event.currentTarget.petName.value,
      service: selectedService,
      date,
      ...(userRole === 'recepcionista' && { clientName }),
    }
    console.log('Form submitted', formData)
  }

  if (!isLoggedIn) {
    return (
      <>
        <Navigation />
        <div className="flex items-center justify-center min-h-[calc(100vh-4rem)]">
          <Card className="w-[350px]">
            <CardHeader>
              <CardTitle>Acceso Restringido</CardTitle>
              <CardDescription>Necesitas iniciar sesión para agendar citas</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
              <Button asChild>
                <Link href="/login">Iniciar Sesión</Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="/create-account">Crear Cuenta</Link>
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
        <h1 className="text-2xl font-bold mb-4">Agendar Cita</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="petName">Nombre de la Mascota</Label>
            <Input id="petName" placeholder="Nombre de la mascota" required />
          </div>
          {userRole === 'recepcionista' && (
            <div>
              <Label htmlFor="clientName">Nombre del Cliente</Label>
              <Input 
                id="clientName" 
                placeholder="Nombre del cliente" 
                value={clientName}
                onChange={(e) => setClientName(e.target.value)}
                required 
              />
            </div>
          )}
          <div>
            <Label htmlFor="petType">Tipo de Mascota</Label>
            <Select required>
              <SelectTrigger id="petType">
                <SelectValue placeholder="Seleccionar tipo de mascota" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="dog">Perro</SelectItem>
                <SelectItem value="cat">Gato</SelectItem>
                <SelectItem value="bird">Ave</SelectItem>
                <SelectItem value="other">Otro</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="service">Servicio</Label>
            <Select value={selectedService} onValueChange={setSelectedService} required>
              <SelectTrigger id="service">
                <SelectValue placeholder="Seleccionar servicio" />
              </SelectTrigger>
              <SelectContent>
                {services.map((service) => (
                  <SelectItem key={service} value={service}>{service}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label>Fecha de la Cita</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !date && "text-neutral-500 dark:text-neutral-400"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? format(date, "PPP") : <span>Seleccionar fecha</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
          <div>
            <Label htmlFor="comments">Comentarios</Label>
            <Textarea id="comments" placeholder="Comentarios adicionales" />
          </div>
          <Button type="submit">Agendar Cita</Button>
        </form>
      </div>
    </>
  )
}

