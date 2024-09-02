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

    @get:JsonProperty("content_size", required = true) val contentSize: kotlin.Long,

    @get:JsonProperty("page_size", required = true) val pageSize: kotlin.Long,

    @get:JsonProperty("page_number", required = true) val pageNumber: kotlin.Long,

    @get:JsonProperty("total_elements", required = true) val totalElements: kotlin.Long,

    @get:JsonProperty("total_pages", required = true) val totalPages: kotlin.Long
    ) {

}

