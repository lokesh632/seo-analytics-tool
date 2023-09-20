import { useNavigate } from "react-router-dom";
import useGetReport from "../utils/getReport";
import useGetScreenshot from "../utils/getScreenshot";
import { useEffect } from "react";
import { toast } from "react-toastify";
import Loader from "../components/Loader";
import useGetCategoriesReport from "../utils/getCategoriesReport";

import Categories from "../components/Categories";

export default function Report() {
  const url = sessionStorage.getItem("url");
  const navigate = useNavigate();
  const onPageDataArray = [];
  const onPageDataArray2 = [];
  const checksArray = [];
  let categories;
  let onPageData;
  let target;
  if (url?.slice(0, 8) == "https://") {
    target = url;
  } else {
    target = `https://${url}`;
  }

  const screenshot_data = [
    {
      url: target,
      full_page_screenshot: false,
    },
  ];

  const task_post_data = [
    {
      url: target,
      enable_javascript: true,
      enable_browser_rendering: true,
      check_spell: true,
    },
  ];

  const light_house_post_data = [
    {
      url: target,
      for_mobile: true,
    },
  ];
  const screenshot = useGetScreenshot(screenshot_data);
  const taskData = useGetReport(task_post_data);
  const categoriesData = useGetCategoriesReport(light_house_post_data);
  
  if (categoriesData && taskData) {
    const onPageChecks = taskData.tasks[0].result[0].items[0].checks;
    for (const key in onPageChecks) {
      checksArray.push({ [key]: onPageChecks[key] });
    }
    onPageData = taskData.tasks[0].result[0].items[0].meta;
    for (const key in onPageData) {
      onPageDataArray.push({ [key]: onPageData[key] });
    }
    categories = categoriesData.tasks[0].result[0].categories;
    for (const key in onPageData.content) {
      onPageDataArray2.push({ [key]: onPageData.content[key] });
    }
  }
  useEffect(() => {
    if (
      taskData?.tasks[0]?.status_message ==
      "Invalid Field: 'url - Domain Not Found'."
    ) {
      navigate("/");
      toast.error("Please enter valid url!");
    }
  });

  console.log(categoriesData);
  console.log(screenshot);
  console.log(taskData);

  return (
    <>
      {!screenshot || !taskData ? (
        <Loader />
      ) : (
        <div className="mt-12 xs:max-md:mt-4 mx-8 xs:max-md:mx-2  xs:max-md:border-none border-solid border-slate-400">
          <h2 className="text-4xl font-bold text-white mb-16 text-center xs:mt-10">
            <span className="border-b-4 border-blue-500 pb-2">RESULTS</span>
          </h2>
          <div className="w-full mt-8 mb-12 xs:max-md:mb-2 flex xs:max-md:flex-col xs:max-md:gap-12 items-center ">
            <div className="w-6/12 xs:max-md:w-full flex justify-center">
              <img
                src={screenshot}
                alt=""
                className="w-[85%] object-contain rounded-lg"
              />
            </div>
          </div>

          <div>
            <div id="on-page" className="mb-16 ">
              <div className="flex items-center justify-center">
                <h2 className="text-4xl md:max-xl:text-2xl xs:max-md:text-3xl font-semibold text-white  xs:mb-14 text-center">
                  <span className="border-b-4 border-blue-500 pb-2">
                    On-Page Results
                  </span>
                </h2>
              </div>
              <div>
                {onPageDataArray.length && (
                  <div className="grid grid-cols-4 md:max-lg:grid-cols-3 xs:max-md:grid-cols-2  gap-4 xs:max-md:gap-6 mx-16 md:max-lg:mx-4 xs:max-md:mx-4 xs:max-md:mt-4 mt-10">
                    {onPageDataArray.slice(9, 16).map((item) => (
                      <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-transform transform hover:scale-105 duration-300 ease-in-out">
                        <h6 className="text-2xl text-center font-semibold text-gray-800 mt-3 ">
                          {item[Object.keys(item)[0]]}
                        </h6>
                        <h6 className="text-gray-600 text-base text-center mb-3">
                          {Object.keys(item)[0].replace(/\_/g, " ")}
                        </h6>
                      </div>
                    ))}
                    {onPageDataArray2.length &&
                      onPageDataArray2.map((item) => (
                        <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-transform transform hover:scale-105 duration-300 ease-in-out">
                          <h6 className="text-2xl text-center font-semibold text-gray-800 mt-3">
                            {Number(item[Object.keys(item)[0]]).toFixed(2)}
                          </h6>
                          <h6 className="text-gray-600 text-base text-center mb-3">
                            {Object.keys(item)[0].replace(/\_/g, " ")}
                          </h6>
                        </div>
                      ))}
                  </div>
                )}
              </div>
            </div>
            <div id="checks" className="mt-12 xs:max-md:mt-4">
              <div className="flex items-center justify-center">
                <h2 className="text-4xl md:max-xl:text-2xl xs:max-md:text-3xl font-semibold text-white mb-14 xs:mb-14 text-center">
                  <span className="border-b-4 border-blue-500 pb-2">
                    On-Page Checks
                  </span>
                </h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 xs:max-md:gap-6 mx-8 xs:max-md:mx-5 mt-8">
                {checksArray.slice(0, 25).map((item, index) => (
                  <div
                    key={index}
                    className="bg-white border border-solid border-gray-300 rounded-lg p-4 flex flex-col items-center transition-transform transform hover:scale-105 hover:shadow-lg"
                  >
                    <div className="flex items-center justify-start mb-2">
                      <div
                        className={`w-12 h-12 rounded-full flex items-center justify-center ${
                          item[Object.keys(item)[0]]
                            ? "bg-green-500"
                            : "bg-red-500"
                        }`}
                      >
                        {item[Object.keys(item)[0]] ? (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6 text-white"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                        ) : (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6 text-white"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M6 18L18 6M6 6l12 12"
                            />
                          </svg>
                        )}
                      </div>
                    </div>
                    <h3 className="text-lg md:text-base text-gray-900 font-semibold text-right">
                      {Object.keys(item)[0].replace(/\_/g, " ")}
                    </h3>
                  </div>
                ))}
              </div>
            </div>

            <div
              id="h-tags"
              className="mx-16 xs:max-md:mx-1 md:max-lg:mx-4 mt-11 xs:max-md:mt-4 mb-24 xs:max-md:mb-4"
            >
              <div className="flex items-center justify-center">
                <h2 className="text-4xl font-bold text-white mb-16 text-center xs:mt-10">
                  <span className="border-b-4 border-blue-500 pb-2">
                    H - Tags
                  </span>
                </h2>
              </div>
              <div className="flex xs:max-md:flex-col gap-4">
                <div className="w-full md:w-1/2 bg-gray-500 rounded-lg p-6">
                  <h2 className="text-2xl md:text-xl xs:text-lg mb-4 text-white font-semibold">
                    H1 Tags Found:{" "}
                    {onPageData?.htags?.h1?.length
                      ? onPageData?.htags?.h1?.length
                      : 0}
                  </h2>
                  <ul className="list-disc pl-6">
                    {onPageData?.htags?.h1?.map((item, index) => (
                      <li
                        key={index}
                        className="text-lg md:text-base text-white"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="w-full md:w-1/2 bg-gray-500 rounded-lg p-6">
                  <h2 className="text-2xl md:text-xl xs:text-lg mb-4 text-white font-semibold">
                    H2 Tags Found:{" "}
                    {onPageData?.htags?.h2?.length
                      ? onPageData?.htags?.h2?.length
                      : 0}
                  </h2>
                  <ul className="list-disc pl-6">
                    {onPageData?.htags?.h2?.map((item, index) => (
                      <li
                        key={index}
                        className="text-lg md:text-base text-white"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
            <Categories data={categories?.accessibility} />
            <Categories data={categories?.seo} />
            <Categories data={categories?.performance} />
            <Categories data={categories?.["best-practices"]} />
          </div>
        </div>
      )}
    </>
  );
}
