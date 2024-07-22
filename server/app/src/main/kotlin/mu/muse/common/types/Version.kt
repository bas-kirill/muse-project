package mu.muse.common.types

data class Version internal constructor(private val value: Long) : ValueObject {

    fun toLongValue() = value

    fun next() = Version(value + 1)

    fun previous() = Version(value - 1)

    companion object {
        fun new() = Version(0L)
        fun from(value: Long) = Version(value)
    }
}
