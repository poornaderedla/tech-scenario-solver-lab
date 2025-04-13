
export type Option = {
  id: string;
  text: string;
  technicalJudgment: number;
  stakeholderManagement: number;
  adaptability: number;
  feedback: string;
};

export type Scenario = {
  id: string;
  role: 'ai' | 'servicenow' | 'salesforce';
  title: string;
  description: string;
  context: string;
  options: Option[];
};

export const scenarios: Scenario[] = [
  {
    id: 'ai-bias',
    role: 'ai',
    title: 'Model Bias Detection',
    description: 'Your ML model shows unexpected bias in production. How do you respond?',
    context: "You're leading an AI team that recently deployed a hiring recommendation model for a major client. After two weeks in production, data analysts find that the model shows a statistical bias against certain demographic groups, despite pre-deployment testing showing balanced outcomes. The client is unaware, but your next meeting is in 3 days.",
    options: [
      {
        id: 'ai-bias-1',
        text: 'Immediately take the model offline and retrain with balanced datasets',
        technicalJudgment: 6,
        stakeholderManagement: 3,
        adaptability: 7,
        feedback: 'Taking swift technical action addresses the immediate ethical concern, but lacks stakeholder communication. Consider a more balanced approach that includes transparency with the client.'
      },
      {
        id: 'ai-bias-2',
        text: 'Document the issue, analyze root causes, and escalate to ethics board while preparing client communication',
        technicalJudgment: 9,
        stakeholderManagement: 8,
        adaptability: 8,
        feedback: 'This balanced approach addresses technical concerns while preparing for proper stakeholder management. Top AI teams often follow this structured pattern when detecting bias.'
      },
      {
        id: 'ai-bias-3',
        text: 'Continue running the model but implement monitoring alerts while developing a fix',
        technicalJudgment: 5,
        stakeholderManagement: 4,
        adaptability: 6,
        feedback: 'This approach prioritizes business continuity but risks ethical implications and potential reputation damage if bias affects actual hiring decisions.'
      },
      {
        id: 'ai-bias-4',
        text: 'Immediately notify the client and let them decide how to proceed',
        technicalJudgment: 4,
        stakeholderManagement: 7,
        adaptability: 5,
        feedback: 'While transparent, this approach shifts responsibility to the client without offering solutions. Consider presenting options alongside the disclosure.'
      }
    ]
  },
  {
    id: 'servicenow-deadline',
    role: 'servicenow',
    title: 'Unrealistic Automation Timeline',
    description: 'A client demands an unrealistic workflow automation implementation timeline. How do you proceed?',
    context: "Your enterprise client's CIO has committed to automating their entire IT service desk within 6 weeks, a process that typically takes 3-4 months. They've communicated this timeline to their board. Your initial assessment shows that even with additional resources, 10 weeks would be the absolute minimum. The kick-off meeting is tomorrow.",
    options: [
      {
        id: 'servicenow-deadline-1',
        text: 'Accept the timeline but internally prepare a phased approach that delivers core functionality first',
        technicalJudgment: 6,
        stakeholderManagement: 5,
        adaptability: 7,
        feedback: 'This approach shows adaptability, but creates significant risk by accepting an unrealistic timeline without transparent communication.'
      },
      {
        id: 'servicenow-deadline-2',
        text: 'Present a detailed project plan showing why 10 weeks is the minimum viable timeline with resource allocation',
        technicalJudgment: 9,
        stakeholderManagement: 7,
        adaptability: 8,
        feedback: 'This transparent, data-driven approach maintains integrity while providing the client with necessary information to adjust expectations with their board.'
      },
      {
        id: 'servicenow-deadline-3',
        text: 'Suggest reducing the scope to meet the 6-week timeline, focusing only on highest-priority workflows',
        technicalJudgment: 7,
        stakeholderManagement: 8,
        adaptability: 9,
        feedback: 'This solution-oriented compromise balances client needs with technical realities. Consider pairing this with a phase 2 plan for complete implementation.'
      },
      {
        id: 'servicenow-deadline-4',
        text: 'Escalate to your manager to renegotiate the contract timeline before kick-off',
        technicalJudgment: 5,
        stakeholderManagement: 4,
        adaptability: 5,
        feedback: 'While protecting yourself professionally, this approach delays addressing the problem directly and may damage client relationships.'
      }
    ]
  },
  {
    id: 'salesforce-data-conflict',
    role: 'salesforce',
    title: 'Legacy Data Migration Conflict',
    description: 'Legacy data conflicts with your new Salesforce CRM rollout. How do you resolve without losing client trust?',
    context: "You're halfway through a Salesforce implementation for a financial services client when you discover their legacy customer data has severe quality issues that will compromise CRM functionality. The client's data team insists their data is fine. Users are scheduled to begin training next week, and executives are expecting a demo.",
    options: [
      {
        id: 'salesforce-data-conflict-1',
        text: 'Push back the timeline and require the client to clean their data before proceeding',
        technicalJudgment: 7,
        stakeholderManagement: 4,
        adaptability: 5,
        feedback: 'This approach correctly identifies the root issue but creates an adversarial relationship and places all responsibility on the client.'
      },
      {
        id: 'salesforce-data-conflict-2',
        text: 'Proceed with implementation using the problematic data but document all issues as risks',
        technicalJudgment: 4,
        stakeholderManagement: 6,
        adaptability: 5,
        feedback: 'This avoids short-term conflict but creates significant long-term risk when the system inevitably has issues in production.'
      },
      {
        id: 'salesforce-data-conflict-3',
        text: 'Create a collaborative data quality workshop with examples showing how specific issues will affect user experience',
        technicalJudgment: 9,
        stakeholderManagement: 9,
        adaptability: 8,
        feedback: 'This solution-focused approach educates the client while building partnership. Top Salesforce consultants often use this method to navigate data quality challenges.'
      },
      {
        id: 'salesforce-data-conflict-4',
        text: 'Implement emergency data cleansing services as a change request to the original contract',
        technicalJudgment: 8,
        stakeholderManagement: 7,
        adaptability: 8,
        feedback: 'This pragmatic solution addresses the core issue while creating a viable path forward, though it does add cost to the project.'
      }
    ]
  }
];

export const getScenariosByRole = (role: 'ai' | 'servicenow' | 'salesforce'): Scenario[] => {
  return scenarios.filter(scenario => scenario.role === role);
};

export const getScenarioById = (id: string): Scenario | undefined => {
  return scenarios.find(scenario => scenario.id === id);
};
