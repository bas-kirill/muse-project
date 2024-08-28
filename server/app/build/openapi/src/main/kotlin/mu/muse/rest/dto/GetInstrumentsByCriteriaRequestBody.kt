package mu.muse.rest.dto

import java.util.Objects
import com.fasterxml.jackson.annotation.JsonProperty
import mu.muse.rest.dto.BasicMaterial
import mu.muse.rest.dto.Country
import mu.muse.rest.dto.InstrumentId
import mu.muse.rest.dto.InstrumentName
import mu.muse.rest.dto.InstrumentType
import mu.muse.rest.dto.ManufactureDate
import mu.muse.rest.dto.ManufacturerName
import mu.muse.rest.dto.ReleaseDate
import jakarta.validation.constraints.DecimalMax
import jakarta.validation.constraints.DecimalMin
import jakarta.validation.constraints.Email
import jakarta.validation.constraints.Max
import jakarta.validation.constraints.Min
import jakarta.validation.constraints.NotNull
import jakarta.validation.constraints.Pattern
import jakarta.validation.constraints.Size
import jakarta.validation.Valid

/**
 * 
 * @param instrumentName 
 * @param instrumentTypes 
 * @param manufacturerNames 
 * @param manufactureDateFrom 
 * @param manufactureDateTo 
 * @param releaseDateFrom 
 * @param releaseDateTo 
 * @param countries 
 * @param materials 
 * @param instrumentIds 
 */
data class GetInstrumentsByCriteriaRequestBody(

    @field:Valid
    @get:JsonProperty("instrument_name") val instrumentName: InstrumentName? = null,

    @field:Valid
    @get:JsonProperty("instrument_types") val instrumentTypes: kotlin.collections.List<InstrumentType>? = null,

    @field:Valid
    @get:JsonProperty("manufacturer_names") val manufacturerNames: kotlin.collections.List<ManufacturerName>? = null,

    @field:Valid
    @get:JsonProperty("manufacture_date_from") val manufactureDateFrom: ManufactureDate? = null,

    @field:Valid
    @get:JsonProperty("manufacture_date_to") val manufactureDateTo: ManufactureDate? = null,

    @field:Valid
    @get:JsonProperty("release_date_from") val releaseDateFrom: ReleaseDate? = null,

    @field:Valid
    @get:JsonProperty("release_date_to") val releaseDateTo: ReleaseDate? = null,

    @field:Valid
    @get:JsonProperty("countries") val countries: kotlin.collections.List<Country>? = null,

    @field:Valid
    @get:JsonProperty("materials") val materials: kotlin.collections.List<BasicMaterial>? = null,

    @field:Valid
    @get:JsonProperty("instrument_ids") val instrumentIds: kotlin.collections.List<InstrumentId>? = null
    ) {

}

