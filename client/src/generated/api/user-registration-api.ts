/* tslint:disable */
/* eslint-disable */
/**
 * Server Error
 * No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)
 *
 * The version of the OpenAPI document: 1.0.0
 * 
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
import type { RegistrationRequest } from '../model';
// @ts-ignore
import type { ServerError } from '../model';
/**
 * UserRegistrationApi - axios parameter creator
 * @export
 */
export const UserRegistrationApiAxiosParamCreator = function (configuration?: Configuration) {
    return {
        /**
         * 
         * @summary User Registration
         * @param {RegistrationRequest} registrationRequest 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        userRegistration: async (registrationRequest: RegistrationRequest, options: RawAxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'registrationRequest' is not null or undefined
            assertParamExists('userRegistration', 'registrationRequest', registrationRequest)
            const localVarPath = `/api/registration`;
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
            localVarRequestOptions.data = serializeDataIfNeeded(registrationRequest, localVarRequestOptions, configuration)

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
    }
};

/**
 * UserRegistrationApi - functional programming interface
 * @export
 */
export const UserRegistrationApiFp = function(configuration?: Configuration) {
    const localVarAxiosParamCreator = UserRegistrationApiAxiosParamCreator(configuration)
    return {
        /**
         * 
         * @summary User Registration
         * @param {RegistrationRequest} registrationRequest 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async userRegistration(registrationRequest: RegistrationRequest, options?: RawAxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<object>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.userRegistration(registrationRequest, options);
            const localVarOperationServerIndex = configuration?.serverIndex ?? 0;
            const localVarOperationServerBasePath = operationServerMap['UserRegistrationApi.userRegistration']?.[localVarOperationServerIndex]?.url;
            return (axios, basePath) => createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration)(axios, localVarOperationServerBasePath || basePath);
        },
    }
};

/**
 * UserRegistrationApi - factory interface
 * @export
 */
export const UserRegistrationApiFactory = function (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) {
    const localVarFp = UserRegistrationApiFp(configuration)
    return {
        /**
         * 
         * @summary User Registration
         * @param {RegistrationRequest} registrationRequest 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        userRegistration(registrationRequest: RegistrationRequest, options?: RawAxiosRequestConfig): AxiosPromise<object> {
            return localVarFp.userRegistration(registrationRequest, options).then((request) => request(axios, basePath));
        },
    };
};

/**
 * UserRegistrationApi - object-oriented interface
 * @export
 * @class UserRegistrationApi
 * @extends {BaseAPI}
 */
export class UserRegistrationApi extends BaseAPI {
    /**
     * 
     * @summary User Registration
     * @param {RegistrationRequest} registrationRequest 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof UserRegistrationApi
     */
    public userRegistration(registrationRequest: RegistrationRequest, options?: RawAxiosRequestConfig) {
        return UserRegistrationApiFp(this.configuration).userRegistration(registrationRequest, options).then((request) => request(this.axios, this.basePath));
    }
}

