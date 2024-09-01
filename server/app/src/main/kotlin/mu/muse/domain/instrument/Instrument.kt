package mu.muse.domain.instrument

import mu.muse.common.ServerException
import mu.muse.common.types.AggregateRoot
import mu.muse.common.types.Version

@Suppress("LongParameterList")
class Instrument internal constructor(
    id: InstrumentId,
    val name: InstrumentName,
    val type: Type,
    val manufacturerType: Manufacturer.Type,
    val manufactureDate: ManufacturerDate,
    val releaseDate: ReleaseDate,
    val country: Country,
    val materialTypes: List<Material.Type>,
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
            manufacturerType: Manufacturer.Type,
            manufactureDate: ManufacturerDate,
            releaseDate: ReleaseDate,
            country: Country,
            materialTypes: List<Material.Type>,
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

        companion object {
            fun fromI18nCode(i18nCodeRaw: String?): Type {
                require(!i18nCodeRaw.isNullOrEmpty()) {
                    "Instrument i18n code cannot be null or empty: `${i18nCodeRaw}`"
                }
                return entries.find { it.i18nCode == i18nCodeRaw } ?: throw UnknownInstrumentI18nCodeType(i18nCodeRaw)
            }
        }

        data class UnknownInstrumentI18nCodeType(val i18nCodeRaw: String) :
            ServerException("Unknown i18n code `${i18nCodeRaw}`")
    }

}
