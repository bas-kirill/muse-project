package mu.muse.rest.instruments

import mu.muse.rest.api.EditInstrumentApi
import mu.muse.rest.dto.EditInstrumentRequestBody
import mu.muse.usecase.EditInstrument
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.RestController

@RestController
class EditInstrumentEndpoint(
    private val editInstrument: EditInstrument,
): EditInstrumentApi {

    //    @RolesAllowed(Role.EDITOR)
//    override fun editInstrument(request: EditInstrumentRequestBody): ResponseEntity<Any> {
//        val instrumentId = InstrumentId.from(request.instrumentId.instrumentId)
//        val instrumentName = InstrumentName.from(request.instrumentName.instrumentName)
//        val instrumentType = Instrument.Type.valueOf(request.instrumentType.instrumentType)
//        val manufacturerName = Manufacturer.valueOf(request.manufacturerName.manufacturerName)
//        val manufacturerDate = ManufacturerDate.from(request.manufacturerDate.manufactureDate)
//        val releaseDate = ReleaseDate.from(request.releaseDate.releaseDate)
//        val country = Country.valueOf(request.country.country)
//        val materials = request.materials.map { Material.valueOf(it.basicMaterial) }
//        val photo = InstrumentPhoto.from(request.image.photo.contentAsByteArray)
//        editInstrument.execute(
//            instrumentId = instrumentId,
//            instrumentName = instrumentName,
//            instrumentType = instrumentType,
//            manufacturerName = manufacturerName,
//            manufacturerDate = manufacturerDate,
//            releaseDate = releaseDate,
//            country = country,
//            materials = materials,
//            photo = photo,
//        )
//        return ResponseEntity.ok().build()
//        return ResponseEntity.ok()
//    }
    override fun editInstrument(editInstrumentRequestBody: EditInstrumentRequestBody): ResponseEntity<Any> {
        TODO("Not yet implemented")
    }
}
