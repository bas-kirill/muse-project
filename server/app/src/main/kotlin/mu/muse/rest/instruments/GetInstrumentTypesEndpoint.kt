package mu.muse.rest.instruments

import mu.muse.domain.instrument.Instrument
import mu.muse.rest.api.GetInstrumentTypesApi
import mu.muse.rest.dto.GetInstrumentTypesResponse
import mu.muse.rest.dto.InstrumentType
import mu.muse.usecase.GetInstrumentTypes
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.RestController

@RestController
class GetInstrumentTypesEndpoint(
    private val getInstrumentTypes: GetInstrumentTypes,
) : GetInstrumentTypesApi {

    override fun getInstrumentTypes(): ResponseEntity<GetInstrumentTypesResponse> {
        val instrumentTypes = getInstrumentTypes.execute()
        return instrumentTypes.toRestResponse()
    }
}

fun List<Instrument.Type>.toRestResponse(): ResponseEntity<GetInstrumentTypesResponse> {
    return ResponseEntity.ok(
        GetInstrumentTypesResponse(
            content = this.map { InstrumentType(it.name) },
        ),
    )
}
