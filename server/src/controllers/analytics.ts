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
  const tot = await Urls.aggregate([
    {
      $group: {
        _id: null,
        totalUrls: {
          $sum: 1,
        },
      },
    },
    {
      $project: {
        totalUrls: 1,
        _id: 0,
      },
    },
  ]);
  res.send({ ...resdata[0], totalUrl: tot[0].totalUrls });
};
