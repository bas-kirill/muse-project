package mu.muse.rest.dto

import java.util.Objects
import com.fasterxml.jackson.annotation.JsonProperty
import mu.muse.rest.dto.InstrumentDetailWithoutId
import mu.muse.rest.dto.InstrumentPhoto
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
 * @param instrumentDetail 
 * @param instrumentPhoto 
 */
data class CreateInstrumentRequestBody(

    @field:Valid
    @get:JsonProperty("instrument_detail", required = true) val instrumentDetail: InstrumentDetailWithoutId,

    @field:Valid
    @get:JsonProperty("instrument_photo", required = true) val instrumentPhoto: InstrumentPhoto
    ) {

}

