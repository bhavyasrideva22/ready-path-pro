import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Slider } from '@/components/ui/slider';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Brain, Heart, Users, Lightbulb, ArrowRight, ArrowLeft } from 'lucide-react';

interface PsychometricSectionProps {
  onNext: (scores: PsychometricScores) => void;
  onBack: () => void;
}

export interface PsychometricScores {
  interestScore: number;
  personalityTraits: {
    openness: number;
    conscientiousness: number;
    agreeableness: number;
    emotionalStability: number;
    extraversion: number;
  };
  motivation: {
    internal: number;
    external: number;
  };
  cognitiveStyle: string;
  gritScore: number;
  growthMindset: number;
}

const PsychometricSection = ({ onNext, onBack }: PsychometricSectionProps) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<any[]>([]);

  const questions = [
    {
      category: "Interest Assessment",
      icon: Heart,
      color: "text-wiscar-interest",
      type: "slider",
      question: "How interested are you in learning about health education and community wellness?",
      min: 1,
      max: 10,
      step: 1
    },
    {
      category: "Interest Assessment", 
      icon: Heart,
      color: "text-wiscar-interest",
      type: "slider",
      question: "How much do you enjoy working directly with people to improve their health outcomes?",
      min: 1,
      max: 10,
      step: 1
    },
    {
      category: "Personality - Openness",
      icon: Lightbulb,
      color: "text-wiscar-cognitive",
      type: "radio",
      question: "I enjoy exploring new health trends and innovative wellness approaches",
      options: [
        { value: "1", label: "Strongly Disagree" },
        { value: "2", label: "Disagree" },
        { value: "3", label: "Neutral" },
        { value: "4", label: "Agree" },
        { value: "5", label: "Strongly Agree" }
      ]
    },
    {
      category: "Personality - Conscientiousness",
      icon: Brain,
      color: "text-wiscar-cognitive",
      type: "radio",
      question: "I am very organized and detail-oriented when planning health education programs",
      options: [
        { value: "1", label: "Strongly Disagree" },
        { value: "2", label: "Disagree" },
        { value: "3", label: "Neutral" },
        { value: "4", label: "Agree" },
        { value: "5", label: "Strongly Agree" }
      ]
    },
    {
      category: "Personality - Agreeableness",
      icon: Users,
      color: "text-wiscar-realworld",
      type: "radio",
      question: "I find it easy to empathize with people from different cultural backgrounds",
      options: [
        { value: "1", label: "Strongly Disagree" },
        { value: "2", label: "Disagree" },
        { value: "3", label: "Neutral" },
        { value: "4", label: "Agree" },
        { value: "5", label: "Strongly Agree" }
      ]
    },
    {
      category: "Emotional Stability",
      icon: Heart,
      color: "text-wiscar-will",
      type: "radio",
      question: "I remain calm and composed when dealing with health crises or sensitive situations",
      options: [
        { value: "1", label: "Strongly Disagree" },
        { value: "2", label: "Disagree" },
        { value: "3", label: "Neutral" },
        { value: "4", label: "Agree" },
        { value: "5", label: "Strongly Agree" }
      ]
    },
    {
      category: "Extraversion",
      icon: Users,
      color: "text-wiscar-realworld",
      type: "radio",
      question: "I feel energized when presenting health information to groups of people",
      options: [
        { value: "1", label: "Strongly Disagree" },
        { value: "2", label: "Disagree" },
        { value: "3", label: "Neutral" },
        { value: "4", label: "Agree" },
        { value: "5", label: "Strongly Agree" }
      ]
    },
    {
      category: "Motivation - Internal",
      icon: Heart,
      color: "text-wiscar-will",
      type: "slider",
      question: "How important is making a positive impact on community health to you personally?",
      min: 1,
      max: 10,
      step: 1
    },
    {
      category: "Motivation - External",
      icon: Brain,
      color: "text-wiscar-will",
      type: "slider",
      question: "How important are job security and career advancement opportunities in health education?",
      min: 1,
      max: 10,
      step: 1
    },
    {
      category: "Cognitive Style",
      icon: Brain,
      color: "text-wiscar-cognitive",
      type: "radio",
      question: "When approaching health education challenges, I prefer:",
      options: [
        { value: "analytical", label: "Systematic, data-driven approaches" },
        { value: "creative", label: "Innovative, creative solutions" },
        { value: "balanced", label: "A balance of both approaches" }
      ]
    },
    {
      category: "Grit & Persistence",
      icon: Lightbulb,
      color: "text-wiscar-ability",
      type: "slider",
      question: "How likely are you to persist with health education efforts even when progress is slow?",
      min: 1,
      max: 10,
      step: 1
    },
    {
      category: "Growth Mindset",
      icon: Lightbulb,
      color: "text-wiscar-ability",
      type: "radio",
      question: "I believe my ability to be an effective health educator can be significantly improved through effort and learning",
      options: [
        { value: "1", label: "Strongly Disagree" },
        { value: "2", label: "Disagree" },
        { value: "3", label: "Neutral" },
        { value: "4", label: "Agree" },
        { value: "5", label: "Strongly Agree" }
      ]
    }
  ];

  const progress = ((currentQuestion + 1) / questions.length) * 100;
  const currentQ = questions[currentQuestion];

  const handleAnswer = (value: any) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = value;
    setAnswers(newAnswers);
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // Calculate scores and proceed
      const scores = calculateScores();
      onNext(scores);
    }
  };

  const handleBack = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    } else {
      onBack();
    }
  };

  const calculateScores = (): PsychometricScores => {
    const interestScores = answers.slice(0, 2).map(a => Array.isArray(a) ? a[0] : a);
    const interestScore = (interestScores.reduce((a, b) => a + b, 0) / interestScores.length) * 10;

    return {
      interestScore,
      personalityTraits: {
        openness: parseInt(answers[2]) * 20,
        conscientiousness: parseInt(answers[3]) * 20,
        agreeableness: parseInt(answers[4]) * 20,
        emotionalStability: parseInt(answers[5]) * 20,
        extraversion: parseInt(answers[6]) * 20
      },
      motivation: {
        internal: Array.isArray(answers[7]) ? answers[7][0] * 10 : answers[7] * 10,
        external: Array.isArray(answers[8]) ? answers[8][0] * 10 : answers[8] * 10
      },
      cognitiveStyle: answers[9] || 'balanced',
      gritScore: Array.isArray(answers[10]) ? answers[10][0] * 10 : answers[10] * 10,
      growthMindset: parseInt(answers[11]) * 20
    };
  };

  const isAnswered = answers[currentQuestion] !== undefined;

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto px-4 max-w-3xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center bg-wiscar-interest/10 rounded-full px-4 py-2 mb-4">
            <Brain className="w-4 h-4 mr-2 text-wiscar-interest" />
            <span className="text-sm font-medium text-wiscar-interest">Psychometric Evaluation</span>
          </div>
          <h1 className="text-3xl font-bold mb-2">Personality & Interest Assessment</h1>
          <p className="text-muted-foreground">
            Question {currentQuestion + 1} of {questions.length}
          </p>
        </div>

        {/* Progress */}
        <div className="mb-8">
          <Progress value={progress} className="h-3" />
        </div>

        {/* Question Card */}
        <Card className="assessment-card p-8 mb-8">
          <div className="flex items-start space-x-4 mb-6">
            <div className="bg-gradient-to-br from-wiscar-interest/20 to-wiscar-interest/10 rounded-lg p-3">
              <currentQ.icon className={`w-6 h-6 ${currentQ.color}`} />
            </div>
            <div>
              <div className="text-sm text-muted-foreground mb-2">{currentQ.category}</div>
              <h2 className="text-xl font-semibold leading-relaxed">{currentQ.question}</h2>
            </div>
          </div>

          {currentQ.type === 'slider' ? (
            <div className="space-y-6">
              <div>
                <Slider
                  value={answers[currentQuestion] || [5]}
                  onValueChange={(value) => handleAnswer(value)}
                  max={currentQ.max}
                  min={currentQ.min}
                  step={currentQ.step}
                  className="w-full"
                />
              </div>
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>Not at all ({currentQ.min})</span>
                <span className="font-semibold text-primary">
                  {Array.isArray(answers[currentQuestion]) ? answers[currentQuestion][0] : answers[currentQuestion] || currentQ.min}
                </span>
                <span>Extremely ({currentQ.max})</span>
              </div>
            </div>
          ) : (
            <RadioGroup
              value={answers[currentQuestion]}
              onValueChange={handleAnswer}
              className="space-y-3"
            >
              {currentQ.options?.map((option, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <RadioGroupItem value={option.value} id={`option-${index}`} />
                  <Label htmlFor={`option-${index}`} className="cursor-pointer">
                    {option.label}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          )}
        </Card>

        {/* Navigation */}
        <div className="flex justify-between">
          <Button
            onClick={handleBack}
            variant="outline"
            className="flex items-center"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>

          <Button
            onClick={handleNext}
            disabled={!isAnswered}
            className="btn-assessment flex items-center"
          >
            {currentQuestion === questions.length - 1 ? 'Complete Section' : 'Next Question'}
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PsychometricSection;