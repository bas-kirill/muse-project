package mu.muse.persistence.user.inmemory

import mu.muse.domain.IdGenerator
import mu.muse.domain.user.UserId
import java.util.concurrent.atomic.AtomicLong

class InMemoryUsernameIdGenerator : IdGenerator<UserId> {

    private val counter = AtomicLong(0L)

    override fun generate(): UserId {
        return UserId.from(counter.incrementAndGet())
    }
}
