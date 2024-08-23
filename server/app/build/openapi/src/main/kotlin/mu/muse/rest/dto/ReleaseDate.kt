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
 * @param releaseDate 
 */
data class ReleaseDate(

    @field:Valid
    @get:JsonProperty("release_date", required = true) val releaseDate: java.time.LocalDate
    ) {

}

