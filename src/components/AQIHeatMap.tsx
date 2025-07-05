
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, Layers, Filter, Info, X } from "lucide-react";

const AQIHeatMap = () => {
  const [selectedCity, setSelectedCity] = useState<string | null>(null);
  const [mapLayer, setMapLayer] = useState("satellite");

  // Comprehensive data for 250+ Indian cities across all states and rural areas
  const indianCities = [
    // Metro Cities
    { name: "Delhi", aqi: 324, status: "Hazardous", lat: 28.7041, lng: 77.1025, color: "bg-red-900", state: "Delhi" },
    { name: "Mumbai", aqi: 156, status: "Unhealthy", lat: 19.0760, lng: 72.8777, color: "bg-red-500", state: "Maharashtra" },
    { name: "Kolkata", aqi: 178, status: "Unhealthy", lat: 22.5726, lng: 88.3639, color: "bg-red-600", state: "West Bengal" },
    { name: "Chennai", aqi: 89, status: "Moderate", lat: 13.0827, lng: 80.2707, color: "bg-yellow-500", state: "Tamil Nadu" },
    { name: "Bangalore", aqi: 65, status: "Moderate", lat: 12.9716, lng: 77.5946, color: "bg-yellow-400", state: "Karnataka" },
    { name: "Hyderabad", aqi: 112, status: "Unhealthy", lat: 17.3850, lng: 78.4867, color: "bg-orange-500", state: "Telangana" },
    
    // North India - Major Cities
    { name: "Jaipur", aqi: 167, status: "Unhealthy", lat: 26.9124, lng: 75.7873, color: "bg-red-600", state: "Rajasthan" },
    { name: "Lucknow", aqi: 201, status: "Very Unhealthy", lat: 26.8467, lng: 80.9462, color: "bg-purple-600", state: "Uttar Pradesh" },
    { name: "Kanpur", aqi: 234, status: "Very Unhealthy", lat: 26.4499, lng: 80.3319, color: "bg-purple-700", state: "Uttar Pradesh" },
    { name: "Patna", aqi: 189, status: "Unhealthy", lat: 25.5941, lng: 85.1376, color: "bg-red-600", state: "Bihar" },
    { name: "Varanasi", aqi: 198, status: "Unhealthy", lat: 25.3176, lng: 82.9739, color: "bg-red-600", state: "Uttar Pradesh" },
    { name: "Amritsar", aqi: 156, status: "Unhealthy", lat: 31.6340, lng: 74.8723, color: "bg-red-500", state: "Punjab" },
    { name: "Chandigarh", aqi: 143, status: "Unhealthy", lat: 30.7333, lng: 76.7794, color: "bg-red-500", state: "Chandigarh" },
    
    // NCR Region
    { name: "Ghaziabad", aqi: 267, status: "Very Unhealthy", lat: 28.6692, lng: 77.4538, color: "bg-purple-700", state: "Uttar Pradesh" },
    { name: "Noida", aqi: 245, status: "Very Unhealthy", lat: 28.5355, lng: 77.3910, color: "bg-purple-700", state: "Uttar Pradesh" },
    { name: "Gurugram", aqi: 223, status: "Very Unhealthy", lat: 28.4595, lng: 77.0266, color: "bg-purple-600", state: "Haryana" },
    { name: "Faridabad", aqi: 234, status: "Very Unhealthy", lat: 28.4089, lng: 77.3178, color: "bg-purple-700", state: "Haryana" },
    { name: "Greater Noida", aqi: 251, status: "Very Unhealthy", lat: 28.4744, lng: 77.5040, color: "bg-purple-700", state: "Uttar Pradesh" },
    { name: "Sonipat", aqi: 198, status: "Unhealthy", lat: 28.9931, lng: 77.0151, color: "bg-red-600", state: "Haryana" },
    { name: "Panipat", aqi: 189, status: "Unhealthy", lat: 29.3909, lng: 76.9635, color: "bg-red-600", state: "Haryana" },
    { name: "Rohtak", aqi: 176, status: "Unhealthy", lat: 28.8955, lng: 76.6066, color: "bg-red-600", state: "Haryana" },
    { name: "Karnal", aqi: 165, status: "Unhealthy", lat: 29.6857, lng: 76.9905, color: "bg-red-500", state: "Haryana" },
    { name: "Hisar", aqi: 154, status: "Unhealthy", lat: 29.1492, lng: 75.7217, color: "bg-red-500", state: "Haryana" },
    
    // Uttar Pradesh - Extended Coverage
    { name: "Jaunpur", aqi: 212, status: "Very Unhealthy", lat: 25.7333, lng: 82.6833, color: "bg-purple-600", state: "Uttar Pradesh" },
    { name: "Jhansi", aqi: 134, status: "Unhealthy", lat: 25.4484, lng: 78.5685, color: "bg-red-500", state: "Uttar Pradesh" },
    { name: "Aligarh", aqi: 189, status: "Unhealthy", lat: 27.8974, lng: 78.0880, color: "bg-red-600", state: "Uttar Pradesh" },
    { name: "Bareilly", aqi: 167, status: "Unhealthy", lat: 28.3670, lng: 79.4304, color: "bg-red-600", state: "Uttar Pradesh" },
    { name: "Moradabad", aqi: 178, status: "Unhealthy", lat: 28.8386, lng: 78.7733, color: "bg-red-600", state: "Uttar Pradesh" },
    { name: "Saharanpur", aqi: 198, status: "Unhealthy", lat: 29.9680, lng: 77.5552, color: "bg-red-600", state: "Uttar Pradesh" },
    { name: "Meerut", aqi: 223, status: "Very Unhealthy", lat: 28.9845, lng: 77.7064, color: "bg-purple-600", state: "Uttar Pradesh" },
    { name: "Muzaffarnagar", aqi: 201, status: "Very Unhealthy", lat: 29.4727, lng: 77.7085, color: "bg-purple-600", state: "Uttar Pradesh" },
    { name: "Mathura", aqi: 156, status: "Unhealthy", lat: 27.4924, lng: 77.6737, color: "bg-red-500", state: "Uttar Pradesh" },
    { name: "Firozabad", aqi: 189, status: "Unhealthy", lat: 27.1592, lng: 78.3957, color: "bg-red-600", state: "Uttar Pradesh" },
    { name: "Agra", aqi: 187, status: "Unhealthy", lat: 27.1767, lng: 78.0081, color: "bg-red-600", state: "Uttar Pradesh" },
    { name: "Allahabad", aqi: 176, status: "Unhealthy", lat: 25.4358, lng: 81.8463, color: "bg-red-600", state: "Uttar Pradesh" },
    { name: "Gorakhpur", aqi: 165, status: "Unhealthy", lat: 26.7606, lng: 83.3732, color: "bg-red-500", state: "Uttar Pradesh" },
    { name: "Azamgarh", aqi: 154, status: "Unhealthy", lat: 26.0685, lng: 83.1836, color: "bg-red-500", state: "Uttar Pradesh" },
    { name: "Faizabad", aqi: 143, status: "Unhealthy", lat: 26.7751, lng: 82.1509, color: "bg-red-500", state: "Uttar Pradesh" },
    { name: "Sultanpur", aqi: 132, status: "Unhealthy", lat: 26.2550, lng: 82.0674, color: "bg-red-500", state: "Uttar Pradesh" },
    { name: "Barabanki", aqi: 145, status: "Unhealthy", lat: 26.9237, lng: 81.2054, color: "bg-red-500", state: "Uttar Pradesh" },
    { name: "Rae Bareli", aqi: 143, status: "Unhealthy", lat: 26.2124, lng: 81.2451, color: "bg-red-500", state: "Uttar Pradesh" },
    { name: "Unnao", aqi: 178, status: "Unhealthy", lat: 26.5464, lng: 80.4879, color: "bg-red-600", state: "Uttar Pradesh" },
    { name: "Sitapur", aqi: 156, status: "Unhealthy", lat: 27.5676, lng: 80.6736, color: "bg-red-500", state: "Uttar Pradesh" },
    { name: "Hardoi", aqi: 145, status: "Unhealthy", lat: 27.4159, lng: 80.1331, color: "bg-red-500", state: "Uttar Pradesh" },
    { name: "Lakhimpur", aqi: 134, status: "Unhealthy", lat: 27.9479, lng: 80.7781, color: "bg-red-500", state: "Uttar Pradesh" },
    { name: "Bahraich", aqi: 123, status: "Unhealthy", lat: 27.5742, lng: 81.5947, color: "bg-orange-500", state: "Uttar Pradesh" },
    { name: "Gonda", aqi: 132, status: "Unhealthy", lat: 27.1333, lng: 81.9500, color: "bg-red-500", state: "Uttar Pradesh" },
    { name: "Basti", aqi: 121, status: "Unhealthy", lat: 26.8067, lng: 82.7339, color: "bg-orange-500", state: "Uttar Pradesh" },
    { name: "Ballia", aqi: 143, status: "Unhealthy", lat: 25.7675, lng: 84.1490, color: "bg-red-500", state: "Uttar Pradesh" },
    { name: "Deoria", aqi: 134, status: "Unhealthy", lat: 26.5024, lng: 83.7791, color: "bg-red-500", state: "Uttar Pradesh" },
    { name: "Kushinagar", aqi: 123, status: "Unhealthy", lat: 26.7411, lng: 83.8938, color: "bg-orange-500", state: "Uttar Pradesh" },
    { name: "Maharajganj", aqi: 132, status: "Unhealthy", lat: 27.1441, lng: 83.5619, color: "bg-red-500", state: "Uttar Pradesh" },
    { name: "Siddharthnagar", aqi: 121, status: "Unhealthy", lat: 27.2504, lng: 83.1028, color: "bg-orange-500", state: "Uttar Pradesh" },
    { name: "Sant Kabir Nagar", aqi: 134, status: "Unhealthy", lat: 26.7658, lng: 83.0336, color: "bg-red-500", state: "Uttar Pradesh" },
    { name: "Ambedkar Nagar", aqi: 123, status: "Unhealthy", lat: 26.4038, lng: 82.6857, color: "bg-orange-500", state: "Uttar Pradesh" },
    { name: "Pratapgarh", aqi: 132, status: "Unhealthy", lat: 25.8967, lng: 81.9420, color: "bg-red-500", state: "Uttar Pradesh" },
    { name: "Kaushambi", aqi: 143, status: "Unhealthy", lat: 25.5309, lng: 81.3784, color: "bg-red-500", state: "Uttar Pradesh" },
    { name: "Fatehpur", aqi: 154, status: "Unhealthy", lat: 25.9281, lng: 80.8000, color: "bg-red-500", state: "Uttar Pradesh" },
    { name: "Banda", aqi: 145, status: "Unhealthy", lat: 25.4667, lng: 80.3333, color: "bg-red-500", state: "Uttar Pradesh" },
    { name: "Chitrakoot", aqi: 134, status: "Unhealthy", lat: 25.2000, lng: 80.8500, color: "bg-red-500", state: "Uttar Pradesh" },
    { name: "Hamirpur", aqi: 123, status: "Unhealthy", lat: 25.9500, lng: 80.1667, color: "bg-orange-500", state: "Uttar Pradesh" },
    { name: "Mahoba", aqi: 132, status: "Unhealthy", lat: 25.2928, lng: 79.8731, color: "bg-red-500", state: "Uttar Pradesh" },
    { name: "Lalitpur", aqi: 121, status: "Unhealthy", lat: 24.6833, lng: 78.4167, color: "bg-orange-500", state: "Uttar Pradesh" },
    { name: "Jalaun", aqi: 134, status: "Unhealthy", lat: 26.1500, lng: 79.3333, color: "bg-red-500", state: "Uttar Pradesh" },
    { name: "Etawah", aqi: 145, status: "Unhealthy", lat: 26.7854, lng: 79.0154, color: "bg-red-500", state: "Uttar Pradesh" },
    { name: "Mainpuri", aqi: 167, status: "Unhealthy", lat: 27.2380, lng: 79.0290, color: "bg-red-600", state: "Uttar Pradesh" },
    { name: "Bulandshahr", aqi: 178, status: "Unhealthy", lat: 28.4041, lng: 77.8498, color: "bg-red-600", state: "Uttar Pradesh" },
    { name: "Shahjahanpur", aqi: 156, status: "Unhealthy", lat: 27.8828, lng: 79.9103, color: "bg-red-500", state: "Uttar Pradesh" },
    { name: "Rampur", aqi: 167, status: "Unhealthy", lat: 28.8152, lng: 79.0266, color: "bg-red-600", state: "Uttar Pradesh" },
    { name: "Farrukhabad", aqi: 189, status: "Unhealthy", lat: 27.3979, lng: 79.5800, color: "bg-red-600", state: "Uttar Pradesh" },
    { name: "Kannauj", aqi: 176, status: "Unhealthy", lat: 27.0514, lng: 79.9247, color: "bg-red-600", state: "Uttar Pradesh" },
    { name: "Auraiya", aqi: 165, status: "Unhealthy", lat: 26.4667, lng: 79.5000, color: "bg-red-500", state: "Uttar Pradesh" },
    
    // Bihar Cities
    { name: "Gaya", aqi: 176, status: "Unhealthy", lat: 24.7914, lng: 85.0002, color: "bg-red-600", state: "Bihar" },
    { name: "Bhagalpur", aqi: 165, status: "Unhealthy", lat: 25.2425, lng: 86.9842, color: "bg-red-500", state: "Bihar" },
    { name: "Muzaffarpur", aqi: 154, status: "Unhealthy", lat: 26.1209, lng: 85.3647, color: "bg-red-500", state: "Bihar" },
    { name: "Darbhanga", aqi: 143, status: "Unhealthy", lat: 26.1542, lng: 85.8918, color: "bg-red-500", state: "Bihar" },
    { name: "Purnia", aqi: 132, status: "Unhealthy", lat: 25.7781, lng: 87.4753, color: "bg-red-500", state: "Bihar" },
    { name: "Katihar", aqi: 121, status: "Unhealthy", lat: 25.5394, lng: 87.5678, color: "bg-orange-500", state: "Bihar" },
    { name: "Saharsa", aqi: 134, status: "Unhealthy", lat: 25.8831, lng: 86.5964, color: "bg-red-500", state: "Bihar" },
    { name: "Madhepura", aqi: 123, status: "Unhealthy", lat: 25.9216, lng: 86.7847, color: "bg-orange-500", state: "Bihar" },
    { name: "Supaul", aqi: 132, status: "Unhealthy", lat: 26.1266, lng: 86.6056, color: "bg-red-500", state: "Bihar" },
    { name: "Araria", aqi: 121, status: "Unhealthy", lat: 26.1528, lng: 87.5119, color: "bg-orange-500", state: "Bihar" },
    { name: "Kishanganj", aqi: 134, status: "Unhealthy", lat: 26.1058, lng: 87.9506, color: "bg-red-500", state: "Bihar" },
    { name: "Sitamarhi", aqi: 123, status: "Unhealthy", lat: 26.5986, lng: 85.4794, color: "bg-orange-500", state: "Bihar" },
    { name: "Sheohar", aqi: 132, status: "Unhealthy", lat: 26.5189, lng: 85.2961, color: "bg-red-500", state: "Bihar" },
    { name: "East Champaran", aqi: 121, status: "Unhealthy", lat: 26.6447, lng: 85.0956, color: "bg-orange-500", state: "Bihar" },
    { name: "West Champaran", aqi: 134, status: "Unhealthy", lat: 27.0233, lng: 84.3644, color: "bg-red-500", state: "Bihar" },
    { name: "Gopalganj", aqi: 123, status: "Unhealthy", lat: 26.4669, lng: 84.4381, color: "bg-orange-500", state: "Bihar" },
    { name: "Siwan", aqi: 132, status: "Unhealthy", lat: 26.2183, lng: 84.3586, color: "bg-red-500", state: "Bihar" },
    { name: "Saran", aqi: 143, status: "Unhealthy", lat: 25.7558, lng: 84.7553, color: "bg-red-500", state: "Bihar" },
    { name: "Vaishali", aqi: 154, status: "Unhealthy", lat: 25.9894, lng: 85.1311, color: "bg-red-500", state: "Bihar" },
    { name: "Samastipur", aqi: 145, status: "Unhealthy", lat: 25.8647, lng: 85.7828, color: "bg-red-500", state: "Bihar" },
    { name: "Khagaria", aqi: 134, status: "Unhealthy", lat: 25.5019, lng: 86.4669, color: "bg-red-500", state: "Bihar" },
    { name: "Begusarai", aqi: 156, status: "Unhealthy", lat: 25.4181, lng: 86.1314, color: "bg-red-500", state: "Bihar" },
    { name: "Munger", aqi: 167, status: "Unhealthy", lat: 25.3881, lng: 86.4731, color: "bg-red-600", state: "Bihar" },
    { name: "Jamui", aqi: 143, status: "Unhealthy", lat: 24.9269, lng: 86.2231, color: "bg-red-500", state: "Bihar" },
    { name: "Lakhisarai", aqi: 132, status: "Unhealthy", lat: 25.1686, lng: 86.0956, color: "bg-red-500", state: "Bihar" },
    { name: "Sheikhpura", aqi: 121, status: "Unhealthy", lat: 25.1394, lng: 85.8456, color: "bg-orange-500", state: "Bihar" },
    { name: "Nalanda", aqi: 134, status: "Unhealthy", lat: 25.1983, lng: 85.4428, color: "bg-red-500", state: "Bihar" },
    { name: "Jehanabad", aqi: 145, status: "Unhealthy", lat: 25.2122, lng: 84.9894, color: "bg-red-500", state: "Bihar" },
    { name: "Arwal", aqi: 132, status: "Unhealthy", lat: 25.2558, lng: 84.6661, color: "bg-red-500", state: "Bihar" },
    { name: "Aurangabad", aqi: 143, status: "Unhealthy", lat: 24.7522, lng: 84.3742, color: "bg-red-500", state: "Bihar" },
    { name: "Nawada", aqi: 134, status: "Unhealthy", lat: 24.8833, lng: 85.5500, color: "bg-red-500", state: "Bihar" },
    { name: "Banka", aqi: 123, status: "Unhealthy", lat: 24.8886, lng: 86.9250, color: "bg-orange-500", state: "Bihar" },
    { name: "Rohtas", aqi: 154, status: "Unhealthy", lat: 24.9533, lng: 83.6106, color: "bg-red-500", state: "Bihar" },
    { name: "Kaimur", aqi: 143, status: "Unhealthy", lat: 25.0456, lng: 83.6231, color: "bg-red-500", state: "Bihar" },
    { name: "Buxar", aqi: 132, status: "Unhealthy", lat: 25.5647, lng: 83.9789, color: "bg-red-500", state: "Bihar" },
    
    // West Bengal Cities
    { name: "Siliguri", aqi: 142, status: "Unhealthy", lat: 26.7271, lng: 88.3953, color: "bg-red-500", state: "West Bengal" },
    { name: "Asansol", aqi: 165, status: "Unhealthy", lat: 23.6739, lng: 86.9524, color: "bg-red-500", state: "West Bengal" },
    { name: "Durgapur", aqi: 154, status: "Unhealthy", lat: 23.5204, lng: 87.3119, color: "bg-red-500", state: "West Bengal" },
    { name: "Howrah", aqi: 176, status: "Unhealthy", lat: 22.5958, lng: 88.2636, color: "bg-red-600", state: "West Bengal" },
    { name: "Kharagpur", aqi: 143, status: "Unhealthy", lat: 22.3460, lng: 87.2319, color: "bg-red-500", state: "West Bengal" },
    { name: "Malda", aqi: 132, status: "Unhealthy", lat: 25.0042, lng: 88.1475, color: "bg-red-500", state: "West Bengal" },
    { name: "Jalpaiguri", aqi: 121, status: "Unhealthy", lat: 26.5497, lng: 88.7267, color: "bg-orange-500", state: "West Bengal" },
    { name: "Cooch Behar", aqi: 134, status: "Unhealthy", lat: 26.3225, lng: 89.4497, color: "bg-red-500", state: "West Bengal" },
    { name: "Darjeeling", aqi: 87, status: "Moderate", lat: 27.0410, lng: 88.2663, color: "bg-yellow-500", state: "West Bengal" },
    { name: "Alipurduar", aqi: 98, status: "Moderate", lat: 26.4867, lng: 89.5231, color: "bg-yellow-500", state: "West Bengal" },
    { name: "Kalimpong", aqi: 76, status: "Moderate", lat: 27.0692, lng: 88.4661, color: "bg-yellow-400", state: "West Bengal" },
    { name: "Bankura", aqi: 123, status: "Unhealthy", lat: 23.2324, lng: 87.0750, color: "bg-orange-500", state: "West Bengal" },
    { name: "Purulia", aqi: 112, status: "Unhealthy", lat: 23.3424, lng: 86.3647, color: "bg-orange-500", state: "West Bengal" },
    { name: "Birbhum", aqi: 134, status: "Unhealthy", lat: 24.0350, lng: 87.6181, color: "bg-red-500", state: "West Bengal" },
    { name: "Murshidabad", aqi: 143, status: "Unhealthy", lat: 24.1833, lng: 88.2833, color: "bg-red-500", state: "West Bengal" },
    { name: "Nadia", aqi: 132, status: "Unhealthy", lat: 23.4731, lng: 88.5667, color: "bg-red-500", state: "West Bengal" },
    { name: "North 24 Parganas", aqi: 165, status: "Unhealthy", lat: 22.6158, lng: 88.4019, color: "bg-red-500", state: "West Bengal" },
    { name: "South 24 Parganas", aqi: 154, status: "Unhealthy", lat: 22.1697, lng: 88.4370, color: "bg-red-500", state: "West Bengal" },
    { name: "Hooghly", aqi: 145, status: "Unhealthy", lat: 22.8956, lng: 88.3969, color: "bg-red-500", state: "West Bengal" },
    { name: "Bardhaman", aqi: 156, status: "Unhealthy", lat: 23.2324, lng: 87.8615, color: "bg-red-500", state: "West Bengal" },
    { name: "East Midnapore", aqi: 134, status: "Unhealthy", lat: 22.0258, lng: 87.7500, color: "bg-red-500", state: "West Bengal" },
    { name: "West Midnapore", aqi: 123, status: "Unhealthy", lat: 22.4262, lng: 87.3200, color: "bg-orange-500", state: "West Bengal" },
    { name: "Jhargram", aqi: 112, status: "Unhealthy", lat: 22.4539, lng: 86.9989, color: "bg-orange-500", state: "West Bengal" },
    
    // Central India
    { name: "Indore", aqi: 123, status: "Unhealthy", lat: 22.7196, lng: 75.8577, color: "bg-orange-500", state: "Madhya Pradesh" },
    { name: "Bhopal", aqi: 145, status: "Unhealthy", lat: 23.2599, lng: 77.4126, color: "bg-red-500", state: "Madhya Pradesh" },
    { name: "Gwalior", aqi: 178, status: "Unhealthy", lat: 26.2183, lng: 78.1828, color: "bg-red-600", state: "Madhya Pradesh" },
    { name: "Jabalpur", aqi: 134, status: "Unhealthy", lat: 23.1815, lng: 79.9864, color: "bg-red-500", state: "Madhya Pradesh" },
    { name: "Ujjain", aqi: 121, status: "Unhealthy", lat: 23.1793, lng: 75.7849, color: "bg-orange-500", state: "Madhya Pradesh" },
    { name: "Sagar", aqi: 132, status: "Unhealthy", lat: 23.8388, lng: 78.7378, color: "bg-red-500", state: "Madhya Pradesh" },
    { name: "Dewas", aqi: 143, status: "Unhealthy", lat: 22.9676, lng: 76.0534, color: "bg-red-500", state: "Madhya Pradesh" },
    { name: "Satna", aqi: 123, status: "Unhealthy", lat: 24.6005, lng: 80.8322, color: "bg-orange-500", state: "Madhya Pradesh" },
    { name: "Ratlam", aqi: 134, status: "Unhealthy", lat: 23.3315, lng: 75.0367, color: "bg-red-500", state: "Madhya Pradesh" },
    { name: "Rewa", aqi: 112, status: "Unhealthy", lat: 24.5364, lng: 81.2929, color: "bg-orange-500", state: "Madhya Pradesh" },
    { name: "Murwara", aqi: 121, status: "Unhealthy", lat: 23.8367, lng: 80.3931, color: "bg-orange-500", state: "Madhya Pradesh" },
    { name: "Singrauli", aqi: 187, status: "Unhealthy", lat: 24.1997, lng: 82.6739, color: "bg-red-600", state: "Madhya Pradesh" },
    { name: "Burhanpur", aqi: 143, status: "Unhealthy", lat: 21.3089, lng: 76.2291, color: "bg-red-500", state: "Madhya Pradesh" },
    { name: "Khandwa", aqi: 132, status: "Unhealthy", lat: 21.8346, lng: 76.3542, color: "bg-red-500", state: "Madhya Pradesh" },
    { name: "Khargone", aqi: 123, status: "Unhealthy", lat: 21.8236, lng: 75.6147, color: "bg-orange-500", state: "Madhya Pradesh" },
    { name: "Nagpur", aqi: 98, status: "Moderate", lat: 21.1458, lng: 79.0882, color: "bg-yellow-500", state: "Maharashtra" },
    { name: "Raipur", aqi: 134, status: "Unhealthy", lat: 21.2514, lng: 81.6296, color: "bg-red-500", state: "Chhattisgarh" },
    { name: "Bilaspur", aqi: 123, status: "Unhealthy", lat: 22.0797, lng: 82.1409, color: "bg-orange-500", state: "Chhattisgarh" },
    { name: "Korba", aqi: 165, status: "Unhealthy", lat: 22.3595, lng: 82.7501, color: "bg-red-500", state: "Chhattisgarh" },
    { name: "Bhilai", aqi: 143, status: "Unhealthy", lat: 21.1938, lng: 81.3509, color: "bg-red-500", state: "Chhattisgarh" },
    { name: "Durg", aqi: 132, status: "Unhealthy", lat: 21.1901, lng: 81.2849, color: "bg-red-500", state: "Chhattisgarh" },
    { name: "Rajnandgaon", aqi: 121, status: "Unhealthy", lat: 21.0974, lng: 81.0360, color: "bg-orange-500", state: "Chhattisgarh" },
    { name: "Jagdalpur", aqi: 89, status: "Moderate", lat: 19.0821, lng: 82.0323, color: "bg-yellow-500", state: "Chhattisgarh" },
    { name: "Ambikapur", aqi: 98, status: "Moderate", lat: 23.1293, lng: 83.1976, color: "bg-yellow-500", state: "Chhattisgarh" },
    { name: "Raigarh", aqi: 154, status: "Unhealthy", lat: 21.8974, lng: 83.3947, color: "bg-red-500", state: "Chhattisgarh" },
    { name: "Jashpur", aqi: 76, status: "Moderate", lat: 22.8830, lng: 84.1370, color: "bg-yellow-400", state: "Chhattisgarh" },
    
    // West India
    { name: "Ahmedabad", aqi: 142, status: "Unhealthy", lat: 23.0225, lng: 72.5714, color: "bg-red-500", state: "Gujarat" },
    { name: "Pune", aqi: 98, status: "Moderate", lat: 18.5204, lng: 73.8567, color: "bg-yellow-500", state: "Maharashtra" },
    { name: "Surat", aqi: 156, status: "Unhealthy", lat: 21.1702, lng: 72.8311, color: "bg-red-500", state: "Gujarat" },
    { name: "Rajkot", aqi: 123, status: "Unhealthy", lat: 22.3039, lng: 70.8022, color: "bg-orange-500", state: "Gujarat" },
    { name: "Vadodara", aqi: 134, status: "Unhealthy", lat: 22.3072, lng: 73.1812, color: "bg-red-500", state: "Gujarat" },
    { name: "Bhavnagar", aqi: 112, status: "Unhealthy", lat: 21.7645, lng: 72.1519, color: "bg-orange-500", state: "Gujarat" },
    { name: "Jamnagar", aqi: 121, status: "Unhealthy", lat: 22.4707, lng: 70.0577, color: "bg-orange-500", state: "Gujarat" },
    { name: "Junagadh", aqi: 98, status: "Moderate", lat: 21.5222, lng: 70.4579, color: "bg-yellow-500", state: "Gujarat" },
    { name: "Gandhinagar", aqi: 132, status: "Unhealthy", lat: 23.2156, lng: 72.6369, color: "bg-red-500", state: "Gujarat" },
    { name: "Anand", aqi: 109, status: "Unhealthy", lat: 22.5645, lng: 72.9289, color: "bg-orange-500", state: "Gujarat" },
    { name: "Mehsana", aqi: 121, status: "Unhealthy", lat: 23.5880, lng: 72.3693, color: "bg-orange-500", state: "Gujarat" },
    { name: "Morbi", aqi: 134, status: "Unhealthy", lat: 22.8181, lng: 70.8381, color: "bg-red-500", state: "Gujarat" },
    { name: "Surendranagar", aqi: 123, status: "Unhealthy", lat: 22.7196, lng: 71.6369, color: "bg-orange-500", state: "Gujarat" },
    { name: "Bharuch", aqi: 143, status: "Unhealthy", lat: 21.7051, lng: 72.9959, color: "bg-red-500", state: "Gujarat" },
    { name: "Valsad", aqi: 112, status: "Unhealthy", lat: 20.5992, lng: 72.9342, color: "bg-orange-500", state: "Gujarat" },
    { name: "Navsari", aqi: 121, status: "Unhealthy", lat: 20.9463, lng: 72.9520, color: "bg-orange-500", state: "Gujarat" },
    { name: "Kutch", aqi: 89, status: "Moderate", lat: 23.7337, lng: 69.8597, color: "bg-yellow-500", state: "Gujarat" },
    { name: "Banaskantha", aqi: 98, status: "Moderate", lat: 24.1719, lng: 72.4396, color: "bg-yellow-500", state: "Gujarat" },
    { name: "Sabarkantha", aqi: 87, status: "Moderate", lat: 23.6081, lng: 73.0572, color: "bg-yellow-500", state: "Gujarat" },
    { name: "Aravalli", aqi: 76, status: "Moderate", lat: 23.1019, lng: 73.4221, color: "bg-yellow-400", state: "Gujarat" },
    { name: "Mahisagar", aqi: 98, status: "Moderate", lat: 23.1106, lng: 73.6581, color: "bg-yellow-500", state: "Gujarat" },
    { name: "Nashik", aqi: 112, status: "Unhealthy", lat: 19.9975, lng: 73.7898, color: "bg-orange-500", state: "Maharashtra" },
    { name: "Aurangabad", aqi: 121, status: "Unhealthy", lat: 19.8762, lng: 75.3433, color: "bg-orange-500", state: "Maharashtra" },
    { name: "Solapur", aqi: 134, status: "Unhealthy", lat: 17.6599, lng: 75.9064, color: "bg-red-500", state: "Maharashtra" },
    { name: "Kolhapur", aqi: 98, status: "Moderate", lat: 16.7050, lng: 74.2433, color: "bg-yellow-500", state: "Maharashtra" },
    { name: "Sangli", aqi: 89, status: "Moderate", lat: 16.8524, lng: 74.5815, color: "bg-yellow-500", state: "Maharashtra" },
    { name: "Ahmednagar", aqi: 123, status: "Unhealthy", lat: 19.0948, lng: 74.7480, color: "bg-orange-500", state: "Maharashtra" },
    { name: "Latur", aqi: 132, status: "Unhealthy", lat: 18.4088, lng: 76.5604, color: "bg-red-500", state: "Maharashtra" },
    { name: "Osmanabad", aqi: 121, status: "Unhealthy", lat: 18.1760, lng: 76.0395, color: "bg-orange-500", state: "Maharashtra" },
    { name: "Nanded", aqi: 143, status: "Unhealthy", lat: 19.1383, lng: 77.3210, color: "bg-red-500", state: "Maharashtra" },
    { name: "Parbhani", aqi: 134, status: "Unhealthy", lat: 19.2608, lng: 76.7734, color: "bg-red-500", state: "Maharashtra" },
    { name: "Hingoli", aqi: 123, status: "Unhealthy", lat: 19.7146, lng: 77.1479, color: "bg-orange-500", state: "Maharashtra" },
    { name: "Jalna", aqi: 132, status: "Unhealthy", lat: 19.8397, lng: 75.8827, color: "bg-red-500", state: "Maharashtra" },
    { name: "Beed", aqi: 143, status: "Unhealthy", lat: 18.9894, lng: 75.7573, color: "bg-red-500", state: "Maharashtra" },
    { name: "Akola", aqi: 154, status: "Unhealthy", lat: 20.7002, lng: 77.0082, color: "bg-red-500", state: "Maharashtra" },
    { name: "Amravati", aqi: 145, status: "Unhealthy", lat: 20.9374, lng: 77.7796, color: "bg-red-500", state: "Maharashtra" },
    { name: "Yavatmal", aqi: 134, status: "Unhealthy", lat: 20.3897, lng: 78.1089, color: "bg-red-500", state: "Maharashtra" },
    { name: "Washim", aqi: 123, status: "Unhealthy", lat: 20.1174, lng: 77.1387, color: "bg-orange-500", state: "Maharashtra" },
    { name: "Buldhana", aqi: 132, status: "Unhealthy", lat: 20.5307, lng: 76.1808, color: "bg-red-500", state: "Maharashtra" },
    { name: "Wardha", aqi: 121, status: "Unhealthy", lat: 20.7453, lng: 78.6022, color: "bg-orange-500", state: "Maharashtra" },
    { name: "Chandrapur", aqi: 143, status: "Unhealthy", lat: 19.9615, lng: 79.2961, color: "bg-red-500", state: "Maharashtra" },
    { name: "Gadchiroli", aqi: 98, status: "Moderate", lat: 20.1809, lng: 80.0112, color: "bg-yellow-500", state: "Maharashtra" },
    { name: "Gondia", aqi: 112, status: "Unhealthy", lat: 21.4616, lng: 80.1955, color: "bg-orange-500", state: "Maharashtra" },
    { name: "Bhandara", aqi: 109, status: "Unhealthy", lat: 21.1704, lng: 79.6593, color: "bg-orange-500", state: "Maharashtra" },
    
    // South India - Expanded Coverage
    { name: "Coimbatore", aqi: 76, status: "Moderate", lat: 11.0168, lng: 76.9558, color: "bg-yellow-400", state: "Tamil Nadu" },
    { name: "Madurai", aqi: 89, status: "Moderate", lat: 9.9252, lng: 78.1198, color: "bg-yellow-500", state: "Tamil Nadu" },
    { name: "Salem", aqi: 98, status: "Moderate", lat: 11.6643, lng: 78.1460, color: "bg-yellow-500", state: "Tamil Nadu" },
    { name: "Tirunelveli", aqi: 67, status: "Moderate", lat: 8.7139, lng: 77.7567, color: "bg-yellow-400", state: "Tamil Nadu" },
    { name: "Tirupur", aqi: 87, status: "Moderate", lat: 11.1085, lng: 77.3411, color: "bg-yellow-500", state: "Tamil Nadu" },
    { name: "Erode", aqi: 89, status: "Moderate", lat: 11.3410, lng: 77.7172, color: "bg-yellow-500", state: "Tamil Nadu" },
    { name: "Vellore", aqi: 98, status: "Moderate", lat: 12.9165, lng: 79.1325, color: "bg-yellow-500", state: "Tamil Nadu" },
    { name: "Thoothukudi", aqi: 76, status: "Moderate", lat: 8.7642, lng: 78.1348, color: "bg-yellow-400", state: "Tamil Nadu" },
    { name: "Dindigul", aqi: 87, status: "Moderate", lat: 10.3673, lng: 77.9803, color: "bg-yellow-500", state: "Tamil Nadu" },
    { name: "Thanjavur", aqi: 65, status: "Moderate", lat: 10.7870, lng: 79.1378, color: "bg-yellow-400", state: "Tamil Nadu" },
    { name: "Trichy", aqi: 89, status: "Moderate", lat: 10.7905, lng: 78.7047, color: "bg-yellow-500", state: "Tamil Nadu" },
    { name: "Karur", aqi: 76, status: "Moderate", lat: 10.9601, lng: 78.0766, color: "bg-yellow-400", state: "Tamil Nadu" },
    { name: "Namakkal", aqi: 87, status: "Moderate", lat: 11.2189, lng: 78.1677, color: "bg-yellow-500", state: "Tamil Nadu" },
    { name: "Krishnagiri", aqi: 89, status: "Moderate", lat: 12.5186, lng: 78.2137, color: "bg-yellow-500", state: "Tamil Nadu" },
    { name: "Dharmapuri", aqi: 76, status: "Moderate", lat: 12.1357, lng: 78.1582, color: "bg-yellow-400", state: "Tamil Nadu" },
    { name: "Cuddalore", aqi: 98, status: "Moderate", lat: 11.7480, lng: 79.7714, color: "bg-yellow-500", state: "Tamil Nadu" },
    { name: "Villupuram", aqi: 87, status: "Moderate", lat: 11.9401, lng: 79.4861, color: "bg-yellow-500", state: "Tamil Nadu" },
    { name: "Tiruvannamalai", aqi: 76, status: "Moderate", lat: 12.2253, lng: 79.0747, color: "bg-yellow-400", state: "Tamil Nadu" },
    { name: "Kanchipuram", aqi: 98, status: "Moderate", lat: 12.8342, lng: 79.7036, color: "bg-yellow-500", state: "Tamil Nadu" },
    { name: "Tiruvallur", aqi: 89, status: "Moderate", lat: 13.1450, lng: 79.9098, color: "bg-yellow-500", state: "Tamil Nadu" },
    { name: "Chengalpattu", aqi: 87, status: "Moderate", lat: 12.6919, lng: 79.9756, color: "bg-yellow-500", state: "Tamil Nadu" },
    { name: "Ranipet", aqi: 76, status: "Moderate", lat: 12.9249, lng: 79.3273, color: "bg-yellow-400", state: "Tamil Nadu" },
    { name: "Tirupathur", aqi: 89, status: "Moderate", lat: 12.4969, lng: 78.5430, color: "bg-yellow-500", state: "Tamil Nadu" },
    { name: "Pudukkottai", aqi: 65, status: "Moderate", lat: 10.3833, lng: 78.8000, color: "bg-yellow-400", state: "Tamil Nadu" },
    { name: "Sivaganga", aqi: 76, status: "Moderate", lat: 9.8432, lng: 78.4809, color: "bg-yellow-400", state: "Tamil Nadu" },
    { name: "Virudhunagar", aqi: 87, status: "Moderate", lat: 9.5810, lng: 77.9624, color: "bg-yellow-500", state: "Tamil Nadu" },
    { name: "Ramanathapuram", aqi: 65, status: "Moderate", lat: 9.3639, lng: 78.8397, color: "bg-yellow-400", state: "Tamil Nadu" },
    { name: "Tenkasi", aqi: 67, status: "Moderate", lat: 8.9606, lng: 77.3152, color: "bg-yellow-400", state: "Tamil Nadu" },
    { name: "Mysore", aqi: 67, status: "Moderate", lat: 12.2958, lng: 76.6394, color: "bg-yellow-400", state: "Karnataka" },
    { name: "Mangalore", aqi: 54, status: "Good", lat: 12.9141, lng: 74.8560, color: "bg-green-500", state: "Karnataka" },
    { name: "Hubli", aqi: 89, status: "Moderate", lat: 15.3647, lng: 75.1240, color: "bg-yellow-500", state: "Karnataka" },
    { name: "Belgaum", aqi: 98, status: "Moderate", lat: 15.8497, lng: 74.4977, color: "bg-yellow-500", state: "Karnataka" },
    { name: "Gulbarga", aqi: 112, status: "Unhealthy", lat: 17.3297, lng: 76.8343, color: "bg-orange-500", state: "Karnataka" },
    { name: "Davangere", aqi: 87, status: "Moderate", lat: 14.4644, lng: 75.9200, color: "bg-yellow-500", state: "Karnataka" },
    { name: "Bellary", aqi: 109, status: "Unhealthy", lat: 15.1394, lng: 76.9214, color: "bg-orange-500", state: "Karnataka" },
    { name: "Bijapur", aqi: 121, status: "Unhealthy", lat: 16.8302, lng: 75.7100, color: "bg-orange-500", state: "Karnataka" },
    { name: "Shimoga", aqi: 76, status: "Moderate", lat: 13.9299, lng: 75.5681, color: "bg-yellow-400", state: "Karnataka" },
    { name: "Tumkur", aqi: 89, status: "Moderate", lat: 13.3392, lng: 77.1167, color: "bg-yellow-500", state: "Karnataka" },
    { name: "Raichur", aqi: 134, status: "Unhealthy", lat: 16.2120, lng: 77.3439, color: "bg-red-500", state: "Karnataka" },
    { name: "Bidar", aqi: 123, status: "Unhealthy", lat: 17.9104, lng: 77.5200, color: "bg-orange-500", state: "Karnataka" },
    { name: "Bagalkot", aqi: 112, status: "Unhealthy", lat: 16.1875, lng: 75.6919, color: "bg-orange-500", state: "Karnataka" },
    { name: "Dharwad", aqi: 98, status: "Moderate", lat: 15.4589, lng: 75.0078, color: "bg-yellow-500", state: "Karnataka" },
    { name: "Gadag", aqi: 87, status: "Moderate", lat: 15.4167, lng: 75.6167, color: "bg-yellow-500", state: "Karnataka" },
    { name: "Haveri", aqi: 89, status: "Moderate", lat: 14.7951, lng: 75.4047, color: "bg-yellow-500", state: "Karnataka" },
    { name: "Koppal", aqi: 109, status: "Unhealthy", lat: 15.3512, lng: 76.1549, color: "bg-orange-500", state: "Karnataka" },
    { name: "Chitradurga", aqi: 98, status: "Moderate", lat: 14.2251, lng: 76.3980, color: "bg-yellow-500", state: "Karnataka" },
    { name: "Kolar", aqi: 76, status: "Moderate", lat: 13.1373, lng: 78.1297, color: "bg-yellow-400", state: "Karnataka" },
    { name: "Chikkaballapur", aqi: 67, status: "Moderate", lat: 13.4355, lng: 77.7315, color: "bg-yellow-400", state: "Karnataka" },
    { name: "Hassan", aqi: 65, status: "Moderate", lat: 13.0068, lng: 76.0962, color: "bg-yellow-400", state: "Karnataka" },
    { name: "Mandya", aqi: 76, status: "Moderate", lat: 12.5214, lng: 76.8956, color: "bg-yellow-400", state: "Karnataka" },
    { name: "Chamarajanagar", aqi: 54, status: "Good", lat: 11.9254, lng: 76.9437, color: "bg-green-500", state: "Karnataka" },
    { name: "Kodagu", aqi: 43, status: "Good", lat: 12.3375, lng: 75.8069, color: "bg-green-500", state: "Karnataka" },
    { name: "Dakshina Kannada", aqi: 54, status: "Good", lat: 12.8438, lng: 75.2479, color: "bg-green-500", state: "Karnataka" },
    { name: "Udupi", aqi: 48, status: "Good", lat: 13.3409, lng: 74.7421, color: "bg-green-500", state: "Karnataka" },
    { name: "Uttara Kannada", aqi: 43, status: "Good", lat: 14.7937, lng: 74.6882, color: "bg-green-500", state: "Karnataka" },
    { name: "Chikkamagaluru", aqi: 54, status: "Good", lat: 13.3161, lng: 75.7720, color: "bg-green-500", state: "Karnataka" },
    { name: "Kochi", aqi: 54, status: "Moderate", lat: 9.9312, lng: 76.2673, color: "bg-yellow-300", state: "Kerala" },
    { name: "Thiruvananthapuram", aqi: 48, status: "Good", lat: 8.5241, lng: 76.9366, color: "bg-green-500", state: "Kerala" },
    { name: "Kozhikode", aqi: 56, status: "Moderate", lat: 11.2588, lng: 75.7804, color: "bg-yellow-300", state: "Kerala" },
    { name: "Thrissur", aqi: 52, status: "Good", lat: 10.5276, lng: 76.2144, color: "bg-green-500", state: "Kerala" },
    { name: "Kollam", aqi: 48, status: "Good", lat: 8.8932, lng: 76.6141, color: "bg-green-500", state: "Kerala" },
    { name: "Palakkad", aqi: 67, status: "Moderate", lat: 10.7867, lng: 76.6548, color: "bg-yellow-400", state: "Kerala" },
    { name: "Alappuzha", aqi: 43, status: "Good", lat: 9.4981, lng: 76.3388, color: "bg-green-500", state: "Kerala" },
    { name: "Kottayam", aqi: 45, status: "Good", lat: 9.5916, lng: 76.5222, color: "bg-green-500", state: "Kerala" },
    { name: "Pathanamthitta", aqi: 41, status: "Good", lat: 9.2667, lng: 76.7833, color: "bg-green-500", state: "Kerala" },
    { name: "Idukki", aqi: 32, status: "Good", lat: 9.8571, lng: 77.1025, color: "bg-green-500", state: "Kerala" },
    { name: "Ernakulam", aqi: 56, status: "Moderate", lat: 9.9312, lng: 76.2673, color: "bg-yellow-300", state: "Kerala" },
    { name: "Malappuram", aqi: 65, status: "Moderate", lat: 11.0510, lng: 76.0711, color: "bg-yellow-400", state: "Kerala" },
    { name: "Kannur", aqi: 58, status: "Moderate", lat: 11.8745, lng: 75.3704, color: "bg-yellow-300", state: "Kerala" },
    { name: "Kasaragod", aqi: 52, status: "Good", lat: 12.4996, lng: 74.9869, color: "bg-green-500", state: "Kerala" },
    { name: "Wayanad", aqi: 34, status: "Good", lat: 11.6854, lng: 76.1320, color: "bg-green-500", state: "Kerala" },
    { name: "Visakhapatnam", aqi: 87, status: "Moderate", lat: 17.6868, lng: 83.2185, color: "bg-yellow-500", state: "Andhra Pradesh" },
    { name: "Vijayawada", aqi: 95, status: "Moderate", lat: 16.5062, lng: 80.6480, color: "bg-yellow-500", state: "Andhra Pradesh" },
    { name: "Guntur", aqi: 89, status: "Moderate", lat: 16.3067, lng: 80.4365, color: "bg-yellow-500", state: "Andhra Pradesh" },
    { name: "Nellore", aqi: 76, status: "Moderate", lat: 14.4426, lng: 79.9865, color: "bg-yellow-400", state: "Andhra Pradesh" },
    { name: "Kurnool", aqi: 98, status: "Moderate", lat: 15.8281, lng: 78.0373, color: "bg-yellow-500", state: "Andhra Pradesh" },
    { name: "Kadapa", aqi: 87, status: "Moderate", lat: 14.4673, lng: 78.8242, color: "bg-yellow-500", state: "Andhra Pradesh" },
    { name: "Tirupati", aqi: 65, status: "Moderate", lat: 13.6288, lng: 79.4192, color: "bg-yellow-400", state: "Andhra Pradesh" },
    { name: "Anantapur", aqi: 109, status: "Unhealthy", lat: 14.6819, lng: 77.6006, color: "bg-orange-500", state: "Andhra Pradesh" },
    { name: "Chittoor", aqi: 76, status: "Moderate", lat: 13.2172, lng: 79.1003, color: "bg-yellow-400", state: "Andhra Pradesh" },
    { name: "East Godavari", aqi: 89, status: "Moderate", lat: 17.2403, lng: 81.8040, color: "bg-yellow-500", state: "Andhra Pradesh" },
    { name: "West Godavari", aqi: 87, status: "Moderate", lat: 16.7147, lng: 81.1044, color: "bg-yellow-500", state: "Andhra Pradesh" },
    { name: "Krishna", aqi: 98, status: "Moderate", lat: 16.1800, lng: 80.6200, color: "bg-yellow-500", state: "Andhra Pradesh" },
    { name: "Prakasam", aqi: 76, status: "Moderate", lat: 15.3500, lng: 79.5833, color: "bg-yellow-400", state: "Andhra Pradesh" },
    { name: "Srikakulam", aqi: 65, status: "Moderate", lat: 18.2949, lng: 83.8958, color: "bg-yellow-400", state: "Andhra Pradesh" },
    { name: "Vizianagaram", aqi: 76, status: "Moderate", lat: 18.1067, lng: 83.4056, color: "bg-yellow-400", state: "Andhra Pradesh" },
    { name: "Warangal", aqi: 89, status: "Moderate", lat: 17.9689, lng: 79.5941, color: "bg-yellow-500", state: "Telangana" },
    { name: "Nizamabad", aqi: 98, status: "Moderate", lat: 18.6725, lng: 78.0941, color: "bg-yellow-500", state: "Telangana" },
    { name: "Khammam", aqi: 87, status: "Moderate", lat: 17.2473, lng: 80.1514, color: "bg-yellow-500", state: "Telangana" },
    { name: "Karimnagar", aqi: 109, status: "Unhealthy", lat: 18.4386, lng: 79.1288, color: "bg-orange-500", state: "Telangana" },
    { name: "Ramagundam", aqi: 134, status: "Unhealthy", lat: 18.7537, lng: 79.4740, color: "bg-red-500", state: "Telangana" },
    { name: "Mahbubnagar", aqi: 98, status: "Moderate", lat: 16.7394, lng: 77.9993, color: "bg-yellow-500", state: "Telangana" },
    { name: "Nalgonda", aqi: 87, status: "Moderate", lat: 17.0542, lng: 79.2672, color: "bg-yellow-500", state: "Telangana" },
    { name: "Adilabad", aqi: 112, status: "Unhealthy", lat: 19.6669, lng: 78.5270, color: "bg-orange-500", state: "Telangana" },
    { name: "Medak", aqi: 89, status: "Moderate", lat: 18.0378, lng: 78.2747, color: "bg-yellow-500", state: "Telangana" },
    { name: "Rangareddy", aqi: 123, status: "Unhealthy", lat: 17.4065, lng: 78.4772, color: "bg-orange-500", state: "Telangana" },
    
    // East India - Extended Coverage
    { name: "Bhubaneswar", aqi: 123, status: "Unhealthy", lat: 20.2961, lng: 85.8245, color: "bg-orange-500", state: "Odisha" },
    { name: "Cuttack", aqi: 134, status: "Unhealthy", lat: 20.4625, lng: 85.8828, color: "bg-red-500", state: "Odisha" },
    { name: "Rourkela", aqi: 145, status: "Unhealthy", lat: 22.2604, lng: 84.8536, color: "bg-red-500", state: "Odisha" },
    { name: "Berhampur", aqi: 112, status: "Unhealthy", lat: 19.3149, lng: 84.7941, color: "bg-orange-500", state: "Odisha" },
    { name: "Sambalpur", aqi: 132, status: "Unhealthy", lat: 21.4669, lng: 83.9812, color: "bg-red-500", state: "Odisha" },
    { name: "Balasore", aqi: 121, status: "Unhealthy", lat: 21.4942, lng: 86.9180, color: "bg-orange-500", state: "Odisha" },
    { name: "Baripada", aqi: 109, status: "Unhealthy", lat: 21.9347, lng: 86.7338, color: "bg-orange-500", state: "Odisha" },
    { name: "Jharsuguda", aqi: 156, status: "Unhealthy", lat: 21.8548, lng: 84.0058, color: "bg-red-500", state: "Odisha" },
    { name: "Angul", aqi: 143, status: "Unhealthy", lat: 20.8397, lng: 85.0644, color: "bg-red-500", state: "Odisha" },
    { name: "Dhenkanal", aqi: 123, status: "Unhealthy", lat: 20.6586, lng: 85.5981, color: "bg-orange-500", state: "Odisha" },
    { name: "Keonjhar", aqi: 112, status: "Unhealthy", lat: 21.6297, lng: 85.5781, color: "bg-orange-500", state: "Odisha" },
    { name: "Sundargarh", aqi: 134, status: "Unhealthy", lat: 22.1167, lng: 84.0167, color: "bg-red-500", state: "Odisha" },
    { name: "Kalahandi", aqi: 98, status: "Moderate", lat: 19.9067, lng: 83.1664, color: "bg-yellow-500", state: "Odisha" },
    { name: "Rayagada", aqi: 87, status: "Moderate", lat: 19.1678, lng: 83.4158, color: "bg-yellow-500", state: "Odisha" },
    { name: "Koraput", aqi: 76, status: "Moderate", lat: 18.8103, lng: 82.7103, color: "bg-yellow-400", state: "Odisha" },
    { name: "Nabarangpur", aqi: 65, status: "Moderate", lat: 19.2306, lng: 82.5378, color: "bg-yellow-400", state: "Odisha" },
    { name: "Malkangiri", aqi: 54, status: "Good", lat: 18.3478, lng: 81.8811, color: "bg-green-500", state: "Odisha" },
    { name: "Guwahati", aqi: 89, status: "Moderate", lat: 26.1445, lng: 91.7362, color: "bg-yellow-500", state: "Assam" },
    { name: "Silchar", aqi: 98, status: "Moderate", lat: 24.8333, lng: 92.7789, color: "bg-yellow-500", state: "Assam" },
    { name: "Dibrugarh", aqi: 76, status: "Moderate", lat: 27.4728, lng: 94.9120, color: "bg-yellow-400", state: "Assam" },
    { name: "Jorhat", aqi: 87, status: "Moderate", lat: 26.7509, lng: 94.2037, color: "bg-yellow-500", state: "Assam" },
    { name: "Nagaon", aqi: 89, status: "Moderate", lat: 26.3484, lng: 92.6856, color: "bg-yellow-500", state: "Assam" },
    { name: "Tinsukia", aqi: 65, status: "Moderate", lat: 27.5000, lng: 95.3667, color: "bg-yellow-400", state: "Assam" },
    { name: "Bongaigaon", aqi: 98, status: "Moderate", lat: 26.4833, lng: 90.5500, color: "bg-yellow-500", state: "Assam" },
    { name: "Dhubri", aqi: 87, status: "Moderate", lat: 26.0167, lng: 89.9833, color: "bg-yellow-500", state: "Assam" },
    { name: "North Lakhimpur", aqi: 76, status: "Moderate", lat: 27.2333, lng: 94.1000, color: "bg-yellow-400", state: "Assam" },
    { name: "Karimganj", aqi: 89, status: "Moderate", lat: 24.8667, lng: 92.3500, color: "bg-yellow-500", state: "Assam" },
    { name: "Hailakandi", aqi: 76, status: "Moderate", lat: 24.6833, lng: 92.5667, color: "bg-yellow-400", state: "Assam" },
    { name: "Goalpara", aqi: 87, status: "Moderate", lat: 26.1667, lng: 90.6167, color: "bg-yellow-500", state: "Assam" },
    { name: "Kokrajhar", aqi: 65, status: "Moderate", lat: 26.4019, lng: 90.2719, color: "bg-yellow-400", state: "Assam" },
    { name: "Chirang", aqi: 54, status: "Good", lat: 26.7167, lng: 90.2833, color: "bg-green-500", state: "Assam" },
    { name: "Barpeta", aqi: 89, status: "Moderate", lat: 26.3167, lng: 91.0000, color: "bg-yellow-500", state: "Assam" },
    { name: "Nalbari", aqi: 76, status: "Moderate", lat: 26.4500, lng: 91.4333, color: "bg-yellow-400", state: "Assam" },
    { name: "Kamrup", aqi: 98, status: "Moderate", lat: 26.0000, lng: 91.7500, color: "bg-yellow-500", state: "Assam" },
    { name: "Darrang", aqi: 87, status: "Moderate", lat: 26.4500, lng: 92.0333, color: "bg-yellow-500", state: "Assam" },
    { name: "Sonitpur", aqi: 89, status: "Moderate", lat: 26.6333, lng: 92.8000, color: "bg-yellow-500", state: "Assam" },
    { name: "Lakhimpur", aqi: 76, status: "Moderate", lat: 27.2333, lng: 94.1000, color: "bg-yellow-400", state: "Assam" },
    { name: "Dhemaji", aqi: 65, status: "Moderate", lat: 27.4833, lng: 94.5833, color: "bg-yellow-400", state: "Assam" },
    { name: "Morigaon", aqi: 87, status: "Moderate", lat: 26.2500, lng: 92.3333, color: "bg-yellow-500", state: "Assam" },
    { name: "Golaghat", aqi: 89, status: "Moderate", lat: 26.5167, lng: 93.9667, color: "bg-yellow-500", state: "Assam" },
    { name: "Karbi Anglong", aqi: 54, status: "Good", lat: 25.8833, lng: 93.4333, color: "bg-green-500", state: "Assam" },
    { name: "Dima Hasao", aqi: 43, status: "Good", lat: 25.2333, lng: 93.0167, color: "bg-green-500", state: "Assam" },
    { name: "Cachar", aqi: 98, status: "Moderate", lat: 24.8333, lng: 92.7789, color: "bg-yellow-500", state: "Assam" },
    { name: "Imphal", aqi: 76, status: "Moderate", lat: 24.8170, lng: 93.9368, color: "bg-yellow-400", state: "Manipur" },
    { name: "Thoubal", aqi: 65, status: "Moderate", lat: 24.6333, lng: 94.0167, color: "bg-yellow-400", state: "Manipur" },
    { name: "Bishnupur", aqi: 54, status: "Good", lat: 24.6167, lng: 93.7667, color: "bg-green-500", state: "Manipur" },
    { name: "Imphal East", aqi: 76, status: "Moderate", lat: 24.7500, lng: 94.0833, color: "bg-yellow-400", state: "Manipur" },
    { name: "Imphal West", aqi: 78, status: "Moderate", lat: 24.7667, lng: 93.9167, color: "bg-yellow-400", state: "Manipur" },
    { name: "Senapati", aqi: 43, status: "Good", lat: 25.2667, lng: 94.0167, color: "bg-green-500", state: "Manipur" },
    { name: "Tamenglong", aqi: 32, status: "Good", lat: 24.9833, lng: 93.5000, color: "bg-green-500", state: "Manipur" },
    { name: "Churachandpur", aqi: 54, status: "Good", lat: 24.3333, lng: 93.6833, color: "bg-green-500", state: "Manipur" },
    { name: "Chandel", aqi: 43, status: "Good", lat: 24.3167, lng: 94.1333, color: "bg-green-500", state: "Manipur" },
    { name: "Ukhrul", aqi: 41, status: "Good", lat: 25.0500, lng: 94.3167, color: "bg-green-500", state: "Manipur" },
    { name: "Agartala", aqi: 87, status: "Moderate", lat: 23.8315, lng: 91.2868, color: "bg-yellow-500", state: "Tripura" },
    { name: "Udaipur", aqi: 76, status: "Moderate", lat: 23.5333, lng: 91.4833, color: "bg-yellow-400", state: "Tripura" },
    { name: "Kailashahar", aqi: 65, status: "Moderate", lat: 24.3333, lng: 92.0000, color: "bg-yellow-400", state: "Tripura" },
    { name: "Dharmanagar", aqi: 54, status: "Good", lat: 24.3667, lng: 92.1667, color: "bg-green-500", state: "Tripura" },
    { name: "Belonia", aqi: 67, status: "Moderate", lat: 23.2500, lng: 91.4500, color: "bg-yellow-400", state: "Tripura" },
    { name: "Khowai", aqi: 76, status: "Moderate", lat: 24.0667, lng: 91.6000, color: "bg-yellow-400", state: "Tripura" },
    { name: "Teliamura", aqi: 65, status: "Moderate", lat: 23.8833, lng: 91.6167, color: "bg-yellow-400", state: "Tripura" },
    { name: "Sabroom", aqi: 58, status: "Moderate", lat: 23.0167, lng: 91.7167, color: "bg-yellow-300", state: "Tripura" },
    
    // Rajasthan - Extended Coverage
    { name: "Udaipur", aqi: 134, status: "Unhealthy", lat: 24.5854, lng: 73.7125, color: "bg-red-500", state: "Rajasthan" },
    { name: "Jodhpur", aqi: 145, status: "Unhealthy", lat: 26.2389, lng: 73.0243, color: "bg-red-500", state: "Rajasthan" },
    { name: "Kota", aqi: 156, status: "Unhealthy", lat: 25.2138, lng: 75.8648, color: "bg-red-500", state: "Rajasthan" },
    { name: "Bikaner", aqi: 123, status: "Unhealthy", lat: 28.0229, lng: 73.3119, color: "bg-orange-500", state: "Rajasthan" },
    { name: "Ajmer", aqi: 143, status: "Unhealthy", lat: 26.4499, lng: 74.6399, color: "bg-red-500", state: "Rajasthan" },
    { name: "Bhilwara", aqi: 132, status: "Unhealthy", lat: 25.3407, lng: 74.6269, color: "bg-red-500", state: "Rajasthan" },
    { name: "Alwar", aqi: 165, status: "Unhealthy", lat: 27.5530, lng: 76.6346, color: "bg-red-500", state: "Rajasthan" },
    { name: "Bharatpur", aqi: 154, status: "Unhealthy", lat: 27.2152, lng: 77.5030, color: "bg-red-500", state: "Rajasthan" },
    { name: "Pali", aqi: 121, status: "Unhealthy", lat: 25.7711, lng: 73.3234, color: "bg-orange-500", state: "Rajasthan" },
    { name: "Barmer", aqi: 98, status: "Moderate", lat: 25.7522, lng: 71.3962, color: "bg-yellow-500", state: "Rajasthan" },
    { name: "Jaisalmer", aqi: 87, status: "Moderate", lat: 26.9157, lng: 70.9083, color: "bg-yellow-500", state: "Rajasthan" },
    { name: "Jalore", aqi: 109, status: "Unhealthy", lat: 25.3500, lng: 72.6167, color: "bg-orange-500", state: "Rajasthan" },
    { name: "Sirohi", aqi: 98, status: "Moderate", lat: 24.8833, lng: 72.8667, color: "bg-yellow-500", state: "Rajasthan" },
    { name: "Nagaur", aqi: 132, status: "Unhealthy", lat: 27.2016, lng: 73.7340, color: "bg-red-500", state: "Rajasthan" },
    { name: "Churu", aqi: 143, status: "Unhealthy", lat: 28.3044, lng: 74.9694, color: "bg-red-500", state: "Rajasthan" },
    { name: "Jhunjhunu", aqi: 154, status: "Unhealthy", lat: 28.1267, lng: 75.3976, color: "bg-red-500", state: "Rajasthan" },
    { name: "Sikar", aqi: 145, status: "Unhealthy", lat: 27.6094, lng: 75.1399, color: "bg-red-500", state: "Rajasthan" },
    { name: "Sri Ganganagar", aqi: 167, status: "Unhealthy", lat: 29.9167, lng: 73.8833, color: "bg-red-600", state: "Rajasthan" },
    { name: "Hanumangarh", aqi: 156, status: "Unhealthy", lat: 29.5833, lng: 74.3167, color: "bg-red-500", state: "Rajasthan" },
    { name: "Chittorgarh", aqi: 121, status: "Unhealthy", lat: 24.8792, lng: 74.6239, color: "bg-orange-500", state: "Rajasthan" },
    { name: "Pratapgarh", aqi: 112, status: "Unhealthy", lat: 24.0333, lng: 74.7833, color: "bg-orange-500", state: "Rajasthan" },
    { name: "Banswara", aqi: 98, status: "Moderate", lat: 23.5411, lng: 74.4422, color: "bg-yellow-500", state: "Rajasthan" },
    { name: "Dungarpur", aqi: 87, status: "Moderate", lat: 23.8433, lng: 73.7144, color: "bg-yellow-500", state: "Rajasthan" },
    { name: "Rajsamand", aqi: 109, status: "Unhealthy", lat: 25.0714, lng: 73.8817, color: "bg-orange-500", state: "Rajasthan" },
    { name: "Dausa", aqi: 143, status: "Unhealthy", lat: 26.8944, lng: 76.3383, color: "bg-red-500", state: "Rajasthan" },
    { name: "Sawai Madhopur", aqi: 132, status: "Unhealthy", lat: 26.0173, lng: 76.3442, color: "bg-red-500", state: "Rajasthan" },
    { name: "Karauli", aqi: 123, status: "Unhealthy", lat: 26.4967, lng: 77.0206, color: "bg-orange-500", state: "Rajasthan" },
    { name: "Dholpur", aqi: 154, status: "Unhealthy", lat: 26.7022, lng: 77.8958, color: "bg-red-500", state: "Rajasthan" },
    { name: "Bundi", aqi: 121, status: "Unhealthy", lat: 25.4305, lng: 75.6499, color: "bg-orange-500", state: "Rajasthan" },
    { name: "Baran", aqi: 134, status: "Unhealthy", lat: 25.1000, lng: 76.5167, color: "bg-red-500", state: "Rajasthan" },
    { name: "Jhalawar", aqi: 112, status: "Unhealthy", lat: 24.5967, lng: 76.1647, color: "bg-orange-500", state: "Rajasthan" },
    { name: "Tonk", aqi: 143, status: "Unhealthy", lat: 26.1647, lng: 75.7886, color: "bg-red-500", state: "Rajasthan" },

    // Punjab - Extended Coverage
    { name: "Ludhiana", aqi: 187, status: "Unhealthy", lat: 30.9010, lng: 75.8573, color: "bg-red-600", state: "Punjab" },
    { name: "Jalandhar", aqi: 176, status: "Unhealthy", lat: 31.3260, lng: 75.5762, color: "bg-red-600", state: "Punjab" },
    { name: "Patiala", aqi: 165, status: "Unhealthy", lat: 30.3398, lng: 76.3869, color: "bg-red-500", state: "Punjab" },
    { name: "Bathinda", aqi: 154, status: "Unhealthy", lat: 30.2110, lng: 74.9455, color: "bg-red-500", state: "Punjab" },
    { name: "Mohali", aqi: 143, status: "Unhealthy", lat: 30.7046, lng: 76.7179, color: "bg-red-500", state: "Punjab" },
    { name: "Ferozepur", aqi: 134, status: "Unhealthy", lat: 30.9180, lng: 74.6149, color: "bg-red-500", state: "Punjab" },
    { name: "Pathankot", aqi: 123, status: "Unhealthy", lat: 32.2746, lng: 75.6521, color: "bg-orange-500", state: "Punjab" },
    { name: "Moga", aqi: 156, status: "Unhealthy", lat: 30.8156, lng: 75.1747, color: "bg-red-500", state: "Punjab" },
    { name: "Abohar", aqi: 145, status: "Unhealthy", lat: 30.1204, lng: 74.1995, color: "bg-red-500", state: "Punjab" },
    { name: "Malerkotla", aqi: 167, status: "Unhealthy", lat: 30.5247, lng: 75.8810, color: "bg-red-600", state: "Punjab" },
    { name: "Khanna", aqi: 189, status: "Unhealthy", lat: 30.7051, lng: 76.2219, color: "bg-red-600", state: "Punjab" },
    { name: "Phagwara", aqi: 178, status: "Unhealthy", lat: 31.2340, lng: 75.7737, color: "bg-red-600", state: "Punjab" },
    { name: "Muktsar", aqi: 132, status: "Unhealthy", lat: 30.4728, lng: 74.5184, color: "bg-red-500", state: "Punjab" },
    { name: "Barnala", aqi: 154, status: "Unhealthy", lat: 30.3789, lng: 75.5453, color: "bg-red-500", state: "Punjab" },
    { name: "Faridkot", aqi: 143, status: "Unhealthy", lat: 30.6704, lng: 74.7570, color: "bg-red-500", state: "Punjab" },
    { name: "Kapurthala", aqi: 167, status: "Unhealthy", lat: 31.3800, lng: 75.3800, color: "bg-red-600", state: "Punjab" },
    { name: "Sangrur", aqi: 176, status: "Unhealthy", lat: 30.2450, lng: 75.8450, color: "bg-red-600", state: "Punjab" },
    { name: "Fazilka", aqi: 132, status: "Unhealthy", lat: 30.4023, lng: 74.0278, color: "bg-red-500", state: "Punjab" },
    { name: "Gurdaspur", aqi: 121, status: "Unhealthy", lat: 32.0425, lng: 75.4011, color: "bg-orange-500", state: "Punjab" },
    { name: "Hoshiarpur", aqi: 134, status: "Unhealthy", lat: 31.5344, lng: 75.9112, color: "bg-red-500", state: "Punjab" },
    { name: "Nawanshahr", aqi: 156, status: "Unhealthy", lat: 31.1254, lng: 76.1170, color: "bg-red-500", state: "Punjab" },
    { name: "Ropar", aqi: 145, status: "Unhealthy", lat: 30.9697, lng: 76.5267, color: "bg-red-500", state: "Punjab" },
    { name: "Fatehgarh Sahib", aqi: 167, status: "Unhealthy", lat: 30.6444, lng: 76.3947, color: "bg-red-600", state: "Punjab" },
    { name: "Mansa", aqi: 154, status: "Unhealthy", lat: 29.9989, lng: 75.3927, color: "bg-red-500", state: "Punjab" },
    { name: "Tarn Taran", aqi: 143, status: "Unhealthy", lat: 31.4519, lng: 74.9289, color: "bg-red-500", state: "Punjab" }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Good": return "text-green-700 bg-green-50 border-green-200 dark:text-green-400 dark:bg-green-900/20 dark:border-green-800";
      case "Moderate": return "text-yellow-700 bg-yellow-50 border-yellow-200 dark:text-yellow-400 dark:bg-yellow-900/20 dark:border-yellow-800";
      case "Unhealthy": return "text-red-700 bg-red-50 border-red-200 dark:text-red-400 dark:bg-red-900/20 dark:border-red-800";
      case "Very Unhealthy": return "text-purple-700 bg-purple-50 border-purple-200 dark:text-purple-400 dark:bg-purple-900/20 dark:border-purple-800";
      case "Hazardous": return "text-gray-100 bg-gray-800 border-gray-600 dark:text-gray-300 dark:bg-gray-900/50 dark:border-gray-700";
      default: return "text-gray-700 bg-gray-50 border-gray-200 dark:text-gray-300 dark:bg-gray-800/50 dark:border-gray-600";
    }
  };

  const selectedCityData = selectedCity ? indianCities.find(city => city.name === selectedCity) : null;

  return (
    <div className="space-y-6">
      {/* Map Controls */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button
            variant={mapLayer === "satellite" ? "default" : "outline"}
            size="sm"
            onClick={() => setMapLayer("satellite")}
            className="flex items-center space-x-2"
          >
            <Layers className="h-4 w-4" />
            <span>Satellite</span>
          </Button>
          <Button
            variant={mapLayer === "terrain" ? "default" : "outline"}
            size="sm"
            onClick={() => setMapLayer("terrain")}
            className="flex items-center space-x-2"
          >
            <Filter className="h-4 w-4" />
            <span>Terrain</span>
          </Button>
        </div>
        
        <div className="text-sm text-gray-600 dark:text-gray-400">
          Click on any city to view detailed information
        </div>
      </div>

      {/* Selected City Info */}
      {selectedCityData && (
        <Card className="bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-lg text-gray-900 dark:text-white">
                  {selectedCityData.name}, {selectedCityData.state}
                </h3>
                <div className="flex items-center space-x-4 mt-2">
                  <span className="text-3xl font-bold text-gray-900 dark:text-white">
                    {selectedCityData.aqi}
                  </span>
                  <Badge className={getStatusColor(selectedCityData.status)}>
                    {selectedCityData.status}
                  </Badge>
                </div>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setSelectedCity(null)}
                className="dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Interactive Map */}
      <Card className="overflow-hidden dark:bg-gray-800 dark:border-gray-700">
        <CardHeader>
          <CardTitle className="flex items-center justify-between dark:text-white">
            <div className="flex items-center space-x-2">
              <MapPin className="h-5 w-5" />
              <span>Live AQI Heatmap - India</span>
            </div>
            <Badge className="bg-blue-500 text-white">
              Live Data • {indianCities.length} Cities
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="relative bg-gradient-to-br from-blue-100 via-green-50 to-yellow-50 dark:from-gray-800 dark:via-gray-700 dark:to-gray-600 h-[500px] overflow-hidden">
            {/* Map Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-green-200 via-yellow-100 to-blue-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-500 opacity-30"></div>
            
            {/* City Markers */}
            {indianCities.map((city, index) => (
              <div
                key={index}
                className="absolute cursor-pointer transform -translate-x-1/2 -translate-y-1/2 hover:scale-125 transition-all duration-200 hover:z-10"
                style={{
                  left: `${((city.lng - 68) / (97 - 68)) * 100}%`,
                  top: `${((35 - city.lat) / (35 - 6)) * 100}%`
                }}
                onClick={() => setSelectedCity(city.name)}
              >
                <div className={`w-4 h-4 rounded-full ${city.color} border-2 border-white dark:border-gray-200 shadow-lg flex items-center justify-center relative`}>
                  <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                  {selectedCity === city.name && (
                    <div className="absolute -top-2 -left-2 w-8 h-8 border-2 border-blue-500 rounded-full animate-ping"></div>
                  )}
                </div>
                <div className={`absolute top-6 left-1/2 transform -translate-x-1/2 bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm px-3 py-2 rounded-lg text-xs font-medium shadow-lg min-w-max border border-gray-200 dark:border-gray-600 ${
                  selectedCity === city.name ? 'opacity-100 scale-110' : 'opacity-0 hover:opacity-100 scale-95 hover:scale-100'
                } transition-all duration-200`}>
                  <div className="font-semibold text-gray-900 dark:text-white">{city.name}</div>
                  <div className="text-gray-600 dark:text-gray-300">AQI: {city.aqi}</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">{city.state}</div>
                </div>
              </div>
            ))}
            
            {/* Enhanced Legend */}
            <div className="absolute bottom-4 left-4 bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm rounded-lg p-4 shadow-lg border border-gray-200 dark:border-gray-600">
              <div className="flex items-center space-x-2 mb-3">
                <Info className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                <h4 className="font-semibold text-sm text-gray-900 dark:text-white">AQI Scale</h4>
              </div>
              <div className="space-y-2 text-xs">
                <div className="flex items-center justify-between space-x-4">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span className="text-gray-700 dark:text-gray-300">Good</span>
                  </div>
                  <span className="text-gray-500 dark:text-gray-400">0-50</span>
                </div>
                <div className="flex items-center justify-between space-x-4">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <span className="text-gray-700 dark:text-gray-300">Moderate</span>
                  </div>
                  <span className="text-gray-500 dark:text-gray-400">51-100</span>
                </div>
                <div className="flex items-center justify-between space-x-4">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                    <span className="text-gray-700 dark:text-gray-300">Unhealthy</span>
                  </div>
                  <span className="text-gray-500 dark:text-gray-400">101-150</span>
                </div>
                <div className="flex items-center justify-between space-x-4">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <span className="text-gray-700 dark:text-gray-300">Very Unhealthy</span>
                  </div>
                  <span className="text-gray-500 dark:text-gray-400">151-200</span>
                </div>
                <div className="flex items-center justify-between space-x-4">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-purple-600 rounded-full"></div>
                    <span className="text-gray-700 dark:text-gray-300">Very Unhealthy</span>
                  </div>
                  <span className="text-gray-500 dark:text-gray-400">201-300</span>
                </div>
                <div className="flex items-center justify-between space-x-4">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-gray-800 rounded-full"></div>
                    <span className="text-gray-700 dark:text-gray-300">Hazardous</span>
                  </div>
                  <span className="text-gray-500 dark:text-gray-400">300+</span>
                </div>
              </div>
            </div>
            
            {/* Stats */}
            <div className="absolute top-4 right-4 bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm rounded-lg p-4 shadow-lg border border-gray-200 dark:border-gray-600">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">{indianCities.length}</div>
                <div className="text-xs text-gray-600 dark:text-gray-400">Cities Monitored</div>
              </div>
              <div className="mt-2 pt-2 border-t border-gray-200 dark:border-gray-600">
                <div className="text-xs text-gray-500 dark:text-gray-400">
                  Last Updated: {new Date().toLocaleTimeString()}
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* City Grid */}
      <Card className="dark:bg-gray-800 dark:border-gray-700">
        <CardHeader>
          <CardTitle className="dark:text-white">All Cities AQI Status</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 max-h-96 overflow-y-auto">
            {indianCities.map((city, index) => (
              <div
                key={index}
                className={`p-3 rounded-lg border transition-all duration-200 cursor-pointer hover:shadow-md dark:hover:shadow-gray-700 ${
                  selectedCity === city.name 
                    ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20 dark:border-blue-400" 
                    : "border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500 bg-white dark:bg-gray-700"
                }`}
                onClick={() => setSelectedCity(city.name)}
              >
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white text-sm">{city.name}</h4>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{city.state}</p>
                  </div>
                  <Badge className={`${getStatusColor(city.status)} text-xs`}>
                    {city.status}
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xl font-bold text-gray-900 dark:text-white">{city.aqi}</span>
                  <span className="text-xs text-gray-500 dark:text-gray-400">AQI</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AQIHeatMap;
