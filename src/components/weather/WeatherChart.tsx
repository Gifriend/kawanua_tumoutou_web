"use client"
import type React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Line, LineChart, XAxis, YAxis, Area, AreaChart, ResponsiveContainer } from "recharts"

interface HourlyData {
  time: string
  temperature: number
  humidity: number
  windSpeed: number
  pressure: number
}

interface WeatherChartProps {
  data: HourlyData[]
}

const WeatherChart: React.FC<WeatherChartProps> = ({ data }) => {
  const chartConfig = {
    temperature: {
      label: "Temperature (°C)",
      color: "hsl(var(--chart-1))",
    },
    humidity: {
      label: "Humidity (%)",
      color: "hsl(var(--chart-2))",
    },
    windSpeed: {
      label: "Wind Speed (km/h)",
      color: "hsl(var(--chart-3))",
    },
    pressure: {
      label: "Pressure (hPa)",
      color: "hsl(var(--chart-4))",
    },
  }

  const processedData = data.map((item) => ({
    ...item,
    temperature: Math.round(item.temperature * 10) / 10,
    humidity: Math.round(item.humidity),
    windSpeed: Math.round(item.windSpeed * 10) / 10,
    pressure: Math.round(item.pressure),
  }))

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
      {/* Temperature Chart */}
      <Card className="bg-white/10 backdrop-blur-md border-white/20 text-white col-span-1 md:col-span-2 lg:col-span-1">
        <CardHeader className="pb-2 md:pb-4">
          <CardTitle className="text-cyan-400 text-base md:text-lg">Temperature Trend</CardTitle>
        </CardHeader>
        <CardContent className="p-2 md:p-6">
          <ChartContainer config={chartConfig} className="h-[200px] md:h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={processedData} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
                <defs>
                  <linearGradient id="temperatureGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#f59e0b" stopOpacity={0.1} />
                  </linearGradient>
                </defs>
                <XAxis
                  dataKey="time"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#cbd5e1", fontSize: 10 }}
                  interval="preserveStartEnd"
                />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: "#cbd5e1", fontSize: 10 }} width={30} />
                <ChartTooltip
                  content={<ChartTooltipContent />}
                  contentStyle={{
                    backgroundColor: "rgba(15, 23, 42, 0.9)",
                    border: "1px solid rgba(255, 255, 255, 0.2)",
                    borderRadius: "8px",
                    color: "white",
                    fontSize: "12px",
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="temperature"
                  stroke="#f59e0b"
                  strokeWidth={2}
                  fill="url(#temperatureGradient)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>

      {/* Humidity Chart */}
      <Card className="bg-white/10 backdrop-blur-md border-white/20 text-white col-span-1 md:col-span-2 lg:col-span-1">
        <CardHeader className="pb-2 md:pb-4">
          <CardTitle className="text-blue-400 text-base md:text-lg">Humidity Levels</CardTitle>
        </CardHeader>
        <CardContent className="p-2 md:p-6">
          <ChartContainer config={chartConfig} className="h-[200px] md:h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={processedData} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
                <XAxis
                  dataKey="time"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#cbd5e1", fontSize: 10 }}
                  interval="preserveStartEnd"
                />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: "#cbd5e1", fontSize: 10 }} width={30} />
                <ChartTooltip
                  content={<ChartTooltipContent />}
                  contentStyle={{
                    backgroundColor: "rgba(15, 23, 42, 0.9)",
                    border: "1px solid rgba(255, 255, 255, 0.2)",
                    borderRadius: "8px",
                    color: "white",
                    fontSize: "12px",
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="humidity"
                  stroke="#3b82f6"
                  strokeWidth={2}
                  dot={{ fill: "#3b82f6", strokeWidth: 2, r: 3 }}
                  activeDot={{ r: 5, stroke: "#3b82f6", strokeWidth: 2 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>

      {/* Wind Speed Chart */}
      <Card className="bg-white/10 backdrop-blur-md border-white/20 text-white col-span-1 md:col-span-2 lg:col-span-1">
        <CardHeader className="pb-2 md:pb-4">
          <CardTitle className="text-green-400 text-base md:text-lg">Wind Speed</CardTitle>
        </CardHeader>
        <CardContent className="p-2 md:p-6">
          <ChartContainer config={chartConfig} className="h-[200px] md:h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={processedData} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
                <defs>
                  <linearGradient id="windGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0.1} />
                  </linearGradient>
                </defs>
                <XAxis
                  dataKey="time"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#cbd5e1", fontSize: 10 }}
                  interval="preserveStartEnd"
                />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: "#cbd5e1", fontSize: 10 }} width={30} />
                <ChartTooltip
                  content={<ChartTooltipContent />}
                  contentStyle={{
                    backgroundColor: "rgba(15, 23, 42, 0.9)",
                    border: "1px solid rgba(255, 255, 255, 0.2)",
                    borderRadius: "8px",
                    color: "white",
                    fontSize: "12px",
                  }}
                />
                <Area type="monotone" dataKey="windSpeed" stroke="#10b981" strokeWidth={2} fill="url(#windGradient)" />
              </AreaChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>

      {/* Pressure Chart */}
      <Card className="bg-white/10 backdrop-blur-md border-white/20 text-white col-span-1 md:col-span-2 lg:col-span-1">
        <CardHeader className="pb-2 md:pb-4">
          <CardTitle className="text-purple-400 text-base md:text-lg">Atmospheric Pressure</CardTitle>
        </CardHeader>
        <CardContent className="p-2 md:p-6">
          <ChartContainer config={chartConfig} className="h-[200px] md:h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={processedData} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
                <XAxis
                  dataKey="time"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#cbd5e1", fontSize: 10 }}
                  interval="preserveStartEnd"
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#cbd5e1", fontSize: 10 }}
                  domain={["dataMin - 5", "dataMax + 5"]}
                  width={40}
                />
                <ChartTooltip
                  content={<ChartTooltipContent />}
                  contentStyle={{
                    backgroundColor: "rgba(15, 23, 42, 0.9)",
                    border: "1px solid rgba(255, 255, 255, 0.2)",
                    borderRadius: "8px",
                    color: "white",
                    fontSize: "12px",
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="pressure"
                  stroke="#8b5cf6"
                  strokeWidth={2}
                  dot={{ fill: "#8b5cf6", strokeWidth: 2, r: 3 }}
                  activeDot={{ r: 5, stroke: "#8b5cf6", strokeWidth: 2 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  )
}

export default WeatherChart
