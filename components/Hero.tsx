export default function Hero() {
  return (
    <div className="min-h-screen bg-[#e6ffe6] relative overflow-hidden">
      <div className="container mx-auto px-4 py-12 relative z-10">
        <div className="max-w-2xl space-y-4">
          <h1 className="text-5xl font-bold">
            VETERINARIA
            <br />
            WONDER PET
          </h1>
          <h2 className="text-3xl font-semibold">
            SALUD Y BIENESTAR
            <br />
            ANIMAL
          </h2>
          <p className="text-xl">
            El mejor cuidado que ellos se merecen
          </p>
        </div>
      </div>
      <div className="absolute bottom-0 right-0 w-full h-full">
        <img
          src=""
          alt="Pets collage"
          className="object-cover w-full h-full opacity-50"
        />
      </div>
    </div>
  )
}

