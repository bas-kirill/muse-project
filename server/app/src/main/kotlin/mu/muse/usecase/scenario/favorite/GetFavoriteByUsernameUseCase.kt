package mu.muse.usecase.scenario.favorite

import mu.muse.domain.instrument.Instrument
import mu.muse.domain.user.Username
import mu.muse.usecase.GetFavoriteByUsername
import mu.muse.usecase.GetUserFavoriteError
import mu.muse.usecase.access.instrument.InstrumentExtractor
import mu.muse.usecase.access.user.UserExtractor

class GetFavoriteByUsernameUseCase(
    private val userExtractor: UserExtractor,
    private val instrumentExtractor: InstrumentExtractor,
) : GetFavoriteByUsername {

    override fun execute(username: Username): List<Instrument> {
        // todo: use UnitOfWork
        val user = userExtractor.findByUsername(username)
            ?: throw GetUserFavoriteError.UserNotFound(username)

        return instrumentExtractor.findByIds(user.favoriteIds)
    }
}
