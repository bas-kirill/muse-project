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
import {
  CATALOGUE,
  CREATE_INSTRUMENT,
  HOME,
  INSTRUMENT_BY_ID,
  LOGIN,
  NOT_FOUND,
  PROFILE,
} from "shared/config/paths";
import { CreateInstrument } from "pages/create-instrument";

const routes = createRoutesFromElements(
  <Route>
    <Route path={HOME} element={<Home />} />
    <Route path={PROFILE} element={<UserProfile />} loader={profileLoader} />
    <Route path={CATALOGUE} element={<Catalogue />} loader={catalogueLoader} />
    <Route path={LOGIN} element={<LogIn />} action={action} />
    <Route
      path={INSTRUMENT_BY_ID}
      element={<Instrument />}
      loader={instrumentLoader}
    />
    <Route path={CREATE_INSTRUMENT} element={<CreateInstrument />} />
    <Route path={NOT_FOUND} element={<NotFound />} />
  </Route>,
);

const router = createBrowserRouter(routes);

const App = () => (
  <div id="app">
    <RouterProvider router={router} />
  </div>
);

export default App;
