"'use client'"

import { useState, useEffect } from "'react'"
import { useRouter } from "'next/navigation'"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Calendar } from "@/components/ui/calendar"
import { format } from "date-fns"
import { CalendarIcon } from "'lucide-react'"
import { cn } from "@/lib/utils"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import Navigation from "'@/components/Navigation'"

// Mock function to fetch appointment details
const fetchAppointment = (id: string) => {
  // In a real app, this would be an API call
  return {
    id: parseInt(id),
    date: "'2023-06-15'",
    time: "'10:00'",
    petName: "'Max'",
    petType: "'dog'",
    service: "'Consulta general'",
    comments: "'Checkup de rutina'"
  }
}

// Available services
const services = [
  "Consulta general",
  "Vacunación",
  "Desparasitación",
  "Cirugía",
  "Limpieza dental",
  "Control de rutina"
]

export default function ModificarCita({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [date, setDate] = useState<Date>()
  const [appointment, setAppointment] = useState<any>(null)

  useEffect(() => {
    const appointmentData = fetchAppointment(params.id)
    setAppointment(appointmentData)
    setDate(new Date(appointmentData.date))
  }, [params.id])

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    // Here you would typically send the updated form data to your backend
    console.log("'Form submitted'")
    // Navigate to the appropriate page based on user role
    const userRole = localStorage.getItem("'userRole'")
    if (userRole === "'recepcionista'") {
      router.push("'/citas-existentes'")
    } else {
      router.push("'/agendar-cita'")
    }
  }

  if (!appointment) {
    return <div>Loading...</div>
  }

  return (
    <>
      <Navigation />
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Modificar Cita</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="petName">Nombre de la Mascota</Label>
            <Input id="petName" defaultValue={appointment.petName} required />
          </div>
          <div>
            <Label htmlFor="petType">Tipo de Mascota</Label>
            <Select defaultValue={appointment.petType} required>
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
            <Select defaultValue={appointment.service} required>
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
            <Textarea id="comments" defaultValue={appointment.comments} placeholder="Comentarios adicionales" />
          </div>
          <Button type="submit">Guardar Cambios</Button>
        </form>
      </div>
    </>
  )
}

