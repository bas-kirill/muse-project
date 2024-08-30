package mu.muse.usecase.scenario.instrument

import mu.muse.domain.instrument.Material
import mu.muse.usecase.GetInstrumentMaterials

class GetInstrumentMaterialsUseCase : GetInstrumentMaterials {
    override fun execute(): List<Material.Type> {
        return Material.Type.entries
    }
}
