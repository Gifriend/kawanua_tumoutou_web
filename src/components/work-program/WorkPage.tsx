import ScrollReveal from '../ui/ScrollReveal/ScrollReveal';
import TiltedCard from '../ui/TiltedCard';

const WorkPage: React.FC = () => {
  return (
    <div className="min-h-screen">
      <div className='text-white text-center'>
        <ScrollReveal
        baseOpacity={0}
        enableBlur={true}
        baseRotation={5}
        blurStrength={10}>
        Program Kerja
      </ScrollReveal>
      </div>
      <div className="flex flex-col sm:flex-row flex-wrap justify-center items-center gap-10 px-4 py-8">
        <TiltedCard
          imageSrc="https://i.scdn.co/image/ab67616d0000b273d9985092cd88bffd97653b58"
          altText="Bakti mengalir"
          captionText="Bakti mengalir"
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
              Bakti mengalir
            </p>
          }
        />
        <TiltedCard
          imageSrc="https://i.scdn.co/image/ab67616d0000b273d9985092cd88bffd97653b58"
          altText="Bakti untuk bumi"
          captionText="Bakti untuk bumi"
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
              Bakti untuk bumi
            </p>
          }
        />
        <TiltedCard
          imageSrc="https://i.scdn.co/image/ab67616d0000b273d9985092cd88bffd97653b58"
          altText="Bakti cilik"
          captionText="Bakti cilik"
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
              Bakti cilik
            </p>
          }
        />
        <TiltedCard
          imageSrc="https://i.scdn.co/image/ab67616d0000b273d9985092cd88bffd97653b58"
          altText="Bakti Bergerak"
          captionText="Bakti Bergerak"
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
              Bakti Bergerak
            </p>
          }
        />
        <TiltedCard
          imageSrc="https://i.scdn.co/image/ab67616d0000b273d9985092cd88bffd97653b58"
          altText="Bakti Entaskan DBD"
          captionText="Bakti Entaskan DBD"
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
              Bakti Entaskan DBD
            </p>
          }
        />
        <TiltedCard
          imageSrc="https://i.scdn.co/image/ab67616d0000b273d9985092cd88bffd97653b58"
          altText="Bakti Bahari"
          captionText="Bakti Bahari"
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
              Bakti Bahari
            </p>
          }
        />
      </div>
    </div>
  );
};
export default WorkPage;
