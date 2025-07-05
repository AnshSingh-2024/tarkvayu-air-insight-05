
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { MapPin, Loader } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface LocationDetectorProps {
  onLocationDetected: (location: { lat: number; lng: number; city: string }) => void;
}

const LocationDetector = ({ onLocationDetected }: LocationDetectorProps) => {
  const [isDetecting, setIsDetecting] = useState(false);
  const { toast } = useToast();

  const detectLocation = () => {
    if (!navigator.geolocation) {
      toast({
        title: "Location Error",
        description: "Geolocation is not supported by this browser.",
        variant: "destructive",
      });
      return;
    }

    setIsDetecting(true);

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        
        try {
          // Mock reverse geocoding - in real app, you'd use a geocoding service
          const mockCityData = getCityFromCoordinates(latitude, longitude);
          
          onLocationDetected({
            lat: latitude,
            lng: longitude,
            city: mockCityData.city
          });

          toast({
            title: "Location Detected",
            description: `Found your location: ${mockCityData.city}`,
          });
        } catch (error) {
          toast({
            title: "Location Error",
            description: "Could not determine your city from coordinates.",
            variant: "destructive",
          });
        } finally {
          setIsDetecting(false);
        }
      },
      (error) => {
        let errorMessage = "Could not detect your location.";
        
        switch (error.code) {
          case error.PERMISSION_DENIED:
            errorMessage = "Location access denied. Please enable location permissions.";
            break;
          case error.POSITION_UNAVAILABLE:
            errorMessage = "Location information is unavailable.";
            break;
          case error.TIMEOUT:
            errorMessage = "Location request timed out.";
            break;
        }

        toast({
          title: "Location Error",
          description: errorMessage,
          variant: "destructive",
        });
        
        setIsDetecting(false);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 60000
      }
    );
  };

  // Mock function to determine city from coordinates
  const getCityFromCoordinates = (lat: number, lng: number) => {
    // This is a simplified mock - in reality you'd use a proper geocoding service
    const cities = [
      { name: "Delhi", city: "Delhi", lat: 28.6139, lng: 77.2090, bounds: { latRange: 1, lngRange: 1 } },
      { name: "Mumbai", city: "Mumbai", lat: 19.0760, lng: 72.8777, bounds: { latRange: 1, lngRange: 1 } },
      { name: "Bangalore", city: "Bangalore", lat: 12.9716, lng: 77.5946, bounds: { latRange: 1, lngRange: 1 } },
      { name: "Chennai", city: "Chennai", lat: 13.0827, lng: 80.2707, bounds: { latRange: 1, lngRange: 1 } },
      { name: "Kolkata", city: "Kolkata", lat: 22.5726, lng: 88.3639, bounds: { latRange: 1, lngRange: 1 } },
    ];

    const nearestCity = cities.find(city => 
      Math.abs(lat - city.lat) < city.bounds.latRange && 
      Math.abs(lng - city.lng) < city.bounds.lngRange
    );

    return nearestCity || { name: "Unknown City", city: "Unknown City", lat, lng };
  };

  return (
    <Button
      onClick={detectLocation}
      disabled={isDetecting}
      variant="outline"
      className="flex items-center space-x-2 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
    >
      {isDetecting ? (
        <Loader className="h-4 w-4 animate-spin" />
      ) : (
        <MapPin className="h-4 w-4" />
      )}
      <span>{isDetecting ? "Detecting..." : "Detect Location"}</span>
    </Button>
  );
};

export default LocationDetector;
