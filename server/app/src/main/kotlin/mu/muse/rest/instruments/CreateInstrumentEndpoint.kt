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
import mu.muse.rest.API_CREATE_INSTRUMENT
import mu.muse.rest.api.CreateInstrumentApi
import mu.muse.rest.dto.CreateInstrumentRequestBody
import mu.muse.usecase.CreateInstrument
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RestController
import java.time.LocalDate

@RestController
class CreateInstrumentEndpoint(
    private val createInstrument: CreateInstrument,
): CreateInstrumentApi {

    @RolesAllowed(Role.EDITOR)
    override fun createInstrument(request: CreateInstrumentRequestBody): ResponseEntity<Any> {
        val instrumentName = InstrumentName.from(request.instrumentName)
        val instrumentType = Instrument.Type.valueOf(request.instrumentType)
        val manufacturer = Manufacturer.valueOf(request.manufacturerName)
        val manufactureDate = ManufacturerDate.from(request.manufacturerDate)
        val releaseDate = ReleaseDate.from(request.releaseDate)
        val country = Country.valueOf(request.country)
        val material = Material.valueOf(request.material)
        createInstrument.execute(
            instrumentName,
            instrumentType,
            manufacturer,
            manufactureDate,
            releaseDate,
            country,
            material,
        )
        return ResponseEntity.ok().build()
    }
}
