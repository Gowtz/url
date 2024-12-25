import mongoose, { Document, Schema } from "mongoose";

import { analyticsSchema } from "../lib/zod";
import { z } from "zod";

const AnalyticCustom = analyticsSchema.omit({ urlID: true });

export type AnalyticsType = z.infer<typeof AnalyticCustom>;
export interface AnalyticsDocumentType extends AnalyticsType, Document {
  urlID: object;
}

const AnalyticsSchema = new mongoose.Schema<AnalyticsDocumentType>({
  clickID: {
    type: String,
    require: true,
  },
  urlID: { type: Schema.Types.ObjectId, ref: "Urls", required: true },
  user: {
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

const Analytics = mongoose.model<AnalyticsDocumentType>(
  "Analytics",
  AnalyticsSchema,
);

export default Analytics;
