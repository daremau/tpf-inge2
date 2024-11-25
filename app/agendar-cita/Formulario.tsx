'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Calendar } from '@/components/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { format } from 'date-fns'
import { es } from 'date-fns/locale'
import { useRouter } from 'next/navigation'

interface NewAppointmentFormProps {
  onBack: () => void
}

interface Pet {
  IdMascota: number
  Nombre: string
}

interface Service {
  IdServicio: number
  Nombre: string
}

export default function NewAppointmentForm({ onBack }: NewAppointmentFormProps) {
  const [pets, setPets] = useState<Pet[]>([])
  const [services, setServices] = useState<Service[]>([])
  const [selectedPet, setSelectedPet] = useState<string>('')
  const [selectedService, setSelectedService] = useState<string>('')
  const [selectedDate, setSelectedDate] = useState<Date>()
  const [selectedTime, setSelectedTime] = useState<string>('')
  const [notes, setNotes] = useState<string>('')
  const router = useRouter()

  useEffect(() => {
    // Fetch pets and services when component mounts
    const fetchData = async () => {
      try {
        const [petsRes, servicesRes] = await Promise.all([
          fetch('/api/pets'),
          fetch('/api/services')
        ])
        
        const petsData = await petsRes.json()
        const servicesData = await servicesRes.json()
        
        setPets(Array.isArray(petsData) ? petsData : [])
        setServices(Array.isArray(servicesData) ? servicesData : [])
      } catch (error) {
        console.error('Error fetching data:', error)
        setPets([])
        setServices([])
      }
    }

    fetchData()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!selectedPet || !selectedService || !selectedDate || !selectedTime) {
      alert('Por favor complete todos los campos requeridos')
      return
    }

    const dateTime = new Date(selectedDate)
    const [hours, minutes] = selectedTime.split(':')
    dateTime.setHours(parseInt(hours), parseInt(minutes))

    try {
      const response = await fetch('/api/appointments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          idMascota: parseInt(selectedPet),
          idServicio: parseInt(selectedService),
          fechaHora: dateTime.toISOString(),
          notasCliente: notes,
        }),
      })

      if (!response.ok) {
        throw new Error('Error al crear la cita')
      }

      alert('Cita creada exitosamente')
      router.refresh()
      onBack()
    } catch (error) {
      console.error('Error:', error)
      alert('Error al crear la cita')
    }
  }

  return (
    <div className="container mx-auto p-4 max-w-2xl">
      <div className="flex items-center mb-6">
        <Button variant="ghost" onClick={onBack} className="mr-4">
          ← Volver
        </Button>
        <h1 className="text-2xl font-bold">Nueva Cita</h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="pet">Mascota</Label>
          <Select value={selectedPet} onValueChange={setSelectedPet}>
            <SelectTrigger>
              <SelectValue placeholder="Seleccione una mascota" />
            </SelectTrigger>
            <SelectContent>
              {pets.map((pet) => (
                <SelectItem key={pet.IdMascota} value={pet.IdMascota.toString()}>
                  {pet.Nombre}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="service">Servicio</Label>
          <Select value={selectedService} onValueChange={setSelectedService}>
            <SelectTrigger>
              <SelectValue placeholder="Seleccione un servicio" />
            </SelectTrigger>
            <SelectContent>
              {services.map((service) => (
                <SelectItem key={service.IdServicio} value={service.IdServicio.toString()}>
                  {service.Nombre}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>Fecha</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="w-full justify-start text-left">
                {selectedDate ? format(selectedDate, 'PPP', { locale: es }) : 'Seleccione una fecha'}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={setSelectedDate}
                disabled={(date) => date < new Date() || date.getDay() === 0}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>

        <div className="space-y-2">
          <Label htmlFor="time">Hora</Label>
          <Select value={selectedTime} onValueChange={setSelectedTime}>
            <SelectTrigger>
              <SelectValue placeholder="Seleccione una hora" />
            </SelectTrigger>
            <SelectContent>
              {Array.from({ length: 8 }, (_, i) => i + 9).map((hour) => (
                <SelectItem key={hour} value={`${hour}:00`}>
                  {`${hour}:00`}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="notes">Notas adicionales</Label>
          <Input
            id="notes"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Agregue notas adicionales aquí"
          />
        </div>

        <Button type="submit" className="w-full">
          Agendar Cita
        </Button>
      </form>
    </div>
  )
} 