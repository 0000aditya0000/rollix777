import React, { useState, useEffect } from "react";
// import image1 from "../assets/1.png"; // Updated import
// import image2 from "../assets/2.png"; // Updated import
// import image3 from "../assets/3.png"; // Updated import
// import image4 from "../assets/4.png";
// import image5 from "../assets/5.png";
// import image6 from "../assets/6.png";
// import image7 from "../assets/7.png"; // Updated import
// ... import other images as needed

// import slider1 from "../assets/slider/slider1.jpg";
import slider1 from "../assets/sliderImg1.png";
import slider2 from "../assets/sliderImg2.jpg";
import slider3 from "../assets/slider/slider3.jpg";
import slider4 from "../assets/slider/slider4.jpg";

const ImageSlider = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const images = [
    slider1,
    slider2,
    slider3,
    slider4,
    // Add other images to the array
  ];

  // Auto-advance slides every 5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  return (
    <>
      {/* Mobile View */}
      <div className="md:hidden relative w-full h-48 px-4 mt-4">
        <div className="h-full w-full relative overflow-hidden rounded-2xl">
          <img
            src={images[currentImageIndex]}
            alt={`Slide ${currentImageIndex + 1}`}
            className={`w-full h-full ${
              currentImageIndex === 0 || currentImageIndex === 1
                ? "object-fill bg-black"
                : "object-cover"
            }`}
          />
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full"
          >
            ←
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full"
          >
            →
          </button>
          {/* Navigation Dots */}
          {/* <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-2">
            {images.map((_, index) => (
              <button
                key={index}
                className={`w-2 h-2 rounded-full ${
                  currentImageIndex === index ? "bg-white" : "bg-white/50"
                }`}
                onClick={() => setCurrentImageIndex(index)}
              />
            ))}
          </div> */}
        </div>
      </div>

      {/* Desktop View */}
      {/* <div className="hidden md:block relative w-full h-[400px] rounded-2xl overflow-hidden">
        <div className="absolute inset-0 w-full h-full">
          <img
            src={images[currentImageIndex]}
            alt={`Slide ${currentImageIndex + 1}`}
            className="absolute inset-0 w-full h-full"
          />
          Navigation Arrows
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full"
          >
            ←
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full"
          >
            →
          </button>
          Navigation Dots
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
            {images.map((_, index) => (
              <button
                key={index}
                className={`w-3 h-3 rounded-full ${
                  currentImageIndex === index ? 'bg-white' : 'bg-white/50'
                }`}
                onClick={() => setCurrentImageIndex(index)}
              />
            ))}
          </div>
        </div>
      </div> */}
    </>
  );
};

export default ImageSlider;
