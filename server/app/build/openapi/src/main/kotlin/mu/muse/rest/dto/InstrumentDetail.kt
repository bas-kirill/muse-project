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
 * @param id 
 * @param name 
 * @param type 
 * @param manufacturer 
 * @param manufacturerDate 
 * @param releaseDate 
 * @param country 
 * @param basicMaterials 
 */
data class InstrumentDetail(

    @get:JsonProperty("id", required = true) val id: kotlin.Long,

    @get:JsonProperty("name", required = true) val name: kotlin.String,

    @get:JsonProperty("type", required = true) val type: kotlin.String,

    @get:JsonProperty("manufacturer", required = true) val manufacturer: kotlin.String,

    @get:JsonProperty("manufacturerDate", required = true) val manufacturerDate: kotlin.String,

    @get:JsonProperty("releaseDate", required = true) val releaseDate: kotlin.String,

    @get:JsonProperty("country", required = true) val country: kotlin.String,

    @get:JsonProperty("basicMaterials", required = true) val basicMaterials: kotlin.collections.List<kotlin.String>
    ) {

}

