package mu.muse.persistence.user

import mu.muse.domain.IdGenerator
import mu.muse.domain.user.UsernameId
import java.util.concurrent.atomic.AtomicLong

class InMemoryUsernameIdGenerator : IdGenerator<UsernameId> {

    private val counter = AtomicLong(0L)

    override fun generate(): UsernameId {
        return UsernameId.from(counter.incrementAndGet())
    }
}
