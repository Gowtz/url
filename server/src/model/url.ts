import mongoose, { Document, Model } from "mongoose";
import { urlSchema } from "../lib/zod";
import { z } from "zod";
import { v4 as uudi } from "uuid";
import { URL } from "..";
import crypto from "crypto";

export type UrlsType = z.infer<typeof urlSchema>;
export interface UrlsDocument extends Document, UrlsType {}
export interface UrlsModelType extends Model<UrlsType> {
  addUrl({
    authorID,
    url,
    topic,
  }: {
    authorID: string;
    url: string;
    topic?: string;
    alias?: string;
  }): Promise<UrlsType>;
}

const urlsSchema = new mongoose.Schema<UrlsDocument>({
  urlID: { type: String, required: true, unique: true },
  authorID: {},
  url: { type: String, required: true },
  shortURL: { type: String },
  createdAt: {
    type: Date,
  },
  topic: {
    type: String,
    required: false,
  },
});

urlsSchema.statics.addUrl = async function ({
  authorID,
  url,
  topic,
  alias,
}: {
  authorID: string;
  url: string;
  topic?: string;
  alias?: string;
}) {
  const currentUrls: UrlsType = {
    urlID: uudi().replace(/-/g, "").slice(0.6),
    authorID,
    url,
    topic: topic ? topic : "global",
    shortURL: `${URL}/${alias ? alias : generateHash(url, 6)}`,
    createdAt: new Date(),
  };

  this.create(currentUrls);
};

const Urls = mongoose.model<UrlsType>("Urls", urlsSchema);
export function generateHash(input: string, len: number) {
  const hash = crypto.createHash("sha256").update(input).digest("base64url");
  return hash.slice(0, len);
}
export default Urls;
