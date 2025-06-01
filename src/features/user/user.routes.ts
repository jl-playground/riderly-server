import { Router } from 'express';
import { getUser, createUser } from './user.controller';

class UserRouter {
  private readonly router = Router();

  constructor() {
    this.routes();
  }

  private routes(): void {
    console.log('typeof getUser:', typeof getUser);
    // → “function”

    this.router.post('/getUser', getUser);
    this.router.post('/createUser', createUser); // Assuming createUser is also defined in user.controller'
  }

  public getRouter() {
    return this.router;
  }
}
export default new UserRouter().getRouter();
