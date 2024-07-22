package mu.muse.usecase.access

import mu.muse.domain.User

fun interface UserPersister {

    fun save(user: User)
}
