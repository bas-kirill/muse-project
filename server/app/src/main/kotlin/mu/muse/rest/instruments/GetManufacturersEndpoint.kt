package mu.muse.rest.instruments

import mu.muse.domain.instrument.Manufacturer
import mu.muse.rest.api.GetManufacturersApi
import mu.muse.rest.dto.GetManufacturersResponse
import mu.muse.usecase.GetManufacturers
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.RestController

@RestController
class GetManufacturersEndpoint(
    private val getManufacturers: GetManufacturers,
) : GetManufacturersApi {

    override fun getManufacturers(): ResponseEntity<GetManufacturersResponse> {
        val manufacturers = getManufacturers.execute()
        return manufacturers.toRestResponse()
    }
}

fun List<Manufacturer>.toRestResponse(): ResponseEntity<GetManufacturersResponse> {
    return ResponseEntity.ok(
        GetManufacturersResponse(
            content = this.map { mu.muse.rest.dto.Manufacturer(it.name) },
        ),
    )
}
