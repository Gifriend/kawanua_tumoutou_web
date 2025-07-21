'use client';
import type React from 'react';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Cloud,
  Sun,
  CloudRain,
  CloudSnow,
  Wind,
  Droplets,
  Thermometer,
  Eye,
  MapPin,
  RefreshCw,
  AlertCircle,
} from 'lucide-react';
import WeatherChart from './WeatherChart';
import ForecastChart from './ForecastChart';
import WeatherStats from './WeatherStats';
import DerawanMap from './DerawanMap';
import WeatherSkeleton from './WeatherSkeleton';

interface WeatherData {
  location: string;
  temperature: number;
  description: string;
  humidity: number;
  windSpeed: number;
  pressure: number;
  visibility: number;
  feelsLike: number;
  uvIndex: number;
  icon: string;
  forecast: ForecastData[];
  hourlyForecast: HourlyData[];
  coordinates: {
    lat: number;
    lon: number;
  };
}

interface ForecastData {
  date: string;
  high: number;
  low: number;
  description: string;
  icon: string;
  humidity: number;
  windSpeed: number;
}

interface HourlyData {
  time: string;
  temperature: number;
  humidity: number;
  windSpeed: number;
  pressure: number;
}

const WeatherDashboard: React.FC = () => {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  const fetchWeather = async () => {
    setLoading(true);
    setError(null);
    console.log('Fetching weather directly from OpenWeatherMap API...');

    // Fixed coordinates for Derawan Islands
    const DERAWAN_LAT = 2.2833;
    const DERAWAN_LON = 118.241;
    const API_KEY = process.env.NEXT_PUBLIC_OPENWEATHERMAP_API_KEY;

    if (!API_KEY) {
      setError('API key tidak ditemukan');
      setLoading(false);
      return;
    }

    try {
      // Fetch current weather directly from OpenWeatherMap
      const currentResponse = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${DERAWAN_LAT}&lon=${DERAWAN_LON}&appid=${API_KEY}&units=metric&lang=id`
      );

      if (!currentResponse.ok) {
        throw new Error(`HTTP error! status: ${currentResponse.status}`);
      }

      const currentData = await currentResponse.json();

      // Fetch 5-day forecast directly from OpenWeatherMap
      const forecastResponse = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${DERAWAN_LAT}&lon=${DERAWAN_LON}&appid=${API_KEY}&units=metric&lang=id`
      );

      if (!forecastResponse.ok) {
        throw new Error(`HTTP error! status: ${forecastResponse.status}`);
      }

      const forecastData = await forecastResponse.json();

      // Process hourly forecast (first 8 entries = 24 hours)
      const hourlyForecast = forecastData.list
        .slice(0, 8)
        .map((item: any, index: number) => {
          const date = new Date(item.dt * 1000);
          return {
            time: date.getHours().toString().padStart(2, '0') + ':00',
            temperature: Math.round(item.main.temp * 10) / 10,
            humidity: item.main.humidity,
            windSpeed: Math.round(item.wind.speed * 3.6 * 10) / 10,
            pressure: item.main.pressure,
          };
        });

      // Process 5-day forecast
      const forecastByDay: { [key: string]: any } = {};

      forecastData.list.forEach((item: any) => {
        const date = new Date(item.dt * 1000);
        const dayKey = date.toDateString();

        if (!forecastByDay[dayKey]) {
          forecastByDay[dayKey] = {
            date: date.toLocaleDateString('id-ID', { weekday: 'short' }),
            high: item.main.temp_max,
            low: item.main.temp_min,
            description: item.weather[0]?.description || 'Tidak diketahui',
            icon: getWeatherIconFromCode(item.weather[0]?.icon || '01d'),
            humidity: item.main.humidity,
            windSpeed: Math.round(item.wind.speed * 3.6 * 10) / 10,
          };
        } else {
          forecastByDay[dayKey].high = Math.max(
            forecastByDay[dayKey].high,
            item.main.temp_max
          );
          forecastByDay[dayKey].low = Math.min(
            forecastByDay[dayKey].low,
            item.main.temp_min
          );
        }
      });

      const forecast = Object.values(forecastByDay).slice(0, 5);

      // Calculate UV Index estimate
      const getUVIndex = (weatherIcon: string, temp: number): number => {
        if (weatherIcon.includes('01')) return 9; // Clear sky
        if (weatherIcon.includes('02')) return 7; // Few clouds
        if (weatherIcon.includes('03') || weatherIcon.includes('04')) return 5; // Cloudy
        if (
          weatherIcon.includes('09') ||
          weatherIcon.includes('10') ||
          weatherIcon.includes('11')
        )
          return 3; // Rain
        return Math.min(Math.max(Math.round(temp / 5), 3), 9);
      };

      const processedWeatherData = {
        location: 'Pulau Derawan, Kalimantan Timur',
        temperature: Math.round(currentData.main.temp * 10) / 10,
        description: currentData.weather[0]?.description || 'Tidak diketahui',
        humidity: currentData.main.humidity,
        windSpeed: Math.round(currentData.wind.speed * 3.6 * 10) / 10,
        pressure: currentData.main.pressure,
        visibility: Math.round((currentData.visibility / 1000) * 10) / 10,
        feelsLike: Math.round(currentData.main.feels_like * 10) / 10,
        uvIndex: getUVIndex(
          currentData.weather[0]?.icon || '01d',
          currentData.main.temp
        ),
        icon: getWeatherIconFromCode(currentData.weather[0]?.icon || '01d'),
        forecast,
        hourlyForecast,
        coordinates: {
          lat: DERAWAN_LAT,
          lon: DERAWAN_LON,
        },
      };

      console.log('Weather data processed:', processedWeatherData);
      setWeatherData(processedWeatherData);
      setLastUpdated(new Date());
    } catch (err) {
      console.error('Direct API fetch error:', err);
      setError(
        err instanceof Error ? err.message : 'Gagal mengambil data cuaca'
      );

      // Fallback mock data
      setWeatherData({
        location: 'Pulau Derawan, Kalimantan Timur',
        temperature: 29.5,
        description: 'berawan sebagian',
        humidity: 78,
        windSpeed: 15.2,
        pressure: 1012,
        visibility: 12.0,
        feelsLike: 33.1,
        uvIndex: 8,
        icon: 'partly-cloudy',
        coordinates: {
          lat: 2.2833,
          lon: 118.241,
        },
        forecast: [
          {
            date: 'Hari ini',
            high: 31,
            low: 26,
            description: 'cerah',
            icon: 'sunny',
            humidity: 75,
            windSpeed: 12.5,
          },
          {
            date: 'Besok',
            high: 30,
            low: 25,
            description: 'berawan sebagian',
            icon: 'partly-cloudy',
            humidity: 80,
            windSpeed: 18.3,
          },
          {
            date: 'Rab',
            high: 28,
            low: 24,
            description: 'hujan ringan',
            icon: 'rainy',
            humidity: 85,
            windSpeed: 20.1,
          },
          {
            date: 'Kam',
            high: 32,
            low: 27,
            description: 'cerah',
            icon: 'sunny',
            humidity: 70,
            windSpeed: 10.8,
          },
          {
            date: 'Jum',
            high: 33,
            low: 28,
            description: 'panas',
            icon: 'sunny',
            humidity: 65,
            windSpeed: 8.5,
          },
        ],
        hourlyForecast: Array.from({ length: 8 }, (_, i) => ({
          time:
            (new Date().getHours() + i * 3).toString().padStart(2, '0') + ':00',
          temperature:
            Math.round((27 + Math.sin(i / 2) * 4 + Math.random() * 2) * 10) /
            10,
          humidity: Math.round(75 + Math.sin(i / 3) * 15 + Math.random() * 8),
          windSpeed:
            Math.round((12 + Math.sin(i / 4) * 6 + Math.random() * 4) * 10) /
            10,
          pressure:
            Math.round((1012 + Math.sin(i / 6) * 3 + Math.random() * 2) * 10) /
            10,
        })),
      });
    } finally {
      setLoading(false);
    }
  };

  // Helper function to convert OpenWeatherMap icon codes to our icon names
  const getWeatherIconFromCode = (iconCode: string): string => {
    const iconMap: Record<string, string> = {
      '01d': 'sunny',
      '01n': 'sunny',
      '02d': 'partly-cloudy',
      '02n': 'partly-cloudy',
      '03d': 'cloudy',
      '03n': 'cloudy',
      '04d': 'cloudy',
      '04n': 'cloudy',
      '09d': 'rainy',
      '09n': 'rainy',
      '10d': 'rainy',
      '10n': 'rainy',
      '11d': 'rainy',
      '11n': 'rainy',
      '13d': 'snowy',
      '13n': 'snowy',
      '50d': 'cloudy',
      '50n': 'cloudy',
    };
    return iconMap[iconCode] || 'sunny';
  };

  useEffect(() => {
    fetchWeather();

    // Auto refresh every 10 minutes
    const interval = setInterval(fetchWeather, 10 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  const getWeatherIcon = (iconName: string) => {
    switch (iconName) {
      case 'sunny':
        return <Sun className="w-8 h-8 text-yellow-400" />;
      case 'cloudy':
        return <Cloud className="w-8 h-8 text-gray-400" />;
      case 'partly-cloudy':
        return <Cloud className="w-8 h-8 text-blue-300" />;
      case 'rainy':
        return <CloudRain className="w-8 h-8 text-blue-400" />;
      case 'snowy':
        return <CloudSnow className="w-8 h-8 text-white" />;
      default:
        return <Sun className="w-8 h-8 text-yellow-400" />;
    }
  };

  const formatLastUpdated = (date: Date) => {
    return date.toLocaleString('id-ID', {
      hour: '2-digit',
      minute: '2-digit',
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });
  };

  return (
    <section className="relative z-10 py-20 px-4 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12">
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-4">
            <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent">
              Cuaca
            </span>{' '}
            <span className="text-white">Pulau Derawan</span>
          </h2>
          <p className="text-xl text-blue-200 max-w-2xl mx-auto">
            Informasi cuaca real-time dan prakiraan untuk Pulau Derawan,
            Kalimantan Timur
          </p>
          {lastUpdated && (
            <p className="text-sm text-blue-300 mt-2">
              Terakhir diperbarui: {formatLastUpdated(lastUpdated)}
            </p>
          )}
        </motion.div>

        {/* Refresh Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="mb-8 text-center">
          <Button
            onClick={fetchWeather}
            disabled={loading}
            className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 disabled:opacity-50">
            {loading ? (
              <RefreshCw className="w-4 h-4 animate-spin mr-2" />
            ) : (
              <RefreshCw className="w-4 h-4 mr-2" />
            )}
            {loading ? 'Memperbarui...' : 'Perbarui Data Cuaca'}
          </Button>

          {error && (
            <div className="mt-4 p-3 bg-red-500/20 border border-red-500/30 rounded-lg max-w-md mx-auto">
              <div className="flex items-center gap-2 text-red-400">
                <AlertCircle className="w-4 h-4" />
                <span className="text-sm">{error}</span>
              </div>
              <p className="text-xs text-red-300 mt-1">
                Menampilkan data cadangan
              </p>
            </div>
          )}
        </motion.div>

        {loading ? (
          <WeatherSkeleton />
        ) : (
          weatherData && (
            <div className="space-y-8">
              {/* Current Weather */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                viewport={{ once: true }}>
                <Card className="bg-white/10 backdrop-blur-md border-white/20 text-white">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-2xl">
                      <MapPin className="w-6 h-6 text-cyan-400" />
                      {weatherData.location}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                      {/* Main Weather */}
                      <div className="lg:col-span-2 flex items-center gap-6">
                        {getWeatherIcon(weatherData.icon)}
                        <div>
                          <div className="text-5xl font-bold text-white">
                            {weatherData.temperature}°C
                          </div>
                          <div className="text-xl text-blue-200 capitalize">
                            {weatherData.description}
                          </div>
                          <div className="text-sm text-blue-300">
                            Terasa seperti {weatherData.feelsLike}°C
                          </div>
                        </div>
                      </div>

                      {/* Weather Details */}
                      <div className="grid grid-cols-2 gap-4 lg:col-span-2">
                        <div className="flex items-center gap-2">
                          <Droplets className="w-5 h-5 text-blue-400" />
                          <div>
                            <div className="text-sm text-blue-300">
                              Kelembaban
                            </div>
                            <div className="font-semibold">
                              {weatherData.humidity}%
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Wind className="w-5 h-5 text-cyan-400" />
                          <div>
                            <div className="text-sm text-blue-300">Angin</div>
                            <div className="font-semibold">
                              {weatherData.windSpeed} km/h
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Thermometer className="w-5 h-5 text-red-400" />
                          <div>
                            <div className="text-sm text-blue-300">Tekanan</div>
                            <div className="font-semibold">
                              {weatherData.pressure} hPa
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Eye className="w-5 h-5 text-green-400" />
                          <div>
                            <div className="text-sm text-blue-300">
                              Jarak Pandang
                            </div>
                            <div className="font-semibold">
                              {weatherData.visibility} km
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Tabs for different views */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                viewport={{ once: true }}>
                <Tabs defaultValue="forecast" className="w-full">
                  <TabsList className="grid w-full grid-cols-5 bg-white/10 backdrop-blur-md">
                    <TabsTrigger
                      value="forecast"
                      className="data-[state=active]:bg-cyan-500 text-sm sm:text-md">
                      <p className="text-xs sm:text-sm">5 hari</p>
                    </TabsTrigger>
                    <TabsTrigger
                      value="hourly"
                      className="data-[state=active]:bg-cyan-500">
                      <p className="text-xs sm:text-sm">24 jam</p>
                    </TabsTrigger>
                    <TabsTrigger
                      value="statistics"
                      className="data-[state=active]:bg-cyan-500">
                      <p className="text-xs sm:text-sm">Statistik</p>
                    </TabsTrigger>
                    <TabsTrigger
                      value="trends"
                      className="data-[state=active]:bg-cyan-500">
                      <p className="text-xs sm:text-sm">Tren</p>
                    </TabsTrigger>
                    <TabsTrigger
                      value="map"
                      className="data-[state=active]:bg-cyan-500">
                      <p className="text-xs sm:text-sm">Peta</p>
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="forecast" className="mt-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                      {weatherData.forecast.map((day, index) => (
                        <motion.div
                          key={day.date}
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.4, delay: index * 0.1 }}
                          viewport={{ once: true }}>
                          <Card className="bg-white/10 backdrop-blur-md border-white/20 text-white hover:bg-white/20 transition-all duration-300">
                            <CardContent className="p-4 text-center">
                              <div className="font-semibold mb-2">
                                {day.date}
                              </div>
                              <div className="flex justify-center mb-2">
                                {getWeatherIcon(day.icon)}
                              </div>
                              <div className="text-sm text-blue-200 mb-2 capitalize">
                                {day.description}
                              </div>
                              <div className="flex justify-between items-center">
                                <span className="font-bold text-lg">
                                  {Math.round(day.high)}°
                                </span>
                                <span className="text-blue-300">
                                  {Math.round(day.low)}°
                                </span>
                              </div>
                              <div className="mt-2 space-y-1 text-xs">
                                <div className="flex justify-between">
                                  <span>Kelembaban:</span>
                                  <span>{day.humidity}%</span>
                                </div>
                                <div className="flex justify-between">
                                  <span>Angin:</span>
                                  <span>{day.windSpeed} km/h</span>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        </motion.div>
                      ))}
                    </div>
                  </TabsContent>

                  <TabsContent value="hourly" className="mt-6">
                    <WeatherChart data={weatherData.hourlyForecast} />
                  </TabsContent>

                  <TabsContent value="statistics" className="mt-6">
                    <WeatherStats data={weatherData} />
                  </TabsContent>

                  <TabsContent value="trends" className="mt-6">
                    <ForecastChart data={weatherData.forecast} />
                  </TabsContent>

                  <TabsContent value="map" className="mt-6">
                    <DerawanMap coordinates={weatherData.coordinates} />
                  </TabsContent>
                </Tabs>
              </motion.div>
            </div>
          )
        )}
      </div>
    </section>
  );
};

export default WeatherDashboard;
