package mu.muse.usecase.scenario

import io.jsonwebtoken.Jwts
import io.jsonwebtoken.SignatureAlgorithm
import mu.muse.domain.User
import mu.muse.usecase.JwtGenerator
import java.util.*

class JwtGeneratorUseCase(
    private val jwtSecretKey: String,
    private val jwtExpiration: Long,
) : JwtGenerator {

    override fun execute(user: User): String {
        val claims = Jwts.claims().setSubject(user.id.toStringValue())
        claims["role"] = user.authority

        return Jwts.builder()
            .setClaims(claims)
            .setIssuedAt(Date(System.currentTimeMillis()))
            .setExpiration(Date(System.currentTimeMillis() + jwtExpiration))
            .signWith(SignatureAlgorithm.HS512, jwtSecretKey)
            .compact()
    }
}
