import React from 'react';
import { Trophy, Users, Zap, Shield } from 'lucide-react';

const features = [
  {
    icon: <Trophy className="w-6 h-6 text-purple-500" />,
    title: "Competitive Gaming",
    description: "Join tournaments and win prizes"
  },
  {
    icon: <Users className="w-6 h-6 text-purple-500" />,
    title: "Multiplayer",
    description: "Play with friends worldwide"
  },
  {
    icon: <Zap className="w-6 h-6 text-purple-500" />,
    title: "Fast Performance",
    description: "Smooth gameplay experience"
  },
  {
    icon: <Shield className="w-6 h-6 text-purple-500" />,
    title: "Secure Platform",
    description: "Safe and protected gaming"
  }
];

const Features = () => {
  return (
    <section className="py-12 px-4 bg-gray-900">
      <h2 className="text-2xl font-bold text-white mb-8 text-center">
        Why Choose Rollix777
      </h2>
      <div className="grid grid-cols-1 gap-6">
        {features.map((feature, index) => (
          <div
            key={index}
            className="p-6 bg-gray-800 rounded-xl border border-gray-700"
          >
            <div className="flex items-start gap-4">
              <div className="p-2 bg-purple-600/20 rounded-lg">
                {feature.icon}
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white">
                  {feature.title}
                </h3>
                <p className="text-gray-400 mt-1">
                  {feature.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Features;