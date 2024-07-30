package mu.muse.usecase.scenario.country

import mu.muse.domain.instrument.Country
import mu.muse.usecase.GetCountries

class GetCountriesUseCase : GetCountries {
    override fun execute(): List<Country> {
        return Country.entries
    }
}
