import { MINIMAL_PASSWORD_LENGTH } from "shared/config/frontend";

export function parseForm(data: FormData) {
  const errors = [];

  const fullName = data.get("fullName");
  if (typeof fullName !== "string" || fullName.trim() === "") {
    errors.push("Type name at form");
  }

  const login = data.get("login");
  if (typeof login !== "string" || login.trim() === "") {
    errors.push("Type login at form");
  }

  if (typeof login === "string" && login.trim() === "") {
    errors.push("Type login at form");
  }

  const password = data.get("password");
  if (typeof password !== "string" || password.trim() === "") {
    errors.push("Type password at form");
  }

  if (
    typeof password === "string" &&
    password.length < MINIMAL_PASSWORD_LENGTH
  ) {
    errors.push(`Password length less than ${MINIMAL_PASSWORD_LENGTH}`);
  }

  return { fullName, login, password, errors } as {
    fullName: string;
    login: string;
    password: string;
    errors: string[];
  };
}
