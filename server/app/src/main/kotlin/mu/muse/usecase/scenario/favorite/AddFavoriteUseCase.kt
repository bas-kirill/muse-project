package mu.muse.usecase.scenario.favorite

import mu.muse.domain.instrument.InstrumentId
import mu.muse.domain.user.Username
import mu.muse.usecase.AddFavorite
import mu.muse.usecase.AddFavoriteError
import mu.muse.usecase.access.user.UserExtractor
import mu.muse.usecase.access.user.UserPersister

class AddFavoriteUseCase(
    private val userExtractor: UserExtractor,
    private val userPersister: UserPersister,
) : AddFavorite {

    override fun execute(username: Username, instrumentId: InstrumentId) {
        // todo(unit-of-work): use UnitOfWork
        val user = userExtractor.findByUsername(username)
            ?: throw AddFavoriteError.UserNotFound(username)

        if (instrumentId !in user.favoriteIds) {
            user.favoriteIds.add(instrumentId)
        }

        userPersister.save(user)
    }
}
