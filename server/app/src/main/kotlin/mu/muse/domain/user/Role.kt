package mu.muse.domain.user

import mu.muse.common.annotations.ValueObject

// used `class` instead of `enum`, because `@RolesAllowed` requires compile-time constants
@ValueObject
data class Role internal constructor(private val value: String) {

    companion object {
        fun from(value: String?): Role {
            require(!value.isNullOrBlank()) { "Role `${value}` cannot be null or empty" }
            return when (value) {
                USER -> Role(USER)
                EDITOR -> Role(EDITOR)
                else -> throw IllegalArgumentException("Unknown role: $value")
            }
        }

        const val USER = "USER"
        const val EDITOR = "EDITOR"
        fun user() = Role(USER)
        fun editor() = Role(EDITOR)
    }

    fun toStringValue() = value
    fun toAuthority() = "ROLE_$value"
}
