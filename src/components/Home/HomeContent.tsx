import type React from "react"
import Image from "next/image"

const HeroContent: React.FC = () => (
  <div className="relative z-10 h-screen flex items-center justify-center px-4">
    <Image
      src="/derawan.png?height=1080&width=1920"
      alt="Pulau Derawan"
      fill
      className="absolute inset-0 -z-10 object-cover"
    />
    <div className="text-center max-w-4xl mx-auto">
      <h1
        className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight animate-fade-in hover:scale-105 transition-transform duration-300"
        style={{ animationDelay: "0.2s" }}
      >
        <span className="bg-gradient-to-r from-blue-300 via-cyan-300 to-blue-300 bg-clip-text text-transparent">
          Kawanua
        </span>
        <br />
        <span className="text-white">Tumou Tou</span>
      </h1>
      <p
        className="text-xl md:text-2xl text-yellow-400 mb-8 max-w-2xl mx-auto leading-relaxed animate-fade-in"
        style={{ animationDelay: "0.4s" }}
      >
        Membangun masa depan yang lebih baik melalui persatuan, gotong royong, dan semangat Tumou Tou - hidup untuk
        menghidupkan sesama.
      </p>
    </div>
  </div>
)

export default HeroContent
