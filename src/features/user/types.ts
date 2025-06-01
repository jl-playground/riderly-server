import type { InferCreationAttributes } from 'sequelize';
import type { User } from './user.model';

export interface UserDto {
  username: string;
  email: string;
  password: string;
}
export interface UserResponseDto {
  uuid: string;
  username: string;
  email: string;
}

export interface AuthenticatedUserRequest extends Request {
  user?: UserDto;
}
export interface GetUserBody {
  user: Pick<User, 'uuid' | 'username' | 'email'>;
}
export interface CreateUserBody {
  uuid: string;
  username: string;
  email: string;
  password: string;
}

export type CreateUserDto = InferCreationAttributes<User>;
export type NewUserData = Omit<CreateUserDto, 'password'> & { password: string };
