package mu.muse.persistence.instrument

import mu.muse.domain.instrument.Instrument
import mu.muse.domain.instrument.InstrumentId
import mu.muse.usecase.access.InstrumentExtractor

class InMemoryInstrumentRepository(
    private val storage: Map<InstrumentId, Instrument>,
) : InstrumentExtractor {

    override fun findAll(): Collection<Instrument> {
        return storage.values
    }

}
