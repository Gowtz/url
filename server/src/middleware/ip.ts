import { NextFunction, Request, Response } from "express";
import UAParser from "ua-parser-js";
export const ip = async (req: Request, res: Response, next: NextFunction) => {
  //@ts-ignore
  const ip = req.ip?.replace("::ffff:", "");
  const userAgent = req.headers["user-agent"];
  //@ts-ignore
  const parser = new UAParser(userAgent);
  const deviceInfo = parser.getResult();
  res.locals.ip = ip;
  res.locals.os = deviceInfo.os.name;
  res.locals.device = deviceInfo.device.type;
  res.locals.browser = deviceInfo.browser.name;
  next();
};
