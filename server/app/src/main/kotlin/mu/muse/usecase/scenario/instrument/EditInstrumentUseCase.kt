package mu.muse.usecase.scenario.instrument

import mu.muse.domain.instrument.Country
import mu.muse.domain.instrument.Instrument
import mu.muse.domain.instrument.InstrumentId
import mu.muse.domain.instrument.InstrumentName
import mu.muse.domain.instrument.InstrumentBase64Photo
import mu.muse.domain.instrument.Manufacturer
import mu.muse.domain.instrument.ManufacturerDate
import mu.muse.domain.instrument.Material
import mu.muse.domain.instrument.ReleaseDate
import mu.muse.usecase.EditInstrument
import mu.muse.usecase.EditInstrumentError
import mu.muse.usecase.access.instrument.InstrumentExtractor
import mu.muse.usecase.access.instrument.InstrumentPersister

class EditInstrumentUseCase(
    private val instrumentExtractor: InstrumentExtractor,
    private val instrumentPersister: InstrumentPersister,
) : EditInstrument {

    @Suppress("LongParameterList")
    override fun execute(
        instrumentId: InstrumentId,
        instrumentName: InstrumentName,
        instrumentType: Instrument.Type,
        manufacturerName: Manufacturer,
        manufacturerDate: ManufacturerDate,
        releaseDate: ReleaseDate,
        country: Country,
        materials: List<Material>,
        photo: InstrumentBase64Photo,
    ) {
        // todo(unit-of-work): use unit of work pattern
        val oldInstrument = instrumentExtractor.findById(instrumentId)
            ?: throw EditInstrumentError.UserNotFound(instrumentId)

        val newInstrument = Instrument.create(
            id = oldInstrument.id,
            name = instrumentName,
            type = instrumentType,
            manufacturer = manufacturerName,
            manufactureDate = manufacturerDate,
            releaseDate = releaseDate,
            country = country,
            materials = materials,
            image = photo,
        )

        instrumentPersister.save(newInstrument)
    }
}
