package mu.muse.application.muse

import mu.muse.usecase.access.instrument.InstrumentExtractor
import mu.muse.usecase.access.instrument.InstrumentRemover
import mu.muse.usecase.access.user.UserExtractor
import mu.muse.usecase.scenario.instrument.DeleteInstrumentByIdUseCase
import mu.muse.usecase.scenario.instrument.GetInstrumentMaterialsUseCase
import mu.muse.usecase.scenario.instrument.GetInstrumentByIdUseCase
import mu.muse.usecase.scenario.instrument.GetInstrumentTypesUseCase
import mu.muse.usecase.scenario.instrument.GetInstrumentsByCriteriaUseCase
import mu.muse.usecase.scenario.profile.GetProfileUseCase
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration

@Configuration
class UseCaseConfiguration {

    @Bean
    fun getProfile(userExtractor: UserExtractor) = GetProfileUseCase(userExtractor)

    @Bean
    fun getAllInstruments(instrumentExtractor: InstrumentExtractor) =
        GetInstrumentsByCriteriaUseCase(instrumentExtractor)

    @Bean
    fun getInstrumentById(instrumentExtractor: InstrumentExtractor) = GetInstrumentByIdUseCase(instrumentExtractor)

    @Bean
    fun deleteInstrumentById(instrumentRemover: InstrumentRemover) = DeleteInstrumentByIdUseCase(instrumentRemover)

    @Bean
    fun getInstrumentTypes() = GetInstrumentTypesUseCase()

    @Bean
    fun getInstrumentBasicMaterials() = GetInstrumentMaterialsUseCase()
}
