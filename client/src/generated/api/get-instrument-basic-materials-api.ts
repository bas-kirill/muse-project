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
import type { ClientError } from '../model';
// @ts-ignore
import type { GetInstrumentBasicMaterialsResponse } from '../model';
// @ts-ignore
import type { ServerError } from '../model';
/**
 * GetInstrumentBasicMaterialsApi - axios parameter creator
 * @export
 */
export const GetInstrumentBasicMaterialsApiAxiosParamCreator = function (configuration?: Configuration) {
    return {
        /**
         * Get Instrument Basic Materials
         * @summary Get Instrument Basic Materials
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getInstrumentBasicMaterials: async (options: RawAxiosRequestConfig = {}): Promise<RequestArgs> => {
            const localVarPath = `/instrument/materials`;
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
 * GetInstrumentBasicMaterialsApi - functional programming interface
 * @export
 */
export const GetInstrumentBasicMaterialsApiFp = function(configuration?: Configuration) {
    const localVarAxiosParamCreator = GetInstrumentBasicMaterialsApiAxiosParamCreator(configuration)
    return {
        /**
         * Get Instrument Basic Materials
         * @summary Get Instrument Basic Materials
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async getInstrumentBasicMaterials(options?: RawAxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<GetInstrumentBasicMaterialsResponse>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.getInstrumentBasicMaterials(options);
            const localVarOperationServerIndex = configuration?.serverIndex ?? 0;
            const localVarOperationServerBasePath = operationServerMap['GetInstrumentBasicMaterialsApi.getInstrumentBasicMaterials']?.[localVarOperationServerIndex]?.url;
            return (axios, basePath) => createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration)(axios, localVarOperationServerBasePath || basePath);
        },
    }
};

/**
 * GetInstrumentBasicMaterialsApi - factory interface
 * @export
 */
export const GetInstrumentBasicMaterialsApiFactory = function (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) {
    const localVarFp = GetInstrumentBasicMaterialsApiFp(configuration)
    return {
        /**
         * Get Instrument Basic Materials
         * @summary Get Instrument Basic Materials
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getInstrumentBasicMaterials(options?: RawAxiosRequestConfig): AxiosPromise<GetInstrumentBasicMaterialsResponse> {
            return localVarFp.getInstrumentBasicMaterials(options).then((request) => request(axios, basePath));
        },
    };
};

/**
 * GetInstrumentBasicMaterialsApi - object-oriented interface
 * @export
 * @class GetInstrumentBasicMaterialsApi
 * @extends {BaseAPI}
 */
export class GetInstrumentBasicMaterialsApi extends BaseAPI {
    /**
     * Get Instrument Basic Materials
     * @summary Get Instrument Basic Materials
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof GetInstrumentBasicMaterialsApi
     */
    public getInstrumentBasicMaterials(options?: RawAxiosRequestConfig) {
        return GetInstrumentBasicMaterialsApiFp(this.configuration).getInstrumentBasicMaterials(options).then((request) => request(this.axios, this.basePath));
    }
}

