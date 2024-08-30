package mu.muse.rest.dto

import java.util.Objects
import com.fasterxml.jackson.annotation.JsonProperty
import mu.muse.rest.dto.BasicMaterial
import mu.muse.rest.dto.Country
import mu.muse.rest.dto.InstrumentId
import mu.muse.rest.dto.InstrumentName
import mu.muse.rest.dto.InstrumentType
import mu.muse.rest.dto.ManufactureDate
import mu.muse.rest.dto.ManufactureType
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
 * @param instrumentId 
 * @param instrumentName 
 * @param instrumentType 
 * @param manufacturerType 
 * @param manufacturerDate 
 * @param releaseDate 
 * @param country 
 * @param basicMaterials 
 */
data class InstrumentDetail(

    @field:Valid
    @get:JsonProperty("instrument_id", required = true) val instrumentId: InstrumentId,

    @field:Valid
    @get:JsonProperty("instrument_name", required = true) val instrumentName: InstrumentName,

    @field:Valid
    @get:JsonProperty("instrument_type", required = true) val instrumentType: InstrumentType,

    @field:Valid
    @get:JsonProperty("manufacturer_type", required = true) val manufacturerType: ManufactureType,

    @field:Valid
    @get:JsonProperty("manufacturer_date", required = true) val manufacturerDate: ManufactureDate,

    @field:Valid
    @get:JsonProperty("release_date", required = true) val releaseDate: ReleaseDate,

    @field:Valid
    @get:JsonProperty("country", required = true) val country: Country,

    @field:Valid
    @get:JsonProperty("basic_materials", required = true) val basicMaterials: kotlin.collections.List<BasicMaterial>
    ) {

}

