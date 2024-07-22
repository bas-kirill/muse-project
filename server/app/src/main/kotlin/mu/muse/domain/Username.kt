package mu.muse.domain

import mu.muse.common.types.ValueObject

data class Username internal constructor(private val value: String) : ValueObject {

    fun toStringValue() = value

    companion object {
        fun from(value: String?): Username {
            require(!(value.isNullOrBlank())) { "Username cannot be empty: `${value}`" }
            return Username(value)
        }
    }
}
