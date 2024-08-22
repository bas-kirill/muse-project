package mu.muse.usecase

import mu.muse.domain.instrument.InstrumentId
import mu.muse.rest.dto.InstrumentDetail

fun interface GetInstrumentsByIds {
    fun execute(ids: List<InstrumentId>): List<InstrumentDetail>
}
