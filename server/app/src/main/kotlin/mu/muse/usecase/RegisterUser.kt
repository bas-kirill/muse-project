package mu.muse.usecase

import mu.muse.common.types.BusinessError
import mu.muse.domain.user.FullName
import mu.muse.domain.user.Password
import mu.muse.domain.user.Username

fun interface RegisterUser {
    fun execute(fullName: FullName, username: Username, password: Password)
}

sealed class RegisterUserError : BusinessError {
    data class AlreadyRegistered(val username: Username) :
        RuntimeException("Username `${username.toStringValue()}` already registered")
}
