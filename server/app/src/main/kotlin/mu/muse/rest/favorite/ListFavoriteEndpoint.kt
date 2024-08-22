package mu.muse.rest.favorite

import mu.muse.domain.instrument.Instrument
import mu.muse.domain.instrument.InstrumentId
import mu.muse.rest.FAVORITE_INSTRUMENTS_SESSION_KEY
import mu.muse.rest.api.ListFavoriteApi
import mu.muse.rest.dto.InstrumentDetail
import mu.muse.rest.dto.ListFavoriteResponseBody
import mu.muse.rest.instruments.toDto
import mu.muse.usecase.GetInstrumentsByIds
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.RestController
import org.springframework.web.context.request.RequestContextHolder
import org.springframework.web.context.request.ServletRequestAttributes

@RestController
class ListFavoriteEndpoint(
    private val getInstrumentsByIds: GetInstrumentsByIds,
): ListFavoriteApi {

    override fun listFavorite(): ResponseEntity<ListFavoriteResponseBody> {
        val session = (RequestContextHolder.getRequestAttributes() as ServletRequestAttributes).request.session
        val favoriteIds = session.getAttribute(FAVORITE_INSTRUMENTS_SESSION_KEY) as MutableList<Long>?
            ?: return ResponseEntity.ok(ListFavoriteResponseBody(mutableListOf()))

        val favoriteInstrumentIds = favoriteIds.map { InstrumentId.from(it.toString()) }
        val instruments = getInstrumentsByIds.execute(favoriteInstrumentIds)
        return instruments.toResponse()
    }
}

fun List<Instrument>.toResponse(): ResponseEntity<ListFavoriteResponseBody> {
    return ResponseEntity.ok(
        ListFavoriteResponseBody(
            content = this.map { it.toDto() },
        ),
    )
}
