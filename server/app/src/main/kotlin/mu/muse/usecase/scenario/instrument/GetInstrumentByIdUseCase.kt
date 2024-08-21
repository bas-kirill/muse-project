package mu.muse.usecase.scenario.instrument

import mu.muse.domain.instrument.Instrument
import mu.muse.domain.instrument.InstrumentId
import mu.muse.rest.dto.InstrumentDetail
import mu.muse.usecase.GetInstrumentById
import mu.muse.usecase.access.instrument.InstrumentExtractor
import java.time.LocalDate
import java.time.ZoneId

class GetInstrumentByIdUseCase(
    private val instrumentExtractor: InstrumentExtractor,
) : GetInstrumentById {

    override fun execute(id: InstrumentId): InstrumentDetail? {
        val instrument = instrumentExtractor.findById(id) ?: return null
        return instrument.toDto()
    }
}

fun Instrument.toDto(): InstrumentDetail {
    return InstrumentDetail(
        id = this.id.toLongValue(),
        name = this.name.toStringValue(),
        type = this.type.name,
        manufacturer = this.manufacturer.name,
        manufacturerDate = LocalDate.ofInstant(
            this.manufactureDate.toInstantValue(),
            ZoneId.systemDefault(),
        ).toString(), // e.g.: 2024-09-01
        releaseDate = LocalDate.ofInstant(this.releaseDate.toInstantValue(), ZoneId.systemDefault())
            .toString(), // e.g.: 2024-09-01
        country = this.country.name,
        basicMaterials = this.materials.map { it.name },
    )
}
