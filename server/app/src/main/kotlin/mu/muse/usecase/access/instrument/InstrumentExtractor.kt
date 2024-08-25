package mu.muse.usecase.access.instrument

import mu.muse.usecase.ServerException
import mu.muse.domain.instrument.Country
import mu.muse.domain.instrument.Instrument
import mu.muse.domain.instrument.InstrumentId
import mu.muse.domain.instrument.InstrumentName
import mu.muse.domain.instrument.ManufacturerType
import mu.muse.domain.instrument.ManufacturerDate
import mu.muse.domain.instrument.MaterialType
import mu.muse.domain.instrument.ReleaseDate

interface InstrumentExtractor {

    fun findAll(): List<Instrument>

    fun findById(id: InstrumentId): Instrument?

    fun findByIds(ids: List<InstrumentId>): List<Instrument>

    fun findByCriteria(criteria: Criteria): List<Instrument>

    fun totalElements(): Long

    data class Criteria(
        val name: InstrumentName?,
        val types: List<Instrument.Type>?,
        val manufacturerTypes: List<ManufacturerType>?,
        val manufacturerDateFrom: ManufacturerDate?,
        val manufacturerDateTo: ManufacturerDate?,
        val releaseDateFrom: ReleaseDate?,
        val releaseDateTo: ReleaseDate?,
        val countries: List<Country>?,
        val materialTypes: List<MaterialType>?,
        val instrumentIds: List<InstrumentId>?,
    )
}

sealed class InstrumentExtractorError {
    data class PageNotFound(val pageNumber: Int) : ServerException("Page `${pageNumber}` not found")
}
