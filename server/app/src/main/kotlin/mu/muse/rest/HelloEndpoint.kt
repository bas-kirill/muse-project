package mu.muse.rest

import jakarta.annotation.security.RolesAllowed
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RestController

@RestController
class HelloEndpoint {

    @RolesAllowed("EDITOR")
    @GetMapping("/hello")
    fun hello(): String {
        return "Hello, World!"
    }

}
