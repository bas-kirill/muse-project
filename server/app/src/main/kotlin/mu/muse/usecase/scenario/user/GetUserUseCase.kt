package mu.muse.usecase.scenario.user

import mu.muse.domain.user.User
import mu.muse.domain.user.Username
import mu.muse.usecase.GetUser
import mu.muse.usecase.ShowProfileError
import mu.muse.usecase.access.user.UserExtractor

class GetUserUseCase(private val userExtractor: UserExtractor) : GetUser {

    override fun execute(username: Username): User {
        val user = userExtractor.findByUsername(username)
            ?: throw ShowProfileError.UserNotFound(username)
        return user
    }
}
