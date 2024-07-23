import React, {useEffect, useState} from 'react';
import "./Header.css";
import {Link} from "react-router-dom";
import Jwt from "../../domain/Jwt";

export function Header() {
    const [authenticated, setAuthenticated] = useState(false);

    useEffect(() => {
        const jwtRaw = window.localStorage.getItem(Jwt.WINDOW_LOCAL_STORAGE_JWT_KEY);
        if (jwtRaw == null) {
            setAuthenticated(false);
            return;
        }

        setAuthenticated(true);
    });

    return (
        <header>
            <nav>
                {!authenticated && (<div><Link to={"/login"}>Log in</Link></div>)}
                {authenticated && (<div><Link to={"/profile"}>Profile</Link></div>)}
                <div><Link to={"/favorite"}>Favorite</Link></div>
                <div><Link to={"/catalogue"}>Catalogue</Link></div>
                <div><Link to={"/"}>Home</Link></div>
            </nav>
        </header>
    );
}

export default Header;