import { MINIMAL_PASSWORD_LENGTH } from "shared/config/frontend";

export function parseForm(data: FormData) {
  const errors = [];

  const login = data.get("login");
  if (typeof login !== "string" || login === "") {
    errors.push("Type login at form");
  }

  if (typeof login === "string" && login.length < 4) {
    errors.push("Login must greater than 3 symbols");
  }

  const password = data.get("password");
  if (typeof password !== "string" || password === "") {
    errors.push("Type password at form");
  }

  if (
    typeof password === "string" &&
    password.length < MINIMAL_PASSWORD_LENGTH
  ) {
    errors.push(`Password must greater ${MINIMAL_PASSWORD_LENGTH} symbols`);
  }

  return { login, password, errors } as {
    login: string;
    password: string;
    errors: string[];
  };
}
