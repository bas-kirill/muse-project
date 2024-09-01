package mu.muse.domain.user

class UserId internal constructor(private val value: Long) {

    fun toLongValue() = value

    companion object {
        fun from(value: Long?): UserId {
            require(value != null) { "User ID cannot be null: `${value}`" }
            require(value >= 1L && value <= Long.MAX_VALUE)
            return UserId(value)
        }

        fun zero() = UserId(0)
    }
}
