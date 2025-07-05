
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { X } from "lucide-react";

interface FeedbackPopupProps {
  isOpen: boolean;
  onClose: () => void;
  onSkip: () => void;
}

const FeedbackPopup = ({ isOpen, onClose, onSkip }: FeedbackPopupProps) => {
  const { t } = useLanguage();
  const [selectedEmoji, setSelectedEmoji] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const emojis = [
    { emoji: "😊", label: "Great", value: "great" },
    { emoji: "🙂", label: "Good", value: "good" },
    { emoji: "😐", label: "Okay", value: "okay" },
    { emoji: "😷", label: "Concerned", value: "concerned" },
    { emoji: "😤", label: "Bad", value: "bad" },
  ];

  const handleSubmit = () => {
    if (selectedEmoji) {
      console.log("Feedback submitted:", selectedEmoji);
      setSubmitted(true);
      setTimeout(() => {
        onClose();
        setSubmitted(false);
        setSelectedEmoji(null);
      }, 2000);
    }
  };

  const handleSkip = () => {
    onSkip();
    setSelectedEmoji(null);
    setSubmitted(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={() => {}}>
      <DialogContent className="sm:max-w-md [&>button]:hidden">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="text-xl font-semibold">
              {submitted ? t('feedback.thank_you') : t('feedback.title')}
            </DialogTitle>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleSkip}
              className="h-6 w-6 p-0"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          {!submitted && (
            <p className="text-gray-600 dark:text-gray-400 mt-2">
              {t('feedback.subtitle')}
            </p>
          )}
        </DialogHeader>

        {submitted ? (
          <div className="text-center py-8">
            <div className="text-6xl mb-4">✅</div>
            <p className="text-gray-600 dark:text-gray-400">
              Your feedback helps us improve air quality monitoring!
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Emoji Selection */}
            <div className="grid grid-cols-5 gap-4">
              {emojis.map((item) => (
                <button
                  key={item.value}
                  onClick={() => setSelectedEmoji(item.value)}
                  className={`flex flex-col items-center p-4 rounded-lg border-2 transition-all hover:scale-105 ${
                    selectedEmoji === item.value
                      ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20"
                      : "border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600"
                  }`}
                >
                  <span className="text-3xl mb-2">{item.emoji}</span>
                  <span className="text-xs text-gray-600 dark:text-gray-400">
                    {item.label}
                  </span>
                </button>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-3">
              <Button
                onClick={handleSubmit}
                disabled={!selectedEmoji}
                className="flex-1"
              >
                {t('feedback.submit')}
              </Button>
              <Button
                variant="outline"
                onClick={handleSkip}
                className="px-6"
              >
                {t('common.skip')}
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default FeedbackPopup;
