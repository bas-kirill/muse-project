package mu.muse.rest.instruments

import mu.muse.domain.instrument.InstrumentId
import mu.muse.rest.API_INSTRUMENT_BY_ID
import mu.muse.usecase.GetInstrumentById
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.RestController

@RestController
class GetInstrumentByIdEndpoint(
    private val getInstrumentById: GetInstrumentById,
) {

    @GetMapping(API_INSTRUMENT_BY_ID)
    fun getInstrumentById(@PathVariable id: Long): ResponseEntity<*> {
        val instrumentId = InstrumentId.from(id)
        val instrumentDetails = getInstrumentById.execute(instrumentId)
        return if (instrumentDetails == null) {
            ResponseEntity.internalServerError().body("Not Found")
        } else {
            ResponseEntity.ok().body(instrumentDetails)
        }
    }
}
