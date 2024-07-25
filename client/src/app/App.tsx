import React from 'react';
import './App.css';
import {
    BrowserRouter,
    createBrowserRouter,
    createRoutesFromElements,
    Route,
    RouterProvider,
    Routes
} from "react-router-dom";
import {Home} from "pages/home";
import {UserProfile} from "pages/profile";
import {Catalogue} from "pages/catalogue";
import {action, LogIn} from "pages/log-in";
import {NotFound} from "pages/not-found";
import {loader} from "pages/catalogue";

const routes = createRoutesFromElements(
    <Route>
        <Route path="/" element={<Home/>} />
        <Route path="/profile" element={<UserProfile/>}/>
        <Route path="/catalogue" element={<Catalogue/>} loader={loader}/>
        <Route path="/login" element={<LogIn/>} action={action}/>
        <Route path="*" element={<NotFound/>}/>
    </Route>
);

const router = createBrowserRouter(routes);

const App = () => (
    <div id="app">
        <RouterProvider router={router}/>
        {/*<BrowserRouter>*/}
        {/*    <Routes>*/}

        {/*    </Routes>*/}
        {/*</BrowserRouter>*/}
    </div>
);


export default App;
