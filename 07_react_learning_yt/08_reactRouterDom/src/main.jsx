import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import {
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import Layout from "./Layout.jsx";
import Home from "./components/Home/Home.jsx";
import AboutUs from "./components/AboutUs/AboutUs.jsx";
import ContactUs from "./components/ContactUs/ContactUs.jsx";
import Github ,{githubInfoLoader} from "./components/Github/Github.jsx";
import User from "./components/User/User.jsx";
import NotFound from "./components/NotFound/NotFound.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route path="" element={<Home />} />
      <Route path="/aboutus" element={<AboutUs />} />
      <Route path="/contactus" element={<ContactUs />} />
      <Route 
      loader={githubInfoLoader}
      path="/github" element={<Github />} />
      <Route path="/user/" element={<User />}>
        <Route path=":userid" element={<User />} />
      </Route>
      {/* not found route  */}
      <Route path="*" element={<NotFound />} />
    </Route>
  )
);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
