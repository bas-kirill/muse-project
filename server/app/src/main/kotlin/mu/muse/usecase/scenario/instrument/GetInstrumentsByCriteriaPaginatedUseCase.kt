package mu.muse.usecase.scenario.instrument

import mu.muse.common.persistence.Page
import mu.muse.common.rest.PageRequest
import mu.muse.domain.instrument.Instrument
import mu.muse.usecase.GetInstrumentsByCriteriaPaginated
import mu.muse.usecase.access.instrument.InstrumentExtractor
import mu.muse.usecase.access.instrument.InstrumentExtractorError
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
    ): Page<Instrument> {
        val instruments = instrumentExtractor.findByCriteria(criteria)
        val chunks = instruments.chunked(pageRequest.pageSize)

        val pageContent = if (chunks.isEmpty()) {
            emptyList()
        } else {
            chunks.getOrNull(pageRequest.pageNumber - 1)  // page numbers indexing starting 1-based
                ?: throw InstrumentExtractorError.PageNotFound(pageNumber = pageRequest.pageNumber)
        }

        logger.info("Extracted '{}' instruments", instruments.size)

        return Page(
            content = pageContent,
            contentSize = pageContent.size.toLong(),
            pageSize = pageRequest.pageSize.toLong(),
            pageNumber = pageRequest.pageNumber.toLong(),
            totalElements = instrumentExtractor.totalElements(),
            totalPages = chunks.size.toLong(),
        )
    }
}
