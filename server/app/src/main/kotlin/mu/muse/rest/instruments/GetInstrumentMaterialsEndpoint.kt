package mu.muse.rest.instruments

import mu.muse.domain.instrument.Material
import mu.muse.rest.API_INSTRUMENT_MATERIALS
import mu.muse.usecase.GetInstrumentMaterials
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RestController

@RestController
class GetInstrumentMaterialsEndpoint(
    private val getInstrumentMaterials: GetInstrumentMaterials,
) {

    @GetMapping(API_INSTRUMENT_MATERIALS)
    fun getInstrumentBasicMaterials(): List<Material> {
        return getInstrumentMaterials.execute()
    }
}
