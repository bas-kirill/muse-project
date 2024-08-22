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


// May contain unused imports in some cases
// @ts-ignore
import type { InstrumentDetail } from './instrument-detail';

/**
 * 
 * @export
 * @interface GetInstrumentByCriteriaPageResponse
 */
export interface GetInstrumentByCriteriaPageResponse {
    /**
     * 
     * @type {Array<InstrumentDetail>}
     * @memberof GetInstrumentByCriteriaPageResponse
     */
    'content'?: Array<InstrumentDetail>;
    /**
     * The number of items in the content.
     * @type {number}
     * @memberof GetInstrumentByCriteriaPageResponse
     */
    'content_size': number;
    /**
     * The number of items per page.
     * @type {number}
     * @memberof GetInstrumentByCriteriaPageResponse
     */
    'page_size': number;
    /**
     * The current page number (0-based index).
     * @type {number}
     * @memberof GetInstrumentByCriteriaPageResponse
     */
    'page_number': number;
    /**
     * The total number of elements across all pages.
     * @type {number}
     * @memberof GetInstrumentByCriteriaPageResponse
     */
    'total_elements': number;
    /**
     * The total number of pages.
     * @type {number}
     * @memberof GetInstrumentByCriteriaPageResponse
     */
    'total_pages': number;
}

