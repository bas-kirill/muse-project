package mu.muse.rest.instruments

import mu.muse.domain.instrument.Instrument
import mu.muse.domain.instrument.InstrumentId
import mu.muse.rest.API_INSTRUMENT_BY_ID
import mu.muse.rest.dto.InstrumentDetail
import mu.muse.usecase.GetInstrumentById
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.RestController
import java.time.LocalDate
import java.time.ZoneId

@RestController
class GetInstrumentByIdEndpoint(
    private val getInstrumentById: GetInstrumentById,
) {

    @GetMapping(API_INSTRUMENT_BY_ID)
    fun getInstrumentById(@PathVariable id: Long): ResponseEntity<*> {
        val instrumentId = InstrumentId.from(id)
        val instrument = getInstrumentById.execute(instrumentId)
        val instrumentDetail = instrument?.toDto()
        return if (instrumentDetail == null) {
            ResponseEntity.internalServerError().body("Not Found")
        } else {
            ResponseEntity.ok().body(instrumentDetail)
        }
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
