
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Shield, Activity, School, Wind, Home } from "lucide-react";

const HealthAdvisory = () => {
  const advisoryCards = [
    {
      level: "Good",
      aqi: "0-50",
      color: "bg-green-500",
      textColor: "text-green-700 dark:text-green-300",
      bgColor: "bg-green-50 dark:bg-green-900/20",
      borderColor: "border-green-200 dark:border-green-700",
      icon: <Activity className="h-8 w-8 text-green-600 dark:text-green-400" />,
      title: "Great day for outdoor activities!",
      description: "Air quality is excellent. Perfect time for all outdoor activities including sports, jogging, and children's play.",
      recommendations: [
        "Enjoy outdoor exercises and sports",
        "Great time for picnics and outdoor events",
        "Children can play outside safely",
        "Keep windows open for natural ventilation"
      ]
    },
    {
      level: "Moderate",
      aqi: "51-100",
      color: "bg-yellow-500",
      textColor: "text-yellow-700 dark:text-yellow-300",
      bgColor: "bg-yellow-50 dark:bg-yellow-900/20",
      borderColor: "border-yellow-200 dark:border-yellow-700",
      icon: <Activity className="h-8 w-8 text-yellow-600 dark:text-yellow-400" />,
      title: "Generally safe with minor precautions",
      description: "Air quality is acceptable for most people. Unusually sensitive individuals should consider limiting prolonged outdoor exertion.",
      recommendations: [
        "Normal outdoor activities are fine",
        "Sensitive people should limit long outdoor exercises",
        "Monitor children with respiratory conditions",
        "Good ventilation is still beneficial"
      ]
    },
    {
      level: "Unhealthy for Sensitive Groups",
      aqi: "101-150",
      color: "bg-orange-500",
      textColor: "text-orange-700 dark:text-orange-300",
      bgColor: "bg-orange-50 dark:bg-orange-900/20",
      borderColor: "border-orange-200 dark:border-orange-700",
      icon: <Shield className="h-8 w-8 text-orange-600 dark:text-orange-400" />,
      title: "Wear a mask, reduce outdoor activity",
      description: "Sensitive groups may experience health effects. Active children, adults, and people with respiratory disease should limit prolonged outdoor exertion.",
      recommendations: [
        "Wear masks when going outside",
        "Limit prolonged outdoor activities",
        "Reduce intensive outdoor exercises",
        "Close windows during peak pollution hours"
      ]
    },
    {
      level: "Unhealthy",
      aqi: "151-200",
      color: "bg-red-500",
      textColor: "text-red-700 dark:text-red-300",
      bgColor: "bg-red-50 dark:bg-red-900/20",
      borderColor: "border-red-200 dark:border-red-700",
      icon: <School className="h-8 w-8 text-red-600 dark:text-red-400" />,
      title: "Avoid exercise outdoors",
      description: "Everyone may begin to experience health effects. Active children and adults, and people with respiratory disease should avoid prolonged outdoor exertion.",
      recommendations: [
        "Avoid outdoor exercise completely",
        "Wear N95 masks when outside",
        "Keep children indoors",
        "Cancel outdoor school activities"
      ]
    },
    {
      level: "Very Unhealthy",
      aqi: "201-300",
      color: "bg-purple-600",
      textColor: "text-purple-700 dark:text-purple-300",
      bgColor: "bg-purple-50 dark:bg-purple-900/20",
      borderColor: "border-purple-200 dark:border-purple-700",
      icon: <Wind className="h-8 w-8 text-purple-600 dark:text-purple-400" />,
      title: "Use air purifiers, stay indoors",
      description: "Health alert: everyone may experience more serious health effects. Everyone should avoid all outdoor exertion.",
      recommendations: [
        "Stay indoors with air purifiers running",
        "Avoid all outdoor activities",
        "Use N95 or higher grade masks if you must go out",
        "Seal windows and doors"
      ]
    },
    {
      level: "Hazardous",
      aqi: "300+",
      color: "bg-gray-800",
      textColor: "text-gray-100 dark:text-gray-300",
      bgColor: "bg-gray-100 dark:bg-gray-800/50",
      borderColor: "border-gray-400 dark:border-gray-600",
      icon: <Home className="h-8 w-8 text-gray-800 dark:text-gray-300" />,
      title: "Emergency conditions - stay indoors",
      description: "Health warning of emergency conditions. The entire population is more likely to be affected by serious health effects.",
      recommendations: [
        "Stay indoors at all times",
        "Use professional-grade air purifiers",
        "Seal all windows and doors completely",
        "Seek medical attention for any symptoms"
      ]
    }
  ];

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          Health Advisory Cards
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          Quick health recommendations based on different AQI levels
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {advisoryCards.map((card, index) => (
          <Card 
            key={index} 
            className={`hover:shadow-lg transition-all duration-300 hover:scale-105 border-l-4 ${card.borderColor} dark:bg-gray-800/50`}
          >
            <CardHeader className={`${card.bgColor} rounded-t-lg`}>
              <div className="flex items-center justify-between mb-2">
                <Badge className={`${card.textColor} ${card.bgColor} ${card.borderColor}`}>
                  AQI {card.aqi}
                </Badge>
                <div className="p-2 bg-white/80 dark:bg-gray-800/80 rounded-full">
                  {card.icon}
                </div>
              </div>
              <CardTitle className="text-lg text-gray-900 dark:text-white">
                {card.level}
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                {card.title}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                {card.description}
              </p>
              
              <div className="space-y-2">
                <h4 className="font-medium text-gray-900 dark:text-white text-sm">
                  Key Recommendations:
                </h4>
                <ul className="space-y-1">
                  {card.recommendations.map((rec, idx) => (
                    <li key={idx} className="flex items-start space-x-2 text-xs text-gray-700 dark:text-gray-300">
                      <div className="w-1 h-1 bg-gray-400 dark:bg-gray-500 rounded-full mt-1.5 flex-shrink-0"></div>
                      <span>{rec}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Action Guide */}
      <Card className="mt-8 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 dark:bg-gray-800/50">
        <CardHeader>
          <CardTitle className="text-center text-gray-900 dark:text-white">Quick Action Guide</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-center">
            <div className="flex flex-col items-center space-y-2">
              <div className="p-3 bg-orange-100 dark:bg-orange-900/20 rounded-full">
                <Shield className="h-6 w-6 text-orange-600 dark:text-orange-400" />
              </div>
              <span className="text-sm font-medium text-gray-900 dark:text-white">Wear Mask</span>
              <span className="text-xs text-gray-500 dark:text-gray-400">AQI &gt; 100</span>
            </div>
            
            <div className="flex flex-col items-center space-y-2">
              <div className="p-3 bg-red-100 dark:bg-red-900/20 rounded-full">
                <Activity className="h-6 w-6 text-red-600 dark:text-red-400" />
              </div>
              <span className="text-sm font-medium text-gray-900 dark:text-white">Avoid Exercise</span>
              <span className="text-xs text-gray-500 dark:text-gray-400">AQI &gt; 150</span>
            </div>
            
            <div className="flex flex-col items-center space-y-2">
              <div className="p-3 bg-blue-100 dark:bg-blue-900/20 rounded-full">
                <School className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
              <span className="text-sm font-medium text-gray-900 dark:text-white">Keep Kids Indoor</span>
              <span className="text-xs text-gray-500 dark:text-gray-400">AQI &gt; 150</span>
            </div>
            
            <div className="flex flex-col items-center space-y-2">
              <div className="p-3 bg-purple-100 dark:bg-purple-900/20 rounded-full">
                <Wind className="h-6 w-6 text-purple-600 dark:text-purple-400" />
              </div>
              <span className="text-sm font-medium text-gray-900 dark:text-white">Use Purifier</span>
              <span className="text-xs text-gray-500 dark:text-gray-400">AQI &gt; 200</span>
            </div>
            
            <div className="flex flex-col items-center space-y-2">
              <div className="p-3 bg-gray-100 dark:bg-gray-800 rounded-full">
                <Home className="h-6 w-6 text-gray-600 dark:text-gray-300" />
              </div>
              <span className="text-sm font-medium text-gray-900 dark:text-white">Close Windows</span>
              <span className="text-xs text-gray-500 dark:text-gray-400">AQI &gt; 100</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default HealthAdvisory;
