package mu.muse.application.muse

import mu.muse.rest.HelloEndpoint
import mu.muse.rest.instruments.DeleteInstrumentByIdEndpoint
import mu.muse.rest.instruments.GetInstrumentsByCriteriaEndpoint
import mu.muse.rest.instruments.GetInstrumentByIdEndpoint
import mu.muse.rest.instruments.GetInstrumentTypesEndpoint
import mu.muse.rest.login.BasicLoginEndpoint
import mu.muse.rest.profile.GetProfileEndpoint
import mu.muse.usecase.BasicLogin
import mu.muse.usecase.DeleteInstrumentById
import mu.muse.usecase.GetInstrumentsByCriteria
import mu.muse.usecase.GetInstrumentById
import mu.muse.usecase.GetInstrumentTypes
import mu.muse.usecase.GetProfile
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration

@Configuration
class RestConfiguration {

    @Bean
    fun helloEndpoint() = HelloEndpoint()

    @Bean
    fun loginEndpoint(basicLogin: BasicLogin) = BasicLoginEndpoint(basicLogin)

    @Bean
    fun getProfileEndpoint(getProfile: GetProfile) = GetProfileEndpoint(getProfile)

    @Bean
    fun getAllInstrumentsEndpoint(getInstrumentsByCriteria: GetInstrumentsByCriteria) =
        GetInstrumentsByCriteriaEndpoint(getInstrumentsByCriteria)

    @Bean
    fun getInstrumentByIdEndpoint(getInstrumentById: GetInstrumentById) = GetInstrumentByIdEndpoint(getInstrumentById)

    @Bean
    fun deleteInstrumentByIdEndpoint(deleteInstrumentById: DeleteInstrumentById) =
        DeleteInstrumentByIdEndpoint(deleteInstrumentById)

    @Bean
    fun getInstrumentTypesEndpoint(getInstrumentTypes: GetInstrumentTypes) =
        GetInstrumentTypesEndpoint(getInstrumentTypes)
}
