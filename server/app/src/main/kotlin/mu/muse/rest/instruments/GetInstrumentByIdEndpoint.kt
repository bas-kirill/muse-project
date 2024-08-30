package mu.muse.rest.instruments

import mu.muse.domain.instrument.Country
import mu.muse.domain.instrument.Instrument
import mu.muse.domain.instrument.InstrumentId
import mu.muse.domain.instrument.InstrumentName
import mu.muse.domain.instrument.Manufacturer
import mu.muse.domain.instrument.ManufacturerDate
import mu.muse.domain.instrument.Material
import mu.muse.domain.instrument.ReleaseDate
import mu.muse.rest.api.GetInstrumentByIdApi
import mu.muse.rest.dto.BasicMaterial
import mu.muse.rest.dto.InstrumentDetail
import mu.muse.rest.dto.ManufactureDate
import mu.muse.rest.dto.ManufactureType
import mu.muse.usecase.GetInstrumentById
import org.springframework.context.MessageSource
import org.springframework.http.HttpHeaders
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.RestController
import org.springframework.web.context.request.RequestContextHolder
import org.springframework.web.context.request.ServletRequestAttributes
import java.time.LocalDate
import java.time.ZoneId
import java.util.Locale

@RestController
class GetInstrumentByIdEndpoint(
    private val getInstrumentById: GetInstrumentById,
    private val messageSource: MessageSource,
) : GetInstrumentByIdApi {

    override fun getInstrumentById(instrumentId: Long): ResponseEntity<InstrumentDetail> {
        val id = InstrumentId.from(instrumentId)
        val instrument = getInstrumentById.execute(id)
        val request = (RequestContextHolder.getRequestAttributes() as ServletRequestAttributes).request
        val locale = Locale.of(request.getHeader(HttpHeaders.ACCEPT_LANGUAGE))
        val instrumentDetail = instrument.toDto(messageSource, locale)
        return ResponseEntity.ok().body(instrumentDetail)
    }
}

fun InstrumentId.toDto() = mu.muse.rest.dto.InstrumentId(instrumentId = this.toLongValue())
fun InstrumentName.toDto() = mu.muse.rest.dto.InstrumentName(instrumentName = this.toStringValue())
fun Instrument.Type.toDto(messageSource: MessageSource, locale: Locale) = mu.muse.rest.dto.InstrumentType(
    i18nCode = this.i18nCode,
    localizedText = messageSource.getMessage(this.i18nCode, null, locale),
)

fun Manufacturer.Type.toDto(messageSource: MessageSource, locale: Locale) = ManufactureType(
    i18nCode = this.i18nCode,
    localizedMessage = messageSource.getMessage(this.i18nCode, null, locale),
)

fun ManufacturerDate.toDto() = ManufactureDate(LocalDate.ofInstant(this.toInstantValue(), ZoneId.systemDefault()))
fun ReleaseDate.toDto() =
    mu.muse.rest.dto.ReleaseDate(LocalDate.ofInstant(this.toInstantValue(), ZoneId.systemDefault()))

fun Country.toDto(messageSource: MessageSource, locale: Locale) = mu.muse.rest.dto.Country(
    i18nCode = this.i18nCode,
    localizedText = messageSource.getMessage(this.i18nCode, null, locale),
)

fun Material.Type.toDto(messageSource: MessageSource, locale: Locale) = BasicMaterial(
    i18nCode = this.i18nCode,
    localizedText = messageSource.getMessage(this.i18nCode, null, locale),
)


fun Instrument.toDto(messageSource: MessageSource, locale: Locale): InstrumentDetail {
    return InstrumentDetail(
        instrumentId = this.id.toDto(),
        instrumentName = this.name.toDto(),
        instrumentType = this.type.toDto(messageSource, locale),
        manufacturerType = this.manufacturerType.toDto(messageSource, locale),
        manufacturerDate = this.manufactureDate.toDto(),
        releaseDate = this.releaseDate.toDto(),
        country = this.country.toDto(messageSource, locale),
        basicMaterials = this.materialTypes.map { it.toDto(messageSource, locale) },
    )
}
