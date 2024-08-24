import { useEffect } from "react";
import Jwt from "domain/model/jwt";
import { useNavigate } from "react-router-dom";
import { LOGIN } from "shared/config/paths";

export const useJwt = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const jwt = Jwt.extractFromCookie();

    if (jwt === null || jwt.expired()) {
      Jwt.eraseFromCookie(); // need to rerender header
      navigate(LOGIN);
    }
  }, [navigate]);
};
