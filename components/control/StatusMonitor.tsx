"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CircleCheck, CircleAlert, Clock } from "lucide-react";

export default function StatusMonitor() {
  const [status, setStatus] = useState({
    batteryLevel: 85,
    signalStrength: 92,
    uptime: "02:34:15",
    errors: []
  });

  // Simulate updating values
  useEffect(() => {
    const interval = setInterval(() => {
      // Simulate battery draining
      setStatus(prev => ({
        ...prev,
        batteryLevel: Math.max(prev.batteryLevel - 0.1, 0),
        uptime: incrementTime(prev.uptime)
      }));
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  function incrementTime(timeString: string) {
    const [hours, minutes, seconds] = timeString.split(":").map(Number);
    let newSeconds = seconds + 10;
    let newMinutes = minutes;
    let newHours = hours;
    
    if (newSeconds >= 60) {
      newSeconds -= 60;
      newMinutes += 1;
    }
    
    if (newMinutes >= 60) {
      newMinutes -= 60;
      newHours += 1;
    }
    
    return `${newHours.toString().padStart(2, '0')}:${newMinutes.toString().padStart(2, '0')}:${newSeconds.toString().padStart(2, '0')}`;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">System Status</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <StatusItem 
            label="Battery" 
            value={`${status.batteryLevel.toFixed(0)}%`} 
            icon={getBatteryIcon(status.batteryLevel)}
          />
          <StatusItem 
            label="Signal" 
            value={`${status.signalStrength}%`} 
            icon={getSignalIcon(status.signalStrength)}
          />
          <StatusItem 
            label="Uptime" 
            value={status.uptime} 
            icon={<Clock className="h-5 w-5 text-muted-foreground" />}
          />
          <div className="pt-2 border-t">
            <div className="flex items-center">
              <CircleCheck className="h-5 w-5 text-green-500 mr-2" />
              <span className="text-sm">All systems operational</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

interface StatusItemProps {
  label: string;
  value: string;
  icon: React.ReactNode;
}

function StatusItem({ label, value, icon }: StatusItemProps) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-sm text-muted-foreground">{label}</span>
      <div className="flex items-center">
        <span className="text-sm font-medium mr-2">{value}</span>
        {icon}
      </div>
    </div>
  );
}

function getBatteryIcon(level: number) {
  if (level > 60) {
    return <div className="h-5 w-8 border border-green-500 rounded-sm relative">
      <div className="absolute left-0 top-0 bottom-0 bg-green-500" style={{ width: `${level}%` }}></div>
    </div>;
  } else if (level > 20) {
    return <div className="h-5 w-8 border border-yellow-500 rounded-sm relative">
      <div className="absolute left-0 top-0 bottom-0 bg-yellow-500" style={{ width: `${level}%` }}></div>
    </div>;
  } else {
    return <div className="h-5 w-8 border border-red-500 rounded-sm relative">
      <div className="absolute left-0 top-0 bottom-0 bg-red-500" style={{ width: `${level}%` }}></div>
    </div>;
  }
}

function getSignalIcon(strength: number) {
  if (strength > 75) {
    return <div className="flex items-end h-5 space-x-[2px]">
      <div className="w-1 h-1 bg-green-500 rounded-sm"></div>
      <div className="w-1 h-2 bg-green-500 rounded-sm"></div>
      <div className="w-1 h-3 bg-green-500 rounded-sm"></div>
      <div className="w-1 h-4 bg-green-500 rounded-sm"></div>
    </div>;
  } else if (strength > 50) {
    return <div className="flex items-end h-5 space-x-[2px]">
      <div className="w-1 h-1 bg-yellow-500 rounded-sm"></div>
      <div className="w-1 h-2 bg-yellow-500 rounded-sm"></div>
      <div className="w-1 h-3 bg-yellow-500 rounded-sm"></div>
      <div className="w-1 h-4 bg-muted rounded-sm"></div>
    </div>;
  } else if (strength > 25) {
    return <div className="flex items-end h-5 space-x-[2px]">
      <div className="w-1 h-1 bg-orange-500 rounded-sm"></div>
      <div className="w-1 h-2 bg-orange-500 rounded-sm"></div>
      <div className="w-1 h-3 bg-muted rounded-sm"></div>
      <div className="w-1 h-4 bg-muted rounded-sm"></div>
    </div>;
  } else {
    return <div className="flex items-end h-5 space-x-[2px]">
      <div className="w-1 h-1 bg-red-500 rounded-sm"></div>
      <div className="w-1 h-2 bg-muted rounded-sm"></div>
      <div className="w-1 h-3 bg-muted rounded-sm"></div>
      <div className="w-1 h-4 bg-muted rounded-sm"></div>
    </div>;
  }
}