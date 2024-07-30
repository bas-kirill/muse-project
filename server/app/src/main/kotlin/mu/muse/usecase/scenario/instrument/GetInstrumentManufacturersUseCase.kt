package mu.muse.usecase.scenario.instrument

import mu.muse.domain.instrument.Manufacturer
import mu.muse.usecase.GetInstrumentManufacturers

class GetInstrumentManufacturersUseCase : GetInstrumentManufacturers {
    override fun execute(): List<Manufacturer> {
        return Manufacturer.entries
    }
}
