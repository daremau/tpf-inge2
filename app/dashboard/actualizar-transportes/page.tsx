"'use client'"

import { useEffect, useState } from "'react'"
import { useSearchParams } from "'next/navigation'"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Link from "'next/link'"

export default function ActualizarTransportes() {
  const searchParams = useSearchParams()
  const id = searchParams.get("'id'")
  const [transporteId, setTransporteId] = useState(id || "''")

  useEffect(() => {
    if (id) {
      setTransporteId(id)
      // Here you would typically fetch the transport details using the ID
      // and pre-fill the form fields
    }
  }, [id])

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Actualizar Estado de Transportes</h1>
      <form className="space-y-4">
        <div>
          <Label htmlFor="transporte">ID del Transporte</Label>
          <Input 
            type="text" 
            id="transporte" 
            value={transporteId}
            onChange={(e) => setTransporteId(e.target.value)}
            placeholder="ID del transporte" 
          />
        </div>
        <div>
          <Label htmlFor="estado">Nuevo Estado</Label>
          <Select>
            <SelectTrigger id="estado">
              <SelectValue placeholder="Seleccionar estado" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="en_camino">En camino</SelectItem>
              <SelectItem value="entregado">Entregado</SelectItem>
              <SelectItem value="cancelado">Cancelado</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="comentarios">Comentarios</Label>
          <Input type="text" id="comentarios" placeholder="Comentarios adicionales" />
        </div>
        <Button type="submit">Actualizar Estado</Button>
      </form>
      <div className="mt-4">
        <Link href="/dashboard" className="text-blue-500 hover:underline">Volver al Dashboard</Link>
      </div>
    </div>
  )
}

