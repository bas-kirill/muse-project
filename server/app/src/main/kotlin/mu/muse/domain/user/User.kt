package mu.muse.domain.user

import mu.muse.common.types.AggregateRoot
import mu.muse.common.types.Version
import mu.muse.domain.IdGenerator

typealias FullName = String

class User internal constructor(
    id: UsernameId,
    val username: Username,
    val password: Password,
    val role: Role,
    val fullName: FullName,
    version: Version,
) : AggregateRoot<UsernameId>(id, version) {

    companion object {
        fun create(
            idGenerator: IdGenerator<UsernameId>,
            username: Username,
            password: Password,
            role: Role,
            fullName: FullName,
        ): User {
            return User(
                id = idGenerator.generate(),
                username = username,
                password = password,
                role = role,
                fullName = fullName,
                version = Version.new(),
            )
        }
    }
}
