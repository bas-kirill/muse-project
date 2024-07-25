package mu.muse.persistence.instrument

import mu.muse.domain.instrument.Country
import mu.muse.domain.instrument.Instrument
import mu.muse.domain.instrument.InstrumentId
import mu.muse.domain.instrument.InstrumentName
import mu.muse.domain.instrument.ManufacturerName
import mu.muse.usecase.access.InstrumentExtractor
import java.time.Instant

class InMemoryInstrumentRepository(
    private val storage: Map<InstrumentId, Instrument>,
) : InstrumentExtractor {

    override fun findAll(): Collection<Instrument> {
        return storage.values
    }

    override fun findById(id: InstrumentId): Instrument? {
        return storage[id]
    }

    override fun findByCriteria(
        name: InstrumentName?,
        type: Instrument.Type?,
        manufacturerName: ManufacturerName?,
        manufacturerDateFrom: Instant?,
        manufacturerDateTo: Instant?,
        releaseDateFrom: Instant?,
        releaseDateTo: Instant?,
        country: Country?,
        basicMaterials: List<String>?
    ): Collection<Instrument> {
        return storage.values.sortedBy { it.id.toLongValue() }.filter { instrument ->  // @formatter:off
            (name == null || instrument.name == name) &&
            (type == null || instrument.type == type) &&
            (manufacturerName == null || instrument.manufacturerName == manufacturerName) &&
            (manufacturerDateFrom == null || manufacturerDateFrom.isBefore(instrument.manufactureDate)) &&
            (manufacturerDateTo == null || instrument.manufactureDate.isBefore(manufacturerDateTo)) &&
            (releaseDateFrom == null || releaseDateFrom.isBefore(instrument.releaseDate)) &&
            (releaseDateTo == null || instrument.releaseDate.isBefore(releaseDateTo)) &&
            (country == null || instrument.country == country) &&
            (basicMaterials == null || instrument.materials == basicMaterials)
        } // @formatter:on
    }

}
