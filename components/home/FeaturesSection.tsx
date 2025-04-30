"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { 
  Zap, 
  Shield, 
  BarChart3, 
  Cog,
  Cpu,
  Box,
  Radar,
  Expand
} from "lucide-react";
import { staggerContainer, cardVariant } from "@/lib/animations";

interface FeatureProps {
  title: string;
  description: string;
  icon: React.ReactNode;
}

const features: FeatureProps[] = [
  {
    title: "Advanced Laser Scanning",
    description: "High-precision laser profiling with sub-millimeter accuracy for detailed surface mapping.",
    icon: <Radar className="h-10 w-10 text-blue-500" />,
  },
  {
    title: "Real-time Processing",
    description: "Process complex scans with our cutting-edge AI algorithms for instant feedback.",
    icon: <Zap className="h-10 w-10 text-blue-500" />,
  },
  {
    title: "Robust Industrial Design",
    description: "Built to withstand harsh environments with IP67-rated components and rugged construction.",
    icon: <Shield className="h-10 w-10 text-blue-500" />,
  },
  {
    title: "Intelligent Analytics",
    description: "Turn scan data into actionable insights with our advanced analytics platform.",
    icon: <BarChart3 className="h-10 w-10 text-blue-500" />,
  },
  {
    title: "Modular Architecture",
    description: "Customize your solution with interchangeable components for different scanning needs.",
    icon: <Box className="h-10 w-10 text-blue-500" />,
  },
  {
    title: "AI-Enhanced Detection",
    description: "Machine learning algorithms that improve detection accuracy over time.",
    icon: <Cpu className="h-10 w-10 text-blue-500" />,
  },
  {
    title: "Scalable Solutions",
    description: "From single units to facility-wide deployments, our systems scale to your needs.",
    icon: <Expand className="h-10 w-10 text-blue-500" />,
  },
  {
    title: "Easy Integration",
    description: "Seamless integration with existing industrial systems and workflows.",
    icon: <Cog className="h-10 w-10 text-blue-500" />,
  }
];

export default function FeaturesSection() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section className="py-24 bg-muted" ref={ref}>
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Cutting-Edge Technology
          </h2>
          <p className="text-lg text-muted-foreground">
            Our robotic systems combine advanced hardware and intelligent software
            to deliver unprecedented precision and reliability.
          </p>
        </div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          {features.map((feature, index) => (
            <FeatureCard key={index} {...feature} index={index} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function FeatureCard({ title, description, icon, index }: FeatureProps & { index: number }) {
  return (
    <motion.div
      variants={cardVariant}
      className="bg-card p-6 rounded-lg border border-border hover:shadow-md transition-shadow"
    >
      <div className="mb-4">{icon}</div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </motion.div>
  );
}