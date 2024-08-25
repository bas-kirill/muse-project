package mu.muse.domain.instrument

enum class ManufacturerType(val realName: String) {
    YAMAHA(realName = "Yamaha"),
    FENDER(realName = "Fender"),
    SIGMA(realName = "Sigma"),
    STEINWAY_AND_SONS(realName = "Steinway & Sons");

    companion object {
        fun from(valueRaw: String): ManufacturerType {
            return when(valueRaw) {
                YAMAHA.realName -> YAMAHA
                FENDER.realName -> FENDER
                SIGMA.realName -> SIGMA
                STEINWAY_AND_SONS.realName -> STEINWAY_AND_SONS
                else -> throw IllegalArgumentException("Unknown manufacturer type: `${valueRaw}")
            }
        }
    }
}
