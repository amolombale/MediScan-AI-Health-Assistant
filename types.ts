
export interface DiagnosisResult {
  summary: string;
  possibleConditions: {
    name: string;
    likelihood: 'High' | 'Moderate' | 'Low';
    reasoning: string;
  }[];
  treatmentPlan: {
    immediateSteps: string[];
    longTermAdvice: string[];
  };
  urgencyLevel: 'Emergency' | 'Urgent' | 'Routine' | 'Self-Care';
}

export interface AppState {
  symptoms: string;
  image: string | null;
  result: DiagnosisResult | null;
  loading: boolean;
  error: string | null;
}
