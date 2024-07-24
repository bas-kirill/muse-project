package mu.muse.usecase.access

import mu.muse.domain.user.User

fun interface UserPersister {

    fun save(user: User)
}
