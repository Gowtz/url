import { BACK_URL } from "@/lib/utils";
import axios from "axios";
import { useEffect, useState } from "react";

export const useFetchTopic = (ID: string) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [topicData, setTopicData] = useState();

  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      const res = await axios.get(`${BACK_URL}/api/analytics/${ID}`, {
        withCredentials: true,
      });
      setTopicData(res.data);
      setLoading(false);
    };
    getData();
  }, [ID]);

  return {
    loading,
    topicData,
  };
};
