package mu.muse.rest.instruments

import jakarta.annotation.security.RolesAllowed
import mu.muse.domain.instrument.Country
import mu.muse.domain.instrument.Instrument
import mu.muse.domain.instrument.InstrumentName
import mu.muse.domain.instrument.ManufacturerDate
import mu.muse.domain.instrument.Manufacturer
import mu.muse.domain.instrument.Material
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
        val instrumentName = InstrumentName.from(request.instrumentName.instrumentName)
        val instrumentType = Instrument.Type.valueOf(request.instrumentType.instrumentType)
        val manufacturer = Manufacturer.valueOf(request.manufacturerName.manufacturerName)
        val manufactureDate = ManufacturerDate.from(request.manufacturerDate.manufactureDate)
        val releaseDate = ReleaseDate.from(request.releaseDate.releaseDate)
        val country = Country.valueOf(request.country.country)
        val materials = request.materials.map { Material.valueOf(it.basicMaterial) }
        createInstrument.execute(
            instrumentName,
            instrumentType,
            manufacturer,
            manufactureDate,
            releaseDate,
            country,
            materials,
        )
        return ResponseEntity.ok().build()
    }
}
