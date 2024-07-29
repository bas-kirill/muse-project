package mu.muse.usecase

import mu.muse.common.types.BusinessError
import mu.muse.domain.user.Password
import mu.muse.domain.user.Username
import mu.muse.usecase.scenario.JwtRaw

fun interface BasicLogin {
    fun execute(username: Username, password: Password): JwtRaw
}

sealed class BasicLoginError : BusinessError {
    data class UserNotFound(val username: Username) : RuntimeException("User `${username.toStringValue()}` not found")
}
