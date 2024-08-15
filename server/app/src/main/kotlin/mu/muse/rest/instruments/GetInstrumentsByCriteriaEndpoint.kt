package mu.muse.rest.instruments

import mu.muse.common.rest.PageRequest
import mu.muse.domain.instrument.Country
import mu.muse.domain.instrument.Instrument
import mu.muse.domain.instrument.InstrumentId
import mu.muse.domain.instrument.InstrumentName
import mu.muse.domain.instrument.Manufacturer
import mu.muse.domain.instrument.ManufacturerDate
import mu.muse.domain.instrument.Material
import mu.muse.domain.instrument.ReleaseDate
import mu.muse.rest.API_INSTRUMENTS
import mu.muse.usecase.GetInstrumentsByCriteria
import mu.muse.usecase.GetInstrumentsByCriteriaPaginated
import mu.muse.usecase.access.instrument.InstrumentExtractor
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestParam
import org.springframework.web.bind.annotation.RestController
import java.time.LocalDate

@RestController
class GetInstrumentsByCriteriaEndpoint(
    private val getInstrumentsByCriteria: GetInstrumentsByCriteria,
    private val getInstrumentsByCriteriaPaginated: GetInstrumentsByCriteriaPaginated,
) {

    @PostMapping(API_INSTRUMENTS)
    fun getInstruments(
        @RequestParam(required = false) pageSize: Int?,
        @RequestParam(required = false) pageNumber: Int?,
        @RequestBody request: Request,
    ): Any {
        val instrumentName = request.instrumentName?.let { InstrumentName.from(it) }
        val instrumentTypes = request.instrumentTypes?.map { Instrument.Type.valueOf(it) }
        val manufacturers = request.manufacturerNames?.map { Manufacturer.valueOf(it) }
        val manufacturerDateFrom = request.manufactureDateFrom?.let { ManufacturerDate.from(it) }
        val manufacturerDateTo = request.manufactureDateTo?.let { ManufacturerDate.from(it) }
        val releaseDateFrom = request.releaseDateFrom?.let { ReleaseDate.from(it) }
        val releaseDateTo = request.releaseDateTo?.let { ReleaseDate.from(it) }
        val countries = request.countries?.map { Country.valueOf(it) }
        val materials = request.materials?.map { Material.valueOf(it) }
        val instrumentIds = request.instrumentIds?.map { InstrumentId.from(it) }

        val criteria = InstrumentExtractor.Criteria(
            name = instrumentName,
            types = instrumentTypes,
            manufacturers = manufacturers,
            manufacturerDateFrom = manufacturerDateFrom,
            manufacturerDateTo = manufacturerDateTo,
            releaseDateFrom = releaseDateFrom,
            releaseDateTo = releaseDateTo,
            countries = countries,
            materials = materials,
            instrumentIds = instrumentIds,
        )

        return if (pageSize == null && pageNumber == null) {
            getInstrumentsByCriteria.execute(criteria = criteria)
        } else if ((pageSize == null) xor (pageNumber == null)) {
            return ResponseEntity.internalServerError().body("Incorrect page request params")
        } else {
            val pageRequest = PageRequest(
                pageSize = pageSize!!,
                pageNumber = pageNumber!!,
            )
            getInstrumentsByCriteriaPaginated.execute(criteria = criteria, pageRequest = pageRequest)
        }
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
        val instrumentIds: Set<Long>?,
    )

}
