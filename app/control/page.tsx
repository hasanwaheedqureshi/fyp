"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import RobotControlPanel from "@/components/control/RobotControlPanel";
import StatusMonitor from "@/components/control/StatusMonitor";
import DataVisualization from "@/components/control/DataVisualization";
import { fadeUp, staggerContainer } from "@/lib/animations";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Laptop, Smartphone } from "lucide-react";

export default function ControlPage() {
  const [activeView, setActiveView] = useState<string>("desktop");
  
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <div className="pt-24 pb-16 min-h-screen bg-gradient-to-b from-background to-muted">
      <div className="container mx-auto px-4" ref={ref}>
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="max-w-4xl mx-auto mb-8 text-center"
        >
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            Intrascan-155 Control Interface
          </h1>
          <p className="text-muted-foreground text-lg">
            Take command of your robot with our intuitive control panel and real-time data visualization
          </p>
        </motion.div>

        {/* View toggle for different layouts */}
        <div className="flex justify-center mb-8">
          <Tabs 
            value={activeView} 
            onValueChange={setActiveView}
            className="w-[200px]"
          >
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="desktop" className="flex items-center gap-2">
                <Laptop className="h-4 w-4" />
                <span className="hidden sm:inline">Desktop</span>
              </TabsTrigger>
              <TabsTrigger value="mobile" className="flex items-center gap-2">
                <Smartphone className="h-4 w-4" />
                <span className="hidden sm:inline">Mobile</span>
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        {/* Desktop Layout - Side by side */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className={`${activeView === "desktop" ? "block" : "hidden"}`}
        >
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <RobotControlPanel />
              <div className="mt-8">
                <DataVisualization />
              </div>
            </div>
            
            <div className="lg:col-span-1">
              <StatusMonitor />
            </div>
          </div>
        </motion.div>

        {/* Mobile Layout - Stacked */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className={`space-y-8 ${activeView === "mobile" ? "block" : "hidden"}`}
        >
          <RobotControlPanel />
          <StatusMonitor />
          <DataVisualization />
        </motion.div>

        {/* Safety Notice */}
        <div className="mt-12 p-6 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg max-w-4xl mx-auto">
          <h3 className="text-lg font-semibold text-yellow-800 dark:text-yellow-300 mb-2">
            Safety Reminder
          </h3>
          <p className="text-yellow-700 dark:text-yellow-400">
            Always ensure the robot's operating area is clear of obstacles and personnel before initiating movement or scanning operations. 
            Refer to the Intrascan-155 safety manual for complete operational guidelines.
          </p>
        </div>
      </div>
    </div>
  );
}