import { ServerError, UnprocessableEntityError } from '../exceptions';
import { type Patient } from '../mocks/patients';
import { OpenAiService, getPrompt } from '../services/openai';
import { logger } from '../utils';
import { PatientsLogic } from './patients.logic';
import { type Diagnosis } from '../types';

export const DiagnosisLogic = {
  async diagnose(patientId: string) {
    try {
      const patients = await PatientsLogic.getAll();

      const patient = patients.find((patient) => patient.id === patientId);

      if (!patient)
        throw new UnprocessableEntityError(
          `Patient with id: ${patientId} not found`,
        );

      const openAiResponse = await OpenAiService.ask(
        getPrompt(patients, patientId),
      );

      const assistantChoice = openAiResponse.choices.find(
        (choice) => choice.message.role === 'assistant',
      );

      if (!assistantChoice?.message.content) {
        throw new ServerError(
          'Diagnosis could not be made. Please try again later.',
        );
      }

      const { content } = assistantChoice.message;

      const diagnosis = JSON.parse(content) as {
        diagnosesPredicted: Diagnosis[];
        diagnosesMatched: Diagnosis[];
        patientsBasedPrediction: Patient[];
      };

      return {
        patientId,
        ...diagnosis,
        openAiResponse,
      };
    } catch (e) {
      logger.error(e);
      if (e instanceof UnprocessableEntityError) throw e;
      throw new ServerError(
        'Some external services may be down. Please try again later.',
      );
    }
  },
};
