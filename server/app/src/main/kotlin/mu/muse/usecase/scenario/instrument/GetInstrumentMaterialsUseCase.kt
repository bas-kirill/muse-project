package mu.muse.usecase.scenario.instrument

import mu.muse.domain.instrument.MaterialType
import mu.muse.usecase.GetInstrumentMaterials

class GetInstrumentMaterialsUseCase : GetInstrumentMaterials {
    override fun execute(): List<MaterialType> {
        return MaterialType.entries
    }
}
