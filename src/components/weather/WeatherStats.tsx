"use client"
import type React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { TrendingUp, TrendingDown, Thermometer, Droplets, Wind, Eye, Sun } from "lucide-react"

interface WeatherData {
  location: string
  temperature: number
  description: string
  humidity: number
  windSpeed: number
  pressure: number
  visibility: number
  feelsLike: number
  uvIndex: number
  icon: string
  forecast: any[]
  hourlyForecast: any[]
}

interface WeatherStatsProps {
  data: WeatherData
}

const WeatherStats: React.FC<WeatherStatsProps> = ({ data }) => {
  const getUVLevel = (uvIndex: number) => {
    if (uvIndex <= 2) return { level: "Low", color: "bg-green-500", textColor: "text-green-400" }
    if (uvIndex <= 5) return { level: "Moderate", color: "bg-yellow-500", textColor: "text-yellow-400" }
    if (uvIndex <= 7) return { level: "High", color: "bg-orange-500", textColor: "text-orange-400" }
    if (uvIndex <= 10) return { level: "Very High", color: "bg-red-500", textColor: "text-red-400" }
    return { level: "Extreme", color: "bg-purple-500", textColor: "text-purple-400" }
  }

  const getComfortLevel = (temp: number, humidity: number) => {
    if (temp >= 20 && temp <= 26 && humidity >= 40 && humidity <= 60) {
      return { level: "Comfortable", color: "text-green-400", icon: <TrendingUp className="w-4 h-4" /> }
    }
    if (temp > 30 || humidity > 80) {
      return { level: "Uncomfortable", color: "text-red-400", icon: <TrendingDown className="w-4 h-4" /> }
    }
    return { level: "Moderate", color: "text-yellow-400", icon: <TrendingUp className="w-4 h-4" /> }
  }

  const getWindLevel = (windSpeed: number) => {
    if (windSpeed < 5) return { level: "Calm", color: "text-green-400" }
    if (windSpeed < 15) return { level: "Light Breeze", color: "text-blue-400" }
    if (windSpeed < 25) return { level: "Moderate Breeze", color: "text-yellow-400" }
    if (windSpeed < 35) return { level: "Strong Breeze", color: "text-orange-400" }
    return { level: "High Wind", color: "text-red-400" }
  }

  const uvLevel = getUVLevel(data.uvIndex)
  const comfortLevel = getComfortLevel(data.temperature, data.humidity)
  const windLevel = getWindLevel(data.windSpeed)

  // Calculate statistics from hourly data
  const avgTemp = data.hourlyForecast.reduce((sum, hour) => sum + hour.temperature, 0) / data.hourlyForecast.length
  const maxTemp = Math.max(...data.hourlyForecast.map((hour) => hour.temperature))
  const minTemp = Math.min(...data.hourlyForecast.map((hour) => hour.temperature))
  const avgHumidity = data.hourlyForecast.reduce((sum, hour) => sum + hour.humidity, 0) / data.hourlyForecast.length

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
      {/* Comfort Index */}
      <Card className="bg-white/10 backdrop-blur-md border-white/20 text-white">
        <CardHeader className="pb-2 md:pb-4">
          <CardTitle className="flex items-center gap-2 text-base md:text-lg">
            <Thermometer className="w-4 h-4 md:w-5 md:h-5 text-cyan-400" />
            <span className="text-sm md:text-base">Comfort Index</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 md:space-y-4 p-3 md:p-6">
          <div className="flex items-center justify-between">
            <span className="text-xs md:text-sm">Current Level</span>
            <Badge className={`${comfortLevel.color} bg-transparent border-current text-xs`}>
              {comfortLevel.level}
            </Badge>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-xs md:text-sm">
              <span>Temperature</span>
              <span>{Math.round(data.temperature)}°C</span>
            </div>
            <Progress value={(data.temperature / 40) * 100} className="h-1.5 md:h-2" />
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-xs md:text-sm">
              <span>Feels Like</span>
              <span>{Math.round(data.feelsLike)}°C</span>
            </div>
            <Progress value={(data.feelsLike / 40) * 100} className="h-1.5 md:h-2" />
          </div>
        </CardContent>
      </Card>

      {/* UV Index */}
      <Card className="bg-white/10 backdrop-blur-md border-white/20 text-white">
        <CardHeader className="pb-2 md:pb-4">
          <CardTitle className="flex items-center gap-2 text-base md:text-lg">
            <Sun className="w-4 h-4 md:w-5 md:h-5 text-yellow-400" />
            <span className="text-sm md:text-base">UV Index</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 md:space-y-4 p-3 md:p-6">
          <div className="text-center">
            <div className="text-2xl md:text-3xl font-bold mb-2">{data.uvIndex}</div>
            <Badge className={`${uvLevel.textColor} bg-transparent border-current text-xs`}>{uvLevel.level}</Badge>
          </div>
          <Progress value={(data.uvIndex / 11) * 100} className="h-2 md:h-3" />
          <div className="text-xs md:text-sm text-blue-200">
            {data.uvIndex <= 2 && "Minimal protection required"}
            {data.uvIndex > 2 && data.uvIndex <= 5 && "Moderate protection recommended"}
            {data.uvIndex > 5 && data.uvIndex <= 7 && "Protection essential"}
            {data.uvIndex > 7 && "Extra protection required"}
          </div>
        </CardContent>
      </Card>

      {/* Air Quality */}
      <Card className="bg-white/10 backdrop-blur-md border-white/20 text-white">
        <CardHeader className="pb-2 md:pb-4">
          <CardTitle className="flex items-center gap-2 text-base md:text-lg">
            <Eye className="w-4 h-4 md:w-5 md:h-5 text-green-400" />
            <span className="text-sm md:text-base">Visibility</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 md:space-y-4 p-3 md:p-6">
          <div className="text-center">
            <div className="text-2xl md:text-3xl font-bold mb-2">{data.visibility} km</div>
            <Badge className="text-green-400 bg-transparent border-current text-xs">
              {data.visibility >= 10 ? "Excellent" : data.visibility >= 5 ? "Good" : "Poor"}
            </Badge>
          </div>
          <Progress value={(data.visibility / 15) * 100} className="h-2 md:h-3" />
          <div className="text-xs md:text-sm text-blue-200">Atmospheric visibility conditions</div>
        </CardContent>
      </Card>

      {/* Wind Analysis */}
      <Card className="bg-white/10 backdrop-blur-md border-white/20 text-white">
        <CardHeader className="pb-2 md:pb-4">
          <CardTitle className="flex items-center gap-2 text-base md:text-lg">
            <Wind className="w-4 h-4 md:w-5 md:h-5 text-cyan-400" />
            <span className="text-sm md:text-base">Wind Analysis</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 md:space-y-4 p-3 md:p-6">
          <div className="flex items-center justify-between">
            <span className="text-xs md:text-sm">Wind Speed</span>
            <span className="font-bold text-sm md:text-base">{data.windSpeed} km/h</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-xs md:text-sm">Condition</span>
            <Badge className={`${windLevel.color} bg-transparent border-current text-xs`}>{windLevel.level}</Badge>
          </div>
          <Progress value={(data.windSpeed / 50) * 100} className="h-1.5 md:h-2" />
          <div className="text-xs md:text-sm text-blue-200">
            {windLevel.level === "Calm" && "Perfect for outdoor activities"}
            {windLevel.level === "Light Breeze" && "Pleasant conditions"}
            {windLevel.level === "Moderate Breeze" && "Good for sailing"}
            {windLevel.level === "Strong Breeze" && "Caution advised"}
            {windLevel.level === "High Wind" && "Stay indoors if possible"}
          </div>
        </CardContent>
      </Card>

      {/* Humidity Details */}
      <Card className="bg-white/10 backdrop-blur-md border-white/20 text-white">
        <CardHeader className="pb-2 md:pb-4">
          <CardTitle className="flex items-center gap-2 text-base md:text-lg">
            <Droplets className="w-4 h-4 md:w-5 md:h-5 text-blue-400" />
            <span className="text-sm md:text-base">Humidity Analysis</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 md:space-y-4 p-3 md:p-6">
          <div className="flex items-center justify-between">
            <span className="text-xs md:text-sm">Current</span>
            <span className="font-bold text-sm md:text-base">{data.humidity}%</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-xs md:text-sm">24h Average</span>
            <span className="font-bold text-sm md:text-base">{Math.round(avgHumidity)}%</span>
          </div>
          <Progress value={data.humidity} className="h-1.5 md:h-2" />
          <div className="text-xs md:text-sm text-blue-200">
            {data.humidity < 30 && "Very dry conditions"}
            {data.humidity >= 30 && data.humidity < 60 && "Comfortable humidity"}
            {data.humidity >= 60 && data.humidity < 80 && "Slightly humid"}
            {data.humidity >= 80 && "Very humid conditions"}
          </div>
        </CardContent>
      </Card>

      {/* Temperature Statistics */}
      <Card className="bg-white/10 backdrop-blur-md border-white/20 text-white">
        <CardHeader className="pb-2 md:pb-4">
          <CardTitle className="flex items-center gap-2 text-base md:text-lg">
            <TrendingUp className="w-4 h-4 md:w-5 md:h-5 text-orange-400" />
            <span className="text-sm md:text-base">Temperature Stats</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 md:space-y-4 p-3 md:p-6">
          <div className="grid grid-cols-2 gap-3 md:gap-4">
            <div className="text-center">
              <div className="text-xs md:text-sm text-blue-300">24h High</div>
              <div className="text-lg md:text-xl font-bold text-red-400">{Math.round(maxTemp)}°C</div>
            </div>
            <div className="text-center">
              <div className="text-xs md:text-sm text-blue-300">24h Low</div>
              <div className="text-lg md:text-xl font-bold text-blue-400">{Math.round(minTemp)}°C</div>
            </div>
          </div>
          <div className="text-center">
            <div className="text-xs md:text-sm text-blue-300">24h Average</div>
            <div className="text-xl md:text-2xl font-bold">{Math.round(avgTemp)}°C</div>
          </div>
          <div className="text-xs md:text-sm text-blue-200 text-center">
            Temperature range: {Math.round(maxTemp - minTemp)}°C
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default WeatherStats
