"use client";
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Head from 'next/head';
import Link from 'next/link';
import { Button } from "@/components/ui/button";
import { ArrowRight, Camera, ChefHat, Utensils, ShoppingCart, Clock } from 'lucide-react';

export default function ProfessionalLandingPage() {
  const [mounted, setMounted] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  
  // Handle scroll events for parallax effects
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // Only show UI once mounted to avoid hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <>
      <Head>
        <title>Image2Plate | AI-Powered Recipe Generation from Food Photos</title>
        <meta name="description" content="Transform any food photo into a detailed recipe with our AI technology. Identify ingredients and create delicious meals with ease." />
      </Head>

      <main className="overflow-hidden">
        {/* Hero Section with Parallax */}
        <section className="relative py-20 lg:py-32 flex items-center justify-center overflow-hidden">
          {/* Hero Background - Different for light/dark modes */}
          <div className="absolute inset-0 bg-gradient-to-br from-orange-50 via-amber-50 to-white dark:from-gray-900 dark:via-gray-800 dark:to-black -z-10" />
          
          {/* Parallax floating food images - contained within viewport */}
          <motion.div 
            className="absolute inset-0 opacity-10 dark:opacity-20"
            style={{ y: scrollY * 0.1 }} // Reduced parallax intensity
          >
            <div className="absolute top-[10%] left-[15%] w-24 h-24 md:w-32 md:h-32 rounded-full bg-orange-200 dark:bg-orange-700 blur-xl" />
            <div className="absolute top-[40%] right-[5%] w-28 h-28 md:w-40 md:h-40 rounded-full bg-amber-200 dark:bg-amber-800 blur-xl" />
            <div className="absolute bottom-[15%] left-[20%] w-24 h-24 md:w-36 md:h-36 rounded-full bg-red-200 dark:bg-red-900 blur-xl" />
          </motion.div>

          {/* Hero Content */}
          <div className="container mx-auto px-4 z-10">
            <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
              {/* Left side - Text content */}
              <motion.div 
                className="flex-1 text-center lg:text-left max-w-2xl mx-auto lg:mx-0"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              >
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3, duration: 0.8 }}
                  className="inline-block mb-4 px-4 py-2 bg-orange-100 dark:bg-orange-900/40 rounded-full text-orange-600 dark:text-orange-300 font-medium text-sm md:text-base"
                >
                  AI-Powered Cooking Assistant
                </motion.div>
                
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6">
                  <span className="text-gray-900 dark:text-white">Turn </span>
                  <span className="bg-gradient-to-r from-orange-500 to-red-600 dark:from-orange-400 dark:to-red-500 text-transparent bg-clip-text">Food Photos</span>
                  <span className="text-gray-900 dark:text-white"> into</span>
                  <span className="block mt-2 bg-gradient-to-r from-red-600 to-orange-500 dark:from-red-500 dark:to-orange-400 text-transparent bg-clip-text">Delicious Recipes</span>
                </h1>
                
                <p className="text-base md:text-lg mb-6 text-gray-600 dark:text-gray-300 max-w-xl">
                  Snap a photo of any ingredients or dish, and our AI instantly identifies what&apos;s in your picture and creates the perfect recipe for you.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                  <Button size="lg" className="bg-orange-500 hover:bg-orange-600 dark:bg-orange-600 dark:hover:bg-orange-700 text-white py-2 px-6 text-base font-medium">
                    Get Started Free
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                  
                  <Button size="lg" variant="outline" className="py-2 px-6 text-base border-gray-300 dark:border-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800">
                    See Demo
                  </Button>
                </div>
                
                <motion.div 
                  className="mt-6 text-gray-500 dark:text-gray-400 flex items-center justify-center lg:justify-start gap-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6, duration: 0.8 }}
                >
                  <div className="flex -space-x-2">
                    {[1, 2, 3].map(n => (
                      <div key={n} className="w-6 h-6 rounded-full border-2 border-white dark:border-gray-900 bg-gray-300 dark:bg-gray-600" />
                    ))}
                  </div>
                  <span className="text-sm">Join 2,000+ happy users</span>
                </motion.div>
              </motion.div>
              
              {/* Right side - Phone mockup with app preview - properly sized */}
              <motion.div 
                className="flex-1 w-full max-w-xs lg:max-w-sm mt-8 lg:mt-0"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <div className="relative">
                  {/* Phone frame - adjusted size */}
                  <div className="relative z-10 mx-auto rounded-[2rem] overflow-hidden border-4 border-gray-900 dark:border-gray-800 shadow-xl aspect-[9/19] w-56 md:w-64">
                    {/* App screen */}
                    <div className="absolute inset-0 overflow-hidden bg-white dark:bg-gray-900">
                      {/* App header */}
                      <div className="p-2 bg-orange-500 dark:bg-orange-600 text-white">
                        <div className="flex justify-between items-center">
                          <h3 className="font-medium text-sm">Image2Plate</h3>
                          <div className="w-6 h-6 rounded-full bg-white/20" />
                        </div>
                      </div>
                      
                      {/* App content */}
                      <div className="p-3">
                        <div className="w-full aspect-square rounded-lg bg-gray-100 dark:bg-gray-800 mb-3 flex items-center justify-center">
                          <div className="w-full h-full bg-gradient-to-br from-orange-100 to-amber-200 dark:from-orange-900/30 dark:to-amber-800/30 flex items-center justify-center">
                            <div className="text-orange-500 dark:text-orange-400 opacity-50">
                              <Camera size={32} />
                            </div>
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded-full w-3/4" />
                          <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded-full w-full" />
                          <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded-full w-5/6" />
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Floating UI elements - contained within parent */}
                  <motion.div
                    className="absolute top-1/4 -right-2 md:-right-6 bg-white dark:bg-gray-800 p-2 rounded-lg shadow-lg z-20"
                    animate={{ 
                      y: [0, -5, 0],
                      rotate: [0, -2, 0]
                    }}
                    transition={{ 
                      repeat: Infinity,
                      duration: 3,
                      ease: "easeInOut"
                    }}
                  >
                    <Utensils className="h-4 w-4 text-orange-500" />
                  </motion.div>
                  
                  <motion.div
                    className="absolute bottom-1/3 -left-2 md:-left-6 bg-white dark:bg-gray-800 p-2 rounded-lg shadow-lg z-20"
                    animate={{ 
                      y: [0, 5, 0],
                      rotate: [0, 2, 0]
                    }}
                    transition={{ 
                      repeat: Infinity,
                      duration: 3.5,
                      ease: "easeInOut",
                      delay: 0.5
                    }}
                  >
                    <ChefHat className="h-4 w-4 text-orange-500" />
                  </motion.div>
                  
                  {/* Decorative food images - more contained */}
                  <div className="absolute -top-4 -right-4 w-16 h-16 rounded-full overflow-hidden border-2 border-white dark:border-gray-800 shadow-lg hidden md:block">
                    <div className="w-full h-full bg-gradient-to-br from-green-300 to-green-500 dark:from-green-600 dark:to-green-800"></div>
                  </div>
                  
                  <div className="absolute -bottom-6 -left-6 w-20 h-20 rounded-full overflow-hidden border-2 border-white dark:border-gray-800 shadow-lg hidden md:block">
                    <div className="w-full h-full bg-gradient-to-br from-red-300 to-red-500 dark:from-red-700 dark:to-red-900"></div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* How It Works - Improved spacing */}
        <section className="py-16 md:py-20 bg-gray-50 dark:bg-gray-900">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h2 className="text-2xl md:text-3xl font-bold mb-4 text-gray-900 dark:text-white">
                How Image2Plate Works
              </h2>
              <p className="text-base md:text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                Our AI technology makes cooking easier than ever before
              </p>
            </motion.div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 max-w-5xl mx-auto">
              {[
                {
                  icon: <Camera size={24} />,
                  title: "Snap a Photo",
                  description: "Take a picture of ingredients or dishes with your camera"
                },
                {
                  icon: <ChefHat size={24} />,
                  title: "AI Analysis",
                  description: "Our AI identifies ingredients and generates perfect recipes"
                },
                {
                  icon: <ShoppingCart size={24} />,
                  title: "Get Shopping List",
                  description: "See what else you need and how to prepare your dish"
                }
              ].map((step, index) => (
                <motion.div
                  key={index}
                  className="relative"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                >
                  {/* Step number */}
                  <div className="absolute -top-4 -left-4 w-10 h-10 rounded-full bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center text-orange-600 dark:text-orange-400 font-bold text-base">
                    {index + 1}
                  </div>
                  
                  {/* Step card */}
                  <div className="bg-white dark:bg-gray-800 rounded-xl p-6 h-full shadow-lg border border-gray-100 dark:border-gray-700">
                    <div className="mb-4 w-12 h-12 rounded-full bg-orange-100 dark:bg-orange-900/40 flex items-center justify-center text-orange-500 dark:text-orange-400">
                      {step.icon}
                    </div>
                    
                    <h3 className="text-lg font-bold mb-2 text-gray-900 dark:text-white">
                      {step.title}
                    </h3>
                    
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {step.description}
                    </p>
                  </div>
                  
                  {/* Connector line - shorter */}
                  {index < 2 && (
                    <div className="hidden md:block absolute top-1/2 -right-4 w-8 h-0.5 bg-orange-200 dark:bg-orange-800" />
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Feature Showcase - Better responsive layout */}
        <section className="py-16 md:py-20 bg-white dark:bg-gray-950 relative overflow-hidden">
          {/* Background decorative elements - more subtle */}
          <div className="absolute top-0 left-1/4 w-48 h-48 rounded-full bg-orange-100 dark:bg-orange-900/20 blur-2xl opacity-40" />
          <div className="absolute bottom-0 right-1/4 w-56 h-56 rounded-full bg-amber-100 dark:bg-amber-900/20 blur-2xl opacity-40" />
          
          <div className="container mx-auto px-4 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h2 className="text-2xl md:text-3xl font-bold mb-4 text-gray-900 dark:text-white">
                Powerful Features
              </h2>
              <p className="text-base md:text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                Everything you need to transform your cooking experience
              </p>
            </motion.div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 max-w-5xl mx-auto">
              {/* Feature Images - Made responsive and contained */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="order-2 lg:order-1"
              >
                <div className="relative mx-auto max-w-md">
                  {/* Main feature image - more contained */}
                  <div className="relative z-10 rounded-xl overflow-hidden shadow-xl border-4 border-white dark:border-gray-800">
                    <div className="aspect-[4/3] bg-gradient-to-br from-orange-50 to-amber-100 dark:from-gray-800 dark:to-gray-900 flex items-center justify-center">
                      {/* App preview UI */}
                      <div className="w-full h-full flex flex-col">
                        {/* Interface header */}
                        <div className="bg-orange-500 dark:bg-orange-600 text-white p-3">
                          <h3 className="font-medium text-sm">Recipe Generator</h3>
                        </div>
                        
                        {/* Interface content */}
                        <div className="flex-1 grid grid-cols-2 gap-3 p-3">
                          <div className="bg-white dark:bg-gray-800 rounded-lg p-2 shadow">
                            <div className="w-full aspect-square rounded-md bg-gradient-to-br from-amber-100 to-amber-200 dark:from-amber-900/30 dark:to-amber-800/30 mb-2" />
                            <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full w-2/3 mb-1" />
                            <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full w-full" />
                          </div>
                          
                          <div className="bg-white dark:bg-gray-800 rounded-lg p-2 shadow">
                            <div className="space-y-1">
                              <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full w-full" />
                              <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full w-5/6" />
                              <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full w-4/5" />
                              <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full w-full" />
                              <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full w-3/4" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Decorative elements - smaller, more contained */}
                  <div className="absolute -top-3 -left-3 w-8 h-8 rounded-full bg-orange-500 dark:bg-orange-600" />
                  <div className="absolute -bottom-5 -right-5 w-10 h-10 rounded-full bg-amber-400 dark:bg-amber-600" />
                </div>
              </motion.div>
              
              {/* Feature description */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="order-1 lg:order-2 flex flex-col justify-center"
              >
                <div className="space-y-8">
                  {[
                    {
                      icon: <Camera size={20} />,
                      title: "Advanced Object Detection",
                      description: "Our AI accurately identifies all ingredients in your photos with high precision"
                    },
                    {
                      icon: <ChefHat size={20} />,
                      title: "Personalized Recipes",
                      description: "Get custom recipes based on your preferences, dietary restrictions, and available ingredients"
                    },
                    {
                      icon: <Clock size={20} />,
                      title: "History Tracking",
                      description: "Keep track of all your creations and save your favorite recipes for future reference"
                    }
                  ].map((feature, index) => (
                    <motion.div 
                      key={index}
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 0.3 + (index * 0.2) }}
                      className="flex gap-4"
                    >
                      <div className="flex-shrink-0 w-10 h-10 rounded-full bg-orange-100 dark:bg-orange-900/40 flex items-center justify-center text-orange-500 dark:text-orange-400">
                        {feature.icon}
                      </div>
                      
                      <div>
                        <h3 className="text-lg font-bold mb-2 text-gray-900 dark:text-white">
                          {feature.title}
                        </h3>
                        
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {feature.description}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Testimonials - Improved mobile layout */}
        <section className="py-16 md:py-20 bg-orange-50 dark:bg-orange-950/20">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h2 className="text-2xl md:text-3xl font-bold mb-4 text-gray-900 dark:text-white">
                What Users Say
              </h2>
              <p className="text-base md:text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                Join thousands of satisfied home chefs
              </p>
            </motion.div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {[
                {
                  quote: "Image2Plate completely changed how I cook. I just snap a photo of what I have and get amazing recipe ideas!",
                  name: "Sarah Johnson",
                  role: "Home Chef"
                },
                {
                  quote: "The ingredient detection is incredibly accurate. The app even suggests alternatives when I'm missing something.",
                  name: "Michael Chen",
                  role: "Food Blogger"
                },
                {
                  quote: "I no longer waste food in my fridge. This app helps me use everything before it expires with creative recipes.",
                  name: "Emily Rodriguez",
                  role: "Busy Parent"
                }
              ].map((testimonial, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-100 dark:border-gray-700"
                >
                  <div className="text-orange-500 dark:text-orange-400 mb-3">
                    {/* Star rating */}
                    <div className="flex gap-1">
                      {[...Array(5)].map((_, i) => (
                        <div key={i} className="text-orange-500 dark:text-orange-400 text-sm">★</div>
                      ))}
                    </div>
                  </div>
                  
                  <p className="text-sm md:text-base text-gray-700 dark:text-gray-300 mb-4 italic">
                    &quot;{testimonial.quote}&quot;
                  </p>
                  
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-400 to-amber-500 dark:from-orange-600 dark:to-amber-700 mr-3" />
                    <div>
                      <h4 className="font-medium text-sm text-gray-900 dark:text-white">
                        {testimonial.name}
                      </h4>
                      <p className="text-gray-500 dark:text-gray-400 text-xs">
                        {testimonial.role}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section - More responsive with better padding */}
        <section className="py-16 md:py-20 bg-gradient-to-br from-orange-500 to-red-600 dark:from-orange-600 dark:to-red-700 relative overflow-hidden">
          {/* Decorative elements - more subtle */}
          <div className="absolute inset-0">
            <div className="absolute top-0 left-1/4 w-48 h-48 rounded-full bg-white/10 blur-2xl" />
            <div className="absolute bottom-0 right-1/4 w-56 h-56 rounded-full bg-white/10 blur-2xl" />
          </div>
          
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-2xl mx-auto text-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="text-2xl md:text-4xl font-bold mb-4 text-white">
                  Start Your Cooking Revolution Today
                </h2>
                
                <p className="text-base md:text-lg text-white/80 mb-6">
                  Join thousands of users who are transforming their cooking experience with Image2Plate
                </p>
                
                <Button size="lg" className="bg-white hover:bg-gray-100 text-orange-600 px-8 py-2 text-base font-medium">
                  Get Started Free
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                
                <p className="mt-4 text-white/70 text-xs">
                  No credit card required • Free Google login
                </p>
              </motion.div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}