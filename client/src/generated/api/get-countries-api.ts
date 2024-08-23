/* tslint:disable */
/* eslint-disable */
/**
 * Country
 * Basic Material
 *
 * The version of the OpenAPI document: 1.0.0
 * Contact: baskirill.an@gmail.com
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */


import type { Configuration } from '../configuration';
import type { AxiosPromise, AxiosInstance, RawAxiosRequestConfig } from 'axios';
import globalAxios from 'axios';
// Some imports not used depending on template conditions
// @ts-ignore
import { DUMMY_BASE_URL, assertParamExists, setApiKeyToObject, setBasicAuthToObject, setBearerAuthToObject, setOAuthToObject, setSearchParams, serializeDataIfNeeded, toPathString, createRequestFunction } from '../common';
// @ts-ignore
import { BASE_PATH, COLLECTION_FORMATS, type RequestArgs, BaseAPI, RequiredError, operationServerMap } from '../base';
// @ts-ignore
import type { ClientError } from '../model';
// @ts-ignore
import type { GetCountriesResponse } from '../model';
// @ts-ignore
import type { ServerError } from '../model';
/**
 * GetCountriesApi - axios parameter creator
 * @export
 */
export const GetCountriesApiAxiosParamCreator = function (configuration?: Configuration) {
    return {
        /**
         * Get Countries
         * @summary Get Countries
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getCountries: async (options: RawAxiosRequestConfig = {}): Promise<RequestArgs> => {
            const localVarPath = `/countries`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'GET', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;


    
            setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
    }
};

/**
 * GetCountriesApi - functional programming interface
 * @export
 */
export const GetCountriesApiFp = function(configuration?: Configuration) {
    const localVarAxiosParamCreator = GetCountriesApiAxiosParamCreator(configuration)
    return {
        /**
         * Get Countries
         * @summary Get Countries
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async getCountries(options?: RawAxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<GetCountriesResponse>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.getCountries(options);
            const localVarOperationServerIndex = configuration?.serverIndex ?? 0;
            const localVarOperationServerBasePath = operationServerMap['GetCountriesApi.getCountries']?.[localVarOperationServerIndex]?.url;
            return (axios, basePath) => createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration)(axios, localVarOperationServerBasePath || basePath);
        },
    }
};

/**
 * GetCountriesApi - factory interface
 * @export
 */
export const GetCountriesApiFactory = function (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) {
    const localVarFp = GetCountriesApiFp(configuration)
    return {
        /**
         * Get Countries
         * @summary Get Countries
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getCountries(options?: RawAxiosRequestConfig): AxiosPromise<GetCountriesResponse> {
            return localVarFp.getCountries(options).then((request) => request(axios, basePath));
        },
    };
};

/**
 * GetCountriesApi - object-oriented interface
 * @export
 * @class GetCountriesApi
 * @extends {BaseAPI}
 */
export class GetCountriesApi extends BaseAPI {
    /**
     * Get Countries
     * @summary Get Countries
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof GetCountriesApi
     */
    public getCountries(options?: RawAxiosRequestConfig) {
        return GetCountriesApiFp(this.configuration).getCountries(options).then((request) => request(this.axios, this.basePath));
    }
}

