package mu.muse.rest.dto

import java.util.Objects
import com.fasterxml.jackson.annotation.JsonProperty
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
data class GetInstrumentCriteriaRequestBody(

    @get:JsonProperty("instrument_name") val instrumentName: kotlin.String? = null,

    @get:JsonProperty("instrument_types") val instrumentTypes: kotlin.collections.List<kotlin.String>? = null,

    @get:JsonProperty("manufacturer_names") val manufacturerNames: kotlin.collections.List<kotlin.String>? = null,

    @field:Valid
    @get:JsonProperty("manufacture_date_from") val manufactureDateFrom: java.time.LocalDate? = null,

    @field:Valid
    @get:JsonProperty("manufacture_date_to") val manufactureDateTo: java.time.LocalDate? = null,

    @field:Valid
    @get:JsonProperty("release_date_from") val releaseDateFrom: java.time.LocalDate? = null,

    @field:Valid
    @get:JsonProperty("release_date_to") val releaseDateTo: java.time.LocalDate? = null,

    @get:JsonProperty("countries") val countries: kotlin.collections.List<kotlin.String>? = null,

    @get:JsonProperty("materials") val materials: kotlin.collections.List<kotlin.String>? = null,

    @get:JsonProperty("instrument_ids") val instrumentIds: kotlin.collections.List<kotlin.String>? = null
    ) {

}

