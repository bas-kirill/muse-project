package mu.muse.usecase

import mu.muse.domain.instrument.Country
import mu.muse.domain.instrument.Instrument
import mu.muse.domain.instrument.InstrumentName
import mu.muse.domain.instrument.ManufacturerDate
import mu.muse.domain.instrument.Manufacturer
import mu.muse.domain.instrument.Material
import mu.muse.domain.instrument.ReleaseDate
import mu.muse.usecase.dto.InstrumentDetails

fun interface GetInstrumentsByCriteria {

    fun execute(criteria: Criteria): Collection<InstrumentDetails>

    data class Criteria(
        val instrumentName: InstrumentName?,
        val instrumentTypes: List<Instrument.Type>?,
        val manufacturers: List<Manufacturer>?,
        val manufacturerDateFrom: ManufacturerDate?,
        val manufacturerDateTo: ManufacturerDate?,
        val releaseDateFrom: ReleaseDate?,
        val releaseDateTo: ReleaseDate?,
        val countries: List<Country>?,
        val materials: List<Material>?,
    )
}
