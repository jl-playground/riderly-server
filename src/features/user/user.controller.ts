import type { RequestHandler } from 'express';
import type { CreateUserBody, UserDto } from './types';
import { createUserService } from './user.service';

export const getUser: RequestHandler<unknown, UserDto | { message: string }, { uuid: string }, unknown> = (
  req,
  res,
) => {
  // Now TypeScript knows req.body is CreateUserBody:
  const { uuid } = req.body;

  if (typeof uuid !== 'string') {
    void res.status(400).json({
      message: 'All fields id, name, email, password are required and must be correct types.',
    });
  }

  const newUser: UserDto = {
    username: 'hello',
    email: 'hello@mail.com',
    password: 'teset',
  };

  res.status(201).json(newUser);
};

export const createUser: RequestHandler<unknown, string | { message: string }, CreateUserBody, unknown> = async (
  req,
  res,
) => {
  try {
    const { username, email, password } = req.body;

    if (typeof username !== 'string' || typeof email !== 'string' || typeof password !== 'string') {
      res.status(400).json({
        message: 'All fields id, name, email, password are required and must be correct types.',
      });
      return;
    }

    const newUser: UserDto = {
      username,
      email,
      password,
    };

    const createdUser = await createUserService(newUser);

    if (createdUser instanceof Error) {
      res.status(400).json({
        message: createdUser.message,
      });
      return;
    }

    res.status(201).json(createdUser);
  } catch (error) {
    console.error('[Error] in user.controller createUser ', error);
    res.status(500).send({
      message: `Internal Server Error`,
    });
  }
};
