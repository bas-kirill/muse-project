package mu.muse.domain.instrument

import mu.muse.common.annotations.ValueObject

@ValueObject
data class InstrumentId internal constructor(private val value: Long) {

    fun toLongValue() = value

    companion object {
        fun from(value: Long): InstrumentId {
            require(value >= 0 && value <= Long.MAX_VALUE)
            return InstrumentId(value)
        }
    }
}

