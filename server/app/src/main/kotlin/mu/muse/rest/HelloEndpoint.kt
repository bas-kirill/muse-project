package mu.muse.rest

import jakarta.annotation.security.RolesAllowed
import mu.muse.domain.Role
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RestController

@Suppress("FunctionOnlyReturningConstant")
@RestController
class HelloEndpoint {

    @RolesAllowed(Role.EDITOR)
    @GetMapping("/hello")
    fun hello(): String {
        return "Hello, World!"
    }

}
