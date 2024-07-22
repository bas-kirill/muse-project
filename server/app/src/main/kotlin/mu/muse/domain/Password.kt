package mu.muse.domain

import mu.muse.common.types.ValueObject

data class Password private constructor(val value: String) : ValueObject {

    companion object {
        fun from(value: String?): Password {
            require(!value.isNullOrBlank()) { "Password `${value}` cannot be null or empty" }
            return Password(value)
        }
    }
}
