package mu.muse.usecase.scenario

import mu.muse.domain.instrument.InstrumentId
import mu.muse.usecase.DeleteInstrumentById
import mu.muse.usecase.access.instrument.InstrumentRemover

class DeleteInstrumentByIdUseCase(
    private val storage: InstrumentRemover,
) : DeleteInstrumentById {

    override fun execute(id: InstrumentId) {
        storage.removeInstrument(id)
    }
}
