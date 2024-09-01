package mu.muse.persistence.instrument.jooq

import mu.muse.codegen.jooq.sequences.INSTRUMENT_ID_SEQ
import mu.muse.domain.IdGenerator
import mu.muse.domain.instrument.InstrumentId
import org.jooq.DSLContext
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate

class JooqPostgresInstrumentIdGenerator(
    private val dslContext: DSLContext,
) : IdGenerator<InstrumentId> {

    override fun generate(): InstrumentId {
        val instrumentIdRaw = dslContext.nextval(INSTRUMENT_ID_SEQ)
        return InstrumentId.from(instrumentIdRaw)
    }
}
