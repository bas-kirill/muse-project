package mu.muse.usecase

import mu.muse.domain.instrument.Country
import mu.muse.domain.instrument.Instrument
import mu.muse.domain.instrument.InstrumentName
import mu.muse.domain.instrument.ManufacturerDate
import mu.muse.domain.instrument.ManufacturerName
import mu.muse.domain.instrument.Material
import mu.muse.domain.instrument.ReleaseDate

fun interface CreateInstrument {

    @Suppress("LongParameterList")
    fun execute(
        instrumentName: InstrumentName,
        instrumentType: Instrument.Type,
        manufacturerName: ManufacturerName,
        manufactureDate: ManufacturerDate,
        releaseDate: ReleaseDate,
        country: Country,
        material: Material
    )
}
