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
 * @param username 
 * @param role 
 * @param fullName 
 */
data class ProfileDetailsResponse(

    @get:JsonProperty("username", required = true) val username: kotlin.String,

    @get:JsonProperty("role", required = true) val role: kotlin.String,

    @get:JsonProperty("full_name", required = true) val fullName: kotlin.String
    ) {

}

