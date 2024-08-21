package mu.muse.usecase.scenario.instrument

import mu.muse.domain.instrument.Instrument
import mu.muse.usecase.GetInstrumentsByCriteria
import mu.muse.usecase.access.instrument.InstrumentExtractor
import org.slf4j.Logger
import org.slf4j.LoggerFactory

class GetInstrumentsByCriteriaUseCase(
    private val instrumentExtractor: InstrumentExtractor,
) : GetInstrumentsByCriteria {

    companion object {
        val logger: Logger = LoggerFactory.getLogger(GetInstrumentsByCriteriaUseCase::class.java)
    }

    override fun execute(criteria: InstrumentExtractor.Criteria): List<Instrument> {
        val instruments = instrumentExtractor.findByCriteria(criteria)
        logger.info("Extracted '{}' instruments", instruments.size)
        return instruments
    }
}
