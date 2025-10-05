import React, { useState, useEffect, useRef } from 'react';
import { Star, MessageCircle, BarChart3, PieChart, Table, TrendingUp, Zap, ChevronRight, Users, DollarSign, Target, Activity, Shield, Cloud, Headphones, ArrowRight } from 'lucide-react';
import Navbar from '../components/Navbar';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const Home = () => {
  const [hoveredText, setHoveredText] = useState(null);
  const videoSectionRef = useRef(null);
  const contentSectionRef = useRef(null);
  const servicesRef = useRef(null);
  const cardsRef = useRef([]);
  const blackeningOverlayRef = useRef(null);

  useEffect(() => {
    // GSAP Animations for natural blackening effect
    const ctx = gsap.context(() => {
      // Natural blackening overlay on scroll
      gsap.to(blackeningOverlayRef.current, {
        opacity: 1,
        duration: 1.5,
        scrollTrigger: {
          trigger: contentSectionRef.current,
          start: 'top 60%',
          end: 'bottom 20%',
          scrub: true,
        },
      });

      // Fade out video section gradually
      gsap.to(videoSectionRef.current, {
        opacity: 0,
        duration: 2,
        scrollTrigger: {
          trigger: contentSectionRef.current,
          start: 'top 40%',
          end: 'bottom 10%',
          scrub: true,
        },
      });

      // Fade in content section with natural timing
      gsap.fromTo(contentSectionRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: contentSectionRef.current,
            start: 'top 80%',
            end: 'bottom 20%',
            scrub: true,
          },
        }
      );

      // Stagger animation for services cards
      gsap.fromTo(servicesRef.current.children,
        { opacity: 0, y: 80, scale: 0.9 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1.2,
          stagger: 0.3,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: servicesRef.current,
            start: 'top 85%',
            end: 'bottom 20%',
            scrub: true,
          },
        }
      );

      // Feature cards animation
      cardsRef.current.forEach((card, index) => {
        if (card) {
          gsap.fromTo(card,
            { opacity: 0, x: index % 2 === 0 ? -80 : 80 },
            {
              opacity: 1,
              x: 0,
              duration: 1.4,
              ease: "power2.out",
              scrollTrigger: {
                trigger: card,
                start: 'top 90%',
                end: 'bottom 20%',
                scrub: true,
              },
            }
          );
        }
      });
    });

    return () => ctx.revert();
  }, []);

  const textElements = [
    {
      id: 'reports',
      text: 'reports',
      icon: <Table className="w-8 h-8" />,
      title: 'Advanced Financial Reports',
      description: 'Comprehensive financial analysis with real-time data integration and automated insights',
      features: [
        'Real-time P&L statements',
        'Cash flow analysis',
        'Balance sheet reports',
        'Custom report builder'
      ],
      stats: '98% accuracy rate',
      color: 'from-purple-500 to-pink-500',
    },
    {
      id: 'forecasts', 
      text: 'forecasts',
      icon: <TrendingUp className="w-8 h-8" />,
      title: 'AI-Powered Forecasting',
      description: 'Predict future trends with advanced machine learning algorithms and scenario analysis',
      features: [
        'Revenue forecasting',
        'Expense predictions',
        'Market trend analysis',
        'Scenario planning'
      ],
      stats: '95% prediction accuracy',
      color: 'from-blue-500 to-cyan-500',
    },
    {
      id: 'dashboards',
      text: 'dashboards',
      icon: <BarChart3 className="w-8 h-8" />,
      title: 'Interactive Dashboards',
      description: 'Real-time data visualization and KPI tracking with customizable widgets',
      features: [
        'Customizable widgets',
        'Real-time metrics',
        'Drag & drop interface',
        'Multi-device sync'
      ],
      stats: '50+ dashboard templates',
      color: 'from-green-500 to-emerald-500',
    },
    {
      id: 'consolidations',
      text: 'consolidations',
      icon: <PieChart className="w-8 h-8" />,
      title: 'Data Consolidation',
      description: 'Unify multiple data sources into single source of truth with automated mapping',
      features: [
        'Multi-entity consolidation',
        'Automated data mapping',
        'Currency conversion',
        'Audit trail'
      ],
      stats: '10+ data sources supported',
      color: 'from-orange-500 to-red-500',
    }
  ];

  const services = [
    {
      title: "Wildlife Tracking",
      description: "Real-time tracking of wildlife using GPS and IoT devices with advanced analytics and habitat monitoring. Monitor animal movements and protect endangered species.",
      icon: "🐾",
      image: "https://images.unsplash.com/photo-1612047032414-e42c88fdf3ff?w=600&h=400&fit=crop",
      gradient: "from-green-500 to-emerald-500",
      link: "/wildlife-tracking"
    },
    {
      title: "Waste Recycling",
      description: "Efficient recycling programs and waste management solutions for sustainable future and circular economy. Reduce landfill waste and promote environmental sustainability.",
      icon: "♻️",
      image: "https://images.unsplash.com/photo-1570993896215-7acdbff8e2ef?w=600&h=400&fit=crop",
      gradient: "from-blue-500 to-cyan-500",
      link: "/waste-recycling"
    },
    {
      title: "Community Outreach",
      description: "Educating communities on sustainable practices and environmental conservation through workshops and awareness programs. Build a greener future together.",
      icon: "👥",
      image: "https://images.unsplash.com/photo-1527525443983-6e60c75fff46?w=600&h=400&fit=crop",
      gradient: "from-purple-500 to-pink-500",
      link: "/community-outreach"
    }
  ];

  const workOptions = [
    {
      title: "Individual",
      description: "Working as an individual offers greater autonomy and flexibility, allowing you to make decisions and manage your time independently. However, it often involves handling all aspects of the work, which can be overwhelming at times. Perfect for freelancers and solo entrepreneurs.",
      icon: <Users className="w-12 h-12" />,
      gradient: "from-green-500 to-blue-500",
      link: "/individual"
    },
    {
      title: "Firm",
      description: "Working as a firm allows for collaboration, resource pooling, and the ability to take on larger projects. It also provides shared responsibilities, though it may involve more coordination and less personal freedom in decision-making. Ideal for teams and organizations.",
      icon: <Target className="w-12 h-12" />,
      gradient: "from-purple-500 to-pink-500",
      link: "/firm"
    }
  ];

  const sampleGraphs = {
    reports: (
      <div className="w-full h-28 bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-xl p-3 border border-purple-500/20">
        <div className="flex items-end justify-between h-16 space-x-1">
          {[40, 55, 70, 85, 95, 85, 70, 55, 40, 60, 80, 90].map((height, index) => (
            <div
              key={index}
              className="flex-1 bg-gradient-to-t from-purple-400 to-pink-400 rounded-t transition-all duration-300 hover:opacity-80"
              style={{ height: `${height}%` }}
            ></div>
          ))}
        </div>
        <div className="text-xs text-purple-300 text-center mt-2 font-medium">Revenue Growth</div>
      </div>
    ),
    forecasts: (
      <div className="w-full h-28 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 rounded-xl p-3 border border-blue-500/20">
        <div className="relative h-16">
          <svg viewBox="0 0 100 40" className="w-full h-full">
            <path
              d="M0,20 Q25,10 50,20 T100,30"
              fill="none"
              stroke="url(#gradient)"
              strokeWidth="2"
              className="animate-dash"
            />
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#3b82f6" />
                <stop offset="100%" stopColor="#06b6d4" />
              </linearGradient>
            </defs>
          </svg>
        </div>
        <div className="text-xs text-blue-300 text-center mt-2 font-medium">AI Predictions</div>
      </div>
    ),
    dashboards: (
      <div className="w-full h-28 bg-gradient-to-br from-green-500/10 to-emerald-500/10 rounded-xl p-3 border border-green-500/20">
        <div className="grid grid-cols-3 gap-1.5 h-16">
          <div className="bg-green-400/20 rounded flex items-center justify-center hover:bg-green-400/30 transition-colors">
            <Users className="w-3 h-3 text-green-300" />
          </div>
          <div className="bg-emerald-400/20 rounded flex items-center justify-center hover:bg-emerald-400/30 transition-colors">
            <DollarSign className="w-3 h-3 text-emerald-300" />
          </div>
          <div className="bg-green-400/20 rounded flex items-center justify-center hover:bg-green-400/30 transition-colors">
            <Target className="w-3 h-3 text-green-300" />
          </div>
          <div className="bg-emerald-400/20 rounded flex items-center justify-center hover:bg-emerald-400/30 transition-colors">
            <Activity className="w-3 h-3 text-emerald-300" />
          </div>
          <div className="bg-green-400/20 rounded flex items-center justify-center hover:bg-green-400/30 transition-colors">
            <TrendingUp className="w-3 h-3 text-green-300" />
          </div>
          <div className="bg-emerald-400/20 rounded flex items-center justify-center hover:bg-emerald-400/30 transition-colors">
            <BarChart3 className="w-3 h-3 text-emerald-300" />
          </div>
        </div>
        <div className="text-xs text-green-300 text-center mt-2 font-medium">Live Metrics</div>
      </div>
    ),
    consolidations: (
      <div className="w-full h-28 bg-gradient-to-br from-orange-500/10 to-red-500/10 rounded-xl p-3 border border-orange-500/20">
        <div className="flex justify-center items-center h-16">
          <div className="relative w-12 h-12">
            <div className="absolute inset-0 rounded-full border-2 border-orange-400/30"></div>
            <div className="absolute inset-1 rounded-full border-2 border-red-400/40" style={{ clipPath: 'polygon(0 0, 100% 0, 100% 65%, 0 65%)' }}></div>
            <div className="absolute inset-2 rounded-full border-2 border-orange-300/50" style={{ clipPath: 'polygon(0 0, 100% 0, 100% 35%, 0 35%)' }}></div>
          </div>
        </div>
        <div className="text-xs text-orange-300 text-center mt-2 font-medium">Data Integration</div>
      </div>
    )
  };

  const renderTextElement = (element) => {
    const isHovered = hoveredText === element.id;
    
    return (
      <span
        key={element.id}
        className="relative inline-block mx-1"
        onMouseEnter={() => setHoveredText(element.id)}
        onMouseLeave={() => setHoveredText(null)}
      >
        {/* Main Text */}
        <span className={`
          text-3xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r ${element.color} bg-clip-text text-transparent 
          relative z-10 transition-all duration-500 ease-out
          ${isHovered ? 'scale-105 filter brightness-110' : 'scale-100'}
        `}>
          {element.text}
        </span>

        {/* Natural Pop-up Card */}
        {isHovered && (
          <div className={`
            absolute top-full left-1/2 transform -translate-x-1/2 mt-3 
            w-72 p-5 rounded-2xl backdrop-blur-xl border border-white/10 
            bg-gray-900/95 shadow-2xl z-50
            animate-in fade-in-0 zoom-in-95 duration-300 ease-out
            before:absolute before:-top-2 before:left-1/2 before:-translate-x-1/2
            before:w-4 before:h-4 before:rotate-45 before:bg-gray-900/95
            before:border-l before:border-t before:border-white/10
          `}>
            {/* Header */}
            <div className="flex items-start space-x-3 mb-4">
              <div className={`w-10 h-10 rounded-lg bg-gradient-to-r ${element.color} flex items-center justify-center flex-shrink-0 shadow-lg`}>
                {element.icon}
              </div>
              <div>
                <h3 className="text-lg font-bold text-white leading-tight mb-1">
                  {element.title}
                </h3>
                <p className="text-gray-300 text-xs leading-relaxed">
                  {element.description}
                </p>
              </div>
            </div>

            {/* Interactive Visualization */}
            <div className="mb-3">
              {sampleGraphs[element.id]}
            </div>

            {/* Features */}
            <div className="mb-3">
              <h4 className="text-xs font-semibold text-white mb-2 uppercase tracking-wide">Key Features</h4>
              <div className="space-y-1.5">
                {element.features.map((feature, index) => (
                  <div key={index} className="flex items-center text-xs text-gray-300">
                    <div className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${element.color} mr-2 flex-shrink-0`}></div>
                    <span className="leading-tight">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Stats Badge */}
            <div className={`px-3 py-1.5 rounded-lg bg-gradient-to-r ${element.color}/10 border ${element.color.replace('from-', 'border-').replace(' to-', '/20')}`}>
              <div className="text-xs font-semibold text-white text-center">
                {element.stats}
              </div>
            </div>
          </div>
        )}

        {/* Subtle Glow Effect */}
        {isHovered && (
          <div className={`
            absolute inset-0 bg-gradient-to-r ${element.color} opacity-15 blur-md rounded-full -z-10
            transition-all duration-500 ease-out
          `}></div>
        )}
      </span>
    );
  };

  const addToCardsRef = (el) => {
    if (el && !cardsRef.current.includes(el)) {
      cardsRef.current.push(el);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      <Navbar />
      
      {/* Natural Blackening Overlay */}
      <div
        ref={blackeningOverlayRef}
        className="fixed inset-0 bg-gradient-to-b from-black/0 via-black/60 to-black z-5 pointer-events-none opacity-0"
      />
      
      {/* Video Background Section */}
      <section ref={videoSectionRef} className="fixed inset-0 z-0">
        <video
          autoPlay
          muted
          loop
          className="w-full h-full object-cover"
          src="https://www.pexels.com/download/video/6981404/"
        >
          Your browser does not support the video tag.
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/60"></div>
      </section>

      {/* Main Content */}
      <div className="relative z-10">
        {/* Hero Section */}
        <section className="min-h-screen flex items-center justify-center pt-20 px-4">
          <div className="container mx-auto text-center max-w-6xl">
            {/* Main Heading */}
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-black mb-8 leading-tight">
              Create{' '}
              {textElements.slice(0, 2).map((element, index) => (
                <React.Fragment key={element.id}>
                  {renderTextElement(element)}
                  {index === 0 ? ',' : ''}
                  <br className="hidden md:block" />
                </React.Fragment>
              ))}
              {renderTextElement(textElements[2])} &{' '}
              {renderTextElement(textElements[3])}
            </h1>
            
            {/* AI Badge */}
            <div className="flex items-center justify-center mb-8">
              <div className="inline-flex items-center bg-black/50 backdrop-blur-md border border-purple-500/30 rounded-full px-6 py-3 shadow-2xl">
                <Zap className="w-5 h-5 text-yellow-400 mr-2 animate-pulse" />
                <span className="text-lg font-semibold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                  Now with AI-insights
                </span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <button className="group bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold text-lg px-8 py-4 rounded-full transition-all duration-300 transform hover:scale-105 shadow-2xl hover:shadow-purple-500/30 flex items-center">
                <span>Start 14-day free trial</span>
                <ChevronRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 text-white font-semibold text-lg px-8 py-4 rounded-full transition-all duration-300 hover:scale-105 shadow-lg">
                See what we do
              </button>
            </div>

            {/* Ratings */}
            <div className="flex flex-col sm:flex-row justify-center items-center gap-6 mb-8">
              <div className="flex items-center space-x-4 bg-black/30 backdrop-blur-sm rounded-2xl px-6 py-4 border border-white/10">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <div className="text-sm">
                  <span className="font-bold text-white">4.8</span>
                  <span className="text-gray-300 mx-2">on</span>
                  <span className="font-semibold">Capterra</span>
                </div>
              </div>

              <div className="flex items-center space-x-4 bg-black/30 backdrop-blur-sm rounded-2xl px-6 py-4 border border-white/10">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <div className="flex items-center text-sm">
                  <MessageCircle className="w-4 h-4 mr-2" />
                  <span className="font-bold text-white">4.8</span>
                  <span className="text-gray-300 mx-2">on</span>
                  <span className="font-semibold">G2</span>
                </div>
              </div>
            </div>

            {/* Reviews */}
            <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-400">
              <div className="bg-black/20 backdrop-blur-sm rounded-xl px-4 py-2">
                <span className="font-bold text-white">350+</span> reviews on Xero
              </div>
              <div className="bg-black/20 backdrop-blur-sm rounded-xl px-4 py-2">
                <span className="font-bold text-white">550+</span> reviews on G2
              </div>
            </div>
          </div>
        </section>

        {/* Black Background Content Section */}
        <section ref={contentSectionRef} className="min-h-screen bg-black py-20 relative">
          <div className="absolute inset-0 bg-gradient-to-b from-gray-900 via-black to-black"></div>
          <div className="container mx-auto px-4 relative z-10">
            
            {/* Work Options Section */}
            <div className="mb-20">
              <h2 className="text-5xl md:text-6xl font-black text-center mb-16 bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
                You are working as a ?
              </h2>
              
              <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                {workOptions.map((option, index) => (
                  <a
                    key={index}
                    href={option.link}
                    className="group relative bg-gradient-to-br from-gray-800 to-gray-900 rounded-3xl p-8 border-2 border-gray-700 hover:border-transparent transition-all duration-500 hover:scale-105 hover:shadow-2xl overflow-hidden text-center"
                  >
                    {/* Animated Background */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${option.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}></div>
                    
                    <div className="relative z-10">
                      <div className={`w-20 h-20 rounded-2xl bg-gradient-to-r ${option.gradient} flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300`}>
                        {option.icon}
                      </div>
                      <h3 className="text-3xl font-bold text-white mb-4">{option.title}</h3>
                      <p className="text-gray-300 leading-relaxed text-lg">
                        {option.description}
                      </p>
                    </div>
                    
                    {/* Hover Border Effect */}
                    <div className={`absolute inset-0 rounded-3xl bg-gradient-to-r ${option.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10`}>
                      <div className="absolute inset-[3px] rounded-3xl bg-black"></div>
                    </div>

                    {/* Hover Arrow */}
                    <div className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 transform translate-x-4 group-hover:translate-x-0 transition-all duration-300">
                      <ArrowRight className="w-6 h-6 text-white" />
                    </div>
                  </a>
                ))}
              </div>
            </div>

            {/* Services Section */}
            <div ref={servicesRef} className="mb-20">
              <h2 className="text-5xl md:text-6xl font-black text-center mb-16 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Our Services...
              </h2>
              
              <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                {services.map((service, index) => (
                  <a
                    key={index}
                    href={service.link}
                    className="group relative bg-gradient-to-br from-gray-800 to-gray-900 rounded-3xl p-6 border-2 border-gray-700 hover:border-transparent transition-all duration-500 hover:scale-105 hover:shadow-2xl overflow-hidden"
                  >
                    {/* Background Image */}
                    <div 
                      className="absolute inset-0 bg-cover bg-center opacity-20 group-hover:opacity-30 transition-all duration-500"
                      style={{ backgroundImage: `url(${service.image})` }}
                    ></div>
                    
                    <div className="relative z-10">
                      <div className="text-4xl mb-4 transform group-hover:scale-110 transition-transform duration-300">
                        {service.icon}
                      </div>
                      <h3 className="text-2xl font-bold text-white mb-4">{service.title}</h3>
                      <p className="text-gray-300 leading-relaxed">{service.description}</p>
                    </div>
                    
                    {/* Hover Border Effect */}
                    <div className={`absolute inset-0 rounded-3xl bg-gradient-to-r ${service.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10`}>
                      <div className="absolute inset-[3px] rounded-3xl bg-black"></div>
                    </div>

                    {/* Hover Arrow */}
                    <div className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 transform translate-x-4 group-hover:translate-x-0 transition-all duration-300">
                      <ArrowRight className="w-6 h-6 text-white" />
                    </div>
                  </a>
                ))}
              </div>
            </div>

            {/* Gallery Section */}
            <div className="mb-20">
              <h2 className="text-5xl md:text-6xl font-black text-center mb-16 bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                Gallery...
              </h2>
              
              <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
                <img 
                  src="https://images.unsplash.com/photo-1612047032414-e42c88fdf3ff?w=500&h=400&fit=crop" 
                  alt="Wildlife" 
                  className="rounded-2xl shadow-2xl hover:scale-105 transition-transform duration-500 cursor-pointer"
                />
                <img 
                  src="https://images.unsplash.com/photo-1570993896215-7acdbff8e2ef?w=500&h=400&fit=crop" 
                  alt="Waste Management" 
                  className="rounded-2xl shadow-2xl hover:scale-105 transition-transform duration-500 cursor-pointer"
                />
                <img 
                  src="https://images.unsplash.com/photo-1527525443983-6e60c75fff46?w=500&h=400&fit=crop" 
                  alt="Community" 
                  className="rounded-2xl shadow-2xl hover:scale-105 transition-transform duration-500 cursor-pointer"
                />
              </div>
            </div>

            {/* Enhanced Footer Section */}
            <div className="bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white py-16 relative overflow-hidden rounded-3xl mt-20">
              {/* Background Pattern */}
              <div className="absolute inset-0 opacity-5">
                <div className="absolute inset-0" style={{
                  backgroundImage: `radial-gradient(circle at 25px 25px, rgba(255,255,255,0.3) 2%, transparent 0%), 
                                  radial-gradient(circle at 75px 75px, rgba(255,255,255,0.2) 2%, transparent 0%)`,
                  backgroundSize: '100px 100px'
                }}></div>
              </div>

              {/* Animated Background Elements */}
              <div className="absolute top-0 left-0 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
              <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>

              {/* Enhanced Moving Logos Section */}
              <div className="relative overflow-hidden py-12 mb-12">
                {/* Gradient Overlays */}
                <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-black to-transparent z-10"></div>
                <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-black to-transparent z-10"></div>
                
                <div className="flex space-x-16 animate-scroll">
                  {/* Triple the companies for smoother loop */}
                  {[...Array(3)].map((_, loopIndex) => 
                    [
                      { name: 'EcoTech', icon: '🌿', color: 'from-green-400 to-emerald-400' },
                      { name: 'GreenFuture', icon: '🚀', color: 'from-blue-400 to-cyan-400' },
                      { name: 'EarthGuard', icon: '🛡️', color: 'from-purple-400 to-pink-400' },
                      { name: 'SustainableCo', icon: '♻️', color: 'from-green-400 to-blue-400' },
                      { name: 'CleanEnergy', icon: '⚡', color: 'from-yellow-400 to-orange-400' },
                      { name: 'BioSolutions', icon: '🔬', color: 'from-emerald-400 to-teal-400' },
                      { name: 'EcoInnovate', icon: '💡', color: 'from-indigo-400 to-purple-400' },
                      { name: 'PlanetFirst', icon: '🌎', color: 'from-cyan-400 to-blue-400' }
                    ].map((company, index) => (
                      <div 
                        key={`${loopIndex}-${index}`} 
                        className="flex-shrink-0 group cursor-pointer transform hover:scale-110 transition-all duration-500"
                      >
                        <div className="flex items-center space-x-4 px-6 py-4 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-white/30 hover:bg-white/10 transition-all duration-300">
                          <div className={`text-2xl transform group-hover:scale-125 transition-transform duration-300`}>
                            {company.icon}
                          </div>
                          <div className="text-center">
                            <div className={`text-xl font-bold bg-gradient-to-r ${company.color} bg-clip-text text-transparent group-hover:filter group-hover:brightness-110 transition-all duration-300`}>
                              {company.name}
                            </div>
                            <div className="text-xs text-gray-400 mt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                              Trusted Partner
                            </div>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>

              {/* Enhanced Footer Content */}
              <div className="container mx-auto px-6 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-4 md:grid-cols-2 gap-8 mb-12">
                  {/* Company Info - Enhanced */}
                  <div className="lg:col-span-2">
                    <div className="flex items-center mb-6">
                      <div className="w-12 h-12 rounded-2xl bg-gradient-to-r from-green-500 to-blue-500 flex items-center justify-center mr-4 shadow-2xl">
                        <span className="text-white font-bold text-lg">EA</span>
                      </div>
                      <h3 className="text-3xl font-black bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
                        Eco Alliance
                      </h3>
                    </div>
                    <p className="text-gray-300 text-lg leading-relaxed mb-6 max-w-2xl">
                      Uniting visionary companies for a sustainable future. Together we drive innovation, 
                      create positive environmental impact, and build a greener tomorrow for generations to come.
                    </p>
                    
                    {/* Enhanced Social Media */}
                    <div className="flex space-x-4">
                      {[
                        { name: 'Twitter', icon: '🐦', color: 'hover:from-blue-400 hover:to-cyan-400' },
                        { name: 'LinkedIn', icon: '💼', color: 'hover:from-blue-600 hover:to-blue-800' },
                        { name: 'Instagram', icon: '📸', color: 'hover:from-purple-500 hover:to-pink-500' },
                        { name: 'Facebook', icon: '👥', color: 'hover:from-blue-500 hover:to-blue-700' },
                        { name: 'YouTube', icon: '🎥', color: 'hover:from-red-500 hover:to-red-600' }
                      ].map((social) => (
                        <a 
                          key={social.name}
                          href="#" 
                          className={`w-12 h-12 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 flex items-center justify-center text-lg transition-all duration-300 transform hover:scale-110 hover:shadow-2xl ${social.color} hover:bg-gradient-to-r group`}
                        >
                          <span className="group-hover:scale-110 transition-transform duration-300">
                            {social.icon}
                          </span>
                        </a>
                      ))}
                    </div>
                  </div>

                  {/* Quick Links - Enhanced */}
                  <div>
                    <h4 className="text-xl font-bold mb-6 flex items-center">
                      <span className="w-2 h-6 bg-gradient-to-b from-green-400 to-blue-400 rounded-full mr-3"></span>
                      Quick Links
                    </h4>
                    <ul className="space-y-3">
                      {['About Us', 'Our Mission', 'Partners', 'Careers', 'News', 'Blog', 'Events', 'Contact'].map((link) => (
                        <li key={link}>
                          <a href="#" className="group flex items-center text-gray-300 hover:text-white transition-all duration-300 transform hover:translate-x-2">
                            <div className="w-1.5 h-1.5 bg-gradient-to-r from-green-400 to-blue-400 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            <span className="text-lg hover:font-medium transition-all duration-300">{link}</span>
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Contact & Newsletter - Enhanced */}
                  <div>
                    <h4 className="text-xl font-bold mb-6 flex items-center">
                      <span className="w-2 h-6 bg-gradient-to-b from-purple-400 to-pink-400 rounded-full mr-3"></span>
                      Stay Connected
                    </h4>
                    
                    {/* Contact Info */}
                    <div className="space-y-4 mb-6">
                      {[
                        { icon: '📧', text: 'hello@ecoalliance.org' },
                        { icon: '📞', text: '+1 (555) 123-4567' },
                        { icon: '📍', text: '123 Green Street, Eco City' },
                        { icon: '🌐', text: 'EC 12345, Earth' }
                      ].map((item, index) => (
                        <div key={index} className="flex items-center text-gray-300 group">
                          <span className="text-lg mr-3 group-hover:scale-110 transition-transform duration-300">{item.icon}</span>
                          <span className="text-lg group-hover:text-white transition-colors duration-300">{item.text}</span>
                        </div>
                      ))}
                    </div>

                    {/* Newsletter Signup */}
                    <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-4 border border-white/10 hover:border-white/20 transition-all duration-300">
                      <p className="text-gray-300 text-sm mb-3">Join our newsletter</p>
                      <div className="flex space-x-2">
                        <input 
                          type="email" 
                          placeholder="Your email..."
                          className="flex-1 bg-white/10 border border-white/20 rounded-xl px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-green-400 transition-colors duration-300"
                        />
                        <button className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white px-4 py-2 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg">
                          Join
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Enhanced Bottom Bar */}
                <div className="border-t border-gray-800 pt-8">
                  <div className="flex flex-col lg:flex-row justify-between items-center space-y-4 lg:space-y-0">
                    {/* Copyright */}
                    <div className="text-gray-400 text-lg">
                      <span>&copy; 2024 Eco Alliance. </span>
                      <span className="text-transparent bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text font-medium">
                        Building a sustainable future together.
                      </span>
                    </div>

                    {/* Additional Links */}
                    <div className="flex space-x-6 text-gray-400">
                      {['Privacy Policy', 'Terms of Service', 'Cookies', 'Security'].map((link) => (
                        <a 
                          key={link} 
                          href="#" 
                          className="hover:text-white transition-colors duration-300 text-lg hover:underline"
                        >
                          {link}
                        </a>
                      ))}
                    </div>
                  </div>

                  {/* Achievement Badges */}
                  <div className="flex justify-center space-x-6 mt-8">
                    {[
                      { label: 'Carbon Neutral', emoji: '🌱' },
                      { label: '100% Renewable', emoji: '⚡' },
                      { label: 'Ethical Partner', emoji: '🤝' },
                      { label: 'Green Certified', emoji: '✅' }
                    ].map((badge, index) => (
                      <div 
                        key={index}
                        className="flex items-center space-x-2 bg-white/5 backdrop-blur-sm rounded-full px-4 py-2 border border-white/10 hover:border-green-400/50 transition-all duration-300 transform hover:scale-105"
                      >
                        <span className="text-lg">{badge.emoji}</span>
                        <span className="text-gray-300 text-sm font-medium">{badge.label}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Enhanced Scrolling Animation */}
              <style>{`
                @keyframes scroll {
                  0% {
                    transform: translateX(0);
                  }
                  100% {
                    transform: translateX(-66.666%);
                  }
                }
                .animate-scroll {
                  animation: scroll 40s linear infinite;
                  display: flex;
                  width: max-content;
                }
                .animate-scroll:hover {
                  animation-play-state: paused;
                }
                
                /* Smooth gradient transitions */
                .bg-gradient-to-r {
                  transition: background-position 0.3s ease;
                  background-size: 200% 200%;
                }
                
                .bg-gradient-to-r:hover {
                  background-position: 100% 100%;
                }
              `}</style>
            </div>
          </div>
        </section>
      </div>

      {/* Custom Styles for Animations */}
      <style>{`
        @keyframes dash {
          to {
            stroke-dashoffset: -100;
          }
        }
        .animate-dash {
          stroke-dasharray: 100;
          stroke-dashoffset: 100;
          animation: dash 3s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default Home;