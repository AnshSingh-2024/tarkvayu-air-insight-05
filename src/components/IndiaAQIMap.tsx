
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Layers, RefreshCw } from "lucide-react";

const IndiaAQIMap = () => {
  const [selectedCity, setSelectedCity] = useState<string | null>(null);
  const [mapView, setMapView] = useState<"aqi" | "pm25" | "wind">("aqi");

  // Indian cities with mock AQI data and approximate positions
  const indianCities = [
    { name: "Delhi", aqi: 156, pm25: 78, lat: 28.6, lng: 77.2, region: "North" },
    { name: "Mumbai", aqi: 89, pm25: 45, lat: 19.0, lng: 72.8, region: "West" },
    { name: "Bangalore", aqi: 65, pm25: 32, lat: 12.9, lng: 77.6, region: "South" },
    { name: "Chennai", aqi: 78, pm25: 38, lat: 13.0, lng: 80.2, region: "South" },
    { name: "Kolkata", aqi: 134, pm25: 67, lat: 22.5, lng: 88.3, region: "East" },
    { name: "Hyderabad", aqi: 72, pm25: 35, lat: 17.3, lng: 78.4, region: "South" },
    { name: "Pune", aqi: 82, pm25: 41, lat: 18.5, lng: 73.8, region: "West" },
    { name: "Ahmedabad", aqi: 95, pm25: 48, lat: 23.0, lng: 72.5, region: "West" },
    { name: "Jaipur", aqi: 128, pm25: 64, lat: 26.9, lng: 75.7, region: "North" },
    { name: "Lucknow", aqi: 142, pm25: 71, lat: 26.8, lng: 80.9, region: "North" },
    { name: "Patna", aqi: 168, pm25: 84, lat: 25.5, lng: 85.1, region: "East" },
    { name: "Bhopal", aqi: 98, pm25: 49, lat: 23.2, lng: 77.4, region: "Central" },
    { name: "Kochi", aqi: 45, pm25: 22, lat: 9.9, lng: 76.2, region: "South" },
    { name: "Guwahati", aqi: 87, pm25: 43, lat: 26.1, lng: 91.7, region: "Northeast" },
    { name: "Chandigarh", aqi: 118, pm25: 59, lat: 30.7, lng: 76.7, region: "North" }
  ];

  const getAQIColor = (aqi: number) => {
    if (aqi <= 50) return "#22c55e"; // Green
    if (aqi <= 100) return "#eab308"; // Yellow
    if (aqi <= 150) return "#f97316"; // Orange
    if (aqi <= 200) return "#ef4444"; // Red
    if (aqi <= 300) return "#a855f7"; // Purple
    return "#374151"; // Gray
  };

  const getAQILevel = (aqi: number) => {
    if (aqi <= 50) return "Good";
    if (aqi <= 100) return "Moderate";
    if (aqi <= 150) return "Unhealthy for Sensitive";
    if (aqi <= 200) return "Unhealthy";
    if (aqi <= 300) return "Very Unhealthy";
    return "Hazardous";
  };

  const getCityPosition = (lat: number, lng: number) => {
    // Convert lat/lng to SVG coordinates (simplified projection)
    const x = ((lng - 68) / (97 - 68)) * 100;
    const y = ((37 - lat) / (37 - 6)) * 100;
    return { x: Math.max(5, Math.min(95, x)), y: Math.max(5, Math.min(95, y)) };
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center space-x-2">
            <MapPin className="h-5 w-5" />
            <span>India AQI Heat Map</span>
          </CardTitle>
          <div className="flex items-center space-x-2">
            <Button
              variant={mapView === "aqi" ? "default" : "outline"}
              size="sm"
              onClick={() => setMapView("aqi")}
            >
              AQI
            </Button>
            <Button
              variant={mapView === "pm25" ? "default" : "outline"}
              size="sm"
              onClick={() => setMapView("pm25")}
            >
              PM2.5
            </Button>
            <Button variant="ghost" size="icon">
              <RefreshCw className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <div className="relative">
          {/* India Map SVG */}
          <div className="relative w-full h-96 bg-gradient-to-br from-blue-50 to-green-50 dark:from-gray-800 dark:to-gray-700 overflow-hidden">
            {/* Simplified India outline */}
            <svg
              viewBox="0 0 100 100"
              className="absolute inset-0 w-full h-full"
              style={{ filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.1))" }}
            >
              {/* India border outline (simplified) */}
              <path
                d="M20,15 L25,12 L30,14 L35,10 L40,12 L45,8 L50,10 L55,8 L60,12 L65,10 L70,15 L75,18 L80,25 L82,35 L80,45 L78,55 L75,65 L70,75 L65,80 L60,82 L55,85 L50,88 L45,85 L40,82 L35,80 L30,75 L25,70 L22,60 L20,50 L18,40 L19,30 Z"
                fill="#e5f3ff"
                stroke="#3b82f6"
                strokeWidth="0.5"
                className="dark:fill-gray-600 dark:stroke-gray-400"
              />
              
              {/* Regional boundaries */}
              <g stroke="#94a3b8" strokeWidth="0.2" fill="none" opacity="0.5">
                <path d="M20,15 L45,25 L65,20" />
                <path d="M30,30 L70,35" />
                <path d="M25,45 L75,50" />
                <path d="M30,65 L65,70" />
              </g>
            </svg>

            {/* City markers */}
            {indianCities.map((city) => {
              const position = getCityPosition(city.lat, city.lng);
              const value = mapView === "aqi" ? city.aqi : city.pm25;
              const color = getAQIColor(city.aqi);
              
              return (
                <div
                  key={city.name}
                  className="absolute cursor-pointer transform -translate-x-1/2 -translate-y-1/2 hover:scale-125 transition-transform duration-200"
                  style={{
                    left: `${position.x}%`,
                    top: `${position.y}%`,
                  }}
                  onClick={() => setSelectedCity(selectedCity === city.name ? null : city.name)}
                >
                  {/* City marker */}
                  <div
                    className="w-6 h-6 rounded-full border-2 border-white shadow-lg flex items-center justify-center relative"
                    style={{ backgroundColor: color }}
                  >
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                    
                    {/* Pulse animation for high AQI cities */}
                    {city.aqi > 150 && (
                      <div
                        className="absolute inset-0 rounded-full animate-ping"
                        style={{ backgroundColor: color, opacity: 0.4 }}
                      ></div>
                    )}
                  </div>

                  {/* City tooltip */}
                  {selectedCity === city.name && (
                    <div className="absolute top-8 left-1/2 transform -translate-x-1/2 bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm px-3 py-2 rounded-lg shadow-lg min-w-max z-10 border border-gray-200 dark:border-gray-600">
                      <div className="font-semibold text-sm text-gray-900 dark:text-white">
                        {city.name}
                      </div>
                      <div className="text-xs text-gray-600 dark:text-gray-300 mt-1">
                        AQI: {city.aqi} • PM2.5: {city.pm25} μg/m³
                      </div>
                      <div className="flex items-center space-x-2 mt-1">
                        <Badge
                          className="text-xs"
                          style={{
                            backgroundColor: color,
                            color: city.aqi > 150 ? "white" : "black",
                          }}
                        >
                          {getAQILevel(city.aqi)}
                        </Badge>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}

            {/* Legend */}
            <div className="absolute bottom-4 left-4 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-lg p-4 shadow-lg">
              <h4 className="font-semibold mb-2 text-sm text-gray-900 dark:text-white">
                AQI Scale
              </h4>
              <div className="space-y-1 text-xs">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="text-gray-700 dark:text-gray-300">Good (0-50)</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <span className="text-gray-700 dark:text-gray-300">Moderate (51-100)</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                  <span className="text-gray-700 dark:text-gray-300">Unhealthy (101-150)</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <span className="text-gray-700 dark:text-gray-300">Very Unhealthy (151+)</span>
                </div>
              </div>
            </div>

            {/* Live data indicator */}
            <div className="absolute top-4 right-4 bg-green-500 text-white px-3 py-1 rounded-full text-xs font-medium flex items-center space-x-1">
              <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
              <span>Live Data</span>
            </div>

            {/* Wind direction indicator */}
            <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-lg p-2 shadow-lg">
              <div className="text-xs font-medium text-gray-900 dark:text-white mb-1">Wind</div>
              <div className="flex items-center space-x-1">
                <div className="w-6 h-6 border-2 border-blue-500 rounded-full flex items-center justify-center relative">
                  <div className="w-0 h-0 border-l-1 border-r-1 border-b-2 border-l-transparent border-r-transparent border-b-blue-500 transform rotate-45"></div>
                </div>
                <span className="text-xs text-gray-600 dark:text-gray-300">NW 15km/h</span>
              </div>
            </div>
          </div>
        </div>

        {/* City summary stats */}
        <div className="p-4 border-t dark:border-gray-600">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div>
              <div className="text-lg font-bold text-green-600">
                {indianCities.filter(city => city.aqi <= 50).length}
              </div>
              <div className="text-xs text-gray-600 dark:text-gray-400">Good</div>
            </div>
            <div>
              <div className="text-lg font-bold text-yellow-600">
                {indianCities.filter(city => city.aqi > 50 && city.aqi <= 100).length}
              </div>
              <div className="text-xs text-gray-600 dark:text-gray-400">Moderate</div>
            </div>
            <div>
              <div className="text-lg font-bold text-orange-600">
                {indianCities.filter(city => city.aqi > 100 && city.aqi <= 150).length}
              </div>
              <div className="text-xs text-gray-600 dark:text-gray-400">Unhealthy</div>
            </div>
            <div>
              <div className="text-lg font-bold text-red-600">
                {indianCities.filter(city => city.aqi > 150).length}
              </div>
              <div className="text-xs text-gray-600 dark:text-gray-400">Very Unhealthy</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default IndiaAQIMap;
