import * as userRepo from './user.repository';
import type { CreateUserDto, NewUserData, UserDto, UserResponseDto } from './types';
import type { User } from './user.model';
import bcrypt from 'bcrypt';
import { generateToken } from '../../utils/jwt';

const SALT_ROUNDS = 10;

export const createUserService = async (userData: CreateUserDto): Promise<string | Error> => {
  try {
    console.log('\x1b[33m%s\x1b[0m', 'userDa--------------------', userData);
    const existing = await userRepo.findUserByEmail(userData.email);
    if (existing) {
      return Promise.reject(
        new Error('[Error] in user.service createUserService: User with this email already exists'),
      );
    }

    const hashedPassword = await bcrypt.hash(userData.password, SALT_ROUNDS);
    const secureUserData: NewUserData = {
      ...userData,
      password: hashedPassword,
    };

    // Create the user in the database
    const createdUser = await userRepo.createUser(secureUserData);

    const paylaod: UserResponseDto = {
      uuid: createdUser.uuid!,
      username: createdUser.username,
      email: createdUser.email,
    };

    return generateToken(paylaod); // Generate a token valid for 1 day
  } catch (error) {
    return Promise.reject(new Error(`[Error] in user.service createUserService: ${error}`));
  }
};

export async function getUser(id: string) {
  const user = await userRepo.findUserById(id);
  if (!user) throw new Error('User not found');
  return user;
}
