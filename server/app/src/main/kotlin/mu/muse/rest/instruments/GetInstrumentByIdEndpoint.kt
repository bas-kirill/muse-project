package mu.muse.rest.instruments

import mu.muse.domain.instrument.Instrument
import mu.muse.domain.instrument.InstrumentId
import mu.muse.rest.api.GetInstrumentByIdApi
import mu.muse.rest.dto.InstrumentDetail
import mu.muse.usecase.GetInstrumentById
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.RestController
import java.time.LocalDate
import java.time.ZoneId

@RestController
class GetInstrumentByIdEndpoint(
    private val getInstrumentById: GetInstrumentById,
) : GetInstrumentByIdApi {

    override fun getInstrumentById(instrumentId: String): ResponseEntity<InstrumentDetail> {
        val id = InstrumentId.from(instrumentId)
        val instrument = getInstrumentById.execute(id)
        val instrumentDetail = instrument.toDto()
        return ResponseEntity.ok().body(instrumentDetail)
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
