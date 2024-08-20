package mu.muse.application.muse

import mu.muse.rest.HelloEndpoint
import mu.muse.rest.api.ProfileApi
import mu.muse.rest.country.GetCountriesEndpoint
import mu.muse.rest.favorite.FavoriteEndpoint
import mu.muse.rest.instruments.CreateInstrumentEndpoint
import mu.muse.rest.instruments.DeleteInstrumentByIdEndpoint
import mu.muse.rest.instruments.EditInstrumentEndpoint
import mu.muse.rest.instruments.GetInstrumentsByCriteriaEndpoint
import mu.muse.rest.instruments.GetInstrumentByIdEndpoint
import mu.muse.rest.instruments.GetInstrumentManufacturersEndpoint
import mu.muse.rest.instruments.GetInstrumentMaterialsEndpoint
import mu.muse.rest.instruments.GetInstrumentTypesEndpoint
import mu.muse.rest.login.BasicLoginEndpoint
import mu.muse.rest.profile.GetProfileEndpoint
import mu.muse.rest.registration.RegistrationEndpoint
import mu.muse.usecase.BasicLogin
import mu.muse.usecase.CreateInstrument
import mu.muse.usecase.DeleteInstrumentById
import mu.muse.usecase.EditInstrument
import mu.muse.usecase.GetCountries
import mu.muse.usecase.GetInstrumentsByCriteriaPaginated
import mu.muse.usecase.GetInstrumentById
import mu.muse.usecase.GetInstrumentManufacturers
import mu.muse.usecase.GetInstrumentMaterials
import mu.muse.usecase.GetInstrumentTypes
import mu.muse.usecase.GetInstrumentsByCriteria
import mu.muse.usecase.GetProfile
import mu.muse.usecase.RegisterUser
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration

@Configuration
@Suppress("TooManyFunctions")
class RestConfiguration {

    @Bean
    fun helloEndpoint() = HelloEndpoint()

    @Bean
    fun loginEndpoint(basicLogin: BasicLogin) = BasicLoginEndpoint(basicLogin)

    @Bean
    fun getProfileEndpoint(getProfile: GetProfile) = GetProfileEndpoint(getProfile)

    @Bean
    fun getAllInstrumentsEndpoint(
        getInstrumentsByCriteria: GetInstrumentsByCriteria,
        getInstrumentsByCriteriaPaginated: GetInstrumentsByCriteriaPaginated
    ) = GetInstrumentsByCriteriaEndpoint(getInstrumentsByCriteria, getInstrumentsByCriteriaPaginated)

    @Bean
    fun getInstrumentByIdEndpoint(getInstrumentById: GetInstrumentById) = GetInstrumentByIdEndpoint(getInstrumentById)

    @Bean
    fun deleteInstrumentByIdEndpoint(deleteInstrumentById: DeleteInstrumentById) =
        DeleteInstrumentByIdEndpoint(deleteInstrumentById)

    @Bean
    fun getInstrumentTypesEndpoint(getInstrumentTypes: GetInstrumentTypes) =
        GetInstrumentTypesEndpoint(getInstrumentTypes)

    @Bean
    fun getInstrumentMaterialsEndpoint(getInstrumentMaterials: GetInstrumentMaterials) =
        GetInstrumentMaterialsEndpoint(getInstrumentMaterials)

    @Bean
    fun getCountriesEndpoint(getCountries: GetCountries) = GetCountriesEndpoint(getCountries)

    @Bean
    fun createInstrumentEndpoint(createInstrument: CreateInstrument) = CreateInstrumentEndpoint(createInstrument)

    @Bean
    fun getInstrumentManufacturersEndpoint(getInstrumentManufacturers: GetInstrumentManufacturers) =
        GetInstrumentManufacturersEndpoint(getInstrumentManufacturers)

    @Bean
    fun editInstrumentEndpoint(editInstrument: EditInstrument) = EditInstrumentEndpoint(editInstrument)

    @Bean
    fun registrationEndpoint(registerUser: RegisterUser) = RegistrationEndpoint(registerUser)

    @Bean
    fun favoriteEndpoint() = FavoriteEndpoint()
}
