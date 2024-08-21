package mu.muse.usecase

import mu.muse.domain.instrument.Instrument
import mu.muse.usecase.access.instrument.InstrumentExtractor

fun interface GetInstrumentsByCriteria {
    fun execute(criteria: InstrumentExtractor.Criteria): List<Instrument>
}
