package mu.muse.rest.instruments

import jakarta.annotation.security.RolesAllowed
import mu.muse.domain.instrument.Country
import mu.muse.domain.instrument.Instrument
import mu.muse.domain.instrument.InstrumentId
import mu.muse.domain.instrument.InstrumentName
import mu.muse.domain.instrument.Manufacturer
import mu.muse.domain.instrument.ManufacturerDate
import mu.muse.domain.instrument.Material
import mu.muse.domain.instrument.ReleaseDate
import mu.muse.domain.user.Role
import mu.muse.rest.API_EDIT_INSTRUMENT
import mu.muse.rest.api.EditInstrumentApi
import mu.muse.rest.dto.EditInstrumentRequestBody
import mu.muse.usecase.EditInstrument
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RestController
import java.time.LocalDate

@RestController
class EditInstrumentEndpoint(
    private val editInstrument: EditInstrument,
): EditInstrumentApi {

    @RolesAllowed(Role.EDITOR)
    override fun editInstrument(request: EditInstrumentRequestBody): ResponseEntity<Any> {
        val instrumentId = InstrumentId.from(request.instrumentId.toString())
        val instrumentName = InstrumentName.from(request.instrumentName)
        val instrumentType = Instrument.Type.valueOf(request.instrumentType)
        val manufacturerName = Manufacturer.valueOf(request.manufacturerName)
        val manufacturerDate = ManufacturerDate.from(request.manufacturerDate)
        val releaseDate = ReleaseDate.from(request.releaseDate)
        val country = Country.valueOf(request.country)
        val materials = request.materials.map { Material.valueOf(it) }
        editInstrument.execute(
            instrumentId,
            instrumentName,
            instrumentType,
            manufacturerName,
            manufacturerDate,
            releaseDate,
            country,
            materials,
        )
        return ResponseEntity.ok().build()
    }
}
