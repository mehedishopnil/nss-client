import { createBrowserRouter } from "react-router-dom";
import Main from "../layout/Main/Main";
import Home from "../pages/Home/Home";
import OurServices from "../pages/OurServices/OurServices";
import Contact from "../pages/Contact/Contact";
import AboutUs from "../pages/AboutUs/AboutUs";
import Login from "../pages/Login/Login";
import SignUp from "../pages/SignUp/SignUp";
import AdminPanel from "../layout/AdminPanel/AdminPanel";
import Profile from "../pages/Profile/Profile";
import UserProfile from "../pages/UserProfile/UserProfile";
import AdminOverview from "../pages/AdminOverview/AdminOverview";
import UserControl from "../pages/UserControl/UserControl";
import AdminControl from "../pages/AdminControl/AdminControl";
import Messages from "../components/Messages/Messages";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/services", element: <OurServices/> },
      { path: "/contact", element: <Contact/> },
      { path: "/about-us", element: <AboutUs/> },
      { path: "/log-in", element: <Login/> },
      { path: "/sign-up", element: <SignUp/> },
      { path: "/user-profile", element: <UserProfile/>}
    ],
  },
  {
    path:"admin-panel",
    element: <AdminPanel />,
    children: [
      {
        path: "profile",
        element: <Profile />
      },
      {
        path: "admin-overview",
        element: <AdminOverview />
      },
      {
        path: "user-control",
        element: <UserControl />
      },
      {
        path: "admin-control",
        element: <AdminControl />
      },
      {
        path: "messages",
        element: <Messages />
      }
    ]
  }
]);
