import bcrypt from "bcrypt";
import { NextFunction, Request, Response } from "express";
import * as jwt from "jsonwebtoken";
import passport from "passport";
import { User } from "./user";
import { JWT_SECRET } from "../../utils/secrets";
import "../../middleware/passportHandler";

export class UserService {

  public async registerUser(req: Request, res: Response): Promise<void> {
    console.log('Inside method');
    const hashedPassword = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10));
    
    await User.create({
      username: req.body.username,
      password: hashedPassword,

    });

    const token = jwt.sign({ username: req.body.username, scope : req.body.scope }, JWT_SECRET as jwt.Secret);
    res.status(200).send({ token: token });
  }

  public authenticateUser(req: Request, res: Response, next: NextFunction) {
    passport.authenticate("local", function (err, user, info) {
      // no async/await because passport works only with callback ..
      if (err) return next(err);
      if (!user) {
        return res.status(401).json({ status: "error", code: "unauthorized" });
      } else {
        const token = jwt.sign({ username: user.username }, JWT_SECRET as jwt.Secret);
        res.status(200).send({ token: token });
      }
    });
  }






}