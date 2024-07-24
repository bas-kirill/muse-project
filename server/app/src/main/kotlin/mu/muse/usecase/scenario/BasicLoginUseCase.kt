package mu.muse.usecase.scenario

import mu.muse.application.jwt.JwtGenerator
import mu.muse.domain.Jwt
import mu.muse.domain.user.Password
import mu.muse.domain.user.Username
import mu.muse.usecase.BasicLogin
import mu.muse.usecase.BasicLoginError
import mu.muse.usecase.access.UserExtractor
import org.springframework.security.authentication.AuthenticationManager
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken

class BasicLoginUseCase(
    private val authenticationManager: AuthenticationManager,
    private val userRepository: UserExtractor,
    private val jwtGenerator: JwtGenerator,
) : BasicLogin {
    override fun execute(username: Username, password: Password): Jwt {
        authenticationManager.authenticate(
            UsernamePasswordAuthenticationToken(
                username.toStringValue(),
                password.toPlainStringValue(),
            ),
        )

        val user = userRepository.findByUsername(username) ?: throw BasicLoginError.UserNotFound(username)
        return jwtGenerator.execute(user)
    }
}
