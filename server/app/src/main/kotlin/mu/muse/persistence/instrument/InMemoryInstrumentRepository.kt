package mu.muse.persistence.instrument

import mu.muse.common.persistence.Page
import mu.muse.common.rest.PageRequest
import mu.muse.domain.instrument.Instrument
import mu.muse.domain.instrument.InstrumentId
import mu.muse.usecase.access.instrument.InstrumentRemover
import mu.muse.usecase.access.instrument.InstrumentExtractor
import mu.muse.usecase.access.instrument.InstrumentExtractorError
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
            .filter { instrument -> instrument matches criteria }
    }

    override fun findByCriteria(
        criteria: InstrumentExtractor.Criteria,
        pageRequest: PageRequest
    ): Page<Instrument> {
        val chunks = storage.values
            .sortedBy { it.id.toLongValue() }
            .filter { instrument -> instrument matches criteria }
            .chunked(pageRequest.pageSize)

        val pageContent = if (chunks.isEmpty()) {
            emptyList()
        } else {
            chunks.getOrNull(pageRequest.pageNumber - 1)  // page numbers indexing starting 1-based
                ?: throw InstrumentExtractorError.PageNotFound(pageNumber = pageRequest.pageNumber)
        }

        return Page(
            content = pageContent,
            contentSize = pageContent.size,
            pageSize = pageRequest.pageSize,
            pageNumber = pageRequest.pageNumber,
            totalElements = storage.values.size,
            totalPages = chunks.size,
        )
    }

    override fun removeInstrument(id: InstrumentId) {
        storage.remove(id)
    }

    override fun save(instrument: Instrument) {
        storage[instrument.id] = instrument
    }
}

private infix fun Instrument.matches(criteria: InstrumentExtractor.Criteria): Boolean {
    return (criteria.name == null || this.name.matches(criteria.name)) &&
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
}
