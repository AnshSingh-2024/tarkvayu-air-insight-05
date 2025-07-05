
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { 
  Bell, 
  Globe, 
  Moon, 
  Sun, 
  Smartphone, 
  Mail, 
  Shield, 
  Database,
  User,
  MapPin,
  Clock,
  Palette
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import NotificationSettings from "../components/NotificationSettings";

const Settings = () => {
  const { language, setLanguage, t } = useLanguage();
  const [theme, setTheme] = useState("system");
  const [notifications, setNotifications] = useState({
    push: true,
    email: false,
    sms: false,
    dailyReport: true,
    airQualityAlerts: true,
    healthTips: false
  });
  const [privacy, setPrivacy] = useState({
    shareLocation: true,
    shareData: false,
    analytics: true
  });

  const handleNotificationChange = (key: string, value: boolean) => {
    setNotifications(prev => ({ ...prev, [key]: value }));
  };

  const handlePrivacyChange = (key: string, value: boolean) => {
    setPrivacy(prev => ({ ...prev, [key]: value }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-green-50 to-cyan-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            {t('settings.title')}
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Customize your TarkVayu experience and preferences
          </p>
        </div>

        <div className="space-y-6">
          {/* Profile Settings */}
          <Card className="shadow-lg border-0 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
            <CardHeader className="bg-gradient-to-r from-blue-50 to-green-50 dark:from-gray-700 dark:to-gray-600 rounded-t-lg">
              <CardTitle className="flex items-center space-x-2 text-gray-900 dark:text-white">
                <User className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                <span>Profile Settings</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name" className="text-gray-700 dark:text-gray-300 font-medium">Full Name</Label>
                  <Input
                    id="name"
                    placeholder="Enter your name"
                    className="mt-1 bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                  />
                </div>
                <div>
                  <Label htmlFor="email" className="text-gray-700 dark:text-gray-300 font-medium">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    className="mt-1 bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="location" className="text-gray-700 dark:text-gray-300 font-medium">Default Location</Label>
                <div className="flex items-center space-x-2 mt-1">
                  <MapPin className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                  <Input
                    id="location"
                    placeholder="Enter your city"
                    className="bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* App Preferences */}
          <Card className="shadow-lg border-0 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
            <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-gray-700 dark:to-gray-600 rounded-t-lg">
              <CardTitle className="flex items-center space-x-2 text-gray-900 dark:text-white">
                <Palette className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                <span>App Preferences</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-6">
              {/* Theme Settings */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                    {theme === "dark" ? (
                      <Moon className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                    ) : (
                      <Sun className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                    )}
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900 dark:text-white">Theme</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300">Choose your preferred theme</p>
                  </div>
                </div>
                <Select value={theme} onValueChange={setTheme}>
                  <SelectTrigger className="w-32 bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600 text-gray-900 dark:text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-600">
                    <SelectItem value="light" className="text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">Light</SelectItem>
                    <SelectItem value="dark" className="text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">Dark</SelectItem>
                    <SelectItem value="system" className="text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">System</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Separator className="dark:bg-gray-600" />

              {/* Language Settings */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
                    <Globe className="h-5 w-5 text-green-600 dark:text-green-400" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900 dark:text-white">Language</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300">Select your preferred language</p>
                  </div>
                </div>
                <Select value={language} onValueChange={setLanguage}>
                  <SelectTrigger className="w-32 bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600 text-gray-900 dark:text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-600">
                    <SelectItem value="en" className="text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">English</SelectItem>
                    <SelectItem value="hi" className="text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">हिंदी</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Separator className="dark:bg-gray-600" />

              {/* Update Frequency */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-orange-100 dark:bg-orange-900/30 rounded-lg">
                    <Clock className="h-5 w-5 text-orange-600 dark:text-orange-400" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900 dark:text-white">Data Update Frequency</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300">How often to refresh AQI data</p>
                  </div>
                </div>
                <Select defaultValue="15min">
                  <SelectTrigger className="w-32 bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600 text-gray-900 dark:text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-600">
                    <SelectItem value="5min" className="text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">5 minutes</SelectItem>
                    <SelectItem value="15min" className="text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">15 minutes</SelectItem>
                    <SelectItem value="30min" className="text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">30 minutes</SelectItem>
                    <SelectItem value="1hour" className="text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">1 hour</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Notifications */}
          <NotificationSettings />

          {/* Privacy Settings */}
          <Card className="shadow-lg border-0 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
            <CardHeader className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-gray-700 dark:to-gray-600 rounded-t-lg">
              <CardTitle className="flex items-center space-x-2 text-gray-900 dark:text-white">
                <Shield className="h-5 w-5 text-green-600 dark:text-green-400" />
                <span>Privacy Settings</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium text-gray-900 dark:text-white">Share Location Data</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">Allow app to use your location for better recommendations</p>
                </div>
                <Switch
                  checked={privacy.shareLocation}
                  onCheckedChange={(checked) => handlePrivacyChange("shareLocation", checked)}
                />
              </div>

              <Separator className="dark:bg-gray-600" />

              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium text-gray-900 dark:text-white">Share Anonymous Data</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">Help improve our service by sharing anonymous usage data</p>
                </div>
                <Switch
                  checked={privacy.shareData}
                  onCheckedChange={(checked) => handlePrivacyChange("shareData", checked)}
                />
              </div>

              <Separator className="dark:bg-gray-600" />

              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium text-gray-900 dark:text-white">Analytics</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">Allow analytics to help us improve the app</p>
                </div>
                <Switch
                  checked={privacy.analytics}
                  onCheckedChange={(checked) => handlePrivacyChange("analytics", checked)}
                />
              </div>
            </CardContent>
          </Card>

          {/* Data Management */}
          <Card className="shadow-lg border-0 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
            <CardHeader className="bg-gradient-to-r from-red-50 to-orange-50 dark:from-gray-700 dark:to-gray-600 rounded-t-lg">
              <CardTitle className="flex items-center space-x-2 text-gray-900 dark:text-white">
                <Database className="h-5 w-5 text-red-600 dark:text-red-400" />
                <span>Data Management</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Button variant="outline" className="border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700">
                  Export Data
                </Button>
                <Button variant="outline" className="border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20">
                  Clear All Data
                </Button>
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Export your data or clear all stored information from the app
              </p>
            </CardContent>
          </Card>

          {/* About */}
          <Card className="shadow-lg border-0 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium text-gray-900 dark:text-white">TarkVayu</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">Version 1.0.0</p>
                </div>
                <Badge variant="secondary" className="bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300">
                  Latest
                </Badge>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Settings;
