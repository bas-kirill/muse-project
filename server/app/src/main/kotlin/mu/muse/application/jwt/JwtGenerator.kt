package mu.muse.application.jwt

import io.jsonwebtoken.Jwts
import io.jsonwebtoken.SignatureAlgorithm
import mu.muse.domain.Jwt
import mu.muse.domain.User
import java.util.Date

class JwtGenerator(
    private val jwtSecretKey: String,
    private val jwtExpirationMillis: Long,
) {

    fun execute(user: User): Jwt {
        val claims = Jwts.claims().setSubject(user.id.toStringValue())
        claims["role"] = user.role.toStringValue()

        return Jwt.from(
            Jwts.builder()
                .setClaims(claims)
                .setIssuedAt(Date(System.currentTimeMillis()))
                .setExpiration(Date(System.currentTimeMillis() + jwtExpirationMillis))
                .signWith(SignatureAlgorithm.HS512, jwtSecretKey)
                .compact(),
        )
    }
}
