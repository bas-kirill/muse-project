package mu.muse.rest.instruments

import jakarta.annotation.security.RolesAllowed
import mu.muse.domain.instrument.Country
import mu.muse.domain.instrument.Instrument
import mu.muse.domain.instrument.InstrumentBase64Photo
import mu.muse.domain.instrument.InstrumentId
import mu.muse.domain.instrument.InstrumentName
import mu.muse.domain.instrument.Manufacturer
import mu.muse.domain.instrument.ManufacturerDate
import mu.muse.domain.instrument.Material
import mu.muse.domain.instrument.ReleaseDate
import mu.muse.domain.user.Role
import mu.muse.rest.api.EditInstrumentApi
import mu.muse.rest.dto.EditInstrumentRequestBody
import mu.muse.usecase.EditInstrument
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.RestController

@RestController
class EditInstrumentEndpoint(
    private val editInstrument: EditInstrument,
) : EditInstrumentApi {

    @RolesAllowed(Role.EDITOR)
    override fun editInstrument(request: EditInstrumentRequestBody): ResponseEntity<Any> {
        val instrumentId = InstrumentId.from(request.instrumentDetail.instrumentId.instrumentId)
        val instrumentName = InstrumentName.from(request.instrumentDetail.instrumentName.instrumentName)
        val instrumentType = Instrument.Type.fromI18nCode(request.instrumentDetail.instrumentType.i18nCode)
        val manufacturerTypeName = Manufacturer.Type.fromI18nCode(request.instrumentDetail.manufacturerType.i18nCode)
        val manufacturerDate = ManufacturerDate.from(request.instrumentDetail.manufacturerDate.manufactureDate)
        val releaseDate = ReleaseDate.from(request.instrumentDetail.releaseDate.releaseDate)
        val country = Country.fromI18nCode(request.instrumentDetail.country.i18nCode)
        val materialTypes = request.instrumentDetail.basicMaterials.map { Material.Type.fromI18nCode(it.i18nCode) }
        val photo = InstrumentBase64Photo.from(request.instrumentPhoto.photo)
        editInstrument.execute(
            instrumentId = instrumentId,
            instrumentName = instrumentName,
            instrumentType = instrumentType,
            manufacturerTypeName = manufacturerTypeName,
            manufacturerDate = manufacturerDate,
            releaseDate = releaseDate,
            country = country,
            materialTypes = materialTypes,
            photo = photo,
        )
        return ResponseEntity.ok().build()
    }
}
