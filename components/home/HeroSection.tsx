"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { fadeUp, heroBackground } from "@/lib/animations";
import { useInView } from "react-intersection-observer";

export default function HeroSection() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section className="relative min-h-screen flex items-center pt-16">
      {/* Background Animation */}
      <motion.div 
        className="absolute inset-0 -z-10"
        variants={heroBackground}
        initial="hidden"
        animate="visible"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900 via-indigo-900 to-violet-900 opacity-90"></div>
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1678247539441-05ad26a18343?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')] bg-cover bg-center"></div>
        <div className="absolute inset-0 bg-grid-white/[0.02]" style={{ backgroundSize: '32px 32px' }}></div>
      </motion.div>

      <div className="container mx-auto px-4 py-12 md:py-24" ref={ref}>
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className="space-y-6"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white">
              Pioneering the Future of{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">
                Robotic Intelligence
              </span>
            </h1>
            
            <p className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto">
              GWC Robotics designs advanced scanning and profiling systems that revolutionize 
              industrial inspection, quality control, and autonomous navigation.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8">
              <Button size="lg" className="w-full sm:w-auto">
                Explore Solutions
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button size="lg" variant="outline" className="w-full sm:w-auto bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white border-white/30">
                Contact Sales
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}