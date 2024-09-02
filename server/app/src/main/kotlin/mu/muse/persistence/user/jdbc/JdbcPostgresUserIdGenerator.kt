package mu.muse.persistence.user.jdbc

import mu.muse.domain.IdGenerator
import mu.muse.domain.user.UserId
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate

class JdbcPostgresUserIdGenerator(
    private val namedTemplate: NamedParameterJdbcTemplate,
) : IdGenerator<UserId> {

    override fun generate(): UserId {
        val sql = "select nextval('user_id_seq')"
        val userIdRaw = namedTemplate.queryForObject(sql, mapOf<String, Any>(), Long::class.java)!!
        return UserId.from(userIdRaw)
    }

}
