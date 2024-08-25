package mu.muse.usecase

import mu.muse.common.rest.ServerException
import mu.muse.common.types.BusinessError
import mu.muse.domain.instrument.InstrumentId
import mu.muse.domain.user.Username

fun interface AddFavorite {
    fun execute(username: Username, instrumentId: InstrumentId)
}

sealed class AddFavoriteError : BusinessError {
    data class UserNotFound(val username: Username) : ServerException("Username not found: `$username`")
}
