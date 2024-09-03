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
 * @param localizedMessage 
 */
data class ManufactureType(

    @get:JsonProperty("i18n_code", required = true) val i18nCode: kotlin.String,

    @get:JsonProperty("localized_message") val localizedMessage: kotlin.String? = null
    ) {

}

