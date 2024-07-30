package mu.muse.rest.instruments

import jakarta.annotation.security.RolesAllowed
import mu.muse.domain.instrument.Material
import mu.muse.domain.user.Role
import mu.muse.rest.API_INSTRUMENT_MATERIALS
import mu.muse.usecase.GetInstrumentMaterials
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RestController

@RestController
class GetInstrumentMaterialsEndpoint(
    private val getInstrumentMaterials: GetInstrumentMaterials,
) {

    @RolesAllowed(Role.EDITOR)
    @GetMapping(API_INSTRUMENT_MATERIALS)
    fun getInstrumentBasicMaterials(): List<Material> {
        return getInstrumentMaterials.execute()
    }
}
