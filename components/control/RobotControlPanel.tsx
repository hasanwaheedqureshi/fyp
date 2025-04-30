"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowDown, ArrowUp, ChevronLeft, ChevronRight, PlaySquare, Square, Power, PowerOff } from "lucide-react";
import { motion } from "framer-motion";
import { buttonHover } from "@/lib/animations";
import { updateRobotMovement, updateLaserState, updateProfilingState } from "@/lib/firebase";
import { toast } from "sonner";

export default function RobotControlPanel() {
  const [movementStatus, setMovementStatus] = useState<string>("stopped");
  const [laserStatus, setLaserStatus] = useState<string>("off");
  const [laserRotation, setLaserRotation] = useState<string>("stopped");
  const [profilingStatus, setProfilingStatus] = useState<string>("stopped");
  const [isConnected, setIsConnected] = useState<boolean>(true);

  // Movement control
  const handleMovement = async (direction: string) => {
    try {
      await updateRobotMovement(direction);
      setMovementStatus(direction);
      toast.success(`Movement set to: ${direction}`);
    } catch (error) {
      console.error("Error updating movement:", error);
      toast.error("Failed to update movement");
    }
  };

  // Laser control
  const handleLaserPower = async (power: string) => {
    try {
      await updateLaserState(power);
      setLaserStatus(power);
      toast.success(`Laser ${power === "on" ? "activated" : "deactivated"}`);
    } catch (error) {
      console.error("Error updating laser power:", error);
      toast.error("Failed to update laser power");
    }
  };

  const handleLaserRotation = async (direction: string) => {
    try {
      await updateLaserState(direction);
      setLaserRotation(direction);
      toast.success(`Laser rotation: ${direction}`);
    } catch (error) {
      console.error("Error updating laser rotation:", error);
      toast.error("Failed to update laser rotation");
    }
  };

  // Profiling control
  const handleProfiling = async (state: string) => {
    try {
      await updateProfilingState(state);
      setProfilingStatus(state);
      toast.success(`Profiling ${state === "start" ? "started" : "stopped"}`);
    } catch (error) {
      console.error("Error updating profiling:", error);
      toast.error("Failed to update profiling");
    }
  };

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-2xl">Intrascan-155 Control Interface</CardTitle>
            <CardDescription>Control the robot's movement and scanning functions</CardDescription>
          </div>
          <div className="flex items-center">
            <span className={`h-3 w-3 rounded-full mr-2 ${isConnected ? "bg-green-500" : "bg-red-500"}`}></span>
            <span className="text-sm">{isConnected ? "Connected" : "Disconnected"}</span>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="movement">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="movement">Movement</TabsTrigger>
            <TabsTrigger value="laser">Laser Scanner</TabsTrigger>
            <TabsTrigger value="profiling">Profiling System</TabsTrigger>
          </TabsList>
          
          {/* Movement Controls */}
          <TabsContent value="movement" className="space-y-4 pt-4">
            <div className="grid grid-cols-3 gap-4 max-w-sm mx-auto">
              <div className="col-start-2">
                <ControlButton 
                  icon={<ArrowUp className="h-6 w-6" />} 
                  onClick={() => handleMovement("forward")}
                  active={movementStatus === "forward"}
                  label="Forward"
                />
              </div>
              <div></div>
              <div>
                <ControlButton 
                  icon={<Square className="h-6 w-6" />} 
                  onClick={() => handleMovement("stopped")}
                  active={movementStatus === "stopped"}
                  label="Stop"
                />
              </div>
              <div className="col-start-2">
                <ControlButton 
                  icon={<ArrowDown className="h-6 w-6" />} 
                  onClick={() => handleMovement("backward")}
                  active={movementStatus === "backward"}
                  label="Backward"
                />
              </div>
            </div>
            
            <div className="mt-6 p-4 bg-muted rounded-lg">
              <p className="text-center text-sm">
                Current movement: <span className="font-semibold capitalize">{movementStatus}</span>
              </p>
            </div>
          </TabsContent>
          
          {/* Laser Scanner Controls */}
          <TabsContent value="laser" className="space-y-4 pt-4">
            <div className="grid grid-cols-2 gap-4 max-w-sm mx-auto mb-6">
              <ControlButton 
                icon={<Power className="h-6 w-6" />} 
                onClick={() => handleLaserPower("on")}
                active={laserStatus === "on"}
                label="Turn ON"
                color="green"
              />
              <ControlButton 
                icon={<PowerOff className="h-6 w-6" />} 
                onClick={() => handleLaserPower("off")}
                active={laserStatus === "off"}
                label="Turn OFF"
                color="red"
              />
            </div>

            <div className="grid grid-cols-3 gap-4 max-w-sm mx-auto">
              <ControlButton 
                icon={<ChevronLeft className="h-6 w-6" />} 
                onClick={() => handleLaserRotation("rotate_left")}
                active={laserRotation === "rotate_left"}
                label="Rotate Left"
                disabled={laserStatus === "off"}
              />
              <ControlButton 
                icon={<Square className="h-6 w-6" />} 
                onClick={() => handleLaserRotation("stopped")}
                active={laserRotation === "stopped"}
                label="Stop"
              />
              <ControlButton 
                icon={<ChevronRight className="h-6 w-6" />} 
                onClick={() => handleLaserRotation("rotate_right")}
                active={laserRotation === "rotate_right"}
                label="Rotate Right"
                disabled={laserStatus === "off"}
              />
            </div>
            
            <div className="mt-6 p-4 bg-muted rounded-lg">
              <p className="text-center text-sm">
                Laser status: <span className="font-semibold capitalize">{laserStatus}</span>
                {laserStatus === "on" && laserRotation !== "stopped" && (
                  <span> • Rotating: <span className="font-semibold capitalize">{laserRotation.replace("_", " ")}</span></span>
                )}
              </p>
            </div>
          </TabsContent>
          
          {/* Profiling System Controls */}
          <TabsContent value="profiling" className="space-y-4 pt-4">
            <div className="grid grid-cols-2 gap-4 max-w-sm mx-auto">
              <ControlButton 
                icon={<PlaySquare className="h-6 w-6" />} 
                onClick={() => handleProfiling("start")}
                active={profilingStatus === "start"}
                label="Start Profiling"
                color="green"
                disabled={laserStatus === "off"}
              />
              <ControlButton 
                icon={<Square className="h-6 w-6" />} 
                onClick={() => handleProfiling("stop")}
                active={profilingStatus === "stop"}
                label="Stop Profiling"
                color="red"
              />
            </div>
            
            <div className="mt-6 p-4 bg-muted rounded-lg">
              <p className="text-center text-sm">
                Profiling status: <span className="font-semibold capitalize">{profilingStatus === "start" ? "Running" : "Stopped"}</span>
              </p>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}

interface ControlButtonProps {
  icon: React.ReactNode;
  onClick: () => void;
  active?: boolean;
  label: string;
  disabled?: boolean;
  color?: "blue" | "green" | "red";
}

function ControlButton({ 
  icon, 
  onClick, 
  active = false, 
  label,
  disabled = false,
  color = "blue"
}: ControlButtonProps) {
  const colorClasses = {
    blue: "bg-blue-500 hover:bg-blue-600",
    green: "bg-green-500 hover:bg-green-600",
    red: "bg-red-500 hover:bg-red-600"
  };

  return (
    <div className="flex flex-col items-center gap-2">
      <motion.button
        variants={buttonHover}
        initial="initial"
        whileHover="hover"
        whileTap="tap"
        onClick={onClick}
        disabled={disabled}
        className={`w-16 h-16 rounded-full flex items-center justify-center text-white transition-colors
          ${active ? colorClasses[color] : "bg-muted hover:bg-muted/80 text-foreground"}
          ${disabled ? "opacity-50 cursor-not-allowed" : ""}
        `}
      >
        {icon}
      </motion.button>
      <span className="text-xs text-center">{label}</span>
    </div>
  );
}