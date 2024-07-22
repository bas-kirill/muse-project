package mu.muse.usecase.access

import mu.muse.domain.User
import mu.muse.domain.Username

interface UserExtractor {

    fun findByUsername(username: Username): User?

    fun findAll(): Collection<User>
}
