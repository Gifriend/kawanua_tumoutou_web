"use client"
import React from "react"
import HeroContent from "./HomeContent"
import WeatherDashboard from "../../components/weather/WeatherDashboard"
import WorkPage from "../work-program/WorkPage"

const Home: React.FC = () => {
  return (
    <>
      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in {
          animation: fade-in 0.8s ease-out forwards;
          opacity: 0;
        }
      `}</style>

      <div className="bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 relative">
        {/* Background gradients */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 via-transparent to-cyan-600/10" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-slate-900/40" />

        {/* Main content */}
        <HeroContent />
        <WeatherDashboard />
        <WorkPage />
      </div>
    </>
  )
}

export default Home
