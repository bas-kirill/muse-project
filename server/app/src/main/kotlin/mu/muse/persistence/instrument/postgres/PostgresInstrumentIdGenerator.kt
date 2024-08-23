package mu.muse.persistence.instrument.postgres

import mu.muse.domain.IdGenerator
import mu.muse.domain.instrument.InstrumentId
import org.springframework.jdbc.support.GeneratedKeyHolder

class PostgresInstrumentIdGenerator : IdGenerator<InstrumentId> {
    private val keyHolder = GeneratedKeyHolder()

    override fun generate(): InstrumentId {
        return InstrumentId.from(keyHolder.key!!.toString())
    }
}
