"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { fadeUp } from "@/lib/animations";

export default function CtaSection() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section className="py-20 bg-primary" ref={ref}>
      <motion.div 
        className="container mx-auto px-4 text-center"
        variants={fadeUp}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
      >
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-primary-foreground">
            Ready to Transform Your Operations?
          </h2>
          <p className="text-lg mb-8 text-primary-foreground/80">
            Discover how GWC Robotics can bring precision, efficiency, and 
            intelligence to your industrial processes.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button 
              size="lg" 
              variant="secondary"
              asChild
            >
              <Link href="/contact">
                Request Demo
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/10"
              asChild
            >
              <Link href="/products/intrascan-155">
                Explore Products
              </Link>
            </Button>
          </div>
        </div>
      </motion.div>
    </section>
  );
}