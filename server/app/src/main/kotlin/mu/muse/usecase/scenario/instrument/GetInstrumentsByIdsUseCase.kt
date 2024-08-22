package mu.muse.usecase.scenario.instrument

import mu.muse.domain.instrument.Instrument
import mu.muse.domain.instrument.InstrumentId
import mu.muse.rest.dto.InstrumentDetail
import mu.muse.rest.instruments.toDto
import mu.muse.usecase.GetInstrumentsByIds
import mu.muse.usecase.access.instrument.InstrumentExtractor

class GetInstrumentsByIdsUseCase(
    private val instrumentExtractor: InstrumentExtractor,
) : GetInstrumentsByIds {

    override fun execute(ids: List<InstrumentId>): List<Instrument> {
        val instruments = instrumentExtractor.findByIds(ids)
        return instruments
    }
}
