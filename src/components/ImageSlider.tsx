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
    <div className="relative w-full h-48 px-4 mb-6">
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
  );
};

export default ImageSlider;