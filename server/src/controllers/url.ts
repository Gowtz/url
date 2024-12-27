import { Response, Request } from "express";
import { z } from "zod";
import Urls from "../model/url";
import User from "../model/user";
import Analytics from "../model/analytics";

export const inputURLSchema = z.object({
  longUrl: z.string().url(),
  alias: z.string().optional(),
  topic: z.string().optional(),
});

// Create new short Url
export const shorten = async (req: Request, res: Response) => {
  const { longUrl, alias, topic } = req.body;
  const googleID = res.locals.user;
  const authorID = await User.findOne({ googleId: googleID });

  if (authorID) {
    const data = inputURLSchema.safeParse({ longUrl, alias, topic });
    if (data.success) {
      try {
        const response = await Urls.addUrl({
          longUrl,
          alias,
          topic,
          authorID: authorID.id,
        });
        res
          .status(200)
          .json({ shortURL: response.shortURL, createdAt: response.createdAt });
      } catch (error) {
        res.status(400).json({ error: "Url must Be Unique" });
      }
    } else {
      res.status(401).json(data.error);
    }
  } else {
    res.send(authorID);
  }
};

// Redirect to Full URL
export const redirect = async (req: Request, res: Response) => {
  const hash = req.params.hash;
  const userIP = res.locals.ip;
  const osType = res.locals.os;
  const deviceType = res.locals.device || "default";
  const data = await Urls.getUrl({ alias: hash });
  if (data) {
    // Add Analytics
    await Analytics.addOne({ urlID: data.id, deviceType, osType, userIP });
    res.status(301).redirect(data.url);
  } else {
    res
      .status(404)
      .send(
        `<h1 style="font-size:3rem;text-align:center;margin:5rem;font-family:sans-serif">No Url Found</h1><h3 style="text-align:center">Create new URL</h3>`,
      );
  }
};
