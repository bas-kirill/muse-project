import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Profile.css";
import { Jwt, Profile } from "domain/";
import { SERVER_URL } from "shared/config";
import { Header } from "widgets/header";
import { Footer } from "widgets/footer";

export function UserProfile() {
  const [profile, setProfile] = useState<Profile>();

  useEffect(() => {
    const jwt = Jwt.extractFromLocalStorage();
    if (jwt == null) {
      return;
    }
    axios
      .get<Profile>(`${SERVER_URL}/api/profile`, {
        headers: {
          Authorization: `Bearer ${jwt.toStringValue()}`,
        },
      })
      .then((response) => setProfile(response.data));
  });

  return (
    <>
      <Header />
      <div id="profile">
        <h1>{profile?.fullName}</h1>
        <div>
          <b>Name</b>: {profile?.fullName}
        </div>
        <div>
          <b>Role</b>: {profile?.role}
        </div>
      </div>
      <Footer />
    </>
  );
}

export default UserProfile;
