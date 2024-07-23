import React from 'react';
import './App.css';
import {Route, Routes} from "react-router-dom";
import Home from "./ui/Home/Home";
import NotFound from "./ui/NotFound/NotFound";

const App = () => (
    <div id="app">
        <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="*" element={<NotFound/>}/>
        </Routes>
    </div>
);


export default App;
