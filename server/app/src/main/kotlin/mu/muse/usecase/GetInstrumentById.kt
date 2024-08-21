package mu.muse.usecase

import mu.muse.domain.instrument.Instrument
import mu.muse.domain.instrument.InstrumentId

fun interface GetInstrumentById {
    fun execute(id: InstrumentId): Instrument?
}
