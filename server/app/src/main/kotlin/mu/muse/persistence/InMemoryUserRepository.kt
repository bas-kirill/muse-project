package mu.muse.persistence

import mu.muse.domain.User
import mu.muse.domain.Username
import mu.muse.usecase.access.UserExtractor
import mu.muse.usecase.access.UserPersister

class InMemoryUserRepository(
    private val storage: MutableMap<Username, User>,
) : UserExtractor, UserPersister {

    override fun findByUsername(username: Username): User? {
        return storage[username]
    }

    override fun findAll(): Collection<User> {
        return storage.values
    }

    override fun save(user: User) {
        storage[user.id] = user
    }
}
