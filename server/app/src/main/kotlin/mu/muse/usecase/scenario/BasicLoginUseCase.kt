package mu.muse.usecase.scenario

import io.jsonwebtoken.Jwts
import mu.muse.domain.user.Password
import mu.muse.domain.user.Username
import mu.muse.usecase.BasicLogin
import mu.muse.usecase.BasicLoginError
import mu.muse.usecase.access.user.UserExtractor
import org.springframework.security.authentication.AuthenticationManager
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken
import java.security.Key
import java.util.Date

typealias JwtRaw = String

class BasicLoginUseCase(
    private val authenticationManager: AuthenticationManager,
    private val userRepository: UserExtractor,
    private val secretKey: Key,
    private val expirationMillis: Long,
) : BasicLogin {
    override fun execute(username: Username, password: Password): JwtRaw {
        authenticationManager.authenticate(
            UsernamePasswordAuthenticationToken(
                username.toStringValue(),
                password.toPlainStringValue(),
            ),
        )

        val user = userRepository.findByUsername(username) ?: throw BasicLoginError.UserNotFound(username)
        val claims = Jwts.claims().setSubject(user.username.toStringValue())

        return Jwts.builder()
            .setClaims(claims)
            .claim("role", user.role.toStringValue())
            .setIssuedAt(Date(System.currentTimeMillis()))
            .setExpiration(Date(System.currentTimeMillis() + expirationMillis))
            .signWith(secretKey)
            .compact()
    }
}
