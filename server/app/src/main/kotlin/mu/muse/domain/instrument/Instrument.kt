package mu.muse.domain.instrument

import mu.muse.common.types.AggregateRoot
import mu.muse.common.types.Version
import mu.muse.domain.IdGenerator
import java.time.Instant

@Suppress("LongParameterList")
class Instrument internal constructor(
    id: InstrumentId,
    val name: InstrumentName,
    val type: Type,
    val manufacturer: String,
    val manufactureDate: Instant,
    val releaseDate: Instant,
    val country: Country,
    val materials: List<Material>,
    version: Version,
) : AggregateRoot<InstrumentId>(id, version) {

    companion object {

        @Suppress("LongParameterList")
        fun create(
            idGenerator: IdGenerator<InstrumentId>,
            name: InstrumentName,
            type: Type,
            manufacturer: String,
            manufactureDate: Instant,
            releaseDate: Instant,
            country: Country,
            materials: List<Material>
        ): Instrument {
            return Instrument(
                id = idGenerator.generate(),
                name = name,
                type = type,
                manufacturer = manufacturer,
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
