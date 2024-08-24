import React from "react";
import "./styles/UserProfilePage.css";
import { HeaderWidget } from "widgets/header";
import { FooterWidget } from "widgets/footer";
import { useLoaderData } from "react-router-dom";
import { ProfileDetails } from "generated/model";

export function UserProfilePage() {
  const profile = useLoaderData() as ProfileDetails;

  return (
    <>
      <HeaderWidget />
      <div id="profile">
        <h1>{profile?.full_name}</h1>
        <div>
          <b>Name</b>: {profile?.full_name}
        </div>
        <div>
          <b>Role</b>: {profile?.role}
        </div>
      </div>
      <FooterWidget />
    </>
  );
}

export default UserProfilePage;
