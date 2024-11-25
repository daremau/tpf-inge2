import { NextResponse } from 'next/server'
import db from '@/db'
import { getServerSession } from 'next-auth'
import { authOptions } from '../auth/[...nextauth]/route'
import { RowDataPacket } from 'mysql2'

interface Pet extends RowDataPacket {
  IdMascota: number;
  Nombre: string;
}

interface CustomSession {
  user?: {
    clientId?: string;
    tipo?: string;
  }
}

export async function GET() {
  try {
    const session = await getServerSession(authOptions) as CustomSession
    
    if (!session?.user) {
      return NextResponse.json({ error: 'Usuario no autenticado' }, { status: 401 })
    }

    const clientId = session.user.clientId
    if (!clientId) {
      return NextResponse.json({ error: 'Usuario no es un cliente' }, { status: 403 })
    }

    const [pets] = await db.query<Pet[]>(
      'SELECT IdMascota, Nombre FROM mascotas WHERE IdCliente = ?',
      [clientId]
    );

    return NextResponse.json(pets || [])
  } catch (error) {
    console.error('Error:', error)
    return NextResponse.json({ error: 'Error al obtener las mascotas' }, { status: 500 })
  }
}