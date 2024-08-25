package mu.muse.usecase

import mu.muse.common.rest.ServerException
import mu.muse.common.types.BusinessError
import mu.muse.domain.user.User
import mu.muse.domain.user.Username

fun interface GetUser {
    fun execute(username: Username): User
}

sealed class ShowProfileError : BusinessError {
    data class UserNotFound(val username: Username) : ServerException("User `${username.toStringValue()}` not found")
}
