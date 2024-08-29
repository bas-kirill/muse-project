package mu.muse.rest.instruments

import jakarta.annotation.security.RolesAllowed
import mu.muse.domain.instrument.Country
import mu.muse.domain.instrument.Instrument
import mu.muse.domain.instrument.InstrumentName
import mu.muse.domain.instrument.InstrumentBase64Photo
import mu.muse.domain.instrument.ManufacturerType
import mu.muse.domain.instrument.ManufacturerDate
import mu.muse.domain.instrument.MaterialType
import mu.muse.domain.instrument.ReleaseDate
import mu.muse.domain.user.Role
import mu.muse.rest.api.CreateInstrumentApi
import mu.muse.rest.dto.CreateInstrumentRequestBody
import mu.muse.usecase.CreateInstrument
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.RestController

@RestController
class CreateInstrumentEndpoint(
    private val createInstrument: CreateInstrument,
): CreateInstrumentApi {

    @RolesAllowed(Role.EDITOR)
    override fun createInstrument(request: CreateInstrumentRequestBody): ResponseEntity<Any> {
        val instrumentName = InstrumentName.from(request.instrumentDetail.instrumentName.instrumentName)
        val instrumentType = Instrument.Type.valueOf(request.instrumentDetail.instrumentTypeCode)
        val manufacturerType = ManufacturerType.from(request.instrumentDetail.manufacturerName.manufacturerName)
        val manufactureDate = ManufacturerDate.from(request.instrumentDetail.manufacturerDate.manufactureDate)
        val releaseDate = ReleaseDate.from(request.instrumentDetail.releaseDate.releaseDate)
        val country = Country.from(request.instrumentDetail.country.country)
        val materialTypes = request.instrumentDetail.basicMaterials.map { MaterialType.from(it.basicMaterial) }
        val photo = InstrumentBase64Photo.from(request.instrumentPhoto.photo)
        createInstrument.execute(
            instrumentName = instrumentName,
            instrumentType = instrumentType,
            manufacturerType = manufacturerType,
            manufactureDate = manufactureDate,
            releaseDate = releaseDate,
            country = country,
            materialTypes = materialTypes,
            photo = photo,
        )
        return ResponseEntity.ok().build()
    }
}
