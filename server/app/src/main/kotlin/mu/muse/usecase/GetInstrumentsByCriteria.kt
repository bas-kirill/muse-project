package mu.muse.usecase

import mu.muse.usecase.access.instrument.InstrumentExtractor
import mu.muse.usecase.dto.InstrumentDetails

fun interface GetInstrumentsByCriteria {
    fun execute(criteria: InstrumentExtractor.Criteria): Collection<InstrumentDetails>
}
