package mu.muse.rest.favorite

import jakarta.servlet.http.HttpSession
import mu.muse.rest.API_FAVORITE_ADD
import mu.muse.rest.API_FAVORITE_LIST
import mu.muse.rest.API_FAVORITE_REMOVE
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RestController

@RestController
class FavoriteEndpoint {

    val FAVORITE_INSTRUMENTS_SESSION_KEY = "FAVORITE_INSTRUMENTS"

    @GetMapping(API_FAVORITE_LIST)
    fun listFavorite(session: HttpSession): List<Long> {
        val favorite = session.getAttribute(FAVORITE_INSTRUMENTS_SESSION_KEY) as MutableList<Long>?
        if (favorite == null) {
            return mutableListOf()
        }
        return favorite
    }

    @PostMapping(API_FAVORITE_ADD)
    fun addToFavorite(session: HttpSession, @RequestBody request: Request) {
        val favorite = session.getAttribute(FAVORITE_INSTRUMENTS_SESSION_KEY) as MutableList<Long>?
        if (favorite == null) {
            session.setAttribute(FAVORITE_INSTRUMENTS_SESSION_KEY, mutableListOf(request.instrumentId))
            return
        }

        if (request.instrumentId !in favorite) {
            favorite.add(request.instrumentId)
        }

        session.setAttribute(FAVORITE_INSTRUMENTS_SESSION_KEY, favorite)
    }

    @PostMapping(API_FAVORITE_REMOVE)
    fun removeFromFavorite(session: HttpSession, @RequestBody request: Request) {
        val favorite = session.getAttribute(FAVORITE_INSTRUMENTS_SESSION_KEY) as MutableList<Long>?
        if (favorite == null) {
            return
        }

        favorite.remove(request.instrumentId)
        session.setAttribute(FAVORITE_INSTRUMENTS_SESSION_KEY, favorite)
    }

    data class Request(val instrumentId: Long)
}
