package mu.muse.rest.country

import mu.muse.domain.instrument.Country
import mu.muse.rest.API_COUNTRIES
import mu.muse.usecase.GetCountries
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RestController

@RestController
class GetCountriesEndpoint(
    private val getCountries: GetCountries,
) {

    @GetMapping(API_COUNTRIES)
    fun getCountries(): List<Country> {
        return getCountries.execute()
    }
}
