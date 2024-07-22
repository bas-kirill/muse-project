package mu.muse.usecase.scenario

import mu.muse.domain.Password
import mu.muse.domain.Username
import mu.muse.usecase.JwtGenerator
import mu.muse.usecase.BasicLogin
import mu.muse.usecase.access.UserExtractor
import org.springframework.security.authentication.AuthenticationManager
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken

class BasicLoginUseCase(
    private val userRepository: UserExtractor,
    private val authenticationManager: AuthenticationManager,
    private val jwtGenerator: JwtGenerator,
) : BasicLogin {
    override fun execute(username: Username, password: Password): String {
        authenticationManager.authenticate(
            UsernamePasswordAuthenticationToken(
                username.value,
                password.value
            )
        )

        val user = userRepository.findByUsername(username) ?: throw IllegalArgumentException("User not found")
        return jwtGenerator.execute(user)
    }
}
