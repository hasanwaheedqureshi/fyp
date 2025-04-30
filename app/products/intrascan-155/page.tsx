"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { fadeUp, staggerContainer, cardVariant } from "@/lib/animations";
import { ArrowRight, Cpu, Shield, Zap } from "lucide-react";

export default function IntrascanProductPage() {
  const { ref: heroRef, inView: heroInView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const { ref: featuresRef, inView: featuresInView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const { ref: specsRef, inView: specsInView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section 
        className="relative bg-gradient-to-r from-slate-900 to-blue-900 py-24 overflow-hidden"
        ref={heroRef}
      >
        <div className="absolute inset-0 bg-grid-white/[0.02]" style={{ backgroundSize: '32px 32px' }}></div>
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <motion.div 
              className="lg:w-1/2"
              variants={fadeUp}
              initial="hidden"
              animate={heroInView ? "visible" : "hidden"}
            >
              <h1 className="text-4xl lg:text-5xl font-bold text-white mb-6">
                Intrascan-155
              </h1>
              <p className="text-xl text-blue-100 mb-8">
                The next generation in precision laser profiling technology, designed for 
                constrained movement in barrels that demand accuracy and reliability.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button size="lg" asChild>
                  <Link href="/contact">Request Demo</Link>
                </Button>
                <Button size="lg" variant="outline" className="text-white border-white/20 hover:bg-white/10">
                  Download Specs
                </Button>
              </div>
            </motion.div>
            
            <motion.div 
              className="lg:w-1/2"
              initial={{ opacity: 0, x: 20 }}
              animate={heroInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="relative aspect-square max-w-lg mx-auto">
                <Image
                  src="https://images.pexels.com/photos/2599244/pexels-photo-2599244.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                  alt="Intrascan-155 Robot"
                  fill
                  style={{ objectFit: 'cover' }}
                  className="rounded-lg shadow-2xl"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Key Features */}
      <section className="py-24 bg-muted" ref={featuresRef}>
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center max-w-3xl mx-auto mb-16"
            variants={fadeUp}
            initial="hidden"
            animate={featuresInView ? "visible" : "hidden"}
          >
            <h2 className="text-3xl font-bold mb-4">Advanced Features</h2>
            <p className="text-lg text-muted-foreground">
              The Intrascan-155 combines cutting-edge hardware with intelligent software
              to deliver unparalleled scanning precision.
            </p>
          </motion.div>

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            variants={staggerContainer}
            initial="hidden"
            animate={featuresInView ? "visible" : "hidden"}
          >
            <FeatureCard 
              icon={<Zap className="h-12 w-12 text-blue-500" />}
              title="High-Precision Laser"
              description="0.05mm accuracy with our proprietary laser profiling system for detailed surface mapping."
            />
            <FeatureCard 
              icon={<Shield className="h-12 w-12 text-blue-500" />}
              title="Industrial-Grade Design"
              description="IP67-rated with shock absorption and vibration resistance for harsh environments."
            />
            <FeatureCard 
              icon={<Cpu className="h-12 w-12 text-blue-500" />}
              title="Advanced AI Processing"
              description="On-board AI processor for real-time analysis and defect detection."
            />
          </motion.div>
        </div>
      </section>

      {/* Technical Specifications */}
      <section className="py-24 bg-background" ref={specsRef}>
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center max-w-3xl mx-auto mb-16"
            variants={fadeUp}
            initial="hidden"
            animate={specsInView ? "visible" : "hidden"}
          >
            <h2 className="text-3xl font-bold mb-4">Technical Specifications</h2>
            <p className="text-lg text-muted-foreground">
              Explore the capabilities of the Intrascan-155 through detailed specifications.
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            <Tabs defaultValue="mechanical" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="mechanical">Mechanical Design</TabsTrigger>
                <TabsTrigger value="laser">Laser Profiling</TabsTrigger>
                <TabsTrigger value="software">Software</TabsTrigger>
              </TabsList>
              <TabsContent value="mechanical" className="p-6 border rounded-lg mt-4">
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Dimensions & Weight</h3>
                    <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
                      <li>Length: 580mm</li>
                      <li>Width: 320mm</li>
                      <li>Height: 155mm</li>
                      <li>Weight: 12.5kg with battery</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Mobility</h3>
                    <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
                      <li>Tracked locomotion system with independent motor control</li>
                      <li>Ground clearance: 5mm</li>
                      <li>Max incline: 30°</li>
                      <li>Max speed: 0.05m/s</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Power</h3>
                    <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
                      <li>24V, 10Ah LiFePO4 battery pack</li>
                      <li>Operating time: 6-8 hours</li>
                      <li>Quick-swap battery system</li>
                      <li>Charging time: 2 hours (0-80%)</li>
                    </ul>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="laser" className="p-6 border rounded-lg mt-4">
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Laser Specifications</h3>
                    <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
                      <li>Class 2M laser (eye safe)</li>
                      <li>Wavelength: 650nm</li>
                      <li>Measurement range: 50-500mm</li>
                      <li>Accuracy: ±0.05mm</li>
                      <li>Scan rate: Up to 5000 points/second</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Scanning Capabilities</h3>
                    <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
                      <li>270° scanning field</li>
                      <li>Rotation speed: 10-25Hz</li>
                      <li>Angular resolution: 0.1°</li>
                      <li>Multi-surface material detection</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Environmental Rating</h3>
                    <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
                      <li>Operating temperature: -10°C to 50°C</li>
                      <li>IP67 rated against dust and water</li>
                      <li>Shock resistant up to 20G</li>
                    </ul>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="software" className="p-6 border rounded-lg mt-4">
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Control System</h3>
                    <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
                      <li>yaha operating system define karna hai</li>
                      <li>Remote operation via secure Wi-Fi or 4G/5G</li>
                      <li>Autonomous navigation capabilities</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Data Processing</h3>
                    <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
                      <li>Real-time point cloud generation</li>
                      <li>On-device anomaly detection</li>
                      <li>Data compression and encryption</li>
                      <li>Support for standard formats (PLY, XYZ, CSV)</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Connectivity</h3>
                    <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
                      <li>Wi-Fi 6 (802.11ax)</li>
                      <li>Bluetooth 5.2</li>
                      <li>Optional 4G/5G cellular modem</li>
                      <li>USB-C and Ethernet ports</li>
                    </ul>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </section>

      {/* Control Access Section */}
      <section className="py-24 bg-gradient-to-r from-blue-900 to-indigo-900 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Take Control?</h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Access our robot control interface to experience the precision and 
            responsiveness of the Intrascan-155 firsthand.
          </p>
          <Button 
            size="lg" 
            variant="default"
            className="bg-white text-blue-900 hover:bg-blue-50"
            asChild
          >
            <Link href="/control">
              Control the Robot
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
}

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

function FeatureCard({ icon, title, description }: FeatureCardProps) {
  return (
    <motion.div
      variants={cardVariant}
      className="bg-card p-8 rounded-lg border border-border hover:shadow-lg transition-shadow text-center"
    >
      <div className="inline-flex items-center justify-center mb-4">
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-3">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </motion.div>
  );
}