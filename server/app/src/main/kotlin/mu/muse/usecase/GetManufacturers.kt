package mu.muse.usecase

import mu.muse.domain.instrument.ManufacturerType

fun interface GetManufacturers {
    fun execute(): List<ManufacturerType>
}
