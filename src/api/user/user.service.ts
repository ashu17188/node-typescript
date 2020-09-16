import bcrypt from "bcrypt";
import { NextFunction, Request, Response } from "express";
import * as jwt from "jsonwebtoken";
import passport from "passport";
import { User } from "./user";
import "../../middleware/passportHandler";
import { logger } from "../../middleware/logger";

export class UserService {

  public async registerUser(req: Request, res: Response): Promise<void> {
    const hashedPassword = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10));
    
    await User.create({
      username: req.body.username,
      password: hashedPassword,

    });
    const token = jwt.sign({ username: req.body.username, scope : req.body.scope }, process.env.JWT_SECRET as jwt.Secret);
  //  logger.info(`Info Register user called for user ${process.env.LOG_LEVEL} ${req.body.username}, token: ${token}`);
    logger.debug(`Debug Register user called for user ${req.body.username}, token: ${token}`);

    res.status(200).send({ token: token });
  }

  public authenticateUser(req: Request, res: Response, next: NextFunction) {
    passport.authenticate("local", function (err, user, info) {
      // no async/await because passport works only with callback ..
      if (err) return next(err);
      if (!user) {
        return res.status(401).json({ status: "error", code: "unauthorized" });
      } else {
        const token = jwt.sign({ username: user.username }, process.env.JWT_SECRET as jwt.Secret);
        res.status(200).send({ token: token });
      }
    });
  }






}