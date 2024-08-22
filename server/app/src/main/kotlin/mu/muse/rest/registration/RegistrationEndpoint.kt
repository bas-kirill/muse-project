package mu.muse.rest.registration

import mu.muse.domain.user.FullName
import mu.muse.domain.user.Password
import mu.muse.domain.user.Username
import mu.muse.rest.api.UserRegistrationApi
import mu.muse.rest.dto.RegistrationRequest
import mu.muse.usecase.RegisterUser
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.RestController

@RestController
class RegistrationEndpoint(
    private val registerUser: RegisterUser,
) : UserRegistrationApi {

    override fun userRegistration(request: RegistrationRequest): ResponseEntity<Any> {
        val username = Username.from(request.login)
        val password = Password.from(request.password)
        val fullName = FullName.from(request.fullName)
        registerUser.execute(
            fullName = fullName,
            username = username,
            password = password,
        )
        return ResponseEntity.ok().build()
    }
}
