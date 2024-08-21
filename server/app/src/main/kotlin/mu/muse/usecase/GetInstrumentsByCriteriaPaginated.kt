package mu.muse.usecase

import mu.muse.common.persistence.Page
import mu.muse.common.rest.PageRequest
import mu.muse.rest.dto.InstrumentDetail
import mu.muse.usecase.access.instrument.InstrumentExtractor

fun interface GetInstrumentsByCriteriaPaginated {

    fun execute(
        criteria: InstrumentExtractor.Criteria,
        pageRequest: PageRequest,
    ): Page<InstrumentDetail>
}
