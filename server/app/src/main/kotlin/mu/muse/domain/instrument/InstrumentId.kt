package mu.muse.domain.instrument

import mu.muse.common.types.ValueObject

class InstrumentId internal constructor(private val value: Long) : ValueObject {

    fun toStringValue() = value

    companion object {
        fun from(value: Long): InstrumentId {
            require(value >= 0 && value <= Long.MAX_VALUE)
            return InstrumentId(value)
        }
    }
}

