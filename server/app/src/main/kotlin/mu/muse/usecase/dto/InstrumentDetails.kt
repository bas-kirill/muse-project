package mu.muse.usecase.dto

import mu.muse.domain.instrument.Instrument

data class InstrumentDetails(
    val id: Long,
    val name: String,
    val type: String,
    val manufacturer: String,
    val manufacturerDate: String,
    val releaseDate: String,
    val country: String,
    val basicMaterials: List<String>,
) {
    companion object {
        fun from(instrument: Instrument): InstrumentDetails {
            return InstrumentDetails(
                id = instrument.id.toLongValue(),
                name = instrument.name.toStringValue(),
                type = instrument.type.name,
                manufacturer = instrument.manufacturer.name,
                manufacturerDate = instrument.manufactureDate.toInstantValue().toString(),
                releaseDate = instrument.releaseDate.toInstantValue().toString(),
                country = instrument.country.name,
                basicMaterials = instrument.materials.map { it.name },
            )
        }
    }
}


/**
 * Прошу тебя только себе не лги
 * Ты пол меня, я пол тебя, но мы не целое
 * И не друзья и не враги
 * Я твой недостаток, ты моя Вселенная
 * Прошу тебя только себе не лги
 * Ты пол меня, я пол тебя, но мы не целое
 * И не друзья и не враги
 * Я твой недостаток, ты моя Вселенная
 *
 * (c) Баста & Тати, Universe
 */
