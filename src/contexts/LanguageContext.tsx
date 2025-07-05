
import React, { createContext, useContext, useState, useEffect } from 'react';

interface LanguageContextType {
  language: string;
  setLanguage: (language: string) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations = {
  english: {
    // Common
    'app.title': 'TarkVayu',
    'app.subtitle': 'Real-Time Air Quality Monitor',
    'common.loading': 'Loading...',
    'common.error': 'Error',
    'common.save': 'Save',
    'common.cancel': 'Cancel',
    'common.close': 'Close',
    
    // Navigation
    'nav.home': 'Home',
    'nav.dashboard': 'Dashboard',
    'nav.trends': 'Trends',
    'nav.forecast': 'Forecast',
    'nav.health': 'Health',
    'nav.settings': 'Settings',
    'nav.login': 'Login',
    
    // Dashboard
    'dashboard.title': 'Real-Time AQI Dashboard',
    'dashboard.live': 'Live',
    'dashboard.current_aqi': 'Current AQI',
    'dashboard.last_updated': 'Last updated',
    
    // AQI Status
    'aqi.good': 'Good',
    'aqi.moderate': 'Moderate',
    'aqi.unhealthy_sensitive': 'Unhealthy for Sensitive',
    'aqi.unhealthy': 'Unhealthy',
    'aqi.very_unhealthy': 'Very Unhealthy',
    'aqi.hazardous': 'Hazardous',
    
    // Settings
    'settings.title': 'Settings & Preferences',
    'settings.language': 'Language',
    'settings.notifications': 'Notifications',
    'settings.location': 'Location',
    'settings.personal': 'Personal Information',
    'settings.app_preferences': 'App Preferences',
    'settings.privacy': 'Privacy & Security',
  },
  hindi: {
    // Common
    'app.title': 'तर्कवायु',
    'app.subtitle': 'रियल-टाइम वायु गुणवत्ता मॉनिटर',
    'common.loading': 'लोड हो रहा है...',
    'common.error': 'त्रुटि',
    'common.save': 'सेव करें',
    'common.cancel': 'रद्द करें',
    'common.close': 'बंद करें',
    
    // Navigation
    'nav.home': 'होम',
    'nav.dashboard': 'डैशबोर्ड',
    'nav.trends': 'रुझान',
    'nav.forecast': 'पूर्वानुमान',
    'nav.health': 'स्वास्थ्य',
    'nav.settings': 'सेटिंग्स',
    'nav.login': 'लॉगिन',
    
    // Dashboard
    'dashboard.title': 'रियल-टाइम AQI डैशबोर्ड',
    'dashboard.live': 'लाइव',
    'dashboard.current_aqi': 'वर्तमान AQI',
    'dashboard.last_updated': 'अंतिम अपडेट',
    
    // AQI Status
    'aqi.good': 'अच्छा',
    'aqi.moderate': 'मध्यम',
    'aqi.unhealthy_sensitive': 'संवेदनशील के लिए हानिकारक',
    'aqi.unhealthy': 'हानिकारक',
    'aqi.very_unhealthy': 'बहुत हानिकारक',
    'aqi.hazardous': 'खतरनाक',
    
    // Settings
    'settings.title': 'सेटिंग्स और प्राथमिकताएं',
    'settings.language': 'भाषा',
    'settings.notifications': 'सूचनाएं',
    'settings.location': 'स्थान',
    'settings.personal': 'व्यक्तिगत जानकारी',
    'settings.app_preferences': 'ऐप प्राथमिकताएं',
    'settings.privacy': 'गोपनीयता और सुरक्षा',
  }
};

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<string>(() => {
    return localStorage.getItem('language') || 'english';
  });

  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);

  const t = (key: string): string => {
    return translations[language as keyof typeof translations]?.[key as keyof typeof translations.english] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
