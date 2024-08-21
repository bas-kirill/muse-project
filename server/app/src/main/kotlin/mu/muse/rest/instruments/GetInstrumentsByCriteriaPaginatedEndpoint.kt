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
import mu.muse.rest.dto.GetInstrumentCriteriaRequestBody
import mu.muse.rest.dto.InstrumentDetail
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
        request: GetInstrumentCriteriaRequestBody,
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
            instrumentsPaginated.toResponse(),
        )
    }
}

fun GetInstrumentCriteriaRequestBody.toInstrumentCriteria(): InstrumentExtractor.Criteria {
    return InstrumentExtractor.Criteria(
        name = this.instrumentName?.let { InstrumentName.from(it) },
        types = this.instrumentTypes?.map { Instrument.Type.valueOf(it) },
        manufacturers = this.manufacturerNames?.map { Manufacturer.valueOf(it) },
        manufacturerDateFrom = this.manufactureDateFrom?.let { ManufacturerDate.from(it) },
        manufacturerDateTo = this.manufactureDateTo?.let { ManufacturerDate.from(it) },
        releaseDateFrom = this.releaseDateFrom?.let { ReleaseDate.from(it) },
        releaseDateTo = this.releaseDateTo?.let { ReleaseDate.from(it) },
        countries = this.countries?.map { Country.valueOf(it) },
        materials = this.materials?.map { Material.valueOf(it) },
        instrumentIds = this.instrumentIds?.map { InstrumentId.from(it) },
    )
}

fun Page<InstrumentDetail>.toResponse(): GetInstrumentByCriteriaPageResponse {
    return GetInstrumentByCriteriaPageResponse(
        content = this.content,
        contentSize = this.contentSize,
        pageSize = this.pageSize,
        pageNumber = this.pageNumber,
        totalElements = this.totalElements,
        totalPages = this.totalPages,
    )
}
