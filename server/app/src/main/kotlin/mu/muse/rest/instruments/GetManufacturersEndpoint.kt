package mu.muse.rest.instruments

import mu.muse.domain.instrument.Manufacturer
import mu.muse.rest.api.GetManufacturersApi
import mu.muse.rest.dto.GetManufacturersResponse
import mu.muse.usecase.GetManufacturers
import org.springframework.context.MessageSource
import org.springframework.http.HttpHeaders
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.RestController
import org.springframework.web.context.request.RequestContextHolder
import org.springframework.web.context.request.ServletRequestAttributes
import java.util.Locale

@RestController
class GetManufacturersEndpoint(
    private val getManufacturers: GetManufacturers,
    private val messageSource: MessageSource,
) : GetManufacturersApi {

    override fun getManufacturers(): ResponseEntity<GetManufacturersResponse> {
        val manufacturerTypes = getManufacturers.execute()
        val request = (RequestContextHolder.getRequestAttributes() as ServletRequestAttributes).request
        val locale = runCatching { Locale.of(request.getHeader(HttpHeaders.ACCEPT_LANGUAGE)) }.getOrElse { Locale.US }
        return manufacturerTypes.toRestResponse(messageSource, locale)
    }
}

fun List<Manufacturer.Type>.toRestResponse(
    messageSource: MessageSource,
    locale: Locale
): ResponseEntity<GetManufacturersResponse> {
    return ResponseEntity.ok(
        GetManufacturersResponse(
            content = this.map { it.toDto(messageSource, locale) },
        ),
    )
}
