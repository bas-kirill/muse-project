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
 * @param instrumentType 
 * @param manufacturerName 
 * @param manufacturerDate 
 * @param releaseDate 
 * @param country 
 * @param materials 
 * @param instrumentId 
 */
data class EditInstrumentRequestBody(

    @get:JsonProperty("instrument_name", required = true) val instrumentName: kotlin.String,

    @get:JsonProperty("instrument_type", required = true) val instrumentType: kotlin.String,

    @get:JsonProperty("manufacturer_name", required = true) val manufacturerName: kotlin.String,

    @field:Valid
    @get:JsonProperty("manufacturer_date", required = true) val manufacturerDate: java.time.LocalDate,

    @field:Valid
    @get:JsonProperty("release_date", required = true) val releaseDate: java.time.LocalDate,

    @get:JsonProperty("country", required = true) val country: kotlin.String,

    @get:JsonProperty("materials", required = true) val materials: kotlin.collections.List<kotlin.String>,

    @get:JsonProperty("instrument_id") val instrumentId: kotlin.Long? = null
    ) {

}

