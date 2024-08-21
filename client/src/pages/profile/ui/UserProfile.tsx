import React from "react";
import "./UserProfile.css";
import { Profile } from "domain/";
import { Header } from "widgets/header";
import { Footer } from "widgets/footer";
import { useLoaderData } from "react-router-dom";
import { useJwt } from "pages/login";

export function UserProfile() {
  useJwt();
  const profile = useLoaderData() as Profile;

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
