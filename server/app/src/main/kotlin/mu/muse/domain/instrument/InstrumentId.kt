package mu.muse.domain.instrument

import mu.muse.common.annotations.ValueObject

@ValueObject
data class InstrumentId internal constructor(private val value: Long) {

    fun toLongValue() = value

    companion object {
        fun from(valueStringRaw: String): InstrumentId {
            val valueLongRaw = valueStringRaw.toLong()
            require(valueLongRaw >= 0 && valueLongRaw <= Long.MAX_VALUE)
            return InstrumentId(valueLongRaw)
        }
    }
}

