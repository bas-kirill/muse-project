package mu.muse.persistence.instrument

import mu.muse.domain.instrument.Instrument
import mu.muse.domain.instrument.InstrumentId
import mu.muse.usecase.access.InstrumentExtractor

class InMemoryInstrumentRepository(
    private val storage: Map<InstrumentId, Instrument>,
) : InstrumentExtractor {

    override fun findAll(): Collection<Instrument> {
        return storage.values
    }

    override fun findById(id: InstrumentId): Instrument? {
        return storage[id]
    }

    override fun findByCriteria(criteria: InstrumentExtractor.Criteria): Collection<Instrument> {
        return storage.values.sortedBy { it.id.toLongValue() }.filter { instrument ->  // @formatter:off
            (criteria.name == null || instrument.name == criteria.name) &&
            (criteria.type == null || instrument.type == criteria.type) &&
            (criteria.manufacturerName == null || instrument.manufacturerName == criteria.manufacturerName) &&
            instrument.manufactureDate.inRange(criteria.manufacturerDateFrom, criteria.manufacturerDateTo) &&
            instrument.releaseDate.inRange(criteria.releaseDateFrom, criteria.releaseDateTo) &&
            (criteria.country == null || instrument.country == criteria.country) &&
            (criteria.basicMaterials == null || instrument.materials == criteria.basicMaterials)
        } // @formatter:on
    }
}
