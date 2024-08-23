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
import type { BasicMaterial } from "./basic-material";
// May contain unused imports in some cases
// @ts-ignore
import type { Country } from "./country";
// May contain unused imports in some cases
// @ts-ignore
import type { InstrumentName } from "./instrument-name";
// May contain unused imports in some cases
// @ts-ignore
import type { InstrumentType } from "./instrument-type";
// May contain unused imports in some cases
// @ts-ignore
import type { ManufactureDate } from "./manufacture-date";
// May contain unused imports in some cases
// @ts-ignore
import type { ManufacturerName } from "./manufacturer-name";
// May contain unused imports in some cases
// @ts-ignore
import type { ReleaseDate } from "./release-date";

/**
 *
 * @export
 * @interface CreateInstrumentRequestBody
 */
export interface CreateInstrumentRequestBody {
  /**
   *
   * @type {InstrumentName}
   * @memberof CreateInstrumentRequestBody
   */
  instrument_name: InstrumentName;
  /**
   *
   * @type {InstrumentType}
   * @memberof CreateInstrumentRequestBody
   */
  instrument_type: InstrumentType;
  /**
   *
   * @type {ManufacturerName}
   * @memberof CreateInstrumentRequestBody
   */
  manufacturer_name: ManufacturerName;
  /**
   *
   * @type {ManufactureDate}
   * @memberof CreateInstrumentRequestBody
   */
  manufacturer_date: ManufactureDate;
  /**
   *
   * @type {ReleaseDate}
   * @memberof CreateInstrumentRequestBody
   */
  release_date: ReleaseDate;
  /**
   *
   * @type {Country}
   * @memberof CreateInstrumentRequestBody
   */
  country: Country;
  /**
   *
   * @type {Array<BasicMaterial>}
   * @memberof CreateInstrumentRequestBody
   */
  materials: Array<BasicMaterial>;
}
