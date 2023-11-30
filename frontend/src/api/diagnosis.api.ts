import { api } from './api';

type Diagnosis = {
  id: string;
  name: string;
  code: string;
};

export type Response = {
  data: {
    patientId: string;
    diagnosesPredicted: Diagnosis[];
    diagnosesMatched: Diagnosis[];
    patientsBasedPrediction: Array<Record<string, unknown>>;
    openAiResponse: Record<string, unknown>;
  };
  success: boolean;
};

export const getDiagnosis = async (patientId: string) => {
  const response = await api.get<Response>('/diagnosis', {
    params: {
      patientId,
    },
  });
  return response.data;
};
