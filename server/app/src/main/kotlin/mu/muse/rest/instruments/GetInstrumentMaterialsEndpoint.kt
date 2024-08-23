package mu.muse.rest.instruments

import mu.muse.domain.instrument.Material
import mu.muse.rest.api.GetInstrumentBasicMaterialsApi
import mu.muse.rest.dto.BasicMaterial
import mu.muse.rest.dto.GetInstrumentBasicMaterialsResponse
import mu.muse.usecase.GetInstrumentMaterials
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.RestController

@RestController
class GetInstrumentMaterialsEndpoint(
    private val getInstrumentMaterials: GetInstrumentMaterials,
) : GetInstrumentBasicMaterialsApi {

    override fun getInstrumentBasicMaterials(): ResponseEntity<GetInstrumentBasicMaterialsResponse> {
        val basicMaterials = getInstrumentMaterials.execute()
        return basicMaterials.toRestResponse()
    }
}

fun List<Material>.toRestResponse(): ResponseEntity<GetInstrumentBasicMaterialsResponse> {
    return ResponseEntity.ok(
        GetInstrumentBasicMaterialsResponse(
            content = this.map { BasicMaterial(basicMaterial = it.name) },
        ),
    )
}
