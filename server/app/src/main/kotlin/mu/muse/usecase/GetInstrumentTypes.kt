package mu.muse.usecase

import mu.muse.domain.instrument.Instrument

fun interface GetInstrumentTypes {
    fun execute(): List<Instrument.Type>
}
