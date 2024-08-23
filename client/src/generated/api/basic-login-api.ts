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
import type { JwtResponse } from '../model';
// @ts-ignore
import type { ServerError } from '../model';
// @ts-ignore
import type { UsernameAndPasswordRequestBody } from '../model';
/**
 * BasicLoginApi - axios parameter creator
 * @export
 */
export const BasicLoginApiAxiosParamCreator = function (configuration?: Configuration) {
    return {
        /**
         * Basic Authentication
         * @summary Basic Login
         * @param {UsernameAndPasswordRequestBody} usernameAndPasswordRequestBody 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        basicLogin: async (usernameAndPasswordRequestBody: UsernameAndPasswordRequestBody, options: RawAxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'usernameAndPasswordRequestBody' is not null or undefined
            assertParamExists('basicLogin', 'usernameAndPasswordRequestBody', usernameAndPasswordRequestBody)
            const localVarPath = `/auth/login`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'POST', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;


    
            localVarHeaderParameter['Content-Type'] = 'application/json';

            setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};
            localVarRequestOptions.data = serializeDataIfNeeded(usernameAndPasswordRequestBody, localVarRequestOptions, configuration)

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
    }
};

/**
 * BasicLoginApi - functional programming interface
 * @export
 */
export const BasicLoginApiFp = function(configuration?: Configuration) {
    const localVarAxiosParamCreator = BasicLoginApiAxiosParamCreator(configuration)
    return {
        /**
         * Basic Authentication
         * @summary Basic Login
         * @param {UsernameAndPasswordRequestBody} usernameAndPasswordRequestBody 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async basicLogin(usernameAndPasswordRequestBody: UsernameAndPasswordRequestBody, options?: RawAxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<JwtResponse>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.basicLogin(usernameAndPasswordRequestBody, options);
            const localVarOperationServerIndex = configuration?.serverIndex ?? 0;
            const localVarOperationServerBasePath = operationServerMap['BasicLoginApi.basicLogin']?.[localVarOperationServerIndex]?.url;
            return (axios, basePath) => createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration)(axios, localVarOperationServerBasePath || basePath);
        },
    }
};

/**
 * BasicLoginApi - factory interface
 * @export
 */
export const BasicLoginApiFactory = function (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) {
    const localVarFp = BasicLoginApiFp(configuration)
    return {
        /**
         * Basic Authentication
         * @summary Basic Login
         * @param {UsernameAndPasswordRequestBody} usernameAndPasswordRequestBody 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        basicLogin(usernameAndPasswordRequestBody: UsernameAndPasswordRequestBody, options?: RawAxiosRequestConfig): AxiosPromise<JwtResponse> {
            return localVarFp.basicLogin(usernameAndPasswordRequestBody, options).then((request) => request(axios, basePath));
        },
    };
};

/**
 * BasicLoginApi - object-oriented interface
 * @export
 * @class BasicLoginApi
 * @extends {BaseAPI}
 */
export class BasicLoginApi extends BaseAPI {
    /**
     * Basic Authentication
     * @summary Basic Login
     * @param {UsernameAndPasswordRequestBody} usernameAndPasswordRequestBody 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof BasicLoginApi
     */
    public basicLogin(usernameAndPasswordRequestBody: UsernameAndPasswordRequestBody, options?: RawAxiosRequestConfig) {
        return BasicLoginApiFp(this.configuration).basicLogin(usernameAndPasswordRequestBody, options).then((request) => request(this.axios, this.basePath));
    }
}

