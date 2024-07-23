import React from 'react';
import "./Header.css";
import {Link} from "react-router-dom";

export function Header() {
    return (
        <header>
            <nav>
                <div><Link to={"/"}>Home</Link></div>
                <div><Link to={"/favorite"}>Favorite</Link></div>
                <div><Link to={"/catalogue"}>Catalogue</Link></div>
                <div><Link to={"/login"}>Log in</Link></div>
            </nav>
        </header>
    );
}

export default Header;