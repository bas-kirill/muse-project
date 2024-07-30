package mu.muse.usecase.dto

import mu.muse.domain.instrument.Instrument
import java.time.LocalDate
import java.time.ZoneId

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
                manufacturerDate = LocalDate.ofInstant(
                    instrument.manufactureDate.toInstantValue(),
                    ZoneId.systemDefault()
                ).toString(), // e.g.: 2024-09-01
                releaseDate = LocalDate.ofInstant(instrument.releaseDate.toInstantValue(), ZoneId.systemDefault())
                    .toString(), // e.g.: 2024-09-01
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
