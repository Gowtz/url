import { NextFunction, Request, Response } from "express";

export const auth = async (req: Request, res: Response, next: NextFunction) => {
  //@ts-ignore
  const user = req.session.passport?.user;
  const ip = req.ip?.replace("::ffff:", "");
  if (!user) {
    res.redirect("/not-authenticated");
  } else {
    res.locals.user = user;
    res.locals.ip = ip;
    next();
  }
};
