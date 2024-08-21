package mu.muse.rest.login

import jakarta.servlet.http.Cookie
import mu.muse.domain.user.Password
import mu.muse.domain.user.Username
import mu.muse.rest.api.BasicLoginApi
import mu.muse.rest.dto.JwtResponse
import mu.muse.rest.dto.UsernameAndPasswordRequestBody
import mu.muse.usecase.BasicLogin
import mu.muse.usecase.scenario.login.JwtRaw
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.RestController
import org.springframework.web.context.request.RequestContextHolder
import org.springframework.web.context.request.ServletRequestAttributes

@RestController
class BasicLoginEndpoint(private val basicLogin: BasicLogin) : BasicLoginApi {

    companion object {
        const val COOKIE_MAX_AGE_SEVEN_DAYS_IN_SECONDS = 7 * 24 * 60 * 60
        const val COOKIE_PATH = "/"
    }


    override fun basicLogin(usernameAndPasswordRequestBody: UsernameAndPasswordRequestBody):
        ResponseEntity<JwtResponse> {
        val id = Username.from(usernameAndPasswordRequestBody.username)
        val password = Password.from(usernameAndPasswordRequestBody.password)
        val jwtRaw = basicLogin.execute(id, password)
        val cookie = Cookie("jwt", jwtRaw)
        cookie.isHttpOnly = false // because we need to extract a role from token at client side
        cookie.maxAge = COOKIE_MAX_AGE_SEVEN_DAYS_IN_SECONDS  // 7 days
        cookie.path = COOKIE_PATH
        (RequestContextHolder.getRequestAttributes() as ServletRequestAttributes).response?.addCookie(cookie)
        return jwtRaw.toResponseEntity()
    }
}

fun JwtRaw.toResponseEntity(): ResponseEntity<JwtResponse> = ResponseEntity.ok(JwtResponse(jwt = this))
