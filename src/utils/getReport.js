import axios from "axios";
import { useEffect, useState } from "react";

const useGetReport = (post_data) => {
  const [report, setReport] = useState();

  const getReport = async () => {
    const { data } = await axios.post(
      "https://api.dataforseo.com/v3/on_page/instant_pages",
      post_data,
      {
        auth: {
          username: import.meta.env.VITE_USERNAME,
          password: import.meta.env.VITE_PASSWORD,
        },
        headers: {
          "content-type": "application/json",
        },
      }
    );
    setReport(data);
  };

  useEffect(() => {
    getReport();
  }, []);

  return report;
};

export default useGetReport;
