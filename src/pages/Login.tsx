
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Eye, EyeOff, Mail, Phone, Lock } from "lucide-react";
import LanguageToggle from "../components/LanguageToggle";
import { useLanguage } from "@/contexts/LanguageContext";

const Login = () => {
  const { t, language, setLanguage } = useLanguage();
  const [isSignUp, setIsSignUp] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    phone: "",
    password: "",
    confirmPassword: ""
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // Add authentication logic here
  };

  const handleLanguageChange = (newLanguage: string) => {
    setLanguage(newLanguage);
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12 bg-gradient-to-br from-blue-50 via-green-50 to-cyan-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 relative">
      {/* Language Toggle - Positioned absolutely in top right */}
      <div className="absolute top-6 right-6 z-10">
        <LanguageToggle 
          currentLanguage={language}
          onLanguageChange={handleLanguageChange}
        />
      </div>

      <div className="max-w-md w-full space-y-8">
        {/* Header */}
        <div className="text-center">
          <Link to="/" className="inline-flex items-center space-x-2 mb-8">
            <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-blue-500 rounded-xl flex items-center justify-center">
              <span className="text-white font-bold">T</span>
            </div>
            <span className="text-2xl font-bold text-gray-800 dark:text-white">{t('app.title')}</span>
          </Link>
          
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
            {isSignUp ? t('login.create_account') : t('login.title')}
          </h2>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            {isSignUp 
              ? "Join thousands monitoring air quality across India" 
              : t('login.subtitle')
            }
          </p>
        </div>

        {/* Form */}
        <div className="bg-white/80 dark:bg-gray-800/90 backdrop-blur-md rounded-2xl shadow-xl p-8 border border-white/20 dark:border-gray-700/50">
          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* Email/Phone Toggle */}
            <div>
              <Label htmlFor="contact" className="text-gray-700 dark:text-gray-300 font-medium">
                {t('login.email_phone')}
              </Label>
              <div className="mt-1 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <Input
                  id="contact"
                  type="text"
                  placeholder="Enter email or phone number"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  className="pl-10 h-12 bg-white/50 dark:bg-gray-700/50 border-gray-200 dark:border-gray-600 focus:border-blue-500 dark:text-white"
                  required
                />
              </div>
            </div>

            {/* Phone field for Sign Up */}
            {isSignUp && (
              <div>
                <Label htmlFor="phone" className="text-gray-700 dark:text-gray-300 font-medium">
                  Phone Number
                </Label>
                <div className="mt-1 relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Phone className="h-5 w-5 text-gray-400" />
                  </div>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="+91 98765 43210"
                    value={formData.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                    className="pl-10 h-12 bg-white/50 dark:bg-gray-700/50 border-gray-200 dark:border-gray-600 focus:border-blue-500 dark:text-white"
                  />
                </div>
              </div>
            )}

            {/* Password */}
            <div>
              <Label htmlFor="password" className="text-gray-700 dark:text-gray-300 font-medium">
                {t('login.password')}
              </Label>
              <div className="mt-1 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={(e) => handleInputChange("password", e.target.value)}
                  className="pl-10 pr-10 h-12 bg-white/50 dark:bg-gray-700/50 border-gray-200 dark:border-gray-600 focus:border-blue-500 dark:text-white"
                  required
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-gray-400" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-400" />
                  )}
                </button>
              </div>
            </div>

            {/* Confirm Password for Sign Up */}
            {isSignUp && (
              <div>
                <Label htmlFor="confirmPassword" className="text-gray-700 dark:text-gray-300 font-medium">
                  Confirm Password
                </Label>
                <div className="mt-1 relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </div>
                  <Input
                    id="confirmPassword"
                    type="password"
                    placeholder="Confirm your password"
                    value={formData.confirmPassword}
                    onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
                    className="pl-10 h-12 bg-white/50 dark:bg-gray-700/50 border-gray-200 dark:border-gray-600 focus:border-blue-500 dark:text-white"
                    required
                  />
                </div>
              </div>
            )}

            {/* Submit Button */}
            <Button
              type="submit"
              className="w-full h-12 bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-white font-medium"
            >
              {isSignUp ? t('login.sign_up') : t('login.sign_in')}
            </Button>

            {/* Forgot Password */}
            {!isSignUp && (
              <div className="text-center">
                <Link to="#" className="text-sm text-blue-600 hover:text-blue-500 dark:text-blue-400">
                  {t('login.forgot_password')}
                </Link>
              </div>
            )}

            {/* Divider */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <Separator className="w-full" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400">Or continue with</span>
              </div>
            </div>

            {/* Social Login */}
            <Button
              type="button"
              variant="outline"
              className="w-full h-12 border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 dark:text-white"
            >
              <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              {t('login.continue_with_google')}
            </Button>
          </form>

          {/* Toggle between Sign In/Sign Up */}
          <div className="mt-6 text-center">
            <span className="text-gray-600 dark:text-gray-400">
              {isSignUp ? t('login.already_have_account') : t('login.dont_have_account')}
            </span>{" "}
            <button
              onClick={() => setIsSignUp(!isSignUp)}
              className="text-blue-600 hover:text-blue-500 dark:text-blue-400 font-medium"
            >
              {isSignUp ? t('login.sign_in') : t('login.sign_up')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
