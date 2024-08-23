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
import type { GetInstrumentTypesResponse } from '../model';
// @ts-ignore
import type { ServerError } from '../model';
/**
 * GetInstrumentTypesApi - axios parameter creator
 * @export
 */
export const GetInstrumentTypesApiAxiosParamCreator = function (configuration?: Configuration) {
    return {
        /**
         * Get Instrument Types
         * @summary Get Instrument Types
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getInstrumentTypes: async (options: RawAxiosRequestConfig = {}): Promise<RequestArgs> => {
            const localVarPath = `/instrument/types`;
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
 * GetInstrumentTypesApi - functional programming interface
 * @export
 */
export const GetInstrumentTypesApiFp = function(configuration?: Configuration) {
    const localVarAxiosParamCreator = GetInstrumentTypesApiAxiosParamCreator(configuration)
    return {
        /**
         * Get Instrument Types
         * @summary Get Instrument Types
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async getInstrumentTypes(options?: RawAxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<GetInstrumentTypesResponse>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.getInstrumentTypes(options);
            const localVarOperationServerIndex = configuration?.serverIndex ?? 0;
            const localVarOperationServerBasePath = operationServerMap['GetInstrumentTypesApi.getInstrumentTypes']?.[localVarOperationServerIndex]?.url;
            return (axios, basePath) => createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration)(axios, localVarOperationServerBasePath || basePath);
        },
    }
};

/**
 * GetInstrumentTypesApi - factory interface
 * @export
 */
export const GetInstrumentTypesApiFactory = function (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) {
    const localVarFp = GetInstrumentTypesApiFp(configuration)
    return {
        /**
         * Get Instrument Types
         * @summary Get Instrument Types
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getInstrumentTypes(options?: RawAxiosRequestConfig): AxiosPromise<GetInstrumentTypesResponse> {
            return localVarFp.getInstrumentTypes(options).then((request) => request(axios, basePath));
        },
    };
};

/**
 * GetInstrumentTypesApi - object-oriented interface
 * @export
 * @class GetInstrumentTypesApi
 * @extends {BaseAPI}
 */
export class GetInstrumentTypesApi extends BaseAPI {
    /**
     * Get Instrument Types
     * @summary Get Instrument Types
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof GetInstrumentTypesApi
     */
    public getInstrumentTypes(options?: RawAxiosRequestConfig) {
        return GetInstrumentTypesApiFp(this.configuration).getInstrumentTypes(options).then((request) => request(this.axios, this.basePath));
    }
}

