package mu.muse.usecase

import mu.muse.domain.user.Username

fun interface GetInstrumentsByUsername {
    fun execute(username: Username)
}
