package mu.muse.usecase.dto

import mu.muse.domain.user.User

data class Username(
    val username: String,
    val role: String,
    val fullName: String,
) {
    companion object {
        fun from(user: User): Username {
            return Username(
                username = user.username.toStringValue(),
                role = user.role.toStringValue(),
                fullName = user.fullName.toStringValue(),
            )
        }
    }
}
