package mu.muse.usecase

import mu.muse.domain.instrument.Country
import mu.muse.domain.instrument.Instrument
import mu.muse.domain.instrument.InstrumentName
import mu.muse.domain.instrument.InstrumentBase64Photo
import mu.muse.domain.instrument.Manufacturer
import mu.muse.domain.instrument.ManufacturerDate
import mu.muse.domain.instrument.Material
import mu.muse.domain.instrument.ReleaseDate

fun interface CreateInstrument {

    @Suppress("LongParameterList")
    fun execute(
        instrumentName: InstrumentName,
        instrumentType: Instrument.Type,
        manufacturerType: Manufacturer.Type,
        manufactureDate: ManufacturerDate,
        releaseDate: ReleaseDate,
        country: Country,
        materialTypes: List<Material.Type>,
        photo: InstrumentBase64Photo,
    )
}
