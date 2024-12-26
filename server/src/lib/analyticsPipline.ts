import mongoose from "mongoose";
import Analytics from "../model/analytics";

export const getAnalyticsByUrlPipeline = async (url: string) => {
  const pipeline = [
    {
      $lookup: {
        from: "urls",
        localField: "urlID",
        foreignField: "_id",
        as: "urls",
      },
    },
    {
      $addFields: {
        url: {
          $arrayElemAt: ["$urls", 0],
        },
      },
    },

    {
      $match: {
        urlID: new mongoose.Types.ObjectId(url),
      },
    },
    {
      $facet: {
        totalClick: [
          {
            $group: {
              _id: "$_id",
            },
          },
          {
            $count: "total",
          },
        ],
        uniqueUser: [
          {
            $group: {
              _id: "$userIP",
            },
          },
          {
            $count: "total",
          },
        ],
        uniqueClicks: [
          {
            $group: {
              _id: { f1: "$urlID", f2: "$userIP" },
            },
          },
          { $count: "total" },
        ],
        clicksByDate: [
          {
            $match: {
              timeStamp: {
                $gte: new Date(new Date().setDate(new Date().getDate() - 7)),
                $lte: new Date(),
              },
            },
          },
          {
            $group: {
              _id: {
                $dateToString: {
                  format: "%Y-%m-%d",
                  date: "$timeStamp",
                },
              },
              clicksByDate: {
                $sum: 1,
              },
            },
          },
        ],
        osType: [
          {
            $group: {
              _id: "$osType",
              sum: {
                $addToSet: "$userIP",
              },
            },
          },
          {
            $project: {
              uniqueUser: {
                $size: "$sum",
              },
            },
          },
        ],
        deviceType: [
          {
            $group: {
              _id: "$deviceType",
              sum: {
                $addToSet: "$userIP",
              },
            },
          },
          {
            $project: {
              uniqueUser: {
                $size: "$sum",
              },
            },
          },
        ],

        getOs: [
          {
            $group: {
              _id: "$osType",
              uniqueClicks: {
                $addToSet: "$userIP",
              },
            },
          },
          {
            $project: {
              osName: "$_id",
              uniqueClicks: { $size: "$uniqueClicks" },
              _id: 0,
            },
          },
        ],
        getDevice: [
          {
            $group: {
              _id: "$deviceType",
              uniqueClicks: {
                $addToSet: "$userIP",
              },
            },
          },
          {
            $project: {
              deviceName: "$_id",
              uniqueClicks: { $size: "$uniqueClicks" },
              _id: 0,
            },
          },
        ],
      },
    },
    {
      $project: {
        totalClicks: {
          $arrayElemAt: ["$totalClick.total", 0],
        },
        uniqueClicks: { $arrayElemAt: ["$uniqueClicks.total", 0] },
        uniqueUser: {
          $arrayElemAt: ["$uniqueUser.total", 0],
        },
        clicksByDate: 1,
        osType: {
          $map: {
            input: "$osType",
            as: "clicks",
            in: {
              $mergeObjects: [
                "$$clicks",
                {
                  uniqueClick: {
                    $arrayElemAt: [
                      "$getOs.uniqueClicks",
                      {
                        $indexOfArray: ["$getOs.osName", "$$clicks._id"],
                      },
                    ],
                  },
                },
              ],
            },
          },
        },
        deviceType: {
          $map: {
            input: "$deviceType",
            as: "device",
            in: {
              $mergeObjects: [
                "$$device",
                {
                  uniqueClick: {
                    $arrayElemAt: [
                      "$getDevice.uniqueClicks",
                      {
                        $indexOfArray: [
                          "$getDevice.deviceName",
                          "$$device._id",
                        ],
                      },
                    ],
                  },
                },
              ],
            },
          },
        },
      },
    },
  ];
  return await Analytics.aggregate(pipeline);
};

