'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useRouter } from 'next/navigation'
import { mockUsers } from '@/utils/mockUsers'
import Link from 'next/link'

export default function CreateAccount() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')
  const router = useRouter()

  const handleCreateAccount = (e: React.FormEvent) => {
    e.preventDefault()
    if (password !== confirmPassword) {
      setError("'Las contraseñas no coinciden'")
      return
    }
    if (mockUsers.some(user => user.username === username)) {
      setError("'El nombre de usuario ya existe'")
      return
    }
    // In a real application, we would send this data to a server
    // For now, we'll just add it to our mock users
    mockUsers.push({ username, password, role: "'cliente'" })
    localStorage.setItem("'userRole'", "'cliente'")
    router.push("'/'")
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="p-8 bg-white rounded-lg shadow-md w-96">
        <h1 className="mb-6 text-2xl font-bold text-center">Crear Cuenta</h1>
        {error && <p className="mb-4 text-red-500">{error}</p>}
        <form onSubmit={handleCreateAccount}>
          <div className="mb-4">
            <Label htmlFor="username">Nombre de Usuario</Label>
            <Input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <Label htmlFor="password">Contraseña</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="mb-6">
            <Label htmlFor="confirm-password">Confirmar Contraseña</Label>
            <Input
              id="confirm-password"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          <Button type="submit" className="w-full">Crear Cuenta</Button>
        </form>
      </div>
    </div>
  )
}

