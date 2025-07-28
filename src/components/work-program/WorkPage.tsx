import React, { useState } from 'react';
import ScrollReveal from '../ui/ScrollReveal/ScrollReveal';
import TiltedCard from '../ui/TiltedCard';
import Modal from '../ui/modal';

const baktiPrograms = [
  {
    title: 'Bakti Untuk Bumi',
    imageSrc:
      'https://i.scdn.co/image/ab67616d0000b273d9985092cd88bffd97653b58',
    description: 'Penjelasan lengkap tentang Bakti Untuk Bumi...',
    images: ['https://via.placeholder.com/300'],
  },
  {
    title: 'Bakti Mengalir',
    imageSrc:
      'https://i.scdn.co/image/ab67616d0000b273d9985092cd88bffd97653b58',
    description: 'Penjelasan lengkap tentang Bakti Mengalir...',
    images: [
      'https://via.placeholder.com/300',
      'https://via.placeholder.com/300x200',
    ],
  },
  {
    title: 'Bakti Cilik',
    imageSrc:
      'https://i.scdn.co/image/ab67616d0000b273d9985092cd88bffd97653b58',
    description: 'Penjelasan lengkap tentang Bakti Cilik...',
    images: [
      'https://via.placeholder.com/300',
      'https://via.placeholder.com/300x200',
    ],
  },
  {
    title: 'Bakti Bersih',
    imageSrc:
      'https://i.scdn.co/image/ab67616d0000b273d9985092cd88bffd97653b58',
    description: 'Penjelasan lengkap tentang Bakti Bersih...',
    images: [
      'https://via.placeholder.com/300',
      'https://via.placeholder.com/300x200',
    ],
  },
  {
    title: 'Bakti Bergizi',
    imageSrc:
      'https://i.scdn.co/image/ab67616d0000b273d9985092cd88bffd97653b58',
    description: 'Penjelasan lengkap tentang Bakti Bergizi...',
    images: [
      'https://via.placeholder.com/300',
      'https://via.placeholder.com/300x200',
    ],
  },
  {
    title: 'Bakti Bergerak',
    imageSrc:
      'https://i.scdn.co/image/ab67616d0000b273d9985092cd88bffd97653b58',
    description: 'Penjelasan lengkap tentang Bakti Bergerak...',
    images: [
      'https://via.placeholder.com/300',
      'https://via.placeholder.com/300x200',
    ],
  },
  {
    title: 'Bakti Entaskan DBD & Malaria',
    imageSrc:
      'https://i.scdn.co/image/ab67616d0000b273d9985092cd88bffd97653b58',
    description: 'Penjelasan lengkap tentang Bakti Entaskan DBD & Malaria...',
    images: [
      'https://via.placeholder.com/300',
      'https://via.placeholder.com/300x200',
    ],
  },
  {
    title: 'Bakti Bebas TB',
    imageSrc:
      'https://i.scdn.co/image/ab67616d0000b273d9985092cd88bffd97653b58',
    description: 'Penjelasan lengkap tentang Bakti Bebas TB...',
    images: [
      'https://via.placeholder.com/300',
      'https://via.placeholder.com/300x200',
    ],
  },
  {
    title: 'Bakti Bahari',
    imageSrc:
      'https://i.scdn.co/image/ab67616d0000b273d9985092cd88bffd97653b58',
    description: 'Penjelasan lengkap tentang Bakti Bahari...',
    images: [
      'https://via.placeholder.com/300',
      'https://via.placeholder.com/300x200',
    ],
  },
  {
    title: 'Bakti Hijau',
    imageSrc:
      'https://i.scdn.co/image/ab67616d0000b273d9985092cd88bffd97653b58',
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
          Program Kerja Kawanua Tumou Tou
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
                <p className="tilted-card-demo-text bg-gray-300 rounded-md p-2 opacity-50">
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
              />
            ))}
          </div>
        </Modal>
      )}
    </div>
  );
};

export default WorkPage;
