package mu.muse.rest

import mu.muse.domain.Username
import mu.muse.usecase.GetProfile
import mu.muse.usecase.dto.ProfileDetails
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController
import java.security.Principal

@RestController
@RequestMapping("/api")
class GetProfileEndpoint(private val showProfile: GetProfile) {

    @GetMapping("/profile")
    fun getProfile(principal: Principal): ProfileDetails {
        val username = Username.from(principal.name)
        return showProfile.execute(username)
    }
}
