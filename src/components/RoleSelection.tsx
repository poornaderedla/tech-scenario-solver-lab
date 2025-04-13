
import React from 'react';
import { useUser } from '../contexts/UserContext';
import { Brain, Settings, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

const RoleSelection = () => {
  const { setRole, setStage } = useUser();
  
  const handleSelectRole = (role: 'ai' | 'servicenow' | 'salesforce') => {
    setRole(role);
    setStage('tutorial');
  };

  return (
    <div className="container mx-auto py-12 px-4 animate-fade-in">
      <div className="max-w-3xl mx-auto text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tight mb-4">Select Your Tech Focus</h1>
        <p className="text-xl text-muted-foreground">
          Choose a technology track to practice scenario-based problem solving in your area of interest.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
        <Card className="transition-all duration-300 hover:shadow-lg border-2 hover:border-primary/50">
          <CardHeader>
            <Brain className="h-12 w-12 text-primary mb-4" />
            <CardTitle>AI Engineering</CardTitle>
            <CardDescription>
              Navigate ethical dilemmas, model training decisions, and ML operations challenges.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <p className="text-sm text-muted-foreground">
              Tackle scenarios on bias detection, model governance, 
              stakeholder communication, and AI project management.
            </p>
          </CardContent>
          <CardFooter>
            <Button onClick={() => handleSelectRole('ai')} className="w-full">
              Select AI Track
            </Button>
          </CardFooter>
        </Card>

        <Card className="transition-all duration-300 hover:shadow-lg border-2 hover:border-primary/50">
          <CardHeader>
            <Settings className="h-12 w-12 text-primary mb-4" />
            <CardTitle>ServiceNow</CardTitle>
            <CardDescription>
              Solve workflow automation challenges, system integration problems, and ITSM dilemmas.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <p className="text-sm text-muted-foreground">
              Face scenarios on implementation timelines, custom integrations, 
              change management, and ServiceNow best practices.
            </p>
          </CardContent>
          <CardFooter>
            <Button onClick={() => handleSelectRole('servicenow')} className="w-full">
              Select ServiceNow Track
            </Button>
          </CardFooter>
        </Card>

        <Card className="transition-all duration-300 hover:shadow-lg border-2 hover:border-primary/50">
          <CardHeader>
            <TrendingUp className="h-12 w-12 text-primary mb-4" />
            <CardTitle>Salesforce</CardTitle>
            <CardDescription>
              Address CRM implementation challenges, data migration issues, and client requirements.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <p className="text-sm text-muted-foreground">
              Work through scenarios on data quality, customization vs configuration, 
              user adoption, and Salesforce governance.
            </p>
          </CardContent>
          <CardFooter>
            <Button onClick={() => handleSelectRole('salesforce')} className="w-full">
              Select Salesforce Track
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default RoleSelection;
