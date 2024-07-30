package mu.muse.usecase.scenario.instrument

import mu.muse.domain.IdGenerator
import mu.muse.domain.instrument.Country
import mu.muse.domain.instrument.Instrument
import mu.muse.domain.instrument.InstrumentId
import mu.muse.domain.instrument.InstrumentName
import mu.muse.domain.instrument.ManufacturerDate
import mu.muse.domain.instrument.ManufacturerName
import mu.muse.domain.instrument.Material
import mu.muse.domain.instrument.ReleaseDate
import mu.muse.usecase.CreateInstrument
import mu.muse.usecase.access.instrument.InstrumentPersister

class CreateInstrumentUseCase(
    private val idGenerator: IdGenerator<InstrumentId>,
    private val instrumentPersister: InstrumentPersister,
) : CreateInstrument {
    override fun execute(
        instrumentName: InstrumentName,
        instrumentType: Instrument.Type,
        manufacturerName: ManufacturerName,
        manufactureDate: ManufacturerDate,
        releaseDate: ReleaseDate,
        country: Country,
        material: Material
    ) {
        val instrument = Instrument.create(
            idGenerator = idGenerator,
            name = instrumentName,
            type = instrumentType,
            manufacturerName = manufacturerName,
            manufactureDate = manufactureDate,
            releaseDate = releaseDate,
            country = country,
            materials = listOf(material),
        )
        instrumentPersister.save(instrument)
    }
}
