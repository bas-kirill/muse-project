package mu.muse.usecase.scenario

import mu.muse.usecase.GetAllInstruments
import mu.muse.usecase.access.InstrumentExtractor
import mu.muse.usecase.dto.InstrumentDetails

class GetAllInstrumentsUseCase(
    private val instrumentExtractor: InstrumentExtractor,
) : GetAllInstruments {

    override fun execute(): Collection<InstrumentDetails> {
        val instruments = instrumentExtractor.findAll()
        val instrumentDetails = instruments.map { InstrumentDetails.from(it) }
        return instrumentDetails
    }

}
