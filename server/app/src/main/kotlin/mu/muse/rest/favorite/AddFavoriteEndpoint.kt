package mu.muse.rest.favorite

import mu.muse.rest.FAVORITE_INSTRUMENTS_SESSION_KEY
import mu.muse.rest.api.AddFavoriteApi
import mu.muse.rest.dto.AddFavoriteRequestBody
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.RestController
import org.springframework.web.context.request.RequestContextHolder
import org.springframework.web.context.request.ServletRequestAttributes

@RestController
class AddFavoriteEndpoint: AddFavoriteApi {

    override fun addFavorite(request: AddFavoriteRequestBody): ResponseEntity<Any> {
        val session = (RequestContextHolder.getRequestAttributes() as ServletRequestAttributes).request.session
        val favorite = session.getAttribute(FAVORITE_INSTRUMENTS_SESSION_KEY) as MutableList<Long>?
        if (favorite == null) {
            session.setAttribute(FAVORITE_INSTRUMENTS_SESSION_KEY, mutableListOf(request.instrumentId))
            return ResponseEntity.ok().build()
        }

        if (request.instrumentId.instrumentId !in favorite) {
            favorite.add(request.instrumentId.instrumentId)
        }

        session.setAttribute(FAVORITE_INSTRUMENTS_SESSION_KEY, favorite)
        return ResponseEntity.ok().build()
    }
}
