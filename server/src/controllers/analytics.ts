import { Request, Response } from "express";
import Urls from "../model/url";
import {
  getAnalyticsAllPipeline,
  getAnalyticsByTopicPipeline,
  getAnalyticsByUrlPipeline,
} from "../lib/analyticsPipline";

export const getAnalyticsByAlias = async (req: Request, res: Response) => {
  const id = req.params.id;

  const data = await Urls.getUrl({ alias: id });
  if (data) {
    const resdata = await getAnalyticsByUrlPipeline(data.id);
    res.send(resdata);
  } else {
    res.send("No Id ");
  }
};

export const getAnalyticsByTopic = async (req: Request, res: Response) => {
  const topic = req.params.topic;

  const resdata = await getAnalyticsByTopicPipeline(topic);
  res.send(resdata);
};

export const getAnalyticsAll = async (_req: Request, res: Response) => {
  const resdata = await getAnalyticsAllPipeline();
  res.send(resdata);
};
