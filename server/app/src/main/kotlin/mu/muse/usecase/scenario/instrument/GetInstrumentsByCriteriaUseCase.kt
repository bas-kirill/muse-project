package mu.muse.usecase.scenario.instrument

import mu.muse.usecase.GetInstrumentsByCriteria
import mu.muse.usecase.access.instrument.InstrumentExtractor
import mu.muse.usecase.dto.InstrumentDetails
import org.slf4j.Logger
import org.slf4j.LoggerFactory

class GetInstrumentsByCriteriaUseCase(
    private val instrumentExtractor: InstrumentExtractor,
) : GetInstrumentsByCriteria {

    companion object {
        val logger: Logger = LoggerFactory.getLogger(GetInstrumentsByCriteriaUseCase::class.java)
    }

    override fun execute(criteria: InstrumentExtractor.Criteria): Collection<InstrumentDetails> {
        val instruments = instrumentExtractor.findByCriteria(
            InstrumentExtractor.Criteria(
                name = criteria.name,
                types = criteria.types,
                manufacturers = criteria.manufacturers,
                manufacturerDateFrom = criteria.manufacturerDateFrom,
                manufacturerDateTo = criteria.manufacturerDateTo,
                releaseDateFrom = criteria.releaseDateFrom,
                releaseDateTo = criteria.releaseDateTo,
                countries = criteria.countries,
                materials = criteria.materials,
            ),
        )

        logger.info("Extracted '{}' instruments", instruments.size)

        return instruments.map { InstrumentDetails.from(it) }
    }
}
