package mu.muse.domain.instrument

import mu.muse.common.ServerException

enum class Country(val i18nCode: String) {
    CYPRUS(i18nCode = "country.cyprus"),
    GERMANY(i18nCode = "country.germany"),
    RUSSIA(i18nCode = "country.russia"),
    USA(i18nCode = "country.usa");

    companion object {
        fun fromI18nCode(i18nCodeRaw: String?): Country {
            require(!i18nCodeRaw.isNullOrEmpty()) {
                "Country i18n code cannot be null or empty: `${i18nCodeRaw}`"
            }
            return entries.find { it.i18nCode == i18nCodeRaw }
                ?: throw UnknownCountryI18nCode(i18nCodeRaw)
        }

        data class UnknownCountryI18nCode(val i18nCode: String) :
            ServerException("Unknown country i18n code `${i18nCode}`")
    }
}
