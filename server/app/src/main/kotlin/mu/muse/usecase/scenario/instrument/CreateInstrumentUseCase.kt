package mu.muse.usecase.scenario.instrument

import mu.muse.domain.IdGenerator
import mu.muse.domain.instrument.Country
import mu.muse.domain.instrument.Instrument
import mu.muse.domain.instrument.InstrumentId
import mu.muse.domain.instrument.InstrumentName
import mu.muse.domain.instrument.InstrumentBase64Photo
import mu.muse.domain.instrument.ManufacturerDate
import mu.muse.domain.instrument.Manufacturer
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
        manufacturer: Manufacturer,
        manufactureDate: ManufacturerDate,
        releaseDate: ReleaseDate,
        country: Country,
        materials: List<Material>,
        photo: InstrumentBase64Photo,
    ) {
        val instrument = Instrument.create(
            id = idGenerator.generate(),
            name = instrumentName,
            type = instrumentType,
            manufacturer = manufacturer,
            manufactureDate = manufactureDate,
            releaseDate = releaseDate,
            country = country,
            materials = materials,
            image = photo,
        )
        instrumentPersister.save(instrument)
    }
}
