'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Navigation from '@/components/Navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export default function RegistrarMascota() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const userRole = localStorage.getItem('userRole')
    setIsLoggedIn(!!userRole && userRole === 'cliente')
    if (!userRole || userRole !== 'cliente') {
      router.push('/login')
    }
  }, [router])

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    // Here you would typically send the form data to your backend
    console.log('Form submitted')
    // Optionally, redirect to another page or clear the form
  }

  if (!isLoggedIn) {
    return null // or a loading spinner
  }

  return (
    <>
      <Navigation />
      <div className="container mx-auto p-4">
        <Card>
          <CardHeader>
            <CardTitle>Registrar Nueva Mascota</CardTitle>
            <CardDescription>Ingresa los datos de tu nueva mascota</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="petName">Nombre de la Mascota</Label>
                <Input id="petName" required />
              </div>
              <div>
                <Label htmlFor="petType">Tipo de Mascota</Label>
                <Select required>
                  <SelectTrigger id="petType">
                    <SelectValue placeholder="Seleccionar tipo de mascota" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="dog">Perro</SelectItem>
                    <SelectItem value="cat">Gato</SelectItem>
                    <SelectItem value="bird">Ave</SelectItem>
                    <SelectItem value="other">Otro</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="breed">Raza</Label>
                <Input id="breed" required />
              </div>
              <div>
                <Label htmlFor="birthDate">Fecha de Nacimiento</Label>
                <Input id="birthDate" type="date" required />
              </div>
              <div>
                <Label htmlFor="weight">Peso (kg)</Label>
                <Input id="weight" type="number" step="0.1" required />
              </div>
              <Button type="submit">Registrar Mascota</Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </>
  )
}

