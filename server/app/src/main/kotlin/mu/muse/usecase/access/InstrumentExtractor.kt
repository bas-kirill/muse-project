package mu.muse.usecase.access

import mu.muse.domain.instrument.Country
import mu.muse.domain.instrument.Instrument
import mu.muse.domain.instrument.InstrumentId
import mu.muse.domain.instrument.InstrumentName
import mu.muse.domain.instrument.ManufacturerName
import java.time.Instant

interface InstrumentExtractor {
    fun findAll(): Collection<Instrument>

    fun findById(id: InstrumentId): Instrument?

    fun findByCriteria(criteria: Criteria): Collection<Instrument>

    data class Criteria(
        val name: InstrumentName?,
        val type: Instrument.Type?,
        val manufacturerName: ManufacturerName?,
        val manufacturerDateFrom: Instant?,
        val manufacturerDateTo: Instant?,
        val releaseDateFrom: Instant?,
        val releaseDateTo: Instant?,
        val country: Country?,
        val basicMaterials: List<String>?,
    )
}
