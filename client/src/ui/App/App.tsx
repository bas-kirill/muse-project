import React from 'react';
import './App.css';
import {Route, Routes} from "react-router-dom";
import LogIn from "../LogIn/LogIn";
import Home from "../Home/Home";
import NotFound from "../NotFound/NotFound";

const App = () => (
    <div id="app">
        <Routes>
            <Route path="/login" element={<LogIn/>}/>
            <Route path="/" element={<Home/>}/>
            <Route path="*" element={<NotFound/>}/>
        </Routes>
    </div>
);


export default App;
