import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import Link from "'next/link'"

export default function GestionarInventarios() {
  const inventarios = [
    { id: 1, producto: "Vacuna A", cantidad: 100, ubicacion: "Almacén 1" },
    { id: 2, producto: "Medicamento B", cantidad: 50, ubicacion: "Farmacia" },
    { id: 3, producto: "Alimento C", cantidad: 200, ubicacion: "Almacén 2" },
  ]

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Gestionar Inventarios</h1>
      <form className="space-y-4 mb-8">
        <div>
          <Label htmlFor="producto">Producto</Label>
          <Input type="text" id="producto" placeholder="Nombre del producto" />
        </div>
        <div>
          <Label htmlFor="cantidad">Cantidad</Label>
          <Input type="number" id="cantidad" placeholder="Cantidad" />
        </div>
        <div>
          <Label htmlFor="ubicacion">Ubicación</Label>
          <Input type="text" id="ubicacion" placeholder="Ubicación" />
        </div>
        <Button type="submit">Agregar Producto</Button>
      </form>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Producto</TableHead>
            <TableHead>Cantidad</TableHead>
            <TableHead>Ubicación</TableHead>
            <TableHead>Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {inventarios.map((item) => (
            <TableRow key={item.id}>
              <TableCell>{item.producto}</TableCell>
              <TableCell>{item.cantidad}</TableCell>
              <TableCell>{item.ubicacion}</TableCell>
              <TableCell>
                <Button variant="outline" size="sm" className="mr-2">Editar</Button>
                <Button variant="destructive" size="sm">Eliminar</Button>
              </TableCell>
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

