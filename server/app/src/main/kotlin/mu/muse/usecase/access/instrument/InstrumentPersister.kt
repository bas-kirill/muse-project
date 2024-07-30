package mu.muse.usecase.access.instrument

import mu.muse.domain.instrument.Instrument

fun interface InstrumentPersister {
    fun save(instrument: Instrument)
}
