import { Response, Request } from "express";
import { z } from "zod";
import Urls from "../model/url";
import { URL } from "..";
import User from "../model/user";
import Analytics from "../model/analytics";

export const inputURLSchema = z.object({
  longUrl: z.string().url(),
  alias: z.string().optional(),
  topic: z.string().optional(),
});
export const shorten = async (req: Request, res: Response) => {
  const { longUrl, alias, topic } = req.body;
  const googleID = "111879321346623333335";
  const authorID = await User.findOne({ googleId: googleID });

  if (authorID) {
    const data = inputURLSchema.safeParse({ longUrl, alias, topic });
    if (data.success) {
      await Urls.addUrl({
        longUrl,
        alias,
        topic,
        authorID: authorID.id,
      });
      console.log(res.locals.user);
      res.status(200).json(data.data);
    } else {
      res.status(401).json(data.error);
    }
  } else {
    res.send(authorID);
  }
};

export const redirect = async (req: Request, res: Response) => {
  const hash = req.params.hash;
  const userIP = res.locals.ip;
  const osType = res.locals.os;
  const deviceType = res.locals.device || "default";
  const data = await Urls.getUrl({ short: `${URL}/${hash}` });
  if (data) {
    // console.log({ urlID: data.id, deviceType, osType, userIP });
    // Add Analytics
    await Analytics.addOne({ urlID: data.id, deviceType, osType, userIP });
    res.redirect(data.url);
  } else {
    res.send(
      `<h1 style="font-size:3rem;text-align:center;margin:5rem;font-family:sans-serif">No Url Found</h1><h3 style="text-align:center">Create new URL</h3>`,
    );
  }
};
