'use client'

import { useEffect, useState } from 'react'
import Navigation from '@/components/Navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import ProtectedRoute from '@/components/ProtectedRoute'
import { useSession } from 'next-auth/react'

interface Pet {
  id: number;
  name: string;
  type: string;
  breed: string;
}

function PetForm({ onBack }: { onBack: () => void }) {
  const [formData, setFormData] = useState({
    petName: '',
    petType: '',
    breed: ''
  })

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    // Here you would send the form data to your backend
    console.log('Form submitted', formData)
    // After successful submission:
    onBack()
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target
    setFormData(prev => ({
      ...prev,
      [id]: value
    }))
  }

  const handleSelectChange = (value: string) => {
    setFormData(prev => ({
      ...prev,
      petType: value
    }))
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle>Registrar Nueva Mascota</CardTitle>
            <CardDescription>Ingresa los datos de tu nueva mascota</CardDescription>
          </div>
          <Button variant="outline" onClick={onBack}>Volver</Button>
        </div>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="petName">Nombre</Label>
            <Input 
              id="petName" 
              value={formData.petName}
              onChange={handleInputChange}
              required 
            />
          </div>
          <div>
            <Label htmlFor="petType">Tipo</Label>
            <Select required onValueChange={handleSelectChange} value={formData.petType}>
              <SelectTrigger id="petType">
                <SelectValue placeholder="Seleccionar tipo de mascota" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="perro">Perro</SelectItem>
                <SelectItem value="gato">Gato</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="breed">Raza</Label>
            <Input 
              id="breed" 
              value={formData.breed}
              onChange={handleInputChange}
              required 
            />
          </div>
          <Button type="submit">Registrar Mascota</Button>
        </form>
      </CardContent>
    </Card>
  )
}

export default function GestionarMascotas() {
  const [showNewPetForm, setShowNewPetForm] = useState(false)
  const [pets, setPets] = useState<Pet[]>([])
  const [loading, setLoading] = useState(true)
  const { data: session } = useSession()

  useEffect(() => {
    const fetchPets = async () => {
      if (!session) {
        setLoading(false)
        return
      }

      try {
        setLoading(true)
        // Replace with your actual API endpoint
        const response = await fetch('/api/pets')
        if (!response.ok) {
          throw new Error(`Error al cargar las mascotas: ${response.status}`)
        }
        const data = await response.json()
        setPets(data)
      } catch (error) {
        console.error('Error fetching pets:', error)
        setPets([])
      } finally {
        setLoading(false)
      }
    }

    fetchPets()
  }, [session])

  if (showNewPetForm) {
    return (
      <ProtectedRoute>
        <Navigation />
        <div className="container mx-auto p-4">
          <PetForm onBack={() => setShowNewPetForm(false)} />
        </div>
      </ProtectedRoute>
    )
  }

  return (
    <ProtectedRoute>
      <Navigation />
      <div className="container mx-auto p-4">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Mis Mascotas</h1>
          <Button onClick={() => setShowNewPetForm(true)}>
            Registrar Nueva Mascota
          </Button>
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nombre</TableHead>
              <TableHead>Tipo</TableHead>
              <TableHead>Raza</TableHead>
              <TableHead>Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={4} className="text-center">
                  Cargando mascotas...
                </TableCell>
              </TableRow>
            ) : pets.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} className="text-center">
                  No hay mascotas registradas
                </TableCell>
              </TableRow>
            ) : (
              pets.map((pet) => (
                <TableRow key={pet.id}>
                  <TableCell>{pet.name}</TableCell>
                  <TableCell>{pet.type === 'perro' ? 'Perro' : 'Gato'}</TableCell>
                  <TableCell>{pet.breed}</TableCell>
                  <TableCell>
                    <Button variant="outline" size="sm">
                      Editar
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </ProtectedRoute>
  )
}

