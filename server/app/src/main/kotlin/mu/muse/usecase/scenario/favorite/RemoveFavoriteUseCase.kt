package mu.muse.usecase.scenario.favorite

import mu.muse.domain.instrument.InstrumentId
import mu.muse.domain.user.Username
import mu.muse.usecase.RemoveFavorite
import mu.muse.usecase.RemoveFavoriteError
import mu.muse.usecase.access.user.UserExtractor
import mu.muse.usecase.access.user.UserPersister

class RemoveFavoriteUseCase(
    private val userExtractor: UserExtractor,
    private val userPersister: UserPersister,
) : RemoveFavorite {
    override fun execute(username: Username, instrumentId: InstrumentId) {
        // todo: use UnitOfWork
        val user = userExtractor.findByUsername(username)
            ?: throw RemoveFavoriteError.UserNotFound(username = username)

        user.favoriteIds.remove(instrumentId)

        userPersister.save(user)
    }
}
