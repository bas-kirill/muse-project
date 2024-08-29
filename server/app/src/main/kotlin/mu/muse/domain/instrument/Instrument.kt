package mu.muse.domain.instrument

import mu.muse.common.types.AggregateRoot
import mu.muse.common.types.Version

@Suppress("LongParameterList")
class Instrument internal constructor(
    id: InstrumentId,
    val name: InstrumentName,
    val type: Type,
    val manufacturerType: ManufacturerType,
    val manufactureDate: ManufacturerDate,
    val releaseDate: ReleaseDate,
    val country: Country,
    val materialTypes: List<MaterialType>,
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
            manufacturerType: ManufacturerType,
            manufactureDate: ManufacturerDate,
            releaseDate: ReleaseDate,
            country: Country,
            materialTypes: List<MaterialType>,
            image: InstrumentBase64Photo,
        ): Instrument {
            return Instrument(
                id = id,
                name = name,
                type = type,
                manufacturerType = manufacturerType,
                manufactureDate = manufactureDate,
                releaseDate = releaseDate,
                country = country,
                materialTypes = materialTypes,
                image = image,
                version = Version.new(),
            )
        }
    }

    enum class Type(val i18nCode: String) {
        KEYBOARD(i18nCode = "instrument.type.keyboard"),
        STRINGED(i18nCode = "instrument.type.stringed"),
        WIND(i18nCode = "instrument.type.wind");
    }

}
