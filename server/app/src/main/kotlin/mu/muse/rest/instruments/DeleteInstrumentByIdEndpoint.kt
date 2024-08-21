package mu.muse.rest.instruments

import jakarta.annotation.security.RolesAllowed
import mu.muse.domain.instrument.InstrumentId
import mu.muse.domain.user.Role
import mu.muse.rest.API_DELETE_INSTRUMENT_BY_ID
import mu.muse.usecase.DeleteInstrumentById
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RestController

@RestController
class DeleteInstrumentByIdEndpoint(
    private val deleteInstrumentById: DeleteInstrumentById
) {

    @RolesAllowed(Role.EDITOR)
    @PostMapping(API_DELETE_INSTRUMENT_BY_ID)
    fun deleteInstrumentById(@PathVariable id: String) {
        val instrumentId = InstrumentId.from(id)
        deleteInstrumentById.execute(instrumentId)
    }
}
