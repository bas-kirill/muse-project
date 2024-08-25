import React from "react";
import styles from "./styles/Profile.page.module.css";
import { HeaderWidget } from "widgets/header";
import { FooterWidget } from "widgets/footer";
import { useLoaderData } from "react-router-dom";
import { ProfileDetails } from "generated/model";
import { useJwt } from "shared/jwt/use-jwt";

export function ProfilePage() {
  useJwt();
  const profile = useLoaderData() as ProfileDetails;

  return (
    <>
      <HeaderWidget />


      <div className={styles.profile}>
        <h1>{profile.full_name}</h1>
        <div>
          <b>Name</b>: <span>{profile?.full_name}</span>
        </div>
        <div>
          <b>Role</b>: <span>{profile?.role}</span>
        </div>
        <button
          onClick={e => e.target}
          className={styles.logout__button}
        >
          Logout
        </button>
      </div>

      <FooterWidget />
    </>
  );
}

export default ProfilePage;
