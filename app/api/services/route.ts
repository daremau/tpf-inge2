import { NextResponse } from 'next/server'
import db from '@/db'
import { RowDataPacket } from 'mysql2'

interface Service extends RowDataPacket {
  IdServicio: number;
  NombreServicio: string;
  Descripcion: string;
  Precio: number;
}

export async function GET() {
  try {
    const [services] = await db.query<Service[]>(
      'SELECT IdServicio, NombreServicio as Nombre, Descripcion, Precio FROM servicios'
    );

    if (!services || services.length === 0) {
      return NextResponse.json([])
    }

    return NextResponse.json(services)
  } catch (error) {
    console.error('Error fetching services:', error)
    return NextResponse.json(
      { error: 'Error al obtener los servicios' }, 
      { status: 500 }
    )
  }
} 