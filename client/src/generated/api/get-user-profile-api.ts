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


import type { Configuration } from '../configuration';
import type { AxiosPromise, AxiosInstance, RawAxiosRequestConfig } from 'axios';
import globalAxios from 'axios';
// Some imports not used depending on template conditions
// @ts-ignore
import { DUMMY_BASE_URL, assertParamExists, setApiKeyToObject, setBasicAuthToObject, setBearerAuthToObject, setOAuthToObject, setSearchParams, serializeDataIfNeeded, toPathString, createRequestFunction } from '../common';
// @ts-ignore
import { BASE_PATH, COLLECTION_FORMATS, type RequestArgs, BaseAPI, RequiredError, operationServerMap } from '../base';
// @ts-ignore
import type { ProfileDetails } from '../model';
// @ts-ignore
import type { ServerError } from '../model';
/**
 * GetUserProfileApi - axios parameter creator
 * @export
 */
export const GetUserProfileApiAxiosParamCreator = function (configuration?: Configuration) {
    return {
        /**
         * Get User Profile
         * @summary Get Profile Info
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getProfile: async (options: RawAxiosRequestConfig = {}): Promise<RequestArgs> => {
            const localVarPath = `/profile`;
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
 * GetUserProfileApi - functional programming interface
 * @export
 */
export const GetUserProfileApiFp = function(configuration?: Configuration) {
    const localVarAxiosParamCreator = GetUserProfileApiAxiosParamCreator(configuration)
    return {
        /**
         * Get User Profile
         * @summary Get Profile Info
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async getProfile(options?: RawAxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<ProfileDetails>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.getProfile(options);
            const localVarOperationServerIndex = configuration?.serverIndex ?? 0;
            const localVarOperationServerBasePath = operationServerMap['GetUserProfileApi.getProfile']?.[localVarOperationServerIndex]?.url;
            return (axios, basePath) => createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration)(axios, localVarOperationServerBasePath || basePath);
        },
    }
};

/**
 * GetUserProfileApi - factory interface
 * @export
 */
export const GetUserProfileApiFactory = function (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) {
    const localVarFp = GetUserProfileApiFp(configuration)
    return {
        /**
         * Get User Profile
         * @summary Get Profile Info
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getProfile(options?: RawAxiosRequestConfig): AxiosPromise<ProfileDetails> {
            return localVarFp.getProfile(options).then((request) => request(axios, basePath));
        },
    };
};

/**
 * GetUserProfileApi - object-oriented interface
 * @export
 * @class GetUserProfileApi
 * @extends {BaseAPI}
 */
export class GetUserProfileApi extends BaseAPI {
    /**
     * Get User Profile
     * @summary Get Profile Info
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof GetUserProfileApi
     */
    public getProfile(options?: RawAxiosRequestConfig) {
        return GetUserProfileApiFp(this.configuration).getProfile(options).then((request) => request(this.axios, this.basePath));
    }
}

