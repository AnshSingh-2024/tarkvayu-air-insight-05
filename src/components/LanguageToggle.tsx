
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Languages } from "lucide-react";

interface LanguageToggleProps {
  currentLanguage: string;
  onLanguageChange: (language: string) => void;
}

const LanguageToggle = ({ currentLanguage, onLanguageChange }: LanguageToggleProps) => {
  const [isHindi, setIsHindi] = useState(currentLanguage === 'hindi');

  useEffect(() => {
    setIsHindi(currentLanguage === 'hindi');
  }, [currentLanguage]);

  const handleToggle = (checked: boolean) => {
    setIsHindi(checked);
    onLanguageChange(checked ? 'hindi' : 'english');
  };

  return (
    <div className="flex items-center justify-between p-4 border rounded-lg dark:border-gray-600">
      <div className="flex items-center space-x-3">
        <Languages className="h-5 w-5 text-blue-600 dark:text-blue-400" />
        <div>
          <Label className="text-base font-medium dark:text-white">
            {isHindi ? 'भाषा स्विच करें' : 'Language Switch'}
          </Label>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {isHindi 
              ? 'अंग्रेजी और हिंदी के बीच स्विच करें'
              : 'Switch between English and Hindi'
            }
          </p>
        </div>
      </div>
      <div className="flex items-center space-x-3">
        <span className={`text-sm font-medium ${!isHindi ? 'text-blue-600 dark:text-blue-400' : 'text-gray-500 dark:text-gray-400'}`}>
          English
        </span>
        <Switch
          checked={isHindi}
          onCheckedChange={handleToggle}
          className="data-[state=checked]:bg-green-600"
        />
        <span className={`text-sm font-medium ${isHindi ? 'text-green-600 dark:text-green-400' : 'text-gray-500 dark:text-gray-400'}`}>
          हिंदी
        </span>
      </div>
    </div>
  );
};

export default LanguageToggle;
