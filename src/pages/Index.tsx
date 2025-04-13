
import React from 'react';
import { UserProvider, useUser } from '../contexts/UserContext';
import Header from '../components/Header';
import RoleSelection from '../components/RoleSelection';
import ScenarioEngine from '../components/ScenarioEngine';
import FeedbackDashboard from '../components/FeedbackDashboard';
import Footer from '../components/Footer';
import { Button } from '@/components/ui/button';
import { Brain } from 'lucide-react';

const LandingPage = () => {
  const { stage, setStage } = useUser();
  
  if (stage !== 'intro') return null;
  
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center px-4 animate-fade-in">
      <div className="max-w-3xl text-center">
        <div className="inline-block p-3 bg-primary/10 rounded-full mb-6">
          <Brain className="h-12 w-12 text-primary" />
        </div>
        <h1 className="text-5xl font-bold tracking-tight mb-6">
          Master Tech Decision-Making with Real-World Scenarios
        </h1>
        <p className="text-xl text-muted-foreground mb-8">
          Practice makes unbreakable. Train your problem-solving skills in AI, ServiceNow, and Salesforce 
          through immersive scenario-based challenges with expert feedback.
        </p>
        <Button size="lg" onClick={() => setStage('roleSelection')} className="text-lg px-8 py-6">
          Start Practicing
        </Button>
        <p className="mt-4 text-sm text-muted-foreground">
          No penalties—just growth! Perfect for tech career preparation.
        </p>
      </div>
    </div>
  );
};

const MainContent = () => {
  const { stage } = useUser();
  
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        {stage === 'intro' && <LandingPage />}
        {stage === 'roleSelection' && <RoleSelection />}
        {stage === 'scenario' && <ScenarioEngine />}
        {stage === 'feedback' && <FeedbackDashboard />}
      </main>
      <Footer />
    </div>
  );
};

const Index = () => {
  return (
    <UserProvider>
      <MainContent />
    </UserProvider>
  );
};

export default Index;
