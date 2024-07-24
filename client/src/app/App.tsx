import React from 'react';
import './App.css';
import {Route, Routes} from "react-router-dom";
import {Home} from "pages/home";
import {UserProfile} from "pages/profile";
import {Catalogue} from "pages/catalogue";
import {LogIn} from "pages/log-in";
import {NotFound} from "pages/not-found";

const App = () => (
    <div id="app">
        <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/profile" element={<UserProfile/>}/>
            <Route path="/catalogue" element={<Catalogue/>}/>
            <Route path="/login" element={<LogIn/>}/>
            <Route path="*" element={<NotFound/>}/>
        </Routes>
    </div>
);


export default App;
