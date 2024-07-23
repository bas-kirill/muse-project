import React from 'react';
import './App.css';
import {Route, Routes} from "react-router-dom";
import Home from "./ui/Home/Home";
import NotFound from "./ui/NotFound/NotFound";
import LogIn from "./ui/LogIn/LogIn";

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
