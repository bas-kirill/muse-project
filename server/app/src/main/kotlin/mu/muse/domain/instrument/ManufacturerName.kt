package mu.muse.domain.instrument

import mu.muse.common.types.ValueObject

data class ManufacturerName internal constructor(private val value: String) : ValueObject {

    fun toStringValue() = value

    companion object {
        fun from(value: String): ManufacturerName {
            return ManufacturerName(value)
        }
    }
}
