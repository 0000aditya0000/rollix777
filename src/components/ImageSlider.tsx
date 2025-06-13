import React from 'react';
import rollixBanner from '../assets/RollixBanner.png'

const ImageSlider = () => {
  return (
    <>
      {/* Mobile View */}
      <div className="md:hidden relative w-full h-48 px-4 mb-6">
        <div className="h-full w-full relative overflow-hidden rounded-2xl">
          <img
            src={rollixBanner}
            alt="Rollix Banner"
            className="w-full h-full "
          />
        </div>
      </div>

      {/* Desktop View */}
      <div className="hidden md:block relative w-full h-[400px] rounded-2xl overflow-hidden">
        <div className="absolute inset-0 w-full h-full">
          <img
            src={rollixBanner}
            alt="Rollix Banner"
            className="absolute inset-0 w-full h-full "
            style={{ 
              objectPosition: 'center',
              width: '100%',
              height: '100%',
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)'
            }}
          />
        </div>
      </div>
    </>
  );
};

export default ImageSlider;