package mu.muse.usecase.dto

import mu.muse.domain.User

data class ProfileDetails(
    val username: String,
    val role: String,
    val fullName: String,
) {
    companion object {
        fun from(user: User): ProfileDetails {
            return ProfileDetails(
                user.id.toStringValue(),
                user.role.toStringValue(),
                user.fullName,
            )
        }
    }
}
