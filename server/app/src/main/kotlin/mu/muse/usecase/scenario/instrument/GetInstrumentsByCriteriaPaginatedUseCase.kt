package mu.muse.usecase.scenario.instrument

import mu.muse.common.persistence.Page
import mu.muse.common.rest.PageRequest
import mu.muse.usecase.GetInstrumentsByCriteriaPaginated
import mu.muse.usecase.access.instrument.InstrumentExtractor
import mu.muse.usecase.dto.InstrumentDetails
import org.slf4j.Logger
import org.slf4j.LoggerFactory


class GetInstrumentsByCriteriaPaginatedUseCase(
    private val instrumentExtractor: InstrumentExtractor,
) : GetInstrumentsByCriteriaPaginated {

    companion object {
        val logger: Logger = LoggerFactory.getLogger(GetInstrumentsByCriteriaPaginatedUseCase::class.java)
    }

    override fun execute(
        criteria: InstrumentExtractor.Criteria,
        pageRequest: PageRequest,
    ): Page<InstrumentDetails> {
        val instruments = instrumentExtractor.findByCriteria(
            InstrumentExtractor.Criteria(
                name = criteria.name,
                types = criteria.types,
                manufacturers = criteria.manufacturers,
                manufacturerDateFrom = criteria.manufacturerDateFrom,
                manufacturerDateTo = criteria.manufacturerDateTo,
                releaseDateFrom = criteria.releaseDateFrom,
                releaseDateTo = criteria.releaseDateTo,
                countries = criteria.countries,
                materials = criteria.materials,
            ),
            PageRequest(
                pageNumber = pageRequest.pageNumber,
                pageSize = pageRequest.pageSize,
            ),
        )

        logger.info("Extracted '{}' instruments", instruments.contentSize)

        return Page(
            content = instruments.content.map { InstrumentDetails.from(it) },
            contentSize = instruments.contentSize,
            pageSize = instruments.pageSize,
            pageNumber = instruments.pageNumber,
            totalElements = instruments.totalElements,
            totalPages = instruments.totalPages,
        )
    }

}
