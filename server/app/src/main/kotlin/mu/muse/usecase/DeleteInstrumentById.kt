package mu.muse.usecase

import mu.muse.domain.instrument.InstrumentId

fun interface DeleteInstrumentById {
    fun execute(id: InstrumentId)
}
