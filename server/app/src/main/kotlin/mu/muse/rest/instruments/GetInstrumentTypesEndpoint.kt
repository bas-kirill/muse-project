package mu.muse.rest.instruments

import jakarta.annotation.security.RolesAllowed
import mu.muse.domain.instrument.Instrument
import mu.muse.domain.user.Role
import mu.muse.rest.API_INSTRUMENT_TYPES
import mu.muse.usecase.GetInstrumentTypes
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RestController

@RestController
class GetInstrumentTypesEndpoint(
    private val getInstrumentTypes: GetInstrumentTypes,
) {

    @RolesAllowed(Role.EDITOR)
    @GetMapping(API_INSTRUMENT_TYPES)
    fun getInstrumentTypes(): List<Instrument.Type> {
        return getInstrumentTypes.execute()
    }
}
