import { ServerError } from '../exceptions';
import { OpenAiService, getPrompt } from '../services/openai';
import { logger } from '../utils';
import { PatientsLogic } from './patients.logic';

export const DiagnosisLogic = {
  async diagnose(patientId: string) {
    try {
      const patients = await PatientsLogic.getAll();

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
        message: string;
        diagnosis: string;
      };

      return {
        patientId,
        ...diagnosis,
        openAiResponse,
      };
    } catch (e) {
      logger.error(e);
      throw new ServerError(
        'Some external services may be down. Please try again later.',
      );
    }
  },
};
