package mu.muse.usecase.scenario

import mu.muse.domain.instrument.Country
import mu.muse.domain.instrument.Instrument
import mu.muse.domain.instrument.InstrumentName
import mu.muse.domain.instrument.ManufacturerName
import mu.muse.usecase.GetInstrumentsByCriteria
import mu.muse.usecase.access.InstrumentExtractor
import mu.muse.usecase.dto.InstrumentDetails
import java.time.Instant

class GetInstrumentsByCriteriaUseCase(
    private val instrumentExtractor: InstrumentExtractor,
) : GetInstrumentsByCriteria {

    override fun execute(
        name: InstrumentName?,
        type: Instrument.Type?,
        manufacturerName: ManufacturerName?,
        manufacturerDateFrom: Instant?,
        manufacturerDateTo: Instant?,
        releaseDateFrom: Instant?,
        releaseDateTo: Instant?,
        country: Country?,
        basicMaterials: List<String>?
    ): Collection<InstrumentDetails> {
        val instruments = instrumentExtractor.findByCriteria(
            name = name,
            type = type,
            manufacturerName = manufacturerName,
            manufacturerDateFrom = manufacturerDateFrom,
            manufacturerDateTo = manufacturerDateTo,
            releaseDateFrom = releaseDateFrom,
            releaseDateTo = releaseDateTo,
            country = country,
            basicMaterials = basicMaterials
        )
        val instrumentDetails = instruments.map { InstrumentDetails.from(it) }
        return instrumentDetails
    }

}
