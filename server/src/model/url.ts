import mongoose, { Document, Schema, Model } from "mongoose";
import { urlschema } from "../lib/zod";
import { z } from "zod";
import { v4 as uuid } from "uuid";
import { URL } from "..";
import crypto from "crypto";
import { inputURLSchema } from "../controllers/url";

//Generate Has for the Url
export function generateHash(input: string, len: number) {
  const hash = crypto.createHash("sha256").update(input).digest("base64url");
  return hash.slice(0, len);
}

// Get types from ZOD
export type UrlsType = z.infer<typeof urlschema>;

// Document Type
export interface UrlsDocument extends Document, Omit<UrlsType, "authorID"> {
  authorID: mongoose.Types.ObjectId;
}

// Model Type
export interface UrlsModelType extends Model<UrlsDocument> {
  getUrl({ alias }: { alias: string }): Promise<UrlsDocument | null>;
  addUrl({
    longUrl,
    alias,
    topic,
    authorID,
  }: z.infer<typeof inputURLSchema> & {
    authorID: string;
  }): Promise<UrlsDocument>;
}

// Creaet a schema for the Urls Model
const urlsSchema = new mongoose.Schema<UrlsDocument>({
  urlID: { type: String, required: true, unique: true },
  authorID: { type: Schema.Types.ObjectId, ref: "User" },
  url: { type: String, required: true },
  shortURL: { type: String },
  createdAt: {
    type: Date,
  },
  topic: {
    type: String,
    required: false,
  },
  alias: {
    type: String,
    unique: true,
    required: true,
  },
});

urlsSchema.statics.getUrl = async function ({ alias }: { alias: string }) {
  const data = await this.findOne({ alias });
  if (data) {
    return data;
  } else {
    return null;
  }
};

// Add a static method to add URL
urlsSchema.statics.addUrl = async function ({
  longUrl,
  alias,
  topic,
  authorID,
}: z.infer<typeof inputURLSchema> & { authorID: string }) {
  if (!authorID || !mongoose.Types.ObjectId.isValid(authorID)) {
    throw new Error("Invalid authorID");
  }
  const urlID = uuid().replace(/-/g, "").slice(0, 6);
  const shortURL = `${URL}/api/shorten/${alias ?? generateHash(longUrl, 6)}`;
  const currentUrl: UrlsDocument = {
    urlID,
    authorID: new mongoose.Types.ObjectId(authorID),
    url: longUrl,
    topic: topic ?? "global",
    shortURL,
    alias,
    createdAt: new Date(),
  } as UrlsDocument;

  return await this.create(currentUrl);
};

const Urls = mongoose.model<UrlsDocument, UrlsModelType>("Urls", urlsSchema);
export default Urls;
