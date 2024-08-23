package mu.muse.rest.country

import mu.muse.domain.instrument.Country
import mu.muse.rest.api.GetCountriesApi
import mu.muse.rest.dto.GetCountriesResponse
import mu.muse.usecase.GetCountries
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.RestController

@RestController
class GetCountriesEndpoint(
    private val getCountries: GetCountries,
): GetCountriesApi {

    override fun getCountries(): ResponseEntity<GetCountriesResponse> {
        val countries = getCountries.execute()
        return countries.toResponse()
    }
}

fun List<Country>.toResponse(): ResponseEntity<GetCountriesResponse> {
    return ResponseEntity.ok(
        GetCountriesResponse(
            content = this.map { mu.muse.rest.dto.Country(country = it.name) },
        ),
    )
}
