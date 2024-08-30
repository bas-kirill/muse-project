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
 * @param i18nCode 
 * @param localizedText 
 */
data class InstrumentType(

    @get:JsonProperty("i18n_code", required = true) val i18nCode: kotlin.String,

    @get:JsonProperty("localized_text") val localizedText: kotlin.String? = null
    ) {

}

