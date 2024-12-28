import { BACK_URL } from "@/lib/utils";
import axios from "axios";
import { useEffect, useState } from "react";

export const useFetch = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState("");

  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      const res = await axios.get(`${BACK_URL}/api/analytics/all`, {
        withCredentials: true,
      });
      setData(res.data);
      setLoading(false);
    };
    getData();
  }, []);

  return {
    loading,
    data,
  };
};
