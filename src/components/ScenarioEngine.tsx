
import React, { useState } from 'react';
import { useUser } from '../contexts/UserContext';
import { getScenariosByRole, getScenarioById, Scenario, Option } from '../data/scenarios';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, Clock, AlertCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const ScenarioEngine = () => {
  const { role, completedScenarios, addCompletedScenario, updateCompetencies } = useUser();
  const [currentScenarioId, setCurrentScenarioId] = useState<string | null>(null);
  const [selectedOption, setSelectedOption] = useState<Option | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const { toast } = useToast();

  if (!role) return null;

  const availableScenarios = getScenariosByRole(role).filter(
    scenario => !completedScenarios.includes(scenario.id)
  );

  const currentScenario = currentScenarioId ? getScenarioById(currentScenarioId) : null;

  const handleStartScenario = (scenarioId: string) => {
    setCurrentScenarioId(scenarioId);
    setSelectedOption(null);
    setShowFeedback(false);
  };

  const handleSelectOption = (option: Option) => {
    setSelectedOption(option);
  };

  const handleSubmitAnswer = () => {
    if (!selectedOption || !currentScenarioId) return;
    
    // Update competencies based on selected option
    updateCompetencies({
      technicalJudgment: selectedOption.technicalJudgment,
      stakeholderManagement: selectedOption.stakeholderManagement,
      adaptability: selectedOption.adaptability,
    });
    
    // Mark the scenario as completed
    addCompletedScenario(currentScenarioId);
    
    // Show feedback
    setShowFeedback(true);
    
    // Show toast notification
    toast({
      title: "Response submitted!",
      description: "See your feedback below and continue to the next scenario.",
      duration: 5000,
    });
  };

  const handleCompleteScenario = () => {
    setCurrentScenarioId(null);
    setSelectedOption(null);
    setShowFeedback(false);
  };

  if (currentScenario) {
    return (
      <div className="container mx-auto py-8 px-4">
        <Card className="max-w-4xl mx-auto border-2 shadow-md">
          <CardHeader>
            <div className="flex justify-between items-center mb-2">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Clock className="h-4 w-4" />
                <span>5-10 min scenario</span>
              </div>
              <div className="text-sm text-muted-foreground">
                {role === 'ai' ? 'AI Engineering' : role === 'servicenow' ? 'ServiceNow' : 'Salesforce'} Track
              </div>
            </div>
            <CardTitle className="text-2xl font-bold">{currentScenario.title}</CardTitle>
            <CardDescription className="text-lg">{currentScenario.description}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="bg-muted rounded-md p-5 border border-border">
              <h3 className="text-lg font-semibold mb-3">Scenario Context</h3>
              <p className="text-foreground">{currentScenario.context}</p>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">What would you do?</h3>
              <div className="space-y-3">
                {currentScenario.options.map((option) => (
                  <div
                    key={option.id}
                    className={`scenario-option ${selectedOption?.id === option.id ? 'selected' : ''}`}
                    onClick={() => handleSelectOption(option)}
                  >
                    <p>{option.text}</p>
                  </div>
                ))}
              </div>
            </div>
            
            {showFeedback && selectedOption && (
              <div className="bg-secondary rounded-md p-5 border border-border animate-fade-in">
                <div className="flex items-start gap-3">
                  <div className="mt-1">
                    <AlertCircle className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Expert Feedback</h3>
                    <p className="text-foreground">{selectedOption.feedback}</p>
                    
                    <div className="mt-4 grid grid-cols-3 gap-3">
                      <div className="bg-background rounded-md p-3 border border-border">
                        <div className="text-xs text-muted-foreground">Technical Judgment</div>
                        <div className="text-lg font-semibold">{selectedOption.technicalJudgment}/10</div>
                      </div>
                      <div className="bg-background rounded-md p-3 border border-border">
                        <div className="text-xs text-muted-foreground">Stakeholder Management</div>
                        <div className="text-lg font-semibold">{selectedOption.stakeholderManagement}/10</div>
                      </div>
                      <div className="bg-background rounded-md p-3 border border-border">
                        <div className="text-xs text-muted-foreground">Adaptability</div>
                        <div className="text-lg font-semibold">{selectedOption.adaptability}/10</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" onClick={() => setCurrentScenarioId(null)}>
              Back to Scenarios
            </Button>
            {!showFeedback && (
              <Button 
                onClick={handleSubmitAnswer} 
                disabled={!selectedOption}
              >
                Submit Answer
              </Button>
            )}
            {showFeedback && (
              <Button onClick={handleCompleteScenario}>
                Complete & Continue
              </Button>
            )}
          </CardFooter>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="max-w-3xl mx-auto text-center mb-10">
        <h1 className="text-3xl font-bold tracking-tight mb-3">Available Scenarios</h1>
        <p className="text-lg text-muted-foreground">
          Select a scenario to practice your problem-solving skills in real-world tech situations.
        </p>
      </div>

      {availableScenarios.length === 0 ? (
        <div className="max-w-md mx-auto text-center p-10 border border-dashed border-border rounded-md">
          <CheckCircle className="h-12 w-12 text-success-DEFAULT mx-auto mb-4" />
          <h3 className="text-xl font-semibold mb-2">All Scenarios Completed!</h3>
          <p className="text-muted-foreground mb-6">
            You've worked through all the available scenarios in this track. Check your progress dashboard to see how you performed.
          </p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 gap-6">
          {availableScenarios.map((scenario) => (
            <Card key={scenario.id} className="border hover:shadow-md transition-all duration-200">
              <CardHeader>
                <CardTitle>{scenario.title}</CardTitle>
                <CardDescription>{scenario.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground line-clamp-3">
                  {scenario.context.substring(0, 120)}...
                </p>
              </CardContent>
              <CardFooter>
                <Button onClick={() => handleStartScenario(scenario.id)}>
                  Start Scenario
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default ScenarioEngine;
