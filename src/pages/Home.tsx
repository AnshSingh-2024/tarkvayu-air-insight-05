
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Wind, 
  MapPin, 
  TrendingUp, 
  Shield, 
  Users, 
  Star,
  CheckCircle,
  Globe,
  Smartphone,
  BarChart3,
  Heart,
  Search
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Link, useNavigate } from "react-router-dom";

const Home = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [searchCity, setSearchCity] = useState("");

  const handleSearchCity = () => {
    if (searchCity.trim()) {
      navigate(`/dashboard?city=${encodeURIComponent(searchCity)}`);
    }
  };

  const handleCheckAQI = () => {
    navigate('/dashboard');
  };

  const features = [
    {
      icon: <Wind className="h-8 w-8 text-blue-600" />,
      title: t('home.features.realtime.title'),
      description: t('home.features.realtime.description')
    },
    {
      icon: <MapPin className="h-8 w-8 text-green-600" />,
      title: t('home.features.coverage.title'),
      description: t('home.features.coverage.description')
    },
    {
      icon: <TrendingUp className="h-8 w-8 text-purple-600" />,
      title: t('home.features.forecasting.title'),
      description: t('home.features.forecasting.description')
    },
    {
      icon: <Shield className="h-8 w-8 text-red-600" />,
      title: t('home.features.health.title'),
      description: t('home.features.health.description')
    }
  ];

  const stats = [
    { number: "200+", label: t('home.stats.cities') },
    { number: "1M+", label: t('home.stats.users') },
    { number: "24/7", label: t('home.stats.monitoring') },
    { number: "99.9%", label: t('home.stats.accuracy') }
  ];

  const testimonials = [
    {
      name: "Priya Sharma",
      role: "Delhi Resident",
      content: "TarkVayu helped me plan my outdoor activities better. The health recommendations are spot-on!",
      rating: 5
    },
    {
      name: "Amit Patel",
      role: "Mumbai Professional",
      content: "Real-time AQI data for 200+ cities is incredibly useful for my daily commute planning.",
      rating: 5
    },
    {
      name: "Dr. Rashid Khan",
      role: "Environmental Scientist",
      content: "The most accurate and comprehensive air quality monitoring app I've used.",
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-green-50 to-cyan-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-green-600/10 dark:from-blue-400/5 dark:to-green-400/5"></div>
        <div className="relative max-w-7xl mx-auto">
          <div className="text-center">
            <Badge className="mb-4 bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300">
              🇮🇳 Made for India
            </Badge>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 dark:text-white mb-6">
              <span className="bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
                {t('home.hero.title')}
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
              {t('home.hero.subtitle')}
            </p>

            {/* Enhanced CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <Button 
                onClick={handleCheckAQI}
                size="lg" 
                className="bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-white px-8 py-4 rounded-full text-lg font-semibold shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-200"
              >
                <Wind className="mr-2 h-5 w-5" />
                {t('home.hero.cta_primary')}
              </Button>
              
              <div className="flex items-center space-x-2 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-full p-2 shadow-lg border border-gray-200 dark:border-gray-600">
                <Input
                  placeholder={t('home.hero.search_placeholder')}
                  value={searchCity}
                  onChange={(e) => setSearchCity(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSearchCity()}
                  className="border-0 bg-transparent placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-white focus:ring-0 focus:outline-none px-4"
                />
                <Button 
                  onClick={handleSearchCity}
                  size="sm"
                  className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white rounded-full px-6 py-2 font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
                >
                  <Search className="mr-1 h-4 w-4" />
                  {t('home.hero.cta_secondary')}
                </Button>
              </div>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap justify-center items-center gap-6 text-sm text-gray-600 dark:text-gray-400">
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <span>{t('home.hero.trust.verified')}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Globe className="h-4 w-4 text-blue-600" />
                <span>{t('home.hero.trust.coverage')}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Smartphone className="h-4 w-4 text-purple-600" />
                <span>{t('home.hero.trust.mobile')}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600 dark:text-gray-300 font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              {t('home.features.title')}
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              {t('home.features.subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow duration-300 border-0 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
                <CardHeader>
                  <div className="mx-auto mb-4 w-16 h-16 bg-gradient-to-br from-blue-50 to-green-50 dark:from-gray-700 dark:to-gray-600 rounded-2xl flex items-center justify-center">
                    {feature.icon}
                  </div>
                  <CardTitle className="text-gray-900 dark:text-white">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 dark:text-gray-300">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gradient-to-r from-blue-50 to-green-50 dark:from-gray-800 dark:to-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              {t('home.testimonials.title')}
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              {t('home.testimonials.subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="border-0 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 mb-4 italic">
                    "{testimonial.content}"
                  </p>
                  <div>
                    <div className="font-semibold text-gray-900 dark:text-white">{testimonial.name}</div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">{testimonial.role}</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <Card className="border-0 bg-gradient-to-r from-blue-600 to-green-600 text-white overflow-hidden">
            <CardContent className="p-12">
              <Heart className="h-12 w-12 mx-auto mb-6" />
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                {t('home.cta.title')}
              </h2>
              <p className="text-xl mb-8 text-blue-100">
                {t('home.cta.description')}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  asChild
                  size="lg" 
                  className="bg-white text-blue-600 hover:bg-blue-50 px-8 py-4 rounded-full font-semibold shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-200"
                >
                  <Link to="/dashboard">
                    <BarChart3 className="mr-2 h-5 w-5" />
                    {t('home.cta.start_monitoring')}
                  </Link>
                </Button>
                <Button 
                  asChild
                  variant="outline" 
                  size="lg" 
                  className="border-white text-white hover:bg-white hover:text-blue-600 px-8 py-4 rounded-full font-semibold shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-200"
                >
                  <Link to="/health">
                    <Shield className="mr-2 h-5 w-5" />
                    {t('home.cta.health_tips')}
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default Home;
