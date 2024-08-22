@file:JvmName("GetInstrumentsByCriteriaEndpointKt")

package mu.muse.rest.instruments

import mu.muse.rest.api.GetInstrumentsByCriteriaApi
import mu.muse.rest.dto.GetInstrumentCriteriaRequestBody
import mu.muse.rest.dto.GetInstrumentsByCriteriaResponse
import mu.muse.rest.dto.InstrumentDetail
import mu.muse.usecase.GetInstrumentsByCriteria
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.RestController

@RestController
class GetInstrumentsByCriteriaEndpoint(
    private val getInstrumentsByCriteria: GetInstrumentsByCriteria,
) : GetInstrumentsByCriteriaApi {

    override fun getInstrumentsByCriteria(
        request: GetInstrumentCriteriaRequestBody,
    ): ResponseEntity<GetInstrumentsByCriteriaResponse> {
        val criteria = request.toInstrumentCriteria()
        val instruments = getInstrumentsByCriteria.execute(criteria = criteria)
        val instrumentsDto = instruments.map { it.toDto() }
        return ResponseEntity.ok(instrumentsDto.toRestResponse())
    }
}

fun List<InstrumentDetail>.toRestResponse(): GetInstrumentsByCriteriaResponse {
    return GetInstrumentsByCriteriaResponse(content = this)
}
