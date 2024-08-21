package mu.muse.usecase.scenario.instrument

import mu.muse.domain.instrument.Instrument
import mu.muse.domain.instrument.InstrumentId
import mu.muse.usecase.GetInstrumentById
import mu.muse.usecase.access.instrument.InstrumentExtractor

class GetInstrumentByIdUseCase(
    private val instrumentExtractor: InstrumentExtractor,
) : GetInstrumentById {

    override fun execute(id: InstrumentId): Instrument? {
        return instrumentExtractor.findById(id)
    }
}
