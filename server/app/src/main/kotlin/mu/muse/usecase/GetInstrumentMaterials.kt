package mu.muse.usecase

import mu.muse.domain.instrument.Material

fun interface GetInstrumentMaterials {
    fun execute(): List<Material.Type>
}
