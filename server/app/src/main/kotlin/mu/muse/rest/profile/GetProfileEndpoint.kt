package mu.muse.rest.profile

import mu.muse.domain.user.User
import mu.muse.domain.user.Username
import mu.muse.rest.api.GetUserProfileApi
import mu.muse.rest.dto.ProfileDetails
import mu.muse.usecase.GetUser
import org.springframework.http.ResponseEntity
import org.springframework.security.core.context.SecurityContextHolder
import org.springframework.web.bind.annotation.RestController

@RestController
class GetProfileEndpoint(private val getUser: GetUser) : GetUserProfileApi {

    override fun getProfile(): ResponseEntity<ProfileDetails> {
        val principal = SecurityContextHolder.getContext().authentication
        val username = Username.from(principal.name)
        val user = getUser.execute(username)
        return user.toRestResponse()
    }
}

fun User.toRestResponse(): ResponseEntity<ProfileDetails> = ResponseEntity.ok().body(
    ProfileDetails(
        username = this.username.toStringValue(),
        role = this.role.toStringValue(),
        fullName = this.fullName.toStringValue(),
    ),
)
