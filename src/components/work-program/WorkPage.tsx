import React, { useState } from 'react';
import ScrollReveal from '../ui/ScrollReveal/ScrollReveal';
import TiltedCard from '../ui/TiltedCard';
import Modal from '../ui/modal';
// import Image from 'next/image';

const baktiPrograms = [
  {
    title: 'Bakti Untuk Bumi',
    imageSrc: '/Bakti-untuk-Bumi-Biogass.JPG',
    description:
      'Dalam bakti untuk bumi ini, kami membuat biogas sebagai tempat untuk pengelolaan sampah organik, yang bisa menghasilkan gar untuk memasak, serta pupuk cair yang bisa digunakan untuk tanaman. Selain itu juga kami membuat tempat pemilah sampah berbasis Internet of Things (IoT) yang bisa menunjukan sampah organik atau anorganik.',
    images: ['/Bakti-untuk-Bumi-Biogass.JPG',
      '/bakti-untuk-bumi-2.JPG',
    ],
  },
  {
    title: 'Bakti Mengalir',
    imageSrc: '/bakti-mengalir-cover.JPG',
    description:
      'Bakti mengalir ini kami membuat filtrasi air yang bisa digunakan untuk mengalirkan air yang siap diminum untuk masyarakat maupun turis. Serta kami juga melakukan penyuluhan tentang sanitasi lingkungan',
    images: [
      'https://blocks.astratic.com/img/general-img-square.png',
      'https://blocks.astratic.com/img/general-img-square.png',
    ],
  },
  {
    title: 'Bakti Cilik',
    imageSrc: 'Bakti-Cilik-MPASI.JPG',
    description:
      'Cilik adalah singkatan dari Cegah stunting Lahirkan Insan Kuat dan program ini bertujuan untuk mencegah stunting pada anak-anak. Selain itu juga kami membuat aplikasi untuk pengingat posyandu, guidebook serta chatbot dab juga kami membuat game untuk edukasi tentang gizi',
    images: ['/bakti-cilik-1.JPG', '/bakti-cilik-2.JPG'],
  },
  {
    title: 'Bakti Bersih',
    imageSrc: 'bakti-bersih-cover.JPG',
    description:
      'Program ini berfokus pada edukasi tentang pentingnya kebersihan gigi dan tangan dengan target anak sekolah dasar sehingga mereka dapat mengimplementasikan kebersihan diri sejak dini.',
    images: ['bakti-bersih-1.JPG', 'bakti-bersih-2.JPG'],
  },
  {
    title: 'Bakti Bergizi',
    imageSrc: 'bakti-bergizi-cover.JPG',
    description:
      'Program ini bertujuan untuk meningkatkan kesadaran akan pentingnya gizi seimbang dan pola makan sehat dengan target yang kami sasar adalah remaja dalam sekolah menengah pertama.',
    images: ['bakti-bergizi-1.JPG', 'bakti-bergizi-2.JPG'],
  },
  {
    title: 'Bakti Bergerak',
    imageSrc: '/bakti-bergerak-cover.JPG',
    description: 'Bakti bergerak ini bertujuan untuk menambah semangat masyarakat dalam berolahraga, salah satunya dengan cara mengadakan senam bersama di lapangan terbuka.',
    images: ['bakti-bergerak-1.JPG', 'bakti-bergerak-2.JPG'],
  },
  {
    title: 'Bakti Entaskan DBD & Malaria',
    imageSrc: '/Bakti-Entaskan-DBD.JPG',
    description: 'Program ini bertujuan untuk mengedukasi masyarakat tentang bahaya DBD dan malaria, serta cara pencegahannya. Kami juga melakukan edukasi agar masyarakat dapat menjadi JUMANTIK (Juru Pemantau Jentik).',
    images: ['/bakti-entaskan-dbd-1.JPG', '/bakti-entaskan-dbd-2.JPG'],
  },
  {
    title: 'Bakti Bebas TB',
    imageSrc: '/Bakti-Bebas-TB.jpg',
    description: 'Kami melakukan edukasi pengenalan tetang TB, cara penularan, gejala, serta pencegahan penyakit TB.',
    images: ['/Bakti-Bebas-TB.jpg'],
  },
  {
    title: 'Bakti Bahari',
    imageSrc: 'bakti-bahari-cover.JPG',
    description: 'Dalam bakti bahari ini, kami melakukan edukasi serta pemberian leflet tentang penyakit-penyakit yang bisa terkena ketika berwisaa di daerah pesisir pantai. Selain itu kami juga melakukan pemeriksaan kesehatan gratis',
    images: ['bakti-bahari-1.JPG', 'bakti-bahari-2.JPG'],
  },
  {
    title: 'Bakti Hijau',
    imageSrc: 'bakti-hijau-cover.JPG',
    description: 'Penjelasan lengkap tentang Bakti Hijau...',
    images: ['bakti-hijau-1.JPG'],
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
          {activeProgram.images.length === 1 ? (
            <div className="flex justify-center">
              <img
                src={activeProgram.images[0]}
                alt="Foto 1"
                className="rounded shadow max-w-full h-auto"
                style={{ width: '300px', height: '200px', objectFit: 'cover' }}
              />
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {activeProgram.images.map((src, idx) => (
                <img
                  key={idx}
                  src={src}
                  alt={`Foto ${idx + 1}`}
                  className="rounded shadow w-full h-48 object-cover"
                />
              ))}
            </div>
          )}
        </Modal>
      )}
    </div>
  );
};

export default WorkPage;
