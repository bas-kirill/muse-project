package mu.muse.rest.instruments

import mu.muse.domain.instrument.Manufacturer
import mu.muse.rest.API_GET_MANUFACTURER_NAMES
import mu.muse.usecase.GetInstrumentManufacturers
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RestController

@RestController
class GetInstrumentManufacturersEndpoint(
    private val getInstrumentManufacturers: GetInstrumentManufacturers,
) {

    @GetMapping(API_GET_MANUFACTURER_NAMES)
    fun getManufacturers(): List<Manufacturer> {
        return getInstrumentManufacturers.execute()
    }
}
