import React, {useEffect, useState} from 'react';
import "./LogIn.css";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import axios from 'axios';
import Jwt from "../../domain/Jwt";
import {SERVER_PORT, SERVER_URL} from "../../env";

interface BasicLoginRequestBody {
    username: string,
    password: string,
}

export function LogIn() {
    const [login, setLogin] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [jwt, setJwt] = useState<Jwt | null>(null);
    const [erroneous, setErroneous] = useState<boolean>(false);

    useEffect(() => {
        const jwt = Jwt.extractFromLocalStorage();
        if (jwt == null) {
            setJwt(null);
            return;
        }
        setJwt(jwt);
    });

    const handleLoginFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const basicLoginRequestBody: BasicLoginRequestBody = {
            username: login,
            password: password,
        }

        axios.post(`${SERVER_URL}:${SERVER_PORT}/api/auth/login`, basicLoginRequestBody)
            .then(response => {
                if (response.status === 200) {
                    const jwtRaw = response.data.jwtToken;
                    Jwt.putToLocalStorage(jwtRaw)
                    setJwt(Jwt.from(jwtRaw))
                }
            })
            .catch(() => {
                setErroneous(true);
            });
    }

    return (
        <div id="log-in">
            <Header/>
            {jwt && (
                <div className="successfull-login">
                    ✅ Welcome, your role: {jwt.role}
                </div>
            )}

            {!jwt && (
                <form onSubmit={handleLoginFormSubmit}>
                    <input type="text" placeholder={"Login"} onChange={e => setLogin(e.target.value)}/>
                    <input type="text" placeholder={"Password"} onChange={e => setPassword(e.target.value)}/>
                    <input type="submit" value="Log In"/>
                    {erroneous && (
                        <div className="erroneous-login">
                            Incorrect username or password
                        </div>
                    )}
                </form>
            )}
            <Footer/>
        </div>
    )
}

export default LogIn;
