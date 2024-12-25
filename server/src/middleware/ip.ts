import { NextFunction, Request, Response } from "express";

export const ip = async (req: Request, res: Response, next: NextFunction) => {
  //@ts-ignore
  const ip = req.ip?.replace("::ffff:", "");
  res.locals.ip = ip;
  next();
};
