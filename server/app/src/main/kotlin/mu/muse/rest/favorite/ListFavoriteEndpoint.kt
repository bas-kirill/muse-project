package mu.muse.rest.favorite

import mu.muse.domain.instrument.Instrument
import mu.muse.domain.user.Username
import mu.muse.rest.api.ListFavoriteApi
import mu.muse.rest.dto.ListFavoriteResponse
import mu.muse.rest.instruments.toDto
import mu.muse.usecase.GetFavoriteByUsername
import org.springframework.http.ResponseEntity
import org.springframework.security.core.context.SecurityContextHolder
import org.springframework.security.core.userdetails.UserDetails
import org.springframework.web.bind.annotation.RestController

@RestController
class ListFavoriteEndpoint(
    private val getFavoriteByUsername: GetFavoriteByUsername,
) : ListFavoriteApi {

    override fun listFavorite(): ResponseEntity<ListFavoriteResponse> {
        val principal = SecurityContextHolder.getContext().authentication.principal as UserDetails
        val username = Username.from(principal.username)
        val instruments = getFavoriteByUsername.execute(username)
        return instruments.toResponse()
    }
}

fun List<Instrument>.toResponse(): ResponseEntity<ListFavoriteResponse> {
    return ResponseEntity.ok(
        ListFavoriteResponse(
            content = this.map { it.toDto() },
        ),
    )
}
