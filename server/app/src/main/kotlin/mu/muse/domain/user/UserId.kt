package mu.muse.domain.user

class UserId internal constructor(private val value: Long) {
    companion object {
        fun from(value: Long): UserId {
            require(value >= 1L && value <= Long.MAX_VALUE)
            return UserId(value)
        }

        fun zero() = UserId(0)
    }
}
