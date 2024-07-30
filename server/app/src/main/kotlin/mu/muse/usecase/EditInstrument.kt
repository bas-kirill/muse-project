package mu.muse.usecase

import mu.muse.common.types.BusinessError
import mu.muse.domain.instrument.Country
import mu.muse.domain.instrument.Instrument
import mu.muse.domain.instrument.InstrumentId
import mu.muse.domain.instrument.InstrumentName
import mu.muse.domain.instrument.Manufacturer
import mu.muse.domain.instrument.ManufacturerDate
import mu.muse.domain.instrument.Material
import mu.muse.domain.instrument.ReleaseDate

fun interface EditInstrument {

    @Suppress("LongParameterList")
    @SuppressWarnings("kotlin:S107")
    fun execute(
        instrumentId: InstrumentId,
        instrumentName: InstrumentName,
        instrumentType: Instrument.Type,
        manufacturerName: Manufacturer,
        manufacturerDate: ManufacturerDate,
        releaseDate: ReleaseDate,
        country: Country,
        material: Material,
    )
}

sealed class EditInstrumentError : BusinessError {
    data class UserNotFound(val id: InstrumentId) :
        RuntimeException("Instrument with ID `${id.toLongValue()}` not found")
}
