package mu.muse.usecase.scenario.instrument

import mu.muse.domain.instrument.Instrument
import mu.muse.usecase.GetInstrumentTypes

class GetInstrumentTypesUseCase : GetInstrumentTypes {
    override fun execute(): List<Instrument.Type> {
        return Instrument.Type.entries
    }
}
