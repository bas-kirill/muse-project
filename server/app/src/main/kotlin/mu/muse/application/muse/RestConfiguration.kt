package mu.muse.application.muse

import mu.muse.rest.HelloEndpoint
import mu.muse.rest.country.GetCountriesEndpoint
import mu.muse.rest.favorite.AddFavoriteEndpoint
import mu.muse.rest.favorite.ListFavoriteEndpoint
import mu.muse.rest.favorite.RemoveFavoriteEndpoint
import mu.muse.rest.instruments.CreateInstrumentEndpoint
import mu.muse.rest.instruments.DeleteInstrumentByIdEndpoint
import mu.muse.rest.instruments.EditInstrumentEndpoint
import mu.muse.rest.instruments.GetInstrumentByIdEndpoint
import mu.muse.rest.instruments.GetManufacturersEndpoint
import mu.muse.rest.instruments.GetInstrumentMaterialsEndpoint
import mu.muse.rest.instruments.GetInstrumentPhotoEndpoint
import mu.muse.rest.instruments.GetInstrumentTypesEndpoint
import mu.muse.rest.instruments.GetInstrumentsByCriteriaEndpoint
import mu.muse.rest.instruments.GetInstrumentsByCriteriaPaginatedEndpoint
import mu.muse.rest.login.BasicLoginEndpoint
import mu.muse.rest.logout.LogoutEndpoint
import mu.muse.rest.profile.GetProfileEndpoint
import mu.muse.rest.registration.RegistrationEndpoint
import mu.muse.usecase.AddFavorite
import mu.muse.usecase.BasicLogin
import mu.muse.usecase.CreateInstrument
import mu.muse.usecase.DeleteInstrumentById
import mu.muse.usecase.EditInstrument
import mu.muse.usecase.GetCountries
import mu.muse.usecase.GetFavoriteByUsername
import mu.muse.usecase.GetInstrumentById
import mu.muse.usecase.GetManufacturers
import mu.muse.usecase.GetInstrumentMaterials
import mu.muse.usecase.GetInstrumentPhoto
import mu.muse.usecase.GetInstrumentTypes
import mu.muse.usecase.GetInstrumentsByCriteria
import mu.muse.usecase.GetInstrumentsByCriteriaPaginated
import mu.muse.usecase.GetInstrumentsByIds
import mu.muse.usecase.GetUser
import mu.muse.usecase.RegisterUser
import mu.muse.usecase.RemoveFavorite
import org.springframework.context.MessageSource
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.context.support.ResourceBundleMessageSource
import org.springframework.web.servlet.LocaleResolver
import org.springframework.web.servlet.i18n.SessionLocaleResolver
import java.util.Locale

@Configuration
@Suppress("TooManyFunctions")
class RestConfiguration {

    @Bean
    fun localResolver(): LocaleResolver = with(SessionLocaleResolver()) {
        setDefaultLocale(Locale.US)
        this
    }

    @Bean
    fun messageSource(): ResourceBundleMessageSource = with(ResourceBundleMessageSource()) {
        setUseCodeAsDefaultMessage(true)
        setBasenames("messages")
        setDefaultEncoding("UTF-8")
        this
    }

    @Bean
    fun helloEndpoint() = HelloEndpoint()

    @Bean
    fun loginEndpoint(basicLogin: BasicLogin) = BasicLoginEndpoint(basicLogin)

    @Bean
    fun getProfileEndpoint(getUser: GetUser) = GetProfileEndpoint(getUser)

    @Bean
    fun getInstrumentsByCriteriaEndpoint(
        getInstrumentsByCriteria: GetInstrumentsByCriteria,
        messageSource: MessageSource
    ) = GetInstrumentsByCriteriaEndpoint(getInstrumentsByCriteria, messageSource)

    @Bean
    fun getInstrumentsByCriteriaPaginatedEndpoint(
        getInstrumentsByCriteriaPaginated: GetInstrumentsByCriteriaPaginated,
        messageSource: MessageSource,
    ) = GetInstrumentsByCriteriaPaginatedEndpoint(getInstrumentsByCriteriaPaginated, messageSource)

    @Bean
    fun getInstrumentByIdEndpoint(getInstrumentById: GetInstrumentById, messageSource: MessageSource) =
        GetInstrumentByIdEndpoint(getInstrumentById, messageSource)

    @Bean
    fun deleteInstrumentByIdEndpoint(deleteInstrumentById: DeleteInstrumentById) =
        DeleteInstrumentByIdEndpoint(deleteInstrumentById)

    @Bean
    fun getInstrumentTypesEndpoint(getInstrumentTypes: GetInstrumentTypes, messageSource: MessageSource) =
        GetInstrumentTypesEndpoint(getInstrumentTypes, messageSource)

    @Bean
    fun getInstrumentMaterialsEndpoint(getInstrumentMaterials: GetInstrumentMaterials) =
        GetInstrumentMaterialsEndpoint(getInstrumentMaterials)

    @Bean
    fun getCountriesEndpoint(getCountries: GetCountries) = GetCountriesEndpoint(getCountries)

    @Bean
    fun createInstrumentEndpoint(createInstrument: CreateInstrument) = CreateInstrumentEndpoint(createInstrument)

    @Bean
    fun getInstrumentManufacturersEndpoint(getManufacturers: GetManufacturers) =
        GetManufacturersEndpoint(getManufacturers)

    @Bean
    fun editInstrumentEndpoint(editInstrument: EditInstrument) = EditInstrumentEndpoint(editInstrument)

    @Bean
    fun registrationEndpoint(registerUser: RegisterUser) = RegistrationEndpoint(registerUser)

    @Bean
    fun listFavoriteEndpoint(
        getFavoriteByUsername: GetFavoriteByUsername,
        messageSource: MessageSource,
    ) = ListFavoriteEndpoint(getFavoriteByUsername, messageSource)

    @Bean
    fun addFavoriteEndpoint(addFavorite: AddFavorite) = AddFavoriteEndpoint(addFavorite)

    @Bean
    fun removeFavoriteEndpoint(removeFavorite: RemoveFavorite) = RemoveFavoriteEndpoint(removeFavorite)

    @Bean
    fun getInstrumentPhotoEndpoint(getInstrumentPhoto: GetInstrumentPhoto) =
        GetInstrumentPhotoEndpoint(getInstrumentPhoto)

    @Bean
    fun logoutEndpoint() = LogoutEndpoint()
}
