import { Facebook, Instagram, Mail, MapPin, Phone } from 'lucide-react'

export default function ContactSidebar() {
  return (
    <div className="fixed right-0 top-1/3 bg-white p-6 shadow-lg rounded-l-lg">
      <div className="space-y-6">
        <div>
          <h3 className="font-bold mb-2">SÍGUENOS</h3>
          <div className="flex space-x-2">
            <a 
              href="https://www.facebook.com/wonderpetpy/?locale=es_LA" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="p-2 hover:text-neutral-900 dark:hover:text-neutral-50"
            >
              <Facebook className="h-5 w-5" />
              <span className="sr-only">Facebook</span>
            </a>
            <a 
              href="https://www.instagram.com/wonderpetpy/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="p-2 hover:text-neutral-900 dark:hover:text-neutral-50"
            >
              <Instagram className="h-5 w-5" />
              <span className="sr-only">Instagram</span>
            </a>
          </div>
        </div>
        
        <div>
          <h3 className="font-bold mb-2">CONTACTOS</h3>
          <div className="space-y-2">
            <a href="tel:(0991)798999" className="flex items-center space-x-2 hover:text-neutral-900 p-1 dark:hover:text-neutral-50">
              <Phone className="h-4 w-4 flex-shrink-0" />
              <span>(0991) 798 999</span>
            </a>
            <a href="mailto:wonderpets@gmail.com" className="flex items-center space-x-2 hover:text-neutral-900 p-1 dark:hover:text-neutral-50">
              <Mail className="h-4 w-4 flex-shrink-0" />
              <span>wonderpets@gmail.com</span>
            </a>
          </div>
        </div>
        
        <div>
          <h3 className="font-bold mb-2">LOCATION</h3>
          <div className="flex items-start space-x-2">
            <MapPin className="h-4 w-4 mt-1" />
            <div>
              <p>24 de Junio c/ José Rivera</p>
              <p>San Lorenzo</p>
              <p>Villa del Maestro</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

