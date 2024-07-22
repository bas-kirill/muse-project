package mu.muse.domain

data class Jwt internal constructor(private val value: String) {

    companion object {
        fun from(value: String): Jwt {
            require(value.isNotBlank()) { "JWT cannot be blank" }
            return Jwt(value)
        }
    }

    fun toStringValue() = value
}
