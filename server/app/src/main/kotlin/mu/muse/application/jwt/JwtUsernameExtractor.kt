package mu.muse.application.jwt

import io.jsonwebtoken.Jwts
import mu.muse.domain.Jwt
import mu.muse.domain.Username

class JwtUsernameExtractor(private val jwtSecretKey: String) {

    fun execute(jwt: Jwt): Username {
        return Username.from(
            Jwts.parser()
                .setSigningKey(jwtSecretKey)
                .parseClaimsJws(jwt.toStringValue())
                .body
                .subject,
        )
    }
}
