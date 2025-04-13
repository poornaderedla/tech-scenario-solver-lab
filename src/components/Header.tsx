
import React from 'react';
import { useUser } from '../contexts/UserContext';
import { Award, BarChart2, Brain } from 'lucide-react';

const Header = () => {
  const { role, stage, setStage } = useUser();

  return (
    <header className="border-b border-border">
      <div className="container mx-auto py-4 px-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Brain className="h-6 w-6 text-primary" />
          <h1 className="text-xl font-semibold">
            Tech Scenario Solver
            {role && (
              <span className="ml-2 text-sm text-muted-foreground">
                | {role === 'ai' ? 'AI' : role === 'servicenow' ? 'ServiceNow' : 'Salesforce'} Track
              </span>
            )}
          </h1>
        </div>
        
        <nav className="hidden md:flex items-center gap-6">
          {stage !== 'intro' && stage !== 'roleSelection' && (
            <>
              <button 
                onClick={() => setStage('scenario')}
                className="text-sm font-medium hover:text-primary transition-colors flex items-center gap-1.5"
              >
                <Brain className="h-4 w-4" />
                Scenarios
              </button>
              <button 
                onClick={() => setStage('feedback')}
                className="text-sm font-medium hover:text-primary transition-colors flex items-center gap-1.5"
              >
                <BarChart2 className="h-4 w-4" />
                Your Progress
              </button>
            </>
          )}
        </nav>
        
        <div className="flex items-center gap-3">
          <button className="text-sm font-medium text-primary hover:underline">
            <Award className="h-4 w-4 inline mr-1" />
            <span className="hidden md:inline">Practice makes unbreakable!</span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
