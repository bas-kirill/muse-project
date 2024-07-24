package mu.muse.usecase

import mu.muse.common.types.BusinessError
import mu.muse.domain.Jwt
import mu.muse.domain.user.Password
import mu.muse.domain.user.Username

fun interface BasicLogin {
    fun execute(username: Username, password: Password): Jwt
}

sealed class BasicLoginError : BusinessError {
    data class UserNotFound(val username: Username) : RuntimeException("User `${username.toStringValue()}` not found")
}
