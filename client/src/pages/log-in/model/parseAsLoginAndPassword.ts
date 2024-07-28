export function parseAsLoginAndPassword(data: FormData) {
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

  if (typeof password === "string" && password.length < 3) {
    errors.push("Password must greater 2 symbols");
  }

  return { login, password, errors } as {
    login: string;
    password: string;
    errors: string[];
  };
}
