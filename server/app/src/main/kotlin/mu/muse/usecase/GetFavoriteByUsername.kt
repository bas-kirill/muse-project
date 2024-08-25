package mu.muse.usecase

import mu.muse.common.types.BusinessError
import mu.muse.domain.instrument.Instrument
import mu.muse.domain.user.Username

fun interface GetFavoriteByUsername {
    fun execute(username: Username): List<Instrument>
}

sealed class GetUserFavoriteError : BusinessError {
    data class UserNotFound(val username: Username) : ServerException("Username not found: `$username`")
}



