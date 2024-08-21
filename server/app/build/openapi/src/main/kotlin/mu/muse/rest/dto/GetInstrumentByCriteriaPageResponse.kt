package mu.muse.rest.dto

import java.util.Objects
import com.fasterxml.jackson.annotation.JsonProperty
import mu.muse.rest.dto.InstrumentDetail
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
 * @param contentSize The number of items in the content.
 * @param pageSize The number of items per page.
 * @param pageNumber The current page number (0-based index).
 * @param totalElements The total number of elements across all pages.
 * @param totalPages The total number of pages.
 */
data class GetInstrumentByCriteriaPageResponse(

    @field:Valid
    @get:JsonProperty("content", required = true) val content: kotlin.collections.List<InstrumentDetail>,

    @get:JsonProperty("contentSize", required = true) val contentSize: kotlin.Int,

    @get:JsonProperty("pageSize", required = true) val pageSize: kotlin.Int,

    @get:JsonProperty("pageNumber", required = true) val pageNumber: kotlin.Int,

    @get:JsonProperty("totalElements", required = true) val totalElements: kotlin.Int,

    @get:JsonProperty("totalPages", required = true) val totalPages: kotlin.Int
    ) {

}

