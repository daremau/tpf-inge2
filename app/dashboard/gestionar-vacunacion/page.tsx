import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import Link from "'next/link'"

export default function GestionarVacunacion() {
  const vacunas = [
    { id: 1, mascota: "Max", propietario: "Juan Pérez", vacuna: "Rabia", fecha: "2023-05-15" },
    { id: 2, mascota: "Luna", propietario: "María García", vacuna: "Parvovirus", fecha: "2023-05-20" },
    { id: 3, mascota: "Rocky", propietario: "Carlos López", vacuna: "Moquillo", fecha: "2023-05-25" },
  ]

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Gestionar Vacunación</h1>
      <form className="space-y-4 mb-8">
        <div>
          <Label htmlFor="mascota">Mascota</Label>
          <Input type="text" id="mascota" placeholder="Nombre de la mascota" />
        </div>
        <div>
          <Label htmlFor="propietario">Propietario</Label>
          <Input type="text" id="propietario" placeholder="Nombre del propietario" />
        </div>
        <div>
          <Label htmlFor="vacuna">Vacuna</Label>
          <Input type="text" id="vacuna" placeholder="Tipo de vacuna" />
        </div>
        <div>
          <Label htmlFor="fecha">Fecha</Label>
          <Input type="date" id="fecha" />
        </div>
        <Button type="submit">Registrar Vacunación</Button>
      </form>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Mascota</TableHead>
            <TableHead>Propietario</TableHead>
            <TableHead>Vacuna</TableHead>
            <TableHead>Fecha</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {vacunas.map((vacuna) => (
            <TableRow key={vacuna.id}>
              <TableCell>{vacuna.mascota}</TableCell>
              <TableCell>{vacuna.propietario}</TableCell>
              <TableCell>{vacuna.vacuna}</TableCell>
              <TableCell>{vacuna.fecha}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="mt-4">
        <Link href="/dashboard" className="text-blue-500 hover:underline">Volver al Dashboard</Link>
      </div>
    </div>
  )
}

