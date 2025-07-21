import React from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

const WeatherSkeleton: React.FC = () => {
  return (
    <div className="space-y-8">
      {/* Skeleton untuk Info Cuaca */}
      <Card className="bg-white/10 backdrop-blur-md border-white/20 text-white">
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Icon dan Suhu */}
            <div className="lg:col-span-2 flex items-center gap-6">
              <Skeleton className="w-16 h-16 rounded-full bg-white/20" />
              <div className="space-y-2">
                <Skeleton className="w-24 h-8 bg-white/20" />
                <Skeleton className="w-32 h-5 bg-white/20" />
                <Skeleton className="w-40 h-4 bg-white/20" />
              </div>
            </div>

            {/* Detail */}
            <div className="grid grid-cols-2 gap-4 lg:col-span-2">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="space-y-2">
                  <Skeleton className="w-24 h-4 bg-white/20" />
                  <Skeleton className="w-16 h-5 bg-white/20" />
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Skeleton Tabs Forecast */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <Card key={i} className="bg-white/10 backdrop-blur-md border-white/20 text-white">
            <CardContent className="p-4 text-center space-y-3">
              <Skeleton className="w-20 h-5 mx-auto bg-white/20" />
              <Skeleton className="w-10 h-10 mx-auto rounded-full bg-white/20" />
              <Skeleton className="w-24 h-4 mx-auto bg-white/20" />
              <div className="flex justify-center gap-2">
                <Skeleton className="w-10 h-5 bg-white/20" />
                <Skeleton className="w-10 h-5 bg-white/20" />
              </div>
              <Skeleton className="w-full h-3 bg-white/20" />
              <Skeleton className="w-full h-3 bg-white/20" />
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

export default WeatherSkeleton
