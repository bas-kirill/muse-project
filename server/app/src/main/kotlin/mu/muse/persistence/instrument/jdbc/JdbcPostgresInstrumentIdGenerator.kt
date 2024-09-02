package mu.muse.persistence.instrument.jdbc

import mu.muse.domain.IdGenerator
import mu.muse.domain.instrument.InstrumentId
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate

class JdbcPostgresInstrumentIdGenerator(
    private val namedParameter: NamedParameterJdbcTemplate,
) : IdGenerator<InstrumentId> {

    override fun generate(): InstrumentId {
        val instrumentIdRaw = namedParameter.queryForObject(
            "select nextval('instrument_id_seq')",
            mapOf<String, Any>(),
            Long::class.java,
        )!!
        return InstrumentId.from(instrumentIdRaw)
    }
}
