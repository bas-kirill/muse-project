import React from "react";
import "./UserProfile.css";
import { Header } from "widgets/header";
import { Footer } from "widgets/footer";
import { useLoaderData } from "react-router-dom";
import { ProfileDetails } from "generated/model";

export function UserProfile() {
  const profile = useLoaderData() as ProfileDetails;

  return (
    <>
      <Header />
      <div id="profile">
        <h1>{profile?.full_name}</h1>
        <div>
          <b>Name</b>: {profile?.full_name}
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
