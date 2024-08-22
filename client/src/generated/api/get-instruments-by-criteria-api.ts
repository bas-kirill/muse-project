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
import type { GetInstrumentCriteriaRequestBody } from '../model';
// @ts-ignore
import type { GetInstrumentsByCriteriaResponse } from '../model';
// @ts-ignore
import type { ServerError } from '../model';
/**
 * GetInstrumentsByCriteriaApi - axios parameter creator
 * @export
 */
export const GetInstrumentsByCriteriaApiAxiosParamCreator = function (configuration?: Configuration) {
    return {
        /**
         * 
         * @summary Get Instruments by Criteria
         * @param {GetInstrumentCriteriaRequestBody} getInstrumentCriteriaRequestBody 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getInstrumentsByCriteria: async (getInstrumentCriteriaRequestBody: GetInstrumentCriteriaRequestBody, options: RawAxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'getInstrumentCriteriaRequestBody' is not null or undefined
            assertParamExists('getInstrumentsByCriteria', 'getInstrumentCriteriaRequestBody', getInstrumentCriteriaRequestBody)
            const localVarPath = `/api/instruments`;
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
            localVarRequestOptions.data = serializeDataIfNeeded(getInstrumentCriteriaRequestBody, localVarRequestOptions, configuration)

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
    }
};

/**
 * GetInstrumentsByCriteriaApi - functional programming interface
 * @export
 */
export const GetInstrumentsByCriteriaApiFp = function(configuration?: Configuration) {
    const localVarAxiosParamCreator = GetInstrumentsByCriteriaApiAxiosParamCreator(configuration)
    return {
        /**
         * 
         * @summary Get Instruments by Criteria
         * @param {GetInstrumentCriteriaRequestBody} getInstrumentCriteriaRequestBody 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async getInstrumentsByCriteria(getInstrumentCriteriaRequestBody: GetInstrumentCriteriaRequestBody, options?: RawAxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<GetInstrumentsByCriteriaResponse>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.getInstrumentsByCriteria(getInstrumentCriteriaRequestBody, options);
            const localVarOperationServerIndex = configuration?.serverIndex ?? 0;
            const localVarOperationServerBasePath = operationServerMap['GetInstrumentsByCriteriaApi.getInstrumentsByCriteria']?.[localVarOperationServerIndex]?.url;
            return (axios, basePath) => createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration)(axios, localVarOperationServerBasePath || basePath);
        },
    }
};

/**
 * GetInstrumentsByCriteriaApi - factory interface
 * @export
 */
export const GetInstrumentsByCriteriaApiFactory = function (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) {
    const localVarFp = GetInstrumentsByCriteriaApiFp(configuration)
    return {
        /**
         * 
         * @summary Get Instruments by Criteria
         * @param {GetInstrumentCriteriaRequestBody} getInstrumentCriteriaRequestBody 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getInstrumentsByCriteria(getInstrumentCriteriaRequestBody: GetInstrumentCriteriaRequestBody, options?: RawAxiosRequestConfig): AxiosPromise<GetInstrumentsByCriteriaResponse> {
            return localVarFp.getInstrumentsByCriteria(getInstrumentCriteriaRequestBody, options).then((request) => request(axios, basePath));
        },
    };
};

/**
 * GetInstrumentsByCriteriaApi - object-oriented interface
 * @export
 * @class GetInstrumentsByCriteriaApi
 * @extends {BaseAPI}
 */
export class GetInstrumentsByCriteriaApi extends BaseAPI {
    /**
     * 
     * @summary Get Instruments by Criteria
     * @param {GetInstrumentCriteriaRequestBody} getInstrumentCriteriaRequestBody 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof GetInstrumentsByCriteriaApi
     */
    public getInstrumentsByCriteria(getInstrumentCriteriaRequestBody: GetInstrumentCriteriaRequestBody, options?: RawAxiosRequestConfig) {
        return GetInstrumentsByCriteriaApiFp(this.configuration).getInstrumentsByCriteria(getInstrumentCriteriaRequestBody, options).then((request) => request(this.axios, this.basePath));
    }
}

