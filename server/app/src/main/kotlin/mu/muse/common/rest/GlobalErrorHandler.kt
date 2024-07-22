package mu.muse.common.rest

import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.ExceptionHandler
import org.springframework.web.bind.annotation.RestControllerAdvice

@RestControllerAdvice
class GlobalErrorHandler {

    @ExceptionHandler(Throwable::class)
    fun handleThrowable(e: Throwable): ResponseEntity<String> {
        return ResponseEntity.internalServerError().body("Internal error: ${e.message}")
    }
}
