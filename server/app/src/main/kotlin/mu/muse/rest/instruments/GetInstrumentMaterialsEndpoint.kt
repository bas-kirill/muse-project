package mu.muse.rest.instruments

import mu.muse.domain.instrument.Material
import mu.muse.rest.api.GetInstrumentBasicMaterialsApi
import mu.muse.rest.dto.GetInstrumentBasicMaterialsResponse
import mu.muse.usecase.GetInstrumentMaterials
import org.springframework.context.MessageSource
import org.springframework.http.HttpHeaders
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.RestController
import org.springframework.web.context.request.RequestContextHolder
import org.springframework.web.context.request.ServletRequestAttributes
import java.util.Locale

@RestController
class GetInstrumentMaterialsEndpoint(
    private val getInstrumentMaterials: GetInstrumentMaterials,
    private val messageSource: MessageSource,
) : GetInstrumentBasicMaterialsApi {

    override fun getInstrumentBasicMaterials(): ResponseEntity<GetInstrumentBasicMaterialsResponse> {
        val basicMaterials = getInstrumentMaterials.execute()
        val request = (RequestContextHolder.getRequestAttributes() as ServletRequestAttributes).request
        val locale = Locale.of(request.getHeader(HttpHeaders.ACCEPT_LANGUAGE)) ?: Locale.US
        return basicMaterials.toRestResponse(messageSource, locale)
    }
}

fun List<Material.Type>.toRestResponse(
    messageSource: MessageSource,
    locale: Locale
): ResponseEntity<GetInstrumentBasicMaterialsResponse> {
    return ResponseEntity.ok(
        GetInstrumentBasicMaterialsResponse(
            content = this.map { it.toDto(messageSource, locale) },
        ),
    )
}
