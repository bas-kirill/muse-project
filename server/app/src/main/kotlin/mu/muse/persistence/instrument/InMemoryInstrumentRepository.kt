package mu.muse.persistence.instrument

import mu.muse.domain.instrument.Instrument
import mu.muse.domain.instrument.InstrumentId
import mu.muse.usecase.access.instrument.InstrumentRemover
import mu.muse.usecase.access.instrument.InstrumentExtractor
import mu.muse.usecase.access.instrument.InstrumentPersister

class InMemoryInstrumentRepository(
    private val storage: MutableMap<InstrumentId, Instrument>,
) : InstrumentExtractor, InstrumentRemover, InstrumentPersister {

    override fun findAll(): Collection<Instrument> {
        return storage.values
    }

    override fun findById(id: InstrumentId): Instrument? {
        return storage[id]
    }

    override fun findByCriteria(criteria: InstrumentExtractor.Criteria): Collection<Instrument> {
        return storage.values
            .sortedBy { it.id.toLongValue() }
            .filter { instrument ->
                (criteria.name == null || instrument.name.matches(criteria.name)) &&
                    (criteria.types == null || instrument.type in criteria.types) &&
                    (criteria.manufacturers == null || instrument.manufacturer in criteria.manufacturers) &&
                    instrument.manufactureDate.inRangeInclusive(
                        criteria.manufacturerDateFrom,
                        criteria.manufacturerDateTo,
                    ) &&
                    instrument.releaseDate.inRangeInclusive(criteria.releaseDateFrom, criteria.releaseDateTo) &&
                    (criteria.countries == null || instrument.country in criteria.countries) &&
                    (criteria.materials == null || criteria.materials.containsAll(instrument.materials))
            }
    }

    override fun removeInstrument(id: InstrumentId) {
        storage.remove(id)
    }

    override fun save(instrument: Instrument) {
        storage[instrument.id] = instrument
    }
}
