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
 * @param message A description of the error
 * @param cause Exception stack trace
 */
data class ServerError(

    @get:JsonProperty("message") val message: kotlin.String? = null,

    @get:JsonProperty("cause") val cause: kotlin.String? = null
    ) {

}

