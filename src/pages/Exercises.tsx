
import { useState, useEffect, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useLanguage } from "@/contexts/LanguageContext";
import { Play, Pause, RotateCcw, Wind, Heart, Brain } from "lucide-react";

interface Exercise {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  phases: {
    name: string;
    duration: number;
  }[];
  totalDuration: number;
}

const Exercises = () => {
  const { t } = useLanguage();
  const [selectedExercise, setSelectedExercise] = useState<Exercise | null>(null);
  const [isActive, setIsActive] = useState(false);
  const [currentPhase, setCurrentPhase] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [completedCycles, setCompletedCycles] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const exercises: Exercise[] = [
    {
      id: "slow-breathing",
      name: t('exercises.slow_breathing'),
      description: "4-7-8 breathing pattern for deep relaxation",
      icon: <Wind className="h-8 w-8" />,
      color: "bg-blue-500",
      phases: [
        { name: t('exercises.inhale'), duration: 4 },
        { name: t('exercises.hold'), duration: 7 },
        { name: t('exercises.exhale'), duration: 8 }
      ],
      totalDuration: 19
    },
    {
      id: "hold-breath",
      name: t('exercises.hold_breath'),
      description: "Box breathing for focus and calm",
      icon: <Heart className="h-8 w-8" />,
      color: "bg-green-500",
      phases: [
        { name: t('exercises.inhale'), duration: 4 },
        { name: t('exercises.hold'), duration: 4 },
        { name: t('exercises.exhale'), duration: 4 },
        { name: t('exercises.hold'), duration: 4 }
      ],
      totalDuration: 16
    },
    {
      id: "relax-breath",
      name: t('exercises.relax_breath'),
      description: "Natural breathing rhythm for stress relief",
      icon: <Brain className="h-8 w-8" />,
      color: "bg-purple-500",
      phases: [
        { name: t('exercises.inhale'), duration: 3 },
        { name: t('exercises.exhale'), duration: 5 }
      ],
      totalDuration: 8
    }
  ];

  useEffect(() => {
    if (isActive && selectedExercise) {
      intervalRef.current = setInterval(() => {
        setTimeRemaining((prev) => {
          if (prev <= 1) {
            // Move to next phase
            setCurrentPhase((prevPhase) => {
              const nextPhase = (prevPhase + 1) % selectedExercise.phases.length;
              if (nextPhase === 0) {
                setCompletedCycles(prev => prev + 1);
              }
              return nextPhase;
            });
            return selectedExercise.phases[currentPhase === selectedExercise.phases.length - 1 ? 0 : currentPhase + 1].duration;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isActive, selectedExercise, currentPhase]);

  const startExercise = (exercise: Exercise) => {
    setSelectedExercise(exercise);
    setCurrentPhase(0);
    setTimeRemaining(exercise.phases[0].duration);
    setCompletedCycles(0);
    setIsActive(true);
  };

  const toggleExercise = () => {
    setIsActive(!isActive);
  };

  const resetExercise = () => {
    setIsActive(false);
    setCurrentPhase(0);
    setCompletedCycles(0);
    if (selectedExercise) {
      setTimeRemaining(selectedExercise.phases[0].duration);
    }
  };

  const stopExercise = () => {
    setIsActive(false);
    setSelectedExercise(null);
    setCurrentPhase(0);
    setTimeRemaining(0);
    setCompletedCycles(0);
  };

  const getCurrentInstruction = () => {
    if (!selectedExercise) return "";
    return selectedExercise.phases[currentPhase]?.name || "";
  };

  const getCircleScale = () => {
    if (!selectedExercise || !isActive) return 1;
    const currentPhaseName = selectedExercise.phases[currentPhase]?.name;
    const progress = 1 - (timeRemaining / selectedExercise.phases[currentPhase].duration);
    
    if (currentPhaseName === t('exercises.inhale')) {
      return 1 + (progress * 0.5);
    } else if (currentPhaseName === t('exercises.exhale')) {
      return 1.5 - (progress * 0.5);
    }
    return 1.25;
  };

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            {t('exercises.title')}
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            {t('exercises.subtitle')}
          </p>
        </div>

        {!selectedExercise ? (
          /* Exercise Selection */
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {exercises.map((exercise) => (
              <Card key={exercise.id} className="hover:shadow-lg transition-shadow cursor-pointer dark:bg-gray-800 dark:border-gray-700">
                <CardHeader>
                  <div className={`w-16 h-16 ${exercise.color} rounded-full flex items-center justify-center mb-4 text-white`}>
                    {exercise.icon}
                  </div>
                  <CardTitle className="dark:text-white">{exercise.name}</CardTitle>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    {exercise.description}
                  </p>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600 dark:text-gray-400">{t('exercises.duration')}:</span>
                      <span className="font-medium dark:text-white">{exercise.totalDuration}s per cycle</span>
                    </div>
                    <Button 
                      onClick={() => startExercise(exercise)}
                      className="w-full"
                    >
                      <Play className="h-4 w-4 mr-2" />
                      {t('exercises.start')}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          /* Active Exercise */
          <div className="max-w-2xl mx-auto">
            <Card className="dark:bg-gray-800 dark:border-gray-700">
              <CardHeader className="text-center">
                <div className="flex items-center justify-center space-x-2 mb-4">
                  <div className={`w-12 h-12 ${selectedExercise.color} rounded-full flex items-center justify-center text-white`}>
                    {selectedExercise.icon}
                  </div>
                  <CardTitle className="dark:text-white">{selectedExercise.name}</CardTitle>
                </div>
                <Badge variant="secondary" className="dark:bg-gray-700 dark:text-gray-300">
                  Cycle {completedCycles + 1}
                </Badge>
              </CardHeader>
              <CardContent className="text-center space-y-8">
                {/* Breathing Circle */}
                <div className="relative flex items-center justify-center h-80">
                  <div
                    className={`w-64 h-64 ${selectedExercise.color} rounded-full flex items-center justify-center text-white transition-transform duration-1000 ease-in-out`}
                    style={{
                      transform: `scale(${getCircleScale()})`,
                    }}
                  >
                    <div className="text-center">
                      <div className="text-2xl font-bold mb-2">
                        {getCurrentInstruction()}
                      </div>
                      <div className="text-4xl font-mono">
                        {timeRemaining}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Phase Indicators */}
                <div className="flex justify-center space-x-2">
                  {selectedExercise.phases.map((phase, index) => (
                    <div
                      key={index}
                      className={`px-3 py-1 rounded-full text-sm ${
                        index === currentPhase
                          ? `${selectedExercise.color} text-white`
                          : 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
                      }`}
                    >
                      {phase.name} ({phase.duration}s)
                    </div>
                  ))}
                </div>

                {/* Controls */}
                <div className="flex justify-center space-x-4">
                  <Button
                    onClick={toggleExercise}
                    variant={isActive ? "secondary" : "default"}
                    size="lg"
                  >
                    {isActive ? (
                      <>
                        <Pause className="h-5 w-5 mr-2" />
                        Pause
                      </>
                    ) : (
                      <>
                        <Play className="h-5 w-5 mr-2" />
                        Resume
                      </>
                    )}
                  </Button>
                  <Button onClick={resetExercise} variant="outline" size="lg">
                    <RotateCcw className="h-5 w-5 mr-2" />
                    Reset
                  </Button>
                  <Button onClick={stopExercise} variant="destructive" size="lg">
                    {t('exercises.stop')}
                  </Button>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">{completedCycles}</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Completed Cycles</div>
                  </div>
                  <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                      {Math.floor((completedCycles * selectedExercise.totalDuration) / 60)}m {((completedCycles * selectedExercise.totalDuration) % 60)}s
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Total Time</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Benefits Section */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
            Benefits of Breathing Exercises
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="dark:bg-gray-800 dark:border-gray-700">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Heart className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="text-lg font-semibold mb-2 dark:text-white">Reduce Stress</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Lower cortisol levels and activate the parasympathetic nervous system
                </p>
              </CardContent>
            </Card>
            <Card className="dark:bg-gray-800 dark:border-gray-700">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Brain className="h-6 w-6 text-green-600 dark:text-green-400" />
                </div>
                <h3 className="text-lg font-semibold mb-2 dark:text-white">Improve Focus</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Enhance concentration and mental clarity through mindful breathing
                </p>
              </CardContent>
            </Card>
            <Card className="dark:bg-gray-800 dark:border-gray-700">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Wind className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                </div>
                <h3 className="text-lg font-semibold mb-2 dark:text-white">Better Sleep</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Calm the mind and prepare the body for restful sleep
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Exercises;
