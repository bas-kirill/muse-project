package mu.muse.usecase

import mu.muse.domain.instrument.Manufacturer

fun interface GetManufacturers {
    fun execute(): List<Manufacturer>
}
