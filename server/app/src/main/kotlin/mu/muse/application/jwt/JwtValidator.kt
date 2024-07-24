package mu.muse.application.jwt

import io.jsonwebtoken.Jwts
import mu.muse.domain.Jwt
import mu.muse.domain.user.Username
import mu.muse.usecase.access.UserExtractor
import org.springframework.security.core.userdetails.UserDetails
import java.util.Date

class JwtValidator(
    private val jwtSecretKey: String,
    private val userRepository: UserExtractor,
) {

    fun execute(jwt: Jwt): Boolean {
        val claims = Jwts.parser()
            .setSigningKey(jwtSecretKey)
            .parseClaimsJws(jwt.toStringValue())
            .body

        val username: Username = Username.from(claims.subject)
        val user: UserDetails = userRepository.findByUsername(username) ?: return false

        val today = Date()
        val expiration = claims.expiration
        return (username.toStringValue() == user.username) && (today.before(expiration))
    }
}
