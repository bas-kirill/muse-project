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
 * @param message Error description
 * @param cause Exception stack trace
 */
data class ClientError(

    @get:JsonProperty("message", required = true) val message: kotlin.String,

    @get:JsonProperty("cause") val cause: kotlin.String? = null
    ) {

}

