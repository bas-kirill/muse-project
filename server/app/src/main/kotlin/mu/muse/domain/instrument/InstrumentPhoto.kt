package mu.muse.domain.instrument

import mu.muse.common.annotations.ValueObject

@ValueObject
data class InstrumentPhoto internal constructor(private val value: ByteArray) {

    fun toByteArray() = value.copyOf()

    companion object {
        fun from(value: ByteArray): InstrumentPhoto {
            require(value.isNotEmpty())
            return InstrumentPhoto(value)
        }
    }
}
