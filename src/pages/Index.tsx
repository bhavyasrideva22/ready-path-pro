import { useState } from 'react';
import Layout from '@/components/Layout';
import Hero from '@/components/Hero';
import Introduction from '@/components/Introduction';
import PsychometricSection, { PsychometricScores } from '@/components/PsychometricSection';
import TechnicalSection from '@/components/TechnicalSection';
import WiscarAnalysis, { WiscarScores } from '@/components/WiscarAnalysis';
import Recommendations from '@/components/Recommendations';
import CareerGuidance from '@/components/CareerGuidance';

type AssessmentStep = 'hero' | 'introduction' | 'psychometric' | 'technical' | 'wiscar' | 'recommendations' | 'guidance';

const Index = () => {
  const [currentStep, setCurrentStep] = useState<AssessmentStep>('hero');
  const [psychometricScores, setPsychometricScores] = useState<PsychometricScores | null>(null);
  const [technicalScore, setTechnicalScore] = useState<number>(0);
  const [wiscarScores, setWiscarScores] = useState<WiscarScores | null>(null);

  const getStepNumber = (step: AssessmentStep): number => {
    const steps: AssessmentStep[] = ['hero', 'introduction', 'psychometric', 'technical', 'wiscar', 'recommendations', 'guidance'];
    return steps.indexOf(step);
  };

  const handleStartAssessment = () => {
    setCurrentStep('introduction');
  };

  const handleSkipIntroduction = () => {
    setCurrentStep('psychometric');
  };

  const handlePsychometricComplete = (scores: PsychometricScores) => {
    setPsychometricScores(scores);
    setCurrentStep('technical');
  };

  const handleTechnicalComplete = (score: number) => {
    setTechnicalScore(score);
    setCurrentStep('wiscar');
  };

  const handleWiscarComplete = (scores: WiscarScores) => {
    setWiscarScores(scores);
    setCurrentStep('recommendations');
  };

  const handleRecommendationsComplete = () => {
    setCurrentStep('guidance');
  };

  const handleRestartAssessment = () => {
    setPsychometricScores(null);
    setTechnicalScore(0);
    setWiscarScores(null);
    setCurrentStep('hero');
  };

  const goBack = () => {
    switch (currentStep) {
      case 'introduction':
        setCurrentStep('hero');
        break;
      case 'psychometric':
        setCurrentStep('introduction');
        break;
      case 'technical':
        setCurrentStep('psychometric');
        break;
      case 'wiscar':
        setCurrentStep('technical');
        break;
      case 'recommendations':
        setCurrentStep('wiscar');
        break;
      case 'guidance':
        setCurrentStep('recommendations');
        break;
    }
  };

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 'hero':
        return <Hero onStartAssessment={handleStartAssessment} />;
      
      case 'introduction':
        return (
          <Introduction 
            onNext={() => setCurrentStep('psychometric')}
            onSkip={handleSkipIntroduction}
          />
        );
      
      case 'psychometric':
        return (
          <PsychometricSection 
            onNext={handlePsychometricComplete}
            onBack={goBack}
          />
        );
      
      case 'technical':
        return (
          <TechnicalSection 
            onNext={handleTechnicalComplete}
            onBack={goBack}
          />
        );
      
      case 'wiscar':
        return psychometricScores ? (
          <WiscarAnalysis 
            psychometricScores={psychometricScores}
            technicalScore={technicalScore}
            onNext={handleWiscarComplete}
            onBack={goBack}
          />
        ) : null;
      
      case 'recommendations':
        return psychometricScores && wiscarScores ? (
          <Recommendations 
            wiscarScores={wiscarScores}
            psychometricScores={psychometricScores}
            technicalScore={technicalScore}
            onNext={handleRecommendationsComplete}
          />
        ) : null;
      
      case 'guidance':
        return <CareerGuidance onRestart={handleRestartAssessment} />;
      
      default:
        return <Hero onStartAssessment={handleStartAssessment} />;
    }
  };

  const showProgress = currentStep !== 'hero' && currentStep !== 'guidance';

  return (
    <Layout 
      currentStep={getStepNumber(currentStep)} 
      totalSteps={7}
      showProgress={showProgress}
    >
      {renderCurrentStep()}
    </Layout>
  );
};

export default Index;
