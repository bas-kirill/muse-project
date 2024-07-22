package mu.muse.usecase.scenario

import io.jsonwebtoken.Jwts
import mu.muse.domain.Username
import mu.muse.usecase.JwtUsernameExtractor

class JwtUsernameExtractorUseCase(private val jwtSecretKey: String) : JwtUsernameExtractor {

    override fun execute(jwtRaw: String?): Username {
        return Username.from(
            Jwts.parser()
                .setSigningKey(jwtSecretKey)
                .parseClaimsJws(jwtRaw)
                .body
                .subject,
        )
    }
}
