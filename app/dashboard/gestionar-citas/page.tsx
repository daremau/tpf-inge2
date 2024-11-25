import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "'next/link'"

export default function GestionarCitas() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Gestionar Citas</h1>
      <form className="space-y-4">
        <div>
          <Label htmlFor="fecha">Fecha</Label>
          <Input type="date" id="fecha" />
        </div>
        <div>
          <Label htmlFor="cliente">Cliente</Label>
          <Input type="text" id="cliente" placeholder="Nombre del cliente" />
        </div>
        <div>
          <Label htmlFor="mascota">Mascota</Label>
          <Input type="text" id="mascota" placeholder="Nombre de la mascota" />
        </div>
        <div>
          <Label htmlFor="servicio">Servicio</Label>
          <Input type="text" id="servicio" placeholder="Tipo de servicio" />
        </div>
        <Button type="submit">Agendar Cita</Button>
      </form>
      <div className="mt-4">
        <Link href="/dashboard" className="text-blue-500 hover:underline">Volver al Dashboard</Link>
      </div>
    </div>
  )
}

