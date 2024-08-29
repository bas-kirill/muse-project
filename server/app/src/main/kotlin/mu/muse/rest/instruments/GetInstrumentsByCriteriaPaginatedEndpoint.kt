package mu.muse.rest.instruments

import mu.muse.common.persistence.Page
import mu.muse.common.rest.PageRequest
import mu.muse.domain.instrument.Country
import mu.muse.domain.instrument.Instrument
import mu.muse.domain.instrument.InstrumentId
import mu.muse.domain.instrument.InstrumentName
import mu.muse.domain.instrument.ManufacturerType
import mu.muse.domain.instrument.ManufacturerDate
import mu.muse.domain.instrument.MaterialType
import mu.muse.domain.instrument.ReleaseDate
import mu.muse.rest.api.GetInstrumentsByCriteriaPaginatedApi
import mu.muse.rest.dto.GetInstrumentByCriteriaPageResponse
import mu.muse.rest.dto.GetInstrumentsByCriteriaRequestBody
import mu.muse.usecase.GetInstrumentsByCriteriaPaginated
import mu.muse.usecase.access.instrument.InstrumentExtractor
import org.springframework.context.MessageSource
import org.springframework.http.HttpHeaders
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.RestController
import org.springframework.web.context.request.RequestContextHolder
import org.springframework.web.context.request.ServletRequestAttributes
import java.util.Locale

@RestController
class GetInstrumentsByCriteriaPaginatedEndpoint(
    private val getInstrumentsByCriteriaPaginated: GetInstrumentsByCriteriaPaginated,
    private val messageSource: MessageSource,
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

        val request = (RequestContextHolder.getRequestAttributes() as ServletRequestAttributes).request
        val locale = runCatching { Locale.of(request.getHeader(HttpHeaders.ACCEPT_LANGUAGE)) }.getOrElse { Locale.US }
        return ResponseEntity.ok(
            instrumentsPaginated.toRestResponse(messageSource, locale),
        )
    }
}

fun GetInstrumentsByCriteriaRequestBody.toInstrumentCriteria(): InstrumentExtractor.Criteria {
    return InstrumentExtractor.Criteria(
        name = this.instrumentName?.let { InstrumentName.from(it.instrumentName) },
        types = this.instrumentTypes?.map { Instrument.Type.valueOf(it.code) },
        manufacturerTypes = this.manufacturerNames?.map { ManufacturerType.valueOf(it.manufacturerName) },
        manufacturerDateFrom = this.manufactureDateFrom?.let { ManufacturerDate.from(it.manufactureDate) },
        manufacturerDateTo = this.manufactureDateTo?.let { ManufacturerDate.from(it.manufactureDate) },
        releaseDateFrom = this.releaseDateFrom?.let { ReleaseDate.from(it.releaseDate) },
        releaseDateTo = this.releaseDateTo?.let { ReleaseDate.from(it.releaseDate) },
        countries = this.countries?.map { Country.from(it.country) },
        materialTypes = this.materials?.map { MaterialType.from(it.basicMaterial) },
        instrumentIds = this.instrumentIds?.map { InstrumentId.from(it.instrumentId) },
    )
}

fun Page<Instrument>.toRestResponse(
    messageSource: MessageSource,
    locale: Locale,
): GetInstrumentByCriteriaPageResponse {
    return GetInstrumentByCriteriaPageResponse(
        content = this.content.map { it.toDto(messageSource, locale) },
        contentSize = this.contentSize,
        pageSize = this.pageSize,
        pageNumber = this.pageNumber,
        totalElements = this.totalElements,
        totalPages = this.totalPages,
    )
}
