import jwt from 'jsonwebtoken';
import { UserResponseDto } from '../features/user/types';

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRATION = '7d'; // Adjust as needed

export const generateToken = (payload: UserResponseDto): string =>
  jwt.sign(payload, JWT_SECRET!, { expiresIn: JWT_EXPIRATION });

export function verifyToken(token: string): any {
  return jwt.verify(token, JWT_SECRET!);
}
