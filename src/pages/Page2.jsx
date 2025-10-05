// page2.jsx
'use client';

import { useState } from 'react';
import Navbar from '../components/Navbar';

const Page2 = () => {
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

  // Features/Services data
  const features = [
    {
      icon: "📊",
      title: "Advanced Analytics",
      description: "Real-time carbon footprint tracking and predictive analytics for better decision making.",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: "🌍",
      title: "Global Compliance",
      description: "Stay compliant with international environmental regulations and reporting standards.",
      color: "from-green-500 to-emerald-500"
    },
    {
      icon: "⚡",
      title: "Energy Optimization",
      description: "AI-powered recommendations to reduce energy consumption and improve efficiency.",
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: "📈",
      title: "Performance Dashboard",
      description: "Comprehensive visualizations and KPI tracking for sustainability metrics.",
      color: "from-orange-500 to-red-500"
    },
    {
      icon: "🔒",
      title: "Data Security",
      description: "Enterprise-grade security ensuring your environmental data remains protected.",
      color: "from-indigo-500 to-blue-500"
    },
    {
      icon: "🔄",
      title: "Automated Reporting",
      description: "Generate compliance reports and sustainability disclosures with one click.",
      color: "from-teal-500 to-green-500"
    }
  ];

  const services = [
    {
      title: "Carbon Accounting",
      description: "Complete carbon footprint measurement across scope 1, 2, and 3 emissions.",
      features: ["Real-time tracking", "Automated reporting", "Benchmarking", "Compliance ready"]
    },
    {
      title: "Energy Management",
      description: "Optimize energy consumption and reduce costs through intelligent monitoring.",
      features: ["Smart metering", "Peak demand management", "Renewable integration", "Cost analysis"]
    },
    {
      title: "Sustainability Strategy",
      description: "Develop and implement comprehensive sustainability roadmaps.",
      features: ["Goal setting", "Stakeholder engagement", "Progress tracking", "Certification support"]
    },
    {
      title: "ESG Reporting",
      description: "Streamlined environmental, social, and governance reporting framework.",
      features: ["Framework alignment", "Data collection", "Stakeholder communication", "Audit ready"]
    }
  ];

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

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-800 to-gray-900">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">
              Powerful <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Features</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Comprehensive tools and insights to drive your sustainability initiatives forward
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index}
                className="bg-gray-800 rounded-2xl p-6 border border-gray-700 hover:border-gray-600 transition-all duration-300 hover:transform hover:scale-105 group"
              >
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${feature.color} flex items-center justify-center text-2xl mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-300 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-900">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">
              Our <span className="bg-gradient-to-r from-green-400 to-cyan-400 bg-clip-text text-transparent">Services</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              End-to-end sustainability solutions tailored to your organization's needs
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <div 
                key={index}
                className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-3xl p-8 border border-gray-700 hover:border-blue-500 transition-all duration-500 hover:shadow-2xl hover:shadow-blue-500/10"
              >
                <h3 className="text-2xl font-bold text-white mb-4">
                  {service.title}
                </h3>
                <p className="text-gray-300 mb-6 text-lg">
                  {service.description}
                </p>
                <div className="grid grid-cols-2 gap-3">
                  {service.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                      <span className="text-gray-300 text-sm">{feature}</span>
                    </div>
                  ))}
                </div>
                <button className="mt-6 bg-blue-600 hover:bg-blue-500 text-white px-6 py-2 rounded-lg transition-all duration-300 font-medium transform hover:scale-105">
                  Learn More
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Transform Your Sustainability Journey?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join thousands of organizations using our platform to drive meaningful environmental impact and business value.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-blue-600 px-8 py-4 rounded-xl font-bold text-lg hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-2xl">
              Start Free Trial
            </button>
            <button className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-white hover:text-blue-600 transition-all duration-300 transform hover:scale-105">
              Schedule Demo
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Page2;