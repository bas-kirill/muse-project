package mu.muse.persistence.instrument.inmemory

import mu.muse.domain.instrument.Instrument
import mu.muse.domain.instrument.InstrumentId
import mu.muse.usecase.access.instrument.InstrumentExtractor
import mu.muse.usecase.access.instrument.InstrumentPersister
import mu.muse.usecase.access.instrument.InstrumentRemover

class InMemoryInstrumentRepository(
    private val storage: MutableMap<InstrumentId, Instrument>,
) : InstrumentExtractor, InstrumentRemover, InstrumentPersister {

    override fun findAll(): List<Instrument> {
        return storage.values.toList()
    }

    override fun findById(id: InstrumentId): Instrument? {
        return storage[id]
    }

    override fun findByIds(ids: List<InstrumentId>): List<Instrument> {
        return storage.values.filter { it.id in ids }.toMutableList()
    }

    override fun findByCriteria(criteria: InstrumentExtractor.Criteria): List<Instrument> {
        return storage.values
            .sortedBy { it.id.toLongValue() }
            .filter { instrument -> instrument matches criteria }
    }

    override fun removeInstrument(id: InstrumentId) {
        storage.remove(id)
    }

    override fun save(instrument: Instrument) {
        storage[instrument.id] = instrument
    }

    override fun totalElements(): Int = storage.values.size
}

@Suppress("CyclomaticComplexMethod")
infix fun Instrument.matches(criteria: InstrumentExtractor.Criteria): Boolean =
    (criteria.name == null || criteria.name.emptiness() || this.name.matches(criteria.name)) &&
        (criteria.types == null || this.type in criteria.types) &&
        (criteria.manufacturers == null || this.manufacturer in criteria.manufacturers) &&
        this.manufactureDate.inRangeInclusive(
            criteria.manufacturerDateFrom,
            criteria.manufacturerDateTo,
        ) &&
        this.releaseDate.inRangeInclusive(criteria.releaseDateFrom, criteria.releaseDateTo) &&
        (criteria.countries == null || this.country in criteria.countries) &&
        (criteria.materials == null || criteria.materials.containsAll(this.materials)) &&
        (criteria.instrumentIds == null || criteria.instrumentIds.contains(this.id))
