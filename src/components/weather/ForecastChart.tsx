"use client"
import type React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Bar, XAxis, YAxis, Line, ComposedChart } from "recharts"

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
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Temperature Range Chart */}
      <Card className="bg-white/10 backdrop-blur-md border-white/20 text-white">
        <CardHeader>
          <CardTitle className="text-cyan-400">5-Day Temperature Range</CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="h-[300px]">
            <ComposedChart data={data}>
              <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fill: "#cbd5e1", fontSize: 12 }} />
              <YAxis axisLine={false} tickLine={false} tick={{ fill: "#cbd5e1", fontSize: 12 }} />
              <ChartTooltip
                content={<ChartTooltipContent />}
                contentStyle={{
                  backgroundColor: "rgba(15, 23, 42, 0.9)",
                  border: "1px solid rgba(255, 255, 255, 0.2)",
                  borderRadius: "8px",
                  color: "white",
                }}
              />
              <Bar dataKey="high" fill="#ef4444" radius={[4, 4, 0, 0]} />
              <Bar dataKey="low" fill="#3b82f6" radius={[4, 4, 0, 0]} />
              <Line
                type="monotone"
                dataKey="high"
                stroke="#fca5a5"
                strokeWidth={2}
                dot={{ fill: "#ef4444", strokeWidth: 2, r: 4 }}
              />
              <Line
                type="monotone"
                dataKey="low"
                stroke="#93c5fd"
                strokeWidth={2}
                dot={{ fill: "#3b82f6", strokeWidth: 2, r: 4 }}
              />
            </ComposedChart>
          </ChartContainer>
        </CardContent>
      </Card>

      {/* Humidity & Wind Chart */}
      <Card className="bg-white/10 backdrop-blur-md border-white/20 text-white">
        <CardHeader>
          <CardTitle className="text-green-400">Humidity & Wind Forecast</CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="h-[300px]">
            <ComposedChart data={data}>
              <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fill: "#cbd5e1", fontSize: 12 }} />
              <YAxis yAxisId="humidity" axisLine={false} tickLine={false} tick={{ fill: "#cbd5e1", fontSize: 12 }} />
              <YAxis
                yAxisId="wind"
                orientation="right"
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#cbd5e1", fontSize: 12 }}
              />
              <ChartTooltip
                content={<ChartTooltipContent />}
                contentStyle={{
                  backgroundColor: "rgba(15, 23, 42, 0.9)",
                  border: "1px solid rgba(255, 255, 255, 0.2)",
                  borderRadius: "8px",
                  color: "white",
                }}
              />
              <Bar yAxisId="humidity" dataKey="humidity" fill="#06b6d4" radius={[4, 4, 0, 0]} opacity={0.7} />
              <Line
                yAxisId="wind"
                type="monotone"
                dataKey="windSpeed"
                stroke="#10b981"
                strokeWidth={3}
                dot={{ fill: "#10b981", strokeWidth: 2, r: 5 }}
                activeDot={{ r: 7, stroke: "#10b981", strokeWidth: 2 }}
              />
            </ComposedChart>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  )
}

export default ForecastChart
