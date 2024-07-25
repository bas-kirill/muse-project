package mu.muse.domain.instrument

import mu.muse.common.types.AggregateRoot
import mu.muse.common.types.Version
import mu.muse.domain.IdGenerator

@Suppress("LongParameterList")
class Instrument internal constructor(
    id: InstrumentId,
    val name: InstrumentName,
    val type: Type,
    val manufacturerName: ManufacturerName,
    val manufactureDate: ManufacturerDate,
    val releaseDate: ReleaseDate,
    val country: Country,
    val materials: List<Material>,
    version: Version,
) : AggregateRoot<InstrumentId>(id, version) {

    companion object {

        @SuppressWarnings("kotlin:S107")
        @Suppress("LongParameterList")
        fun create(
            idGenerator: IdGenerator<InstrumentId>,
            name: InstrumentName,
            type: Type,
            manufacturerName: ManufacturerName,
            manufactureDate: ManufacturerDate,
            releaseDate: ReleaseDate,
            country: Country,
            materials: List<Material>
        ): Instrument {
            return Instrument(
                id = idGenerator.generate(),
                name = name,
                type = type,
                manufacturerName = manufacturerName,
                manufactureDate = manufactureDate,
                releaseDate = releaseDate,
                country = country,
                materials = materials,
                version = Version.new(),
            )
        }
    }

    enum class Type {
        KEYBOARD,
        STRINGED,
        WIND,
    }

}
