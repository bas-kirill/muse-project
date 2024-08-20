package mu.muse.usecase.scenario.profile

import mu.muse.domain.user.User
import mu.muse.domain.user.Username
import mu.muse.usecase.GetProfile
import mu.muse.usecase.ShowProfileError
import mu.muse.usecase.access.user.UserExtractor

class GetProfileUseCase(private val userExtractor: UserExtractor) : GetProfile {

    override fun execute(username: Username): User {
        return userExtractor.findByUsername(username)
            ?: throw ShowProfileError.UserNotFound(username)
    }
}
