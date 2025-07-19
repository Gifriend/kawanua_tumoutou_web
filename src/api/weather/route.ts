import { type NextRequest, NextResponse } from "next/server"

interface WeatherResponse {
  name: string
  sys: {
    country: string
  }
  coord: {
    lat: number
    lon: number
  }
  main: {
    temp: number
    feels_like: number
    temp_min: number
    temp_max: number
    pressure: number
    humidity: number
  }
  weather: Array<{
    description: string
    icon: string
  }>
  wind: {
    speed: number
  }
  visibility: number
}

interface ForecastResponse {
  list: Array<{
    dt: number
    main: {
      temp: number
      temp_min: number
      temp_max: number
      pressure: number
      humidity: number
    }
    weather: Array<{
      description: string
      icon: string
    }>
    wind: {
      speed: number
    }
  }>
}

interface ProcessedForecastDay {
  date: string
  high: number
  low: number
  description: string
  icon: string
  humidity: number
  windSpeed: number
}

interface HourlyForecast {
  time: string
  temperature: number
  humidity: number
  windSpeed: number
  pressure: number
}

interface ForecastByDay {
  [key: string]: ProcessedForecastDay
}

export async function GET(request: NextRequest) {
  // Fixed coordinates for Derawan Islands
  const DERAWAN_LAT = 2.2368796
  const DERAWAN_LON = 118.4278129

  // Get API key from environment variables
  const API_KEY = process.env.OPENWEATHERMAP_API_KEY

  if (!API_KEY) {
    console.error("OpenWeatherMap API key not found in environment variables")
    return NextResponse.json({ error: "OpenWeatherMap API key not configured" }, { status: 500 })
  }

  try {
    console.log(`Fetching weather data for Derawan Islands (${DERAWAN_LAT}, ${DERAWAN_LON})`)

    // Current weather for Derawan Islands using coordinates
    const currentResponse = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${DERAWAN_LAT}&lon=${DERAWAN_LON}&appid=${API_KEY}&units=metric&lang=id`,
    )

    if (!currentResponse.ok) {
      const errorText = await currentResponse.text()
      console.error("Current weather API Error:", errorText)
      throw new Error(`Weather data not found: ${currentResponse.status}`)
    }

    const currentData: WeatherResponse = await currentResponse.json()
    console.log("Current weather data received:", currentData.name, currentData.main.temp)

    // 5-day forecast for Derawan Islands
    const forecastResponse = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${DERAWAN_LAT}&lon=${DERAWAN_LON}&appid=${API_KEY}&units=metric&lang=id`,
    )

    if (!forecastResponse.ok) {
      const errorText = await forecastResponse.text()
      console.error("Forecast API Error:", errorText)
      throw new Error(`Forecast data not found: ${forecastResponse.status}`)
    }

    const forecastData: ForecastResponse = await forecastResponse.json()
    console.log("Forecast data received, entries:", forecastData.list.length)

    // Process forecast data
    const hourlyForecast: HourlyForecast[] = []

    // Group forecast by days
    const forecastByDay: ForecastByDay = {}

    forecastData.list.forEach((item, index) => {
      const date = new Date(item.dt * 1000)
      const dayKey = date.toDateString()

      // Add to hourly forecast (first 24 hours / 8 entries since API returns 3-hour intervals)
      if (index < 8) {
        hourlyForecast.push({
          time: date.getHours().toString().padStart(2, "0") + ":00",
          temperature: Math.round(item.main.temp * 10) / 10,
          humidity: item.main.humidity,
          windSpeed: Math.round(item.wind.speed * 3.6 * 10) / 10, // Convert m/s to km/h
          pressure: item.main.pressure,
        })
      }

      if (!forecastByDay[dayKey]) {
        forecastByDay[dayKey] = {
          date: date.toLocaleDateString("id-ID", { weekday: "short" }),
          high: item.main.temp_max,
          low: item.main.temp_min,
          description: item.weather[0]?.description || "Tidak diketahui",
          icon: getWeatherIcon(item.weather[0]?.icon || "01d"),
          humidity: item.main.humidity,
          windSpeed: Math.round(item.wind.speed * 3.6 * 10) / 10,
        }
      } else {
        forecastByDay[dayKey].high = Math.max(forecastByDay[dayKey].high, item.main.temp_max)
        forecastByDay[dayKey].low = Math.min(forecastByDay[dayKey].low, item.main.temp_min)
        // Update with more recent data for description and other fields
        forecastByDay[dayKey].description = item.weather[0]?.description || forecastByDay[dayKey].description
        forecastByDay[dayKey].icon = getWeatherIcon(item.weather[0]?.icon || "01d")
      }
    })

    // Convert to array and take first 5 days
    const forecast = Object.values(forecastByDay).slice(0, 5)

    // Calculate UV Index based on weather conditions (since OpenWeatherMap UV requires separate API call)
    const getUVIndex = (weatherIcon: string, temp: number): number => {
      if (weatherIcon.includes("01")) return 9 // Clear sky - high UV
      if (weatherIcon.includes("02")) return 7 // Few clouds - moderate-high UV
      if (weatherIcon.includes("03") || weatherIcon.includes("04")) return 5 // Cloudy - moderate UV
      if (weatherIcon.includes("09") || weatherIcon.includes("10") || weatherIcon.includes("11")) return 3 // Rain - low UV
      return Math.min(Math.max(Math.round(temp / 5), 3), 9) // Temperature-based estimate
    }

    const weatherData = {
      location: "Pulau Derawan, Kalimantan Timur",
      temperature: Math.round(currentData.main.temp * 10) / 10,
      description: currentData.weather[0]?.description || "Tidak diketahui",
      humidity: currentData.main.humidity,
      windSpeed: Math.round(currentData.wind.speed * 3.6 * 10) / 10, // Convert m/s to km/h
      pressure: currentData.main.pressure,
      visibility: Math.round((currentData.visibility / 1000) * 10) / 10, // Convert m to km
      feelsLike: Math.round(currentData.main.feels_like * 10) / 10,
      uvIndex: getUVIndex(currentData.weather[0]?.icon || "01d", currentData.main.temp),
      icon: getWeatherIcon(currentData.weather[0]?.icon || "01d"),
      forecast,
      hourlyForecast,
      coordinates: {
        lat: DERAWAN_LAT,
        lon: DERAWAN_LON,
      },
    }

    console.log("Weather data processed successfully")
    return NextResponse.json(weatherData)
  } catch (error) {
    console.error("Weather API error:", error)

    // Return mock data as fallback
    const mockData = {
      location: "Pulau Derawan, Kalimantan Timur",
      temperature: 29.5,
      description: "berawan sebagian",
      humidity: 78,
      windSpeed: 15.2,
      pressure: 1012,
      visibility: 12.0,
      feelsLike: 33.1,
      uvIndex: 8,
      icon: "partly-cloudy",
      coordinates: {
        lat: 2.2368796,
        lon: 118.4278129,
      },
      forecast: [
        { date: "Hari ini", high: 31, low: 26, description: "cerah", icon: "sunny", humidity: 75, windSpeed: 12.5 },
        {
          date: "Besok",
          high: 30,
          low: 25,
          description: "berawan sebagian",
          icon: "partly-cloudy",
          humidity: 80,
          windSpeed: 18.3,
        },
        { date: "Rab", high: 28, low: 24, description: "hujan ringan", icon: "rainy", humidity: 85, windSpeed: 20.1 },
        { date: "Kam", high: 32, low: 27, description: "cerah", icon: "sunny", humidity: 70, windSpeed: 10.8 },
        { date: "Jum", high: 33, low: 28, description: "panas", icon: "sunny", humidity: 65, windSpeed: 8.5 },
      ],
      hourlyForecast: Array.from({ length: 8 }, (_, i) => ({
        time: (new Date().getHours() + i * 3).toString().padStart(2, "0") + ":00",
        temperature: Math.round((27 + Math.sin(i / 2) * 4 + Math.random() * 2) * 10) / 10,
        humidity: Math.round(75 + Math.sin(i / 3) * 15 + Math.random() * 8),
        windSpeed: Math.round((12 + Math.sin(i / 4) * 6 + Math.random() * 4) * 10) / 10,
        pressure: Math.round((1012 + Math.sin(i / 6) * 3 + Math.random() * 2) * 10) / 10,
      })),
    }

    return NextResponse.json(mockData)
  }
}

function getWeatherIcon(iconCode: string): string {
  const iconMap: Record<string, string> = {
    "01d": "sunny", // clear sky day
    "01n": "sunny", // clear sky night
    "02d": "partly-cloudy", // few clouds day
    "02n": "partly-cloudy", // few clouds night
    "03d": "cloudy", // scattered clouds day
    "03n": "cloudy", // scattered clouds night
    "04d": "cloudy", // broken clouds day
    "04n": "cloudy", // broken clouds night
    "09d": "rainy", // shower rain day
    "09n": "rainy", // shower rain night
    "10d": "rainy", // rain day
    "10n": "rainy", // rain night
    "11d": "rainy", // thunderstorm day
    "11n": "rainy", // thunderstorm night
    "13d": "snowy", // snow day
    "13n": "snowy", // snow night
    "50d": "cloudy", // mist day
    "50n": "cloudy", // mist night
  }

  return iconMap[iconCode] || "sunny"
}
