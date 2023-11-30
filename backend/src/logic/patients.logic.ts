import { NotFoundError } from '../exceptions';
import { patients } from '../mocks/patients';

export const PatientsLogic = {
  async getAll() {
    return patients;
  },
  async get(id: string) {
    const patient = patients.find((patient) => patient.id === id);

    if (!patient) throw new NotFoundError(`Patient with id ${id} not found`);
    return patient;
  },
};
