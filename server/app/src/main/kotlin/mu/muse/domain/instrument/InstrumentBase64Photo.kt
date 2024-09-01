package mu.muse.domain.instrument

import mu.muse.common.annotations.ValueObject
import java.util.Base64

@ValueObject
data class InstrumentBase64Photo internal constructor(private val value: String) {

    fun toStringValue() = value

    companion object {
        fun fromByteArray(value: ByteArray): InstrumentBase64Photo {
            require(value.isNotEmpty())
            return InstrumentBase64Photo(String(Base64.getEncoder().encode(value)))
        }

        fun from(valueRaw: String?): InstrumentBase64Photo {
            require(!valueRaw.isNullOrEmpty())
            return InstrumentBase64Photo(valueRaw)
        }
    }
}
