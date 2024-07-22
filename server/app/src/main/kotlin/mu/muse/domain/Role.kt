package mu.muse.domain

import mu.muse.common.types.ValueObject

// used `class` instead of `enum`, because `@RolesAllowed` requires compile-time constants
data class Role internal constructor(private val value: String) : ValueObject {

    companion object {
        fun from(value: String): Role {
            when (value) {
                USER -> Role(USER)
                EDITOR -> Role(EDITOR)
            }
            throw IllegalArgumentException("Unknown role: $value")
        }

        const val USER = "USER"
        const val EDITOR = "EDITOR"
        fun user() = Role(USER)
        fun editor() = Role(EDITOR)
    }

    fun toStringValue() = value
    fun toAuthority() = "ROLE_$value"
}
