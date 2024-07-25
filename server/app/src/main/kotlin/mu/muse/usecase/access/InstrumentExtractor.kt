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


    @SuppressWarnings("kotlin:S107")
    fun findByCriteria(
        name: InstrumentName?,
        type: Instrument.Type?,
        manufacturerName: ManufacturerName?,
        manufacturerDateFrom: Instant?,
        manufacturerDateTo: Instant?,
        releaseDateFrom: Instant?,
        releaseDateTo: Instant?,
        country: Country?,
        basicMaterials: List<String>?,
    ): Collection<Instrument>
}
