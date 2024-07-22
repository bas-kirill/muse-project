package mu.muse.usecase

fun interface JwtValidator {

    fun execute(jwtRaw: String): Boolean
}
