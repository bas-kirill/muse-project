package mu.muse.usecase

import mu.muse.domain.instrument.MaterialType

fun interface GetInstrumentMaterials {
    fun execute(): List<MaterialType>
}
