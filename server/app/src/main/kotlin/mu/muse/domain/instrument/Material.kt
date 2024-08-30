package mu.muse.domain.instrument

import mu.muse.common.ServerException

class Material {

    enum class Type(val i18nCode: String) {
        WOOD(i18nCode = "material.type.wood"),
        METAL(i18nCode = "material.type.metal"),
        STEEL(i18nCode = "material.type.steel"),
        IVORY(i18nCode = "material.type.ivory"),
        EBONY(i18nCode = "material.type.ebony");

        companion object {
            fun fromI18nCode(i18nCodeRaw: String): Type {
                return entries.find { it.i18nCode == i18nCodeRaw } ?:
                    throw UnknownMaterialTypeI18nCode(i18nCodeRaw)
            }
        }

        data class UnknownMaterialTypeI18nCode(val i18nCodeRaw: String) :
            ServerException("Unknown material type for i18n code `${i18nCodeRaw}`")
    }
}
