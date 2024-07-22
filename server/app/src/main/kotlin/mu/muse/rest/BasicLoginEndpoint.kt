package mu.muse.rest

import mu.muse.domain.Password
import mu.muse.domain.Username
import mu.muse.usecase.BasicLogin
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("/api/auth")
class BasicLoginEndpoint(private val basicLogin: BasicLogin) {

    @PostMapping("/login")
    fun login(@RequestBody request: Request): Response {
        val id = Username.from(request.username)
        val password = Password.from(request.password)
        val jwtToken = basicLogin.execute(id, password)
        return Response(jwtToken)
    }

    data class Request(val username: String, val password: String)

    data class Response(val jwtToken: String)
}
