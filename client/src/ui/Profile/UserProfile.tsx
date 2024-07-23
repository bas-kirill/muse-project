import React, {useEffect, useState} from 'react';
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Profile from "../../domain/Profile";
import axios from "axios";
import Jwt from "../../domain/Jwt";
import {SERVER_PORT, SERVER_URL} from "../../env";
import "./Profile.css";

export function UserProfile() {
    const [profile, setProfile] = useState<Profile>()

    useEffect(() => {
        const jwt = Jwt.extractFromLocalStorage()
        if (jwt == null) {
            return;
        }
        axios.get<Profile>(`${SERVER_URL}:${SERVER_PORT}/api/profile`, {
            headers: {
                Authorization: `Bearer ${jwt.toStringValue()}`
            }
        }).then(response => setProfile(response.data));
    });

    return (
        <>
            <Header/>
            <div id="profile">
                <h1>{profile?.fullName}</h1>
                <div><b>Name</b>: {profile?.fullName}</div>
                <div><b>Role</b>: {profile?.role}</div>
            </div>
            <Footer/>
        </>
    )
}

export default UserProfile;