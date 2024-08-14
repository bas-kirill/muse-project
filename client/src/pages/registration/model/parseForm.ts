import { MINIMAL_PASSWORD_LENGTH } from "shared/config/frontend";

export function parseForm(data: FormData) {
  const errors = [];

  const name = data.get("name");
  if (typeof name !== "string" || name === "") {
    errors.push("Type name at form");
  }

  const surname = data.get("surname");
  if (typeof surname !== "string" || surname === "") {
    errors.push("Type surname at form");
  }

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

  return { name, surname, login, password, errors } as {
    name: string;
    surname: string;
    login: string;
    password: string;
    errors: string[];
  };
}
