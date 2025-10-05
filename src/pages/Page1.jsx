import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Home, Leaf, Trees, Mountain, Waves, Heart, Star, ArrowRight, Zap } from 'lucide-react';
import Navbar from '../components/Navbar';

const Page1 = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [hoveredCard, setHoveredCard] = useState(null);
  const [imageLoaded, setImageLoaded] = useState({});

  const carouselSlides = [
    {
      id: 1,
      image: "https://images.unsplash.com/photo-1470115636492-6d2b56f9146d?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      title: "Ancient Forests",
      subtitle: "Discover the wisdom of thousand-year-old trees",
    },
    {
      id: 2,
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&w=1920&h=1080&fit=crop&q=90",
      title: "Majestic Mountains",
      subtitle: "Where earth touches the sky",
    },
    {
      id: 3,
      image: "https://images.unsplash.com/photo-1439066615861-d1af74d74000?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&w=1920&h=1080&fit=crop&q=90",
      title: "Crystal Waters",
      subtitle: "Pure serenity in every drop",
    }
  ];

  const natureCards = [
    {
      id: 1,
      image: "https://images.unsplash.com/photo-1418065460487-3e41a6c84dc5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&w=800&h=600&fit=crop&q=90",
      title: "Forest Conservation",
      description: "Protecting ancient woodlands and their diverse ecosystems. Our efforts have preserved over 1 million acres of forest land from deforestation and urban development.",
      stats: "1M+ Acres Protected",
      icon: <Trees className="w-8 h-8" />,
    },
    {
      id: 2,
      image: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&w=800&h=600&fit=crop&q=90",
      title: "Wildlife Protection",
      description: "Creating safe habitats for endangered species. We've helped increase the population of rare species by 45% through dedicated conservation programs.",
      stats: "45% Species Recovery",
      icon: <Heart className="w-8 h-8" />,
    },
    {
      id: 3,
      image: "https://images.unsplash.com/photo-1505144808419-1957a94ca61e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&w=800&h=600&fit=crop&q=90",
      title: "Mountain Preservation",
      description: "Maintaining the pristine beauty of mountain ranges worldwide. Our initiatives have prevented mining and construction in 15 protected mountain zones.",
      stats: "15 Zones Protected",
      icon: <Mountain className="w-8 h-8" />,
    },
    {
      id: 4,
      image: "https://images.unsplash.com/photo-1439066615861-d1af74d74000?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&w=800&h=600&fit=crop&q=90",
      title: "Ocean Cleanup",
      description: "Removing plastic and pollutants from our oceans. We've collected over 50,000 tons of waste through global cleanup operations and community initiatives.",
      stats: "50K Tons Cleaned",
      icon: <Waves className="w-8 h-8" />,
    },
    {
      id: 5,
      image: "https://images.unsplash.com/photo-1476820865390-c52aeebb9891?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&w=800&h=600&fit=crop&q=90",
      title: "Reforestation",
      description: "Planting trees to combat climate change. Our global network has planted over 10 million trees, creating new habitats and capturing carbon emissions.",
      stats: "10M Trees Planted",
      icon: <Leaf className="w-8 h-8" />,
    },
    {
      id: 6,
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&w=800&h=600&fit=crop&q=90",
      title: "Eco Education",
      description: "Educating communities about sustainable living. We've reached over 500,000 people through workshops, school programs, and community events.",
      stats: "500K People Reached",
      icon: <Star className="w-8 h-8" />,
    }
  ];

  // Preload images with quality optimization
  useEffect(() => {
    const loadImage = (src, id) => {
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.src = src;
        img.onload = () => {
          setImageLoaded(prev => ({ ...prev, [id]: true }));
          resolve();
        };
        img.onerror = reject;
      });
    };

    const preloadImages = async () => {
      const imagePromises = [
        ...carouselSlides.map(slide => loadImage(slide.image, `carousel-${slide.id}`)),
        ...natureCards.map(card => loadImage(card.image, `card-${card.id}`))
      ];
      
      try {
        await Promise.all(imagePromises);
        setIsLoading(false);
      } catch (error) {
        console.error('Error loading images:', error);
        setIsLoading(false);
      }
    };

    preloadImages();
  }, []);

  // Auto-play carousel
  useEffect(() => {
    if (!isAutoPlaying || isLoading) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % carouselSlides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, carouselSlides.length, isLoading]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % carouselSlides.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + carouselSlides.length) % carouselSlides.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-green-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-white text-lg font-light">Loading Nature's Beauty...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black">
      <Navbar />

      {/* Hero Carousel Section */}
      <section className="relative h-screen overflow-hidden">
        {/* Carousel Slides */}
        <div className="relative w-full h-full">
          {carouselSlides.map((slide, index) => (
            <div
              key={slide.id}
              className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
                index === currentSlide 
                  ? 'opacity-100 z-10' 
                  : 'opacity-0 z-0'
              }`}
            >
              {/* High Quality Background Image */}
              <div className="absolute inset-0">
                <img
                  src={slide.image}
                  alt={slide.title}
                  className="w-full h-full object-cover"
                  loading="eager"
                  decoding="async"
                />
              </div>
              
              {/* Consistent Dark Overlay */}
              <div className="absolute inset-0 bg-black/40 backdrop-blur-[1px]"></div>
              
              {/* Slide Content */}
              <div className="absolute inset-0 flex items-center justify-center text-center text-white z-20 px-4">
                <div className={`max-w-4xl transform transition-all duration-1000 ${
                  index === currentSlide 
                    ? 'translate-y-0 opacity-100' 
                    : 'translate-y-10 opacity-0'
                }`}>
                  <h1 className="text-4xl sm:text-5xl md:text-7xl font-black mb-4 md:mb-6 leading-tight bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                    {slide.title}
                  </h1>
                  <p className="text-lg sm:text-xl md:text-2xl font-light mb-6 md:mb-8 max-w-2xl mx-auto text-gray-200">
                    {slide.subtitle}
                  </p>
                  <button className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full font-bold text-base sm:text-lg hover:scale-105 transition-all duration-300 transform shadow-2xl hover:shadow-xl flex items-center justify-center mx-auto group">
                    Explore More 
                    <ArrowRight className="w-5 h-5 inline ml-2 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Carousel Controls */}
        <button
          onClick={prevSlide}
          className="absolute left-2 sm:left-4 top-1/2 transform -translate-y-1/2 bg-white/20 backdrop-blur-md border border-white/30 text-white p-2 sm:p-3 rounded-full hover:bg-white/30 transition-all duration-300 hover:scale-110 z-30 shadow-lg"
        >
          <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>
        
        <button
          onClick={nextSlide}
          className="absolute right-2 sm:right-4 top-1/2 transform -translate-y-1/2 bg-white/20 backdrop-blur-md border border-white/30 text-white p-2 sm:p-3 rounded-full hover:bg-white/30 transition-all duration-300 hover:scale-110 z-30 shadow-lg"
        >
          <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>

        {/* Carousel Indicators */}
        <div className="absolute bottom-4 sm:bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2 sm:space-x-3 z-30">
          {carouselSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 sm:w-4 sm:h-4 rounded-full transition-all duration-300 border border-white/50 ${
                index === currentSlide 
                  ? 'bg-white scale-125 shadow-lg' 
                  : 'bg-white/30 hover:bg-white/60 hover:scale-110'
              }`}
            />
          ))}
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-30 hidden sm:block">
        </div>
      </section>

      {/* About Section */}
      <section id="about-us" className="min-h-screen py-16 sm:py-20 px-4 sm:px-8 flex items-center justify-center">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-8 sm:gap-12">
          {/* Image Section */}
          <div className="flex-1 order-2 lg:order-1">
            <div className="relative group">
              <div className="absolute -inset-4 bg-gradient-to-r from-green-500 to-emerald-600 rounded-3xl blur-lg opacity-30 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
              <img 
                src="https://images.unsplash.com/photo-1441974231531-c6227db76b6e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&w=1200&h=1200&fit=crop&q=90"
                alt="Nature Conservation"
                className="relative w-full max-w-md lg:max-w-lg xl:max-w-xl rounded-2xl shadow-2xl object-cover transform group-hover:scale-105 transition-transform duration-500 z-10"
                loading="lazy"
              />
            </div>
          </div>

          {/* Text Content */}
          <div className="flex-1 text-center lg:text-left order-1 lg:order-2">
            <h3 className="text-3xl sm:text-4xl md:text-6xl font-black mb-6 sm:mb-8 bg-gradient-to-r from-green-400 to-emerald-300 bg-clip-text text-transparent">
              Our Mission
            </h3>
            <p className="text-base sm:text-lg md:text-xl text-gray-300 leading-relaxed mb-4 sm:mb-6">
              We are dedicated to preserving Earth's natural beauty and biodiversity. 
              Through innovative conservation strategies and community engagement, 
              we work tirelessly to protect endangered ecosystems and promote sustainable 
              coexistence between humanity and nature.
            </p>
            <p className="text-base sm:text-lg md:text-xl text-gray-300 leading-relaxed mb-8">
              Our team of environmental scientists, conservationists, and local communities 
              collaborate to create lasting impact. From reforestation projects to wildlife 
              protection initiatives, we're committed to leaving a greener legacy for future 
              generations.
            </p>
            <button className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white px-8 py-4 rounded-full font-bold text-lg hover:scale-105 transition-all duration-300 transform shadow-2xl hover:shadow-xl">
              Join Our Mission
            </button>
          </div>
        </div>
      </section>

      {/* Nature Cards Section */}
      <section id="cards-container" className="min-h-screen py-16 sm:py-20 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-12 sm:mb-16">
            <div className="inline-flex items-center bg-gradient-to-r from-green-500 to-emerald-600 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-full mb-4 sm:mb-6 shadow-lg hover:scale-105 transition-transform duration-300">
              <Zap className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
              <span className="font-bold text-sm sm:text-base">Our Conservation Projects</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-6xl font-black text-white mb-4 sm:mb-6">
              Protecting Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-300">Planet</span>
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Discover our global initiatives dedicated to preserving Earth's natural wonders for future generations.
            </p>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {natureCards.map((card) => (
              <div
                key={card.id}
                className="card group relative h-80 sm:h-96 rounded-2xl sm:rounded-3xl overflow-hidden transition-all duration-500 ease-out cursor-pointer"
                onMouseEnter={() => setHoveredCard(card.id)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                {/* High Quality Card Image */}
                <div className="absolute inset-0">
                  <img
                    src={card.image}
                    alt={card.title}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
                
                {/* Dark Overlay - Enhanced on hover */}
                <div className={`absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/30 transition-all duration-500 ${
                  hoveredCard === card.id ? 'opacity-90' : 'opacity-70'
                }`}></div>
                
                {/* Card Content */}
                <div className="relative z-10 h-full flex flex-col justify-end p-6 sm:p-8">
                  {/* Icon and Title */}
                  <div className="flex items-center space-x-3 mb-4 transform transition-transform duration-500 group-hover:translate-y-0">
                    <div className="text-green-400">
                      {card.icon}
                    </div>
                    <h4 className="text-xl sm:text-2xl font-bold text-white">
                      {card.title}
                    </h4>
                  </div>

                  {/* Stats */}
                  <div className="mb-4 transform transition-all duration-500 delay-100 group-hover:translate-y-0">
                    <div className="inline-flex items-center bg-green-500/20 backdrop-blur-sm border border-green-500/30 text-green-300 px-3 py-1 rounded-full text-sm font-semibold">
                      {card.stats}
                    </div>
                  </div>

                  {/* Description - Shows on hover */}
                  <div className={`transform transition-all duration-500 ${
                    hoveredCard === card.id 
                      ? 'translate-y-0 opacity-100 max-h-40' 
                      : 'translate-y-4 opacity-0 max-h-0'
                  } overflow-hidden`}>
                    <p className="text-gray-200 text-sm sm:text-base leading-relaxed">
                      {card.description}
                    </p>
                    <button className="mt-4 text-green-400 hover:text-green-300 font-semibold text-sm flex items-center group/btn">
                      Learn More
                      <ArrowRight className="w-4 h-4 ml-1 group-hover/btn:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>

                {/* Hover Glow Effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 to-emerald-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl sm:rounded-3xl"></div>
              </div>
            ))}
          </div>

          {/* Stats Section */}
          <div className="mt-16 sm:mt-20 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-8 text-center">
            {[
              { number: "1M+", label: "Acres Protected" },
              { number: "10M+", label: "Trees Planted" },
              { number: "45%", label: "Species Recovery" },
              { number: "150+", label: "Countries" }
            ].map((stat, index) => (
              <div 
                key={index}
                className="transform hover:scale-110 transition-all duration-300 p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-green-500/30 hover:bg-white/10 group"
              >
                <div className="text-2xl sm:text-4xl md:text-6xl font-black text-white mb-1 sm:mb-2 group-hover:text-green-400 transition-colors duration-300">
                  {stat.number}
                </div>
                <div className="text-green-300 font-semibold text-sm sm:text-base group-hover:text-green-200 transition-colors duration-300">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black/50 backdrop-blur-md border-t border-white/10 py-12 px-4 mt-20">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex justify-center items-center space-x-3 mb-6">
            <div className="relative">
              <Zap className="w-8 h-8 text-yellow-400 animate-pulse" />
              <div className="absolute inset-0 bg-yellow-400 rounded-full blur-sm opacity-50"></div>
            </div>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-200 via-emerald-200 to-green-200 font-black text-2xl tracking-wider">
              NEXUS
            </span>
          </div>
          <p className="text-gray-400 mb-6 max-w-2xl mx-auto text-lg">
            Protecting nature for future generations. Join us in our mission to preserve Earth's beauty and biodiversity through sustainable conservation efforts.
          </p>
          <div className="flex justify-center space-x-6 mb-8">
            {['Privacy Policy', 'Terms of Service', 'Contact Us', 'Get Involved'].map((item) => (
              <button 
                key={item}
                className="text-gray-400 hover:text-green-400 transition-all duration-300 hover:scale-105 font-semibold"
              >
                {item}
              </button>
            ))}
          </div>
          <div className="flex justify-center space-x-4">
            {[Home, Leaf, Trees, Mountain, Waves].map((Icon, index) => (
              <button 
                key={index}
                className="bg-white/5 hover:bg-green-500/20 border border-white/10 hover:border-green-500/30 text-gray-400 hover:text-green-400 p-3 rounded-full transition-all duration-300 hover:scale-110 backdrop-blur-sm"
              >
                <Icon className="w-5 h-5" />
              </button>
            ))}
          </div>
          <p className="text-gray-500 mt-8 text-sm">
            © 2024 Nexus World. All rights reserved. Made with ❤️ for our planet.
          </p>
        </div>
      </footer>

      {/* Custom Styles */}
      <style>{`
        .card {
          transform-style: preserve-3d;
          perspective: 1000px;
        }
        
        .card:hover {
          transform: translateY(-8px) rotate3d(-0.5, 1, 0, 10deg);
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
        }
        
        /* Smooth scrolling */
        html {
          scroll-behavior: smooth;
        }

        /* Custom scrollbar */
        ::-webkit-scrollbar {
          width: 8px;
        }

        ::-webkit-scrollbar-track {
          background: rgba(0, 0, 0, 0.1);
        }

        ::-webkit-scrollbar-thumb {
          background: linear-gradient(to bottom, #10b981, #059669);
          border-radius: 4px;
        }

        ::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(to bottom, #34d399, #10b981);
        }

        /* Image quality optimization */
        img {
          image-rendering: -webkit-optimize-contrast;
          image-rendering: crisp-edges;
        }
      `}</style>
    </div>
  );
};

export default Page1;