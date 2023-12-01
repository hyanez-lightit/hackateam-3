import { type Patient } from '../mocks/patients';
import fs from 'fs';
import path from 'path';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const getPrompt = (patients: Patient[], patientId: string) => {
  const prompt = fs.readFileSync(
    path.join(__dirname, '..', 'config/prompt.txt'),
    'utf-8',
  );
  return `${JSON.stringify(prompt)}

   patients: ${JSON.stringify(patients)}
   patientId: ${patientId}`;
};

export const OpenAiService = {
  async ask(prompt: string) {
    console.log({
      prompt,
    });
    const chatCompletion = await openai.chat.completions.create({
      messages: [{ role: 'user', content: prompt }],
      model: 'gpt-3.5-turbo-1106',
      temperature: 0,
      response_format: {
        type: 'json_object',
      },
    });

    return chatCompletion;
  },
};
