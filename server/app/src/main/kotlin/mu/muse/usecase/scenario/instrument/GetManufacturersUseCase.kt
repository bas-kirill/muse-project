package mu.muse.usecase.scenario.instrument

import mu.muse.domain.instrument.Manufacturer
import mu.muse.usecase.GetManufacturers

class GetManufacturersUseCase : GetManufacturers {
    override fun execute(): List<Manufacturer> {
        return Manufacturer.entries
    }
}
