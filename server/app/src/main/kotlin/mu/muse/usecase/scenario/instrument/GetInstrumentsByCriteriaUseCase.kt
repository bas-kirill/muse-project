package mu.muse.usecase.scenario.instrument

import mu.muse.usecase.GetInstrumentsByCriteria
import mu.muse.usecase.access.instrument.InstrumentExtractor
import mu.muse.usecase.dto.InstrumentDetails
import org.slf4j.LoggerFactory


class GetInstrumentsByCriteriaUseCase(
    private val instrumentExtractor: InstrumentExtractor,
) : GetInstrumentsByCriteria {

    companion object  {
        val logger = LoggerFactory.getLogger(GetInstrumentByIdUseCase::class.java)
    }

    override fun execute(criteria: GetInstrumentsByCriteria.Criteria): Collection<InstrumentDetails> {
        val instruments = instrumentExtractor.findByCriteria(
            InstrumentExtractor.Criteria(
                name = criteria.instrumentName,
                types = criteria.instrumentTypes,
                manufacturerNames = criteria.manufacturerNames,
                manufacturerDateFrom = criteria.manufacturerDateFrom,
                manufacturerDateTo = criteria.manufacturerDateTo,
                releaseDateFrom = criteria.releaseDateFrom,
                releaseDateTo = criteria.releaseDateTo,
                countries = criteria.countries,
                materials = criteria.materials,
            ),
        )

        logger.info("Extracted '{}' instruments", instruments.size)

        val instrumentDetails = instruments.map { InstrumentDetails.from(it) }
        return instrumentDetails
    }

}
