package mu.muse.usecase

import mu.muse.domain.instrument.Country
import mu.muse.domain.instrument.Instrument
import mu.muse.domain.instrument.InstrumentName
import mu.muse.domain.instrument.ManufacturerName
import mu.muse.usecase.dto.InstrumentDetails
import java.time.Instant

fun interface GetInstrumentsByCriteria {

    fun execute(criteria: Criteria): Collection<InstrumentDetails>

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
