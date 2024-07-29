import { useEffect } from "react";
import Jwt from "domain/model/jwt";

const useJwt = () => {
  useEffect(() => {
    const jwt = Jwt.extractFromLocalStorage();

    if (jwt === null) {
      return;
    }

    if (jwt.expired()) {
      Jwt.eraseFromLocalStorage(); // need to rerender header
    }
  }, []);
};

export default useJwt;
