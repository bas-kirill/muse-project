import React from 'react';
import './App.css';
import {Route, Routes} from "react-router-dom";
import LogIn from "../LogIn/LogIn";
import Home from "../Home/Home";
import NotFound from "../NotFound/NotFound";
import UserProfile from "../Profile/UserProfile";
import Catalogue from "../Catalogue/Catalogue";

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
