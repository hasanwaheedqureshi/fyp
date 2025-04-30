"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Image from "next/image";
import { fadeUp, staggerContainer, cardVariant } from "@/lib/animations";

interface IndustryCardProps {
  title: string;
  description: string;
  image: string;
}

const industries: IndustryCardProps[] = [
  {
    title: "Manufacturing",
    description: "Precision inspection and quality control for production lines.",
    image: "https://images.pexels.com/photos/2933265/pexels-photo-2933265.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
  },
  {
    title: "Construction",
    description: "3D mapping and structural analysis for construction projects.",
    image: "https://images.pexels.com/photos/159306/construction-site-build-construction-work-159306.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
  },
  {
    title: "Logistics",
    description: "Automated inventory tracking and warehouse management.",
    image: "https://images.pexels.com/photos/1267338/pexels-photo-1267338.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
  },
  {
    title: "Healthcare",
    description: "Precision scanning for medical devices and equipment.",
    image: "https://images.pexels.com/photos/263402/pexels-photo-263402.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
  }
];

export default function IndustriesSection() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section className="py-24 bg-background" ref={ref}>
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center max-w-3xl mx-auto mb-16"
          variants={fadeUp}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Industries We Serve
          </h2>
          <p className="text-lg text-muted-foreground">
            Our robotic systems provide transformative solutions across multiple sectors,
            enhancing precision, efficiency, and safety.
          </p>
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          {industries.map((industry, index) => (
            <IndustryCard key={index} {...industry} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function IndustryCard({ title, description, image }: IndustryCardProps) {
  return (
    <motion.div
      variants={cardVariant}
      className="group relative overflow-hidden rounded-lg h-[300px] flex items-end"
    >
      <div className="absolute inset-0">
        <div className="relative h-full w-full">
          <Image 
            src={image} 
            alt={title}
            fill
            style={{ objectFit: 'cover' }}
            className="group-hover:scale-105 transition-transform duration-500 ease-in-out"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
        </div>
      </div>
      
      <div className="relative z-10 p-6">
        <h3 className="text-xl font-semibold text-white mb-2">{title}</h3>
        <p className="text-white/80">{description}</p>
      </div>
    </motion.div>
  );
}