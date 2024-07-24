package mu.muse.domain.user

class UsernameId internal constructor(private val value: Long) {
    companion object {
        fun from(value: Long): UsernameId {
            require(value >= 1L && value <= Long.MAX_VALUE)
            return UsernameId(value)
        }
    }
}
