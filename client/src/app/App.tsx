import React from "react";
import "./App.css";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import { Home } from "pages/home";
import { UserProfile, loader as profileLoader } from "pages/profile";
import { Catalogue, loader as catalogueLoader } from "pages/catalogue";
import { action, LogIn } from "pages/log-in";
import { NotFound } from "pages/not-found";
import { Instrument, loader as instrumentLoader } from "pages/instrument";

const routes = createRoutesFromElements(
  <Route>
    <Route path="/" element={<Home />} />
    <Route path="/profile" element={<UserProfile />} loader={profileLoader} />
    <Route path="/catalogue" element={<Catalogue />} loader={catalogueLoader} />
    <Route path="/login" element={<LogIn />} action={action} />
    <Route
      path="/instrument/:instrumentId"
      element={<Instrument />}
      loader={instrumentLoader}
    />
    <Route path="*" element={<NotFound />} />
  </Route>,
);

const router = createBrowserRouter(routes);

const App = () => (
  <div id="app">
    <RouterProvider router={router} />
  </div>
);

export default App;
