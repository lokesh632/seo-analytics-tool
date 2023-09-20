import axios from "axios";
import { useEffect, useState } from "react";

const useGetCategoriesReport = (post_data) => {
  let id;
  let intervalId;
  const [report, setReport] = useState(null);
  const getCategoriesData = async () => {
    const postRes = await axios.post(
      "https://api.dataforseo.com/v3/on_page/lighthouse/task_post",
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
    id = postRes?.data?.tasks[0]?.id;

    intervalId = setInterval(func, 5000);
    async function func() {
      const { data } = await axios.get(
        `https://api.dataforseo.com/v3/on_page/lighthouse/task_get/json/${id}`,
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
      if (data?.tasks[0]?.status_message == "Task Not Found.") {
        clearInterval(intervalId);
        return;
      }

      if (data?.tasks[0]?.result) {
        setReport(data);
      }
    }
  };

  useEffect(() => {
    getCategoriesData();
  }, []);
  return report;
};

export default useGetCategoriesReport;
