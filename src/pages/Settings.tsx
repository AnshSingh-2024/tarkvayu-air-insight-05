import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import NotificationSettings from "../components/NotificationSettings";
import LanguageToggle from "../components/LanguageToggle";
import { useLanguage } from "../contexts/LanguageContext";
import { Bell, MapPin, User, Shield, Smartphone, Clock, Save, Languages } from "lucide-react";

const Settings = () => {
  const { language, setLanguage, t } = useLanguage();
  const [settings, setSettings] = useState({
    // Notification Settings
    pollutionAlerts: true,
    healthTips: true,
    nightMode: true,
    weeklyReports: false,
    emergencyAlerts: true,
    
    // Location Settings
    autoLocation: true,
    defaultCity: "Delhi",
    radius: "5",
    
    // Personal Settings
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+91 98765 43210",
    ageGroup: "25-35",
    healthConditions: "none",
    
    // App Settings
    units: "metric",
    theme: "light",
    dataUsage: "standard"
  });

  const handleSettingChange = (key: string, value: any) => {
    setSettings(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleSave = () => {
    console.log("Saving settings:", settings);
    // Add save logic here
  };

  const cities = [
    "Delhi", "Mumbai", "Kolkata", "Chennai", "Bangalore", 
    "Hyderabad", "Ahmedabad", "Pune", "Jaipur", "Lucknow"
  ];

  const isHindi = language === 'hindi';

  return (
    <div className="min-h-screen py-8 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            {isHindi ? 'सेटिंग्स और प्राथमिकताएं' : 'Settings & Preferences'}
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            {isHindi 
              ? 'अपने TarkVayu अनुभव और सूचना प्राथमिकताओं को अनुकूलित करें'
              : 'Customize your TarkVayu experience and notification preferences'
            }
          </p>
        </div>

        <div className="space-y-8">
          {/* Language Settings - New Section */}
          <Card className="dark:bg-gray-800 dark:border-gray-700">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 dark:text-white">
                <Languages className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                <span>{isHindi ? 'भाषा सेटिंग्स' : 'Language Settings'}</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <LanguageToggle 
                currentLanguage={language}
                onLanguageChange={setLanguage}
              />
              <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <p className="text-sm text-blue-700 dark:text-blue-300">
                  {isHindi 
                    ? '📢 भाषा बदलने के बाद, ऐप पूरी तरह से आपकी चुनी गई भाषा में दिखाई देगा।'
                    : '📢 After changing language, the entire app will be displayed in your selected language.'
                  }
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Notification Settings */}
          <Card className="dark:bg-gray-800 dark:border-gray-700">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 dark:text-white">
                <Bell className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                <span>{isHindi ? 'सूचना प्राथमिकताएं' : 'Notification Preferences'}</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <NotificationSettings />
            </CardContent>
          </Card>

          {/* Location Settings */}
          <Card className="dark:bg-gray-800 dark:border-gray-700">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 dark:text-white">
                <MapPin className="h-5 w-5 text-green-600 dark:text-green-400" />
                <span>{isHindi ? 'स्थान सेटिंग्स' : 'Location Settings'}</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-base font-medium dark:text-white">
                    {isHindi ? 'ऑटो-डिटेक्ट स्थान' : 'Auto-detect Location'}
                  </Label>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {isHindi 
                      ? 'AQI डेटा के लिए अपने वर्तमान स्थान को स्वचालित रूप से खोजें'
                      : 'Automatically detect your current location for AQI data'
                    }
                  </p>
                </div>
                <Switch
                  checked={settings.autoLocation}
                  onCheckedChange={(checked) => handleSettingChange("autoLocation", checked)}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="defaultCity" className="dark:text-white">
                    {isHindi ? 'डिफ़ॉल्ट शहर' : 'Default City'}
                  </Label>
                  <Select value={settings.defaultCity} onValueChange={(value) => handleSettingChange("defaultCity", value)}>
                    <SelectTrigger className="dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="dark:bg-gray-700 dark:border-gray-600">
                      {cities.map((city) => (
                        <SelectItem key={city} value={city} className="dark:text-white dark:hover:bg-gray-600">
                          {city}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="radius" className="dark:text-white">
                    {isHindi ? 'अलर्ट रेडियस (km)' : 'Alert Radius (km)'}
                  </Label>
                  <Select value={settings.radius} onValueChange={(value) => handleSettingChange("radius", value)}>
                    <SelectTrigger className="dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="dark:bg-gray-700 dark:border-gray-600">
                      <SelectItem value="1" className="dark:text-white dark:hover:bg-gray-600">1 km</SelectItem>
                      <SelectItem value="5" className="dark:text-white dark:hover:bg-gray-600">5 km</SelectItem>
                      <SelectItem value="10" className="dark:text-white dark:hover:bg-gray-600">10 km</SelectItem>
                      <SelectItem value="25" className="dark:text-white dark:hover:bg-gray-600">25 km</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Personal Information */}
          <Card className="dark:bg-gray-800 dark:border-gray-700">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 dark:text-white">
                <User className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                <span>{isHindi ? 'व्यक्तिगत जानकारी' : 'Personal Information'}</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name" className="dark:text-white">
                    {isHindi ? 'पूरा नाम' : 'Full Name'}
                  </Label>
                  <Input
                    id="name"
                    value={settings.name}
                    onChange={(e) => handleSettingChange("name", e.target.value)}
                    className="dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="dark:text-white">
                    {isHindi ? 'ईमेल पता' : 'Email Address'}
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={settings.email}
                    onChange={(e) => handleSettingChange("email", e.target.value)}
                    className="dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone" className="dark:text-white">
                    {isHindi ? 'फोन नंबर' : 'Phone Number'}
                  </Label>
                  <Input
                    id="phone"
                    value={settings.phone}
                    onChange={(e) => handleSettingChange("phone", e.target.value)}
                    className="dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="ageGroup" className="dark:text-white">
                    {isHindi ? 'आयु समूह' : 'Age Group'}
                  </Label>
                  <Select value={settings.ageGroup} onValueChange={(value) => handleSettingChange("ageGroup", value)}>
                    <SelectTrigger className="dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="dark:bg-gray-700 dark:border-gray-600">
                      <SelectItem value="under-18" className="dark:text-white dark:hover:bg-gray-600">
                        {isHindi ? '18 से कम' : 'Under 18'}
                      </SelectItem>
                      <SelectItem value="18-25" className="dark:text-white dark:hover:bg-gray-600">18-25</SelectItem>
                      <SelectItem value="25-35" className="dark:text-white dark:hover:bg-gray-600">25-35</SelectItem>
                      <SelectItem value="35-50" className="dark:text-white dark:hover:bg-gray-600">35-50</SelectItem>
                      <SelectItem value="50-65" className="dark:text-white dark:hover:bg-gray-600">50-65</SelectItem>
                      <SelectItem value="over-65" className="dark:text-white dark:hover:bg-gray-600">
                        {isHindi ? '65 से अधिक' : 'Over 65'}
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="healthConditions" className="dark:text-white">
                  {isHindi ? 'स्वास्थ्य स्थितियां (वैकल्पिक)' : 'Health Conditions (Optional)'}
                </Label>
                <Select value={settings.healthConditions} onValueChange={(value) => handleSettingChange("healthConditions", value)}>
                  <SelectTrigger className="dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="dark:bg-gray-700 dark:border-gray-600">
                    <SelectItem value="none" className="dark:text-white dark:hover:bg-gray-600">
                      {isHindi ? 'कोई नहीं' : 'None'}
                    </SelectItem>
                    <SelectItem value="asthma" className="dark:text-white dark:hover:bg-gray-600">
                      {isHindi ? 'अस्थमा' : 'Asthma'}
                    </SelectItem>
                    <SelectItem value="copd" className="dark:text-white dark:hover:bg-gray-600">COPD</SelectItem>
                    <SelectItem value="heart-disease" className="dark:text-white dark:hover:bg-gray-600">
                      {isHindi ? 'हृदय रोग' : 'Heart Disease'}
                    </SelectItem>
                    <SelectItem value="diabetes" className="dark:text-white dark:hover:bg-gray-600">
                      {isHindi ? 'डायबिटीज' : 'Diabetes'}
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* App Preferences */}
          <Card className="dark:bg-gray-800 dark:border-gray-700">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 dark:text-white">
                <Smartphone className="h-5 w-5 text-orange-600 dark:text-orange-400" />
                <span>{isHindi ? 'ऐप प्राथमिकताएं' : 'App Preferences'}</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="units" className="dark:text-white">
                    {isHindi ? 'इकाइयां' : 'Units'}
                  </Label>
                  <Select value={settings.units} onValueChange={(value) => handleSettingChange("units", value)}>
                    <SelectTrigger className="dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="dark:bg-gray-700 dark:border-gray-600">
                      <SelectItem value="metric" className="dark:text-white dark:hover:bg-gray-600">
                        {isHindi ? 'मेट्रिक (μg/m³, km)' : 'Metric (μg/m³, km)'}
                      </SelectItem>
                      <SelectItem value="imperial" className="dark:text-white dark:hover:bg-gray-600">
                        Imperial (ppm, miles)
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="theme" className="dark:text-white">
                    {isHindi ? 'थीम' : 'Theme'}
                  </Label>
                  <Select value={settings.theme} onValueChange={(value) => handleSettingChange("theme", value)}>
                    <SelectTrigger className="dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="dark:bg-gray-700 dark:border-gray-600">
                      <SelectItem value="light" className="dark:text-white dark:hover:bg-gray-600">
                        {isHindi ? 'हल्का' : 'Light'}
                      </SelectItem>
                      <SelectItem value="dark" className="dark:text-white dark:hover:bg-gray-600">
                        {isHindi ? 'गहरा' : 'Dark'}
                      </SelectItem>
                      <SelectItem value="auto" className="dark:text-white dark:hover:bg-gray-600">
                        {isHindi ? 'ऑटो' : 'Auto'}
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="dataUsage" className="dark:text-white">
                    {isHindi ? 'डेटा उपयोग' : 'Data Usage'}
                  </Label>
                  <Select value={settings.dataUsage} onValueChange={(value) => handleSettingChange("dataUsage", value)}>
                    <SelectTrigger className="dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="dark:bg-gray-700 dark:border-gray-600">
                      <SelectItem value="low" className="dark:text-white dark:hover:bg-gray-600">
                        {isHindi ? 'कम (केवल बुनियादी डेटा)' : 'Low (Basic data only)'}
                      </SelectItem>
                      <SelectItem value="standard" className="dark:text-white dark:hover:bg-gray-600">
                        {isHindi ? 'मानक' : 'Standard'}
                      </SelectItem>
                      <SelectItem value="high" className="dark:text-white dark:hover:bg-gray-600">
                        {isHindi ? 'उच्च (सभी सुविधाएं)' : 'High (Full features)'}
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Privacy & Security */}
          <Card className="dark:bg-gray-800 dark:border-gray-700">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 dark:text-white">
                <Shield className="h-5 w-5 text-red-600 dark:text-red-400" />
                <span>{isHindi ? 'गोपनीयता और सुरक्षा' : 'Privacy & Security'}</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-base font-medium dark:text-white">
                    {isHindi ? 'गुमनाम उपयोग डेटा साझा करें' : 'Share Anonymous Usage Data'}
                  </Label>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {isHindi 
                      ? 'गुमनाम उपयोग आंकड़े साझा करके TarkVayu को बेहतर बनाने में मदद करें'
                      : 'Help improve TarkVayu by sharing anonymous usage statistics'
                    }
                  </p>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-base font-medium dark:text-white">
                    {isHindi ? 'स्थान इतिहास' : 'Location History'}
                  </Label>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {isHindi 
                      ? 'व्यक्तिगत अंतर्दृष्टि के लिए स्थान इतिहास संग्रहीत करें'
                      : 'Store location history for personalized insights'
                    }
                  </p>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-base font-medium dark:text-white">
                    {isHindi ? 'डेटा एक्सपोर्ट' : 'Data Export'}
                  </Label>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {isHindi 
                      ? 'अपने व्यक्तिगत डेटा को एक्सपोर्ट करने की अनुमति दें'
                      : 'Allow exporting your personal data'
                    }
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
            </CardContent>
          </Card>

          {/* Save Button */}
          <div className="flex justify-end">
            <Button onClick={handleSave} className="flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700">
              <Save className="h-4 w-4" />
              <span>{isHindi ? 'सेटिंग्स सेव करें' : 'Save Settings'}</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
