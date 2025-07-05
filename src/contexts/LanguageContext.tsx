
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
    'common.skip': 'Skip',
    
    // Navigation
    'nav.home': 'Home',
    'nav.dashboard': 'Dashboard',
    'nav.trends': 'Trends',
    'nav.forecast': 'Forecast',
    'nav.health': 'Health',
    'nav.exercises': 'Exercises',
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
    
    // Exercises
    'exercises.title': 'Breathing Exercises',
    'exercises.subtitle': 'Interactive breathing exercises to help you relax and improve focus',
    'exercises.slow_breathing': 'Slow Breathing',
    'exercises.hold_breath': 'Breath Hold',
    'exercises.relax_breath': 'Relaxed Breathing',
    'exercises.start': 'Start Exercise',
    'exercises.stop': 'Stop Exercise',
    'exercises.inhale': 'Inhale',
    'exercises.exhale': 'Exhale',
    'exercises.hold': 'Hold',
    'exercises.breathe_normally': 'Breathe Normally',
    'exercises.duration': 'Duration',
    'exercises.completed': 'Exercise Completed!',
    'exercises.well_done': 'Well done! You completed the breathing exercise.',
    
    // Feedback
    'feedback.title': 'How are you feeling today?',
    'feedback.subtitle': 'Your feedback helps us improve air quality awareness',
    'feedback.submit': 'Submit Feedback',
    'feedback.thank_you': 'Thank you for your feedback!',
    
    // Login
    'login.title': 'Welcome Back',
    'login.subtitle': 'Sign in to your TarkVayu account',
    'login.create_account': 'Create Account',
    'login.email_phone': 'Email or Phone',
    'login.password': 'Password',
    'login.sign_in': 'Sign In',
    'login.sign_up': 'Sign Up',
    'login.forgot_password': 'Forgot your password?',
    'login.continue_with_google': 'Continue with Google',
    'login.already_have_account': 'Already have an account?',
    'login.dont_have_account': "Don't have an account?",
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
    'common.skip': 'छोड़ें',
    
    // Navigation
    'nav.home': 'होम',
    'nav.dashboard': 'डैशबोर्ड',
    'nav.trends': 'रुझान',
    'nav.forecast': 'पूर्वानुमान',
    'nav.health': 'स्वास्थ्य',
    'nav.exercises': 'व्यायाम',
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
    
    // Exercises
    'exercises.title': 'श्वास व्यायाम',
    'exercises.subtitle': 'आराम करने और ध्यान बेहतर बनाने के लिए इंटरैक्टिव श्वास व्यायाम',
    'exercises.slow_breathing': 'धीमी सांस लेना',
    'exercises.hold_breath': 'सांस रोकना',
    'exercises.relax_breath': 'आरामदायक सांस',
    'exercises.start': 'व्यायाम शुरू करें',
    'exercises.stop': 'व्यायाम बंद करें',
    'exercises.inhale': 'सांस लें',
    'exercises.exhale': 'सांस छोड़ें',
    'exercises.hold': 'रोकें',
    'exercises.breathe_normally': 'सामान्य रूप से सांस लें',
    'exercises.duration': 'अवधि',
    'exercises.completed': 'व्यायाम पूरा हुआ!',
    'exercises.well_done': 'बहुत बढ़िया! आपने श्वास व्यायाम पूरा किया।',
    
    // Feedback
    'feedback.title': 'आज आप कैसा महसूस कर रहे हैं?',
    'feedback.subtitle': 'आपकी प्रतिक्रिया हमें वायु गुणवत्ता जागरूकता सुधारने में मदद करती है',
    'feedback.submit': 'फीडबैक भेजें',
    'feedback.thank_you': 'आपके फीडबैक के लिए धन्यवाद!',
    
    // Login
    'login.title': 'वापस स्वागत है',
    'login.subtitle': 'अपने तर्कवायु खाते में साइन इन करें',
    'login.create_account': 'खाता बनाएं',
    'login.email_phone': 'ईमेल या फोन',
    'login.password': 'पासवर्ड',
    'login.sign_in': 'साइन इन',
    'login.sign_up': 'साइन अप',
    'login.forgot_password': 'अपना पासवर्ड भूल गए?',
    'login.continue_with_google': 'Google के साथ जारी रखें',
    'login.already_have_account': 'पहले से खाता है?',
    'login.dont_have_account': 'खाता नहीं है?',
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
