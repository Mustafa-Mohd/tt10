import React, { useEffect, useState } from 'react';
import { Clock, Monitor, Settings, FileText } from 'lucide-react';

export default function AboutSection() {
  const fullText =
    'If you want real travel experiences that create memories and effective adventures - Travel Top10 got you covered.....';
  const [displayedText, setDisplayedText] = useState('');
  const hasTyped = React.useRef(false);

  useEffect(() => {
    if (hasTyped.current) return;
    hasTyped.current = true;

    let currentIndex = 0;
    const interval = setInterval(() => {
      setDisplayedText((prev) => {
        // Safety check: don't go past fullText length
        if (currentIndex < fullText.length) {
          return prev + fullText[currentIndex++];
        } else {
          clearInterval(interval);
          return prev;
        }
      });
    }, 40);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-red-50 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left side - Visual Components */}
          <div className="relative h-96">
            {/* Main purple card */}
            <div className="absolute top-0 left-0 w-80 h-64 bg-gradient-to-br from-purple-700 to-purple-900 rounded-2xl p-8 shadow-2xl overflow-hidden">
              <div className="relative">
                <div className="w-20 h-20 bg-gradient-to-b from-yellow-300 to-yellow-500 rounded-full flex items-center justify-center shadow-lg mb-4">
                  <div className="w-12 h-16 bg-gradient-to-b from-yellow-200 to-yellow-400 rounded-t-full relative">
                    <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-6 h-6 bg-yellow-600 rounded-full"></div>
                    <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-8 h-2 bg-gray-600 rounded-b"></div>
                  </div>
                </div>
                <div className="absolute -top-4 -left-4 w-28 h-28 border-2 border-yellow-400 rounded-full opacity-60"></div>
                <div className="absolute bottom-4 right-4 w-16 h-20 bg-purple-600 rounded-2xl transform rotate-12">
                  <div className="w-full h-4 bg-purple-500 rounded-t-2xl mt-16"></div>
                </div>
              </div>
            </div>

            {/* Pink clock card */}
            <div className="absolute top-8 right-0 w-24 h-24 bg-gradient-to-br from-pink-400 to-pink-600 transform rotate-45 flex items-center justify-center shadow-lg">
              <div className="transform -rotate-45">
                <Clock className="w-8 h-8 text-white" />
              </div>
            </div>

            {/* Yellow card */}
            <div className="absolute bottom-0 right-8 w-72 h-72 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-2xl p-8 shadow-2xl">
              <div className="w-32 h-24 mx-auto mt-8 relative">
                <div className="w-full h-full bg-purple-600 rounded-t-full rounded-bl-full opacity-80"></div>
                <div className="absolute top-2 left-4 w-6 h-6 bg-purple-700 rounded-full"></div>
                <div className="absolute top-4 right-6 w-4 h-4 bg-purple-700 rounded-full"></div>
                <div className="absolute bottom-4 left-8 w-8 h-2 bg-purple-700 rounded"></div>
                <div className="absolute top-0 left-2 w-28 h-12 border-4 border-purple-700 rounded-full flex">
                  <div className="w-12 h-12 border-2 border-purple-700 rounded-full bg-transparent"></div>
                  <div className="w-4 h-1 bg-purple-700 mt-6"></div>
                  <div className="w-12 h-12 border-2 border-purple-700 rounded-full bg-transparent"></div>
                </div>
              </div>
              <div className="w-24 h-4 bg-purple-800 rounded-full mx-auto mt-4 opacity-60"></div>
            </div>

            {/* Typing quote bubble */}
            <div className="absolute bottom-0 left-0 bg-white p-6 rounded-2xl shadow-lg max-w-sm border-l-4 border-pink-500 z-10">
              <p className="text-gray-700 text-sm leading-relaxed whitespace-pre-line">
                {displayedText}
                <span className="animate-blink">|</span>
              </p>
            </div>
          </div>

          {/* Right side - Content */}
          <div className="space-y-8 pl-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
                  About <span className="text-primary">Us</span>
                </h2>
              </div>
              <p className="text-gray-600 text-lg leading-relaxed mb-8">
                Welcome to <span style={{ color: '#0F0F0F', fontWeight: 'bold' }}>Travel </span>
                <span style={{ color: '#EF4B4B', fontWeight: 'bold' }}>Top10</span> — your trusted companion in unforgettable journeys. Founded in June 2020 and headquartered in Hyderabad, we specialize in curating and delivering top-tier travel and tourism services across India and beyond.
              </p>
            </div>

            {/* Vision */}
            <div className="flex gap-6">
              <div className="flex-shrink-0">
                <div className="w-16 h-16 bg-pink-100 rounded-xl flex items-center justify-center border border-pink-200">
                  <FileText className="w-8 h-8 text-pink-600" />
                </div>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">Vision</h3>
                <p className="text-gray-600 text-lg leading-relaxed">
                  We believe travel should be accessible, inspiring, and memorable for everyone. Our vision is to connect explorers with extraordinary experiences, empowering every traveler to discover, explore, and impact the world meaningfully — regardless of budget or background.
                </p>
              </div>
            </div>

            {/* Mission */}
            <div className="flex gap-6">
              <div className="flex-shrink-0">
                <div className="w-16 h-16 bg-pink-100 rounded-xl flex items-center justify-center border border-pink-200">
                  <div className="relative">
                    <Monitor className="w-8 h-8 text-pink-600" />
                    <Settings className="w-4 h-4 text-pink-600 absolute -bottom-1 -right-1" />
                  </div>
                </div>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">Mission</h3>
                <p className="text-gray-600 text-lg leading-relaxed">
                  At Travel Top10, our mission is to ignite the wanderlust within you. We are committed to delivering exceptional travel experiences, verified listings, and personalized service that exceed expectations and set new standards for adventure.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}