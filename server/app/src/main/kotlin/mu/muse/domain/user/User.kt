package mu.muse.domain.user

import mu.muse.common.types.AggregateRoot
import mu.muse.common.types.Version
import mu.muse.domain.instrument.InstrumentId

class User internal constructor(
    id: UserId,
    val username: Username,
    val password: Password,
    val role: Role,
    val fullName: FullName,
    val favoriteIds: MutableList<InstrumentId>,
    version: Version,
) : AggregateRoot<UserId>(id, version) {

    companion object {
        fun create(
            id: UserId,
            username: Username,
            password: Password,
            role: Role,
            fullName: FullName,
            favoriteIds: MutableList<InstrumentId>,
        ): User {
            return User(
                id = id,
                username = username,
                password = password,
                role = role,
                fullName = fullName,
                favoriteIds = favoriteIds,
                version = Version.new(),
            )
        }
    }
}
