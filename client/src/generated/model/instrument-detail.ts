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



/**
 * 
 * @export
 * @interface InstrumentDetail
 */
export interface InstrumentDetail {
    /**
     * 
     * @type {number}
     * @memberof InstrumentDetail
     */
    'id': number;
    /**
     * 
     * @type {string}
     * @memberof InstrumentDetail
     */
    'name': string;
    /**
     * 
     * @type {string}
     * @memberof InstrumentDetail
     */
    'type': string;
    /**
     * 
     * @type {string}
     * @memberof InstrumentDetail
     */
    'manufacturer': string;
    /**
     * 
     * @type {string}
     * @memberof InstrumentDetail
     */
    'manufacturer_date'?: string;
    /**
     * 
     * @type {string}
     * @memberof InstrumentDetail
     */
    'release_date'?: string;
    /**
     * 
     * @type {string}
     * @memberof InstrumentDetail
     */
    'country': string;
    /**
     * 
     * @type {Array<string>}
     * @memberof InstrumentDetail
     */
    'basic_materials'?: Array<string>;
}

