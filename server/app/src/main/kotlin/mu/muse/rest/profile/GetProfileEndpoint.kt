package mu.muse.rest.profile

import mu.muse.domain.user.Username
import mu.muse.rest.api.GetUserProfileApi
import mu.muse.rest.dto.ProfileDetailsResponse
import mu.muse.usecase.GetProfile
import mu.muse.usecase.dto.ProfileDetails
import org.springframework.http.ResponseEntity
import org.springframework.security.core.context.SecurityContextHolder
import org.springframework.web.bind.annotation.RestController

@RestController
class GetProfileEndpoint(private val getProfile: GetProfile) : GetUserProfileApi {

    override fun getProfile(): ResponseEntity<ProfileDetailsResponse> {
        val principal = SecurityContextHolder.getContext().authentication
        val username = Username.from(principal.name)
        val profileDetails = getProfile.execute(username)
        return profileDetails.toRestResponse()
    }
}

fun ProfileDetails.toRestResponse() = ResponseEntity.ok().body(
    ProfileDetailsResponse(
        username = this.username,
        role = this.role,
        fullName = this.fullName,
    ),
)
