'use client'

import { useState } from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function VerCitas() {
  const [citas] = useState([
    {
      id: 1,
      fecha: '2024-03-25',
      hora: '10:00',
      paciente: 'Max',
      propietario: 'Juan Pérez',
      servicio: 'Consulta general'
    },
    {
      id: 2,
      fecha: '2024-03-25',
      hora: '11:30',
      paciente: 'Luna',
      propietario: 'María García',
      servicio: 'Vacunación'
    }
  ])

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Gestionar Citas</h1>
      
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Fecha</TableHead>
            <TableHead>Hora</TableHead>
            <TableHead>Paciente</TableHead>
            <TableHead>Propietario</TableHead>
            <TableHead>Servicio</TableHead>
            <TableHead>Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {citas.map((cita) => (
            <TableRow key={cita.id}>
              <TableCell>{cita.fecha}</TableCell>
              <TableCell>{cita.hora}</TableCell>
              <TableCell>{cita.paciente}</TableCell>
              <TableCell>{cita.propietario}</TableCell>
              <TableCell>{cita.servicio}</TableCell>
              <TableCell>
                <Button variant="outline" size="sm" asChild className="mr-2">
                  <Link href={`/dashboard/editar-cita/${cita.id}`}>
                    Editar
                  </Link>
                </Button>
                <Button variant="outline" size="sm" asChild>
                  <Link href={`/dashboard/historial/${cita.id}`}>
                    Ver Historial
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

