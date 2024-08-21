import { useEffect } from "react";
import Jwt from "domain/model/jwt";

export const useJwt = () => {
  useEffect(() => {
    const jwt = Jwt.extractFromCookie();

    if (jwt === null) {
      return;
    }

    if (jwt.expired()) {
      Jwt.eraseFromCookie(); // need to rerender header
    }
  }, []);
};
