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
import type { BasicMaterial } from './basic-material';
// May contain unused imports in some cases
// @ts-ignore
import type { Country } from './country';
// May contain unused imports in some cases
// @ts-ignore
import type { InstrumentId } from './instrument-id';
// May contain unused imports in some cases
// @ts-ignore
import type { InstrumentName } from './instrument-name';
// May contain unused imports in some cases
// @ts-ignore
import type { InstrumentType } from './instrument-type';
// May contain unused imports in some cases
// @ts-ignore
import type { ManufactureDate } from './manufacture-date';
// May contain unused imports in some cases
// @ts-ignore
import type { ManufacturerName } from './manufacturer-name';
// May contain unused imports in some cases
// @ts-ignore
import type { ReleaseDate } from './release-date';

/**
 * 
 * @export
 * @interface EditInstrumentRequestBody
 */
export interface EditInstrumentRequestBody {
    /**
     * 
     * @type {InstrumentId}
     * @memberof EditInstrumentRequestBody
     */
    'instrument_id': InstrumentId;
    /**
     * 
     * @type {InstrumentName}
     * @memberof EditInstrumentRequestBody
     */
    'instrument_name': InstrumentName;
    /**
     * 
     * @type {InstrumentType}
     * @memberof EditInstrumentRequestBody
     */
    'instrument_type': InstrumentType;
    /**
     * 
     * @type {ManufacturerName}
     * @memberof EditInstrumentRequestBody
     */
    'manufacturer_name': ManufacturerName;
    /**
     * 
     * @type {ManufactureDate}
     * @memberof EditInstrumentRequestBody
     */
    'manufacturer_date': ManufactureDate;
    /**
     * 
     * @type {ReleaseDate}
     * @memberof EditInstrumentRequestBody
     */
    'release_date': ReleaseDate;
    /**
     * 
     * @type {Country}
     * @memberof EditInstrumentRequestBody
     */
    'country': Country;
    /**
     * 
     * @type {Array<BasicMaterial>}
     * @memberof EditInstrumentRequestBody
     */
    'materials': Array<BasicMaterial>;
}

