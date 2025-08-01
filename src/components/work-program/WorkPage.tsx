import React, { useState } from 'react';
import ScrollReveal from '../ui/ScrollReveal/ScrollReveal';
import TiltedCard from '../ui/TiltedCard';
import Modal from '../ui/modal';
// import Image from 'next/image';

const baktiPrograms = [
  {
    title: 'Bakti Untuk Bumi',
    imageSrc:
      '/Bakti-untuk-Bumi-Biogass.JPG',
    description: 'Dalam bakti untuk bumi ini, kami membuat biogas sebagai tempat untuk pengelolaan sampah organik, yang bisa menghasilkan gar untuk memasak, serta pupuk cair yang bisa digunakan untuk tanaman. Selain itu juga kami membuat tempat pemilah sampah berbasis Internet of Things (IoT) yang bisa menunjukan sampah organik atau anorganik.',
    images: ['/Bakti-untuk-Bumi-Biogass.JPG'],
  },
  {
    title: 'Bakti Mengalir',
    imageSrc:
      'https://blocks.astratic.com/img/general-img-square.png',
    description: 'Bakti mengalir ini kami membuat filtrasi air yang bisa digunakan untuk mengalirkan air yang siap diminum untuk masyarakat maupun turis.',
    images: [
      'https://blocks.astratic.com/img/general-img-square.png',
      'https://blocks.astratic.com/img/general-img-square.png',
    ],
  },
  {
    title: 'Bakti Cilik',
    imageSrc:
      'Bakti-Cilik-MPASI.JPG',
    description: 'Cilik adalah singkatan dari Cegah stunting Lahirkan Insan Kuat dan program ini bertujuan untuk mencegah stunting pada anak-anak.',
    images: [
      '/Bakti-Cilik-MPASI.JPG',
      '/Bakti-Cilik-MPASI.JPG',
    ],
  },
  {
    title: 'Bakti Bersih',
    imageSrc:
      'https://blocks.astratic.com/img/general-img-square.png',
    description: 'Program ini berfokus pada edukasi tentang pentingnya kebersihan gigi dan tangan dengan target anak sekolah dasar sehingga mereka dapat mengimplementasikan kebersihan diri sejak dini.',
    images: [
      'https://via.placeholder.com/300',
      'https://via.placeholder.com/300x200',
    ],
  },
  {
    title: 'Bakti Bergizi',
    imageSrc:
      'https://blocks.astratic.com/img/general-img-square.png',
    description: 'Program ini bertujuan untuk meningkatkan kesadaran akan pentingnya gizi seimbang dan pola makan sehat dengan target yang kami sasar adalah remaja dalam sekolah menengah pertama.',
    images: [
      'https://via.placeholder.com/300',
      'https://via.placeholder.com/300x200',
    ],
  },
  {
    title: 'Bakti Bergerak',
    imageSrc:
      '/Bakti-Bergerak.JPG',
    description: 'Penjelasan lengkap tentang Bakti Bergerak...',
    images: [
      '/Bakti-Bergerak.JPG',
      '/Bakti-Bergerak.JPG',
    ],
  },
  {
    title: 'Bakti Entaskan DBD & Malaria',
    imageSrc:
      '/Bakti-Entaskan-DBD.JPG',
    description: 'Penjelasan lengkap tentang Bakti Entaskan DBD & Malaria...',
    images: [
      '/Bakti-Entaskan-DBD.JPG',
      'Bakti-Entaskan-DBD.JPG',
    ],
  },
  {
    title: 'Bakti Bebas TB',
    imageSrc:
      '/Bakti-Bebas-TB.jpg',
    description: 'Penjelasan lengkap tentang Bakti Bebas TB...',
    images: [
      '/Bakti-Bebas-TB.jpg',
      '/Bakti-Bebas-TB.jpg',
    ],
  },
  {
    title: 'Bakti Bahari',
    imageSrc:
      'https://blocks.astratic.com/img/general-img-square.png',
    description: 'Penjelasan lengkap tentang Bakti Bahari...',
    images: [
      'https://via.placeholder.com/300',
      'https://via.placeholder.com/300x200',
    ],
  },
  {
    title: 'Bakti Hijau',
    imageSrc:
      'https://blocks.astratic.com/img/general-img-square.png',
    description: 'Penjelasan lengkap tentang Bakti Hijau...',
    images: [
      'https://via.placeholder.com/300',
      'https://via.placeholder.com/300x200',
    ],
  },
  
];

const WorkPage: React.FC = () => {
  const [activeProgram, setActiveProgram] = useState<
    (typeof baktiPrograms)[0] | null
  >(null);

  return (
    <div className="min-h-screen">
      <div className="text-white text-center">
        <ScrollReveal
          baseOpacity={0}
          enableBlur={true}
          baseRotation={5}
          blurStrength={10}>
          Program Kerja Tim Kawanua Tumou Tou
        </ScrollReveal>
      </div>
    
      <div className="flex flex-wrap justify-center gap-10 px-4 py-8">
        {baktiPrograms.map((program) => (
          <div
            key={program.title}
            onClick={() => setActiveProgram(program)}
            className="cursor-pointer">
            <TiltedCard
              imageSrc={program.imageSrc}
              altText={program.title}
              captionText={program.title}
              containerHeight="300px"
              containerWidth="300px"
              imageHeight="300px"
              imageWidth="300px"
              rotateAmplitude={12}
              scaleOnHover={1.2}
              showMobileWarning={false}
              showTooltip={true}
              displayOverlayContent={true}
              overlayContent={
                <p className="tilted-card-demo-text bg-white rounded-md p-2 opacity-70">
                  {program.title}
                </p>
              }
            />
          </div>
        ))}
      </div>

      {activeProgram && (
        <Modal
          isOpen={true}
          onClose={() => setActiveProgram(null)}
          title={activeProgram.title}
          description={activeProgram.description}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {activeProgram.images.map((src, idx) => (
              <img
                key={idx}
                src={src}
                alt={`Foto ${idx + 1}`}
                className="rounded shadow"
                width={300}
                height={200}
              />
            ))}
          </div>
        </Modal>
      )}
    </div>
  );
};

export default WorkPage;
