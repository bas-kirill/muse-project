package mu.muse.domain.instrument

class InstrumentName internal constructor(private val value: String) {

    fun toStringValue() = value

    companion object {
        fun from(value: String): InstrumentName {
            require(value.isNotBlank())
            return InstrumentName(value)
        }
    }
}
