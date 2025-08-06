import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { BookOpen, Brain, Timer, ArrowRight, ArrowLeft, CheckCircle, XCircle } from 'lucide-react';

interface TechnicalSectionProps {
  onNext: (score: number) => void;
  onBack: () => void;
}

const TechnicalSection = ({ onNext, onBack }: TechnicalSectionProps) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [timeLeft, setTimeLeft] = useState(900); // 15 minutes
  const [showFeedback, setShowFeedback] = useState(false);

  const questions = [
    {
      category: "Logical Reasoning",
      type: "multiple-choice",
      question: "If all health educators must complete continuing education, and Sarah is a health educator, what can we conclude?",
      options: [
        { value: "A", label: "Sarah enjoys learning" },
        { value: "B", label: "Sarah must complete continuing education" },
        { value: "C", label: "Sarah is a good teacher" },
        { value: "D", label: "Sarah works in a hospital" }
      ],
      correct: "B",
      explanation: "This is a logical deduction based on the given premise."
    },
    {
      category: "Numerical Reasoning",
      type: "multiple-choice", 
      question: "A community health program serves 500 people. If 60% participate in screening, and 25% of those screened need follow-up, how many people need follow-up?",
      options: [
        { value: "A", label: "75 people" },
        { value: "B", label: "125 people" },
        { value: "C", label: "150 people" },
        { value: "D", label: "300 people" }
      ],
      correct: "A",
      explanation: "500 × 0.60 = 300 screened; 300 × 0.25 = 75 need follow-up"
    },
    {
      category: "Health Knowledge",
      type: "multiple-choice",
      question: "Which of the following is a primary prevention strategy?",
      options: [
        { value: "A", label: "Cancer screening programs" },
        { value: "B", label: "Vaccination programs" },
        { value: "C", label: "Rehabilitation services" },
        { value: "D", label: "Disease treatment" }
      ],
      correct: "B",
      explanation: "Primary prevention prevents disease before it occurs. Vaccination is a primary prevention strategy."
    },
    {
      category: "Health Education Principles",
      type: "multiple-choice",
      question: "What is the most important factor when designing health education materials for a diverse community?",
      options: [
        { value: "A", label: "Using medical terminology" },
        { value: "B", label: "Cultural competence and health literacy" },
        { value: "C", label: "Including lots of statistics" },
        { value: "D", label: "Making them colorful" }
      ],
      correct: "B",
      explanation: "Cultural competence and appropriate health literacy levels are crucial for effective health education."
    },
    {
      category: "Program Planning",
      type: "multiple-choice",
      question: "In health education program evaluation, what does 'process evaluation' assess?",
      options: [
        { value: "A", label: "Long-term health outcomes" },
        { value: "B", label: "Cost-effectiveness" },
        { value: "C", label: "How well the program was implemented" },
        { value: "D", label: "Participant satisfaction only" }
      ],
      correct: "C",
      explanation: "Process evaluation examines how well a program was implemented, including reach, dose, and fidelity."
    },
    {
      category: "Community Health",
      type: "multiple-choice",
      question: "Which of the following best describes the social determinants of health?",
      options: [
        { value: "A", label: "Individual genetic factors" },
        { value: "B", label: "Environmental and social conditions affecting health" },
        { value: "C", label: "Medical treatments available" },
        { value: "D", label: "Personal health behaviors only" }
      ],
      correct: "B",
      explanation: "Social determinants include environmental, economic, and social factors that influence health outcomes."
    },
    {
      category: "Research & Data",
      type: "multiple-choice",
      question: "What type of study design is best for establishing cause-and-effect relationships?",
      options: [
        { value: "A", label: "Cross-sectional study" },
        { value: "B", label: "Case study" },
        { value: "C", label: "Randomized controlled trial" },
        { value: "D", label: "Survey research" }
      ],
      correct: "C",
      explanation: "Randomized controlled trials are the gold standard for establishing causal relationships."
    },
    {
      category: "Behavioral Change",
      type: "multiple-choice",
      question: "According to the Transtheoretical Model, what stage comes after 'Contemplation'?",
      options: [
        { value: "A", label: "Action" },
        { value: "B", label: "Precontemplation" },
        { value: "C", label: "Preparation" },
        { value: "D", label: "Maintenance" }
      ],
      correct: "C",
      explanation: "The stages progress: Precontemplation → Contemplation → Preparation → Action → Maintenance"
    },
    {
      category: "Pattern Recognition",
      type: "multiple-choice",
      question: "In a sequence: 2, 6, 18, 54, ?, what is the next number?",
      options: [
        { value: "A", label: "108" },
        { value: "B", label: "162" },
        { value: "C", label: "144" },
        { value: "D", label: "216" }
      ],
      correct: "B",
      explanation: "Each number is multiplied by 3: 2×3=6, 6×3=18, 18×3=54, 54×3=162"
    },
    {
      category: "Critical Thinking",
      type: "multiple-choice",
      question: "A health education program shows a 20% improvement in knowledge scores. What additional information is most important to assess program effectiveness?",
      options: [
        { value: "A", label: "Program cost" },
        { value: "B", label: "Behavior change and health outcomes" },
        { value: "C", label: "Number of participants" },
        { value: "D", label: "Duration of program" }
      ],
      correct: "B",
      explanation: "Knowledge improvement alone doesn't guarantee behavior change or better health outcomes, which are the ultimate goals."
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          // Time's up - auto-submit
          const finalScore = calculateScore();
          onNext(finalScore);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const progress = ((currentQuestion + 1) / questions.length) * 100;
  const currentQ = questions[currentQuestion];

  const handleAnswer = (value: string) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = value;
    setAnswers(newAnswers);
  };

  const handleNext = () => {
    if (showFeedback) {
      setShowFeedback(false);
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
      } else {
        const finalScore = calculateScore();
        onNext(finalScore);
      }
    } else {
      setShowFeedback(true);
    }
  };

  const handleBack = () => {
    if (showFeedback) {
      setShowFeedback(false);
    } else if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    } else {
      onBack();
    }
  };

  const calculateScore = (): number => {
    const correctAnswers = answers.filter((answer, index) => 
      answer === questions[index]?.correct
    ).length;
    return Math.round((correctAnswers / questions.length) * 100);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const isAnswered = answers[currentQuestion] !== undefined;
  const isCorrect = answers[currentQuestion] === currentQ.correct;

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto px-4 max-w-3xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center bg-wiscar-skill/10 rounded-full px-4 py-2 mb-4">
            <BookOpen className="w-4 h-4 mr-2 text-wiscar-skill" />
            <span className="text-sm font-medium text-wiscar-skill">Technical & Aptitude Assessment</span>
          </div>
          <h1 className="text-3xl font-bold mb-2">Knowledge & Reasoning Test</h1>
          <div className="flex items-center justify-center space-x-4 text-muted-foreground">
            <span>Question {currentQuestion + 1} of {questions.length}</span>
            <div className="flex items-center space-x-1">
              <Timer className="w-4 h-4" />
              <span className={`font-mono ${timeLeft < 300 ? 'text-warning' : ''}`}>
                {formatTime(timeLeft)}
              </span>
            </div>
          </div>
        </div>

        {/* Progress */}
        <div className="mb-8">
          <Progress value={progress} className="h-3" />
        </div>

        {/* Question Card */}
        <Card className="assessment-card p-8 mb-8">
          <div className="flex items-start space-x-4 mb-6">
            <div className="bg-gradient-to-br from-wiscar-skill/20 to-wiscar-skill/10 rounded-lg p-3">
              <Brain className="w-6 h-6 text-wiscar-skill" />
            </div>
            <div>
              <div className="text-sm text-muted-foreground mb-2">{currentQ.category}</div>
              <h2 className="text-xl font-semibold leading-relaxed">{currentQ.question}</h2>
            </div>
          </div>

          <RadioGroup
            value={answers[currentQuestion]}
            onValueChange={handleAnswer}
            className="space-y-3"
            disabled={showFeedback}
          >
            {currentQ.options.map((option, index) => (
              <div 
                key={index} 
                className={`flex items-center space-x-3 p-3 rounded-lg border transition-colors ${
                  showFeedback 
                    ? option.value === currentQ.correct 
                      ? 'border-success bg-success/5' 
                      : option.value === answers[currentQuestion] && option.value !== currentQ.correct
                        ? 'border-destructive bg-destructive/5'
                        : 'border-border'
                    : 'border-border hover:border-primary/30'
                }`}
              >
                <RadioGroupItem value={option.value} id={`option-${index}`} />
                <Label htmlFor={`option-${index}`} className="cursor-pointer flex-1">
                  {option.label}
                </Label>
                {showFeedback && option.value === currentQ.correct && (
                  <CheckCircle className="w-5 h-5 text-success" />
                )}
                {showFeedback && option.value === answers[currentQuestion] && option.value !== currentQ.correct && (
                  <XCircle className="w-5 h-5 text-destructive" />
                )}
              </div>
            ))}
          </RadioGroup>

          {/* Feedback */}
          {showFeedback && (
            <div className={`mt-6 p-4 rounded-lg ${isCorrect ? 'bg-success/10' : 'bg-destructive/10'}`}>
              <div className="flex items-start space-x-3">
                {isCorrect ? (
                  <CheckCircle className="w-5 h-5 text-success mt-0.5" />
                ) : (
                  <XCircle className="w-5 h-5 text-destructive mt-0.5" />
                )}
                <div>
                  <div className={`font-semibold ${isCorrect ? 'text-success' : 'text-destructive'}`}>
                    {isCorrect ? 'Correct!' : 'Incorrect'}
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">
                    {currentQ.explanation}
                  </p>
                </div>
              </div>
            </div>
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
            {showFeedback 
              ? currentQuestion === questions.length - 1 
                ? 'Complete Section' 
                : 'Next Question'
              : 'Submit Answer'
            }
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TechnicalSection;