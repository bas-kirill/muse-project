package mu.muse.common.types

import mu.muse.common.annotations.ValueObject

@ValueObject
data class Version internal constructor(private val value: Long) {

    fun toLongValue() = value

    fun next() = Version(value + 1)

    fun previous() = Version(value - 1)

    companion object {
        fun new() = Version(0L)
        fun from(value: Long) = Version(value)
    }
}
