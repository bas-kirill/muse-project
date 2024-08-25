package mu.muse.application.muse

import mu.muse.domain.IdGenerator
import mu.muse.domain.instrument.InstrumentId
import mu.muse.domain.user.UserId
import mu.muse.usecase.access.instrument.InstrumentExtractor
import mu.muse.usecase.access.instrument.InstrumentPersister
import mu.muse.usecase.access.instrument.InstrumentRemover
import mu.muse.usecase.access.user.UserExtractor
import mu.muse.usecase.access.user.UserPersister
import mu.muse.usecase.scenario.country.GetCountriesUseCase
import mu.muse.usecase.scenario.favorite.AddFavoriteUseCase
import mu.muse.usecase.scenario.favorite.GetFavoriteByUsernameUseCase
import mu.muse.usecase.scenario.favorite.RemoveFavoriteUseCase
import mu.muse.usecase.scenario.instrument.CreateInstrumentUseCase
import mu.muse.usecase.scenario.instrument.DeleteInstrumentByIdUseCase
import mu.muse.usecase.scenario.instrument.EditInstrumentUseCase
import mu.muse.usecase.scenario.instrument.GetInstrumentByIdUseCase
import mu.muse.usecase.scenario.instrument.GetManufacturersUseCase
import mu.muse.usecase.scenario.instrument.GetInstrumentMaterialsUseCase
import mu.muse.usecase.scenario.instrument.GetInstrumentPhotoUseCase
import mu.muse.usecase.scenario.instrument.GetInstrumentTypesUseCase
import mu.muse.usecase.scenario.instrument.GetInstrumentsByCriteriaPaginatedUseCase
import mu.muse.usecase.scenario.instrument.GetInstrumentsByCriteriaUseCase
import mu.muse.usecase.scenario.instrument.GetInstrumentsByIdsUseCase
import mu.muse.usecase.scenario.user.GetUserUseCase
import mu.muse.usecase.scenario.registration.RegisterUserUseCase
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.security.crypto.password.PasswordEncoder

@Suppress("TooManyFunctions")
@Configuration
class UseCaseConfiguration {

    @Bean
    fun getProfile(userExtractor: UserExtractor) = GetUserUseCase(userExtractor)

    @Bean
    fun getInstrumentsByCriteria(instrumentExtractor: InstrumentExtractor) =
        GetInstrumentsByCriteriaUseCase(instrumentExtractor)

    @Bean
    fun getInstrumentsByCriteriaPaginated(instrumentExtractor: InstrumentExtractor) =
        GetInstrumentsByCriteriaPaginatedUseCase(instrumentExtractor)

    @Bean
    fun getInstrumentById(instrumentExtractor: InstrumentExtractor) = GetInstrumentByIdUseCase(instrumentExtractor)

    @Bean
    fun deleteInstrumentById(instrumentRemover: InstrumentRemover) = DeleteInstrumentByIdUseCase(instrumentRemover)

    @Bean
    fun getInstrumentTypes() = GetInstrumentTypesUseCase()

    @Bean
    fun getInstrumentBasicMaterials() = GetInstrumentMaterialsUseCase()

    @Bean
    fun getCountries() = GetCountriesUseCase()

    @Bean
    fun createInstrument(
        idGenerator: IdGenerator<InstrumentId>,
        instrumentPersister: InstrumentPersister
    ) = CreateInstrumentUseCase(idGenerator, instrumentPersister)

    @Bean
    fun getInstrumentManufacturers() = GetManufacturersUseCase()

    @Bean
    fun editInstrument(instrumentExtractor: InstrumentExtractor, instrumentPersister: InstrumentPersister) =
        EditInstrumentUseCase(instrumentExtractor, instrumentPersister)

    @Bean
    fun registerUser(
        idGenerator: IdGenerator<UserId>,
        userExtractor: UserExtractor,
        userPersister: UserPersister,
        passwordEncoder: PasswordEncoder,
    ) = RegisterUserUseCase(idGenerator, userExtractor, userPersister, passwordEncoder)

    @Bean
    fun getInstrumentsByIds(instrumentExtractor: InstrumentExtractor) = GetInstrumentsByIdsUseCase(instrumentExtractor)

    @Bean
    fun getInstrumentPhoto(instrumentExtractor: InstrumentExtractor) = GetInstrumentPhotoUseCase(instrumentExtractor)

    @Bean
    fun addFavorite(userExtractor: UserExtractor, userPersister: UserPersister) =
        AddFavoriteUseCase(userExtractor, userPersister)

    @Bean
    fun getUserFavorite(userExtractor: UserExtractor, instrumentExtractor: InstrumentExtractor) =
        GetFavoriteByUsernameUseCase(userExtractor, instrumentExtractor)

    @Bean
    fun removeFavorite(userExtractor: UserExtractor, userPersister: UserPersister) =
        RemoveFavoriteUseCase(userExtractor, userPersister)


}
