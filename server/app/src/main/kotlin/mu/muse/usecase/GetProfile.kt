package mu.muse.usecase

import mu.muse.common.types.BusinessError
import mu.muse.domain.user.Username
import mu.muse.usecase.dto.ProfileDetails

fun interface GetProfile {
    fun execute(username: Username): ProfileDetails
}

sealed class ShowProfileError : BusinessError {
    data class UserNotFound(val username: Username) : RuntimeException("User `${username.toStringValue()}` not found")
}
