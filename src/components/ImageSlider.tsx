import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const slides = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=800&h=400&fit=crop",
    title: "Win Big Today",
    description: "Join our exclusive tournament"
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1642479755415-2c4f6c6a8c8f?w=800&h=400&fit=crop",
    title: "Daily Rewards",
    description: "Claim your bonus every day"
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1614728263952-84ea256f9679?w=800&h=400&fit=crop",
    title: "VIP Program",
    description: "Exclusive benefits for members"
  }
];

const ImageSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrevious = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const goToNext = () => {
    const isLastSlide = currentIndex === slides.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  const goToSlide = (slideIndex: number) => {
    setCurrentIndex(slideIndex);
  };

  useEffect(() => {
    const slideInterval = setInterval(() => {
      goToNext();
    }, 5000);
    
    return () => clearInterval(slideInterval);
  }, [currentIndex]);

  return (
    <>
      {/* Mobile View */}
      <div className="md:hidden relative w-full h-48 px-4 mb-6">
        <div className="h-full w-full relative overflow-hidden rounded-2xl">
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent z-10" />
          
          {/* Image */}
          <div 
            style={{ backgroundImage: `url(${slides[currentIndex].image})` }}
            className="w-full h-full bg-cover bg-center absolute transition-all duration-500 ease-in-out"
          ></div>
          
          {/* Content */}
          <div className="absolute bottom-0 left-0 right-0 p-4 z-20">
            <h2 className="text-2xl font-bold text-white">{slides[currentIndex].title}</h2>
            <p className="text-gray-200">{slides[currentIndex].description}</p>
          </div>
          
          {/* Navigation arrows */}
          <button 
            onClick={goToPrevious}
            className="absolute top-1/2 left-2 transform -translate-y-1/2 w-8 h-8 flex items-center justify-center rounded-full bg-black/30 text-white z-20 hover:bg-black/50 transition-colors"
          >
            <ChevronLeft size={20} />
          </button>
          <button 
            onClick={goToNext}
            className="absolute top-1/2 right-2 transform -translate-y-1/2 w-8 h-8 flex items-center justify-center rounded-full bg-black/30 text-white z-20 hover:bg-black/50 transition-colors"
          >
            <ChevronRight size={20} />
          </button>
          
          {/* Dots */}
          <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex gap-1.5 z-20">
            {slides.map((_, slideIndex) => (
              <div
                key={slideIndex}
                onClick={() => goToSlide(slideIndex)}
                className={`w-2 h-2 rounded-full cursor-pointer transition-all ${
                  currentIndex === slideIndex ? 'bg-white w-4' : 'bg-white/50'
                }`}
              ></div>
            ))}
          </div>
        </div>
      </div>

      {/* Desktop View */}
      <div className="hidden md:block relative w-full h-[400px] rounded-2xl overflow-hidden">
        <div className="relative h-full">
          {/* Main Image with Parallax Effect */}
          <div 
            style={{ backgroundImage: `url(${slides[currentIndex].image})` }}
            className="w-full h-full bg-cover bg-center absolute transition-all duration-700 ease-in-out transform hover:scale-105"
          ></div>
          
          {/* Gradient Overlays */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent z-10" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent z-10" />
          
          {/* Content */}
          <div className="absolute bottom-0 left-0 right-0 p-8 z-20">
            <h2 className="text-4xl font-bold text-white mb-3">{slides[currentIndex].title}</h2>
            <p className="text-xl text-gray-200 mb-6">{slides[currentIndex].description}</p>
            <button className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-medium rounded-xl hover:opacity-90 transition-opacity">
              Learn More
            </button>
          </div>

          {/* Side Preview */}
          <div className="absolute right-8 top-1/2 -translate-y-1/2 space-y-4 z-20">
            {slides.map((slide, index) => (
              <div
                key={slide.id}
                onClick={() => goToSlide(index)}
                className={`w-24 h-16 rounded-lg overflow-hidden cursor-pointer transition-all duration-300 ${
                  currentIndex === index ? 'ring-2 ring-purple-500 scale-110' : 'opacity-60 hover:opacity-100'
                }`}
              >
                <div
                  style={{ backgroundImage: `url(${slide.image})` }}
                  className="w-full h-full bg-cover bg-center"
                ></div>
              </div>
            ))}
          </div>
          
          {/* Navigation Arrows */}
          <button 
            onClick={goToPrevious}
            className="absolute top-1/2 left-8 transform -translate-y-1/2 w-12 h-12 flex items-center justify-center rounded-full bg-black/30 text-white z-20 hover:bg-black/50 transition-colors"
          >
            <ChevronLeft size={24} />
          </button>
          <button 
            onClick={goToNext}
            className="absolute top-1/2 right-36 transform -translate-y-1/2 w-12 h-12 flex items-center justify-center rounded-full bg-black/30 text-white z-20 hover:bg-black/50 transition-colors"
          >
            <ChevronRight size={24} />
          </button>
        </div>
      </div>
    </>
  );
};

export default ImageSlider;