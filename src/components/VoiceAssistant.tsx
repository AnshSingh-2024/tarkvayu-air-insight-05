
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Mic, MicOff, Volume2, VolumeX } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface VoiceAssistantProps {
  onVoiceInput: (text: string) => void;
  onSpeakResponse: (text: string) => void;
}

const VoiceAssistant = ({ onVoiceInput, onSpeakResponse }: VoiceAssistantProps) => {
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isSupported, setIsSupported] = useState(false);
  const recognition = useRef<SpeechRecognition | null>(null);
  const synthesis = useRef<SpeechSynthesis | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    // Check for speech recognition support
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition && window.speechSynthesis) {
      setIsSupported(true);
      recognition.current = new SpeechRecognition();
      synthesis.current = window.speechSynthesis;

      // Configure speech recognition
      recognition.current.continuous = false;
      recognition.current.interimResults = false;
      recognition.current.lang = 'en-US';

      recognition.current.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        onVoiceInput(transcript);
        toast({
          title: "Voice Input Captured",
          description: `You said: "${transcript}"`,
        });
      };

      recognition.current.onerror = (event) => {
        toast({
          title: "Voice Recognition Error",
          description: "Could not process voice input. Please try again.",
          variant: "destructive",
        });
        setIsListening(false);
      };

      recognition.current.onend = () => {
        setIsListening(false);
      };
    }
  }, [onVoiceInput, toast]);

  const startListening = () => {
    if (recognition.current && !isListening) {
      setIsListening(true);
      recognition.current.start();
    }
  };

  const stopListening = () => {
    if (recognition.current && isListening) {
      recognition.current.stop();
      setIsListening(false);
    }
  };

  const speakText = (text: string) => {
    if (synthesis.current && !isSpeaking) {
      // Stop any ongoing speech
      synthesis.current.cancel();
      
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.9;
      utterance.pitch = 1;
      utterance.volume = 0.8;
      
      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => {
        setIsSpeaking(false);
        toast({
          title: "Speech Error",
          description: "Could not speak the response.",
          variant: "destructive",
        });
      };

      synthesis.current.speak(utterance);
      onSpeakResponse(text);
    }
  };

  const stopSpeaking = () => {
    if (synthesis.current) {
      synthesis.current.cancel();
      setIsSpeaking(false);
    }
  };

  if (!isSupported) {
    return null;
  }

  return (
    <div className="flex items-center space-x-2">
      <Button
        variant="outline"
        size="sm"
        onClick={isListening ? stopListening : startListening}
        className={`${isListening ? 'bg-red-100 border-red-300 text-red-700' : 'dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700'}`}
      >
        {isListening ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
        <span className="ml-1">{isListening ? 'Stop' : 'Voice'}</span>
      </Button>
      
      <Button
        variant="outline"
        size="sm"
        onClick={isSpeaking ? stopSpeaking : () => speakText("Voice assistant is ready to help you with air quality information.")}
        className={`${isSpeaking ? 'bg-blue-100 border-blue-300 text-blue-700' : 'dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700'}`}
      >
        {isSpeaking ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
        <span className="ml-1">{isSpeaking ? 'Stop' : 'Speak'}</span>
      </Button>
    </div>
  );
};

export default VoiceAssistant;
