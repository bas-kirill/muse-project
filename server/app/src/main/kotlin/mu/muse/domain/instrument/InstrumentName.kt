package mu.muse.domain.instrument

data class InstrumentName internal constructor(private val value: String) {

    fun toStringValue() = value

    fun matches(other: InstrumentName): Boolean {
        return value.lowercase().contains(other.toStringValue().lowercase())
    }

    companion object {
        fun from(value: String): InstrumentName {
            return InstrumentName(value)
        }
    }
}
