package mu.muse.rest.instruments

import mu.muse.domain.instrument.Instrument
import mu.muse.rest.api.GetInstrumentTypesApi
import mu.muse.rest.dto.GetInstrumentTypesResponse
import mu.muse.usecase.GetInstrumentTypes
import org.springframework.context.MessageSource
import org.springframework.http.HttpHeaders
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.RestController
import org.springframework.web.context.request.RequestContextHolder
import org.springframework.web.context.request.ServletRequestAttributes
import java.util.Locale

@RestController
class GetInstrumentTypesEndpoint(
    private val getInstrumentTypes: GetInstrumentTypes,
    private val messageSource: MessageSource,
) : GetInstrumentTypesApi {

    override fun getInstrumentTypes(): ResponseEntity<GetInstrumentTypesResponse> {
        val instrumentTypes = getInstrumentTypes.execute()
        val request = (RequestContextHolder.getRequestAttributes() as ServletRequestAttributes).request
        val locale = runCatching { Locale.of(request.getHeader(HttpHeaders.ACCEPT_LANGUAGE))}.getOrElse { Locale.US }
        return instrumentTypes.toRestResponse(messageSource, locale)
    }
}

fun List<Instrument.Type>.toRestResponse(messageSource: MessageSource, locale: Locale): ResponseEntity<GetInstrumentTypesResponse> {
    return ResponseEntity.ok(
        GetInstrumentTypesResponse(
            content = this.map { it.toDto(messageSource, locale) },
        ),
    )
}
