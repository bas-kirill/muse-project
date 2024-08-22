package mu.muse.rest.dto

import java.util.Objects
import com.fasterxml.jackson.annotation.JsonProperty
import mu.muse.rest.dto.InstrumentBasicMaterial
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
 * @param content 
 */
data class GetInstrumentBasicMaterialsResponse(

    @field:Valid
    @get:JsonProperty("content", required = true) val content: kotlin.collections.List<InstrumentBasicMaterial>
    ) {

}

