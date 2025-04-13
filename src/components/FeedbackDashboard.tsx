
import React from 'react';
import { useUser } from '../contexts/UserContext';
import { CheckCircle, Award, BarChart2 } from 'lucide-react';
import { scenarios } from '../data/scenarios';
import { Progress } from '@/components/ui/progress';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const FeedbackDashboard = () => {
  const { role, completedScenarios, competencies } = useUser();

  if (!role) return null;

  const totalScenarios = scenarios.filter(scenario => scenario.role === role).length;
  const completionPercentage = (completedScenarios.length / totalScenarios) * 100;

  // Calculate average scores across completed scenarios
  const averageScores = {
    technicalJudgment: completedScenarios.length ? competencies.technicalJudgment / completedScenarios.length : 0,
    stakeholderManagement: completedScenarios.length ? competencies.stakeholderManagement / completedScenarios.length : 0,
    adaptability: completedScenarios.length ? competencies.adaptability / completedScenarios.length : 0,
  };

  // Generate a relative performance assessment
  const getPerformanceLevel = (score: number) => {
    if (score >= 8) return { text: 'Excellent', color: 'text-success-dark' };
    if (score >= 6) return { text: 'Good', color: 'text-calm-DEFAULT' };
    if (score >= 4) return { text: 'Developing', color: 'text-amber-500' };
    return { text: 'Needs Improvement', color: 'text-urgency-DEFAULT' };
  };

  // Generate recommendations based on lowest score
  const getRecommendations = () => {
    const lowestScore = Math.min(
      averageScores.technicalJudgment, 
      averageScores.stakeholderManagement, 
      averageScores.adaptability
    );
    
    if (lowestScore === averageScores.technicalJudgment) {
      return {
        area: 'Technical Judgment',
        tips: [
          'Review industry best practices for your technology stack',
          'Practice evaluating trade-offs between different technical approaches',
          'Consider technical implications alongside business requirements'
        ]
      };
    }
    
    if (lowestScore === averageScores.stakeholderManagement) {
      return {
        area: 'Stakeholder Management',
        tips: [
          'Improve communication transparency with all project stakeholders',
          'Practice presenting technical concepts to non-technical audiences',
          'Consider how decisions affect different stakeholder groups'
        ]
      };
    }
    
    return {
      area: 'Adaptability',
      tips: [
        'Practice responding to changing requirements and constraints',
        'Develop contingency plans for your technical decisions',
        'Focus on flexible solutions that can evolve over time'
      ]
    };
  };

  const recommendations = getRecommendations();

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="max-w-3xl mx-auto mb-8">
        <h1 className="text-3xl font-bold tracking-tight mb-3">Your Progress Dashboard</h1>
        <p className="text-lg text-muted-foreground">
          Track your performance and get personalized recommendations to improve your tech problem-solving skills.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-primary" />
              Scenarios Completed
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold mb-2">
              {completedScenarios.length}/{totalScenarios}
            </div>
            <Progress value={completionPercentage} className="h-2" />
            <p className="text-xs text-muted-foreground mt-2">
              {completionPercentage.toFixed(0)}% complete
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2">
              <Award className="h-5 w-5 text-primary" />
              Top Performance Area
            </CardTitle>
          </CardHeader>
          <CardContent>
            {completedScenarios.length === 0 ? (
              <p className="text-muted-foreground">Complete scenarios to see your top performance area</p>
            ) : (
              <>
                <div className="text-2xl font-bold mb-1">
                  {Object.entries(averageScores).sort((a, b) => b[1] - a[1])[0][0]
                    .replace(/([A-Z])/g, ' $1')
                    .replace(/^./, str => str.toUpperCase())}
                </div>
                <p className="text-muted-foreground text-sm">
                  You excel at making decisions that demonstrate strong {Object.entries(averageScores).sort((a, b) => b[1] - a[1])[0][0]
                    .replace(/([A-Z])/g, ' $1')
                    .toLowerCase()}.
                </p>
              </>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2">
              <BarChart2 className="h-5 w-5 text-primary" />
              Industry Comparison
            </CardTitle>
          </CardHeader>
          <CardContent>
            {completedScenarios.length === 0 ? (
              <p className="text-muted-foreground">Complete scenarios to see industry comparisons</p>
            ) : (
              <>
                <div className="text-2xl font-bold mb-1">
                  Top 30%
                </div>
                <p className="text-muted-foreground text-sm">
                  Your problem-solving approach aligns with industry professionals in {role.toUpperCase()} roles.
                </p>
              </>
            )}
          </CardContent>
        </Card>
      </div>

      <div className="grid md:grid-cols-2 gap-8 mb-8">
        <Card>
          <CardHeader>
            <CardTitle>Competency Assessment</CardTitle>
            <CardDescription>Your performance across key competency areas</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {completedScenarios.length === 0 ? (
              <p className="text-muted-foreground py-6">Complete scenarios to see your competency assessment</p>
            ) : (
              <>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium">Technical Judgment</span>
                      <span className={`text-sm ${getPerformanceLevel(averageScores.technicalJudgment).color}`}>
                        {getPerformanceLevel(averageScores.technicalJudgment).text}
                      </span>
                    </div>
                    <Progress value={averageScores.technicalJudgment * 10} className="h-2" />
                  </div>
                  
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium">Stakeholder Management</span>
                      <span className={`text-sm ${getPerformanceLevel(averageScores.stakeholderManagement).color}`}>
                        {getPerformanceLevel(averageScores.stakeholderManagement).text}
                      </span>
                    </div>
                    <Progress value={averageScores.stakeholderManagement * 10} className="h-2" />
                  </div>
                  
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium">Adaptability</span>
                      <span className={`text-sm ${getPerformanceLevel(averageScores.adaptability).color}`}>
                        {getPerformanceLevel(averageScores.adaptability).text}
                      </span>
                    </div>
                    <Progress value={averageScores.adaptability * 10} className="h-2" />
                  </div>
                </div>
              </>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Personalized Recommendations</CardTitle>
            <CardDescription>Based on your scenario responses</CardDescription>
          </CardHeader>
          <CardContent>
            {completedScenarios.length === 0 ? (
              <p className="text-muted-foreground py-6">Complete scenarios to receive personalized recommendations</p>
            ) : (
              <div className="space-y-4">
                <p>
                  Focus on improving your <span className="font-semibold">{recommendations.area}</span> skills:
                </p>
                <ul className="space-y-2">
                  {recommendations.tips.map((tip, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                      <span>{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Learning Resources</CardTitle>
          <CardDescription>Curated materials to help you improve your skills</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="p-4 border rounded-md">
              <h3 className="font-semibold mb-1">Technical Decision Making</h3>
              <p className="text-sm text-muted-foreground mb-2">
                Learn structured approaches to technical decisions that balance constraints.
              </p>
              <a href="#" className="text-primary text-sm hover:underline">View course →</a>
            </div>
            <div className="p-4 border rounded-md">
              <h3 className="font-semibold mb-1">Stakeholder Communication</h3>
              <p className="text-sm text-muted-foreground mb-2">
                Master explaining technical concepts to different stakeholder types.
              </p>
              <a href="#" className="text-primary text-sm hover:underline">View course →</a>
            </div>
            <div className="p-4 border rounded-md">
              <h3 className="font-semibold mb-1">Crisis Management</h3>
              <p className="text-sm text-muted-foreground mb-2">
                Develop skills for handling unexpected challenges in tech projects.
              </p>
              <a href="#" className="text-primary text-sm hover:underline">View course →</a>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default FeedbackDashboard;
