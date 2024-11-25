"'use client'"

import { useState, useEffect } from "'react'"
import { useRouter } from "'next/navigation'"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "'next/link'"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

// Mock data for appointments
const mockAppointments = [
  { id: 1, date: "2023-06-01", time: "10:00", client: "Juan Pérez", pet: "Max", service: "Consulta general" },
  { id: 2, date: "2023-06-02", time: "14:30", client: "María García", pet: "Luna", service: "Vacunación" },
  { id: 3, date: "2023-06-03", time: "11:00", client: "Carlos López", pet: "Rocky", service: "Desparasitación" },
]

// Mock function to fetch appointment details
const fetchAppointment = (id: string) => {
  // Find the appointment in the mock data
  const appointment = mockAppointments.find(apt => apt.id === parseInt(id))
  
  // If not found, return a default appointment
  if (!appointment) {
    throw new Error("'Appointment not found'")
  }
  
  return {
    ...appointment,
    status: "'Pendiente'" // Add any additional fields needed
  }
}

// Mock data for pet's medical history
const mockMedicalHistory = [
  { id: 1, date: "'2023-01-15'", diagnosis: "'Vacunación anual'", treatment: "'Aplicación de vacunas contra rabia y moquillo'" },
  { id: 2, date: "'2023-03-20'", diagnosis: "'Infección de oído'", treatment: "'Antibióticos y limpieza del canal auditivo'" },
  { id: 3, date: "'2023-05-10'", diagnosis: "'Control de rutina'", treatment: "'Sin tratamiento, estado de salud óptimo'" },
]

const availableVaccines = [
  "Rabia",
  "Parvovirus",
  "Moquillo",
  "Leptospirosis",
  "Hepatitis canina",
  "Leucemia felina",
  "Triple felina",
]

export default function DetallesCita({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [appointment, setAppointment] = useState<any>(null)
  const [products, setProducts] = useState<string[]>([])
  const [newProduct, setNewProduct] = useState("''")
  const [vaccine, setVaccine] = useState("''")
  const [medicalConsultation, setMedicalConsultation] = useState("''")
  const [status, setStatus] = useState("'Pendiente'")
  const [medicalHistory, setMedicalHistory] = useState(mockMedicalHistory)

  useEffect(() => {
    const appointmentData = fetchAppointment(params.id)
    setAppointment(appointmentData)
    setStatus(appointmentData.status)
  }, [params.id])

  const handleAddProduct = () => {
    if (newProduct) {
      setProducts([...products, newProduct])
      setNewProduct("''")
    }
  }

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    // Here you would typically send the updated data to your backend
    console.log("'Appointment updated'", { appointment, products, vaccine, medicalConsultation, status })
    router.push("'/dashboard/ver-citas'")
  }

  if (!appointment) {
    return <div>Cargando...</div>
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Detalles de la Cita</h1>
      <Card>
        <CardHeader>
          <CardTitle>{appointment.pet} - {appointment.service}</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Fecha: {appointment.date}</p>
          <p>Hora: {appointment.time}</p>
          <p>Cliente: {appointment.client}</p>
        </CardContent>
      </Card>

      <form onSubmit={handleSubmit} className="mt-4 space-y-4">
        <div>
          <Label htmlFor="products">Productos Usados</Label>
          <div className="flex space-x-2">
            <Input
              id="products"
              value={newProduct}
              onChange={(e) => setNewProduct(e.target.value)}
              placeholder="Agregar producto"
            />
            <Button type="button" onClick={handleAddProduct}>Agregar</Button>
          </div>
          <ul className="mt-2 list-disc list-inside">
            {products.map((product, index) => (
              <li key={index}>{product}</li>
            ))}
          </ul>
        </div>

        {appointment.service === "'Vacunación'" && (
          <div>
            <Label htmlFor="vaccine">Vacuna Aplicada</Label>
            <Select value={vaccine} onValueChange={setVaccine}>
              <SelectTrigger id="vaccine">
                <SelectValue placeholder="Seleccionar vacuna" />
              </SelectTrigger>
              <SelectContent>
                {availableVaccines.map((vac) => (
                  <SelectItem key={vac} value={vac}>{vac}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}

        <div>
          <Label htmlFor="consultation">Consulta Médica</Label>
          <Textarea
            id="consultation"
            value={medicalConsultation}
            onChange={(e) => setMedicalConsultation(e.target.value)}
            placeholder="Detalles de la consulta médica"
          />
        </div>

        <div>
          <Label htmlFor="status">Estado de la Cita</Label>
          <Select value={status} onValueChange={setStatus}>
            <SelectTrigger id="status">
              <SelectValue placeholder="Seleccionar estado" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Pendiente">Pendiente</SelectItem>
              <SelectItem value="Realizada">Realizada</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Button type="submit">Guardar Cambios</Button>
      </form>

      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">Historial Médico</h2>
        <Accordion type="single" collapsible className="w-full">
          {medicalHistory.map((record) => (
            <AccordionItem key={record.id} value={`item-${record.id}`}>
              <AccordionTrigger>{record.date} - {record.diagnosis}</AccordionTrigger>
              <AccordionContent>
                <p><strong>Diagnóstico:</strong> {record.diagnosis}</p>
                <p><strong>Tratamiento:</strong> {record.treatment}</p>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>

      <div className="mt-4">
        <Link href="/dashboard/ver-citas" className="text-blue-500 hover:underline">Volver a Ver Citas</Link>
      </div>
    </div>
  )
}

