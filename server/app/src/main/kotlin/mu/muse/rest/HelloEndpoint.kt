package mu.muse.rest

import org.springframework.web.bind.annotation.GetMapping

class HelloEndpoint {

    @GetMapping("/hello")
    fun hello(): String {
        return "Hello, World!"
    }
}