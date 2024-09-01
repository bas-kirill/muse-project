package mu.muse.persistence.user.jooq

import mu.muse.codegen.jooq.sequences.USER_ID_SEQ
import mu.muse.domain.IdGenerator
import mu.muse.domain.user.UserId
import org.jooq.DSLContext

class JooqPostgresUserIdGenerator(
    private val dslContext: DSLContext,
) : IdGenerator<UserId> {

    override fun generate(): UserId {
        val userIdRaw = dslContext.nextval(USER_ID_SEQ)
        return UserId.from(userIdRaw)
    }

}
