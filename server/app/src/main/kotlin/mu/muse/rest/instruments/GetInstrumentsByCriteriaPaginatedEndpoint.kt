package mu.muse.rest.instruments

import mu.muse.common.persistence.Page
import mu.muse.common.rest.PageRequest
import mu.muse.domain.instrument.Country
import mu.muse.domain.instrument.Instrument
import mu.muse.domain.instrument.InstrumentId
import mu.muse.domain.instrument.InstrumentName
import mu.muse.domain.instrument.Manufacturer
import mu.muse.domain.instrument.ManufacturerDate
import mu.muse.domain.instrument.Material
import mu.muse.domain.instrument.ReleaseDate
import mu.muse.rest.api.GetInstrumentsByCriteriaPaginatedApi
import mu.muse.rest.dto.GetInstrumentByCriteriaPageResponse
import mu.muse.rest.dto.GetInstrumentsByCriteriaRequestBody
import mu.muse.usecase.GetInstrumentsByCriteriaPaginated
import mu.muse.usecase.access.instrument.InstrumentExtractor
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.RestController

@RestController
class GetInstrumentsByCriteriaPaginatedEndpoint(
    private val getInstrumentsByCriteriaPaginated: GetInstrumentsByCriteriaPaginated,
) : GetInstrumentsByCriteriaPaginatedApi {

    override fun getInstrumentsByCriteriaPaginated(
        pageSize: Int,
        pageNumber: Int,
        request: GetInstrumentsByCriteriaRequestBody,
    ): ResponseEntity<GetInstrumentByCriteriaPageResponse> {
        val criteria = request.toInstrumentCriteria()

        val pageRequest = PageRequest(
            pageSize = pageSize,
            pageNumber = pageNumber,
        )

        val instrumentsPaginated = getInstrumentsByCriteriaPaginated.execute(
            criteria = criteria,
            pageRequest = pageRequest,
        )

        return ResponseEntity.ok(
            instrumentsPaginated.toRestResponse(),
        )
    }
}

fun GetInstrumentsByCriteriaRequestBody.toInstrumentCriteria(): InstrumentExtractor.Criteria {
    return InstrumentExtractor.Criteria(
        name = this.instrumentName?.let { InstrumentName.from(it.instrumentName) },
        types = this.instrumentTypes?.map { Instrument.Type.valueOf(it.instrumentType) },
        manufacturers = this.manufacturerNames?.map { Manufacturer.valueOf(it.manufacturerName) },
        manufacturerDateFrom = this.manufactureDateFrom?.let { ManufacturerDate.from(it.manufactureDate) },
        manufacturerDateTo = this.manufactureDateTo?.let { ManufacturerDate.from(it.manufactureDate) },
        releaseDateFrom = this.releaseDateFrom?.let { ReleaseDate.from(it.releaseDate) },
        releaseDateTo = this.releaseDateTo?.let { ReleaseDate.from(it.releaseDate) },
        countries = this.countries?.map { Country.valueOf(it.country) },
        materials = this.materials?.map { Material.valueOf(it.basicMaterial) },
        instrumentIds = this.instrumentIds?.map { InstrumentId.from(it.toString()) },
    )
}

fun Page<Instrument>.toRestResponse(): GetInstrumentByCriteriaPageResponse {
    return GetInstrumentByCriteriaPageResponse(
        content = this.content.map { it.toDto() },
        contentSize = this.contentSize,
        pageSize = this.pageSize,
        pageNumber = this.pageNumber,
        totalElements = this.totalElements,
        totalPages = this.totalPages,
    )
}
