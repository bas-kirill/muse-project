package mu.muse.usecase.access.instrument

import mu.muse.common.persistence.Page
import mu.muse.common.rest.PageRequest
import mu.muse.domain.instrument.Country
import mu.muse.domain.instrument.Instrument
import mu.muse.domain.instrument.InstrumentId
import mu.muse.domain.instrument.InstrumentName
import mu.muse.domain.instrument.Manufacturer
import mu.muse.domain.instrument.ManufacturerDate
import mu.muse.domain.instrument.Material
import mu.muse.domain.instrument.ReleaseDate

interface InstrumentExtractor {

    fun findAll(): Collection<Instrument>

    fun findById(id: InstrumentId): Instrument?

    fun findByCriteria(criteria: Criteria): Collection<Instrument>

    fun findByCriteria(criteria: Criteria, pageRequest: PageRequest): Page<Instrument>

    data class Criteria(
        val name: InstrumentName?,
        val types: List<Instrument.Type>?,
        val manufacturers: List<Manufacturer>?,
        val manufacturerDateFrom: ManufacturerDate?,
        val manufacturerDateTo: ManufacturerDate?,
        val releaseDateFrom: ReleaseDate?,
        val releaseDateTo: ReleaseDate?,
        val countries: List<Country>?,
        val materials: List<Material>?,
    )
}

sealed class InstrumentExtractorError {
    data class PageNotFound(val pageNumber: Int) : RuntimeException("Page `${pageNumber}` not found")
}
