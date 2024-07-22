package mu.muse.usecase

import mu.muse.domain.User

fun interface JwtGenerator {

    fun execute(user: User): String
}
