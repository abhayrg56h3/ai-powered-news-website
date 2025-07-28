import React, { useState, useEffect } from 'react';

export default function LoadingPage() {
  const [progress, setProgress] = useState(0);
  const [loadingText, setLoadingText] = useState('Initializing...');
  const [particles, setParticles] = useState([]);
  const [stars, setStars] = useState([]);

  const loadingStages = [
    { text: 'Initializing...', duration: 1000 },
    { text: 'Loading components...', duration: 1500 },
    { text: 'Connecting to server...', duration: 1200 },
    { text: 'Fetching data...', duration: 1800 },
    { text: 'Almost ready...', duration: 1000 },
    { text: 'Welcome!', duration: 500 }
  ];

  useEffect(() => {
    // Generate random stars
    const starArray = [];
    for (let i = 0; i < 100; i++) {
      starArray.push({
        id: i,
        left: Math.random() * 100,
        top: Math.random() * 100,
        size: Math.random() * 3 + 1,
        animationDelay: Math.random() * 3
      });
    }
    setStars(starArray);

    // Generate particles
    const particleArray = [];
    for (let i = 0; i < 20; i++) {
      particleArray.push({
        id: i,
        left: Math.random() * 100,
        size: Math.random() * 8 + 4,
        animationDelay: Math.random() * 8,
        animationDuration: Math.random() * 3 + 5
      });
    }
    setParticles(particleArray);
  }, []);

  useEffect(() => {
    let currentStage = 0;
    let totalDuration = 0;

    const progressInterval = setInterval(() => {
      if (currentStage < loadingStages.length) {
        const stage = loadingStages[currentStage];
        const progressIncrement = (100 / loadingStages.length) / (stage.duration / 50);
        
        setProgress(prev => {
          const newProgress = Math.min(prev + progressIncrement, (currentStage + 1) * (100 / loadingStages.length));
          return newProgress;
        });
      }
    }, 50);

    const textInterval = setInterval(() => {
      if (currentStage < loadingStages.length) {
        setLoadingText(loadingStages[currentStage].text);
        totalDuration += loadingStages[currentStage].duration;
        currentStage++;
      } else {
        clearInterval(textInterval);
        clearInterval(progressInterval);
      }
    }, currentStage < loadingStages.length ? loadingStages[currentStage]?.duration || 1000 : 1000);

    return () => {
      clearInterval(progressInterval);
      clearInterval(textInterval);
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-200 via-purple-200 to-violet-300 relative overflow-hidden">
      {/* Animated background stars */}
      <div className="absolute inset-0">
        {stars.map(star => (
          <div
            key={star.id}
            className="absolute bg-purple-600 rounded-full animate-pulse"
            style={{
              left: `${star.left}%`,
              top: `${star.top}%`,
              width: `${star.size}px`,
              height: `${star.size}px`,
              animationDelay: `${star.animationDelay}s`,
              animationDuration: '3s'
            }}
          />
        ))}
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0">
        {particles.map(particle => (
          <div
            key={particle.id}
            className="absolute bg-purple-500 bg-opacity-20 rounded-full animate-bounce"
            style={{
              left: `${particle.left}%`,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              animationDelay: `${particle.animationDelay}s`,
              animationDuration: `${particle.animationDuration}s`
            }}
          />
        ))}
      </div>

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-white/10 via-transparent to-white/10" />

      {/* Main loading container */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center space-y-8 px-8">
          {/* Logo/Brand area */}
          <div className="relative">
            <div className="w-24 h-24 mx-auto mb-8 relative">
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full animate-spin opacity-30" />
              <div className="absolute inset-2 bg-gradient-to-r from-purple-500 to-cyan-400 rounded-full animate-ping opacity-40" />
              <div className="absolute inset-4 bg-gradient-to-r from-cyan-300 to-purple-400 rounded-full flex items-center justify-center">
                <div className="w-8 h-8 bg-white rounded-full animate-pulse" />
              </div>
            </div>
          </div>

          {/* Main loading spinner */}
          <div className="relative w-32 h-32 mx-auto">
            {/* Outer ring */}
            <div className="absolute inset-0 border-4 border-purple-400/40 rounded-full" />
            
            {/* Animated ring */}
            <div className="absolute inset-0 border-4 border-transparent border-t-cyan-500 border-r-purple-600 rounded-full animate-spin" />
            
            {/* Inner ring */}
            <div className="absolute inset-4 border-2 border-transparent border-t-purple-500 border-l-cyan-500 rounded-full animate-spin" style={{ animationDirection: 'reverse', animationDuration: '1.5s' }} />
            
            {/* Center dot */}
            <div className="absolute inset-12 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full animate-pulse" />
          </div>

          {/* Progress bar */}
          <div className="w-80 max-w-full mx-auto space-y-4">
            <div className="relative h-2 bg-gray-300/60 rounded-full overflow-hidden backdrop-blur-sm">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-300/30 to-cyan-300/30 rounded-full" />
              <div 
                className="h-full bg-gradient-to-r from-cyan-500 via-purple-600 to-pink-600 rounded-full transition-all duration-300 ease-out relative overflow-hidden"
                style={{ width: `${progress}%` }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent animate-pulse" />
              </div>
            </div>
            
            {/* Percentage */}
            <div className="text-purple-700 font-mono text-sm font-semibold">
              {Math.round(progress)}%
            </div>
          </div>

          {/* Loading text */}
          <div className="space-y-2">
            <h2 className="text-3xl font-bold bg-gradient-to-r from-cyan-600 via-purple-700 to-pink-600 bg-clip-text text-transparent animate-pulse">
              {loadingText}
            </h2>
            <p className="text-gray-700 text-sm max-w-md mx-auto leading-relaxed">
              Preparing an amazing experience for you. This won't take long!
            </p>
          </div>

          {/* Decorative elements */}
          <div className="flex justify-center space-x-2 mt-8">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="w-2 h-2 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-full animate-bounce"
                style={{ animationDelay: `${i * 0.2}s` }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Bottom decorative wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1200 120" className="w-full h-20 fill-current text-purple-300/40">
          <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" opacity=".25"></path>
          <path d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z" opacity=".5"></path>
          <path d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z"></path>
        </svg>
      </div>
    </div>
  );
}