package mu.muse.usecase.scenario

import mu.muse.usecase.GetInstrumentsByCriteria
import mu.muse.usecase.access.InstrumentExtractor
import mu.muse.usecase.dto.InstrumentDetails

class GetInstrumentsByCriteriaUseCase(
    private val instrumentExtractor: InstrumentExtractor,
) : GetInstrumentsByCriteria {

    override fun execute(criteria: GetInstrumentsByCriteria.Criteria): Collection<InstrumentDetails> {
        val instruments = instrumentExtractor.findByCriteria(
            InstrumentExtractor.Criteria(
                name = criteria.name,
                type = criteria.type,
                manufacturerName = criteria.manufacturerName,
                manufacturerDateFrom = criteria.manufacturerDateFrom,
                manufacturerDateTo = criteria.manufacturerDateTo,
                releaseDateFrom = criteria.releaseDateFrom,
                releaseDateTo = criteria.releaseDateTo,
                country = criteria.country,
                basicMaterials = criteria.basicMaterials,
            ),
        )
        val instrumentDetails = instruments.map { InstrumentDetails.from(it) }
        return instrumentDetails
    }

}
