package mu.muse.usecase.access.instrument

import mu.muse.domain.instrument.InstrumentId

fun interface InstrumentRemover {
    fun removeInstrument(id: InstrumentId)
}
