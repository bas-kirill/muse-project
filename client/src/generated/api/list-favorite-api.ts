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
import type { ListFavoriteResponseBody } from '../model';
// @ts-ignore
import type { ServerError } from '../model';
/**
 * ListFavoriteApi - axios parameter creator
 * @export
 */
export const ListFavoriteApiAxiosParamCreator = function (configuration?: Configuration) {
    return {
        /**
         * List Favorite
         * @summary List Favorite
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        listFavorite: async (options: RawAxiosRequestConfig = {}): Promise<RequestArgs> => {
            const localVarPath = `/favorite/list`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'POST', ...baseOptions, ...options};
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
 * ListFavoriteApi - functional programming interface
 * @export
 */
export const ListFavoriteApiFp = function(configuration?: Configuration) {
    const localVarAxiosParamCreator = ListFavoriteApiAxiosParamCreator(configuration)
    return {
        /**
         * List Favorite
         * @summary List Favorite
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async listFavorite(options?: RawAxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<ListFavoriteResponseBody>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.listFavorite(options);
            const localVarOperationServerIndex = configuration?.serverIndex ?? 0;
            const localVarOperationServerBasePath = operationServerMap['ListFavoriteApi.listFavorite']?.[localVarOperationServerIndex]?.url;
            return (axios, basePath) => createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration)(axios, localVarOperationServerBasePath || basePath);
        },
    }
};

/**
 * ListFavoriteApi - factory interface
 * @export
 */
export const ListFavoriteApiFactory = function (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) {
    const localVarFp = ListFavoriteApiFp(configuration)
    return {
        /**
         * List Favorite
         * @summary List Favorite
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        listFavorite(options?: RawAxiosRequestConfig): AxiosPromise<ListFavoriteResponseBody> {
            return localVarFp.listFavorite(options).then((request) => request(axios, basePath));
        },
    };
};

/**
 * ListFavoriteApi - object-oriented interface
 * @export
 * @class ListFavoriteApi
 * @extends {BaseAPI}
 */
export class ListFavoriteApi extends BaseAPI {
    /**
     * List Favorite
     * @summary List Favorite
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof ListFavoriteApi
     */
    public listFavorite(options?: RawAxiosRequestConfig) {
        return ListFavoriteApiFp(this.configuration).listFavorite(options).then((request) => request(this.axios, this.basePath));
    }
}

