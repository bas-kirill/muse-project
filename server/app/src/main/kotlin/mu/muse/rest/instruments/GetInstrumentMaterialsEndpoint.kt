package mu.muse.rest.instruments

import mu.muse.domain.instrument.Material
import mu.muse.rest.api.GetInstrumentBasicMaterialsApi
import mu.muse.rest.dto.GetInstrumentBasicMaterialsResponse
import mu.muse.rest.dto.InstrumentBasicMaterial
import mu.muse.usecase.GetInstrumentMaterials
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.RestController

@RestController
class GetInstrumentMaterialsEndpoint(
    private val getInstrumentMaterials: GetInstrumentMaterials,
) : GetInstrumentBasicMaterialsApi {

    override fun getInstrumentBasicMaterials(): ResponseEntity<GetInstrumentBasicMaterialsResponse> {
        val basicMaterials = getInstrumentMaterials.execute()
        return basicMaterials.toResponse()
    }
}

fun List<Material>.toResponse(): ResponseEntity<GetInstrumentBasicMaterialsResponse> {
    return ResponseEntity.ok(GetInstrumentBasicMaterialsResponse(content = this.map {
        InstrumentBasicMaterial(it.name)
    }))
}
