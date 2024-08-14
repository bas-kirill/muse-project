package mu.muse.domain.user

import mu.muse.common.annotations.ValueObject

@ValueObject
data class FullName(private val value: String) {

    fun toStringValue() = value

    companion object {
        fun from(fullName: String): FullName {
            require(fullName.isNotEmpty())
            return FullName(fullName)
        }
    }
}
