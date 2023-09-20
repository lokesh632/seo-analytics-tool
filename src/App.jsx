import { Outlet, createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import Report from "./pages/Report";

import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "report",
        element: <Report />,
      },
    ],
  },
]);

function AppLayout() {
  return (
    <>
      <Outlet />
      <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        draggable
        theme="dark"
      />
    </>
  );
}

export default router;
