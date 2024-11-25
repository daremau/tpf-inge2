import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]/route';
import db from '@/db';
import { RowDataPacket, ResultSetHeader } from 'mysql2';

interface UserRow extends RowDataPacket {
  IdUsuario: number;
  TipoUsuario: string;
  IdCliente: number;
}

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const userEmail = session.user?.email;

    // First check if user exists and get their type
    const userQuery = `
      SELECT u.IdUsuario, u.TipoUsuario, c.IdCliente 
      FROM Usuarios u
      LEFT JOIN Clientes c ON u.IdUsuario = c.IdUsuario
      WHERE u.Email = ? AND u.TipoUsuario = 'Cliente'
    `;

    const [users] = await db.query<UserRow[]>(userQuery, [userEmail]);
    
    if (!users || users.length === 0) {
      return NextResponse.json({ error: 'Cliente no encontrado' }, { status: 404 });
    }

    const { IdCliente } = users[0];

    const query = `
      SELECT 
        c.IdCita,
        m.Nombre as NombreMascota,
        s.Nombre as NombreServicio,
        c.FechaHora,
        c.Estado,
        c.NotasCliente
      FROM Citas c
      JOIN Mascotas m ON c.IdMascota = m.IdMascota
      JOIN Servicios s ON c.IdServicio = s.IdServicio
      JOIN Clientes cl ON m.IdCliente = cl.IdCliente
      WHERE cl.IdCliente = ?
      ORDER BY c.FechaHora DESC
    `;

    const [appointments] = await db.query(query, [IdCliente]);
    
    return NextResponse.json(appointments);
  } catch (error) {
    console.error('Error in appointments API:', error);
    return NextResponse.json(
      { error: 'Error al obtener las citas' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { idMascota, idServicio, fechaHora, notasCliente } = await request.json()

    // Get IdCliente from the session user's email
    const [users] = await db.query<UserRow[]>(
      'SELECT IdCliente FROM Clientes WHERE Email = ?',
      [session.user?.email]
    );

    if (!users || users.length === 0) {
      return NextResponse.json({ error: 'Cliente no encontrado' }, { status: 404 });
    }

    const [result] = await db.query<ResultSetHeader>(
      `INSERT INTO Citas (IdCliente, IdMascota, IdServicio, FechaHora, Estado, NotasCliente)
       VALUES (?, ?, ?, ?, 'Pendiente', ?)`,
      [users[0].IdCliente, idMascota, idServicio, fechaHora, notasCliente || null]
    );

    return NextResponse.json({ message: 'Cita creada exitosamente', id: result.insertId })
  } catch (error) {
    console.error('Error creating appointment:', error)
    return NextResponse.json({ error: 'Error al crear la cita' }, { status: 500 })
  }
} 