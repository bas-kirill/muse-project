package mu.muse.domain.user

import mu.muse.common.annotations.ValueObject

@ValueObject
data class FullName(private val value: String) {

    fun toStringValue() = value

    companion object {
        fun from(value: String?): FullName {
            require(!value.isNullOrBlank()) { "Full name `${value}` cannot be null or empty" }
            require(value.isNotEmpty())
            return FullName(value)
        }
    }
}
