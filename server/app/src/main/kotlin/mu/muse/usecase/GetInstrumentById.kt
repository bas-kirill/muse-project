package mu.muse.usecase

import mu.muse.common.types.BusinessError
import mu.muse.domain.instrument.Instrument
import mu.muse.domain.instrument.InstrumentId

fun interface GetInstrumentById {
    fun execute(id: InstrumentId): Instrument
}

sealed class GetInstrumentByIdError : BusinessError {
    data class InstrumentNotFound(val instrumentId: InstrumentId) :
        RuntimeException("Instrument with id `${instrumentId.toLongValue()}` not found")
}
