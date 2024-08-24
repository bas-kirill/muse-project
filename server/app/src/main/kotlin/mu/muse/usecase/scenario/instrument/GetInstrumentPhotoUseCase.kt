package mu.muse.usecase.scenario.instrument

import mu.muse.domain.instrument.InstrumentId
import mu.muse.domain.instrument.InstrumentBase64Photo
import mu.muse.usecase.GetInstrumentPhoto
import mu.muse.usecase.GetInstrumentPhotoError
import mu.muse.usecase.access.instrument.InstrumentExtractor

class GetInstrumentPhotoUseCase(
    private val instrumentExtractor: InstrumentExtractor,
) : GetInstrumentPhoto {

    override fun execute(id: InstrumentId): InstrumentBase64Photo {
        val instrument = instrumentExtractor.findById(id)
            ?: throw GetInstrumentPhotoError.InstrumentNotFoundException(id)
        return instrument.image
    }
}
