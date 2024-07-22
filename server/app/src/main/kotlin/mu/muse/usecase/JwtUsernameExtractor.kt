package mu.muse.usecase

import mu.muse.domain.Username

fun interface JwtUsernameExtractor {

    fun execute(jwtRaw: String?): Username?
}
