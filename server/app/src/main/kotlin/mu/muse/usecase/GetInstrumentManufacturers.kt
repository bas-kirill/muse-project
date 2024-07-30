package mu.muse.usecase

import mu.muse.domain.instrument.Manufacturer

fun interface GetInstrumentManufacturers {
    fun execute(): List<Manufacturer>
}
