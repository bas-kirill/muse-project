package mu.muse.usecase.access

import mu.muse.domain.instrument.Instrument
import mu.muse.domain.instrument.InstrumentId

interface InstrumentExtractor {
    fun findAll(): Collection<Instrument>

    fun findById(id: InstrumentId): Instrument?
}
