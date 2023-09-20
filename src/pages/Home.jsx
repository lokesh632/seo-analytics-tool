import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const [url, setUrl] = useState("");
  const navigate = useNavigate();

  const handleSubmit =  (e) => {
    e.preventDefault();
    sessionStorage.setItem("url", url);
    navigate("/report");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="max-w-screen-lg w-full bg-transparent p-8 rounded-lg">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 md:mr-16 md:mb-8">
            <img
              src="./seo-analytics.jpg?w=2000"
              alt="Website Image"
              className="w-full h-full rounded-lg"
            />
          </div>
          <div className="md:w-1/2 text-center md:text-left md:mb-10">
            <h1 className="text-4xl font-bold text-center text-white mr-12 xs:text-3xl xs:mt-8 mb-8">
              SEO ANALYTICS TOOL
            </h1>
            <form onSubmit={handleSubmit} className="mb-6 md:mt-8">
              <input
                type="text"
                value={url}
                placeholder="Enter Your Website's URL"
                onChange={(e) => setUrl(e.target.value)}
                className="w-full px-4 py-3 mb-4 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500 placeholder-gray-500 bg-gray-800 text-white"
              />
              <button
                type="submit"
                disabled={!url}
                className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-lg transition duration-300 ease-in-out"
              >
                Check Your Website's Health
              </button>
            </form>
            <p className="text-gray-300 text-lg">
              Take charge of your website's SEO destiny today with our free SEO 
              checker. Unleash your site's full potential and rise through the 
              ranks of search engine glory!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
