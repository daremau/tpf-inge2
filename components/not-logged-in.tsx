import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "'next/link'"
import Navigation from "'@/components/Navigation'"

export default function NotLoggedIn() {
  return (
    <>
      <Navigation />
      <div className="container mx-auto p-4 flex items-center justify-center min-h-screen">
        <Card className="w-[350px]">
          <CardHeader>
            <CardTitle>Acceso Restringido</CardTitle>
            <CardDescription>Necesitas iniciar sesión para agendar una cita</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <Button asChild>
              <Link href="/login">Iniciar Sesión</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/create-account">Crear Cuenta</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </>
  )
}

