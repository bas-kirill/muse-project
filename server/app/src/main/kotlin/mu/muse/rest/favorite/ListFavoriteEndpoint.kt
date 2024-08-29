package mu.muse.rest.favorite

import mu.muse.domain.instrument.Instrument
import mu.muse.domain.user.Username
import mu.muse.rest.api.ListFavoriteApi
import mu.muse.rest.dto.ListFavoriteResponse
import mu.muse.rest.instruments.toDto
import mu.muse.usecase.GetFavoriteByUsername
import org.springframework.context.MessageSource
import org.springframework.http.HttpHeaders
import org.springframework.http.ResponseEntity
import org.springframework.security.core.context.SecurityContextHolder
import org.springframework.security.core.userdetails.UserDetails
import org.springframework.web.bind.annotation.RestController
import org.springframework.web.context.request.RequestContextHolder
import org.springframework.web.context.request.ServletRequestAttributes
import java.util.Locale

@RestController
class ListFavoriteEndpoint(
    private val getFavoriteByUsername: GetFavoriteByUsername,
    private val messageSource: MessageSource,
) : ListFavoriteApi {

    override fun listFavorite(): ResponseEntity<ListFavoriteResponse> {
        val principal = SecurityContextHolder.getContext().authentication.principal as UserDetails
        val username = Username.from(principal.username)
        val instruments = getFavoriteByUsername.execute(username)
        val request = (RequestContextHolder.getRequestAttributes() as ServletRequestAttributes).request
        val locale = Locale.of(request.getHeader(HttpHeaders.ACCEPT_LANGUAGE)) ?: Locale.US
        return instruments.toResponse(messageSource, locale)
    }
}

fun List<Instrument>.toResponse(messageSource: MessageSource, locale: Locale): ResponseEntity<ListFavoriteResponse> {
    return ResponseEntity.ok(
        ListFavoriteResponse(
            content = this.map { it.toDto(messageSource, locale) },
        ),
    )
}
