package mu.muse.usecase

import mu.muse.domain.instrument.Country

fun interface GetCountries {
    fun execute(): List<Country>
}
