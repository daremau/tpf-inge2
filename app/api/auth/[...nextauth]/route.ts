import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import pool from "@/db";
import { JWT } from "next-auth/jwt"
import { Session } from "next-auth"

interface CustomUser {
  id: string;
  name: string;
  tipo?: string;
  clientId?: string;
}

declare module "next-auth" {
  interface Session {
    user: {
      tipo?: string;
      clientId?: string;
      name?: string | null;
      email?: string | null;
    }
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    tipo?: string;
    clientId?: string;
  }
}

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Usuario", type: "text" },
        password: { label: "Contraseña", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.username || !credentials?.password) {
          return null;
        }

        const [users]: any = await pool.query(
          `SELECT u.*, c.IdCliente 
           FROM Usuarios u
           LEFT JOIN Clientes c ON u.IdUsuario = c.IdUsuario
           WHERE u.NombreUsuario = ?`,
          [credentials.username]
        );

        const user = users[0];
        if (!user) {
          return null;
        }

        const isPasswordValid = credentials.password === user.Contrasena;
        if (!isPasswordValid) {
          return null;
        }

        return {
          id: user.IdUsuario.toString(),
          name: user.NombreUsuario,
          tipo: user.Tipo,
          clientId: user.IdCliente?.toString()
        };
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }: { token: JWT; user: any }) {
      if (user as CustomUser) {
        token.tipo = (user as CustomUser).tipo;
        token.clientId = (user as CustomUser).clientId;
      }
      return token;
    },
    async session({ session, token }: { session: Session, token: JWT }) {
      if (session.user) {
        session.user.tipo = token.tipo;
        session.user.clientId = token.clientId;
      }
      return session;
    }
  },
  pages: {
    signIn: '/login',
  },
  session: {
    strategy: "jwt" as const
  }
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST }; 