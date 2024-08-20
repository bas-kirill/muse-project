package mu.muse.rest.profile

import mu.muse.domain.user.Username
import mu.muse.rest.api.ProfileApi
import mu.muse.rest.dto.ProfileDetails
import mu.muse.usecase.GetProfile
import org.springframework.http.ResponseEntity
import org.springframework.security.core.context.SecurityContextHolder
import org.springframework.web.bind.annotation.RestController

@RestController
class GetProfileEndpoint(private val showProfile: GetProfile) : ProfileApi {

    override fun getProfile(): ResponseEntity<ProfileDetails> {
        val principal = SecurityContextHolder.getContext().authentication
        val username = Username.from(principal.name)
        val user = showProfile.execute(username)
        return ResponseEntity.ok().body(
            ProfileDetails(
                username = user.username.toStringValue(),
                role = user.role.toStringValue(),
                fullName = user.fullName.toStringValue(),
            ),
        )
    }
}
