package mu.muse.rest.instruments

import jakarta.annotation.security.RolesAllowed
import mu.muse.domain.instrument.InstrumentId
import mu.muse.domain.user.Role
import mu.muse.rest.api.DeleteInstrumentByIdApi
import mu.muse.usecase.DeleteInstrumentById
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.RestController

@RestController
class DeleteInstrumentByIdEndpoint(
    private val deleteInstrumentById: DeleteInstrumentById
): DeleteInstrumentByIdApi {

    @RolesAllowed(Role.EDITOR)
    override fun deleteInstrumentById(instrumentId: Long): ResponseEntity<Any> {
        val id = InstrumentId.from(instrumentId.toString())
        deleteInstrumentById.execute(id)
        return ResponseEntity.ok().build()
    }
}
