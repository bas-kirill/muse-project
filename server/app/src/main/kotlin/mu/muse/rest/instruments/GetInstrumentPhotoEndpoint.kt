package mu.muse.rest.instruments

import mu.muse.domain.instrument.InstrumentId
import mu.muse.rest.api.GetInstrumentPhotoApi
import mu.muse.rest.dto.InstrumentPhoto
import mu.muse.usecase.GetInstrumentPhoto
import org.springframework.http.ResponseEntity

class GetInstrumentPhotoEndpoint(
    private val getInstrumentPhoto: GetInstrumentPhoto,
) : GetInstrumentPhotoApi {

    override fun getInstrumentPhoto(instrumentId: Long): ResponseEntity<InstrumentPhoto> {
        val id = InstrumentId.from(instrumentId)
        val instrumentPhoto = getInstrumentPhoto.execute(id)
        return ResponseEntity.ok(InstrumentPhoto(photo = instrumentPhoto.toStringValue()))
    }
}
