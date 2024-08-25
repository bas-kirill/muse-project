package mu.muse.domain.instrument

enum class Country(val realName: String) {
    CYPRUS(realName = "Cyprus"),
    GERMANY(realName = "Germany"),
    RUSSIA(realName = "Russia"),
    USA(realName = "USA");

    companion object {
        fun from(valueRaw: String): Country {
            return when(valueRaw) {
                CYPRUS.realName -> CYPRUS
                GERMANY.realName -> GERMANY
                RUSSIA.realName -> RUSSIA
                USA.realName -> USA
                else -> throw IllegalArgumentException("Unknown value `${valueRaw}")
            }
        }
    }
}
