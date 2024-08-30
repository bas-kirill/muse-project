package mu.muse.domain.instrument

import mu.muse.common.ServerException

class Manufacturer {

    enum class Type(val i18nCode: String) {
        YAMAHA(i18nCode = "manufacturer.type.yamaha"),
        FENDER(i18nCode = "manufacturer.type.fender"),
        SIGMA(i18nCode = "manufacturer.type.sigma"),
        STEINWAY_AND_SONS(i18nCode = "manufacturer.type.steinway_and_sons");

        companion object {
            fun fromI18nCode(i18nCodeRaw: String): Type {
                return entries.find { it.i18nCode == i18nCodeRaw } ?: throw UnknownManufacturerType(i18nCodeRaw)
            }
        }

        data class UnknownManufacturerType(val i18nCode: String) :
            ServerException("Unknown manufacturer i18n code `${i18nCode}`")
    }

}
