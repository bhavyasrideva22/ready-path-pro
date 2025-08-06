import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Heart, Users, BookOpen, Target, CheckCircle, Clock, Award } from 'lucide-react';

interface HeroProps {
  onStartAssessment: () => void;
}

const Hero = ({ onStartAssessment }: HeroProps) => {
  return (
    <div className="relative">
      {/* Hero Section */}
      <section className="hero-gradient text-white py-20 overflow-hidden relative">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
              <Heart className="w-4 h-4 mr-2" />
              <span className="text-sm font-medium">AI-Powered Career Assessment</span>
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              Health Educator Readiness &
              <span className="block text-accent-light">Career Fit Assessment</span>
            </h1>
            
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto leading-relaxed">
              Discover if you're ready to become a Health Educator through our comprehensive 
              AI-driven assessment covering psychology, aptitude, and the WISCAR framework.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <Button 
                onClick={onStartAssessment}
                size="lg"
                className="bg-white text-primary hover:bg-white/90 font-semibold px-8 py-4 text-lg rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Start Assessment
                <Target className="ml-2 w-5 h-5" />
              </Button>
              
              <div className="flex items-center text-white/80">
                <Clock className="w-4 h-4 mr-2" />
                <span>20-30 minutes</span>
              </div>
            </div>
            
            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
              <div className="text-center">
                <div className="text-3xl font-bold mb-2">98%</div>
                <div className="text-white/80">Accuracy Rate</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold mb-2">15K+</div>
                <div className="text-white/80">Assessments Completed</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold mb-2">6</div>
                <div className="text-white/80">WISCAR Dimensions</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Comprehensive Assessment Framework</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our assessment evaluates your readiness across multiple dimensions to provide 
              accurate career guidance and personalized learning recommendations.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="assessment-card p-6 text-center">
              <div className="bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Psychometric</h3>
              <p className="text-sm text-muted-foreground">
                Personality traits, interests, motivation, and cognitive style assessment
              </p>
            </Card>
            
            <Card className="assessment-card p-6 text-center">
              <div className="bg-secondary/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <BookOpen className="w-8 h-8 text-secondary" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Technical & Aptitude</h3>
              <p className="text-sm text-muted-foreground">
                Domain knowledge, logical reasoning, and prerequisite skills evaluation
              </p>
            </Card>
            
            <Card className="assessment-card p-6 text-center">
              <div className="bg-accent/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Target className="w-8 h-8 text-accent" />
              </div>
              <h3 className="text-lg font-semibold mb-2">WISCAR Framework</h3>
              <p className="text-sm text-muted-foreground">
                Will, Interest, Skill, Cognitive, Ability, Real-world alignment analysis
              </p>
            </Card>
            
            <Card className="assessment-card p-6 text-center">
              <div className="bg-success/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Award className="w-8 h-8 text-success" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Career Guidance</h3>
              <p className="text-sm text-muted-foreground">
                Personalized recommendations, learning paths, and alternative careers
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Discover Your Path?</h2>
            <p className="text-muted-foreground mb-8">
              Join thousands who have discovered their career readiness through our 
              comprehensive assessment platform.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button 
                onClick={onStartAssessment}
                size="lg"
                className="btn-assessment"
              >
                Begin Your Assessment
                <CheckCircle className="ml-2 w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Hero;