package mu.muse.rest.instruments

import mu.muse.domain.instrument.Country
import mu.muse.domain.instrument.Instrument
import mu.muse.domain.instrument.InstrumentId
import mu.muse.domain.instrument.InstrumentName
import mu.muse.domain.instrument.ManufacturerType
import mu.muse.domain.instrument.ManufacturerDate
import mu.muse.domain.instrument.MaterialType
import mu.muse.domain.instrument.ReleaseDate
import mu.muse.rest.api.GetInstrumentByIdApi
import mu.muse.rest.dto.BasicMaterial
import mu.muse.rest.dto.InstrumentDetail
import mu.muse.rest.dto.InstrumentType
import mu.muse.rest.dto.ManufactureDate
import mu.muse.rest.dto.ManufacturerName
import mu.muse.usecase.GetInstrumentById
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.RestController
import java.time.LocalDate
import java.time.ZoneId

@RestController
class GetInstrumentByIdEndpoint(
    private val getInstrumentById: GetInstrumentById,
) : GetInstrumentByIdApi {

    override fun getInstrumentById(instrumentId: Long): ResponseEntity<InstrumentDetail> {
        val id = InstrumentId.from(instrumentId)
        val instrument = getInstrumentById.execute(id)
        val instrumentDetail = instrument.toDto()
        return ResponseEntity.ok().body(instrumentDetail)
    }
}

fun InstrumentId.toDto() = mu.muse.rest.dto.InstrumentId(instrumentId = this.toLongValue())
fun InstrumentName.toDto() = mu.muse.rest.dto.InstrumentName(instrumentName = this.toStringValue())
fun Instrument.Type.toDto() = InstrumentType(this.realName)
fun ManufacturerType.toDto() = ManufacturerName(this.realName)
fun ManufacturerDate.toDto() = ManufactureDate(LocalDate.ofInstant(this.toInstantValue(), ZoneId.systemDefault()))
fun ReleaseDate.toDto() =
    mu.muse.rest.dto.ReleaseDate(LocalDate.ofInstant(this.toInstantValue(), ZoneId.systemDefault()))

fun Country.toDto() = mu.muse.rest.dto.Country(country = this.realName)
fun List<MaterialType>.toDto() = this.map { BasicMaterial(basicMaterial = it.realName) }


fun Instrument.toDto(): InstrumentDetail {
    return InstrumentDetail(
        instrumentId = this.id.toDto(),
        instrumentName = this.name.toDto(),
        instrumentType = this.type.toDto(),
        manufacturerName = this.manufacturerType.toDto(),
        manufacturerDate = this.manufactureDate.toDto(),
        releaseDate = this.releaseDate.toDto(),
        country = this.country.toDto(),
        basicMaterials = this.materialTypes.toDto(),
    )
}
