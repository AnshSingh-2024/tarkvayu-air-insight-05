import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MessageCircle, Send, X, Bot, User, MapPin, TrendingUp } from "lucide-react";
import VoiceAssistant from "./VoiceAssistant";

interface Message {
  id: string;
  text: string;
  sender: "user" | "bot";
  timestamp: Date;
  type?: "text" | "aqi" | "suggestion";
}

const ChatBotUI = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      text: "Hello! I'm Vayu, your AI air quality assistant. I can help you with:\n\n• Current AQI information for 200+ Indian cities\n• Health recommendations based on air quality\n• Detailed pollution explanations\n• Location-specific advice\n• Weather forecasts\n• Voice assistance for hands-free interaction\n\nHow can I help you today?",
      sender: "bot",
      timestamp: new Date(),
      type: "text"
    }
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Enhanced responses with comprehensive knowledge
  const generateBotResponse = (userMessage: string): Message => {
    const lowerMessage = userMessage.toLowerCase();
    let response = "";
    let type: "text" | "aqi" | "suggestion" = "text";

    if (lowerMessage.includes("aqi") || lowerMessage.includes("air quality")) {
      response = "I can provide AQI data for 200+ Indian cities! Current examples:\n\n🔴 Delhi: 324 (Hazardous)\n🟠 Mumbai: 156 (Unhealthy)\n🟡 Bangalore: 65 (Moderate)\n🟢 Kerala cities: 48-54 (Good)\n\nWhich specific city would you like to know about? I have real-time data for metros, tier-1, tier-2, and tier-3 cities across all Indian states.";
      type = "aqi";
    } else if (lowerMessage.includes("health") || lowerMessage.includes("recommend")) {
      response = "Based on current air quality levels, here are personalized health recommendations:\n\n🏃‍♂️ **Exercise Guidelines:**\n• AQI 0-50: Perfect for outdoor activities\n• AQI 51-100: Light outdoor exercise OK\n• AQI 101-150: Limit prolonged outdoor activities\n• AQI 151+: Exercise indoors only\n\n😷 **Protection Measures:**\n• N95 masks for AQI > 100\n• Air purifiers at home\n• Avoid morning/evening peak hours\n• Stay hydrated\n\nDo you have any specific health conditions I should consider?";
    } else if (lowerMessage.includes("voice") || lowerMessage.includes("speak")) {
      response = "🎤 Voice Assistant Features:\n\n• Say 'Current AQI' to get live data\n• Ask about specific cities by voice\n• Get spoken health recommendations\n• Voice-activated weather updates\n• Hands-free air quality monitoring\n\nClick the microphone button to start voice interaction! I support both English and Hindi voice commands.";
    } else if (lowerMessage.includes("city") || lowerMessage.includes("cities")) {
      response = "🏙️ I monitor 200+ Indian cities across all states:\n\n**Metro Cities:** Delhi, Mumbai, Kolkata, Chennai, Bangalore, Hyderabad\n**Major Cities:** Pune, Ahmedabad, Jaipur, Lucknow, Kanpur, Nagpur\n**Tier-2 Cities:** Indore, Bhopal, Coimbatore, Kochi, Guwahati\n**Small Towns:** Including industrial towns, hill stations, and coastal areas\n\nJust name any Indian city, and I'll give you its current AQI, health advice, and forecast!";
    } else if (lowerMessage.includes("weather") || lowerMessage.includes("forecast")) {
      response = "🌤️ **72-Hour Air Quality Forecast:**\n\nToday: Variable conditions across regions\n• North India: High pollution (AQI 150-300)\n• South India: Moderate levels (AQI 60-120)\n• Coastal areas: Generally good (AQI 40-80)\n• Hill stations: Excellent (AQI 20-50)\n\n**Weather Impact:**\n• Wind patterns affecting dispersion\n• Temperature inversions trapping pollutants\n• Monsoon effects on air quality\n\nWould you like a specific city's 3-day forecast?";
    } else if (lowerMessage.includes("pollution") || lowerMessage.includes("cause")) {
      response = "🏭 **Major Pollution Sources in India:**\n\n**Vehicular Emissions (30-40%)**\n• Cars, buses, trucks, two-wheelers\n• Diesel generators\n\n**Industrial Sources (25-35%)**\n• Power plants, factories\n• Construction activities\n\n**Agricultural Burning (15-25%)**\n• Crop residue burning in Punjab, Haryana\n• Seasonal spikes in North India\n\n**Other Sources:**\n• Dust storms • Waste burning • Cooking fuels\n\nEach city has different primary sources. Which city's pollution profile interests you?";
    } else if (lowerMessage.includes("mask") || lowerMessage.includes("protection")) {
      response = "😷 **Complete Protection Guide:**\n\n**Mask Recommendations:**\n• N95/N99: For AQI > 100 (95-99% filtration)\n• Surgical masks: Basic protection only\n• Cloth masks: Not effective for PM2.5\n\n**Indoor Protection:**\n• HEPA air purifiers\n• Keep windows closed during high pollution\n• Use exhaust fans while cooking\n\n**Timing Matters:**\n• Avoid 6-10 AM and 6-10 PM (peak hours)\n• Best air quality: 2-4 PM usually\n\n**Special Groups:**\n• Children, elderly, pregnant women need extra care\n• Asthma/COPD patients should stay indoors when AQI > 150";
    } else if (lowerMessage.includes("hindi") || lowerMessage.includes("हिंदी")) {
      response = "🇮🇳 मैं हिंदी में भी जवाब दे सकता हूं!\n\n**मुख्य सेवाएं:**\n• वायु गुणवत्ता की जानकारी\n• स्वास्थ्य सुझाव\n• 200+ भारतीय शहरों का डेटा\n• आवाज से सहायता\n\nआप हिंदी या अंग्रेजी में कोई भी सवाल पूछ सकते हैं। Settings में भाषा बदल सकते हैं।\n\nक्या आपको किसी खास शहर की AQI जानकारी चाहिए?";
    } else {
      response = "🤖 **Vayu AI Assistant Capabilities:**\n\n• 🌍 Real-time AQI for 200+ Indian cities\n• 🏥 Personalized health recommendations\n• 🎤 Voice interaction (speak & listen)\n• 📊 3-day air quality forecasts\n• 🗺️ Interactive pollution maps\n• 🌡️ Weather impact analysis\n• 🇮🇳 Hindi & English support\n• 📱 Smart notifications\n\n**Popular Commands:**\n'Current AQI Delhi' | 'Health tips' | 'Best time to exercise' | 'Mask recommendations'\n\nWhat would you like to explore?";
    }

    return {
      id: Date.now().toString(),
      text: response,
      sender: "bot",
      timestamp: new Date(),
      type
    };
  };

  const handleSendMessage = () => {
    if (inputMessage.trim() === "") return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputMessage,
      sender: "user",
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage("");
    setIsTyping(true);

    // Simulate typing delay
    setTimeout(() => {
      const botResponse = generateBotResponse(inputMessage);
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const handleVoiceInput = (text: string) => {
    setInputMessage(text);
    setTimeout(() => handleSendMessage(), 500);
  };

  const handleSpeakResponse = (text: string) => {
    // Voice response is handled by the VoiceAssistant component
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const quickActions = [
    { text: "Current AQI Delhi", icon: <TrendingUp className="h-4 w-4" /> },
    { text: "Health recommendations", icon: <User className="h-4 w-4" /> },
    { text: "Voice assistance", icon: <MessageCircle className="h-4 w-4" /> },
    { text: "City pollution data", icon: <MapPin className="h-4 w-4" /> },
  ];

  return (
    <>
      {/* Enhanced Chat Bubble Button - More Visible */}
      {!isOpen && (
        <div className="fixed bottom-6 right-6 z-50">
          <div className="relative">
            {/* Pulsing animation ring */}
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-green-500 rounded-full animate-pulse opacity-75"></div>
            
            <Button
              onClick={() => setIsOpen(true)}
              className="relative bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600 shadow-2xl border-0 px-6 py-4 h-auto rounded-full flex items-center space-x-3 text-white font-semibold transform hover:scale-105 transition-all duration-300 min-w-[200px]"
            >
              <div className="relative">
                <MessageCircle className="h-7 w-7" />
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full animate-bounce flex items-center justify-center">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                </div>
              </div>
              <div className="text-left">
                <div className="text-base font-bold">Vayu: AI Assistant</div>
                <div className="text-xs text-blue-100">Air Quality Expert • Voice Enabled</div>
              </div>
            </Button>
          </div>
        </div>
      )}

      {/* Enhanced Chat Window */}
      {isOpen && (
        <Card className="fixed top-16 right-6 bottom-6 w-96 shadow-2xl z-50 flex flex-col bg-white dark:bg-gray-800 border-2 border-gradient-to-r from-blue-500 to-green-500">
          {/* Header */}
          <div className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-500 to-green-500 text-white rounded-t-lg">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                <Bot className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-bold text-base">Vayu AI Assistant</h3>
                <p className="text-xs text-blue-100">200+ Cities • Voice Enabled • Real-time Data</p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(false)}
              className="text-white hover:bg-white/20 h-8 w-8"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          {/* Voice Assistant Controls */}
          <div className="px-4 py-2 bg-gray-50 dark:bg-gray-700 border-b dark:border-gray-600">
            <VoiceAssistant 
              onVoiceInput={handleVoiceInput}
              onSpeakResponse={handleSpeakResponse}
            />
          </div>

          {/* Messages */}
          <ScrollArea className="flex-1 p-4">
            <div className="space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[85%] rounded-lg p-3 ${
                      message.sender === "user"
                        ? "bg-gradient-to-r from-blue-500 to-green-500 text-white"
                        : "bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white"
                    }`}
                  >
                    <div className="flex items-start space-x-2">
                      {message.sender === "bot" && (
                        <Bot className="h-4 w-4 text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0" />
                      )}
                      <div className="text-sm whitespace-pre-wrap">
                        {message.text}
                      </div>
                    </div>
                    <div className={`text-xs mt-1 ${
                      message.sender === "user" ? "text-blue-100" : "text-gray-500 dark:text-gray-400"
                    }`}>
                      {message.timestamp.toLocaleTimeString([], { 
                        hour: '2-digit', 
                        minute: '2-digit' 
                      })}
                    </div>
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-3 max-w-[80%]">
                    <div className="flex items-center space-x-2">
                      <Bot className="h-4 w-4 text-green-600 dark:text-green-400" />
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0.1s" }}></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
            <div ref={messagesEndRef} />
          </ScrollArea>

          {/* Quick Actions */}
          {messages.length === 1 && (
            <div className="px-4 pb-2">
              <div className="grid grid-cols-2 gap-2">
                {quickActions.map((action, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setInputMessage(action.text);
                      setTimeout(() => handleSendMessage(), 100);
                    }}
                    className="flex items-center space-x-1 text-xs dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700 justify-start"
                  >
                    {action.icon}
                    <span>{action.text}</span>
                  </Button>
                ))}
              </div>
            </div>
          )}

          {/* Input */}
          <div className="p-4 border-t dark:border-gray-600">
            <div className="flex space-x-2">
              <Input
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask about air quality, health tips, or say 'voice help'..."
                className="flex-1 text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                disabled={isTyping}
              />
              <Button
                onClick={handleSendMessage}
                disabled={isTyping || inputMessage.trim() === ""}
                size="icon"
                className="bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </Card>
      )}
    </>
  );
};

export default ChatBotUI;
