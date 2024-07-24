package mu.muse.usecase

import mu.muse.usecase.dto.InstrumentDetails

fun interface GetAllInstruments {
    fun execute(): Collection<InstrumentDetails>
}
