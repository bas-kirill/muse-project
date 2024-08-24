package mu.muse.usecase

import mu.muse.common.types.BusinessError
import mu.muse.domain.instrument.InstrumentId
import mu.muse.domain.instrument.InstrumentBase64Photo

fun interface GetInstrumentPhoto {
    fun execute(id: InstrumentId): InstrumentBase64Photo
}

sealed class GetInstrumentPhotoError : BusinessError {
    data class InstrumentNotFoundException(val id: InstrumentId) :
        RuntimeException("Instrument with id=`${id.toLongValue()}` not found")
}
