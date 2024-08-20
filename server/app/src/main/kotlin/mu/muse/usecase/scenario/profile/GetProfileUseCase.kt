package mu.muse.usecase.scenario.profile

import mu.muse.domain.user.Username
import mu.muse.usecase.GetProfile
import mu.muse.usecase.ShowProfileError
import mu.muse.usecase.access.user.UserExtractor
import mu.muse.usecase.dto.ProfileDetails

class GetProfileUseCase(private val userExtractor: UserExtractor) : GetProfile {

    override fun execute(username: Username): ProfileDetails {
        val user = userExtractor.findByUsername(username)
            ?: throw ShowProfileError.UserNotFound(username)
        return ProfileDetails.from(user)
    }
}
