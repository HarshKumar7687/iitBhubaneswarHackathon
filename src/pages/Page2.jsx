// page2.jsx
'use client';

import { useState, useRef, useEffect } from 'react';
import Navbar from '../components/Navbar';

const Page2 = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const animationRef = useRef(null);
  const requestRef = useRef();

  // Stats data
  const carbonData = {
    current: "45,048",
    unit: "tCO₂e",
    change: "16%",
    trend: "from 2019",
    values: [
      { year: "2022", value: "45,048" },
      { year: "2021", value: "14,111" },
      { year: "2020", value: "32,813" },
      { year: "2019", value: "38,673" }
    ]
  };

  const energyData = {
    intensity: "123",
    intensityUnit: "kWh/m²",
    intensityChange: "22%",
    intensityTrend: "from 2019",
    consumption: "47,790,662",
    consumptionUnit: "kWh",
    consumptionChange: "27%",
    consumptionTrend: "from 2019",
    values: [
      { year: "2022", value: "47,790,662" },
      { year: "2021", value: "49,324,077" },
      { year: "2020", value: "48,784,205" },
      { year: "2019", value: "65,198,706" }
    ]
  };

  // Enhanced animation objects with more variety
  const [animationObjects, setAnimationObjects] = useState([]);

  useEffect(() => {
    const initialObjects = Array.from({ length: 60 }, (_, i) => ({
      id: i,
      size: Math.random() * 60 + 30,
      color: `hsl(${Math.random() * 360}, 85%, 65%)`,
      originalX: Math.random() * 85 + 7.5,
      originalY: Math.random() * 85 + 7.5,
      currentX: Math.random() * 85 + 7.5,
      currentY: Math.random() * 85 + 7.5,
      rotation: Math.random() * 360,
      shape: ['circle', 'triangle', 'rectangle', 'blob', 'star', 'hexagon'][Math.floor(Math.random() * 6)],
      speed: Math.random() * 4 + 1,
      opacity: Math.random() * 0.9 + 0.3,
      blur: Math.random() * 6 + 1,
      scale: 1,
      zIndex: Math.floor(Math.random() * 10),
    }));
    setAnimationObjects(initialObjects);
  }, []);

  const handleMouseMove = (e) => {
    if (!animationRef.current) return;
    
    const rect = animationRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    
    setMousePosition({ x, y });

    // Enhanced physics with magnetic effect
    setAnimationObjects(prev => prev.map(obj => {
      const dx = obj.currentX - x;
      const dy = obj.currentY - y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      
      const repulsionStrength = 35;
      const influenceRadius = 40;
      const magneticStrength = 15;
      
      if (distance < influenceRadius) {
        // Strong repulsion when close
        const force = Math.pow((1 - distance / influenceRadius), 2) * repulsionStrength;
        const angle = Math.atan2(dy, dx);
        const newX = obj.currentX + Math.cos(angle) * force;
        const newY = obj.currentY + Math.sin(angle) * force;
        
        return {
          ...obj,
          currentX: Math.max(1, Math.min(99, newX)),
          currentY: Math.max(1, Math.min(99, newY)),
          scale: 1.3,
          opacity: 1
        };
      } else if (distance < influenceRadius * 2) {
        // Gentle magnetic attraction when further
        const force = (1 - distance / (influenceRadius * 2)) * magneticStrength * -0.3;
        const angle = Math.atan2(dy, dx);
        const newX = obj.currentX + Math.cos(angle) * force;
        const newY = obj.currentY + Math.sin(angle) * force;
        
        return {
          ...obj,
          currentX: Math.max(1, Math.min(99, newX)),
          currentY: Math.max(1, Math.min(99, newY)),
          scale: 1.1,
          opacity: Math.min(1, obj.opacity + 0.2)
        };
      }
      
      // Return to original position
      const returnSpeed = 0.03;
      const returnX = obj.currentX + (obj.originalX - obj.currentX) * returnSpeed;
      const returnY = obj.currentY + (obj.originalY - obj.currentY) * returnSpeed;
      
      return {
        ...obj,
        currentX: returnX,
        currentY: returnY,
        scale: 1,
        opacity: obj.opacity
      };
    }));
  };

  // Animation loop for continuous movement
  useEffect(() => {
    const animate = () => {
      setAnimationObjects(prev => prev.map(obj => ({
        ...obj,
        rotation: obj.rotation + obj.speed * 0.08,
        // Add subtle floating motion
        currentX: obj.currentX + Math.sin(Date.now() * 0.001 + obj.id) * 0.05,
        currentY: obj.currentY + Math.cos(Date.now() * 0.001 + obj.id) * 0.05
      })));
      requestRef.current = requestAnimationFrame(animate);
    };

    requestRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(requestRef.current);
  }, []);

  const renderObjectShape = (obj) => {
    const baseStyle = {
      position: 'absolute',
      left: `${obj.currentX}%`,
      top: `${obj.currentY}%`,
      width: `${obj.size}px`,
      height: `${obj.size}px`,
      opacity: obj.opacity,
      filter: `blur(${obj.blur}px)`,
      transform: `translate(-50%, -50%) rotate(${obj.rotation}deg) scale(${obj.scale})`,
      transition: 'all 0.1s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
      cursor: 'crosshair',
      zIndex: obj.zIndex,
      pointerEvents: 'none',
    };

    const glowEffect = {
      boxShadow: `0 0 ${obj.size * 0.8}px ${obj.size * 0.4}px ${obj.color}40,
                  0 0 ${obj.size * 1.2}px ${obj.size * 0.6}px ${obj.color}20,
                  inset 0 0 ${obj.size * 0.4}px ${obj.color}30`
    };

    switch (obj.shape) {
      case 'circle':
        return (
          <div
            key={obj.id}
            className="absolute rounded-full"
            style={{
              ...baseStyle,
              ...glowEffect,
              backgroundColor: obj.color,
            }}
          />
        );
      case 'triangle':
        return (
          <div
            key={obj.id}
            className="absolute"
            style={{
              ...baseStyle,
              width: 0,
              height: 0,
              backgroundColor: 'transparent',
              borderLeft: `${obj.size / 2}px solid transparent`,
              borderRight: `${obj.size / 2}px solid transparent`,
              borderBottom: `${obj.size}px solid ${obj.color}`,
              filter: `blur(${obj.blur}px) drop-shadow(0 0 ${obj.size * 0.3}px ${obj.color}50)`
            }}
          />
        );
      case 'blob':
        return (
          <div
            key={obj.id}
            className="absolute"
            style={{
              ...baseStyle,
              ...glowEffect,
              backgroundColor: obj.color,
              borderRadius: '30% 70% 70% 30% / 30% 30% 70% 70%',
              animation: 'morph 8s ease-in-out infinite'
            }}
          />
        );
      case 'star':
        return (
          <div
            key={obj.id}
            className="absolute"
            style={{
              ...baseStyle,
              ...glowEffect,
              backgroundColor: obj.color,
              clipPath: 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)'
            }}
          />
        );
      case 'hexagon':
        return (
          <div
            key={obj.id}
            className="absolute"
            style={{
              ...baseStyle,
              ...glowEffect,
              backgroundColor: obj.color,
              clipPath: 'polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)'
            }}
          />
        );
      default: // rectangle
        return (
          <div
            key={obj.id}
            className="absolute rounded-xl"
            style={{
              ...baseStyle,
              ...glowEffect,
              backgroundColor: obj.color,
            }}
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Navbar />
      
      {/* Stats Section */}
      <section className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-bold text-white mb-12 text-center bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Sustainability Metrics
          </h1>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
            {/* Carbon Footprint Card */}
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-3xl p-8 shadow-2xl border border-gray-700 hover:border-blue-400 transition-all duration-500 hover:shadow-blue-500/20">
              <h2 className="text-2xl font-bold text-white mb-6">
                Managed portfolio carbon footprint
              </h2>
              
              <div className="flex items-end gap-4 mb-6">
                <span className="text-5xl font-black text-white">
                  {carbonData.current}
                </span>
                <span className="text-xl text-gray-300 mb-2 font-medium">
                  {carbonData.unit}
                </span>
              </div>
              
              <div className="flex items-center gap-2 mb-8">
                <span className="text-green-400 font-bold text-lg bg-green-400/10 px-3 py-1 rounded-full">
                  ↓ {carbonData.change}
                </span>
                <span className="text-gray-400 font-medium">
                  {carbonData.trend}
                </span>
              </div>
              
              <div className="space-y-3">
                {carbonData.values.map((item, index) => (
                  <div key={index} className="flex justify-between items-center py-3 border-b border-gray-700 hover:bg-gray-750/50 transition-all duration-300 rounded-xl px-4 group">
                    <span className="text-gray-300 font-medium group-hover:text-white">{item.year}</span>
                    <span className="text-white font-bold group-hover:scale-110 transition-transform">{item.value}</span>
                  </div>
                ))}
              </div>
              
              <button className="w-full mt-8 bg-gradient-to-r from-blue-500 to-blue-600 text-white py-4 px-6 rounded-xl hover:from-blue-400 hover:to-blue-500 transition-all duration-300 font-bold transform hover:scale-105 shadow-2xl hover:shadow-blue-500/30">
                See full breakdown of carbon footprint
              </button>
            </div>
            
            {/* Energy Intensity Card */}
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-3xl p-8 shadow-2xl border border-gray-700 hover:border-green-400 transition-all duration-500 hover:shadow-green-500/20">
              <h2 className="text-2xl font-bold text-white mb-6">
                Managed portfolio energy intensity
              </h2>
              
              <div className="flex items-end gap-4 mb-6">
                <span className="text-5xl font-black text-white">
                  {energyData.intensity}
                </span>
                <span className="text-xl text-gray-300 mb-2 font-medium">
                  {energyData.intensityUnit}
                </span>
              </div>
              
              <div className="flex items-center gap-2 mb-8">
                <span className="text-green-400 font-bold text-lg bg-green-400/10 px-3 py-1 rounded-full">
                  ↓ {energyData.intensityChange}
                </span>
                <span className="text-gray-400 font-medium">
                  {energyData.intensityTrend}
                </span>
              </div>
              
              <div className="mb-8 p-6 bg-gray-750/50 rounded-2xl border border-gray-600 hover:border-gray-500 transition-all duration-300">
                <div className="flex items-end gap-4 mb-4">
                  <span className="text-3xl font-black text-white">
                    {energyData.consumption}
                  </span>
                  <span className="text-lg text-gray-300 mb-1 font-medium">
                    {energyData.consumptionUnit}
                  </span>
                </div>
                
                <div className="flex items-center gap-2">
                  <span className="text-green-400 font-bold bg-green-400/10 px-2 py-1 rounded-full text-sm">
                    ↓ {energyData.consumptionChange}
                  </span>
                  <span className="text-gray-400 font-medium text-sm">
                    {energyData.consumptionTrend}
                  </span>
                </div>
              </div>
              
              <div className="space-y-3">
                {energyData.values.map((item, index) => (
                  <div key={index} className="flex justify-between items-center py-3 border-b border-gray-700 hover:bg-gray-750/50 transition-all duration-300 rounded-xl px-4 group">
                    <span className="text-gray-300 font-medium group-hover:text-white">{item.year}</span>
                    <span className="text-white font-bold group-hover:scale-110 transition-transform">{item.value}</span>
                  </div>
                ))}
              </div>
              
              <button className="w-full mt-8 bg-gradient-to-r from-green-500 to-green-600 text-white py-4 px-6 rounded-xl hover:from-green-400 hover:to-green-500 transition-all duration-300 font-bold transform hover:scale-105 shadow-2xl hover:shadow-green-500/30">
                Download the data
              </button>
            </div>
          </div>
        </div>
      </section>
      
      {/* Pure Animation Section - Enhanced */}
      <section 
        ref={animationRef}
        className="min-h-screen bg-gradient-to-br from-black via-purple-900/80 to-blue-900/80 relative overflow-hidden cursor-crosshair"
        onMouseMove={handleMouseMove}
      >
        {/* Enhanced animated background */}
        <div className="absolute inset-0 opacity-15">
          <div className="absolute top-20 left-20 w-80 h-80 bg-purple-500 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-blue-500 rounded-full blur-3xl animate-pulse delay-700"></div>
          <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-cyan-500 rounded-full blur-3xl animate-pulse delay-300"></div>
        </div>
        
        {/* Interactive objects - main highlight */}
        <div className="absolute inset-0">
          {animationObjects.map((obj) => renderObjectShape(obj))}
        </div>
        
        {/* Enhanced cursor effect */}
        <div 
          className="absolute w-8 h-8 bg-white/20 rounded-full pointer-events-none z-50 backdrop-blur-sm border-2 border-white/30"
          style={{
            left: `calc(${mousePosition.x}% - 1rem)`,
            top: `calc(${mousePosition.y}% - 1rem)`,
            transition: 'left 0.05s linear, top 0.05s linear',
            boxShadow: '0 0 20px rgba(255,255,255,0.5)'
          }}
        />
        
        {/* Ripple effect around cursor */}
        <div 
          className="absolute w-16 h-16 bg-white/10 rounded-full pointer-events-none z-40"
          style={{
            left: `calc(${mousePosition.x}% - 2rem)`,
            top: `calc(${mousePosition.y}% - 2rem)`,
            transition: 'left 0.1s ease-out, top 0.1s ease-out',
            animation: 'pulse 2s infinite'
          }}
        />
      </section>

      <style jsx>{`
        @keyframes pulse {
          0% { transform: scale(1); opacity: 0.6; }
          50% { transform: scale(1.2); opacity: 0.3; }
          100% { transform: scale(1); opacity: 0.6; }
        }
        @keyframes morph {
          0% { border-radius: 30% 70% 70% 30% / 30% 30% 70% 70%; }
          50% { border-radius: 58% 42% 75% 25% / 76% 46% 54% 24%; }
          100% { border-radius: 30% 70% 70% 30% / 30% 30% 70% 70%; }
        }
      `}</style>
    </div>
  );
};

export default Page2;