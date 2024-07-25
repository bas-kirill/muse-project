package mu.muse.usecase

import mu.muse.domain.instrument.InstrumentId
import mu.muse.usecase.dto.InstrumentDetails

fun interface GetInstrumentById {
    fun execute(id: InstrumentId): InstrumentDetails?
}
