export interface WeatherData {
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
  forecast: ForecastData[]
  hourlyForecast: HourlyData[]
}

export interface ForecastData {
  date: string
  high: number
  low: number
  description: string
  icon: string
  humidity: number
  windSpeed: number
}

export interface HourlyData {
  time: string
  temperature: number
  humidity: number
  windSpeed: number
  pressure: number
}

export interface WeatherStatsProps {
  data: WeatherData
}

export interface WeatherChartProps {
  data: HourlyData[]
}

export interface ForecastChartProps {
  data: ForecastData[]
}
