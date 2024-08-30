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
import type { InstrumentId } from "./instrument-id";
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
import type { ManufactureType } from "./manufacture-type";
// May contain unused imports in some cases
// @ts-ignore
import type { ReleaseDate } from "./release-date";

/**
 *
 * @export
 * @interface InstrumentDetail
 */
export interface InstrumentDetail {
  /**
   *
   * @type {InstrumentId}
   * @memberof InstrumentDetail
   */
  instrument_id: InstrumentId;
  /**
   *
   * @type {InstrumentName}
   * @memberof InstrumentDetail
   */
  instrument_name: InstrumentName;
  /**
   *
   * @type {InstrumentType}
   * @memberof InstrumentDetail
   */
  instrument_type: InstrumentType;
  /**
   *
   * @type {ManufactureType}
   * @memberof InstrumentDetail
   */
  manufacturer_type: ManufactureType;
  /**
   *
   * @type {ManufactureDate}
   * @memberof InstrumentDetail
   */
  manufacturer_date: ManufactureDate;
  /**
   *
   * @type {ReleaseDate}
   * @memberof InstrumentDetail
   */
  release_date: ReleaseDate;
  /**
   *
   * @type {Country}
   * @memberof InstrumentDetail
   */
  country: Country;
  /**
   *
   * @type {Array<BasicMaterial>}
   * @memberof InstrumentDetail
   */
  basic_materials: Array<BasicMaterial>;
}
