package mu.muse.usecase

import mu.muse.common.persistence.Page
import mu.muse.common.rest.PageRequest
import mu.muse.usecase.access.instrument.InstrumentExtractor
import mu.muse.usecase.dto.InstrumentDetails

fun interface GetInstrumentsByCriteriaPaginated {

    fun execute(
        criteria: InstrumentExtractor.Criteria,
        pageRequest: PageRequest,
    ): Page<InstrumentDetails>
}
