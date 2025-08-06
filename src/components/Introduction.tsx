import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Heart, Users, Lightbulb, MessageCircle, BarChart, Globe, ArrowRight, CheckCircle, Target } from 'lucide-react';

interface IntroductionProps {
  onNext: () => void;
  onSkip: () => void;
}

const Introduction = ({ onNext, onSkip }: IntroductionProps) => {
  const successTraits = [
    { icon: MessageCircle, label: "Communication Skills", description: "Ability to convey health information clearly" },
    { icon: Heart, label: "Empathy", description: "Understanding and connecting with diverse populations" },
    { icon: BarChart, label: "Analytical Thinking", description: "Evaluating health data and program effectiveness" },
    { icon: Users, label: "Cultural Competence", description: "Working effectively across different communities" },
    { icon: Lightbulb, label: "Persistence", description: "Commitment to long-term health behavior change" },
    { icon: Globe, label: "Community Focus", description: "Understanding population health needs" }
  ];

  const careerPaths = [
    "Health Educator",
    "Community Health Worker", 
    "Public Health Specialist",
    "Wellness Coordinator",
    "Health Promotion Manager",
    "Patient Education Coordinator"
  ];

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-12 animate-fade-in-up">
          <div className="inline-flex items-center bg-primary/10 rounded-full px-4 py-2 mb-6">
            <Heart className="w-4 h-4 mr-2 text-primary" />
            <span className="text-sm font-medium text-primary">Assessment Introduction</span>
          </div>
          
          <h1 className="text-4xl font-bold mb-4">
            Welcome to Your Health Educator Assessment
          </h1>
          
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            This comprehensive assessment will help you determine if you are well-suited 
            to become a Health Educator and outline your readiness to pursue this rewarding career.
          </p>
        </div>

        {/* Purpose Section */}
        <Card className="assessment-card p-8 mb-8 animate-scale-in">
          <div className="flex items-start space-x-4">
            <div className="bg-primary/10 rounded-lg p-3">
              <Target className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h2 className="text-2xl font-semibold mb-3">Assessment Purpose</h2>
              <p className="text-muted-foreground leading-relaxed">
                Health Educators play a crucial role in promoting wellness and preventing disease 
                in communities. They develop and implement educational programs, advocate for 
                public health policies, and work directly with individuals and groups to improve 
                health outcomes. This assessment evaluates your psychological fit, technical 
                readiness, and overall alignment with this vital profession.
              </p>
            </div>
          </div>
        </Card>

        {/* Career Paths */}
        <Card className="assessment-card p-8 mb-8">
          <h2 className="text-2xl font-semibold mb-4 flex items-center">
            <Users className="w-6 h-6 mr-3 text-secondary" />
            Common Career Paths
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {careerPaths.map((career, index) => (
              <Badge 
                key={index} 
                variant="secondary" 
                className="px-3 py-2 text-sm justify-center"
              >
                {career}
              </Badge>
            ))}
          </div>
        </Card>

        {/* Success Traits */}
        <Card className="assessment-card p-8 mb-8">
          <h2 className="text-2xl font-semibold mb-6 flex items-center">
            <CheckCircle className="w-6 h-6 mr-3 text-success" />
            Key Success Traits
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {successTraits.map((trait, index) => (
              <div key={index} className="flex items-start space-x-3">
                <div className="bg-accent/10 rounded-lg p-2 mt-1">
                  <trait.icon className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">{trait.label}</h3>
                  <p className="text-sm text-muted-foreground">{trait.description}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* What to Expect */}
        <Card className="assessment-card p-8 mb-8">
          <h2 className="text-2xl font-semibold mb-4 flex items-center">
            <BarChart className="w-6 h-6 mr-3 text-primary" />
            What to Expect
          </h2>
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <div className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-sm font-semibold">1</div>
              <div>
                <h3 className="font-semibold">Psychometric Evaluation (10 min)</h3>
                <p className="text-sm text-muted-foreground">Assess your personality, interests, and motivation</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="bg-secondary text-secondary-foreground rounded-full w-6 h-6 flex items-center justify-center text-sm font-semibold">2</div>
              <div>
                <h3 className="font-semibold">Technical & Aptitude Test (10 min)</h3>
                <p className="text-sm text-muted-foreground">Evaluate your logical reasoning and domain knowledge</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="bg-accent text-accent-foreground rounded-full w-6 h-6 flex items-center justify-center text-sm font-semibold">3</div>
              <div>
                <h3 className="font-semibold">WISCAR Analysis (Instant)</h3>
                <p className="text-sm text-muted-foreground">Comprehensive readiness assessment across six dimensions</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="bg-success text-success-foreground rounded-full w-6 h-6 flex items-center justify-center text-sm font-semibold">4</div>
              <div>
                <h3 className="font-semibold">Personalized Recommendations</h3>
                <p className="text-sm text-muted-foreground">Career guidance and learning roadmap tailored to you</p>
              </div>
            </div>
          </div>
        </Card>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button 
            onClick={onNext}
            size="lg"
            className="btn-assessment w-full sm:w-auto"
          >
            Start Assessment
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
          
          <Button 
            onClick={onSkip}
            variant="outline"
            size="lg"
            className="w-full sm:w-auto"
          >
            Skip Introduction
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Introduction;