export const getAnalyticsAllPipeline = async () => {
  const pipeline = [
    {
      $lookup: {
        from: "urls",
        localField: "urlID",
        foreignField: "-_id",
        as: "url",
      },
    },

    {
      $facet: {
        totalClick: [
          {
            $group: {
              _id: "$_id",
            },
          },
          {
            $count: "total",
          },
        ],
        uniqueUser: [
          {
            $group: {
              _id: "$userIP",
            },
          },
          {
            $count: "total",
          },
        ],
        uniqueClicks: [
          {
            $group: {
              _id: { f1: "$urlID", f2: "$userIP" },
            },
          },
          { $count: "total" },
        ],
        clicksByDate: [
          {
            $match: {
              timeStamp: {
                $gte: new Date(new Date().setDate(new Date().getDate() - 7)),
                $lte: new Date(),
              },
            },
          },
          {
            $group: {
              _id: {
                $dateToString: {
                  format: "%Y-%m-%d",
                  date: "$timeStamp",
                },
              },
              clicksByDate: {
                $sum: 1,
              },
            },
          },
        ],
        osType: [
          {
            $group: {
              _id: "$osType",
              sum: {
                $addToSet: "$userIP",
              },
            },
          },
          {
            $project: {
              uniqueUser: {
                $size: "$sum",
              },
            },
          },
        ],
        deviceType: [
          {
            $group: {
              _id: "$deviceType",
              sum: {
                $addToSet: "$userIP",
              },
            },
          },
          {
            $project: {
              uniqueUser: {
                $size: "$sum",
              },
            },
          },
        ],

        getOs: [
          {
            $group: {
              _id: "$osType",
              uniqueClicks: {
                $addToSet: "$userIP",
              },
            },
          },
          {
            $project: {
              osName: "$_id",
              uniqueClicks: { $size: "$uniqueClicks" },
              _id: 0,
            },
          },
        ],
        getDevice: [
          {
            $group: {
              _id: "$deviceType",
              uniqueClicks: {
                $addToSet: "$userIP",
              },
            },
          },
          {
            $project: {
              deviceName: "$_id",
              uniqueClicks: { $size: "$uniqueClicks" },
              _id: 0,
            },
          },
        ],
      },
    },
    {
      $project: {
        totalClicks: {
          $arrayElemAt: ["$totalClick.total", 0],
        },
        uniqueClicks: { $arrayElemAt: ["$uniqueClicks.total", 0] },
        uniqueUser: {
          $arrayElemAt: ["$uniqueUser.total", 0],
        },
        clicksByDate: 1,
        osType: {
          $map: {
            input: "$osType",
            as: "clicks",
            in: {
              $mergeObjects: [
                "$$clicks",
                {
                  uniqueClick: {
                    $arrayElemAt: [
                      "$getOs.uniqueClicks",
                      {
                        $indexOfArray: ["$getOs.osName", "$$clicks._id"],
                      },
                    ],
                  },
                },
              ],
            },
          },
        },
        deviceType: {
          $map: {
            input: "$deviceType",
            as: "device",
            in: {
              $mergeObjects: [
                "$$device",
                {
                  uniqueClick: {
                    $arrayElemAt: [
                      "$getDevice.uniqueClicks",
                      {
                        $indexOfArray: [
                          "$getDevice.deviceName",
                          "$$device._id",
                        ],
                      },
                    ],
                  },
                },
              ],
            },
          },
        },
      },
    },
  ];
  return await Analytics.aggregate(pipeline);
};

export const getAnalyticsByTopicPipeline = async (topic: string) => {
  const pipeline = [
    {
      $lookup: {
        from: "urls",
        localField: "urlID",
        foreignField: "_id",
        as: "urls",
      },
    },
    {
      $addFields: {
        url: {
          $arrayElemAt: ["$urls", 0],
        },
      },
    },
    {
      $match: {
        "url.topic": topic,
      },
    },
    {
      $facet: {
        totalClick: [
          {
            $group: {
              _id: "$_id",
            },
          },
          {
            $count: "total",
          },
        ],
        uniqueUser: [
          {
            $group: {
              _id: "$userIP",
            },
          },
          {
            $count: "total",
          },
        ],
        uniqueClicks: [
          {
            $group: {
              _id: { f1: "$urlID", f2: "$userIP" },
            },
          },
          { $count: "total" },
        ],
        clicksByDate: [
          {
            $match: {
              timeStamp: {
                $gte: new Date(new Date().setDate(new Date().getDate() - 7)),
                $lte: new Date(),
              },
            },
          },
          {
            $group: {
              _id: {
                $dateToString: {
                  format: "%Y-%m-%d",
                  date: "$timeStamp",
                },
              },
              clicksByDate: {
                $sum: 1,
              },
            },
          },
        ],
        osType: [
          {
            $group: {
              _id: "$osType",
              sum: {
                $addToSet: "$userIP",
              },
            },
          },
          {
            $project: {
              uniqueUser: {
                $size: "$sum",
              },
            },
          },
        ],
        deviceType: [
          {
            $group: {
              _id: "$deviceType",
              sum: {
                $addToSet: "$userIP",
              },
            },
          },
          {
            $project: {
              uniqueUser: {
                $size: "$sum",
              },
            },
          },
        ],

        getOs: [
          {
            $group: {
              _id: "$osType",
              uniqueClicks: {
                $addToSet: "$userIP",
              },
            },
          },
          {
            $project: {
              osName: "$_id",
              uniqueClicks: { $size: "$uniqueClicks" },
              _id: 0,
            },
          },
        ],
        getDevice: [
          {
            $group: {
              _id: "$deviceType",
              uniqueClicks: {
                $addToSet: "$userIP",
              },
            },
          },
          {
            $project: {
              deviceName: "$_id",
              uniqueClicks: { $size: "$uniqueClicks" },
              _id: 0,
            },
          },
        ],
      },
    },
    {
      $project: {
        totalClicks: {
          $arrayElemAt: ["$totalClick.total", 0],
        },
        uniqueClicks: { $arrayElemAt: ["$uniqueClicks.total", 0] },
        uniqueUser: {
          $arrayElemAt: ["$uniqueUser.total", 0],
        },
        clicksByDate: 1,
        osType: {
          $map: {
            input: "$osType",
            as: "clicks",
            in: {
              $mergeObjects: [
                "$$clicks",
                {
                  uniqueClick: {
                    $arrayElemAt: [
                      "$getOs.uniqueClicks",
                      {
                        $indexOfArray: ["$getOs.osName", "$$clicks._id"],
                      },
                    ],
                  },
                },
              ],
            },
          },
        },
        deviceType: {
          $map: {
            input: "$deviceType",
            as: "device",
            in: {
              $mergeObjects: [
                "$$device",
                {
                  uniqueClick: {
                    $arrayElemAt: [
                      "$getDevice.uniqueClicks",
                      {
                        $indexOfArray: [
                          "$getDevice.deviceName",
                          "$$device._id",
                        ],
                      },
                    ],
                  },
                },
              ],
            },
          },
        },
      },
    },
  ];

  return await Analytics.aggregate(pipeline);
};
