package mu.muse.rest.instruments

import mu.muse.domain.instrument.Country
import mu.muse.domain.instrument.Instrument
import mu.muse.domain.instrument.InstrumentName
import mu.muse.domain.instrument.ManufacturerName
import mu.muse.rest.API_INSTRUMENTS
import mu.muse.usecase.GetInstrumentsByCriteria
import mu.muse.usecase.dto.InstrumentDetails
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestParam
import org.springframework.web.bind.annotation.RestController
import java.time.Instant

@RestController
class GetInstrumentsByCriteriaEndpoint(
    private val getInstrumentsByCriteria: GetInstrumentsByCriteria,
) {

    @GetMapping(API_INSTRUMENTS)
    fun getInstruments(
        @RequestParam(required = false) name: String?,  // without `required = false` null-safety does not work
        @RequestParam(required = false) type: String?,
        @RequestParam(required = false) manufacturer: String?,
        @RequestParam(required = false) manufacturerDateFrom: Instant?,
        @RequestParam(required = false) manufacturerDateTo: Instant?,
        @RequestParam(required = false) releaseDateFrom: Instant?,
        @RequestParam(required = false) releaseDateTo: Instant?,
        @RequestParam(required = false) country: String?,
        @RequestParam(required = false) basicMaterials: List<String>?,
    ): Collection<InstrumentDetails> {
        val instrumentName = name?.let { InstrumentName.from(it) }
        val instrumentType = type?.let { Instrument.Type.valueOf(it) }
        val manufacturerName = manufacturer?.let { ManufacturerName.from(it) }
        val country = country?.let { Country.valueOf(it) }
        return getInstrumentsByCriteria.execute(
            name = instrumentName,
            type = instrumentType,
            manufacturerName = manufacturerName,
            manufacturerDateFrom = manufacturerDateFrom,
            manufacturerDateTo = manufacturerDateTo,
            releaseDateFrom = releaseDateFrom,
            releaseDateTo = releaseDateTo,
            country = country,
            basicMaterials = basicMaterials)
    }
}
