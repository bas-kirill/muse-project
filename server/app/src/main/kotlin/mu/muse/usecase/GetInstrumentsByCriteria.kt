package mu.muse.usecase

import mu.muse.domain.instrument.Country
import mu.muse.domain.instrument.Instrument
import mu.muse.domain.instrument.InstrumentName
import mu.muse.domain.instrument.ManufacturerName
import mu.muse.usecase.dto.InstrumentDetails
import java.time.Instant

fun interface GetInstrumentsByCriteria {

    @SuppressWarnings("kotlin:S107")
    fun execute(
        name: InstrumentName?,
        type: Instrument.Type?,
        manufacturerName: ManufacturerName?,
        manufacturerDateFrom: Instant?,
        manufacturerDateTo: Instant?,
        releaseDateFrom: Instant?,
        releaseDateTo: Instant?,
        country: Country?,
        basicMaterials: List<String>?
    ): Collection<InstrumentDetails>
}
