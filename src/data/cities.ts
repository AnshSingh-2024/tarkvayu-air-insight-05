
export interface CityData {
  name: string;
  state: string;
  lat: number;
  lng: number;
  population?: string;
  type: "metro" | "tier1" | "tier2" | "tier3" | "town";
  aqi?: number;
  status?: string;
  region: "north" | "south" | "east" | "west" | "central" | "northeast";
}

export const indianCities: CityData[] = [
  // Metro Cities
  { name: "Delhi", state: "Delhi", lat: 28.7041, lng: 77.1025, population: "3.2 Cr", type: "metro", region: "north", aqi: 324, status: "Hazardous" },
  { name: "Mumbai", state: "Maharashtra", lat: 19.0760, lng: 72.8777, population: "2.1 Cr", type: "metro", region: "west", aqi: 156, status: "Unhealthy" },
  { name: "Kolkata", state: "West Bengal", lat: 22.5726, lng: 88.3639, population: "1.5 Cr", type: "metro", region: "east", aqi: 178, status: "Unhealthy" },
  { name: "Chennai", state: "Tamil Nadu", lat: 13.0827, lng: 80.2707, population: "1.1 Cr", type: "metro", region: "south", aqi: 89, status: "Moderate" },
  { name: "Bangalore", state: "Karnataka", lat: 12.9716, lng: 77.5946, population: "1.3 Cr", type: "metro", region: "south", aqi: 65, status: "Moderate" },
  { name: "Hyderabad", state: "Telangana", lat: 17.3850, lng: 78.4867, population: "1.0 Cr", type: "metro", region: "south", aqi: 112, status: "Unhealthy" },

  // Tier 1 Cities
  { name: "Pune", state: "Maharashtra", lat: 18.5204, lng: 73.8567, population: "82 L", type: "tier1", region: "west", aqi: 98, status: "Moderate" },
  { name: "Ahmedabad", state: "Gujarat", lat: 23.0225, lng: 72.5714, population: "84 L", type: "tier1", region: "west", aqi: 142, status: "Unhealthy" },
  { name: "Jaipur", state: "Rajasthan", lat: 26.9124, lng: 75.7873, population: "35 L", type: "tier1", region: "west", aqi: 167, status: "Unhealthy" },
  { name: "Lucknow", state: "Uttar Pradesh", lat: 26.8467, lng: 80.9462, population: "32 L", type: "tier1", region: "north", aqi: 201, status: "Very Unhealthy" },
  { name: "Kanpur", state: "Uttar Pradesh", lat: 26.4499, lng: 80.3319, population: "28 L", type: "tier1", region: "north", aqi: 234, status: "Very Unhealthy" },
  { name: "Nagpur", state: "Maharashtra", lat: 21.1458, lng: 79.0882, population: "25 L", type: "tier1", region: "central", aqi: 98, status: "Moderate" },
  { name: "Indore", state: "Madhya Pradesh", lat: 22.7196, lng: 75.8577, population: "23 L", type: "tier1", region: "central", aqi: 123, status: "Unhealthy" },
  { name: "Patna", state: "Bihar", lat: 25.5941, lng: 85.1376, population: "21 L", type: "tier1", region: "east", aqi: 189, status: "Unhealthy" },
  { name: "Bhopal", state: "Madhya Pradesh", lat: 23.2599, lng: 77.4126, population: "19 L", type: "tier1", region: "central", aqi: 145, status: "Unhealthy" },
  { name: "Visakhapatnam", state: "Andhra Pradesh", lat: 17.6868, lng: 83.2185, population: "18 L", type: "tier1", region: "south", aqi: 87, status: "Moderate" },

  // North India Cities
  { name: "Ghaziabad", state: "Uttar Pradesh", lat: 28.6692, lng: 77.4538, population: "17 L", type: "tier1", region: "north", aqi: 267, status: "Very Unhealthy" },
  { name: "Noida", state: "Uttar Pradesh", lat: 28.5355, lng: 77.3910, population: "6 L", type: "tier1", region: "north", aqi: 245, status: "Very Unhealthy" },
  { name: "Gurugram", state: "Haryana", lat: 28.4595, lng: 77.0266, population: "9 L", type: "tier1", region: "north", aqi: 223, status: "Very Unhealthy" },
  { name: "Faridabad", state: "Haryana", lat: 28.4089, lng: 77.3178, population: "15 L", type: "tier1", region: "north", aqi: 234, status: "Very Unhealthy" },
  { name: "Varanasi", state: "Uttar Pradesh", lat: 25.3176, lng: 82.9739, population: "12 L", type: "tier1", region: "north", aqi: 198, status: "Unhealthy" },
  { name: "Agra", state: "Uttar Pradesh", lat: 27.1767, lng: 78.0081, population: "16 L", type: "tier1", region: "north", aqi: 178, status: "Unhealthy" },
  { name: "Meerut", state: "Uttar Pradesh", lat: 28.9845, lng: 77.7064, population: "14 L", type: "tier1", region: "north", aqi: 223, status: "Very Unhealthy" },
  { name: "Amritsar", state: "Punjab", lat: 31.6340, lng: 74.8723, population: "12 L", type: "tier1", region: "north", aqi: 156, status: "Unhealthy" },
  { name: "Chandigarh", state: "Chandigarh", lat: 30.7333, lng: 76.7794, population: "11 L", type: "tier1", region: "north", aqi: 143, status: "Unhealthy" },
  { name: "Ludhiana", state: "Punjab", lat: 30.9010, lng: 75.8573, population: "17 L", type: "tier1", region: "north", aqi: 167, status: "Unhealthy" },

  // More UP Cities
  { name: "Allahabad", state: "Uttar Pradesh", lat: 25.4358, lng: 81.8463, population: "12 L", type: "tier2", region: "north", aqi: 189, status: "Unhealthy" },
  { name: "Bareilly", state: "Uttar Pradesh", lat: 28.3670, lng: 79.4304, population: "9 L", type: "tier2", region: "north", aqi: 167, status: "Unhealthy" },
  { name: "Aligarh", state: "Uttar Pradesh", lat: 27.8974, lng: 78.0880, population: "9 L", type: "tier2", region: "north", aqi: 189, status: "Unhealthy" },
  { name: "Moradabad", state: "Uttar Pradesh", lat: 28.8386, lng: 78.7733, population: "9 L", type: "tier2", region: "north", aqi: 178, status: "Unhealthy" },
  { name: "Saharanpur", state: "Uttar Pradesh", lat: 29.9680, lng: 77.5552, population: "7 L", type: "tier2", region: "north", aqi: 198, status: "Unhealthy" },
  { name: "Gorakhpur", state: "Uttar Pradesh", lat: 26.7606, lng: 83.3732, population: "7 L", type: "tier2", region: "north", aqi: 156, status: "Unhealthy" },
  { name: "Jhansi", state: "Uttar Pradesh", lat: 25.4484, lng: 78.5685, population: "5 L", type: "tier2", region: "north", aqi: 134, status: "Unhealthy" },
  { name: "Mathura", state: "Uttar Pradesh", lat: 27.4924, lng: 77.6737, population: "4 L", type: "tier2", region: "north", aqi: 156, status: "Unhealthy" },
  { name: "Firozabad", state: "Uttar Pradesh", lat: 27.1592, lng: 78.3957, population: "6 L", type: "tier2", region: "north", aqi: 189, status: "Unhealthy" },
  { name: "Muzaffarnagar", state: "Uttar Pradesh", lat: 29.4727, lng: 77.7085, population: "4 L", type: "tier2", region: "north", aqi: 201, status: "Very Unhealthy" },

  // South India Cities
  { name: "Coimbatore", state: "Tamil Nadu", lat: 11.0168, lng: 76.9558, population: "11 L", type: "tier1", region: "south", aqi: 76, status: "Moderate" },
  { name: "Madurai", state: "Tamil Nadu", lat: 9.9252, lng: 78.1198, population: "10 L", type: "tier1", region: "south", aqi: 89, status: "Moderate" },
  { name: "Kochi", state: "Kerala", lat: 9.9312, lng: 76.2673, population: "6 L", type: "tier1", region: "south", aqi: 54, status: "Moderate" },
  { name: "Thiruvananthapuram", state: "Kerala", lat: 8.5241, lng: 76.9366, population: "10 L", type: "tier1", region: "south", aqi: 48, status: "Good" },
  { name: "Kozhikode", state: "Kerala", lat: 11.2588, lng: 75.7804, population: "6 L", type: "tier2", region: "south", aqi: 52, status: "Moderate" },
  { name: "Thrissur", state: "Kerala", lat: 10.5276, lng: 76.2144, population: "3 L", type: "tier2", region: "south", aqi: 45, status: "Good" },
  { name: "Mysore", state: "Karnataka", lat: 12.2958, lng: 76.6394, population: "9 L", type: "tier2", region: "south", aqi: 67, status: "Moderate" },
  { name: "Mangalore", state: "Karnataka", lat: 12.9141, lng: 74.8560, population: "5 L", type: "tier2", region: "south", aqi: 58, status: "Moderate" },
  { name: "Hubli", state: "Karnataka", lat: 15.3647, lng: 75.1240, population: "9 L", type: "tier2", region: "south", aqi: 78, status: "Moderate" },
  { name: "Vijayawada", state: "Andhra Pradesh", lat: 16.5062, lng: 80.6480, population: "11 L", type: "tier1", region: "south", aqi: 95, status: "Moderate" },
  { name: "Guntur", state: "Andhra Pradesh", lat: 16.3067, lng: 80.4365, population: "7 L", type: "tier2", region: "south", aqi: 87, status: "Moderate" },
  { name: "Nellore", state: "Andhra Pradesh", lat: 14.4426, lng: 79.9865, population: "5 L", type: "tier2", region: "south", aqi: 76, status: "Moderate" },
  { name: "Tirupati", state: "Andhra Pradesh", lat: 13.6288, lng: 79.4192, population: "4 L", type: "tier2", region: "south", aqi: 65, status: "Moderate" },
  { name: "Warangal", state: "Telangana", lat: 17.9689, lng: 79.5941, population: "8 L", type: "tier2", region: "south", aqi: 98, status: "Moderate" },
  { name: "Salem", state: "Tamil Nadu", lat: 11.6643, lng: 78.1460, population: "9 L", type: "tier2", region: "south", aqi: 87, status: "Moderate" },
  { name: "Tiruchirapalli", state: "Tamil Nadu", lat: 10.7905, lng: 78.7047, population: "9 L", type: "tier2", region: "south", aqi: 89, status: "Moderate" },
  { name: "Erode", state: "Tamil Nadu", lat: 11.3410, lng: 77.7172, population: "5 L", type: "tier2", region: "south", aqi: 78, status: "Moderate" },
  { name: "Vellore", state: "Tamil Nadu", lat: 12.9165, lng: 79.1325, population: "5 L", type: "tier2", region: "south", aqi: 76, status: "Moderate" },

  // West India Cities
  { name: "Surat", state: "Gujarat", lat: 21.1702, lng: 72.8311, population: "50 L", type: "tier1", region: "west", aqi: 156, status: "Unhealthy" },
  { name: "Vadodara", state: "Gujarat", lat: 22.3072, lng: 73.1812, population: "17 L", type: "tier1", region: "west", aqi: 134, status: "Unhealthy" },
  { name: "Rajkot", state: "Gujarat", lat: 22.3039, lng: 70.8022, population: "13 L", type: "tier1", region: "west", aqi: 123, status: "Unhealthy" },
  { name: "Bhavnagar", state: "Gujarat", lat: 21.7645, lng: 72.1519, population: "6 L", type: "tier2", region: "west", aqi: 112, status: "Unhealthy" },
  { name: "Jamnagar", state: "Gujarat", lat: 22.4707, lng: 70.0577, population: "6 L", type: "tier2", region: "west", aqi: 98, status: "Moderate" },
  { name: "Gandhinagar", state: "Gujarat", lat: 23.2156, lng: 72.6369, population: "2 L", type: "tier2", region: "west", aqi: 145, status: "Unhealthy" },
  { name: "Anand", state: "Gujarat", lat: 22.5645, lng: 72.9289, population: "2 L", type: "tier3", region: "west", aqi: 123, status: "Unhealthy" },
  { name: "Nashik", state: "Maharashtra", lat: 19.9975, lng: 73.7898, population: "15 L", type: "tier1", region: "west", aqi: 98, status: "Moderate" },
  { name: "Aurangabad", state: "Maharashtra", lat: 19.8762, lng: 75.3433, population: "12 L", type: "tier1", region: "west", aqi: 112, status: "Unhealthy" },
  { name: "Solapur", state: "Maharashtra", lat: 17.6599, lng: 75.9064, population: "9 L", type: "tier2", region: "west", aqi: 89, status: "Moderate" },
  { name: "Kolhapur", state: "Maharashtra", lat: 16.7050, lng: 74.2433, population: "5 L", type: "tier2", region: "west", aqi: 76, status: "Moderate" },
  { name: "Sangli", state: "Maharashtra", lat: 16.8524, lng: 74.5815, population: "5 L", type: "tier3", region: "west", aqi: 78, status: "Moderate" },

  // Rajasthan Cities
  { name: "Jodhpur", state: "Rajasthan", lat: 26.2389, lng: 73.0243, population: "11 L", type: "tier1", region: "west", aqi: 156, status: "Unhealthy" },
  { name: "Kota", state: "Rajasthan", lat: 25.2138, lng: 75.8648, population: "10 L", type: "tier2", region: "west", aqi: 134, status: "Unhealthy" },
  { name: "Bikaner", state: "Rajasthan", lat: 28.0229, lng: 73.3119, population: "6 L", type: "tier2", region: "west", aqi: 145, status: "Unhealthy" },
  { name: "Ajmer", state: "Rajasthan", lat: 26.4499, lng: 74.6399, population: "5 L", type: "tier2", region: "west", aqi: 123, status: "Unhealthy" },
  { name: "Udaipur", state: "Rajasthan", lat: 24.5854, lng: 73.7125, population: "5 L", type: "tier2", region: "west", aqi: 98, status: "Moderate" },
  { name: "Bharatpur", state: "Rajasthan", lat: 27.2152, lng: 77.4977, population: "3 L", type: "tier3", region: "west", aqi: 156, status: "Unhealthy" },
  { name: "Alwar", state: "Rajasthan", lat: 27.5530, lng: 76.6346, population: "3 L", type: "tier3", region: "west", aqi: 167, status: "Unhealthy" },

  // Central India
  { name: "Gwalior", state: "Madhya Pradesh", lat: 26.2183, lng: 78.1828, population: "11 L", type: "tier1", region: "central", aqi: 178, status: "Unhealthy" },
  { name: "Jabalpur", state: "Madhya Pradesh", lat: 23.1815, lng: 79.9864, population: "12 L", type: "tier1", region: "central", aqi: 134, status: "Unhealthy" },
  { name: "Ujjain", state: "Madhya Pradesh", lat: 23.1793, lng: 75.7849, population: "5 L", type: "tier2", region: "central", aqi: 145, status: "Unhealthy" },
  { name: "Sagar", state: "Madhya Pradesh", lat: 23.8388, lng: 78.7378, population: "3 L", type: "tier3", region: "central", aqi: 123, status: "Unhealthy" },
  { name: "Raipur", state: "Chhattisgarh", lat: 21.2514, lng: 81.6296, population: "10 L", type: "tier1", region: "central", aqi: 134, status: "Unhealthy" },
  { name: "Bhilai", state: "Chhattisgarh", lat: 21.1938, lng: 81.3509, population: "11 L", type: "tier2", region: "central", aqi: 145, status: "Unhealthy" },
  { name: "Korba", state: "Chhattisgarh", lat: 22.3595, lng: 82.7501, population: "4 L", type: "tier3", region: "central", aqi: 167, status: "Unhealthy" },

  // East India Cities
  { name: "Siliguri", state: "West Bengal", lat: 26.7271, lng: 88.3953, population: "5 L", type: "tier2", region: "east", aqi: 142, status: "Unhealthy" },
  { name: "Durgapur", state: "West Bengal", lat: 23.5204, lng: 87.3119, population: "6 L", type: "tier2", region: "east", aqi: 156, status: "Unhealthy" },
  { name: "Asansol", state: "West Bengal", lat: 23.6739, lng: 86.9524, population: "12 L", type: "tier2", region: "east", aqi: 167, status: "Unhealthy" },
  { name: "Howrah", state: "West Bengal", lat: 22.5958, lng: 88.2636, population: "11 L", type: "tier2", region: "east", aqi: 189, status: "Unhealthy" },
  { name: "Bhubaneswar", state: "Odisha", lat: 20.2961, lng: 85.8245, population: "9 L", type: "tier1", region: "east", aqi: 123, status: "Unhealthy" },
  { name: "Cuttack", state: "Odisha", lat: 20.4625, lng: 85.8828, population: "6 L", type: "tier2", region: "east", aqi: 134, status: "Unhealthy" },
  { name: "Rourkela", state: "Odisha", lat: 22.2604, lng: 84.8536, population: "5 L", type: "tier2", region: "east", aqi: 145, status: "Unhealthy" },
  { name: "Berhampur", state: "Odisha", lat: 19.3149, lng: 84.7941, population: "4 L", type: "tier3", region: "east", aqi: 112, status: "Unhealthy" },

  // Bihar Cities
  { name: "Gaya", state: "Bihar", lat: 24.7914, lng: 85.0002, population: "5 L", type: "tier2", region: "east", aqi: 178, status: "Unhealthy" },
  { name: "Bhagalpur", state: "Bihar", lat: 25.2425, lng: 86.9842, population: "4 L", type: "tier2", region: "east", aqi: 156, status: "Unhealthy" },
  { name: "Muzaffarpur", state: "Bihar", lat: 26.1209, lng: 85.3647, population: "4 L", type: "tier2", region: "east", aqi: 167, status: "Unhealthy" },
  { name: "Darbhanga", state: "Bihar", lat: 26.1542, lng: 85.8918, population: "3 L", type: "tier3", region: "east", aqi: 145, status: "Unhealthy" },
  { name: "Purnia", state: "Bihar", lat: 25.7774, lng: 87.4753, population: "3 L", type: "tier3", region: "east", aqi: 134, status: "Unhealthy" },

  // Jharkhand Cities
  { name: "Ranchi", state: "Jharkhand", lat: 23.3441, lng: 85.3096, population: "11 L", type: "tier1", region: "east", aqi: 145, status: "Unhealthy" },
  { name: "Jamshedpur", state: "Jharkhand", lat: 22.8046, lng: 86.2029, population: "6 L", type: "tier2", region: "east", aqi: 167, status: "Unhealthy" },
  { name: "Dhanbad", state: "Jharkhand", lat: 23.7957, lng: 86.4304, population: "12 L", type: "tier2", region: "east", aqi: 189, status: "Unhealthy" },
  { name: "Bokaro", state: "Jharkhand", lat: 23.6693, lng: 86.1511, population: "5 L", type: "tier3", region: "east", aqi: 156, status: "Unhealthy" },

  // Northeast India Cities
  { name: "Guwahati", state: "Assam", lat: 26.1445, lng: 91.7362, population: "10 L", type: "tier1", region: "northeast", aqi: 89, status: "Moderate" },
  { name: "Dibrugarh", state: "Assam", lat: 27.4728, lng: 94.9120, population: "2 L", type: "tier3", region: "northeast", aqi: 76, status: "Moderate" },
  { name: "Silchar", state: "Assam", lat: 24.8333, lng: 92.7789, population: "2 L", type: "tier3", region: "northeast", aqi: 78, status: "Moderate" },
  { name: "Jorhat", state: "Assam", lat: 26.7509, lng: 94.2037, population: "2 L", type: "tier3", region: "northeast", aqi: 67, status: "Moderate" },
  { name: "Imphal", state: "Manipur", lat: 24.8170, lng: 93.9368, population: "3 L", type: "tier2", region: "northeast", aqi: 76, status: "Moderate" },
  { name: "Agartala", state: "Tripura", lat: 23.8315, lng: 91.2868, population: "4 L", type: "tier2", region: "northeast", aqi: 87, status: "Moderate" },
  { name: "Aizawl", state: "Mizoram", lat: 23.1645, lng: 92.9376, population: "3 L", type: "tier3", region: "northeast", aqi: 45, status: "Good" },
  { name: "Shillong", state: "Meghalaya", lat: 25.5788, lng: 91.8933, population: "1 L", type: "tier3", region: "northeast", aqi: 42, status: "Good" },
  { name: "Kohima", state: "Nagaland", lat: 25.6751, lng: 94.1086, population: "1 L", type: "tier3", region: "northeast", aqi: 38, status: "Good" },
  { name: "Itanagar", state: "Arunachal Pradesh", lat: 27.0844, lng: 93.6053, population: "1 L", type: "tier3", region: "northeast", aqi: 35, status: "Good" },

  // Hill Stations and Special Cities
  { name: "Shimla", state: "Himachal Pradesh", lat: 31.1048, lng: 77.1734, population: "2 L", type: "tier3", region: "north", aqi: 32, status: "Good" },
  { name: "Manali", state: "Himachal Pradesh", lat: 32.2396, lng: 77.1887, population: "1 L", type: "town", region: "north", aqi: 28, status: "Good" },
  { name: "Dharamshala", state: "Himachal Pradesh", lat: 32.2190, lng: 76.3234, population: "1 L", type: "town", region: "north", aqi: 30, status: "Good" },
  { name: "Kullu", state: "Himachal Pradesh", lat: 31.9578, lng: 77.1092, population: "1 L", type: "town", region: "north", aqi: 25, status: "Good" },
  { name: "Solan", state: "Himachal Pradesh", lat: 30.9045, lng: 77.0967, population: "1 L", type: "town", region: "north", aqi: 45, status: "Good" },
  { name: "Dehradun", state: "Uttarakhand", lat: 30.3165, lng: 78.0322, population: "7 L", type: "tier2", region: "north", aqi: 98, status: "Moderate" },
  { name: "Haridwar", state: "Uttarakhand", lat: 29.9457, lng: 78.1642, population: "2 L", type: "tier3", region: "north", aqi: 123, status: "Unhealthy" },
  { name: "Rishikesh", state: "Uttarakhand", lat: 30.0869, lng: 78.2676, population: "1 L", type: "town", region: "north", aqi: 87, status: "Moderate" },
  { name: "Nainital", state: "Uttarakhand", lat: 29.3803, lng: 79.4636, population: "1 L", type: "town", region: "north", aqi: 42, status: "Good" },
  { name: "Mussoorie", state: "Uttarakhand", lat: 30.4598, lng: 78.0664, population: "1 L", type: "town", region: "north", aqi: 38, status: "Good" },

  // Kashmir Valley
  { name: "Srinagar", state: "Jammu and Kashmir", lat: 34.0837, lng: 74.7973, population: "12 L", type: "tier1", region: "north", aqi: 65, status: "Moderate" },
  { name: "Jammu", state: "Jammu and Kashmir", lat: 32.7266, lng: 74.8570, population: "5 L", type: "tier2", region: "north", aqi: 98, status: "Moderate" },
  { name: "Leh", state: "Ladakh", lat: 34.1526, lng: 77.5771, population: "1 L", type: "town", region: "north", aqi: 20, status: "Good" },

  // Goa
  { name: "Panaji", state: "Goa", lat: 15.4909, lng: 73.8278, population: "1 L", type: "tier3", region: "west", aqi: 52, status: "Moderate" },
  { name: "Margao", state: "Goa", lat: 15.2832, lng: 73.9862, population: "1 L", type: "town", region: "west", aqi: 48, status: "Good" },
  { name: "Vasco da Gama", state: "Goa", lat: 15.3955, lng: 73.8154, population: "1 L", type: "town", region: "west", aqi: 56, status: "Moderate" },

  // Industrial Towns and Smaller Cities
  { name: "Rourkela", state: "Odisha", lat: 22.2604, lng: 84.8536, population: "5 L", type: "tier2", region: "east", aqi: 145, status: "Unhealthy" },
  { name: "Durgapur", state: "West Bengal", lat: 23.5204, lng: 87.3119, population: "6 L", type: "tier2", region: "east", aqi: 156, status: "Unhealthy" },
  { name: "Bhilai", state: "Chhattisgarh", lat: 21.1938, lng: 81.3509, population: "11 L", type: "tier2", region: "central", aqi: 145, status: "Unhealthy" },
  { name: "Salem", state: "Tamil Nadu", lat: 11.6643, lng: 78.1460, population: "9 L", type: "tier2", region: "south", aqi: 87, status: "Moderate" },
  { name: "Tirunelveli", state: "Tamil Nadu", lat: 8.7139, lng: 77.7567, population: "5 L", type: "tier3", region: "south", aqi: 76, status: "Moderate" },
  { name: "Thanjavur", state: "Tamil Nadu", lat: 10.7870, lng: 79.1378, population: "2 L", type: "tier3", region: "south", aqi: 78, status: "Moderate" },
  { name: "Karur", state: "Tamil Nadu", lat: 10.9601, lng: 78.0766, population: "1 L", type: "town", region: "south", aqi: 89, status: "Moderate" },
  { name: "Dindigul", state: "Tamil Nadu", lat: 10.3673, lng: 77.9803, population: "2 L", type: "tier3", region: "south", aqi: 87, status: "Moderate" },

  // More Smaller Cities and Towns (to reach 200+)
  { name: "Cuddalore", state: "Tamil Nadu", lat: 11.7480, lng: 79.7714, population: "2 L", type: "tier3", region: "south", aqi: 76, status: "Moderate" },
  { name: "Kumbakonam", state: "Tamil Nadu", lat: 10.9601, lng: 79.3788, population: "1 L", type: "town", region: "south", aqi: 78, status: "Moderate" },
  { name: "Neyveli", state: "Tamil Nadu", lat: 11.6196, lng: 79.4895, population: "1 L", type: "town", region: "south", aqi: 98, status: "Moderate" },
  { name: "Pudukkottai", state: "Tamil Nadu", lat: 10.3833, lng: 78.8167, population: "1 L", type: "town", region: "south", aqi: 67, status: "Moderate" },
  { name: "Ramanathapuram", state: "Tamil Nadu", lat: 9.3763, lng: 78.8308, population: "1 L", type: "town", region: "south", aqi: 65, status: "Moderate" },
  { name: "Sivakasi", state: "Tamil Nadu", lat: 9.4530, lng: 77.7908, population: "1 L", type: "town", region: "south", aqi: 89, status: "Moderate" },
  { name: "Tenkasi", state: "Tamil Nadu", lat: 8.9598, lng: 77.3152, population: "1 L", type: "town", region: "south", aqi: 76, status: "Moderate" },
  { name: "Tuticorin", state: "Tamil Nadu", lat: 8.7642, lng: 78.1348, population: "2 L", type: "tier3", region: "south", aqi: 87, status: "Moderate" },
  { name: "Villupuram", state: "Tamil Nadu", lat: 11.9401, lng: 79.4861, population: "1 L", type: "town", region: "south", aqi: 78, status: "Moderate" },
  { name: "Chidambaram", state: "Tamil Nadu", lat: 11.3994, lng: 79.6914, population: "1 L", type: "town", region: "south", aqi: 67, status: "Moderate" },

  // Kerala Towns
  { name: "Kollam", state: "Kerala", lat: 8.8932, lng: 76.6141, population: "4 L", type: "tier3", region: "south", aqi: 52, status: "Moderate" },
  { name: "Alappuzha", state: "Kerala", lat: 9.4981, lng: 76.3388, population: "2 L", type: "tier3", region: "south", aqi: 48, status: "Good" },
  { name: "Palakkad", state: "Kerala", lat: 10.7867, lng: 76.6548, population: "3 L", type: "tier3", region: "south", aqi: 56, status: "Moderate" },
  { name: "Malappuram", state: "Kerala", lat: 11.0510, lng: 76.0711, population: "2 L", type: "tier3", region: "south", aqi: 54, status: "Moderate" },
  { name: "Kannur", state: "Kerala", lat: 11.8745, lng: 75.3704, population: "2 L", type: "tier3", region: "south", aqi: 45, status: "Good" },
  { name: "Kasaragod", state: "Kerala", lat: 12.4996, lng: 74.9869, population: "1 L", type: "town", region: "south", aqi: 42, status: "Good" },
  { name: "Kottayam", state: "Kerala", lat: 9.5916, lng: 76.5222, population: "2 L", type: "tier3", region: "south", aqi: 48, status: "Good" },
  { name: "Pathanamthitta", state: "Kerala", lat: 9.2648, lng: 76.7870, population: "1 L", type: "town", region: "south", aqi: 45, status: "Good" },

  // Karnataka Towns
  { name: "Bellary", state: "Karnataka", lat: 15.1394, lng: 76.9214, population: "4 L", type: "tier3", region: "south", aqi: 98, status: "Moderate" },
  { name: "Gulbarga", state: "Karnataka", lat: 17.3297, lng: 76.8343, population: "5 L", type: "tier3", region: "south", aqi: 89, status: "Moderate" },
  { name: "Davangere", state: "Karnataka", lat: 14.4644, lng: 75.9217, population: "4 L", type: "tier3", region: "south", aqi: 87, status: "Moderate" },
  { name: "Bijapur", state: "Karnataka", lat: 16.8302, lng: 75.7100, population: "3 L", type: "tier3", region: "south", aqi: 78, status: "Moderate" },
  { name: "Shimoga", state: "Karnataka", lat: 13.9299, lng: 75.5681, population: "3 L", type: "tier3", region: "south", aqi: 67, status: "Moderate" },
  { name: "Tumkur", state: "Karnataka", lat: 13.3379, lng: 77.1186, population: "3 L", type: "tier3", region: "south", aqi: 76, status: "Moderate" },
  { name: "Raichur", state: "Karnataka", lat: 16.2120, lng: 77.3439, population: "2 L", type: "tier3", region: "south", aqi: 87, status: "Moderate" },
  { name: "Bidar", state: "Karnataka", lat: 17.9104, lng: 77.5199, population: "2 L", type: "tier3", region: "south", aqi: 89, status: "Moderate" },
  { name: "Hospet", state: "Karnataka", lat: 15.2691, lng: 76.3874, population: "2 L", type: "town", region: "south", aqi: 98, status: "Moderate" },
  { name: "Gadag", state: "Karnataka", lat: 15.4167, lng: 75.6167, population: "2 L", type: "town", region: "south", aqi: 78, status: "Moderate" },

  // Add more cities to reach 200+ total count
  { name: "Ahmednagar", state: "Maharashtra", lat: 19.0948, lng: 74.7480, population: "4 L", type: "tier3", region: "west", aqi: 112, status: "Unhealthy" },
  { name: "Akola", state: "Maharashtra", lat: 20.7002, lng: 77.0082, population: "5 L", type: "tier3", region: "west", aqi: 98, status: "Moderate" },
  { name: "Amravati", state: "Maharashtra", lat: 20.9319, lng: 77.7523, population: "6 L", type: "tier3", region: "west", aqi: 89, status: "Moderate" },
  { name: "Chandrapur", state: "Maharashtra", lat: 19.9615, lng: 79.2961, population: "3 L", type: "tier3", region: "central", aqi: 134, status: "Unhealthy" },
  { name: "Dhule", state: "Maharashtra", lat: 20.9042, lng: 74.7749, population: "4 L", type: "tier3", region: "west", aqi: 98, status: "Moderate" },
  { name: "Ichalkaranji", state: "Maharashtra", lat: 16.6889, lng: 74.4603, population: "3 L", type: "town", region: "west", aqi: 76, status: "Moderate" },
  { name: "Jalgaon", state: "Maharashtra", lat: 21.0077, lng: 75.5626, population: "5 L", type: "tier3", region: "west", aqi: 98, status: "Moderate" },
  { name: "Latur", state: "Maharashtra", lat: 18.4088, lng: 76.5604, population: "4 L", type: "tier3", region: "west", aqi: 87, status: "Moderate" },
  { name: "Malegaon", state: "Maharashtra", lat: 20.5579, lng: 74.5288, population: "5 L", type: "tier3", region: "west", aqi: 112, status: "Unhealthy" },
  { name: "Nanded", state: "Maharashtra", lat: 19.1383, lng: 77.3210, population: "5 L", type: "tier3", region: "central", aqi: 98, status: "Moderate" },
  { name: "Osmanabad", state: "Maharashtra", lat: 18.1760, lng: 76.0343, population: "1 L", type: "town", region: "west", aqi: 89, status: "Moderate" },
  { name: "Parbhani", state: "Maharashtra", lat: 19.2608, lng: 76.7734, population: "3 L", type: "tier3", region: "central", aqi: 98, status: "Moderate" },
  { name: "Satara", state: "Maharashtra", lat: 17.6805, lng: 74.0183, population: "1 L", type: "town", region: "west", aqi: 76, status: "Moderate" },
  { name: "Wardha", state: "Maharashtra", lat: 20.7453, lng: 78.6022, population: "1 L", type: "town", region: "central", aqi: 98, status: "Moderate" },
  { name: "Yavatmal", state: "Maharashtra", lat: 20.3897, lng: 78.1215, population: "1 L", type: "town", region: "central", aqi: 112, status: "Unhealthy" }
];

// Generate mock AQI data for cities without predefined AQI
export const getCityAQI = (cityName: string): number => {
  const city = indianCities.find(c => c.name === cityName);
  if (city?.aqi) return city.aqi;
  
  // Generate consistent mock data based on city name hash
  let hash = 0;
  for (let i = 0; i < cityName.length; i++) {
    const char = cityName.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32bit integer
  }
  
  // Generate AQI based on region and city type
  const baseAQI = city?.region === 'northeast' ? 50 :
                  city?.region === 'south' ? 70 :
                  city?.region === 'west' ? 110 :
                  city?.region === 'central' ? 130 :
                  city?.region === 'east' ? 140 : 180;
  
  const variation = Math.abs(hash % 60) - 30; // ±30 variation
  return Math.max(20, Math.min(400, baseAQI + variation));
};

export const getAQIStatus = (aqi: number) => {
  if (aqi <= 50) return "Good";
  if (aqi <= 100) return "Moderate";
  if (aqi <= 150) return "Unhealthy for Sensitive";
  if (aqi <= 200) return "Unhealthy";
  if (aqi <= 300) return "Very Unhealthy";
  return "Hazardous";
};
