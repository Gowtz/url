import mongoose, { Document, Model, Schema } from "mongoose";

import { analyticsSchema } from "../lib/zod";
import { z } from "zod";

const AnalyticCustom = analyticsSchema.omit({ urlID: true, id: true });

export type AnalyticsType = z.infer<typeof AnalyticCustom>;
export interface AnalyticsDocumentType extends AnalyticsType, Document {
  urlID: mongoose.Types.ObjectId;
}

export interface AnalyticsModelType extends Model<AnalyticsDocumentType> {
  addOne({
    urlID,
    userIP,
    osType,
    deviceType,
  }: {
    urlID: string;
    userIP: string;
    osType: string;
    deviceType: string;
  }): Promise<AnalyticsDocumentType>;
}

const AnalyticsSchema = new mongoose.Schema<AnalyticsDocumentType>({
  urlID: { type: Schema.Types.ObjectId, ref: "Urls", required: true },
  userIP: {
    type: String,
    require: true,
  },
  timeStamp: {
    type: Date,
    required: true,
  },
  osType: {
    type: String,
    required: true,
  },
  deviceType: {
    type: String,
    required: true,
  },
});

AnalyticsSchema.statics.addOne = async function ({
  urlID,
  userIP,
  osType,
  deviceType,
}: {
  urlID: string;
  userIP: string;
  osType: string;
  deviceType: string;
}) {
  if (!urlID || !mongoose.Types.ObjectId.isValid(urlID)) {
    throw new Error("Invalid authorID");
  }

  const addOneInstance = {
    urlID: new mongoose.Types.ObjectId(urlID),
    userIP,
    osType,
    deviceType,
    timeStamp: new Date(),
  };
  return await this.create(addOneInstance);
};

const Analytics = mongoose.model<AnalyticsDocumentType, AnalyticsModelType>(
  "Analytics",
  AnalyticsSchema,
);

export default Analytics;
