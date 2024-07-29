package mu.muse.domain.instrument

import mu.muse.common.annotations.ValueObject

@ValueObject
data class ManufacturerName internal constructor(private val value: String) {

    fun toStringValue() = value

    companion object {
        fun from(value: String): ManufacturerName {
            return ManufacturerName(value)
        }
    }
}
