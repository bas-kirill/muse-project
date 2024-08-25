package mu.muse.usecase

import mu.muse.common.ServerException
import mu.muse.common.types.BusinessError
import mu.muse.domain.instrument.InstrumentId
import mu.muse.domain.user.Username

fun interface RemoveFavorite {
    fun execute(username: Username, instrumentId: InstrumentId)
}

sealed class RemoveFavoriteError : BusinessError {
    data class UserNotFound(val username: Username) : ServerException("Username not found: `$username`")
}
