package mu.muse.usecase

import mu.muse.domain.instrument.Country
import mu.muse.domain.instrument.Instrument
import mu.muse.domain.instrument.InstrumentName
import mu.muse.domain.instrument.InstrumentBase64Photo
import mu.muse.domain.instrument.ManufacturerDate
import mu.muse.domain.instrument.ManufacturerType
import mu.muse.domain.instrument.MaterialType
import mu.muse.domain.instrument.ReleaseDate

fun interface CreateInstrument {

    @Suppress("LongParameterList")
    fun execute(
        instrumentName: InstrumentName,
        instrumentType: Instrument.Type,
        manufacturerType: ManufacturerType,
        manufactureDate: ManufacturerDate,
        releaseDate: ReleaseDate,
        country: Country,
        materialTypes: List<MaterialType>,
        photo: InstrumentBase64Photo,
    )
}
