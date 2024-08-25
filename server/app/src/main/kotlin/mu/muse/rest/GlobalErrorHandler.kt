package mu.muse.rest

import mu.muse.rest.dto.ClientError
import mu.muse.rest.dto.ServerError
import mu.muse.common.ClientException
import mu.muse.common.ServerException
import org.slf4j.Logger
import org.slf4j.LoggerFactory
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.ExceptionHandler
import org.springframework.web.bind.annotation.RestControllerAdvice

@RestControllerAdvice
class GlobalErrorHandler {

    companion object {
        val logger: Logger = LoggerFactory.getLogger(GlobalErrorHandler::class.java)
    }

    @ExceptionHandler(ClientException::class)
    fun handleClientException(e: ClientException): ResponseEntity<ClientError> {
        logger.error("Client exception", e)
        return ResponseEntity.badRequest().body(
            ClientError(
                message = e.message,
                cause = e.cause?.message,
            ),
        )
    }

    @ExceptionHandler(ServerException::class)
    fun handleServerException(e: ServerException): ResponseEntity<ServerError> {
        logger.error("Server exception", e)
        return ResponseEntity.internalServerError().body(
            ServerError(
                message = e.message,
                cause = e.cause?.message,
            ),
        )
    }

    @ExceptionHandler(Throwable::class)
    fun handleThrowable(e: Throwable): ResponseEntity<ServerError> {
        logger.error("Throwable exception", e)
        return ResponseEntity.internalServerError().body(
            ServerError(
                message = e.message,
                cause = e.cause?.message,
            ),
        )
    }
}
