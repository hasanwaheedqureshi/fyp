"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { LineChart, Line, BarChart, Bar, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { motion } from "framer-motion";
import { buttonHover } from "@/lib/animations";
import { ReloadIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import { BarChart3, LineChart as LineChartIcon, Activity, History } from "lucide-react";

export default function DataVisualization() {
  const [visType, setVisType] = useState("profile");
  const [timeRange, setTimeRange] = useState("1h");
  const [refreshing, setRefreshing] = useState(false);

  // Mock scan profile data (representing laser scanning results)
  const profileData = [
    { distance: 0, height: 5 },
    { distance: 10, height: 8 },
    { distance: 20, height: 12 },
    { distance: 30, height: 15 },
    { distance: 40, height: 18 },
    { distance: 50, height: 22 },
    { distance: 60, height: 25 },
    { distance: 70, height: 20 },
    { distance: 80, height: 15 },
    { distance: 90, height: 12 },
    { distance: 100, height: 8 },
    { distance: 110, height: 5 },
    { distance: 120, height: 3 },
    { distance: 130, height: 2 },
    { distance: 140, height: 1 },
    { distance: 150, height: 0 },
  ];

  // Mock performance data
  const performanceData = [
    { time: '09:00', processingSpeed: 125, accuracy: 98 },
    { time: '09:30', processingSpeed: 130, accuracy: 97 },
    { time: '10:00', processingSpeed: 135, accuracy: 97 },
    { time: '10:30', processingSpeed: 140, accuracy: 98 },
    { time: '11:00', processingSpeed: 138, accuracy: 99 },
    { time: '11:30', processingSpeed: 142, accuracy: 98 },
    { time: '12:00', processingSpeed: 140, accuracy: 97 },
    { time: '12:30', processingSpeed: 145, accuracy: 98 },
  ];

  // Mock historical data
  const historicalData = [
    { date: 'Mon', scans: 42, anomalies: 3 },
    { date: 'Tue', scans: 45, anomalies: 2 },
    { date: 'Wed', scans: 50, anomalies: 5 },
    { date: 'Thu', scans: 47, anomalies: 4 },
    { date: 'Fri', scans: 55, anomalies: 3 },
    { date: 'Sat', scans: 25, anomalies: 1 },
    { date: 'Sun', scans: 20, anomalies: 0 },
  ];

  // Handle refresh
  const handleRefresh = () => {
    setRefreshing(true);
    // Simulate refresh delay
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  };

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-lg">Data Visualization</CardTitle>
        <div className="flex items-center gap-2">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-[100px]">
              <SelectValue placeholder="Time Range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1h">Last Hour</SelectItem>
              <SelectItem value="6h">Last 6 Hours</SelectItem>
              <SelectItem value="24h">Last 24 Hours</SelectItem>
              <SelectItem value="7d">Last 7 Days</SelectItem>
            </SelectContent>
          </Select>
          <motion.div
            variants={buttonHover}
            initial="initial"
            whileHover="hover"
            whileTap="tap"
          >
            <Button variant="outline" size="icon" onClick={handleRefresh} disabled={refreshing}>
              <ReloadIcon className={`h-4 w-4 ${refreshing ? 'animate-spin' : ''}`} />
            </Button>
          </motion.div>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs value={visType} onValueChange={setVisType} className="mb-4">
          <TabsList className="grid grid-cols-3">
            <TabsTrigger value="profile" className="flex items-center gap-1">
              <Activity className="h-4 w-4" />
              <span className="hidden sm:inline">Scan Profile</span>
            </TabsTrigger>
            <TabsTrigger value="performance" className="flex items-center gap-1">
              <LineChartIcon className="h-4 w-4" />
              <span className="hidden sm:inline">Performance</span>
            </TabsTrigger>
            <TabsTrigger value="historical" className="flex items-center gap-1">
              <BarChart3 className="h-4 w-4" />
              <span className="hidden sm:inline">Historical</span>
            </TabsTrigger>
          </TabsList>

          {/* Scan Profile Visualization */}
          <TabsContent value="profile" className="pt-2">
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={profileData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorHeight" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(var(--chart-1))" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="hsl(var(--chart-1))" stopOpacity={0.1}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis 
                    dataKey="distance" 
                    label={{ value: 'Distance (mm)', position: 'insideBottom', offset: -5 }} 
                  />
                  <YAxis 
                    label={{ value: 'Height (mm)', angle: -90, position: 'insideLeft' }}
                  />
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: 'hsl(var(--card))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '6px',
                    }}
                    formatter={(value: number) => [`${value} mm`, 'Height']}
                    labelFormatter={(value: string) => `Distance: ${value} mm`}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="height" 
                    stroke="hsl(var(--chart-1))" 
                    fillOpacity={1} 
                    fill="url(#colorHeight)" 
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
            <div className="text-center text-sm text-muted-foreground mt-2">
              Current laser profile scan data showing surface topology
            </div>
          </TabsContent>

          {/* Performance Visualization */}
          <TabsContent value="performance" className="pt-2">
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={performanceData} margin={{ top: 10, right: 20, left: 10, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="time" />
                  <YAxis yAxisId="left" orientation="left" />
                  <YAxis yAxisId="right" orientation="right" />
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: 'hsl(var(--card))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '6px',
                    }}
                  />
                  <Legend />
                  <Line 
                    yAxisId="left"
                    type="monotone" 
                    dataKey="processingSpeed" 
                    name="Processing Speed (pts/s)"
                    stroke="hsl(var(--chart-2))" 
                    activeDot={{ r: 8 }} 
                  />
                  <Line 
                    yAxisId="right"
                    type="monotone" 
                    dataKey="accuracy" 
                    name="Accuracy (%)"
                    stroke="hsl(var(--chart-3))" 
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <div className="text-center text-sm text-muted-foreground mt-2">
              Real-time system performance metrics during operation
            </div>
          </TabsContent>

          {/* Historical Data Visualization */}
          <TabsContent value="historical" className="pt-2">
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={historicalData} margin={{ top: 10, right: 20, left: 10, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: 'hsl(var(--card))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '6px',
                    }}
                  />
                  <Legend />
                  <Bar dataKey="scans" name="Completed Scans" fill="hsl(var(--chart-4))" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="anomalies" name="Detected Anomalies" fill="hsl(var(--chart-5))" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="text-center text-sm text-muted-foreground mt-2">
              Historical scanning activity and anomaly detection
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}