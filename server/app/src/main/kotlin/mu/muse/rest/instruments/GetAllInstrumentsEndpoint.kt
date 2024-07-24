package mu.muse.rest.instruments

import mu.muse.rest.API_INSTRUMENTS
import mu.muse.usecase.GetAllInstruments
import mu.muse.usecase.dto.InstrumentDetails
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RestController

@RestController
class GetAllInstrumentsEndpoint(
    private val getAllInstruments: GetAllInstruments,
) {

    @GetMapping(API_INSTRUMENTS)
    fun getInstruments(): Collection<InstrumentDetails> {
        return getAllInstruments.execute()
    }
}
