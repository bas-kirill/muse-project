package mu.muse.rest.instruments

import mu.muse.domain.instrument.Country
import mu.muse.domain.instrument.Instrument
import mu.muse.domain.instrument.InstrumentName
import mu.muse.domain.instrument.ManufacturerDate
import mu.muse.domain.instrument.ManufacturerName
import mu.muse.domain.instrument.Material
import mu.muse.domain.instrument.ReleaseDate
import mu.muse.rest.API_INSTRUMENTS
import mu.muse.usecase.GetInstrumentsByCriteria
import mu.muse.usecase.dto.InstrumentDetails
import org.slf4j.Logger
import org.slf4j.LoggerFactory
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RestController
import java.time.LocalDate

@RestController
class GetInstrumentsByCriteriaEndpoint(
    private val getInstrumentsByCriteria: GetInstrumentsByCriteria,
) {

    companion object {
        val logger: Logger = LoggerFactory.getLogger(GetInstrumentByIdEndpoint::class.java)
    }

    @PostMapping(API_INSTRUMENTS)
    fun getInstruments(@RequestBody request: Request): Collection<InstrumentDetails> {
        val instrumentName = request.instrumentName?.let { InstrumentName.from(it) }
        val instrumentTypes = request.instrumentTypes?.map { Instrument.Type.valueOf(it) }
        val manufacturerNames = request.manufacturerNames?.map { ManufacturerName.from(it) }
        val manufacturerDateFrom = request.manufactureDateFrom?.let { ManufacturerDate.from(it) }
        val manufacturerDateTo = request.manufactureDateTo?.let { ManufacturerDate.from(it) }
        val releaseDateFrom = request.releaseDateFrom?.let { ReleaseDate.from(it) }
        val releaseDateTo = request.releaseDateTo?.let { ReleaseDate.from(it) }
        val countries = request.countries?.map { Country.valueOf(it) }
        val materials = request.materials?.map { Material.valueOf(it) }
        val instrumentDetails = getInstrumentsByCriteria.execute(
            GetInstrumentsByCriteria.Criteria(
                instrumentName = instrumentName,
                instrumentTypes = instrumentTypes,
                manufacturerNames = manufacturerNames,
                manufacturerDateFrom = manufacturerDateFrom,
                manufacturerDateTo = manufacturerDateTo,
                releaseDateFrom = releaseDateFrom,
                releaseDateTo = releaseDateTo,
                countries = countries,
                materials = materials,
            )
        )
        logger.info("Found by criteria `{}` instruments", instrumentDetails.size)
        return instrumentDetails
    }

    data class Request(
        val instrumentName: String?,
        val instrumentTypes: List<String>?,
        val manufacturerNames: List<String>?,
        val manufactureDateFrom: LocalDate?,
        val manufactureDateTo: LocalDate?,
        val releaseDateFrom: LocalDate?,
        val releaseDateTo: LocalDate?,
        val countries: List<String>?,
        val materials: List<String>?,
    )
}
