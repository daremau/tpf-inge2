import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import Link from "'next/link'"

export default function ServiciosClientes() {
  const servicios = [
    { id: 1, nombre: "Consulta general", precio: 50 },
    { id: 2, nombre: "Vacunación", precio: 30 },
    { id: 3, nombre: "Desparasitación", precio: 25 },
    { id: 4, nombre: "Baño y peluquería", precio: 40 },
  ]

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Servicios para Clientes</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {servicios.map((servicio) => (
          <Card key={servicio.id}>
            <CardHeader>
              <CardTitle>{servicio.nombre}</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Precio: ${servicio.precio}</p>
              <Button className="mt-2">Reservar</Button>
            </CardContent>
          </Card>
        ))}
      </div>
      <div className="mt-4">
        <Link href="/dashboard" className="text-blue-500 hover:underline">Volver al Dashboard</Link>
      </div>
    </div>
  )
}

