import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Target, Brain, Heart, Lightbulb, Users, Globe, TrendingUp, ArrowRight, ArrowLeft } from 'lucide-react';
import { PsychometricScores } from './PsychometricSection';

interface WiscarAnalysisProps {
  psychometricScores: PsychometricScores;
  technicalScore: number;
  onNext: (wiscarScores: WiscarScores) => void;
  onBack: () => void;
}

export interface WiscarScores {
  will: number;
  interest: number;
  skill: number;
  cognitive: number;
  ability: number;
  realWorld: number;
  overall: number;
}

const WiscarAnalysis = ({ psychometricScores, technicalScore, onNext, onBack }: WiscarAnalysisProps) => {
  // Calculate WISCAR scores based on assessment data
  const calculateWiscarScores = (): WiscarScores => {
    const will = Math.round((psychometricScores.motivation.internal + psychometricScores.gritScore) / 2);
    const interest = Math.round(psychometricScores.interestScore);
    const skill = Math.round((technicalScore + (psychometricScores.personalityTraits.conscientiousness + psychometricScores.personalityTraits.agreeableness) / 2) / 2);
    const cognitive = Math.round((technicalScore + psychometricScores.personalityTraits.openness) / 2);
    const ability = Math.round((psychometricScores.growthMindset + psychometricScores.gritScore) / 2);
    const realWorld = Math.round((psychometricScores.personalityTraits.extraversion + psychometricScores.personalityTraits.agreeableness + technicalScore) / 3);
    const overall = Math.round((will + interest + skill + cognitive + ability + realWorld) / 6);

    return { will, interest, skill, cognitive, ability, realWorld, overall };
  };

  const wiscarScores = calculateWiscarScores();

  const dimensions = [
    {
      key: 'will' as keyof WiscarScores,
      label: 'Will',
      icon: Heart,
      color: 'text-wiscar-will',
      bgColor: 'bg-wiscar-will/10',
      description: 'Inner drive and motivation consistency',
      score: wiscarScores.will,
      interpretation: getInterpretation('will', wiscarScores.will)
    },
    {
      key: 'interest' as keyof WiscarScores,
      label: 'Interest',
      icon: TrendingUp,
      color: 'text-wiscar-interest',
      bgColor: 'bg-wiscar-interest/10',
      description: 'Genuine curiosity and relevance',
      score: wiscarScores.interest,
      interpretation: getInterpretation('interest', wiscarScores.interest)
    },
    {
      key: 'skill' as keyof WiscarScores,
      label: 'Skill',
      icon: Target,
      color: 'text-wiscar-skill',
      bgColor: 'bg-wiscar-skill/10',
      description: 'Current relevant skills (soft + technical)',
      score: wiscarScores.skill,
      interpretation: getInterpretation('skill', wiscarScores.skill)
    },
    {
      key: 'cognitive' as keyof WiscarScores,
      label: 'Cognitive Readiness',
      icon: Brain,
      color: 'text-wiscar-cognitive',
      bgColor: 'bg-wiscar-cognitive/10',
      description: 'Analytical thinking and problem-solving ability',
      score: wiscarScores.cognitive,
      interpretation: getInterpretation('cognitive', wiscarScores.cognitive)
    },
    {
      key: 'ability' as keyof WiscarScores,
      label: 'Ability to Learn',
      icon: Lightbulb,
      color: 'text-wiscar-ability',
      bgColor: 'bg-wiscar-ability/10',
      description: 'Openness to feedback and persistence',
      score: wiscarScores.ability,
      interpretation: getInterpretation('ability', wiscarScores.ability)
    },
    {
      key: 'realWorld' as keyof WiscarScores,
      label: 'Real-World Alignment',
      icon: Globe,
      color: 'text-wiscar-realworld',
      bgColor: 'bg-wiscar-realworld/10',
      description: 'Match with job roles and culture fit',
      score: wiscarScores.realWorld,
      interpretation: getInterpretation('realWorld', wiscarScores.realWorld)
    }
  ];

  function getInterpretation(dimension: string, score: number): { level: string; message: string; color: string } {
    if (score >= 80) {
      return {
        level: "Excellent",
        message: "Strong alignment and readiness",
        color: "text-success"
      };
    } else if (score >= 60) {
      return {
        level: "Good",
        message: "Solid foundation with room for growth",
        color: "text-primary"
      };
    } else if (score >= 40) {
      return {
        level: "Developing",
        message: "Some strengths, needs development",
        color: "text-warning"
      };
    } else {
      return {
        level: "Needs Work",
        message: "Significant development required",
        color: "text-destructive"
      };
    }
  }

  const handleNext = () => {
    onNext(wiscarScores);
  };

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center bg-accent/10 rounded-full px-4 py-2 mb-4">
            <Target className="w-4 h-4 mr-2 text-accent" />
            <span className="text-sm font-medium text-accent">WISCAR Framework Analysis</span>
          </div>
          <h1 className="text-4xl font-bold mb-4">Your Comprehensive Readiness Assessment</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Based on your psychometric and technical assessments, here's your detailed analysis 
            across the six WISCAR dimensions that predict success in health education.
          </p>
        </div>

        {/* Overall Score */}
        <Card className="assessment-card p-8 mb-8 text-center">
          <div className="mb-6">
            <div className="text-6xl font-bold text-primary mb-2">{wiscarScores.overall}</div>
            <div className="text-xl text-muted-foreground">Overall Readiness Score</div>
            <Badge 
              variant="secondary" 
              className={`mt-2 ${getInterpretation('overall', wiscarScores.overall).color}`}
            >
              {getInterpretation('overall', wiscarScores.overall).level}
            </Badge>
          </div>
          <Progress value={wiscarScores.overall} className="h-4 max-w-md mx-auto" />
        </Card>

        {/* Dimension Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {dimensions.map((dimension) => (
            <Card key={dimension.key} className="score-card">
              <div className="flex items-start space-x-4 mb-4">
                <div className={`${dimension.bgColor} rounded-lg p-3`}>
                  <dimension.icon className={`w-6 h-6 ${dimension.color}`} />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-lg">{dimension.label}</h3>
                  <p className="text-sm text-muted-foreground">{dimension.description}</p>
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold">{dimension.score}</span>
                  <Badge 
                    variant="outline" 
                    className={dimension.interpretation.color}
                  >
                    {dimension.interpretation.level}
                  </Badge>
                </div>
                
                <Progress value={dimension.score} className="h-2" />
                
                <p className="text-sm text-muted-foreground">
                  {dimension.interpretation.message}
                </p>
              </div>
            </Card>
          ))}
        </div>

        {/* Radar Chart Placeholder */}
        <Card className="assessment-card p-8 mb-8">
          <h2 className="text-2xl font-semibold mb-6 text-center">WISCAR Readiness Profile</h2>
          <div className="bg-muted/20 rounded-lg p-8 text-center">
            <div className="w-64 h-64 mx-auto bg-gradient-to-br from-primary/10 to-secondary/10 rounded-full flex items-center justify-center">
              <div className="text-center">
                <Target className="w-16 h-16 text-primary mx-auto mb-4" />
                <p className="text-lg font-semibold">Interactive Radar Chart</p>
                <p className="text-sm text-muted-foreground">Visual representation of your WISCAR profile</p>
              </div>
            </div>
          </div>
        </Card>

        {/* Key Insights */}
        <Card className="assessment-card p-8 mb-8">
          <h2 className="text-2xl font-semibold mb-6">Key Insights</h2>
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <div className="bg-success/10 rounded-full p-2">
                <TrendingUp className="w-5 h-5 text-success" />
              </div>
              <div>
                <h3 className="font-semibold text-success">Strengths</h3>
                <p className="text-sm text-muted-foreground">
                  {dimensions
                    .filter(d => d.score >= 70)
                    .map(d => d.label)
                    .join(', ') || 'Continue building foundational skills'}
                </p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <div className="bg-warning/10 rounded-full p-2">
                <Target className="w-5 h-5 text-warning" />
              </div>
              <div>
                <h3 className="font-semibold text-warning">Growth Areas</h3>
                <p className="text-sm text-muted-foreground">
                  {dimensions
                    .filter(d => d.score < 70)
                    .map(d => d.label)
                    .join(', ') || 'Strong across all dimensions'}
                </p>
              </div>
            </div>
          </div>
        </Card>

        {/* Navigation */}
        <div className="flex justify-between">
          <Button
            onClick={onBack}
            variant="outline"
            className="flex items-center"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Technical Test
          </Button>

          <Button
            onClick={handleNext}
            className="btn-assessment flex items-center"
          >
            View Recommendations
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default WiscarAnalysis;