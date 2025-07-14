import React from "react";
import { Phone } from "lucide-react";

const Disclaimer: React.FC = () => {
  return (
    <div className="w-full bg-[#1A1A2E] text-white rounded-xl border border-purple-500/10 p-4 sm:p-6 shadow-md mt-8">
      {/* Header with logos */}
      <div className="grid grid-cols-3 gap-2 sm:gap-4 mb-6">
        <h2>Disclaimer</h2>
        {/* Row 1 - Keep in one row on all screen sizes */}
        {/* <div className="flex items-center justify-start">
          <div className="text-red-400 font-bold text-xl">
            <img
              src="https://ossimg.envyenvelope.com/Rollix777/other/h5setting_20240423194834yt8f.png"
              alt="damn"
              className="h-8 w-auto sm:h-12 md:h-16 max-w-full"
            />
          </div>
        </div> */}
        {/* <div className="flex justify-center">
          <img
            className="h-12 w-12 sm:h-16 sm:w-16 md:h-24 md:w-24 object-contain"
            src="https://previews.123rf.com/images/grebeshkovmaxim/grebeshkovmaxim1906/grebeshkovmaxim190602077/125912569-adults-18-content-rating-symbol-sign-on-transparent-background.jpg"
            alt="+18"
          />
        </div>
        <div className="flex justify-end">
          <div className="p-4">
            <img
              src="https://Rollix777lottery.net/assets/png/CStype3-7588d980.png"
              alt="phone"
              className="h-10 w-10 sm:h-12 sm:w-12 md:h-16 md:w-16 object-contain"
            />
          </div>
        </div> */}
      </div>

      {/* Row 2 */}
      {/* <div className="flex items-center">
          <div className="text-orange-400 font-bold text-lg">
            <img
              src="2wCEAAkGBxATEhUUExISFRMXFRUYFxYYExUVFhIYFxUXFxcYFRUYHSggGB0lGxUVITEhJSkrLi4uGB8zODMtNygtLisBCgoKDg0OGxAQGy0lICUtLS0tLS0vLS0vLSstLS0tLS0uNS0tLS0tLS0tLS0tLS0vLS0tLS0tLS0tLS0tLS0tLf"
              alt="CQ9"
            />
          </div>
        </div>
        <div className="flex justify-center items-center">
          <div className="text-green-400 font-bold text-sm text-center">
            <span className="text-lg">Ⓜ</span>
            <br />
            <span className="text-xs">Microgaming</span>
          </div>
        </div>
        <div className="flex justify-end items-center">
          <div className="text-yellow-300 font-bold text-lg">JDB</div>
        </div> */}

      {/* Row 3 */}
      {/* <div className="flex items-center">
          <div className="text-white font-bold text-lg flex items-center gap-1">
            <span className="text-xl">▶</span> Evolution
          </div>
        </div>
        <div className="flex justify-center items-center">
          <div className="text-yellow-400 font-bold text-lg">JILI</div>
        </div>
        <div className="flex justify-end items-center">
          <div className="text-blue-400 font-bold text-lg">
            <span className="bg-blue-500 text-white px-1 rounded">N</span>
          </div>
        </div> */}

      {/* Disclaimer content */}
      <div className="space-y-4 text-sm">
        <div className="flex items-start gap-2">
          <span className="text-red-500 text-lg flex-shrink-0">♦</span>
          <p className="text-gray-300 leading-relaxed">
            The platform advocates fairness, justice, and openness. We mainly
            operate{" "}
            <span className="text-blue-400 underline">fair lottery</span>,{" "}
            <span className="text-blue-400 underline">blockchain games</span>,
            live casinos, and{" "}
            <span className="text-blue-400 underline">slot machine games</span>.
          </p>
        </div>

        <div className="flex items-start gap-2">
          <span className="text-red-500 text-lg flex-shrink-0">♦</span>
          <p className="text-gray-300 leading-relaxed">
            Welcome to Rollix777 Games works with more than 10,000{" "}
            <span className="text-blue-400 underline">
              online live game dealers
            </span>{" "}
            and <span className="text-blue-400 underline">slot games</span>, all
            of which are verified{" "}
            <span className="text-blue-400 underline">fair games</span>.
          </p>
        </div>

        <div className="flex items-start gap-2">
          <span className="text-red-500 text-lg flex-shrink-0">♦</span>
          <p className="text-gray-300 leading-relaxed">
            Welcome to Rollix777 Games supports fast deposit and withdrawal, and
            looks forward to your visit.
          </p>
        </div>

        <div className="mt-6 space-y-12">
          <p className="text-red-500 text-sm font-medium">
            Gambling can be addictive, please play rationally.
          </p>
          <p className="text-red-500 text-sm font-medium">
            Welcome to Rollix777 Games only accepts customers above the age of
            18.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Disclaimer;
