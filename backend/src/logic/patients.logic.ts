import { NotFoundError } from '../exceptions';
import { users } from '../mocks/users';

export const PatientsLogic = {
  async getAll() {
    return users;
  },
  async get(id: string) {
    const user = users.find((user) => user.id === id);

    if (!user) throw new NotFoundError(`User with id ${id} not found`);
    return user;
  },
};
