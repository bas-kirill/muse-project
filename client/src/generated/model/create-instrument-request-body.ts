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

// May contain unused imports in some cases
// @ts-ignore
import type { InstrumentDetailWithoutId } from "./instrument-detail-without-id";
// May contain unused imports in some cases
// @ts-ignore
import type { InstrumentPhoto } from "./instrument-photo";

/**
 *
 * @export
 * @interface CreateInstrumentRequestBody
 */
export interface CreateInstrumentRequestBody {
  /**
   *
   * @type {InstrumentDetailWithoutId}
   * @memberof CreateInstrumentRequestBody
   */
  instrument_detail: InstrumentDetailWithoutId;
  /**
   *
   * @type {InstrumentPhoto}
   * @memberof CreateInstrumentRequestBody
   */
  instrument_photo: InstrumentPhoto;
}
