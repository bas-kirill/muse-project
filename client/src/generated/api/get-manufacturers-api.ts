/* tslint:disable */
/* eslint-disable */
/**
 * Client Error
 * Client Error
 *
 * The version of the OpenAPI document: 1.0.0
 * Contact: baskirill.an@gmail.com
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import type { Configuration } from "../configuration";
import type { AxiosPromise, AxiosInstance, RawAxiosRequestConfig } from "axios";
import globalAxios from "axios";
// Some imports not used depending on template conditions
// @ts-ignore
import {
  DUMMY_BASE_URL,
  assertParamExists,
  setApiKeyToObject,
  setBasicAuthToObject,
  setBearerAuthToObject,
  setOAuthToObject,
  setSearchParams,
  serializeDataIfNeeded,
  toPathString,
  createRequestFunction,
} from "../common";
// @ts-ignore
import {
  BASE_PATH,
  COLLECTION_FORMATS,
  type RequestArgs,
  BaseAPI,
  RequiredError,
  operationServerMap,
} from "../base";
// @ts-ignore
import type { ClientError } from "../model";
// @ts-ignore
import type { GetManufacturersResponse } from "../model";
// @ts-ignore
import type { ServerError } from "../model";
/**
 * GetManufacturersApi - axios parameter creator
 * @export
 */
export const GetManufacturersApiAxiosParamCreator = function (
  configuration?: Configuration,
) {
  return {
    /**
     * Get Manufacturers
     * @summary Get Manufacturers
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    getManufacturers: async (
      options: RawAxiosRequestConfig = {},
    ): Promise<RequestArgs> => {
      const localVarPath = `/manufacturer`;
      // use dummy base URL string because the URL constructor only accepts absolute URLs.
      const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }

      const localVarRequestOptions = {
        method: "GET",
        ...baseOptions,
        ...options,
      };
      const localVarHeaderParameter = {} as any;
      const localVarQueryParameter = {} as any;

      setSearchParams(localVarUrlObj, localVarQueryParameter);
      let headersFromBaseOptions =
        baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = {
        ...localVarHeaderParameter,
        ...headersFromBaseOptions,
        ...options.headers,
      };

      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions,
      };
    },
  };
};

/**
 * GetManufacturersApi - functional programming interface
 * @export
 */
export const GetManufacturersApiFp = function (configuration?: Configuration) {
  const localVarAxiosParamCreator =
    GetManufacturersApiAxiosParamCreator(configuration);
  return {
    /**
     * Get Manufacturers
     * @summary Get Manufacturers
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async getManufacturers(
      options?: RawAxiosRequestConfig,
    ): Promise<
      (
        axios?: AxiosInstance,
        basePath?: string,
      ) => AxiosPromise<GetManufacturersResponse>
    > {
      const localVarAxiosArgs =
        await localVarAxiosParamCreator.getManufacturers(options);
      const localVarOperationServerIndex = configuration?.serverIndex ?? 0;
      const localVarOperationServerBasePath =
        operationServerMap["GetManufacturersApi.getManufacturers"]?.[
          localVarOperationServerIndex
        ]?.url;
      return (axios, basePath) =>
        createRequestFunction(
          localVarAxiosArgs,
          globalAxios,
          BASE_PATH,
          configuration,
        )(axios, localVarOperationServerBasePath || basePath);
    },
  };
};

/**
 * GetManufacturersApi - factory interface
 * @export
 */
export const GetManufacturersApiFactory = function (
  configuration?: Configuration,
  basePath?: string,
  axios?: AxiosInstance,
) {
  const localVarFp = GetManufacturersApiFp(configuration);
  return {
    /**
     * Get Manufacturers
     * @summary Get Manufacturers
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    getManufacturers(
      options?: RawAxiosRequestConfig,
    ): AxiosPromise<GetManufacturersResponse> {
      return localVarFp
        .getManufacturers(options)
        .then((request) => request(axios, basePath));
    },
  };
};

/**
 * GetManufacturersApi - object-oriented interface
 * @export
 * @class GetManufacturersApi
 * @extends {BaseAPI}
 */
export class GetManufacturersApi extends BaseAPI {
  /**
   * Get Manufacturers
   * @summary Get Manufacturers
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof GetManufacturersApi
   */
  public getManufacturers(options?: RawAxiosRequestConfig) {
    return GetManufacturersApiFp(this.configuration)
      .getManufacturers(options)
      .then((request) => request(this.axios, this.basePath));
  }
}
