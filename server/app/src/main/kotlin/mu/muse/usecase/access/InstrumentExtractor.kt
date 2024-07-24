package mu.muse.usecase.access

import mu.muse.domain.instrument.Instrument

fun interface InstrumentExtractor {
    fun findAll(): Collection<Instrument>
}
