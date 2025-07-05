
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import ForecastChart from "../components/ForecastChart";
import { Cloud, TrendingUp, AlertTriangle, Calendar, MapPin, Brain } from "lucide-react";
import { getCityNames } from "../data/extendedCities";
import { useLanguage } from "@/contexts/LanguageContext";

const Forecast = () => {
  const { t } = useLanguage();
  const [selectedCity, setSelectedCity] = useState("Delhi");
  const [forecastPeriod, setForecastPeriod] = useState("24hours");
  const [selectedPollutant, setSelectedPollutant] = useState("PM2.5");
  const [chartType, setChartType] = useState<"line" | "bar">("line");

  const cities = getCityNames();

  const pollutants = [
    { value: "PM2.5", label: "PM2.5", color: "#ef4444" },
    { value: "PM10", label: "PM10", color: "#f97316" },
    { value: "NO2", label: "NO₂", color: "#eab308" },
    { value: "SO2", label: "SO₂", color: "#22c55e" },
    { value: "O3", label: "O₃", color: "#3b82f6" }
  ];

  const forecastPeriods = [
    { value: "24hours", label: "24 Hours", hours: 24 },
    { value: "48hours", label: "48 Hours", hours: 48 },
    { value: "72hours", label: "72 Hours", hours: 72 }
  ];

  // Generate mock forecast data
  const generateForecastData = () => {
    const hours = forecastPeriods.find(p => p.value === forecastPeriod)?.hours || 24;
    const data = [];
    
    for (let i = 0; i <= hours; i += 3) {
      const date = new Date();
      date.setHours(date.getHours() + i);
      
      const baseValue = selectedPollutant === "PM2.5" ? 85 : 
                       selectedPollutant === "PM10" ? 125 : 
                       selectedPollutant === "NO2" ? 45 : 
                       selectedPollutant === "SO2" ? 18 : 65;
      
      const hourlyVariation = Math.sin((date.getHours() / 24) * 2 * Math.PI) * 0.2;
      const randomVariation = (Math.random() - 0.5) * 0.3;
      const trendFactor = 1 + (i / hours) * 0.1; // Slight upward trend
      
      data.push({
        date: date.toISOString(),
        value: Math.max(0, Math.round(baseValue * (1 + hourlyVariation + randomVariation) * trendFactor)),
        time: date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      });
    }
    
    return data;
  };

  const forecastData = generateForecastData();

  const getAQIStatus = (value: number) => {
    if (value <= 50) return { status: "Good", color: "text-green-700 bg-green-50 border-green-200 dark:text-green-400 dark:bg-green-900/20 dark:border-green-800" };
    if (value <= 100) return { status: "Moderate", color: "text-yellow-700 bg-yellow-50 border-yellow-200 dark:text-yellow-400 dark:bg-yellow-900/20 dark:border-yellow-800" };
    if (value <= 150) return { status: "Unhealthy for Sensitive", color: "text-orange-700 bg-orange-50 border-orange-200 dark:text-orange-400 dark:bg-orange-900/20 dark:border-orange-800" };
    if (value <= 200) return { status: "Unhealthy", color: "text-red-700 bg-red-50 border-red-200 dark:text-red-400 dark:bg-red-900/20 dark:border-red-800" };
    if (value <= 300) return { status: "Very Unhealthy", color: "text-purple-700 bg-purple-50 border-purple-200 dark:text-purple-400 dark:bg-purple-900/20 dark:border-purple-800" };
    return { status: "Hazardous", color: "text-gray-100 bg-gray-800 border-gray-600 dark:text-gray-300 dark:bg-gray-900 dark:border-gray-600" };
  };

  const getCurrentForecast = () => {
    return forecastData[0] || { value: 0 };
  };

  const getPeakForecast = () => {
    return Math.max(...forecastData.map(d => d.value));
  };

  const getHealthRecommendation = (value: number) => {
    if (value <= 50) return "Great day for outdoor activities!";
    if (value <= 100) return "Moderate air quality. Sensitive people should limit prolonged outdoor exertion.";
    if (value <= 150) return "Unhealthy for sensitive groups. Consider reducing outdoor activities.";
    if (value <= 200) return "Unhealthy air quality. Everyone should limit outdoor exertion.";
    if (value <= 300) return "Very unhealthy. Avoid outdoor activities, especially for sensitive groups.";
    return "Hazardous conditions. Stay indoors and use air purifiers.";
  };

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            AQI Forecast & Predictions
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            AI-powered air quality forecasts to help you plan your activities
          </p>
        </div>

        {/* Controls */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">City</label>
            <Select value={selectedCity} onValueChange={setSelectedCity}>
              <SelectTrigger className="dark:bg-gray-800 dark:border-gray-700 dark:text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="dark:bg-gray-800 dark:border-gray-700 max-h-60">
                {cities.map((city) => (
                  <SelectItem key={city} value={city} className="dark:text-white dark:hover:bg-gray-700">
                    <div className="flex items-center space-x-2">
                      <MapPin className="h-4 w-4" />
                      <span>{city}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Forecast Period</label>
            <Select value={forecastPeriod} onValueChange={setForecastPeriod}>
              <SelectTrigger className="dark:bg-gray-800 dark:border-gray-700 dark:text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="dark:bg-gray-800 dark:border-gray-700">
                {forecastPeriods.map((period) => (
                  <SelectItem key={period.value} value={period.value} className="dark:text-white dark:hover:bg-gray-700">
                    <div className="flex items-center space-x-2">
                      <Calendar className="h-4 w-4" />
                      <span>{period.label}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Pollutant</label>
            <Select value={selectedPollutant} onValueChange={setSelectedPollutant}>
              <SelectTrigger className="dark:bg-gray-800 dark:border-gray-700 dark:text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="dark:bg-gray-800 dark:border-gray-700">
                {pollutants.map((pollutant) => (
                  <SelectItem key={pollutant.value} value={pollutant.value} className="dark:text-white dark:hover:bg-gray-700">
                    <div className="flex items-center space-x-2">
                      <div 
                        className="w-3 h-3 rounded-full" 
                        style={{ backgroundColor: pollutant.color }}
                      ></div>
                      <span>{pollutant.label}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Chart Type</label>
            <div className="flex bg-gray-100 dark:bg-gray-800 rounded-lg p-1">
              <Button
                variant={chartType === "line" ? "default" : "ghost"}
                size="sm"
                onClick={() => setChartType("line")}
                className="flex-1"
              >
                Line
              </Button>
              <Button
                variant={chartType === "bar" ? "default" : "ghost"}
                size="sm"
                onClick={() => setChartType("bar")}
                className="flex-1"
              >
                Bar
              </Button>
            </div>
          </div>
        </div>

        {/* Current Forecast Summary */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 dark:bg-gray-800 dark:border-gray-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Current Forecast</p>
                  <p className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                    {getCurrentForecast().value}
                  </p>
                  <Badge className={getAQIStatus(getCurrentForecast().value).color}>
                    {getAQIStatus(getCurrentForecast().value).status}
                  </Badge>
                </div>
                <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-full">
                  <Cloud className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 dark:bg-gray-800 dark:border-gray-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Peak Forecast</p>
                  <p className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                    {getPeakForecast()}
                  </p>
                  <Badge className={getAQIStatus(getPeakForecast()).color}>
                    {getAQIStatus(getPeakForecast()).status}
                  </Badge>
                </div>
                <div className="p-3 bg-orange-100 dark:bg-orange-900 rounded-full">
                  <TrendingUp className="h-8 w-8 text-orange-600 dark:text-orange-400" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 dark:bg-gray-800 dark:border-gray-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">AI Confidence</p>
                  <p className="text-3xl font-bold text-gray-900 dark:text-white mb-2">87%</p>
                  <Badge className="text-purple-700 bg-purple-50 border-purple-200 dark:text-purple-400 dark:bg-purple-900/20 dark:border-purple-800">
                    High Accuracy
                  </Badge>
                </div>
                <div className="p-3 bg-purple-100 dark:bg-purple-900 rounded-full">
                  <Brain className="h-8 w-8 text-purple-600 dark:text-purple-400" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Health Advisory */}
        <Card className="mb-8 border-l-4 border-l-blue-500 dark:bg-gray-800 dark:border-gray-700">
          <CardContent className="p-6">
            <div className="flex items-start space-x-4">
              <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-full">
                <AlertTriangle className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  Health Recommendation
                </h3>
                <p className="text-gray-700 dark:text-gray-300">
                  {getHealthRecommendation(getCurrentForecast().value)}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Forecast Chart */}
        <Card className="dark:bg-gray-800 dark:border-gray-700">
          <CardHeader>
            <CardTitle className="flex items-center justify-between dark:text-white">
              <span>{selectedPollutant} Forecast - {selectedCity}</span>
              <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
                <Calendar className="h-4 w-4" />
                <span>{forecastPeriods.find(p => p.value === forecastPeriod)?.label}</span>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ForecastChart 
              data={forecastData} 
              type={chartType}
              pollutant={selectedPollutant}
            />
          </CardContent>
        </Card>

        {/* Weather Factors */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          <Card className="dark:bg-gray-800 dark:border-gray-700">
            <CardHeader>
              <CardTitle className="dark:text-white">Weather Factors</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 dark:text-gray-400">Wind Speed</span>
                  <span className="font-medium dark:text-white">12 km/h NW</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 dark:text-gray-400">Temperature</span>
                  <span className="font-medium dark:text-white">28°C</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 dark:text-gray-400">Humidity</span>
                  <span className="font-medium dark:text-white">65%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 dark:text-gray-400">Pressure</span>
                  <span className="font-medium dark:text-white">1013 hPa</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="dark:bg-gray-800 dark:border-gray-700">
            <CardHeader>
              <CardTitle className="dark:text-white">AI Model Integration</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-gradient-to-br from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 rounded-lg p-6 text-center">
                <div className="w-12 h-12 bg-purple-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <Brain className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  Advanced AI Forecasting
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Our models use satellite data, weather patterns, and historical trends to provide accurate 72-hour forecasts.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Forecast;
