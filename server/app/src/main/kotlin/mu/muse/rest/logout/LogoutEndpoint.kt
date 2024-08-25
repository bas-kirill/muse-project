package mu.muse.rest.logout

import jakarta.annotation.security.RolesAllowed
import jakarta.servlet.http.Cookie
import mu.muse.domain.user.Role
import mu.muse.rest.COOKIE_JWT_KEY
import mu.muse.rest.COOKIE_SESSION_ID
import mu.muse.rest.api.LogoutApi
import mu.muse.rest.login.BasicLoginEndpoint.Companion.COOKIE_PATH
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.RestController
import org.springframework.web.context.request.RequestContextHolder
import org.springframework.web.context.request.ServletRequestAttributes

@RestController
class LogoutEndpoint : LogoutApi {

    @RolesAllowed(Role.USER, Role.EDITOR)
    override fun logout(): ResponseEntity<Any> {
        val request = (RequestContextHolder.getRequestAttributes() as ServletRequestAttributes).request

        val jwtKeyCookie = Cookie(COOKIE_JWT_KEY, "")
        jwtKeyCookie.maxAge = 0
        jwtKeyCookie.path = COOKIE_PATH
        (RequestContextHolder.getRequestAttributes() as ServletRequestAttributes).response?.addCookie(jwtKeyCookie)

        request.session.invalidate()

        val sessionIdCookie = Cookie(COOKIE_SESSION_ID, "")
        sessionIdCookie.maxAge = 0
        sessionIdCookie.path = COOKIE_PATH
        (RequestContextHolder.getRequestAttributes() as ServletRequestAttributes).response?.addCookie(sessionIdCookie)

        return ResponseEntity.ok().build()
    }
}
