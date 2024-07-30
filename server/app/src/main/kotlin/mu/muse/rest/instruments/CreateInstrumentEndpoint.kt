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
import mu.muse.usecase.CreateInstrument
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RestController
import java.time.LocalDate

@RestController
class CreateInstrumentEndpoint(
    private val createInstrument: CreateInstrument,
) {

    @RolesAllowed(Role.EDITOR)
    @PostMapping(API_CREATE_INSTRUMENT)
    fun createInstrument(@RequestBody request: Request) {
        val instrumentName = InstrumentName.from(request.instrumentName)
        val instrumentType = Instrument.Type.valueOf(request.instrumentType)
        val manufacturer = Manufacturer.valueOf(request.manufacturerName)
        val manufactureDate = ManufacturerDate.from(request.manufactureDate)
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
    }

    data class Request(
        val instrumentName: String,
        val instrumentType: String,
        val manufacturerName: String,
        val manufactureDate: LocalDate,
        val releaseDate: LocalDate,
        val country: String,
        val material: String,
    )
}
