package mu.muse.domain.instrument

enum class MaterialType(val realName: String) {
    WOOD(realName = "Wood"),
    METAL(realName = "Metal"),
    STEEL(realName = "Steel"),
    IVORY(realName = "Ivory"),
    EBONY(realName = "Ebony");

    companion object {
        fun from(valueRaw: String): MaterialType {
            return when (valueRaw) {
                WOOD.realName -> WOOD
                METAL.realName -> METAL
                STEEL.realName -> STEEL
                IVORY.realName -> IVORY
                EBONY.realName -> EBONY
                else -> throw IllegalArgumentException("Unknown type: `$valueRaw`")
            }
        }
    }
}
