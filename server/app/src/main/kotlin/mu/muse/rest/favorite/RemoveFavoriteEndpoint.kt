package mu.muse.rest.favorite

import mu.muse.rest.FAVORITE_INSTRUMENTS_SESSION_KEY
import mu.muse.rest.api.RemoveFavoriteApi
import mu.muse.rest.dto.RemoveFavoriteRequestBody
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.RestController
import org.springframework.web.context.request.RequestContextHolder
import org.springframework.web.context.request.ServletRequestAttributes

@RestController
class RemoveFavoriteEndpoint: RemoveFavoriteApi {

    override fun removeFavorite(request: RemoveFavoriteRequestBody): ResponseEntity<Any> {
        val session = (RequestContextHolder.getRequestAttributes() as ServletRequestAttributes).request.session
        val favorite = session.getAttribute(FAVORITE_INSTRUMENTS_SESSION_KEY) as MutableList<Long>?
            ?: return ResponseEntity.ok().build()
        favorite.remove(request.instrumentId)
        session.setAttribute(FAVORITE_INSTRUMENTS_SESSION_KEY, favorite)
        return ResponseEntity.ok().build()
    }
}
