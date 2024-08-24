package mu.muse.usecase

import mu.muse.domain.instrument.Country
import mu.muse.domain.instrument.Instrument
import mu.muse.domain.instrument.InstrumentName
import mu.muse.domain.instrument.InstrumentPhoto
import mu.muse.domain.instrument.ManufacturerDate
import mu.muse.domain.instrument.Manufacturer
import mu.muse.domain.instrument.Material
import mu.muse.domain.instrument.ReleaseDate

fun interface CreateInstrument {

    @Suppress("LongParameterList")
    fun execute(
        instrumentName: InstrumentName,
        instrumentType: Instrument.Type,
        manufacturer: Manufacturer,
        manufactureDate: ManufacturerDate,
        releaseDate: ReleaseDate,
        country: Country,
        materials: List<Material>,
        photo: InstrumentPhoto,
    )
}
