package mu.muse.usecase.access.user

import mu.muse.domain.user.User

fun interface UserPersister {

    fun save(user: User)
}
