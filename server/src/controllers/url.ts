import { Response, Request } from "express";
import { z } from "zod";
import Urls from "../model/url";
import { URL } from "..";

export const inputURLSchema = z.object({
  longUrl: z.string().url(),
  alias: z.string().optional(),
  topic: z.string().optional(),
});
export const shorten = async (req: Request, res: Response) => {
  const { longUrl, alias, topic } = req.body;
  const data = inputURLSchema.safeParse({ longUrl, alias, topic });
  if (data.success) {
    await Urls.addUrl({
      longUrl,
      alias,
      topic,
      authorID: res.locals.user,
    });
    res.status(200).json(data.data);
  } else {
    res.status(401).json(data.error);
  }
};

export const redirect = async (req: Request, res: Response) => {
  const hash = req.params.hash;
  const data = await Urls.getUrl({ short: `${URL}/${hash}` });
  if (data) {
    res.redirect(data.shortURL);
  } else {
    res.send(
      `<h1 style="font-size:3rem;text-align:center;margin:5rem;font-family:sans-serif">No Url Found</h1><h3 style="text-align:center">Create new URL</h3>`,
    );
  }
};
