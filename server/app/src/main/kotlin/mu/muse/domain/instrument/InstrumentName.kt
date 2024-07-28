package mu.muse.domain.instrument

data class InstrumentName internal constructor(private val value: String) {

    fun toStringValue() = value

    companion object {
        fun from(value: String): InstrumentName {
            return InstrumentName(value)
        }
    }
}
