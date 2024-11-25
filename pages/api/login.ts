import type { NextApiRequest, NextApiResponse } from 'next'
import connection from '../../db'
import { RowDataPacket } from 'mysql2'

interface UserRow extends RowDataPacket {
  Tipo: string;
  NombreUsuario: string;
  Contrasena: string;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).end()
  }

  const { username, password } = req.body

  try {
    const [rows] = await connection.execute<UserRow[]>(
      'SELECT * FROM usuarios WHERE NombreUsuario = ? AND Contrasena = ?',
      [username, password]
    )

    if (Array.isArray(rows) && rows.length > 0) {
      const user = rows[0]
      res.status(200).json({ role: user.Tipo })
    } else {
      res.status(401).json({ error: 'Usuario o contraseña incorrectos' })
    }
  } catch (error) {
    console.error('Login error:', error)
    res.status(500).json({ error: 'Error al conectar con la base de datos' })
  }
} 