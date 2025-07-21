import type React from 'react';
import Image from 'next/image';

const HeroContent: React.FC = () => (
  <div className="relative z-10 h-screen flex items-center justify-center px-4 bg-[">
    <Image
      src="/Derawan.jpeg?height=1080&width=1920"
      alt="Pulau Derawan"
      fill
      className="absolute inset-0 -z-10 object-cover"
    />
    <div className="text-center max-w-4xl mx-auto">
      <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight animate-fade-in hover:scale-105 transition-transform duration-300">
        <span className="bg-blue-950 px-4 py-1 inline-block rounded-md">
          Kawanua
        </span>
        <br />
        <span className="bg-blue-950 px-4 py-1 inline-block rounded-md">
          Tumou Tou
        </span>
      </h1>

      <p className="text-2xl md:text-xl text-white mb-8 max-w-2xl mx-auto leading-relaxed animate-fade-in font-bold bg-blue-950 rounded-md hover:scale-105 transition-transform duration-300">
        Membangun masa depan yang lebih baik melalui persatuan, gotong royong,
        dan semangat Tumou Tou - hidup untuk menghidupkan sesama.
      </p>
    </div>
  </div>
);

export default HeroContent;
