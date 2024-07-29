package mu.muse.domain.user

import mu.muse.common.annotations.ValueObject

@ValueObject
data class Username internal constructor(private val value: String) {

    fun toStringValue() = value

    companion object {
        fun from(value: String?): Username {
            require(!(value.isNullOrBlank())) { "Username cannot be empty: `${value}`" }
            return Username(value)
        }
    }
}
