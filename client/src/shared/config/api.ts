import { Configuration } from "generated/configuration";

// @ts-expect-error there is will be no error if env was set up
const apiUrl = window._env_.SERVER_API_URL;
export const apiConfig = new Configuration({
  basePath: apiUrl,
});
