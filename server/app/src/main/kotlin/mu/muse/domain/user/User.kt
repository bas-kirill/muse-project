package mu.muse.domain.user

import mu.muse.common.types.AggregateRoot
import mu.muse.common.types.Version

class User internal constructor(
    id: UserId,
    val username: Username,
    val password: Password,
    val role: Role,
    val fullName: FullName,
    version: Version,
) : AggregateRoot<UserId>(id, version) {

    companion object {
        fun create(
            id: UserId,
            username: Username,
            password: Password,
            role: Role,
            fullName: FullName,
        ): User {
            return User(
                id = id,
                username = username,
                password = password,
                role = role,
                fullName = fullName,
                version = Version.new(),
            )
        }
    }
}
