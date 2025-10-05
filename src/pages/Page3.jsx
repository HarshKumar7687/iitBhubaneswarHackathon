import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '../components/Navbar';

const Page3 = () => {
  const [activeFilter, setActiveFilter] = useState('All');
  const [activeStatus, setActiveStatus] = useState('Complete');
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [ripples, setRipples] = useState([]);
  const canvasRef = useRef(null);
  const pageRef = useRef(null);

  const testimonials = [
    {
      id: 1,
      name: "Sarah Johnson",
      role: "Sustainability Director",
      company: "EcoBuild Inc.",
      content: "This carbon tracking system has revolutionized how we approach construction projects. We've reduced our embodied carbon by 35% in just one year.",
      avatar: "SJ",
      rating: 5
    },
    {
      id: 2,
      name: "Michael Chen",
      role: "Architect",
      company: "Green Design Studio",
      content: "The intuitive visualization and real-time data helped our team make informed decisions that significantly lowered our environmental impact.",
      avatar: "MC",
      rating: 5
    },
    {
      id: 3,
      name: "Emma Rodriguez",
      role: "Project Manager",
      company: "Sustainable Construct Co.",
      content: "Finally, a tool that makes carbon accounting accessible and actionable. Our clients love the clear, compelling data presentation.",
      avatar: "ER",
      rating: 5
    },
    {
      id: 4,
      name: "Alex Thompson",
      role: "Environmental Consultant",
      company: "EarthFirst Solutions",
      content: "The data-driven insights from this platform have helped us achieve LEED certification for 12 consecutive projects.",
      avatar: "AT",
      rating: 5
    }
  ];

  const carbonData = [
    { value: 675, label: 'Project A' },
    { value: 677, label: 'Project B' },
    { value: 550, label: 'Project C' },
    { value: 551, label: 'Project D' },
    { value: 552, label: 'Project E' },
    { value: 559, label: 'Project F' },
    { value: 569, label: 'Project G' },
    { value: 569, label: 'Project H' },
    { value: 269, label: 'Project I' },
    { value: 29, label: 'Project J' },
    { value: 82, label: 'Project K' },
    { value: 44, label: 'Project L' },
    { value: 109, label: 'Project M' },
    { value: 106, label: 'Project N' },
  ];

  // Auto-rotate testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [testimonials.length]);

  // Create ripple effect on page hover
  const createRipple = (event) => {
    const page = pageRef.current;
    if (!page) return;

    const rect = page.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const diameter = Math.max(rect.width, rect.height);
    const radius = diameter / 2;

    const newRipple = {
      id: Date.now(),
      x,
      y,
      diameter,
    };

    setRipples((prev) => [...prev, newRipple]);

    // Remove ripple after animation
    setTimeout(() => {
      setRipples((prev) => prev.filter((ripple) => ripple.id !== newRipple.id));
    }, 600);
  };

  const drawGraph = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;
    const padding = 60;
    const graphWidth = width - padding * 2;
    const graphHeight = height - padding * 2;

    // Clear canvas
    ctx.clearRect(0, 0, width, height);

    // Draw dark background
    ctx.fillStyle = '#0f172a';
    ctx.fillRect(0, 0, width, height);

    // Draw grid lines
    ctx.strokeStyle = '#334155';
    ctx.lineWidth = 1;
    
    // Horizontal grid lines
    for (let i = 0; i <= 5; i++) {
      const y = padding + (i * graphHeight / 5);
      ctx.beginPath();
      ctx.moveTo(padding, y);
      ctx.lineTo(width - padding, y);
      ctx.stroke();
    }

    // Draw target lines
    ctx.strokeStyle = '#ef4444';
    ctx.setLineDash([5, 5]);
    ctx.lineWidth = 2;
    
    // 2030 target line
    const target2030Y = padding + graphHeight - (500 / 900) * graphHeight;
    ctx.beginPath();
    ctx.moveTo(padding, target2030Y);
    ctx.lineTo(width - padding, target2030Y);
    ctx.stroke();
    
    // 2025 target line
    const target2025Y = padding + graphHeight - (600 / 900) * graphHeight;
    ctx.beginPath();
    ctx.moveTo(padding, target2025Y);
    ctx.lineTo(width - padding, target2025Y);
    ctx.stroke();
    
    ctx.setLineDash([]);

    // Draw bars
    const barWidth = graphWidth / carbonData.length - 10;
    const maxValue = 900;

    carbonData.forEach((item, index) => {
      const barHeight = (item.value / maxValue) * graphHeight;
      const x = padding + index * (barWidth + 10) + 5;
      const y = padding + graphHeight - barHeight;

      // Bar gradient for dark theme
      const gradient = ctx.createLinearGradient(x, y, x, y + barHeight);
      gradient.addColorStop(0, '#60a5fa');
      gradient.addColorStop(1, '#3b82f6');

      ctx.fillStyle = gradient;
      ctx.fillRect(x, y, barWidth, barHeight);

      // Add subtle glow effect
      ctx.shadowColor = '#3b82f6';
      ctx.shadowBlur = 10;
      ctx.fillRect(x, y, barWidth, barHeight);
      ctx.shadowBlur = 0;

      // Bar value
      ctx.fillStyle = '#f1f5f9';
      ctx.font = '12px Arial';
      ctx.textAlign = 'center';
      ctx.fillText(item.value.toString(), x + barWidth / 2, y - 10);

      // Bar label
      ctx.fillStyle = '#94a3b8';
      ctx.font = '10px Arial';
      ctx.textAlign = 'center';
      ctx.fillText(item.label, x + barWidth / 2, height - padding + 20);
    });

    // Draw y-axis labels
    ctx.fillStyle = '#94a3b8';
    ctx.font = '12px Arial';
    ctx.textAlign = 'right';
    for (let i = 0; i <= 5; i++) {
      const value = (i * 180);
      const y = padding + (i * graphHeight / 5);
      ctx.fillText(value.toString(), padding - 10, y + 4);
    }

    // Draw target labels
    ctx.fillStyle = '#ef4444';
    ctx.font = '10px Arial';
    ctx.textAlign = 'left';
    ctx.fillText('Target 2030 (500)', width - padding - 100, target2030Y - 5);
    ctx.fillText('Target 2025 (600)', width - padding - 100, target2025Y - 5);
  };

  useEffect(() => {
    drawGraph();
    
    const handleResize = () => {
      const canvas = canvasRef.current;
      if (canvas) {
        canvas.width = canvas.offsetWidth;
        canvas.height = 400;
        drawGraph();
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const testimonialVariants = {
    enter: (direction) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction) => ({
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    }),
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black">
    <Navbar />
    <div 
      ref={pageRef}
      className="min-h-screen bg-gradient-to-br from-gray-900 to-slate-900 py-8 px-4 relative overflow-hidden cursor-none"
      onMouseMove={createRipple}
    >
      {/* Ripple Effects */}
      {ripples.map((ripple) => (
        <motion.div
          key={ripple.id}
          className="absolute rounded-full pointer-events-none bg-blue-500/20"
          style={{
            left: ripple.x - ripple.diameter / 2,
            top: ripple.y - ripple.diameter / 2,
            width: ripple.diameter,
            height: ripple.diameter,
          }}
          initial={{ scale: 0, opacity: 0.5 }}
          animate={{ scale: 1, opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        />
      ))}

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Testimonials Section */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <motion.h1 
              className="text-4xl md:text-5xl font-bold text-white mb-4"
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              What Our Clients Say
            </motion.h1>
            <motion.p 
              className="text-xl text-gray-300 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: -30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Discover how our carbon tracking solutions are transforming sustainable construction
            </motion.p>
          </div>

          {/* Animated Testimonials Carousel */}
          <div className="relative h-96 mb-12">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentTestimonial}
                variants={testimonialVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: "spring", stiffness: 300, damping: 30 },
                  opacity: { duration: 0.4 }
                }}
                className="absolute inset-0 flex items-center justify-center"
              >
                <div className="bg-gradient-to-br from-slate-800 to-gray-900 rounded-2xl shadow-2xl p-8 max-w-2xl mx-auto border border-slate-700 relative overflow-hidden">
                  {/* Animated Background */}
                  <motion.div 
                    className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10"
                    animate={{
                      backgroundPosition: ['0% 0%', '100% 100%'],
                    }}
                    transition={{
                      duration: 10,
                      repeat: Infinity,
                      repeatType: 'reverse',
                    }}
                  />
                  
                  <div className="relative z-10">
                    <div className="flex items-center mb-6">
                      <motion.div 
                        className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-xl mr-6 shadow-lg"
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        {testimonials[currentTestimonial].avatar}
                      </motion.div>
                      <div>
                        <h3 className="font-semibold text-white text-xl">
                          {testimonials[currentTestimonial].name}
                        </h3>
                        <p className="text-gray-300">{testimonials[currentTestimonial].role}</p>
                        <p className="text-blue-400">{testimonials[currentTestimonial].company}</p>
                      </div>
                    </div>
                    
                    <motion.p 
                      className="text-gray-200 italic text-lg leading-relaxed mb-6"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.3 }}
                    >
                      "{testimonials[currentTestimonial].content}"
                    </motion.p>
                    
                    <div className="flex justify-between items-center">
                      <div className="flex">
                        {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                          <motion.svg 
                            key={i}
                            className="w-6 h-6 text-yellow-400" 
                            fill="currentColor" 
                            viewBox="0 0 20 20"
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.5 + i * 0.1 }}
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                          </motion.svg>
                        ))}
                      </div>
                      
                      <motion.div 
                        className="text-gray-400 text-sm"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.8 }}
                      >
                        {currentTestimonial + 1} / {testimonials.length}
                      </motion.div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Navigation Dots */}
            <div className="flex justify-center mt-8 space-x-3">
              {testimonials.map((_, index) => (
                <motion.button
                  key={index}
                  className={`w-3 h-3 rounded-full transition-all ${
                    index === currentTestimonial 
                      ? 'bg-blue-500 scale-125' 
                      : 'bg-gray-600 hover:bg-gray-500'
                  }`}
                  onClick={() => setCurrentTestimonial(index)}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                />
              ))}
            </div>
          </div>

          {/* CTA Button */}
          <div className="text-center">
            <motion.button
              className="relative overflow-hidden bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-full font-semibold text-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-2xl border border-blue-400/30"
              whileHover={{ 
                scale: 1.05,
                boxShadow: "0 20px 40px rgba(59, 130, 246, 0.3)"
              }}
              whileTap={{ scale: 0.95 }}
            >
              View More Success Stories
              <motion.div 
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12"
                animate={{ x: [-100, 300] }}
                transition={{ 
                  duration: 1.5, 
                  repeat: Infinity,
                  repeatDelay: 2 
                }}
              />
            </motion.button>
          </div>
        </section>

        {/* Graph Section */}
        <motion.section 
          className="bg-gradient-to-br from-slate-800 to-gray-900 rounded-2xl shadow-2xl p-6 md:p-8 border border-slate-700"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8 gap-4">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
                EMBODIED CARBON EMISSIONS
              </h2>
              <p className="text-gray-300">Intensity measured by kgCO₂/m²</p>
            </div>
            
            <motion.button 
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium relative overflow-hidden border border-blue-500/30"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Download the data
            </motion.button>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap gap-6 mb-8">
            <div>
              <h3 className="text-sm font-semibold text-gray-300 mb-2">Type</h3>
              <div className="flex gap-2">
                {['All', 'Refurbishment', 'New build'].map((type) => (
                  <motion.button
                    key={type}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 relative overflow-hidden ${
                      activeFilter === type
                        ? 'bg-blue-600 text-white shadow-lg border border-blue-400/30'
                        : 'bg-slate-700 text-gray-300 hover:bg-slate-600 border border-slate-600'
                    }`}
                    onClick={() => setActiveFilter(type)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {type}
                  </motion.button>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-gray-300 mb-2">Status</h3>
              <div className="flex gap-2">
                {['Complete', 'Estimate'].map((status) => (
                  <motion.button
                    key={status}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 relative overflow-hidden ${
                      activeStatus === status
                        ? 'bg-blue-600 text-white shadow-lg border border-blue-400/30'
                        : 'bg-slate-700 text-gray-300 hover:bg-slate-600 border border-slate-600'
                    }`}
                    onClick={() => setActiveStatus(status)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {status}
                  </motion.button>
                ))}
              </div>
            </div>
          </div>

          {/* Key */}
          <div className="flex flex-wrap gap-4 mb-6">
            <div className="flex items-center gap-2">
              <div className="w-4 h-0.5 bg-red-500"></div>
              <span className="text-sm text-gray-300">500 kgCO₂/m² - Embodied Carbon Target 2030</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-0.5 bg-red-500 border-dashed border"></div>
              <span className="text-sm text-gray-300">600 kgCO₂/m² - Embodied Carbon Target 2025</span>
            </div>
          </div>

          {/* Graph Canvas */}
          <div className="border border-slate-600 rounded-lg p-4 bg-slate-900/50">
            <canvas
              ref={canvasRef}
              className="w-full h-[400px] rounded"
            />
          </div>
        </motion.section>
      </div>

      {/* Custom cursor */}
      <motion.div
        className="fixed w-8 h-8 pointer-events-none z-50 mix-blend-difference"
        animate={{
          x: ripples[ripples.length - 1]?.x - 16 || 0,
          y: ripples[ripples.length - 1]?.y - 16 || 0,
        }}
        transition={{ type: "spring", stiffness: 500, damping: 28 }}
      >
        <div className="w-2 h-2 bg-white rounded-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
        <motion.div 
          className="absolute inset-0 border-2 border-white rounded-full"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 1, repeat: Infinity }}
        />
      </motion.div>
    </div>
    </div>
  );
};

export default Page3;