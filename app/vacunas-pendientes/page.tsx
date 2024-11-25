"'use client'"

import { useEffect, useState } from "'react'"
import { useRouter } from "'next/navigation'"
import Navigation from "'@/components/Navigation'"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "'next/link'"

// Mock data for pending vaccines
const mockPendingVaccines = [
  { id: 1, petName: "Max", vaccine: "Rabia", dueDate: "2023-07-15" },
  { id: 2, petName: "Luna", vaccine: "Parvovirus", dueDate: "2023-07-20" },
  { id: 3, petName: "Rocky", vaccine: "Moquillo", dueDate: "2023-08-05" },
]

export default function VacunasPendientes() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const userRole = localStorage.getItem("'userRole'")
    setIsLoggedIn(!!userRole && userRole === "'cliente'")
    if (!userRole || userRole !== "'cliente'") {
      router.push("'/login'")
    }
  }, [router])

  if (!isLoggedIn) {
    return null // or a loading spinner
  }

  return (
    <>
      <Navigation />
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Vacunas Pendientes</h1>
        {mockPendingVaccines.length > 0 ? (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Mascota</TableHead>
                <TableHead>Vacuna</TableHead>
                <TableHead>Fecha Prevista</TableHead>
                <TableHead>Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockPendingVaccines.map((vaccine) => (
                <TableRow key={vaccine.id}>
                  <TableCell>{vaccine.petName}</TableCell>
                  <TableCell>{vaccine.vaccine}</TableCell>
                  <TableCell>{vaccine.dueDate}</TableCell>
                  <TableCell>
                    <Button asChild>
                      <Link href="/agendar-cita">Agendar Cita</Link>
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <Card>
            <CardHeader>
              <CardTitle>No hay vacunas pendientes</CardTitle>
              <CardDescription>Todas las vacunas de tus mascotas están al día.</CardDescription>
            </CardHeader>
          </Card>
        )}
      </div>
    </>
  )
}

