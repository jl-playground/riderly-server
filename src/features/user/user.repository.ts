import { User } from './user.model';
import type { CreateUserDto } from './types';

export async function findUserByEmail(email: string) {
  return await User.findOne({ where: { email } });
}

export async function findUserById(id: string) {
  return await User.findByPk(id);
}

export const createUser = (userData: CreateUserDto) => User.create(userData);
