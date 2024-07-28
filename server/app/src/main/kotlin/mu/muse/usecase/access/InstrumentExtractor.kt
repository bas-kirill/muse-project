package mu.muse.usecase.access

import mu.muse.domain.instrument.Country
import mu.muse.domain.instrument.Instrument
import mu.muse.domain.instrument.InstrumentId
import mu.muse.domain.instrument.InstrumentName
import mu.muse.domain.instrument.ManufacturerDate
import mu.muse.domain.instrument.ManufacturerName
import mu.muse.domain.instrument.Material
import mu.muse.domain.instrument.ReleaseDate

interface InstrumentExtractor {
    fun findAll(): Collection<Instrument>

    fun findById(id: InstrumentId): Instrument?

    fun findByCriteria(criteria: Criteria): Collection<Instrument>

    data class Criteria(
        val name: InstrumentName?,
        val types: List<Instrument.Type>?,
        val manufacturerNames: List<ManufacturerName>?,
        val manufacturerDateFrom: ManufacturerDate?,
        val manufacturerDateTo: ManufacturerDate?,
        val releaseDateFrom: ReleaseDate?,
        val releaseDateTo: ReleaseDate?,
        val countries: List<Country>?,
        val materials: List<Material>?,
    )
}
