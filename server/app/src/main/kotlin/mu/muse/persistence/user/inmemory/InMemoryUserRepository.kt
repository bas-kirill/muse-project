package mu.muse.persistence.user.inmemory

import mu.muse.domain.user.User
import mu.muse.domain.user.Username
import mu.muse.usecase.access.user.UserExtractor
import mu.muse.usecase.access.user.UserPersister

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
        storage[user.username] = user
    }
}
