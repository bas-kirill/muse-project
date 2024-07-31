package mu.muse.application.muse

import mu.muse.domain.IdGenerator
import mu.muse.domain.instrument.InstrumentId
import mu.muse.usecase.access.instrument.InstrumentExtractor
import mu.muse.usecase.access.instrument.InstrumentPersister
import mu.muse.usecase.access.instrument.InstrumentRemover
import mu.muse.usecase.access.user.UserExtractor
import mu.muse.usecase.scenario.country.GetCountriesUseCase
import mu.muse.usecase.scenario.instrument.CreateInstrumentUseCase
import mu.muse.usecase.scenario.instrument.DeleteInstrumentByIdUseCase
import mu.muse.usecase.scenario.instrument.EditInstrumentUseCase
import mu.muse.usecase.scenario.instrument.GetInstrumentByIdUseCase
import mu.muse.usecase.scenario.instrument.GetInstrumentManufacturersUseCase
import mu.muse.usecase.scenario.instrument.GetInstrumentMaterialsUseCase
import mu.muse.usecase.scenario.instrument.GetInstrumentTypesUseCase
import mu.muse.usecase.scenario.instrument.GetInstrumentsByCriteriaPaginatedUseCase
import mu.muse.usecase.scenario.instrument.GetInstrumentsByCriteriaUseCase
import mu.muse.usecase.scenario.profile.GetProfileUseCase
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration

@Suppress("TooManyFunctions")
@Configuration
class UseCaseConfiguration {

    @Bean
    fun getProfile(userExtractor: UserExtractor) = GetProfileUseCase(userExtractor)

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
    fun getInstrumentManufacturers() = GetInstrumentManufacturersUseCase()

    @Bean
    fun editInstrument(instrumentExtractor: InstrumentExtractor, instrumentPersister: InstrumentPersister) =
        EditInstrumentUseCase(instrumentExtractor, instrumentPersister)
}
