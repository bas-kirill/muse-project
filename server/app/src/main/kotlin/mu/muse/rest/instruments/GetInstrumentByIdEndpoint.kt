package mu.muse.rest.instruments

import mu.muse.domain.instrument.Country
import mu.muse.domain.instrument.Instrument
import mu.muse.domain.instrument.InstrumentId
import mu.muse.domain.instrument.InstrumentName
import mu.muse.domain.instrument.InstrumentPhoto
import mu.muse.domain.instrument.Manufacturer
import mu.muse.domain.instrument.ManufacturerDate
import mu.muse.domain.instrument.Material
import mu.muse.domain.instrument.ReleaseDate
import mu.muse.rest.api.GetInstrumentByIdApi
import mu.muse.rest.dto.BasicMaterial
import mu.muse.rest.dto.InstrumentDetail
import mu.muse.rest.dto.InstrumentType
import mu.muse.rest.dto.ManufactureDate
import mu.muse.rest.dto.ManufacturerName
import mu.muse.usecase.GetInstrumentById
import org.springframework.core.io.ByteArrayResource
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
fun Instrument.Type.toDto() = InstrumentType(this.name)
fun Manufacturer.toDto() = ManufacturerName(this.name)
fun ManufacturerDate.toDto() = ManufactureDate(LocalDate.ofInstant(this.toInstantValue(), ZoneId.systemDefault()))
fun ReleaseDate.toDto() =
    mu.muse.rest.dto.ReleaseDate(LocalDate.ofInstant(this.toInstantValue(), ZoneId.systemDefault()))

fun Country.toDto() = mu.muse.rest.dto.Country(country = this.name)
fun List<Material>.toDto() = this.map { BasicMaterial(basicMaterial = it.name) }
fun InstrumentPhoto.toDto() = mu.muse.rest.dto.InstrumentPhoto(ByteArrayResource(this.toByteArray()))

fun Instrument.toDto(): InstrumentDetail {
    return InstrumentDetail(
        instrumentId = this.id.toDto(),
        instrumentName = this.name.toDto(),
        instrumentType = this.type.toDto(),
        manufacturerName = this.manufacturer.toDto(),
        manufacturerDate = this.manufactureDate.toDto(),
        releaseDate = this.releaseDate.toDto(),
        country = this.country.toDto(),
        basicMaterials = this.materials.toDto(),
        image = this.image.toDto(),
    )
}
