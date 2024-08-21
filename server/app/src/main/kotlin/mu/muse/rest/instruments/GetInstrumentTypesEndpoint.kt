package mu.muse.rest.instruments

import mu.muse.rest.api.GetInstrumentTypesApi
import mu.muse.rest.dto.GetInstrumentTypesResponse
import mu.muse.usecase.GetInstrumentTypes
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.RestController

@RestController
class GetInstrumentTypesEndpoint(
    private val getInstrumentTypes: GetInstrumentTypes,
) : GetInstrumentTypesApi {

    override fun getInstrumentTypes(): ResponseEntity<GetInstrumentTypesResponse> {
        val instrumentTypes = getInstrumentTypes.execute()
        return ResponseEntity.ok(
            GetInstrumentTypesResponse(
                content = instrumentTypes.map { it.name },
            ),
        )
    }
}
