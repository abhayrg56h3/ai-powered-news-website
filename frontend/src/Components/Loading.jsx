import React, { useState, useEffect } from 'react';

export default function LoadingPage() {
  const [progress, setProgress] = useState(0);
  const [loadingText, setLoadingText] = useState('Initializing...');

  const loadingStages = [
    { text: 'Initializing...', duration: 1000 },
    { text: 'Loading components...', duration: 1200 },
    { text: 'Connecting...', duration: 1000 },
    { text: 'Fetching data...', duration: 1500 },
    { text: 'Almost ready...', duration: 800 },
    { text: 'Welcome!', duration: 500 }
  ];

  useEffect(() => {
    let currentStage = 0;
    let totalDuration = 0;

    const interval = setInterval(() => {
      if (currentStage < loadingStages.length) {
        const stage = loadingStages[currentStage];
        const increment = (100 / loadingStages.length) / (stage.duration / 50);

        setProgress(prev => {
          const next = prev + increment;
          return next >= (currentStage + 1) * (100 / loadingStages.length)
            ? (currentStage + 1) * (100 / loadingStages.length)
            : next;
        });

        if (totalDuration % loadingStages[currentStage].duration === 0) {
          setLoadingText(stage.text);
          currentStage++;
        }
        totalDuration += 50;
      } else {
        clearInterval(interval);
      }
    }, 50);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-200 via-purple-100 to-violet-200 flex items-center justify-center relative">
      {/* Simple spinner */}
      <div className="text-center space-y-8 px-6">
        <div className="w-20 h-20 mx-auto relative">
          <div className="absolute inset-0 border-4 border-purple-200 rounded-full"></div>
          <div className="absolute inset-0 border-4 border-transparent border-t-purple-500 rounded-full animate-spin"></div>
        </div>

        {/* Progress bar */}
        <div className="max-w-xs mx-auto space-y-3">
          <div className="h-2 bg-gray-300/60 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full transition-all duration-300"
              style={{ width: `${Math.round(progress)}%` }}
            />
          </div>
          <p className="text-gray-700 text-sm font-medium">{Math.round(progress)}%</p>
        </div>

        {/* Loading text */}
        <div>
          <h2 className="text-2xl font-semibold text-gray-800">{loadingText}</h2>
          <p className="text-gray-600 text-sm mt-1">Preparing your experience...</p>
        </div>

        {/* Simple bounce dots */}
        <div className="flex justify-center space-x-1 mt-4">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="w-2 h-2 bg-purple-500 rounded-full animate-bounce"
              style={{ animationDelay: `${i * 0.2}s` }}
            />
          ))}
        </div>
      </div>

      {/* Subtle bottom wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1200 120" className="w-full h-16 fill-purple-200/50">
          <path d="M0,0V46C150,70,300,60,450,40c150-20,300,0,450,20c150,20,300,10,450,0V0Z" opacity=".3" />
        </svg>
      </div>
    </div>
  );
}