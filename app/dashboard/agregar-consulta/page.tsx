import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import Link from "'next/link'"

export default function AgregarConsulta() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Agregar Consulta Médica</h1>
      <form className="space-y-4">
        <div>
          <Label htmlFor="mascota">Mascota</Label>
          <Input type="text" id="mascota" placeholder="Nombre de la mascota" />
        </div>
        <div>
          <Label htmlFor="propietario">Propietario</Label>
          <Input type="text" id="propietario" placeholder="Nombre del propietario" />
        </div>
        <div>
          <Label htmlFor="fecha">Fecha</Label>
          <Input type="date" id="fecha" />
        </div>
        <div>
          <Label htmlFor="motivo">Motivo de la consulta</Label>
          <Input type="text" id="motivo" placeholder="Motivo de la consulta" />
        </div>
        <div>
          <Label htmlFor="diagnostico">Diagnóstico</Label>
          <Textarea id="diagnostico" placeholder="Diagnóstico" />
        </div>
        <div>
          <Label htmlFor="tratamiento">Tratamiento</Label>
          <Textarea id="tratamiento" placeholder="Tratamiento" />
        </div>
        <Button type="submit">Registrar Consulta</Button>
      </form>
      <div className="mt-4">
        <Link href="/dashboard" className="text-blue-500 hover:underline">Volver al Dashboard</Link>
      </div>
    </div>
  )
}

