import React from "react";
import "./App.css";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import { HomePage } from "pages/home";
import { UserProfilePage, loader as profileLoader } from "pages/profile";
import { CataloguePage, loader as catalogueLoader } from "pages/catalogue";
import {
  action as loginAction,
  LoginPage, // todo(refactor): add suffix `Page`
} from "pages/login";
import { NotFoundPage } from "pages/not-found";
import {
  InstrumentPage, // todo(refactor): add suffix `Page`
  loader as instrumentLoader,
} from "pages/instrument";
import {
  CATALOGUE,
  CREATE_INSTRUMENT,
  EDIT_INSTRUMENT_BY_ID,
  FAVORITE,
  HOME,
  INSTRUMENT_BY_ID,
  LOGIN,
  NOT_FOUND,
  PROFILE,
  REGISTRATION_URL,
} from "shared/config/paths";
import {
  CreateInstrumentPage, // todo(refactor): add suffix `Page`
  loader as createInstrumentLoader,
  action as createInstrumentAction,
} from "pages/create-instrument";
import {
  EditInstrumentPage, // todo(refactor): add suffix `Page`
  loader as editLoader,
  action as editAction,
} from "pages/edit-instrument";
import {
  RegistrationPage,
  action as registrationAction,
} from "pages/registration";
import { FavoritePage, loader as favoriteLoader } from "pages/favorite";

const routes = createRoutesFromElements(
  <Route>
    <Route path={HOME} element={<HomePage />} />
    <Route
      path={PROFILE}
      element={<UserProfilePage />}
      loader={profileLoader}
    />
    <Route
      path={CATALOGUE}
      element={<CataloguePage />}
      loader={catalogueLoader}
    />
    <Route path={LOGIN} element={<LoginPage />} action={loginAction} />
    <Route
      path={INSTRUMENT_BY_ID}
      element={<InstrumentPage />}
      loader={instrumentLoader}
    />
    <Route
      path={CREATE_INSTRUMENT}
      element={<CreateInstrumentPage />}
      loader={createInstrumentLoader}
      action={createInstrumentAction}
    />
    <Route
      path={EDIT_INSTRUMENT_BY_ID}
      element={<EditInstrumentPage />}
      loader={editLoader}
      action={editAction}
    />
    <Route
      path={REGISTRATION_URL}
      element={<RegistrationPage />}
      action={registrationAction}
    />
    <Route path={FAVORITE} element={<FavoritePage />} loader={favoriteLoader} />
    <Route path={NOT_FOUND} element={<NotFoundPage />} />
  </Route>,
);

const router = createBrowserRouter(routes);

const App = () => (
  <div id="app">
    <RouterProvider router={router} />
  </div>
);

export default App;
