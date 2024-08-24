package mu.muse.rest.dto

import java.util.Objects
import com.fasterxml.jackson.annotation.JsonProperty
import mu.muse.rest.dto.BasicMaterial
import mu.muse.rest.dto.Country
import mu.muse.rest.dto.InstrumentName
import mu.muse.rest.dto.InstrumentPhoto
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
 * @param instrumentType 
 * @param manufacturerName 
 * @param manufacturerDate 
 * @param releaseDate 
 * @param country 
 * @param materials 
 * @param image 
 */
data class CreateInstrumentRequestBody(

    @field:Valid
    @get:JsonProperty("instrument_name", required = true) val instrumentName: InstrumentName,

    @field:Valid
    @get:JsonProperty("instrument_type", required = true) val instrumentType: InstrumentType,

    @field:Valid
    @get:JsonProperty("manufacturer_name", required = true) val manufacturerName: ManufacturerName,

    @field:Valid
    @get:JsonProperty("manufacturer_date", required = true) val manufacturerDate: ManufactureDate,

    @field:Valid
    @get:JsonProperty("release_date", required = true) val releaseDate: ReleaseDate,

    @field:Valid
    @get:JsonProperty("country", required = true) val country: Country,

    @field:Valid
    @get:JsonProperty("materials", required = true) val materials: kotlin.collections.List<BasicMaterial>,

    @field:Valid
    @get:JsonProperty("image", required = true) val image: InstrumentPhoto
    ) {

}

