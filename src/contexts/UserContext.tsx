
import React, { createContext, useContext, useState, ReactNode } from 'react';

type Role = 'ai' | 'servicenow' | 'salesforce' | null;
type Stage = 'intro' | 'roleSelection' | 'tutorial' | 'scenario' | 'feedback';

interface UserContextType {
  role: Role;
  setRole: (role: Role) => void;
  stage: Stage;
  setStage: (stage: Stage) => void;
  completedScenarios: string[];
  addCompletedScenario: (scenarioId: string) => void;
  competencies: {
    technicalJudgment: number;
    stakeholderManagement: number;
    adaptability: number;
  };
  updateCompetencies: (scores: Partial<UserContextType['competencies']>) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: ReactNode }) {
  const [role, setRole] = useState<Role>(null);
  const [stage, setStage] = useState<Stage>('intro');
  const [completedScenarios, setCompletedScenarios] = useState<string[]>([]);
  const [competencies, setCompetencies] = useState({
    technicalJudgment: 0,
    stakeholderManagement: 0,
    adaptability: 0,
  });

  const addCompletedScenario = (scenarioId: string) => {
    setCompletedScenarios((prev) => [...prev, scenarioId]);
  };

  const updateCompetencies = (scores: Partial<typeof competencies>) => {
    setCompetencies((prev) => ({ ...prev, ...scores }));
  };

  return (
    <UserContext.Provider
      value={{
        role,
        setRole,
        stage,
        setStage,
        completedScenarios,
        addCompletedScenario,
        competencies,
        updateCompetencies,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}
