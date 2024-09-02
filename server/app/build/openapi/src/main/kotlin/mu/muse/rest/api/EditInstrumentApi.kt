/**
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech) (7.8.0).
 * https://openapi-generator.tech
 * Do not edit the class manually.
*/
package mu.muse.rest.api

import mu.muse.rest.dto.ClientError
import mu.muse.rest.dto.EditInstrumentRequestBody
import mu.muse.rest.dto.ServerError
import org.springframework.http.HttpStatus
import org.springframework.http.MediaType
import org.springframework.http.ResponseEntity

import org.springframework.web.bind.annotation.*
import org.springframework.validation.annotation.Validated
import org.springframework.web.context.request.NativeWebRequest
import org.springframework.beans.factory.annotation.Autowired

import jakarta.validation.constraints.DecimalMax
import jakarta.validation.constraints.DecimalMin
import jakarta.validation.constraints.Email
import jakarta.validation.constraints.Max
import jakarta.validation.constraints.Min
import jakarta.validation.constraints.NotNull
import jakarta.validation.constraints.Pattern
import jakarta.validation.constraints.Size
import jakarta.validation.Valid

import kotlin.collections.List
import kotlin.collections.Map

@RestController
@Validated
interface EditInstrumentApi {


    @RequestMapping(
            method = [RequestMethod.POST],
            value = ["/api/instrument/edit"],
            produces = ["application/json"],
            consumes = ["application/json"]
    )
    fun editInstrument( @Valid @RequestBody editInstrumentRequestBody: EditInstrumentRequestBody): ResponseEntity<kotlin.Any>
}
