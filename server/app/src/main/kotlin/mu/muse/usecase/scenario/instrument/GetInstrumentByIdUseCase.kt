package mu.muse.usecase.scenario.instrument

import mu.muse.domain.instrument.InstrumentId
import mu.muse.usecase.GetInstrumentById
import mu.muse.usecase.access.instrument.InstrumentExtractor
import mu.muse.usecase.dto.InstrumentDetails

class GetInstrumentByIdUseCase(
    private val instrumentExtractor: InstrumentExtractor,
) : GetInstrumentById {

    override fun execute(id: InstrumentId): InstrumentDetails? {
        val instrument = instrumentExtractor.findById(id) ?: return null
        return InstrumentDetails.from(instrument)
    }
}
