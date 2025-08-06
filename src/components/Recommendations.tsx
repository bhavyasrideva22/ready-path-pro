import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { CheckCircle, XCircle, AlertCircle, Download, Share2, BookOpen, Users, Award, TrendingUp, ArrowRight, ExternalLink } from 'lucide-react';
import { WiscarScores } from './WiscarAnalysis';
import { PsychometricScores } from './PsychometricSection';

interface RecommendationsProps {
  wiscarScores: WiscarScores;
  psychometricScores: PsychometricScores;
  technicalScore: number;
  onNext: () => void;
}

const Recommendations = ({ wiscarScores, psychometricScores, technicalScore, onNext }: RecommendationsProps) => {
  const getDecision = (): { decision: 'yes' | 'no' | 'maybe'; confidence: number; reasoning: string[] } => {
    const avgScore = wiscarScores.overall;
    const criticalScores = [wiscarScores.will, wiscarScores.interest, wiscarScores.skill];
    const minCritical = Math.min(...criticalScores);
    
    if (avgScore >= 75 && minCritical >= 60) {
      return {
        decision: 'yes',
        confidence: avgScore,
        reasoning: [
          'Strong overall readiness across multiple dimensions',
          'High motivation and genuine interest in health education',
          'Solid foundation of required skills and knowledge',
          'Good alignment with health educator role requirements'
        ]
      };
    } else if (avgScore >= 50 && minCritical >= 40) {
      return {
        decision: 'maybe',
        confidence: avgScore,
        reasoning: [
          'Moderate readiness with potential for growth',
          'Some strengths that align with health education',
          'Areas needing development before full readiness',
          'Could benefit from targeted skill building'
        ]
      };
    } else {
      return {
        decision: 'no',
        confidence: avgScore,
        reasoning: [
          'Current readiness level needs significant improvement',
          'Multiple areas require substantial development',
          'Consider exploring related fields or foundational learning',
          'May benefit from alternative career paths'
        ]
      };
    }
  };

  const decision = getDecision();

  const learningPaths = {
    beginner: [
      { title: "Introduction to Public Health", provider: "Coursera", duration: "4 weeks" },
      { title: "Health Communication Fundamentals", provider: "edX", duration: "6 weeks" },
      { title: "Community Health Assessment", provider: "FutureLearn", duration: "3 weeks" }
    ],
    intermediate: [
      { title: "Program Planning & Evaluation", provider: "University Extension", duration: "8 weeks" },
      { title: "Health Behavior Change Theory", provider: "Professional Association", duration: "6 weeks" },
      { title: "Cultural Competency in Health Education", provider: "Online Institute", duration: "4 weeks" }
    ],
    advanced: [
      { title: "Certified Health Education Specialist (CHES)", provider: "NCHEC", duration: "Exam Prep" },
      { title: "Graduate Certificate in Health Education", provider: "Accredited University", duration: "1 year" },
      { title: "Fieldwork & Practicum", provider: "Local Health Department", duration: "3-6 months" }
    ]
  };

  const alternativeCareers = [
    { title: "Community Health Worker", match: "85%", description: "Direct community engagement focus" },
    { title: "Health Communications Specialist", match: "78%", description: "Content creation and messaging" },
    { title: "Wellness Program Coordinator", match: "72%", description: "Corporate wellness and prevention" },
    { title: "Patient Education Coordinator", match: "68%", description: "Clinical education support" },
    { title: "Public Health Analyst", match: "65%", description: "Data analysis and research focus" }
  ];

  const careerRoles = [
    {
      title: "Health Educator",
      match: `${Math.round((wiscarScores.overall + wiscarScores.interest + wiscarScores.will) / 3)}%`,
      requirements: ["Bachelor's degree", "CHES certification preferred", "2+ years experience"],
      salary: "$45,000 - $65,000",
      outlook: "Growing demand"
    },
    {
      title: "Community Health Specialist",
      match: `${Math.round((wiscarScores.realWorld + wiscarScores.skill + wiscarScores.cognitive) / 3)}%`,
      requirements: ["Bachelor's in Public Health", "Community outreach experience", "Bilingual preferred"],
      salary: "$40,000 - $55,000",
      outlook: "Stable growth"
    },
    {
      title: "Wellness Coordinator",
      match: `${Math.round((wiscarScores.interest + wiscarScores.ability + wiscarScores.skill) / 3)}%`,
      requirements: ["Health/Wellness degree", "Program management", "Certification preferred"],
      salary: "$38,000 - $52,000",
      outlook: "High demand"
    }
  ];

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center bg-success/10 rounded-full px-4 py-2 mb-4">
            <Award className="w-4 h-4 mr-2 text-success" />
            <span className="text-sm font-medium text-success">Assessment Complete</span>
          </div>
          <h1 className="text-4xl font-bold mb-4">Your Personalized Recommendations</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Based on your comprehensive assessment, here are your tailored career guidance 
            and development recommendations.
          </p>
        </div>

        {/* Decision Card */}
        <Card className={`assessment-card p-8 mb-8 border-2 ${
          decision.decision === 'yes' ? 'border-success/20 bg-success/5' :
          decision.decision === 'maybe' ? 'border-warning/20 bg-warning/5' :
          'border-destructive/20 bg-destructive/5'
        }`}>
          <div className="text-center">
            <div className="flex items-center justify-center mb-4">
              {decision.decision === 'yes' && <CheckCircle className="w-16 h-16 text-success" />}
              {decision.decision === 'maybe' && <AlertCircle className="w-16 h-16 text-warning" />}
              {decision.decision === 'no' && <XCircle className="w-16 h-16 text-destructive" />}
            </div>
            
            <h2 className="text-3xl font-bold mb-4">
              {decision.decision === 'yes' && 'Recommended: Pursue Health Education'}
              {decision.decision === 'maybe' && 'Conditional: Development Needed'}
              {decision.decision === 'no' && 'Not Recommended: Consider Alternatives'}
            </h2>
            
            <div className="flex items-center justify-center space-x-4 mb-6">
              <span className="text-lg text-muted-foreground">Confidence Score:</span>
              <span className="text-3xl font-bold">{decision.confidence}%</span>
            </div>
            
            <Progress value={decision.confidence} className="h-3 max-w-md mx-auto mb-6" />
            
            <div className="text-left max-w-2xl mx-auto">
              <h3 className="font-semibold mb-3">Why this recommendation?</h3>
              <ul className="space-y-2">
                {decision.reasoning.map((reason, index) => (
                  <li key={index} className="flex items-start space-x-2">
                    <div className="bg-primary/10 rounded-full p-1 mt-1">
                      <div className="w-2 h-2 bg-primary rounded-full"></div>
                    </div>
                    <span className="text-muted-foreground">{reason}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Card>

        {/* Career Roles Mapping */}
        <Card className="assessment-card p-8 mb-8">
          <h2 className="text-2xl font-semibold mb-6 flex items-center">
            <Users className="w-6 h-6 mr-3 text-primary" />
            Health Education Career Opportunities
          </h2>
          <div className="space-y-4">
            {careerRoles.map((role, index) => (
              <div key={index} className="border border-border/50 rounded-lg p-4">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="text-lg font-semibold">{role.title}</h3>
                    <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                      <span>{role.salary}</span>
                      <span>•</span>
                      <span>{role.outlook}</span>
                    </div>
                  </div>
                  <Badge variant="outline" className="text-primary">
                    {role.match} Match
                  </Badge>
                </div>
                <div className="space-y-2">
                  <div>
                    <span className="text-sm font-medium">Requirements: </span>
                    <span className="text-sm text-muted-foreground">
                      {role.requirements.join(' • ')}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Learning Roadmap */}
        <Card className="assessment-card p-8 mb-8">
          <h2 className="text-2xl font-semibold mb-6 flex items-center">
            <BookOpen className="w-6 h-6 mr-3 text-secondary" />
            Personalized Learning Path
          </h2>
          
          <div className="space-y-8">
            {/* Beginner Level */}
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center text-sm font-semibold">1</div>
                <h3 className="text-lg font-semibold">Foundation Level</h3>
                <Badge variant="secondary">Recommended for all</Badge>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {learningPaths.beginner.map((course, index) => (
                  <div key={index} className="border border-border/50 rounded-lg p-4">
                    <h4 className="font-semibold mb-2">{course.title}</h4>
                    <div className="text-sm text-muted-foreground space-y-1">
                      <div>{course.provider}</div>
                      <div>{course.duration}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Intermediate Level */}
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="bg-secondary text-secondary-foreground rounded-full w-8 h-8 flex items-center justify-center text-sm font-semibold">2</div>
                <h3 className="text-lg font-semibold">Intermediate Level</h3>
                <Badge variant="outline" className={wiscarScores.skill >= 60 ? 'text-success' : 'text-warning'}>
                  {wiscarScores.skill >= 60 ? 'Ready' : 'Complete Level 1 first'}
                </Badge>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {learningPaths.intermediate.map((course, index) => (
                  <div key={index} className="border border-border/50 rounded-lg p-4">
                    <h4 className="font-semibold mb-2">{course.title}</h4>
                    <div className="text-sm text-muted-foreground space-y-1">
                      <div>{course.provider}</div>
                      <div>{course.duration}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Advanced Level */}
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="bg-accent text-accent-foreground rounded-full w-8 h-8 flex items-center justify-center text-sm font-semibold">3</div>
                <h3 className="text-lg font-semibold">Job-Ready Level</h3>
                <Badge variant="outline" className={wiscarScores.overall >= 70 ? 'text-success' : 'text-warning'}>
                  {wiscarScores.overall >= 70 ? 'Ready for advancement' : 'Build foundation first'}
                </Badge>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {learningPaths.advanced.map((course, index) => (
                  <div key={index} className="border border-border/50 rounded-lg p-4">
                    <h4 className="font-semibold mb-2">{course.title}</h4>
                    <div className="text-sm text-muted-foreground space-y-1">
                      <div>{course.provider}</div>
                      <div>{course.duration}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Card>

        {/* Alternative Careers */}
        {decision.decision !== 'yes' && (
          <Card className="assessment-card p-8 mb-8">
            <h2 className="text-2xl font-semibold mb-6 flex items-center">
              <TrendingUp className="w-6 h-6 mr-3 text-accent" />
              Alternative Career Paths
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {alternativeCareers.slice(0, 4).map((career, index) => (
                <div key={index} className="border border-border/50 rounded-lg p-4">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-semibold">{career.title}</h3>
                    <Badge variant="outline" className="text-primary">
                      {career.match} Match
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">{career.description}</p>
                </div>
              ))}
            </div>
          </Card>
        )}

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button 
            className="btn-assessment flex items-center"
          >
            <Download className="w-4 h-4 mr-2" />
            Download Report
          </Button>
          
          <Button 
            variant="outline"
            className="flex items-center"
          >
            <Share2 className="w-4 h-4 mr-2" />
            Share Results
          </Button>

          <Button 
            onClick={onNext}
            variant="outline"
            className="flex items-center"
          >
            Explore More Resources
            <ExternalLink className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Recommendations;