package mu.muse.usecase.scenario

import io.jsonwebtoken.Jwts
import mu.muse.domain.Username
import mu.muse.usecase.JwtValidator
import mu.muse.usecase.access.UserExtractor
import org.springframework.security.core.userdetails.UserDetails
import java.util.*

class JwtValidatorUseCase(
    private val jwtSecretKey: String,
    private val userRepository: UserExtractor
) : JwtValidator {

    override fun execute(jwtRaw: String): Boolean {
        val claims = Jwts.parser()
            .setSigningKey(jwtSecretKey)
            .parseClaimsJws(jwtRaw)
            .body

        val username: Username = Username.from(claims.subject)
        val user: UserDetails = userRepository.findByUsername(username) ?: return false
        val expiration = claims.expiration
        return (username.toStringValue() == user.username) && (Date().before(expiration))
    }
}
