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
import {
  action as loginAction,
  Login, // todo(refactor): add suffix `Page`
} from "pages/login";
import { NotFound } from "pages/not-found";
import {
  Instrument, // todo(refactor): add suffix `Page`
  loader as instrumentLoader,
} from "pages/instrument";
import {
  CATALOGUE,
  CREATE_INSTRUMENT,
  EDIT_INSTRUMENT_BY_ID, FAVORITE,
  HOME,
  INSTRUMENT_BY_ID,
  LOGIN,
  NOT_FOUND,
  PROFILE,
  REGISTRATION_URL
} from "shared/config/paths";
import {
  CreateInstrument, // todo(refactor): add suffix `Page`
  loader as createInstrumentLoader,
  action as createInstrumentAction,
} from "pages/create-instrument";
import {
  EditInstrument, // todo(refactor): add suffix `Page`
  loader as editLoader,
  action as editAction,
} from "pages/edit-instrument";
import {
  RegistrationPage,
  action as registrationAction,
} from "pages/registration";
import {
  FavoritePage,
  loader as favoriteLoader,
} from "pages/favorite";

const routes = createRoutesFromElements(
  <Route>
    <Route path={HOME} element={<Home />} />
    <Route path={PROFILE} element={<UserProfile />} loader={profileLoader} />
    <Route path={CATALOGUE} element={<Catalogue />} loader={catalogueLoader} />
    <Route path={LOGIN} element={<Login />} action={loginAction} />
    <Route
      path={INSTRUMENT_BY_ID}
      element={<Instrument />}
      loader={instrumentLoader}
    />
    <Route
      path={CREATE_INSTRUMENT}
      element={<CreateInstrument />}
      loader={createInstrumentLoader}
      action={createInstrumentAction}
    />
    <Route
      path={EDIT_INSTRUMENT_BY_ID}
      element={<EditInstrument />}
      loader={editLoader}
      action={editAction}
    />
    <Route
      path={REGISTRATION_URL}
      element={<RegistrationPage />}
      action={registrationAction}
    />
    <Route
      path={FAVORITE}
      element={<FavoritePage />}
      loader={favoriteLoader}
    />
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
