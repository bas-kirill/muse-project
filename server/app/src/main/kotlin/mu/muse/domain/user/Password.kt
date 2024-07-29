package mu.muse.domain.user

import mu.muse.common.annotations.ValueObject

@ValueObject
data class Password internal constructor(private val value: String) {

    companion object {
        fun from(value: String?): Password {
            require(!value.isNullOrBlank()) { "Password `${value}` cannot be null or empty" }
            return Password(value)
        }
    }

    fun toPlainStringValue() = value
}
