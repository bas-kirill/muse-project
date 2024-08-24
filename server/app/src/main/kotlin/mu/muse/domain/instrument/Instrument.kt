package mu.muse.domain.instrument

import mu.muse.common.types.AggregateRoot
import mu.muse.common.types.Version

@Suppress("LongParameterList")
class Instrument internal constructor(
    id: InstrumentId,
    val name: InstrumentName,
    val type: Type,
    val manufacturer: Manufacturer,
    val manufactureDate: ManufacturerDate,
    val releaseDate: ReleaseDate,
    val country: Country,
    val materials: List<Material>,
    val image: InstrumentBase64Photo,
    version: Version,
) : AggregateRoot<InstrumentId>(id, version) {

    companion object {

        @SuppressWarnings("kotlin:S107")
        @Suppress("LongParameterList")
        fun create(
            id: InstrumentId,
            name: InstrumentName,
            type: Type,
            manufacturer: Manufacturer,
            manufactureDate: ManufacturerDate,
            releaseDate: ReleaseDate,
            country: Country,
            materials: List<Material>,
            image: InstrumentBase64Photo,
        ): Instrument {
            return Instrument(
                id = id,
                name = name,
                type = type,
                manufacturer = manufacturer,
                manufactureDate = manufactureDate,
                releaseDate = releaseDate,
                country = country,
                materials = materials,
                image = image,
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
