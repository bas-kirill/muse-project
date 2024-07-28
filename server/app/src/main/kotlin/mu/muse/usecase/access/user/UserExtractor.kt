package mu.muse.usecase.access.user

import mu.muse.domain.user.User
import mu.muse.domain.user.Username

interface UserExtractor {

    fun findByUsername(username: Username): User?

    fun findAll(): Collection<User>
}
