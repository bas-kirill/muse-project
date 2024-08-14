package mu.muse.rest.registration

import mu.muse.domain.user.FullName
import mu.muse.domain.user.Password
import mu.muse.domain.user.Username
import mu.muse.rest.API_REGISTRATION
import mu.muse.usecase.RegisterUser
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RestController

@RestController
class RegistrationEndpoint(
    private val registerUser: RegisterUser,
) {

    @PostMapping(API_REGISTRATION)
    fun register(@RequestBody request: RegistrationRequest) {
        val username = Username.from(request.login)
        val password = Password.from(request.password)
        val fullName = FullName.from(request.fullName)
        registerUser.execute(
            fullName = fullName,
            username = username,
            password = password,
        )
    }

    data class RegistrationRequest(
        val fullName: String,
        val login: String,
        val password: String,
    )
}
