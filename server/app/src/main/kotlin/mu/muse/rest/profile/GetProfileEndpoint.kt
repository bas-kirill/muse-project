package mu.muse.rest.profile

import mu.muse.domain.Username
import mu.muse.rest.API_PROFILE
import mu.muse.usecase.GetProfile
import mu.muse.usecase.dto.ProfileDetails
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RestController
import java.security.Principal

@RestController
class GetProfileEndpoint(private val showProfile: GetProfile) {

    @GetMapping(API_PROFILE)
    fun getProfile(principal: Principal): ProfileDetails {
        val username = Username.from(principal.name)
        return showProfile.execute(username)
    }
}
