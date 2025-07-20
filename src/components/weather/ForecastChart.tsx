"use client"
import type React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Bar, XAxis, YAxis, Line, ComposedChart, ResponsiveContainer } from "recharts"

interface ForecastData {
  date: string
  high: number
  low: number
  description: string
  icon: string
  humidity: number
  windSpeed: number
}

interface ForecastChartProps {
  data: ForecastData[]
}

const ForecastChart: React.FC<ForecastChartProps> = ({ data }) => {
  const chartConfig = {
    high: {
      label: "High Temperature (°C)",
      color: "#ef4444",
    },
    low: {
      label: "Low Temperature (°C)",
      color: "#3b82f6",
    },
    humidity: {
      label: "Humidity (%)",
      color: "#06b6d4",
    },
    windSpeed: {
      label: "Wind Speed (km/h)",
      color: "#10b981",
    },
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
      {/* Temperature Range Chart */}
      <Card className="bg-white/10 backdrop-blur-md border-white/20 text-white">
        <CardHeader className="pb-2 md:pb-4">
          <CardTitle className="text-cyan-400 text-base md:text-lg">5-Day Temperature Range</CardTitle>
        </CardHeader>
        <CardContent className="p-2 md:p-6">
          <ChartContainer config={chartConfig} className="h-[250px] md:h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={data} margin={{ top: 10, right: 10, left: 10, bottom: 10 }}>
                <XAxis
                  dataKey="date"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#cbd5e1", fontSize: 10 }}
                  interval={0}
                  angle={-45}
                  textAnchor="end"
                  height={60}
                />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: "#cbd5e1", fontSize: 10 }} width={35} />
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
                <Bar dataKey="high" fill="#ef4444" radius={[2, 2, 0, 0]} />
                <Bar dataKey="low" fill="#3b82f6" radius={[2, 2, 0, 0]} />
                <Line
                  type="monotone"
                  dataKey="high"
                  stroke="#fca5a5"
                  strokeWidth={2}
                  dot={{ fill: "#ef4444", strokeWidth: 2, r: 3 }}
                />
                <Line
                  type="monotone"
                  dataKey="low"
                  stroke="#93c5fd"
                  strokeWidth={2}
                  dot={{ fill: "#3b82f6", strokeWidth: 2, r: 3 }}
                />
              </ComposedChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>

      {/* Humidity & Wind Chart */}
      <Card className="bg-white/10 backdrop-blur-md border-white/20 text-white">
        <CardHeader className="pb-2 md:pb-4">
          <CardTitle className="text-green-400 text-base md:text-lg">Humidity & Wind Forecast</CardTitle>
        </CardHeader>
        <CardContent className="p-2 md:p-6">
          <ChartContainer config={chartConfig} className="h-[250px] md:h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={data} margin={{ top: 10, right: 30, left: 10, bottom: 10 }}>
                <XAxis
                  dataKey="date"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#cbd5e1", fontSize: 10 }}
                  interval={0}
                  angle={-45}
                  textAnchor="end"
                  height={60}
                />
                <YAxis
                  yAxisId="humidity"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#cbd5e1", fontSize: 10 }}
                  width={30}
                />
                <YAxis
                  yAxisId="wind"
                  orientation="right"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#cbd5e1", fontSize: 10 }}
                  width={30}
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
                <Bar yAxisId="humidity" dataKey="humidity" fill="#06b6d4" radius={[2, 2, 0, 0]} opacity={0.7} />
                <Line
                  yAxisId="wind"
                  type="monotone"
                  dataKey="windSpeed"
                  stroke="#10b981"
                  strokeWidth={2}
                  dot={{ fill: "#10b981", strokeWidth: 2, r: 3 }}
                  activeDot={{ r: 5, stroke: "#10b981", strokeWidth: 2 }}
                />
              </ComposedChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  )
}

export default ForecastChart
