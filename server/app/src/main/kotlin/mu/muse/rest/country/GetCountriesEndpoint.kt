package mu.muse.rest.country

import mu.muse.domain.instrument.Country
import mu.muse.rest.api.GetCountriesApi
import mu.muse.rest.dto.GetCountriesResponse
import mu.muse.rest.instruments.toDto
import mu.muse.usecase.GetCountries
import org.springframework.context.MessageSource
import org.springframework.http.HttpHeaders
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.RestController
import org.springframework.web.context.request.RequestContextHolder
import org.springframework.web.context.request.ServletRequestAttributes
import java.util.Locale

@RestController
class GetCountriesEndpoint(
    private val getCountries: GetCountries,
    private val messageSource: MessageSource,
): GetCountriesApi {

    override fun getCountries(): ResponseEntity<GetCountriesResponse> {
        val countries = getCountries.execute()
        val request = (RequestContextHolder.getRequestAttributes() as ServletRequestAttributes).request
        val locale = Locale.of(request.getHeader(HttpHeaders.ACCEPT_LANGUAGE))
        return countries.toResponse(messageSource, locale)
    }
}

fun List<Country>.toResponse(messageSource: MessageSource, locale: Locale): ResponseEntity<GetCountriesResponse> {
    return ResponseEntity.ok(
        GetCountriesResponse(
            content = this.map { it.toDto(messageSource, locale) },
        ),
    )
}
