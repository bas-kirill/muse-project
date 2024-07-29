package mu.muse.rest.login

import mu.muse.domain.user.Password
import mu.muse.domain.user.Username
import mu.muse.rest.AUTH_BASIC_LOGIN
import mu.muse.usecase.BasicLogin
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RestController

@RestController
class BasicLoginEndpoint(private val basicLogin: BasicLogin) {

    @PostMapping(AUTH_BASIC_LOGIN)
    fun login(@RequestBody request: Request): Response {
        val id = Username.from(request.username)
        val password = Password.from(request.password)
        val jwtRaw = basicLogin.execute(id, password)
        return Response(jwtRaw)
    }

    data class Request(val username: String, val password: String)

    data class Response(val jwtToken: String)
}
