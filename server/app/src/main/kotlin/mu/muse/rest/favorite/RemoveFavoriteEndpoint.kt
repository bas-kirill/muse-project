package mu.muse.rest.favorite

import mu.muse.domain.instrument.InstrumentId
import mu.muse.domain.user.Username
import mu.muse.rest.api.RemoveFavoriteApi
import mu.muse.usecase.RemoveFavorite
import org.springframework.http.ResponseEntity
import org.springframework.security.core.context.SecurityContextHolder
import org.springframework.security.core.userdetails.UserDetails
import org.springframework.web.bind.annotation.RestController

@RestController
class RemoveFavoriteEndpoint(
    private val removeFavorite: RemoveFavorite,
): RemoveFavoriteApi {

    override fun removeFavorite(request: mu.muse.rest.dto.InstrumentId): ResponseEntity<Any> {
        val instrumentId = InstrumentId.from(request.instrumentId)
        val principal = SecurityContextHolder.getContext().authentication.principal as UserDetails
        val username = Username.from(principal.username)
        removeFavorite.execute(
            username = username,
            instrumentId = instrumentId
        )
        return ResponseEntity.ok().build()
    }
}
