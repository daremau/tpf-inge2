'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Navigation from '@/components/Navigation'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import ProtectedRoute from '@/components/ProtectedRoute'

export default function VacunasPendientes() {
  const [vaccineData, setVaccineData] = useState([
    {
      id: 1,
      petName: 'Max',
      vaccineName: 'Rabia',
      dueDate: '2024-04-15',
      status: 'Pendiente'
    },
    // Add more mock data as needed
  ])

  return (
    <ProtectedRoute>
      <Navigation />
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Vacunas Pendientes</h1>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Mascota</TableHead>
              <TableHead>Vacuna</TableHead>
              <TableHead>Fecha</TableHead>
              <TableHead>Estado</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {vaccineData.map((vaccine) => (
              <TableRow key={vaccine.id}>
                <TableCell>{vaccine.petName}</TableCell>
                <TableCell>{vaccine.vaccineName}</TableCell>
                <TableCell>{vaccine.dueDate}</TableCell>
                <TableCell>{vaccine.status}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </ProtectedRoute>
  )
}

