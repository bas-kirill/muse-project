package mu.muse.usecase

import mu.muse.common.types.BusinessError
import mu.muse.domain.user.User
import mu.muse.domain.user.Username

fun interface GetProfile {
    fun execute(username: Username): User
}

sealed class ShowProfileError : BusinessError {
    data class UserNotFound(val username: Username) : RuntimeException("User `${username.toStringValue()}` not found")
}
