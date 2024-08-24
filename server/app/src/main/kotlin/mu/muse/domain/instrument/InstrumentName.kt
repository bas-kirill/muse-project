package mu.muse.domain.instrument

import mu.muse.common.annotations.ValueObject


@ValueObject
data class InstrumentName internal constructor(private val value: String) {

    fun toStringValue() = value

    fun emptiness() = value.isEmpty()

    fun matches(other: InstrumentName): Boolean {
        return value.lowercase().contains(other.toStringValue().lowercase())
    }

    companion object {
        fun from(value: String): InstrumentName {
            return InstrumentName(value)
        }
    }
}
