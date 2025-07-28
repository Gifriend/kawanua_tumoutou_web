import type React from 'react';
import Image from 'next/image';

const HeroContent: React.FC = () => (
  <div className="relative z-10 h-screen flex items-center justify-center px-4">
    <Image
      src="/Derawan.jpeg?height=1080&width=1920"
      alt="Pulau Derawan"
      fill
      className="absolute inset-0 -z-10 object-cover"
    />
    <div className="text-center max-w-4xl mx-auto">
      <h1 className="text-5xl md:text-6xl font-bold text-white drop-shadow-[2px_2px_0_black] mb-6 leading-tight animate-fade-in hover:scale-105 transition-transform duration-300">
        <span className="bg-white/40 backdrop-blur-md px-4 py-2 inline-block rounded-lg">
          Pulau Derawan
        </span>
      </h1>

      <p className="text-sm md:text-lg font-bold text-white drop-shadow-[1px_1px_0_black] mb-6 leading-tight animate-fade-in hover:scale-105 transition-transform duration-300">
        <span className="bg-white/40 backdrop-blur-md px-4 py-2 inline-block rounded-lg">
          Kepulauan Derawan adalah sebuah kepulauan yang berada di Kabupaten Berau, Kalimantan Timur. Di kepulauan ini terdapat sejumlah objek wisata bahari menawan, salah satunya Taman Bawah Laut yang diminati wisatawan mancanegara terutama para penyelam kelas dunia.
        </span>
      </p>
    </div>
  </div>
);

export default HeroContent;
