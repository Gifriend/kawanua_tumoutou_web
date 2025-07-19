"use client"
import type React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MapPin, Navigation, Waves, Clock, Thermometer } from "lucide-react"

interface DerawanMapProps {
  coordinates: {
    lat: number
    lon: number
  }
}

const DerawanMap: React.FC<DerawanMapProps> = ({ coordinates }) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Map Information */}
      <Card className="bg-white/10 backdrop-blur-md border-white/20 text-white">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-xl">
            <MapPin className="w-6 h-6 text-cyan-400" />
            Lokasi Pulau Derawan
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Navigation className="w-5 h-5 text-blue-400" />
              <div>
                <div className="text-sm text-blue-300">Koordinat</div>
                <div className="font-semibold">
                  {coordinates.lat.toFixed(6)}°N, {coordinates.lon.toFixed(6)}°E
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Waves className="w-5 h-5 text-cyan-400" />
              <div>
                <div className="text-sm text-blue-300">Lokasi</div>
                <div className="font-semibold">Kepulauan Derawan, Kalimantan Timur</div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Clock className="w-5 h-5 text-green-400" />
              <div>
                <div className="text-sm text-blue-300">Zona Waktu</div>
                <div className="font-semibold">WITA (UTC+8)</div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Thermometer className="w-5 h-5 text-orange-400" />
              <div>
                <div className="text-sm text-blue-300">Iklim</div>
                <div className="font-semibold">Tropis Laut</div>
              </div>
            </div>
          </div>

          <div className="border-t border-white/20 pt-4">
            <h4 className="font-semibold mb-2 text-cyan-400">Tentang Pulau Derawan</h4>
            <p className="text-sm text-blue-200 leading-relaxed">
              Pulau Derawan adalah salah satu destinasi wisata bahari terpopuler di Kalimantan Timur. Terkenal dengan
              keindahan bawah lautnya, penyu hijau, dan ubur-ubur tak menyengat di Danau Kakaban.
            </p>
          </div>

          <div className="border-t border-white/20 pt-4">
            <h4 className="font-semibold mb-2 text-cyan-400">Aktivitas Populer</h4>
            <ul className="text-sm text-blue-200 space-y-1">
              <li>• Snorkeling dan diving</li>
              <li>• Melihat penyu bertelur</li>
              <li>• Berenang dengan ubur-ubur</li>
              <li>• Island hopping</li>
              <li>• Fotografi underwater</li>
            </ul>
          </div>

          <div className="border-t border-white/20 pt-4">
            <h4 className="font-semibold mb-2 text-cyan-400">Cuaca Terbaik</h4>
            <p className="text-sm text-blue-200">
              April - Oktober: Musim kering dengan cuaca cerah ideal untuk aktivitas laut
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Embedded Google Map */}
      <Card className="bg-white/10 backdrop-blur-md border-white/20 text-white">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-xl">
            <MapPin className="w-6 h-6 text-cyan-400" />
            Peta Interaktif
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative w-full h-[400px] rounded-lg overflow-hidden">
            <iframe
              src={`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3989.8!2d${coordinates.lon}!3d${coordinates.lat}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3212abcef5b94afb%3A0xe4cf7029473436a9!2sDerawan%20Islands!5e1!3m2!1sen!2sid!4v1642000000000!5m2!1sen!2sid`}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="rounded-lg"
              title="Peta Pulau Derawan"
            />
          </div>
          <div className="mt-4 text-center">
            <a
              href={`https://www.google.com/maps/place/Derawan+Islands/@${coordinates.lat},${coordinates.lon},15z`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition-colors"
            >
              <MapPin className="w-4 h-4" />
              Buka di Google Maps
            </a>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default DerawanMap
