import { Configuration } from "generated/configuration";

interface Window {
  _env_: {
    SERVER_API_URL: string;
  };
}

// @ts-ignore
const apiUrl = window._env_.SERVER_API_URL;
export const apiConfig = new Configuration({
  basePath: apiUrl,
});
