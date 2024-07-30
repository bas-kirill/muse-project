package mu.muse.rest.country

import jakarta.annotation.security.RolesAllowed
import mu.muse.domain.instrument.Country
import mu.muse.domain.user.Role
import mu.muse.rest.API_COUNTRIES
import mu.muse.usecase.GetCountries
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RestController

@RestController
class GetCountriesEndpoint(
    private val getCountries: GetCountries,
) {

    @RolesAllowed(Role.EDITOR)
    @GetMapping(API_COUNTRIES)
    fun getCountries(): List<Country> {
        return getCountries.execute()
    }
}
