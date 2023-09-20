import axios from "axios";
import { useEffect, useState } from "react";

const useGetScreenshot = (screenshot_data) => {
  const [screenshot, setScreenShot] = useState(null);
  const getScreenshot = async () => {
    const { data } = await axios.post(
      "https://api.dataforseo.com/v3/on_page/page_screenshot",
      screenshot_data,
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
    if (data?.tasks_error) {
      setScreenShot(data);
      return;
    }
    setScreenShot(data?.tasks[0]?.result[0]?.items[0]?.image);
  };

  useEffect(() => {
    getScreenshot();
  }, []);

  return screenshot;
};

export default useGetScreenshot;
