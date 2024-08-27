import React from "react";
import styles from "./styles/Profile.page.module.css";
import { HeaderWidget } from "widgets/header";
import { FooterWidget } from "widgets/footer";
import { useLoaderData, useNavigate } from "react-router-dom";
import { ProfileDetails } from "generated/model";
import { useJwt } from "shared/jwt/use-jwt";
import { LogoutApi } from "generated/api/logout-api";
import Jwt from "domain/model/jwt";
import { LOGIN } from "shared/config/paths";
import { deleteCookie } from "shared/cookie/cookie";
import { COOKIE_JWT_KEY, COOKIE_SESSIONID } from "shared/config/frontend";
import { useDarkMode } from "shared/dark-mode/use-dark-mode";
import { apiConfig } from "shared/config/api";

const logout = new LogoutApi(apiConfig);

export function ProfilePage() {
  useJwt();
  const { darkMode, toggleTheme } = useDarkMode();
  const navigate = useNavigate();
  const profile = useLoaderData() as ProfileDetails;

  const onLogoutHandler = () => {
    const fetchLogout = async () => {
      const response = await logout.logout({
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${Jwt.extractFromCookie()?.toStringValue()}`,
        },
      });

      if (response.status === 200) {
        deleteCookie(COOKIE_JWT_KEY);
        deleteCookie(COOKIE_SESSIONID);
        navigate(LOGIN);
        return;
      }

      throw new Error("Fail to logout");
    };

    fetchLogout();
  };

  return (
    <>
      <HeaderWidget />

      <div
        className={`
        ${styles.profile}
        ${darkMode && styles.profile__dark}
      `}
      >
        <h1>{profile.full_name}</h1>
        <div>
          <b>Name</b>: <span>{profile.full_name}</span>
        </div>
        <div>
          <b>Role</b>: <span>{profile.role}</span>
        </div>
        <button
          onClick={toggleTheme}
          className={`${darkMode && styles.dark_mode__button}`}
        >
          Dark Mode
        </button>
        <button
          onClick={onLogoutHandler}
          className={`${darkMode && styles.logout__button}`}
        >
          Logout
        </button>
      </div>

      <FooterWidget />
    </>
  );
}

export default ProfilePage;
