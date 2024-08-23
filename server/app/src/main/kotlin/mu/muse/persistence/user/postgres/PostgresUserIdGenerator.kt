package mu.muse.persistence.user.postgres

import mu.muse.domain.IdGenerator
import mu.muse.domain.user.UserId
import org.springframework.jdbc.support.GeneratedKeyHolder

class PostgresUserIdGenerator : IdGenerator<UserId> {
    private val keyHolder = GeneratedKeyHolder()

    override fun generate(): UserId {
        return UserId.from(keyHolder.key!!.toLong())
    }

}
