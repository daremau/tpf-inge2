import { Button } from '@/components/ui/button'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import Link from 'next/link'

export default function TransportesPendientes() {
  const transportes = [
    {
      id: 1,
      fecha: '2024-03-25',
      hora: '09:00',
      cliente: 'Juan Pérez',
      direccion: 'Av. Las Palmeras 123',
      estado: 'Pendiente'
    },
    {
      id: 2,
      fecha: '2024-03-25',
      hora: '10:30',
      cliente: 'María García',
      direccion: 'Jr. Los Pinos 456',
      estado: 'En Proceso'
    }
  ]

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Transportes Pendientes</h1>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Fecha</TableHead>
            <TableHead>Hora</TableHead>
            <TableHead>Cliente</TableHead>
            <TableHead>Dirección</TableHead>
            <TableHead>Estado</TableHead>
            <TableHead>Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {transportes.map((transporte) => (
            <TableRow key={transporte.id}>
              <TableCell>{transporte.fecha}</TableCell>
              <TableCell>{transporte.hora}</TableCell>
              <TableCell>{transporte.cliente}</TableCell>
              <TableCell>{transporte.direccion}</TableCell>
              <TableCell>{transporte.estado}</TableCell>
              <TableCell>
                <Button variant="outline" size="sm" asChild className="mr-2">
                  <Link href={`/dashboard/actualizar-transporte/${transporte.id}`}>
                    Actualizar Estado
                  </Link>
                </Button>
                <Button variant="outline" size="sm" asChild>
                  <Link href={`/dashboard/detalles-transporte/${transporte.id}`}>
                    Ver Detalles
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

