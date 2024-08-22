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
 * @interface GetInstrumentCriteriaRequestBody
 */
export interface GetInstrumentCriteriaRequestBody {
  /**
   *
   * @type {string}
   * @memberof GetInstrumentCriteriaRequestBody
   */
  instrument_name?: string;
  /**
   *
   * @type {Array<string>}
   * @memberof GetInstrumentCriteriaRequestBody
   */
  instrument_types?: Array<string>;
  /**
   *
   * @type {Array<string>}
   * @memberof GetInstrumentCriteriaRequestBody
   */
  manufacturer_names?: Array<string>;
  /**
   *
   * @type {string}
   * @memberof GetInstrumentCriteriaRequestBody
   */
  manufacture_date_from?: string;
  /**
   *
   * @type {string}
   * @memberof GetInstrumentCriteriaRequestBody
   */
  manufacture_date_to?: string;
  /**
   *
   * @type {string}
   * @memberof GetInstrumentCriteriaRequestBody
   */
  release_date_from?: string;
  /**
   *
   * @type {string}
   * @memberof GetInstrumentCriteriaRequestBody
   */
  release_date_to?: string;
  /**
   *
   * @type {Array<string>}
   * @memberof GetInstrumentCriteriaRequestBody
   */
  countries?: Array<string>;
  /**
   *
   * @type {Array<string>}
   * @memberof GetInstrumentCriteriaRequestBody
   */
  materials?: Array<string>;
  /**
   *
   * @type {Array<string>}
   * @memberof GetInstrumentCriteriaRequestBody
   */
  instrument_ids?: Array<string>;
}
