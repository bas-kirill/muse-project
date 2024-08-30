@file:JvmName("GetInstrumentsByCriteriaEndpointKt")

package mu.muse.rest.instruments

import mu.muse.rest.api.GetInstrumentsByCriteriaApi
import mu.muse.rest.dto.GetInstrumentsByCriteriaRequestBody
import mu.muse.rest.dto.GetInstrumentsByCriteriaResponse
import mu.muse.rest.dto.InstrumentDetail
import mu.muse.usecase.GetInstrumentsByCriteria
import org.springframework.context.MessageSource
import org.springframework.http.HttpHeaders
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.RestController
import org.springframework.web.context.request.RequestContextHolder
import org.springframework.web.context.request.ServletRequestAttributes
import java.util.Locale

@RestController
class GetInstrumentsByCriteriaEndpoint(
    private val getInstrumentsByCriteria: GetInstrumentsByCriteria,
    private val messageSource: MessageSource,
) : GetInstrumentsByCriteriaApi {

    override fun getInstrumentsByCriteria(
        request: GetInstrumentsByCriteriaRequestBody,
    ): ResponseEntity<GetInstrumentsByCriteriaResponse> {
        val criteria = request.toInstrumentCriteria()
        val instruments = getInstrumentsByCriteria.execute(criteria = criteria)
        val request = (RequestContextHolder.getRequestAttributes() as ServletRequestAttributes).request
        val locale = runCatching { Locale.of(request.getHeader(HttpHeaders.ACCEPT_LANGUAGE)) }.getOrElse { Locale.US }
        val instrumentsDto = instruments.map { it.toDto(messageSource, locale) }
        return ResponseEntity.ok(instrumentsDto.toRestResponse())
    }
}

fun List<InstrumentDetail>.toRestResponse(): GetInstrumentsByCriteriaResponse {
    return GetInstrumentsByCriteriaResponse(content = this)
}
