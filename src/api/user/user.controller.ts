import { Router } from "express";
import { UserService } from './user.service';

export class UserController {
    public router: Router;
    public userService: UserService = new UserService();

    constructor() {
        this.router = Router()
        this.routes();
      }
    routes() {
        // For TEST only ! In production, you should use an Identity Provider !!
        this.router.post("/register",this.userService.registerUser);
        this.router.post("/login",this.userService.authenticateUser);
    }
}