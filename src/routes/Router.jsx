import { createBrowserRouter } from "react-router-dom";
import Main from "../layout/Main/Main";
import Home from "../pages/Home/Home";
import OurServices from "../pages/OurServices/OurServices";
import Contact from "../pages/Contact/Contact";
import AboutUs from "../pages/AboutUs/AboutUs";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/services", element: <OurServices/> },
      { path: "/contact", element: <Contact/> },
      { path: "/about-us", element: <AboutUs/> },
    ],
  },
]);
