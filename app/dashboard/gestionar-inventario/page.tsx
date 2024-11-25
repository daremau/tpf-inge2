import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import Link from 'next/link'

export default function GestionarInventario() {
  const inventario = [
    {
      id: 1,
      nombre: 'Vacuna Antirrábica',
      cantidad: 50,
      precio: 25.00,
      categoria: 'Vacunas'
    },
    {
      id: 2,
      nombre: 'Desparasitante',
      cantidad: 30,
      precio: 15.00,
      categoria: 'Medicamentos'
    },
    // Add more items as needed
  ]

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Gestionar Inventario</h1>
      
      <div className="mb-6">
        <Button asChild>
          <Link href="/dashboard/agregar-producto">Agregar Nuevo Producto</Link>
        </Button>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nombre</TableHead>
            <TableHead>Cantidad</TableHead>
            <TableHead>Precio</TableHead>
            <TableHead>Categoría</TableHead>
            <TableHead>Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {inventario.map((item) => (
            <TableRow key={item.id}>
              <TableCell>{item.nombre}</TableCell>
              <TableCell>{item.cantidad}</TableCell>
              <TableCell>S/. {item.precio.toFixed(2)}</TableCell>
              <TableCell>{item.categoria}</TableCell>
              <TableCell>
                <Button variant="outline" size="sm" asChild>
                  <Link href={`/dashboard/editar-producto/${item.id}`}>
                    Editar
                  </Link>
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

