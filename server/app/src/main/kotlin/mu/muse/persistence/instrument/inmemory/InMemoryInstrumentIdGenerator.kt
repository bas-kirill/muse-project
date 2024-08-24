package mu.muse.persistence.instrument.inmemory

import mu.muse.domain.IdGenerator
import mu.muse.domain.instrument.InstrumentId
import java.util.concurrent.atomic.AtomicLong

class InMemoryInstrumentIdGenerator : IdGenerator<InstrumentId> {

    private val counter = AtomicLong(0L)

    override fun generate(): InstrumentId {
        return InstrumentId(counter.incrementAndGet())
    }
}
