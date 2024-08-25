package mu.muse.usecase.scenario.instrument

import mu.muse.domain.instrument.ManufacturerType
import mu.muse.usecase.GetManufacturers

class GetManufacturersUseCase : GetManufacturers {
    override fun execute(): List<ManufacturerType> {
        return ManufacturerType.entries
    }
}
