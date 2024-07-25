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
    fun getInstruments(@RequestParam(required = false) criteria: Criteria): Collection<InstrumentDetails> {
        val instrumentName = criteria.name?.let { InstrumentName.from(it) }
        val instrumentType = criteria.type?.let { Instrument.Type.valueOf(it) }
        val manufacturerName = criteria.manufacturer?.let { ManufacturerName.from(it) }
        val country = criteria.country?.let { Country.valueOf(it) }
        return getInstrumentsByCriteria.execute(
            GetInstrumentsByCriteria.Criteria(
                name = instrumentName,
                type = instrumentType,
                manufacturerName = manufacturerName,
                manufacturerDateFrom = criteria.manufacturerDateFrom,
                manufacturerDateTo = criteria.manufacturerDateTo,
                releaseDateFrom = criteria.releaseDateFrom,
                releaseDateTo = criteria.releaseDateTo,
                country = country,
                basicMaterials = criteria.basicMaterials,
            ),
        )
    }

    data class Criteria(
        val name: String?,
        val type: String?,
        val manufacturer: String?,
        val manufacturerDateFrom: Instant?,
        val manufacturerDateTo: Instant?,
        val releaseDateFrom: Instant?,
        val releaseDateTo: Instant?,
        val country: String?,
        val basicMaterials: List<String>?,
    )
}
